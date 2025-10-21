import "./App.css";
import PWAInstallPrompt from "./layouts/PWAInstallPrompt";
import AppRouter from "./routes/Routes";

function App() {
  return (
    <>
      <AppRouter />
      <PWAInstallPrompt />
    </>
  );
}

export default App;