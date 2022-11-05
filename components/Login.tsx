import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { logInWithEmailAndPassword } from "../config/firebaseClient";
import { AuthContext } from "../context/AuthContext";
import {
  DASHBOARD_PAGE_PATH,
  HOME_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
} from "../config/paths";

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { user, email, setEmail, password, setPassword } =
    useContext(AuthContext);
  // console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // check form input elements are valid
  const isInvalid = password === "" || email === "";

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) {
      router.push(HOME_PAGE_PATH);
      //  setLoading(false);
    }
    if (user) {
      console.log("Signed in! Navigate to browse page...");
      router.push(DASHBOARD_PAGE_PATH);
      setLoading(false);
    }
  }, [user, loading]);


  if (user) {
    // user is signed out or still being checked.
    // don't render anything
    router.push(DASHBOARD_PAGE_PATH);
  }

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
        <Link href={SIGN_UP_PAGE_PATH} className="no-underline hover:underline">
          <span className="text-white cursor-pointer">Sign up now.</span>
        </Link>
      </p>
      <p className="mt-2 text-sm text-left text-[#8c8c8c]">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.
        Learn more.
        {/* <div>
          <Link href="/reset">Forgot Password</Link>
        </div> */}
      </p>
    </div>
  );
}

export default Login;
