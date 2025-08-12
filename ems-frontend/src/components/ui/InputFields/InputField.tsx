import React from "react";
interface InputFieldProps {
  label: string;
  name: string;
  value: string|number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?:string;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type="text",
  error,
  placeholder = "Enter your email",
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300 block">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? "pl-10":"pl-4"} pr-4 py-3 border-2 rounded-xl bg-gray-700/50  transition-all duration-300 focus:outline-none focus:ring-0 
            ${
              error
                ? "border-red-600 focus:border-red-400"
                : "border-gray-600 focus:border-blue-400"
            } text-white placeholder-gray-400`}
          placeholder={placeholder || "Enter your value"}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
};
export default InputField;
