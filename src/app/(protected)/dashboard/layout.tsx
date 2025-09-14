import { Box } from "@/components/box";
import { Navbar } from "./navbar";
import { AnimatedContainer } from "@/components/animated-container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="max-w-2xl">
      <AnimatedContainer>
        <Navbar />
        <div className="h-[calc(100vh-5rem)] w-full">{children}</div>
      </AnimatedContainer>
    </Box>
  );
}
