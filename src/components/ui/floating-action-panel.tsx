import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SpringOptions } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const TRANSITION: SpringOptions = {
  bounce: 0.1,
  duration: 0.4,
};

interface FloatingActionPanelContextType {
  isOpen: boolean;
  openPanel: (rect: DOMRect, mode: "actions" | "note") => void;
  closePanel: () => void;
  uniqueId: string;
  triggerRect: DOMRect | null;
  title: string;
  setTitle: (title: string) => void;
  note: string;
  setNote: (note: string) => void;
  mode: "actions" | "note";
}

const FloatingActionPanelContext = React.createContext<
  FloatingActionPanelContextType | undefined
>(undefined);

export const useFloatingActionPanel = () => {
  const ctx = React.useContext(FloatingActionPanelContext);
  if (!ctx) throw new Error("useFloatingActionPanel must be used inside FloatingActionPanelRoot");
  return ctx;
};

function useFloatingActionPanelLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const [mode, setMode] = React.useState<"actions" | "note">("actions");

  const openPanel = (rect: DOMRect, newMode: "actions" | "note") => {
    setTriggerRect(rect);
    setMode(newMode);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setNote("");
  };

  return {
    uniqueId,
    isOpen,
    openPanel,
    closePanel,
    triggerRect,
    title,
    setTitle,
    note,
    setNote,
    mode,
  };
}

interface FloatingActionPanelRootProps {
  children: (ctx: FloatingActionPanelContextType) => React.ReactNode;
  className?: string;
}

export const FloatingActionPanelRoot = React.forwardRef<
  HTMLDivElement,
  FloatingActionPanelRootProps
>(({ children, className }, ref) => {
  const logic = useFloatingActionPanelLogic();
  return (
    <FloatingActionPanelContext.Provider value={logic}>
      <div ref={ref} className={cn("relative", className)}>
        {children(logic)}
      </div>
    </FloatingActionPanelContext.Provider>
  );
});

FloatingActionPanelRoot.displayName = "FloatingActionPanelRoot";

interface FloatingActionPanelTriggerProps {
  children: React.ReactNode;
  title: string;
  mode: "actions" | "note";
  className?: string;
}

export const FloatingActionPanelTrigger = React.forwardRef<
  HTMLButtonElement,
  FloatingActionPanelTriggerProps
>(({ children, className, title, mode }, ref) => {
  const { openPanel, setTitle, uniqueId } = useFloatingActionPanel();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (triggerRef.current) {
      setTitle(title);
      openPanel(triggerRef.current.getBoundingClientRect(), mode);
    }
  };

  return (
    <motion.button
      ref={(node) => {
        triggerRef.current = node as HTMLButtonElement;
        if (typeof ref === "function") ref(node as HTMLButtonElement);
      }}
      layoutId={`floating-panel-trigger-${uniqueId}-${mode}`}
      onClick={handleClick}
      className={cn(
        "flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className
      )}
      whileHover={{ scale: 1.02, transition: TRANSITION }}
      whileTap={{ scale: 0.98, transition: TRANSITION }}
    >
      {children}
    </motion.button>
  );
});

FloatingActionPanelTrigger.displayName = "FloatingActionPanelTrigger";

interface FloatingActionPanelContentProps {
  children?: React.ReactNode;
  className?: string;
}

export const FloatingActionPanelContent = React.forwardRef<
  HTMLDivElement,
  FloatingActionPanelContentProps
>(({ children, className }, ref) => {
  const { isOpen, closePanel, uniqueId, triggerRect, title, mode } = useFloatingActionPanel();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) closePanel();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closePanel]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closePanel]);

  const computePosition = () => {
    if (!triggerRect) return { left: "50%", top: "50%" };
    const x = triggerRect.left + window.scrollX;
    const y = triggerRect.bottom + window.scrollY + 8;
    return {
      position: "absolute" as const,
      left: 0,
      top: 0,
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative">
          <motion.div
            className="fixed inset-0 z-40 bg-black/5"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={TRANSITION}
          />
          <motion.div
            ref={(node) => {
              contentRef.current = node as HTMLDivElement;
              if (typeof ref === "function") ref(node as HTMLDivElement);
            }}
            layoutId={`floating-panel-${uniqueId}-${mode}`}
            className={cn(
              "absolute z-50 min-w-[220px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950",
              className
            )}
            style={computePosition()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={TRANSITION}
          >
            <div className="px-4 py-3 font-medium">{title}</div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

FloatingActionPanelContent.displayName = "FloatingActionPanelContent";

interface FloatingActionPanelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const FloatingActionPanelButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionPanelButtonProps
>(({ children, onClick, className }, ref) => (
  <motion.button
    ref={ref}
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    transition={TRANSITION}
    className={cn(
      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800",
      className
    )}
  >
    {children}
  </motion.button>
));

FloatingActionPanelButton.displayName = "FloatingActionPanelButton";

interface FloatingActionPanelFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

export const FloatingActionPanelForm = React.forwardRef<
  HTMLFormElement,
  FloatingActionPanelFormProps
>(({ children, onSubmit, className }, ref) => {
  const { note, closePanel } = useFloatingActionPanel();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closePanel();
  };
  return (
    <form ref={ref} className={cn("flex h-full flex-col", className)} onSubmit={submit}>
      {children}
    </form>
  );
});

FloatingActionPanelForm.displayName = "FloatingActionPanelForm";

export const FloatingActionPanelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  { className?: string; id?: string }
>(({ className, id }, ref) => {
  const { note, setNote } = useFloatingActionPanel();
  return (
    <textarea
      ref={ref}
      id={id}
      autoFocus
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className
      )}
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
});

FloatingActionPanelTextarea.displayName = "FloatingActionPanelTextarea";


export default function LogoutPanel({ onLogout }: { onLogout: () => void }) {
  const currentTheme = useTheme();
  return (
    <FloatingActionPanelRoot>
      {(ctx) => (
        <>
          <FloatingActionPanelTrigger
            title="Logout"
            mode="actions"
            className={`bg-transparent ${currentTheme.theme === "light" ? "hover:bg-violet-300 text-gray-600 hover:text-gray-700" : " text-gray-500 border border-gray-500 hover:bg-transparent hover:border-gray-400 hover:text-gray-400 "}`}
          >
            Logout
          </FloatingActionPanelTrigger>

          <FloatingActionPanelContent className={`p-3 -translate-x-22 translate-y-5 sm:-translate-x-20 sm:translate-y-5 md:-translate-x-30 md:translate-y-10 ${currentTheme.theme === "light" ? "bg-zinc-100" : "bg-indigo-950"}`}>
            <div className={`text-sm ${currentTheme.theme === "light" ? "text-zinc-900" : "text-zinc-300"} px-2 pb-2`}>
              Are you sure you want to logout?
            </div>

            <div className="flex flex-col gap-1 p-1">
              <FloatingActionPanelButton
                onClick={() => {
                  ctx.closePanel()
                  onLogout()
                }}
                className="text-red-600 font-bold dark:text-red-400 hover:bg-gray-200"
              >
                Continue
              </FloatingActionPanelButton>

              <FloatingActionPanelButton onClick={ctx.closePanel} className="hover:bg-gray-200 font-bold text-gray-700">
                Cancel
              </FloatingActionPanelButton>
            </div>
          </FloatingActionPanelContent>
        </>
      )}
    </FloatingActionPanelRoot>
  )
}
