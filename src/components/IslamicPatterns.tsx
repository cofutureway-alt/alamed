import React from "react";
import { Code2, Terminal, Cpu, Braces, Binary, FileCode2 } from "lucide-react";

/**
 * Reusable programming and tech decorative SVG/icon components.
 * Replaces old ornamental patterns with modern programming elements.
 */

/** Tech code frame ornament */
export const IslamicArch = ({ className = "" }: { className?: string }) => (
  <div className={`inline-flex items-center justify-center text-primary/30 ${className}`}>
    <Code2 className="w-12 h-12 stroke-[1.5]" />
  </div>
);

/** Tech programming icon ornament - Code / Braces symbol */
export const EightPointStar = ({ className = "", size = 40, style }: { className?: string; size?: number; style?: React.CSSProperties }) => (
  <div className={`inline-flex items-center justify-center text-primary/30 ${className}`} style={{ width: size, height: size, ...style }}>
    <Code2 size={size} className="stroke-[1.5]" />
  </div>
);

/** Tech repeating grid background pattern */
export const IslamicPattern = ({ className = "" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
    <g stroke="currentColor" strokeWidth="0.5" opacity="0.1">
      <rect x="5" y="5" width="50" height="50" rx="6" />
      <path d="M15 25L25 35L15 45" />
      <line x1="30" y1="45" x2="45" y2="45" />
    </g>
  </svg>
);

/** Tech CPU / Chip motif */
export const CrescentStar = ({ className = "", size = 32, style }: { className?: string; size?: number; style?: React.CSSProperties }) => (
  <div className={`inline-flex items-center justify-center text-primary/40 ${className}`} style={{ width: size, height: size, ...style }}>
    <Cpu size={size} className="stroke-[1.5]" />
  </div>
);

/** Modern programming section divider with code brackets */
export const IslamicDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-px flex-1 max-w-24 bg-border" />
    <span className="font-mono text-xs font-bold text-primary/40 px-2 py-0.5 rounded border border-border bg-card">
      &lt;/&gt;
    </span>
    <div className="h-px flex-1 max-w-24 bg-border" />
  </div>
);
