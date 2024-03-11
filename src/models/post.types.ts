import { FieldValue } from "firebase/firestore";

export enum PostContentType {
  Music = "music",
  Video = "video",
}

export type PrePostType = {
  url: string;
  thumbnail_height: number;
  version: string;
  width: number;
  thumbnail_width: number;
  provider_name: string;
  thumbnail_url: string;
  author_name: string;
  author_url: string;
  title: string;
  height: number;
  type: PostContentType;
  provider_url: string;
  html: string;
};

export type PostType = PrePostType & {
  link: string;
  description: string;
  user_id: string;
  user_name: string;
  id: string;
  timestamp: FieldValue;
  content_type: PostContentType;
};
