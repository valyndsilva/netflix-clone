interface IGenres {
  id: number;
  name: string;
}
const fetchGenres = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getGenres`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  const genres: IGenres = data.filteredGenres;
  console.log(genres);
  return genres;
};

export default fetchGenres;
