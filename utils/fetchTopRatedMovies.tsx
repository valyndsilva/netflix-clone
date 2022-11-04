const fetchTopRatedMovies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTopRatedMovies`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getTopRatedMoviesList;
};

export default fetchTopRatedMovies;
