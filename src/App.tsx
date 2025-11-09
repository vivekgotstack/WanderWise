import "./App.css";
import { FirebaseProvider } from "./contexts/AuthContext";
import PWAInstallPrompt from "./layouts/PWAInstallPrompt";
import AppRouter from "./routes/Routes";

function App() {
  return (
    <>
      <FirebaseProvider>
        <AppRouter />
        <PWAInstallPrompt />
      </FirebaseProvider>
    </>
  );
}

export default App;