// CheckboxClient.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";

type CheckboxClientProps = {
  checked: boolean | string;
  onCheckedChange: (value: boolean) => void;
  ariaLabel: string;
  className?: string;
};

const CheckboxClient: React.FC<CheckboxClientProps> = ({
  checked,
  onCheckedChange,
  ariaLabel,
  className,
}) => {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
      className={className}
    />
  );
};

export default CheckboxClient;
