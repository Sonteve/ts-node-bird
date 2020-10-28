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
  Comments:
    | {
        User: {
          nickname: string;
        };
        content: string;
      }[]
    | null;
  createdAt: string;
}
