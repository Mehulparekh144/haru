import { cn } from "@/lib/utils";

export const Box = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(
        "bg-background text-foreground mx-auto h-screen w-screen max-w-7xl px-6",
        className,
      )}
    >
      {children}
    </main>
  );
};
