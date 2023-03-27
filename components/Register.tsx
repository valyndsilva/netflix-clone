import React, { useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { paths } from "../utils/constants";

interface RegisterForm {
  firstName: string;
  email: string;
  password: string;
}

export default function Register() {
  const [signup, setSignup] = useState(false);
  const { signUp, user } = useAuth();
  console.log({ user });
  console.log({ signup });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onFormSubmit: SubmitHandler<RegisterForm> = async (data) => {
    console.log(data);
    if (signup) {
      await signUp(data.firstName, data.email, data.password);
    } else {
      router.push(paths.SIGN_IN_PAGE_PATH);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-black/75 rounded-md box-border w-full max-w-[450px] pt-16 px-16 pb-10 m-auto mb-24">
        <h1 className="text-white text-3xl font-bold mb-7">Sign Up</h1>

        <form
          className="flex flex-col max-w-[450px] w-full"
          onSubmit={handleSubmit(onFormSubmit)}
          method="POST"
        >
          <input
            type="text"
            placeholder="First name"
            // value={firstName}
            {...register("firstName", { required: true })}
            aria-invalid={errors.firstName ? "true" : "false"}
            className={`${
              errors.firstName && "border-b-2 border-orange-500"
            } bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4`}
            // onChange={({ target }) => setFirstName(target.value)}
          />
          {errors.firstName && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a name.
            </p>
          )}
          <input
            type="email"
            placeholder="Email address"
            // value={email}
            {...register("email", { required: true })}
            // onChange={({ target }) => setEmail(target.value)}
            className={`${
              errors.email && "border-b-2 border-orange-500"
            } bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4`}
          />
          {errors.email && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid email.
            </p>
          )}
          <input
            type="password"
            placeholder="Enter password"
            // value={password}
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 4,
            })}
            // onChange={({ target }) => setPassword(target.value)}
            autoComplete="off"
            className={`${
              errors.password && "border-b-2 border-orange-500"
            } bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4`}
          />
          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a password. Your password must contain between 4 and
              20 characters.
            </p>
          )}
          <button
            className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
            // disabled={isInvalid}
            type="submit"
            onClick={() => setSignup(true)}
          >
            Sign Up
          </button>
        </form>

        <p
          className="text-[#737373] text-left text-md font-medium"
          onClick={() => setSignup(false)}
        >
          Already a user?{" "}
          <Link
            href={paths.SIGN_IN_PAGE_PATH}
            className="no-underline hover:underline"
          >
            <span className="text-white cursor-pointer"> Sign in now.</span>
          </Link>
        </p>
        <p className="mt-2 text-sm text-left text-[#8c8c8c]">
          This page is protected by Google reCAPTCHA to ensure you are not a
          bot. Learn more.
        </p>
      </div>
    </>
  );
}
