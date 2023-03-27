import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

export default function useList(uid: string | undefined) {
  const [list, setList] = useState<MovieItem[] | DocumentData[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);

  return list;
}
