export interface Post {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
  UserId: number;
  RetweetId: number | null;
  Images: {
    src: string;
  }[];
  Comments: CommentData[];
  createdAt: string;
  updatedAt: string;
  Likers: { id: number; nickname: string }[];
}

export interface PostParam {
  content: string;
}

export interface CommentParam {
  PostId: number;
  UserId: number;
  content: string;
}

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  PostId: number;
  User: {
    id: number;
    nickname: string;
  };
}
