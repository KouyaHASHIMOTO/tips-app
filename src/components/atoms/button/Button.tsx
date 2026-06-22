import type React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, onClick, disabled, type }: ButtonProps) => {
  return (
    <button
      className="cursor-pointer bg-accent text-white border border-accent px-4 py-2 rounded-lg font-medium hover:opacity-90 active:opacity-80 disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed transition-all"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
