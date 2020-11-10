import { User } from "./user";

export interface Post {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
  RetweetId: number;
  Images: {
    src: string;
  }[];
  Comments: Comment[];
  User: User;
  Likers: { id: number }[];
  Retweet: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    RetweetId: number | null;
    Images: { src: string }[];
    User: {
      id: number;
      nickname: string;
    };
  } | null;
}

export interface PostParam {
  content: string;
}

export interface Comment {
  content: string;
  PostId: number;
  User: {
    id: number;
    nickname: string;
  };
}

export interface CommentParam {
  content: string;
  UserId: number;
  PostId: number;
}

export interface LikeData {
  PostId: number;
  UserId: number;
}
