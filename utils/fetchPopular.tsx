const fetchPopular = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPopular`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getPopularList;
};

export default fetchPopular;
