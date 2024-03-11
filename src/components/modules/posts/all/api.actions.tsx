import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import { DB_Colenction, firestore } from "@/api";
import { PostType } from "@/models/post.types";

export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["posts-all"],

    queryFn: async () => {
      const data = await getAllPostsRequest();
      return data;
    },
  });

  return query as UseQueryResult<PostType[], Error>;
};

async function getAllPostsRequest() {
  const querySnapshot = await getDocs(
    collection(firestore, DB_Colenction.Posts)
  );

  let data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  return data.reverse();
}
