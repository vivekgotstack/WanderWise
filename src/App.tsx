import "./App.css";
import MobileWarning from "./components/MobileWarning";
import AppRouter from "./routes/Routes";
import useWindowSize from "./useWindowSize";

function App() {
  const width = useWindowSize();
  const isMobile = width < 1024;
  return (
    <>
      {isMobile ? <MobileWarning /> : <AppRouter />}
    </>
  );
}

export default App;