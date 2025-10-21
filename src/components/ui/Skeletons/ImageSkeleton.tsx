import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "@/contexts/ThemeContext";

export default function SkeletonCard() {
    const { theme } = useTheme();

    const skeletonColor = theme === "light" ? "bg-gray-300" : "bg-gray-700";

    return (
        <Skeleton
            className={`
            ${theme === "light"
                    ? "bg-gradient-to-r from-white to-gray-200"
                    : "bg-gradient-to-r from-gray-900 to-gray-700"
                }
             ${skeletonColor}
                h-48 w-5/6  
                sm:h-70 sm:w-full   
                md:h-80 md:w-full  
                lg:h-96 lg:w-full  
                rounded-xl`}
        />
    );
}
