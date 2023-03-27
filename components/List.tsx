import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";
import apiConfig from "../config/apiConfig";
import DefaultRow from "./DefaultRow";
import FeaturedRow from "./FeaturedRow";

interface Props {
  defaultRow?: boolean;
  heading: string;
  featuredRow?: boolean;
  endpoint: string;
  query?: string;
}

function List({
  defaultRow = true,
  heading,
  featuredRow = false,
  endpoint,
  query,
}: Props) {
  const [media, setMedia] = useState([]);

  async function getEndpoint() {
    try {
      const url = endpoint;
      const result = await axiosClient.get(url, {
        params: { api_key: apiConfig.apiKey },
      }); // works

      console.log(result.data.results);
      // setMedia(result.data.data);
      setMedia(result.data.results);
    } catch (error) {}
  }

  useEffect(() => {
    getEndpoint();
  }, []);

  return (
    <div className="flex flex-col capitalize mt-0 md:mt-[-9rem]">
      <strong className="ml-12 py-2 px-0 w-fit">{heading}</strong>
      <div className="flex flex-row px-24 pt-12 pb-9 md:pb-48 overflow-x-auto mt-[-3rem] ml-[-3rem] scrollbar-none">
        {media?.map((item, index) => {
          if (featuredRow) {
            if (index < 10) {
              return <FeaturedRow key={index} index={index + 1} item={item} />;
            }
          } else {
            return (
              <DefaultRow key={index} defaultRow={defaultRow} item={item} />
            );
          }
          return (
                <DefaultRow key={index} defaultRow={defaultRow} item={item} />
              );
        }
        )}
      </div>
    </div>
  );
}

export default List;
