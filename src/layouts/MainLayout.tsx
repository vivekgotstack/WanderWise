import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

function MainLayout() {
  return (
    <ThemeProvider>
    <Navbar/>
      <div className="pt-20">
      <Outlet />
      </div>
    <Footer/>
    </ThemeProvider>
  );
}
export default MainLayout;