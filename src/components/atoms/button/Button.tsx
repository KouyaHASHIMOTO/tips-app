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
      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
