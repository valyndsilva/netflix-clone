import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SIGN_UP_PAGE_PATH } from "../config/paths";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks";

interface ResetForm {
  email: string;
}

export default function Reset() {
  const [resetFn, setResetFn] = useState(false);
  const { reset } = useAuth();
  // const { email, setEmail } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>();

  const onFormSubmit: SubmitHandler<ResetForm> = async (data) => {
    console.log(data);
    if (resetFn) {
      reset(data.email);
    } else {
      router.push(SIGN_UP_PAGE_PATH);
    }
  };
  return (
    <div className="reset h-full w-full flex items-center justify-center">
      <div className="reset__container flex flex-col text-center bg-[#181818] py-12 px-8 mt-2 rounded-md">
        <h1 className="text-white text-3xl font-bold mb-7">Reset Password</h1>
        <form
          className="flex flex-col max-w-[450px] w-full"
          onSubmit={handleSubmit(onFormSubmit)}
          method="POST"
        >
          <input
            type="text"
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
          <button
            className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
            // onClick={async () => {
            //   await sendPasswordReset(email).then(() => {
            //     router.push("/");
            //   });
            // }}
            onClick={() => setResetFn(true)}
          >
            Send password reset email
          </button>
        </form>
        <p
          className="text-[#737373] text-left text-md font-medium"
          onClick={() => setResetFn(false)}
        >
          Don't have an account?{" "}
          <Link
            href={SIGN_UP_PAGE_PATH}
            className="no-underline hover:underline"
          >
            <span className="hover:text-white cursor-pointer">
              Register now.
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
