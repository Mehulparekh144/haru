import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <>
      <style>{`
        @keyframes fastBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
        .animate-fast-bounce {
          animation: fastBounce 0.7s infinite;
        }
      `}</style>
      <div
        className={cn(
          "flex w-full items-center justify-center space-x-1",
          className,
        )}
      >
        <div
          className="animate-fast-bounce h-2 w-2 rounded-full bg-current"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="animate-fast-bounce h-2 w-2 rounded-full bg-current"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="animate-fast-bounce h-2 w-2 rounded-full bg-current"
          style={{ animationDelay: "0.2s" }}
        />
      </div>
    </>
  );
};
