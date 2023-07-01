import type { MouseEventHandler } from "react";

export interface ButtonProps {
  onClick?: MouseEventHandler | undefined;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <div className={className}>
      <button
        className="link flex w-full flex-row items-center justify-center p-3 pb-1 pt-1 text-sm font-semibold transition-transform ease-in-out active:scale-95 active:bg-white/5 md:p-4 lg:p-3 lg:text-base"
        onClick={onClick}
      >
        <span className="z-10">{children}</span>
      </button>
    </div>
  );
};

export default Button;
