const fetchTrendingMovies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTrendingMovies`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getTrendingMovies;
};

export default fetchTrendingMovies;
