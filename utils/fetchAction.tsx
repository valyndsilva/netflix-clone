const fetchAction = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAction`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getAction;
};

export default fetchAction;
