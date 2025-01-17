import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "outline"
    | "shadow";
  size?: "small" | "default" | "large";
  className?: string;
  [key: string]: unknown;
};

const Badge = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: BadgeProps) => {
  const baseStyles = "inline-flex items-center rounded-md font-medium";

  const variants = {
    default: "bg-primary text-white",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 font-semibold border-gray",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    outline: "border border-gray-300 text-gray-700 bg-white",
    shadow:
      "shadow shadow-md shadow-black/40 bg-neutral-700/40 hover:bg-neutral-700 text-white ",
  };

  const sizes = {
    small: "px-2 py-0.5 text-xs",
    default: "px-2.5 py-0.5 text-sm",
    large: "px-3 py-1 text-base",
  };

  const variantStyle = variants[variant] || variants.default;
  const sizeStyle = sizes[size] || sizes.default;

  return (
    <span
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
