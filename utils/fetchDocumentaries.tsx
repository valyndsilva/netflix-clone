const fetchDocumentaries = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDocumentaries`
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.getDocumentaries;
};

export default fetchDocumentaries;
