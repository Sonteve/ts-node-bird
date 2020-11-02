export interface Post {
  id: number;
  User: {
    id: number;
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
  id: number;
  nickname: string;
  content: string;
}

export interface Comment {
  User: {
    id: number;
    nickname: string;
  };
  content: string;
}

export interface CommentData {
  commentData: {
    User: {
      id: number;
      nickname: string;
    };
    content: string;
  };
  postId: number;
}

export interface CommentParam {
  userId: number;
  postId: number;
  nickname: string;
  content: string;
}
