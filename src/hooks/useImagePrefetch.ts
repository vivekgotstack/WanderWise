import { useEffect } from "react";

export function useImagePrefetch(urls: string[]) {
  useEffect(() => {
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [urls]);
}
