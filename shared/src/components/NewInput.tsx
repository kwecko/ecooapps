import {
  useState,
  useRef,
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
  FocusEvent,
} from "react";
import z from "zod";
import { TextField, Input as AriaInput, Label } from "react-aria-components";

interface InputProps {
  name: InputHTMLAttributes<HTMLInputElement>["name"];
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string | Element;
  initialValue?: string | null;
  // validationSchema?: z.ZodTypeAny;
  mask?: (value: string) => string;
  localStorageFormKey?: string;
  icon?: ReactNode;
}

export default function NewInput({
  className,
  name,
  type,
  label,
  initialValue = null,
  // validationSchema,
  mask,
  localStorageFormKey,
  icon,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(initialValue || "");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (rest.onChange) await rest.onChange(e);

    const maskedValue = mask ? mask(e.target.value) : e.target.value;
    setValue(maskedValue);

    if (localStorageFormKey) {
      const formStorageContent = JSON.parse(
        localStorage.getItem(localStorageFormKey) as string
      );

      localStorage.setItem(
        localStorageFormKey,
        JSON.stringify({
          ...formStorageContent,
          [name as string]: maskedValue,
        })
      );
    }

    // if (error)
    //   if (validationSchema.safeParse(e.target.value).success) setError(null);
  };

  // const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
  //   const validation = validationSchema.safeParse(e.target.value);

  //   if (!validation.success) {
  //     setError(JSON.parse(validation.error.message)[0].message);
  //     return;
  //   }
  //   setError(null);
  // };

  return (
    <div className="relative flex flex-col h-[101px] mb-1 text-slate-gray">
      <TextField>
        <Label className="inter-font text-sm leading-[19px] font-normal text-theme-primary">
          {label as ReactNode}
        </Label>
        <div className="relative">
          <AriaInput
            {...rest}
            value={rest.value || value}
            className={`z-0 flex item-center w-full h-[48px] mt-2 p-3 border rounded-[6px] border-theme-primary inter-font text-base leading-5 font-normal ${className}`}
            name={name}
            type={inputType}
            ref={inputRef}
            // onBlur={handleBlur}
            onChange={handleChange}
          />
          <div
            onClick={handleIconClick}
            className="top-0 right-0 z-50 absolute flex items-center h-full text-xl pr-3 cursor-pointer"
          >
            {icon}
          </div>
        </div>
        {error && <div className="text-sm mt-1.5 text-red-500">{error}</div>}
      </TextField>
    </div>
  );
}
