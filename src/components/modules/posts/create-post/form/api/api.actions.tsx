import { useQuery } from "@tanstack/react-query";

import { generateYoutubeVideoInfo } from "@/helpers";
import { PrePostType } from "@/models/post.types";

export const createPostAction = () => {};

export const useGetYoutubeVideoInfo = (url: string | null | undefined) => {
  const query = useQuery<PrePostType>({
    queryKey: ["pre-post-type", url],

    queryFn: async () => {
      const data = await generateYoutubeVideoInfo(url);
      return data;
    },
    enabled: false,
  });

  return { getYoutubeVideoInfo: query.refetch, ...query };
};
