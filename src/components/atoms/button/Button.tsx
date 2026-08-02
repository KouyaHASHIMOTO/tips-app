import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost";
}

export const Button = ({
  children,
  onClick,
  disabled,
  type,
  variant = "ghost",
}: ButtonProps) => {
  const baseClass =
    "cursor-pointer px-4 py-2 rounded-lg font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40";

  const variantClass =
    variant === "primary"
      ? "bg-[#20242A] text-white hover:bg-[#34302B]"
      : "border border-border text-text-sub hover:text-text-main hover:border-accent";

  return (
    <button
      className={`${baseClass} ${variantClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
