
import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const FormField = ({ label, required = false, ...props }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-purple-600 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
        {...props}
      />
    </div>
  );
};

export default FormField;
