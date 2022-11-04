import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import Membership from "../components/Membership";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../config/firebaseClient";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";
import Image from "next/image";
import { ArrowBackOutlined } from "@mui/icons-material";
import { Footer } from "../components";

interface Props {
  products: Product[];
}

function Account({ products }: Props) {
  console.log(products);

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const subscription = useSubscription(user);

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center  justify-between w-full">
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <h1 className="text-3xl md:text-4xl">Account</h1>
            <div className="relative w-7 h-7 z-30">
              <Image
                src="/membersince.svg"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            {subscription !== null && (
              <p className="text-xs font-semibold text-[#555]">
                Member since {subscription?.created}
              </p>
            )}
          </div>
          <Link href="/browse">
            <div className="flex space-x-4 z-40 items-center cursor-pointer text-white font-bold p-[15px]">
              <ArrowBackOutlined className="!w-10 !h-10 " />
              <span>Back</span>
            </div>
          </Link>
        </div>
        <Membership />
        {subscription !== null && (
          <div className="mt-6 items-center grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
            <h4 className="text-lg text-[gray]">Plan Details</h4>
            {/* Find the current plan */}
            <div className="col-span-2 font-medium">
              {
                products.filter(
                  (product) => product.id === subscription?.product
                )[0]?.name
              }
            </div>
            <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
              Change plan
            </p>
          </div>
        )}

        <div className="mt-6 items-center grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={async () => {
              await auth.signOut().then(() => {
                router.push("/");
              });
            }}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
      <hr className="border-gray-600" />
      <Footer />
    </div>
  );
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
