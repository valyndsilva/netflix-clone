const fetchMystery = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getMystery`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getMystery;
};

export default fetchMystery;
