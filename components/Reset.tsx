import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { sendPasswordReset } from "../config/firebaseClient";
import { SIGN_UP_PAGE_PATH } from "../config/paths";
import { AuthContext } from "../context/AuthContext";
function Reset() {
  const { email, setEmail } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="reset h-full w-full flex items-center justify-center">
      <div className="reset__container flex flex-col text-center bg-[#181818] py-12 px-8 mt-2 rounded-md">
        <h1 className="text-white text-3xl font-bold mb-7">Reset Password</h1>
        <input
          type="text"
          className="bg-[#333] rounded-md border-0 text-white h-12 leading-10 py-1 px-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <button
          className="bg-[#e50914] rounded-md text-md text-bold mt-6 mx-0 mb-3 p-4 border-0 text-white cursor-pointer disabled:opacity-50"
          onClick={async () => {
            await sendPasswordReset(email).then(() => {
              router.push("/");
            });
          }}
        >
          Send password reset email
        </button>
        <p className="text-[#737373] text-left text-md font-medium">
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
export default Reset;
