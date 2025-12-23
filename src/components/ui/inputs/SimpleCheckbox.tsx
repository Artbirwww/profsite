import { Check } from '../../SimpleIcons';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SimpleCheckbox({ id, checked, onCheckedChange }: CheckboxProps) {
  return (
    <div className="relative inline-flex">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="peer sr-only"
      />
      <div
        onClick={() => onCheckedChange(!checked)}
        className="size-5 shrink-0 rounded border-2 border-gray-300 bg-white cursor-pointer transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 hover:border-indigo-400 flex items-center justify-center"
      >
        {checked && <Check className="size-3.5 text-white" />}
      </div>
    </div>
  );
}
