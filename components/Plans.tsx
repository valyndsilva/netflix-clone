import { Check } from "@mui/icons-material";
import { Product } from "@stripe/firestore-stripe-payments";
import React, { useContext, useState } from "react";
import { loadCheckout } from "../lib/stripe";
import Loader from "./Loader";
import Table from "./Table";
import useAuth from "../hooks/useAuth";

interface Props {
  products: Product[];
}

function Plans({ products }: Props) {
  // const { user } = useContext(AuthContext);
  const { user } = useAuth();
  // console.log({ user });

  const [selectedPlan, setSelectedPlan] = useState<
    Product["metadata"] | null | any
  >(products[2]);
  const [isBillingLoading, setBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    // loadCheckout(selectedPlan?.prices[0].id!);
    loadCheckout(selectedPlan?.metadata!.priceId);
    setBillingLoading(true);
  };

  return (
    <div>
      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <Check className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <Check className="h-7 w-7 text-[#E50914]" /> Recommendations just
            for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <Check className="h-7 w-7 text-[#E50914]" /> Change or cancel your
            plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative mx-1.5 flex h-20 bg-[#e50914] w-[calc(100%/4)] cursor-default  text-center items-center justify-center rounded-sm font-semibold shadow after:absolute after:top-full after:left-1/2 after:block after:-translate-x-1/2 after:border-8 after:border-b-0 after:border-transparent after:border-t-[#e50914] after:content-[""] md:h-32 lg:mx-8; ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Plans;
