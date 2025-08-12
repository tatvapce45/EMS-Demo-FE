import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
  icon,
  disabled = false,
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
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-3 border-2 rounded-xl bg-gray-700/50 transition-all duration-300 focus:outline-none focus:ring-0
            ${error
              ? "border-red-600 focus:border-red-400"
              : "border-gray-600 focus:border-blue-400"
            } text-gray-300 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 animate-pulse">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;

