const fetchComedyMovies = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComedyMovies`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getComedyMovies;
};

export default fetchComedyMovies;
