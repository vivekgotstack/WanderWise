import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AvatarCircles } from "./avatar-circles";

interface Contributor {
  login: string;
}

interface Stats {
  stars: number;
  contributors: Contributor[];
}

interface OpenSourceProps {
  /** The repository owner/name (e.g., "codehagen/prismui") */
  repository: string;
  /** Optional GitHub OAuth token for API requests */
  githubToken?: string;
  /** Optional default stats to show while loading */
  defaultStats?: Stats;
  /** Optional custom title */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom button text */
  buttonText?: string;
  /** Optional className for styling */
  className?: string;
}

function StarIcon({
  className,
  delay = 0,
  size = "default",
}: {
  className?: string;
  delay?: number;
  size?: "small" | "default";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.2, rotate: 20 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "text-yellow-400",
          size === "small" ? "w-4 h-4" : "w-8 h-8"
        )}
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(size === "small" && "opacity-20")}
        />
      </svg>
    </motion.div>
  );
}

function StarsDecoration() {
  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
      <div className="flex gap-4">
        <StarIcon delay={0.2} />
        <StarIcon delay={0.3} />
        <StarIcon delay={0.4} />
      </div>
    </div>
  );
}

function OpenSourceCard({
  stars,
  contributors,
}: {
  repository: string;
  stars: number;
  contributors: Contributor[];
}) {
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ]
  
  return (
    <div className="relative grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative flex flex-col items-center text-center"
      >
        <motion.a
          href="https://github.com/vivekgotstack/WanderWise"
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <StarsDecoration />
          <div className="flex flex-col items-center mt-2">
            <div className="text-7xl font-bold">{stars}</div>
            <div className="text-xl mt-2 text-gray-300">
              Github Stars
            </div>
          </div>
        </motion.a>
      </motion.div>

      <Separator className="md:hidden" />

      <div className="hidden md:block absolute left-1/2 top-0 h-full">
        <Separator orientation="vertical" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="space-y-4">
          <div>
            <div className="text-3xl font-bold">
              {contributors.length}+ Contributors
            </div>
            <div className="text-lg mt-2 text-gray-300 mb-2">
              Join our growing community
            </div>
            <AvatarCircles numPeople={5} avatarUrls={avatars} className="translate-x-30"/>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function OpenSourceContent({
  repository,
  stars,
  contributors,
  title = "Proudly open-source",
  description = "Our source code is available on GitHub - feel free to read, review, or contribute to it however you want!",
}: Stats & {
  repository: string;
  title?: string;
  description?: string;
  buttonText?: string;
}) {
  return (
    <section className="container relative py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 text-gray-100">
            {title}
          </h2>
          <p className="text-xl max-w-[800px] mx-auto text-gray-300">
            {description}
          </p>
        </motion.div>
      </div >
      <Separator className="mb-16" />
      <div className="max-w-4xl mx-auto text-gray-100">
        <OpenSourceCard
          repository={repository}
          stars={stars}
          contributors={contributors}
        />
      </div>
    </section >
  );
}

export default function OpenSource({
  repository,
  defaultStats = { stars: 0, contributors: [] },
  ...props
}: OpenSourceProps) {
  return (
    <OpenSourceContent
      repository="https://github.com/vivekgotstack/WanderWise"
      stars={defaultStats.stars}
      contributors={defaultStats.contributors}
      {...props}
    />
  );
}
