export interface LoginParam {
  email: string;
  password: string;
}

/* export interface UserData {
  nickname: string,
  id: number,
  Posts: { id: number }[],
  Followings: [
    { id: shortId.generate(), nickname: "부기초" },
    { id: shortId.generate(), nickname: "Chanho Lee" },
    { id: shortId.generate(), nickname: "neue zeal" },
  ],
  Followers: [
    { id: shortId.generate(), nickname: "부기초" },
    { id: shortId.generate(), nickname: "Chanho Lee" },
    { id: shortId.generate(), nickname: "neue zeal" },
  ],
} */

export interface UserData {
  Posts: { id: number | string }[];
  nickname: string;
  id: number | string;
  Followings: {
    id: number | string;
    nickname: string;
  }[];
  Followers: {
    nickname: string;
  }[];
}

export interface SignupParam {
  email: string;
  nickname: string;
  password: string;
}

export interface FollowParam {
  id: number | string;
  nickname: string;
}
