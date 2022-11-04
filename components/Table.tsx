import { Check } from "@mui/icons-material";
import { Product } from "@stripe/firestore-stripe-payments";
import React from "react";
interface Props {
  products: Product[];
  selectedPlan: Product | null;
}

function Table({ products, selectedPlan }: Props) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow flex flex-wrap items-center font-medium">
          <td className="tableDataTitle w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base">
            Monthly price
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              £ {product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>
        <tr className="tableRow flex flex-wrap items-center font-medium">
          <td className="tableDataTitle w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base">
            Video quality
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
        <tr className="tableRow flex flex-wrap items-center font-medium">
          <td className="tableDataTitle w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base">
            Resolution
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>
        <tr className="tableRow flex flex-wrap items-center font-medium">
          <td className="tableDataTitle w-full p-2.5 text-center text-sm font-normal text-white md:w-2/5 md:p-3.5 md:text-left md:text-base">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature w-[calc(100%/3)] p-2.5 text-center md:w-[calc(60%/3)] md:p-3.5 ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.portability === "true" && (
                <Check className="inline-block h-8 w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
