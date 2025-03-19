import path from "@/constants/path";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { confirmPasswordValidation, validationRules } from "@/utils/validation";

interface Inputs {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const passwordValue = watch("password");
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <Link
          className="text-[#5CB85C] text-sm bloc text-center mt-2"
          to={path.signIn}
        >
          {" "}
          Have an account
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <Input
            className="rounded-xl border-gray-300 focus:border-blue-400"
            type="text"
            placeholder="Enter your username"
            name="username"
            register={register("username", validationRules.username)}
            error={errors.username}
          />
          <Input
            className="rounded-xl border-gray-300 focus:border-blue-400"
            type="email"
            placeholder="Enter your email"
            name="email"
            register={register("email", validationRules.email)}
            error={errors.email}
          />
          <Input
            className="rounded-xl border-gray-300 focus:border-blue-400"
            type="password"
            placeholder="Enter your password"
            name="password"
            register={register("password", validationRules.password)}
            error={errors.password}
          />
          <Input
            className="rounded-xl border-gray-300 focus:border-blue-400"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            register={register(
              "confirmPassword",
              confirmPasswordValidation(passwordValue)
            )}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
