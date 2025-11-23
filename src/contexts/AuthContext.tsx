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

      toast.success("Google Sign-in successful");
      return true;
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code));
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
  
      toast.success("Account created successfully.");
      return true;
  
    } catch (error: any) {
      toast.error(getAuthErrorMessage(error.code));
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
      toast.error(getAuthErrorMessage(error.code));
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

function getAuthErrorMessage(code: string): string {
  switch (code) {

    // SIGNUP ERRORS
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in instead.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Your password must be at least 6 characters.";

    case "auth/operation-not-allowed":
      return "Email sign-up is not available right now.";

    // LOGIN ERRORS
    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Try again.";

    case "auth/invalid-credential":
      return "Invalid email/password. Try Sign-up or Google Sign-in if once done before.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    // GOOGLE ERRORS
    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    case "auth/cancelled-popup-request":
      return "Another sign-in attempt is already in progress.";

    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup.";

    case "auth/account-exists-with-different-credential":
      return "This email is registered with a different login method.";

    // NETWORK
    case "auth/network-request-failed":
      return "Network error. Check your connection.";

    // RATE LIMIT
    case "auth/too-many-requests":
      return "Too many attempts. Please wait and try again.";

    // DEFAULT (catch-all)
    default:
      return "Something went wrong. Please try again.";
  }
}

export { auth };