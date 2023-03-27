// const fetchApi = async (url: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`);
//   console.log(res);
//   const data = await res.json();
//   console.log(data.getData);
//   return data.getData;
// };

// export default fetchApi;

import axios from "axios";
// import {fetch} from "cross-fetch";
const fetchApi = async (url: string) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data.getData;
};

export default fetchApi;