import { useState, useEffect } from "react";
import ImageSkeleton from "./ui/Skeletons/ImageSkeleton";

interface PrefetchedImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function PrefetchedImage({ src, alt, className }: PrefetchedImageProps) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
    }, [src]);

    if (!loaded) return <ImageSkeleton />

    return <img src={src} alt={alt} className={className} />;
}