import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
    <Navbar/>
      <div className="pt-20 pb-20">
      <Outlet />
      </div>
    <Footer/>
    </>
  );
}
export default MainLayout;