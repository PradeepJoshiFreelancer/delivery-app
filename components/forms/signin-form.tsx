"use client";
import { signIn } from "next-auth/react";
import React from "react";
import Input from "../ui/Input";

type Props = {};

const SigninForm = (props: Props) => {
  const onSubmitHandller = async (formData: FormData) => {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "http://localhost:3000",
    });
  };
  return (
    <form className="space-y-4 md:space-y-6" action={onSubmitHandller}>
      <Input
        id={"email"}
        title={"Your email"}
        type={"email"}
        placeholder={"name@company.com"}
      />
      <Input
        id={"password"}
        title={"Password"}
        type={"password"}
        placeholder={"••••••••"}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required={false}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </button>
    </form>
  );
};

export default SigninForm;
