import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Suspense, useEffect } from "react";
import { useImagePrefetch } from "@/hooks/useImagePrefetch";
import SkeletonCard from "@/components/ui/Skeletons/SkeletonCard";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function MainLayout() {
  useImagePrefetch([
    "/svg/pagessvg/bookingpage.svg",
    "/svg/pagessvg/buspage.svg",
    "/svg/pagessvg/trainpage.svg",
    "/svg/pagessvg/hotelpage.svg",
    "/svg/pagessvg/holidaypage.svg",
    "/svg/pagessvg/flightpage.svg",
    "/svg/pagessvg/cabpage.svg",
  ]);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Navbar />
      <ScrollProgress />
      <Suspense fallback={<SkeletonCard />}>
        <Outlet />
      </Suspense>
      <Footer />
      <ScrollToTopButton />
    </ThemeProvider>
  );
}
export default MainLayout;