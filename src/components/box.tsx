export const Box = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background text-foreground mx-auto h-screen w-screen max-w-7xl px-6">
      {children}
    </main>
  );
};
