"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { LucideMusic, VideoIcon } from "lucide-react";
import Image from "next/Image";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as zod from "zod";

import { firestore } from "@/api";
import { CreatePostInterface } from "@/components/modules/header/CreatePost.sheet";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { cfl } from "@/helpers";
import useInitializationUser from "@/hooks/auth";
import { PostContentType, PostType } from "@/models/post.types";

import { useGetYoutubeVideoInfo } from "./api/api.actions";
import PostFormSchema from "./helpers/post.schema";

const CreatePostFormComponent: FC<Pick<CreatePostInterface, "setOpen">> = ({
  setOpen,
}) => {
  const [contentType, setContentType] = React.useState<PostContentType>(
    PostContentType.Music
  );

  const { user } = useInitializationUser();

  const form = useForm<FormType>({
    resolver: zodResolver(PostFormSchema),
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (data: PostType) => {
      return setDoc(doc(firestore, "posts", data.id), data);
    },
  });

  const link = form.watch("link");

  const { getYoutubeVideoInfo, data: prePostData } =
    useGetYoutubeVideoInfo(link);

  function onSubmit(data: FormType) {
    const dto: PostType = {
      ...prePostData,
      user_id: user.uid,
      user_name: user.email,
      id: uuidv4(),
      timestamp: serverTimestamp(),
      content_type: contentType,
      link: `${data.link}`,
      description:
        data.description != null && data.description.length > 0
          ? data.description
          : "This is amazing music track!",
    };
    mutation.mutate(dto);
  }

  useEffect(() => {
    if (link != null) {
      getYoutubeVideoInfo();
    }
  }, [getYoutubeVideoInfo, link]);

  useEffect(() => {
    if (mutation.isSuccess && prePostData) {
      const { author_name, title } = prePostData;
      toast({
        title: "Post successfully created! 🚀✨",
        description: `Now everyone will be able to appreciate: ${author_name} - ${title} 🔥`,
      });
      setOpen();
    }

    if (mutation.isError) {
      toast({
        title: "Something went wrong.",
        description: `Try again`,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isError, mutation.isSuccess, prePostData, toast]);

  return (
    <DialogContent className="sm:max-w-[425px] transition-transform">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you`re done.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube Link</FormLabel>
                  <FormControl>
                    <Input placeholder="youtube.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descritpion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This is amazing music track!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label>Content type:</Label>
              <ToggleGroup
                type="single"
                value={contentType}
                onValueChange={(value: PostContentType) => {
                  if (value) setContentType(value);
                }}
                className="flex flex-row items-center justify-start"
              >
                {Object.values(PostContentType).map((item) => (
                  <ToggleGroupItem
                    value={item as PostContentType}
                    aria-label="Toggle bold"
                    key={item}
                    className="font-bold flex items-center justify-center gap-2 mt-2"
                  >
                    {item === PostContentType.Music ? (
                      <LucideMusic />
                    ) : (
                      <VideoIcon />
                    )}
                    <p className="font-bold">{cfl(item)}</p>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {prePostData != null && (
              <div>
                <p className="font-bold text-lg mb-2 mt-4">
                  {prePostData.author_name + " " + prePostData.title}
                </p>
                <Image
                  src={prePostData.thumbnail_url}
                  alt={prePostData.author_name + " " + prePostData.title}
                  width={425}
                  height={(425 / 16) * 9}
                />
              </div>
            )}
          </div>
          <Separator className="mt-4" />
          <DialogFooter className="mt-6">
            <Button
              type="submit"
              loading={`${mutation.isPending}`}
              className="font-extrabold text-sm"
            >
              Make magic ✨
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

type FormType = zod.infer<typeof PostFormSchema>;

export default CreatePostFormComponent;
