import React from 'react';

interface FloatingMath3DProps {
  className?: string;
}

export const FloatingMath3D: React.FC<FloatingMath3DProps> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* 3D Volumetric Cloud Puff: Top Center (As in reference image) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-float-slow opacity-90 hidden sm:block">
        <div className="relative w-36 h-20">
          <div className="absolute bottom-0 left-4 w-28 h-14 rounded-full cloud-3d-puff" />
          <div className="absolute top-1 left-9 w-16 h-16 rounded-full cloud-3d-puff" />
          <div className="absolute top-3 left-18 w-12 h-12 rounded-full cloud-3d-puff" />
        </div>
      </div>

      {/* 3D Volumetric Cloud Puff: Bottom Right Floating Breakout (As in reference image) */}
      <div className="absolute bottom-6 right-[6%] animate-float-reverse opacity-85 hidden md:block z-20">
        <div className="relative w-40 h-22">
          <div className="absolute bottom-0 left-3 w-32 h-16 rounded-full cloud-3d-puff" />
          <div className="absolute top-2 left-8 w-18 h-18 rounded-full cloud-3d-puff" />
          <div className="absolute top-4 left-20 w-14 h-14 rounded-full cloud-3d-puff" />
        </div>
      </div>

      {/* 3D Glass Prism Symbol: Pi (Top Left) */}
      <div className="absolute top-[8%] left-[5%] animate-float-slow opacity-70 hidden md:block">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-white/80 shadow-lg shadow-indigo-500/10 flex items-center justify-center -rotate-6">
          <span className="text-2xl font-black text-indigo-600/80 font-mono select-none drop-shadow-sm">π</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/30 to-white/70 pointer-events-none" />
        </div>
      </div>

      {/* 3D Glass Prism Symbol: Sigma / Summation (Top Right) */}
      <div className="absolute top-[12%] right-[6%] animate-float-reverse opacity-75 hidden md:block">
        <div className="relative w-18 h-18 rounded-2xl bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-white/80 shadow-lg shadow-sky-500/10 flex items-center justify-center rotate-12">
          <span className="text-2xl font-black text-sky-600/80 font-mono select-none drop-shadow-sm">∑</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/30 to-white/70 pointer-events-none" />
        </div>
      </div>

      {/* 3D Glass Polyhedron: Delta (Mid Left) */}
      <div className="absolute top-[45%] left-[2%] animate-float-reverse opacity-60 hidden lg:block">
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent backdrop-blur-md border border-white/80 shadow-lg shadow-emerald-500/10 flex items-center justify-center rotate-6">
          <span className="text-xl font-black text-emerald-600/80 select-none">Δ</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/40 to-white/80 pointer-events-none" />
        </div>
      </div>

      {/* 3D Glass Symbol: Infinity (Mid-Bottom Right) */}
      <div className="absolute top-[55%] right-[3%] animate-float-slow opacity-65 hidden lg:block">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-white/80 shadow-lg shadow-amber-500/10 flex items-center justify-center -rotate-12">
          <span className="text-2xl font-black text-amber-600/80 select-none">∞</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/40 to-white/80 pointer-events-none" />
        </div>
      </div>

      {/* 3D Glass Symbol: Square Root of X (Bottom Left) */}
      <div className="absolute top-[82%] left-[4%] animate-float-slow opacity-60 hidden md:block">
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent backdrop-blur-md border border-white/80 shadow-lg shadow-purple-500/10 flex items-center justify-center rotate-3">
          <span className="text-lg font-black text-purple-600/80 font-mono select-none">√x</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/30 to-white/70 pointer-events-none" />
        </div>
      </div>

      {/* 3D Glass Polyhedron: Integral (Bottom Right) */}
      <div className="absolute top-[88%] right-[5%] animate-float-reverse opacity-70 hidden md:block">
        <div className="relative w-15 h-15 rounded-2xl bg-gradient-to-br from-rose-500/20 via-indigo-500/10 to-transparent backdrop-blur-md border border-white/80 shadow-lg shadow-rose-500/10 flex items-center justify-center -rotate-6">
          <span className="text-2xl font-black text-rose-600/80 font-mono select-none">∫</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/30 to-white/70 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
