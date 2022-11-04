const fetchEastAsiaMovies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getEastAsiaMovies`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getEastAsiaMoviesList;
};

export default fetchEastAsiaMovies;
