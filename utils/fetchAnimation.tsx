const fetchAnimation = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAnimation`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getAnimation;
};

export default fetchAnimation;
