export interface Post {
  id: number | string;
  User: {
    id: number | string;
    nickname: string;
  };
  content: string;
  Images: {
    src: string;
  }[];
  Comments: Comment[];
  createdAt: string;
}

export interface PostParam {
  id: number | string;
  nickname: string;
  content: string;
}

export interface Comment {
  User: {
    id: number | string;
    nickname: string;
  };
  content: string;
}

export interface CommentData {
  commentData: {
    User: {
      id: number | string;
      nickname: string;
    };
    content: string;
  };
  postId: number;
}

export interface CommentParam {
  userId: number | string;
  postId: number | string;
  nickname: string;
  content: string;
}
