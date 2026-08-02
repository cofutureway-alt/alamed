import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

const DEFAULT_CODE = `// اكتب الكود هنا ثم اضغط تشغيل
let students = ["أحمد", "سارة", "محمود"];

for (let i = 0; i < students.length; i++) {
  console.log((i + 1) + " - " + students[i]);
}

function sum(a, b) {
  return a + b;
}

console.log("مجموع الدرجات: " + sum(45, 50));`;

export function CodePlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    const logs: string[] = [];
    const fakeConsole = {
      log: (...args: unknown[]) =>
        logs.push(
          args
            .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
            .join(" ")
        ),
    };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", code);
      fn(fakeConsole);
      setError(null);
    } catch (e) {
      const err = e as Error;
      setError(`${err.name}: ${err.message}`);
    }
    setOutput(logs);
  };

  const reset = () => {
    setCode(DEFAULT_CODE);
    setOutput([]);
    setError(null);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="border border-border bg-card rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
          <span className="font-mono text-xs text-muted-foreground">editor.js</span>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 border border-border rounded px-3 py-1.5 text-xs font-bold transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              إعادة
            </button>
            <button
              onClick={run}
              className="inline-flex items-center gap-1 bg-primary rounded px-4 py-1.5 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Play className="h-3.5 w-3.5" />
              تشغيل
            </button>
          </div>
        </div>
        <textarea
          dir="ltr"
          spellCheck={false}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-80 w-full resize-none bg-transparent p-4 text-left font-mono text-sm leading-6 text-foreground outline-none"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex-1 border border-border bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="border-b border-border px-4 py-3 bg-muted/30">
            <span className="font-mono text-xs text-muted-foreground">output</span>
          </div>
          <div className="h-44 overflow-auto p-4 font-mono text-sm leading-6">
            {output.length === 0 && !error ? (
              <p className="text-muted-foreground" dir="rtl">اضغط تشغيل لعرض النتيجة</p>
            ) : (
              output.map((line, i) => (
                <div key={i} className="text-foreground" dir="ltr">
                  {line}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border border-border bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="border-b border-border px-4 py-3 bg-muted/30">
            <span className="font-mono text-xs text-muted-foreground">error log</span>
          </div>
          <div className="h-28 overflow-auto p-4 font-mono text-sm leading-6" dir="ltr">
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <p className="text-muted-foreground" dir="rtl">
                لا توجد أخطاء في الكود
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodePlayground;
