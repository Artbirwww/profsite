import { useState, useEffect } from 'react';
import { ChevronDown } from './SimpleIcons';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  id?: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export function SimpleSelect({ value, onValueChange, children }: SelectProps) {
  return (
    <div className="relative w-full">
      {children}
    </div>
  );
}

export function SimpleSelectTrigger({ id, children }: SelectTriggerProps) {
  return (
    <div id={id} className="relative w-full">
      {children}
    </div>
  );
}

export function SimpleSelectValue({ placeholder }: SelectValueProps) {
  return null;
}

export function SimpleSelectContent({ children }: SelectContentProps) {
  return <>{children}</>;
}

export function SimpleSelectItem({ value, children }: SelectItemProps) {
  return null;
}

// Реальная реализация селекта через нативный select
export function RealSelect({ value, onValueChange, placeholder, options, disabled }: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        className="w-full h-11 px-4 pr-10 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="size-4 text-gray-400" />
      </div>
    </div>
  );
}
