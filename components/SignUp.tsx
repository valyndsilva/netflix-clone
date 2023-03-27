import React, { useEffect, useState } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { registerWithEmailAndPassword } from "../lib/firebaseClient";

interface FormData {
  firstName: string;
  email: string;
  password: string;
}

export default function SignUp() {
    const { user } = useAuth();
    console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  // check form input elements are valid
  const isInvalid = firstName === "" || password === "" || email === "";

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push("/browse");
  }, [user, loading]);

  const onFormSubmit = async (data: FormData) => {
    console.log(data);
    return registerWithEmailAndPassword(
      data.firstName,
      data.email,
      data.password
    ).then(() => {
      router.push("/browse");
    });
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
            className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
            onChange={({ target }) => setFirstName(target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            // value={email}
            {...register("email")}
            onChange={({ target }) => setEmail(target.value)}
            className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4"
          />
          <input
            type="password"
            placeholder="Enter password"
            // value={password}
            {...register("password")}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="off"
            className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-0"
          />

          <button
            className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-[#737373] text-left text-md font-medium">
          Already a user?{" "}
          <Link href="/login" className="no-underline hover:underline">
            <span className="text-white cursor-pointer"> Sign in now.</span>
          </Link>
        </p>
        <p className="mt-2 text-sm text-left text-[#8c8c8c]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          Learn more.
        </p>
      </div>
    </>
  );
}
