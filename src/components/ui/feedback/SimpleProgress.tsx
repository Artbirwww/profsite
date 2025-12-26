import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

function ProgressInner({ value, max = 100, className = '' }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-sm"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

// Основной современный экспорт — как в Radix, ShadCN и т.д.
export const Progress = ProgressInner;

// Совместимость со старым кодом (TemperamentTest.tsx и др.)
export const SimpleProgress = ProgressInner;

// Также можно оставить default, если где-то используется
export default ProgressInner;