const fetchTopRatedSeries = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTopRatedSeries`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getTopRatedSeriesList;
};

export default fetchTopRatedSeries;
