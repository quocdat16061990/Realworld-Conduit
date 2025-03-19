import { TInputProps } from "./input.type";
const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  name,
  hasPassword,
  register,
  icon,
  error,
}: TInputProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full my-4 px-4 py-3 border rounded-lg border-borderColor focus:border-focusBorderColor outline-none ${className} ${
          error ? "border-red-500" : ""
        }`}
        name={name}
        {...register}
      />
      {hasPassword && icon && <div>{icon}</div>}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
