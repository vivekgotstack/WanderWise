import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import WordReveal from "@/components/ui/word-reveal";
import OpenSource from "@/components/ui/open-source";
import { ShinyButton } from "@/components/ui/shiny-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { useNavigate } from "react-router-dom";
import { Globe } from "@/components/ui/globe";
import { AuroraText } from "@/components/ui/aurora-text";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden bg-black min-h-screen pt-40 md:pt-60")}>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-zinc-900/50 to-black" />

      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-indigo-500/60 to-indigo-500/20 blur-3xl
        w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[650px] md:h-[650px] lg:w-[900px] lg:h-[900px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3],
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <SparklesText className="text-white text-4xl sm:text-5xl md:text-6xl">
            WanderWise
          </SparklesText>

          <WordReveal
            text="A smarter way to Travel"
            className="mb-4 sm:mb-6 text-white text-lg sm:text-xl md:text-2xl"
            delay={0.2}
          />

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 2.5 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 mb-6 sm:mb-8 max-w-xl md:max-w-2xl mx-auto"
          >
            Experience the next generation of travel booking.
            Find the best deals, manage trips, and travel with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ShinyButton
              className="bg-white hover:bg-zinc-200 transition-colors px-6 py-3 text-sm sm:text-base"
              onClick={() => navigate("/login")}
            >
              Get Started
            </ShinyButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <div className="w-full overflow-hidden aspect-[16/9] min-h-[260px] sm:min-h-[300px] md:min-h-[380px] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-4xl border-2 border-indigo-800 relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br rounded-4xl from-violet-400/10 to-indigo-500/50"
              animate={{ opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="w-full bg-transparent border-2 shadow-2xl shadow-black rounded-4xl py-2 sm:py-3">
              <div className="flex whitespace-nowrap animate-wanderwise-infinite">
                <div className="flex">
                  {Array(20).fill(0).map((_, i) => (
                    <span key={`a-${i}`} className="mx-4 sm:mx-6 text-lg sm:text-xl font-semibold text-white">
                      Wander<span className="italic text-indigo-500">Wise</span>
                    </span>
                  ))}
                </div>

                <div className="flex">
                  {Array(20).fill(0).map((_, i) => (
                    <span key={`b-${i}`} className="mx-4 sm:mx-6 text-lg sm:text-xl font-semibold text-white">
                      Wander<span className="italic text-indigo-500">Wise</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="lg:hidden flex justify-center translate-y-30 items-center text-sm sm:text-base font-semibold text-indigo-300 tracking-wide select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              <AuroraText className="text-5xl font-extrabold -translate-y-20 z-50">Proudly OpenSource</AuroraText>
              <Globe className="bottom-80 -translate-y-15" />
            </motion.div>

            <div className="hidden lg:block">
              <OpenSource
                repository="codehagen/prismui"
                defaultStats={{
                  stars: 27,
                  contributors: [
                    { login: "codehagen" },
                    { login: "contributor2" }
                  ],
                }}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
