import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { logInWithEmailAndPassword } from "../config/firebaseClient";
import { AuthContext } from "../context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(true);

  // check form input elements are valid
  const isInvalid = password === "" || email === "";

  // useEffect(() => {
  //   if (loading) {
  //     // maybe trigger a loading screen
  //     return;
  //   }
  //   if (user) router.push("/browse");
  // }, [user, loading]);

  const onFormSubmit: SubmitHandler<LoginData> = async (data) => {
    console.log(data);

    return logInWithEmailAndPassword(data.email, data.password).then(() => {
      router.push("/browse");
    });
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
          onChange={({ target }) => setEmail(target.value)}
        />

        <input
          type="password"
          className={`${
            errors.password && "border-b-2 border-orange-500"
          } bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5 mb-4`}
          placeholder="Password"
          {...register("password")}
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="off"
        />
        {/* <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input w-full rounded bg-[#333333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545]"
              {...register("email", { required: true })}
              onChange={({ target }) => setEmail(target.value)}
            />
            {errors.email && (
              <p className="text-sm  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="input w-full rounded bg-[#333333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545]"
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="off"
            />
            {errors.password && (
              <p className="text-sm  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div> */}
        <button
          className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
          disabled={isInvalid}
          type="submit"
        >
          Sign In
        </button>
      </form>

      <p className="text-[#737373] text-left text-md font-medium">
        New to Netflix?{" "}
        <Link href="/signup" className="no-underline hover:underline">
          <span className="text-white cursor-pointer">Sign up now.</span>
        </Link>
      </p>
      <p className="mt-2 text-sm text-left text-[#8c8c8c]">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
        Learn more.
      </p>
    </div>
  );
}

export default Login;
