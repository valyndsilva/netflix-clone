const fetchEastAsiaSeries = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getEastAsiaSeries`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getEastAsiaSeriesList;
};

export default fetchEastAsiaSeries;
