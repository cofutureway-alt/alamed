import { useEffect, useState } from "react";

const LINES = [
  "def welcome(student):",
  '    print("مرحبا بك في منصة العميد")',
  "    for lesson in range(1, 4):",
  '        print("الدرس رقم", lesson)',
  "    return True",
  "",
  'welcome("طالب الثانوية")',
];

const FULL = LINES.join("\n");

export function CodeAnimation() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= FULL.length ? 0 : c + 1));
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full border border-border bg-card rounded-lg overflow-hidden shadow-md" dir="ltr">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/40">
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
        <span className="h-3 w-3 rounded-full bg-border" />
        <span className="ms-2 font-mono text-xs text-muted-foreground">lesson_01.py</span>
      </div>
      <pre className="min-h-56 overflow-x-auto p-4 text-left font-mono text-sm leading-7 text-foreground">
        {FULL.slice(0, count)}
        <span className="inline-block w-2 animate-pulse bg-primary text-transparent">.</span>
      </pre>
    </div>
  );
}

export default CodeAnimation;
