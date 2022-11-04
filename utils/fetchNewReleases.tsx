const fetchNewReleases = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getNewReleases`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getNewReleasesList;
};

export default fetchNewReleases;
