import { RegisterOptions } from "react-hook-form";

type Inputs = {
  username: string;
  email?: string;
  password: string;
  confirmPassword?: string;
};

export const validationRules: Record<keyof Inputs, RegisterOptions<Inputs>> = {
  username: {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
    maxLength: {
      value: 20,
      message: "Username cannot exceed 20 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  confirmPassword: {
    required: "Confirm password is required",
  },
};

export const confirmPasswordValidation = (
  password: string
): RegisterOptions<Inputs, "confirmPassword"> => ({
  required: "Confirm password is required",
  validate: (value?: string) =>
    !value
      ? "Confirm password is required"
      : value === password || "Passwords do not match",
});
