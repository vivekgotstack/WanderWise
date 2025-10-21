import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/contexts/ThemeContext";

export default function SkeletonCard() {
    const { theme } = useTheme();

    const skeletonColor = theme === "light" ? "bg-gray-300" : "bg-gray-700";
    const bgGradient =
        theme === "light"
            ? "bg-gradient-to-r from-white to-gray-200"
            : "bg-gradient-to-r from-gray-900 to-gray-700";

    return (
        <div
            className={`flex flex-col md:flex-row justify-center items-center w-full pt-32 md:pt-20 ${bgGradient} gap-8 px-4`}
        >
            <Skeleton
                className={`${skeletonColor}
                h-48 w-3/4  
                sm:h-64 sm:w-3/4   
                md:h-80 md:w-1/2  
                lg:h-96 lg:w-1/2  
                rounded-xl`}
            />
        </div>
    );
}
