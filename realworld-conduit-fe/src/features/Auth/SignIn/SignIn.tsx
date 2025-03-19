import path from "@/constants/path";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import { validationRules } from "@/utils/validation";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { Auth } from "@/features/Auth/auth.type";


const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>();
  const onSubmit: SubmitHandler<Auth> = (data) => console.log(data);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
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
            register={register(
              "username",
              validationRules.username as RegisterOptions<Auth, "username">
            )}
            error={errors.username}
          />
          <Input
            className="rounded-xl border-gray-300 focus:border-blue-400"
            type="password"
            placeholder="Enter your password"
            name="password"
            register={register(
              "password",
              validationRules.password as RegisterOptions<Auth, "password">
            )}
            error={errors.password}
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

export default SignIn;
