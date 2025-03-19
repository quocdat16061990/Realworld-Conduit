import { FieldError, UseFormRegisterReturn } from "react-hook-form";
export interface TInputProps {
  type: "text" | "email" | "number" | "password";
  placeholder?: string;
  value?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string | undefined;
  hasPassword?: boolean;
  icon?: React.ReactNode;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}
