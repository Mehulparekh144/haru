import { HabitsSection } from "../habits-section";

export default function TestPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Light Mode</h1>
      <p className="text-muted-foreground font-mono text-sm">
        This is how light mode looks.
      </p>
      <HabitsSection />
    </div>
  );
}
