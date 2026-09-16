import React from 'react';

interface MathLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const MathLogo: React.FC<MathLogoProps> = ({ 
  size = 'md',
  showSubtitle = true 
}) => {
  const iconSizeClass = size === 'sm' ? 'w-8 h-8 text-base' : size === 'lg' ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl';
  const titleClass = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg sm:text-xl';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* 3D Glass Emblem with Specular Highlight and Polyhedral Depth */}
      <div className={`relative ${iconSizeClass} rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-serif font-black shadow-lg shadow-indigo-600/30 border border-white/40 shrink-0 transform transition-transform hover:scale-105`}>
        <span className="leading-none mt-[-2px] relative z-10 drop-shadow">∑</span>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight text-slate-900 font-['Outfit'] ${titleClass}`}>
            Gebyar<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Matematika</span>
          </span>
          <span className="px-2 py-0.5 text-[10px] font-extrabold tracking-wider uppercase rounded-full bg-indigo-50/90 text-indigo-700 border border-indigo-200/90 shadow-xs backdrop-blur-xs">
            2027
          </span>
        </div>
        {showSubtitle && (
          <p className="text-[11px] font-semibold text-slate-500 -mt-0.5 hidden sm:block tracking-normal">
            Pendidikan Matematika ULM
          </p>
        )}
      </div>
    </div>
  );
};
