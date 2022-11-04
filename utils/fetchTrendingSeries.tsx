const fetchTrendingSeries = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTrendingSeries`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getTrendingSeries;
};

export default fetchTrendingSeries;
