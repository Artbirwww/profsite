interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface RadioGroupItemProps {
  value: string;
  id: string;
}

export function SimpleRadioGroup({ value, onValueChange, children }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  );
}

export function SimpleRadioGroupItem({ value, id }: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      value={value}
      className="size-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
    />
  );
}
