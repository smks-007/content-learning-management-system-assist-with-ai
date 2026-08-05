import React from 'react';
export default function ProgressBar({ value = 0, max = 100, label, showPercentage = true, color = 'indigo', size = 'md' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const sizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };
  const colors = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
  };
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1 text-xs">
          {label && <span className="font-medium text-gray-300">{label}</span>}
          {showPercentage && <span className="font-semibold text-white">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors[color]}`} 
          style={{ width: `${pct}%` }} 
        />
      </div>
    </div>
  );
}
