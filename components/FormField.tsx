
import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type:string;
  placeholder: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, type, placeholder, className = '', value, onChange, icon }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-dark mb-1">
        {label}
      </label>
      <div className="relative">
         {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
             {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          className={`block w-full rounded-md border border-gray-200 bg-secondary focus:border-primary focus:ring-primary sm:text-sm text-dark placeholder-gray-400 ${icon ? 'pl-10' : 'pl-3'} py-2`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default FormField;
