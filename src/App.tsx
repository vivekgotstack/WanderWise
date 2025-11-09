import { Toaster } from "sonner";
import "./App.css";
import { FirebaseProvider } from "./contexts/AuthContext";
import PWAInstallPrompt from "./layouts/PWAInstallPrompt";
import AppRouter from "./routes/Routes";

function App() {
  return (
    <>
      <FirebaseProvider>
        <AppRouter />
        <Toaster richColors position="top-center" />
        <PWAInstallPrompt />
      </FirebaseProvider>
    </>
  );
}

export default App;