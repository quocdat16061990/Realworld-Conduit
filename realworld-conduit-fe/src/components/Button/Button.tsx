import { ButtonType } from "./Button.type";

const Button: React.FC<ButtonType> = ({
  className = "",
  type = "button",
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`btn w-full px-4 py-3 text-lg font-normal rounded-lg cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button