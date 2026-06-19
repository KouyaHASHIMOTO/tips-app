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
      className="cursor-pointer bg-orange text-brown border-2 border-brown px-4 py-2 rounded-xl font-semibold shadow-retro-sm hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed transition-all"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
