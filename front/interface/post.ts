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
  UserId: number;
  PostId: number;
  content: string;
}

export interface LikeData {
  PostId: number;
  UserId: number;
}
