const fetchNetflixOriginals = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getNetflixOriginals`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getNetflixOriginalsList;
};

export default fetchNetflixOriginals;
