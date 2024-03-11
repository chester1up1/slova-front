"use-client";

import { User2Icon } from "lucide-react";
import Image from "next/image";
import React, { FC, PropsWithChildren } from "react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PostContentType } from "@/models/post.types";

import { useGetAllPosts } from "./api.actions";

const AllPosts = () => {
  const { data, isLoading } = useGetAllPosts();

  if (isLoading) {
    return (
      <Container>
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <div
            className="flex items-center gap-8 justify-between"
            key={`all-post-skeleton__${i}`}
          >
            <div>
              <Skeleton className="w-[184px] h-6" />
              <Skeleton className="w-[456px] h-[224px] mt-4" />
              <Skeleton className="w-[256px] h-6 mt-4" />
              <Skeleton className="w-[456px] h-6 mt-2" />
            </div>
            <Skeleton className="w-[184px] h-[184px] rounded-full" />
          </div>
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {data.map((post, index) => {
        const {
          id,
          user_name,
          thumbnail_url,
          title,
          author_name,
          description,
          content_type = "video",
        } = post;

        return (
          <div key={id} className=" ">
            <div
              className={`w-[8px] h-[100vh] ${
                content_type === PostContentType.Music ? "bg-music" : "bg-video"
              } absolute left-0 rounded-sm`}
            >
              <div>
                <User2Icon
                  className={`absolute bg-card rounded-lg w-[48px] h-[48px] p-[8px] top-0 left-1/2 translate-x-[-50%] border ${
                    content_type === PostContentType.Music
                      ? "border-music"
                      : "border-video"
                  }`}
                />
              </div>
            </div>
            <div className={`border border-card rounded-md p-3 ml-8`}>
              <div className="bg-card w-[184px] p-2 rounded-md">
                @{user_name}
              </div>
              <div className="w-[456px] h-[224px] mt-4 relative bg-card p-2 rounded-sm">
                <div className="w-full h-full relative">
                  <Image
                    src={thumbnail_url}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="max-w-[456px]">
                <p className="mt-4 font-bold text-lg capitalize-first">
                  <span className="text-primary font-extrabold">
                    {author_name}
                  </span>{" "}
                  - {title}
                </p>
                <p className="capitalize-first mt-2 opacity-50">
                  {description}
                </p>
                <div className="mt-2">
                  <Separator className="mb-2" />
                  <Badge className={`bg-${content_type}`}>{content_type}</Badge>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-8 mt-16 relative ">{children}</div>;
};

export default AllPosts;
