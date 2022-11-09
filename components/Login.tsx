import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { RESET_PAGE_PATH, SIGN_UP_PAGE_PATH } from "../config/paths";
import useAuth from "../hooks/useAuth";
import GlobalContext from "../context/GlobalContext";

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, user } = useAuth();
  console.log({ user });
  const { profile } = useContext(GlobalContext);
  console.log(profile);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onFormSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log(data);
    if (login) {
      await signIn(data.email, data.password);
    } else {
      router.push(SIGN_UP_PAGE_PATH);
    }
  };
  return (
    <div className="flex flex-col bg-black/75 rounded-md box-border w-full max-w-[450px] pt-16 px-16 pb-10 m-auto mb-24">
      <h1 className="text-white text-3xl font-bold mb-7">Sign In</h1>
      <form
        className="flex flex-col max-w-[450px] w-full"
        onSubmit={handleSubmit(onFormSubmit)}
        method="POST"
      >
        <input
          type="email"
          className={`${
            errors.email && "border-b-2 border-orange-500"
          } bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4`}
          placeholder="Email address"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="p-1 text-[13px] font-light  text-orange-500">
            Please enter a valid email.
          </p>
        )}
        <input
          type="password"
          className={`${
            errors.password && "border-b-2 border-orange-500"
          } bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4`}
          placeholder="Password"
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 4,
          })}
          autoComplete="off"
        />
        {errors.password && (
          <p className="p-1 text-[13px] font-light  text-orange-500">
            Please enter a password. Your password must contain between 4 and 20
            characters.
          </p>
        )}

        <button
          className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
          type="submit"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
      </form>
      <div className="flex text-[#737373] text-left text-sm font-medium justify-between w-full mb-10">
        <span>Forgot your password? </span>
        <Link
          href={RESET_PAGE_PATH}
          className="no-underline hover:underline self-end"
        >
          <span className="hover:text-white text-sm cursor-pointer text-[#737373]">
            Need help.
          </span>
        </Link>
      </div>
      <p
        className="text-[#737373] text-left text-md font-medium"
        onClick={() => setLogin(false)}
      >
        New to Netflix?{" "}
        <Link href={SIGN_UP_PAGE_PATH} className="no-underline hover:underline">
          <span className="text-white cursor-pointer">Sign up now.</span>
        </Link>
      </p>
      <p className="mt-2 text-xs text-left text-[#8c8c8c]">
        This page is protted by Google reCAPTCHA to ensure you're not a bot.{" "}
        <span className="text-blue-500">Learn more.</span>
      </p>
    </div>
  );
}

export default Login;
