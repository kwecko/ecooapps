import { 
  useState,
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
  FocusEvent,
} from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { TextField, Input as AriaInput, Label } from "react-aria-components";

import z from "zod";

interface InputProps {
  type?: "email" | "password" | "text" | "number" | "date";
  label: string | Element;
  initialValue?: string | null;
  validationSchema: z.ZodTypeAny;
  icon?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void | string | undefined;
  className?: string;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

export default function Input({
  type,
  label,
  initialValue = null,
  validationSchema,
  icon,
  value,
  onChange,
  className,
  maxLength,
  placeholder,
  readOnly,
}: InputProps) {

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    if (onChange) await onChange(e);
    if (validationSchema.safeParse(e.target.value).success) setError(null);
  }

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const validation = validationSchema.safeParse(e.target.value);

    if (!readOnly) {
      if (!validation.success) {
        setError(JSON.parse(validation.error.message)[0].message);
        return;
      }
      setError(null);
    }
    
  };

  return (
    <div className="relative flex flex-col h-[101px] mb-1 text-slate-gray">
      <Label className="inter-font text-sm leading-[19px] font-normal text-theme-primary">
        {label as ReactNode}
      </Label>
      <div className="relative"> 
        <AriaInput
          className={`z-0 flex item-center w-full h-[48px] mt-2 p-3 border rounded-[6px] border-theme-primary inter-font text-base leading-5 font-normal ${className}`}
          type={inputType}
          onChange={handleChange}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          readOnly={readOnly}
          onBlur={handleBlur}
        />
        <div
          onClick={handleIconClick}
          className="cursor-pointer absolute text-xl top-[5px] right-0 pr-3 flex items-center h-full z-50"
        >
          {icon}
        </div>
      </div>
      {typeof error === "string" && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
}
