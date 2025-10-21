import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Suspense, useEffect } from "react";
import SkeletonCard from "@/pages/SkeletonCard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<SkeletonCard />}>
        <Outlet />
      </Suspense>
      <Footer />
    </ThemeProvider>
  );
}
export default MainLayout;