export interface LoginParam {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  Posts: { id: number }[];
  Followings: {
    id: number;
    nickname?: string;
  }[];
  Followers: {
    id: number;
    nickname: string;
  }[];
}

export interface SignupParam {
  email: string;
  nickname: string;
  password: string;
}

export interface FollowParam {
  id: number;
}

export interface User {
  id: number;
  nickname: string;
}
