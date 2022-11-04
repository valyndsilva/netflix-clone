const fetchSeries = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSeries`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getSeriesList;
};

export default fetchSeries;
