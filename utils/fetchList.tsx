import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useList from "../hooks/useList";

const fetchList = async () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const list = useList(user?.uid);
  console.log(list);
  return list;
};

export default fetchList;
