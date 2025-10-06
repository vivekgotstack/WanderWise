import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

function MainLayout() {
  return (
    <ThemeProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}
export default MainLayout;