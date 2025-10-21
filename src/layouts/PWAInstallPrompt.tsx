import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      if (window.matchMedia("(display-mode: standalone)").matches) return;
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const handleAppInstalled = () => setShowPrompt(false);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => window.removeEventListener("appinstalled", handleAppInstalled);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => setShowPrompt(false);

  if (!showPrompt) return null;

  return (
    <div className="z-100 fixed bottom-6 right-6 bg-gradient-to-r from-violet-400 via-violet-400 to-gray-300 text-black shadow-lg p-4 rounded-lg flex items-center gap-3 border">
      <span className="bg-gradient-to-tr from-gray-800 to-black bg-clip-text text-transparent">Install WanderWise for a better experience?</span>
      <Button onClick={handleInstall} className="bg-violet-600 text-white">
        Install
      </Button>
      <Button onClick={handleClose} className="bg-gray-500 text-white">
        ✕
      </Button>
    </div>
  );
};

export default PWAInstallPrompt;
