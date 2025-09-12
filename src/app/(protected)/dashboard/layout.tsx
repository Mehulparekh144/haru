export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-screen max-w-full p-0">{children}</div>;
}
