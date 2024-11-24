import React, { useState } from "react";

import viewIcon from "../../assets/icons/view.svg";
import viewOffIcon from "../../assets/icons/view-off.svg";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  icon?: string;
  className?: string;
}

export const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputWithIconProps
>(({ type = "text", placeholder, icon, className = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log(props);
  };

  return (
    <div
      className={`flex items-center gap-2 border-b-[1px] border-gray-100 px-[2px] py-3 focus-within:border-gray-400 
        ${className}`}
    >
      {icon && <img src={icon} className="h-6 w-6 opacity-50" alt="Icon" />}
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        className="body-md my-[2.5px] w-full text-gray-400 placeholder-gray-200 focus:outline-none"
        {...props}
        ref={ref}
      />
      {type === "password" && (
        <button type="button" onClick={togglePasswordVisibility}>
          <img
            className="h-6 w-6 opacity-90"
            src={showPassword ? viewIcon : viewOffIcon}
            alt={showPassword ? "Hide password" : "Show password"}
          />
        </button>
      )}
    </div>
  );
});

InputWithIcon.displayName = "InputWithIcon";
