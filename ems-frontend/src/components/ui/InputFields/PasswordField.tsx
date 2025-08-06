import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = "Enter your password",
  showPassword,
  toggleShowPassword,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300 block">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl bg-gray-700/50 transition-all duration-300 focus:outline-none focus:ring-0 
                    ${
                      error
                        ? "border-red-600 focus:border-red-400"
                        : "border-gray-600 focus:border-blue-400"
                    } text-white placeholder-gray-400`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
};

export default PasswordField;
