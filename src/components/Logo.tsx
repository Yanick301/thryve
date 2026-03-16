import React from 'react';

export const Logo = ({ className = "w-8 h-8", iconOnly = false }: { className?: string, iconOnly?: boolean }) => {
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative flex-shrink-0">
        {/* Main Icon Container */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
          >
            <path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              fill="currentColor"
              stroke="white"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Accent dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent border-2 border-background rounded-full animate-pulse" />
      </div>
      {!iconOnly && (
        <span className="text-2xl font-black text-foreground tracking-[-0.08em] uppercase flex items-baseline">
          THRYVE
          <span className="w-1.5 h-1.5 bg-primary rounded-full ml-1 shadow-[0_0_10px_var(--primary)] animate-pulse" />
        </span>
      )}
    </div>
  );
};

export const DeOsBranding = () => (
  <div className="flex items-center gap-2.5 px-4 py-1.5 glass-master rounded-full border border-white/40 shadow-inner group/deos">
    <span className="text-[8px] font-black text-foreground/40 uppercase tracking-[0.4em]">PROTOCOLE ALPHA PAR</span>
    <span className="text-[9px] font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover/deos:animate-pulse transition-all">DEOS LABS</span>
    <span className="text-[10px] text-primary animate-crystal">✦</span>
  </div>
);
