const fetchMovies = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getMovies`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getMovieList;
};

export default fetchMovies;
