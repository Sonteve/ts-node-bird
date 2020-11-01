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
  Comments: {
    User: {
      id: number;
      nickname: string;
    };
    content: string;
  }[];
  createdAt: string;
}

export interface PostParam {
  id: number;
  nickname: string;
  content: string;
}
