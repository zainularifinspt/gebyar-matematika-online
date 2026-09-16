import React from 'react';

interface FloatingMath3DProps {
  className?: string;
}

export const FloatingMath3D: React.FC<FloatingMath3DProps> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* 3D Volumetric Cloud Puff: Top Center (GPU CSS Animation) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-80 hidden sm:block animate-float-slow">
        <div className="relative w-36 h-20">
          <div className="absolute bottom-0 left-4 w-28 h-14 rounded-full cloud-3d-puff" />
          <div className="absolute top-1 left-9 w-16 h-16 rounded-full cloud-3d-puff" />
          <div className="absolute top-3 left-18 w-12 h-12 rounded-full cloud-3d-puff" />
        </div>
      </div>

      {/* 3D Volumetric Cloud Puff: Bottom Right Floating Breakout (GPU CSS Animation) */}
      <div className="absolute bottom-6 right-[6%] opacity-80 hidden md:block z-20 animate-float-reverse">
        <div className="relative w-40 h-22">
          <div className="absolute bottom-0 left-3 w-32 h-16 rounded-full cloud-3d-puff" />
          <div className="absolute top-2 left-8 w-18 h-18 rounded-full cloud-3d-puff" />
          <div className="absolute top-4 left-20 w-14 h-14 rounded-full cloud-3d-puff" />
        </div>
      </div>

      {/* 3D Liquid Glass Prism Symbol: Pi (Top Left) */}
      <div className="absolute top-[8%] left-[5%] opacity-80 hidden md:block animate-float-slow">
        <div className="relative w-14 h-14 rounded-2xl glass-3d-violet border border-white/80 flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg">
          <span className="text-xl font-black text-indigo-700 font-mono select-none drop-shadow-xs">π</span>
        </div>
      </div>

      {/* 3D Liquid Glass Prism Symbol: Sigma / Summation (Top Right) */}
      <div className="absolute top-[12%] right-[6%] opacity-80 hidden md:block animate-float-reverse">
        <div className="relative w-15 h-15 rounded-2xl glass-3d-cyan border border-white/80 flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg">
          <span className="text-xl font-black text-sky-700 font-mono select-none drop-shadow-xs">∑</span>
        </div>
      </div>

      {/* 3D Liquid Glass Polyhedron: Delta (Mid Left) */}
      <div className="absolute top-[45%] left-[2%] opacity-75 hidden lg:block animate-float-slow">
        <div className="relative w-12 h-12 rounded-2xl glass-3d-emerald border border-white/80 flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg">
          <span className="text-lg font-black text-emerald-700 select-none">Δ</span>
        </div>
      </div>

      {/* 3D Liquid Glass Symbol: Infinity (Mid-Bottom Right) */}
      <div className="absolute top-[55%] right-[3%] opacity-75 hidden lg:block animate-float-reverse">
        <div className="relative w-14 h-14 rounded-2xl glass-3d-amber border border-white/80 flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg">
          <span className="text-xl font-black text-amber-700 select-none">∞</span>
        </div>
      </div>

      {/* 3D Liquid Glass Symbol: Square Root of X (Bottom Left) */}
      <div className="absolute top-[82%] left-[4%] opacity-75 hidden md:block animate-float-slow">
        <div className="relative w-12 h-12 rounded-2xl glass-3d-violet border border-white/80 flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg">
          <span className="text-base font-black text-purple-700 font-mono select-none">√x</span>
        </div>
      </div>

      {/* 3D Liquid Glass Polyhedron: Integral (Bottom Right) */}
      <div className="absolute top-[88%] right-[5%] opacity-75 hidden md:block animate-float-reverse">
        <div className="relative w-13 h-13 rounded-2xl glass-3d-rose border border-white/80 flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg">
          <span className="text-xl font-black text-rose-700 font-mono select-none">∫</span>
        </div>
      </div>
    </div>
  );
};
