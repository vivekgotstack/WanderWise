import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";
import { app } from "@/Firebase";

const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

interface FirebaseContextProps {
  signupUser: (name: string, email: string, password: string) => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  googleSignup: () => Promise<boolean>;
  logoutHandler: () => Promise<void>;
  loading: boolean;
  authenticated: boolean;
  initializing: boolean;
}

const FirebaseContext = createContext<FirebaseContextProps | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setInitializing(false);
    });
    return unsub;
  }, []);

  const googleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);

      await setDoc(doc(firestore, "users", result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        provider: "google",
        createdAt: serverTimestamp(),
      }, { merge: true });

      toast.success("Google login successful");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Google login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
  
      await setDoc(doc(firestore, "users", result.user.uid), {
        name,
        email,
        provider: "email",
        createdAt: serverTimestamp(),
      });
  
      toast.success("Account created");
      return true;
  
    } catch (error: any) {
      toast.error(error?.message || "Signup failed");
      return false;
  
    } finally {
      setLoading(false);
    }
  };
  
  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      return true;
  
    } catch (error: any) {
      toast.error("Login failed, Please signup first!");
      return false;
  
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    setAuthenticated(false);
    await signOut(auth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        loginUser,
        googleSignup,
        logoutHandler,
        loading,
        authenticated,
        initializing,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside FirebaseProvider");
  }
  return ctx;
}

export { auth };
