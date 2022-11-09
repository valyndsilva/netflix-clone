import { useAuth } from "../hooks";
import useList from "../hooks/useList";

const fetchList = async () => {
  const { user } = useAuth();
  // console.log(user);
  const list = useList(user?.uid);
  console.log(list);
  return list;
};

export default fetchList;
