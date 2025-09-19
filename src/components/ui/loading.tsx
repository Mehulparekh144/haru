import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loading({
  className,
  size = "md",
  text = "Loading...",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div
        className={cn(
          "border-primary/20 border-t-primary animate-spin rounded-full border-2",
          sizeClasses[size],
        )}
      />
      {text && (
        <p className="text-muted-foreground animate-pulse text-sm">{text}</p>
      )}
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="from-background via-background to-muted/20 flex min-h-screen w-full items-center justify-center bg-gradient-to-br">
      <div className="flex flex-col items-center gap-6">
        {/* Haru Logo/Text */}
        <div className="text-primary animate-pulse text-4xl font-bold">
          Haru
        </div>

        {/* Spinning Circle */}
        <div className="relative">
          <div className="border-primary/20 border-t-primary h-16 w-16 animate-spin rounded-full border-4" />
          <div
            className="border-r-accent/30 absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
        </div>

        {/* Loading Text */}
        <div className="space-y-2 text-center">
          <p className="text-muted-foreground animate-pulse">
            Preparing your peaceful journey...
          </p>
          <div className="flex justify-center gap-1">
            <div
              className="bg-primary h-1 w-1 animate-bounce rounded-full"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="bg-primary h-1 w-1 animate-bounce rounded-full"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="bg-primary h-1 w-1 animate-bounce rounded-full"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
