import { AxiosError } from "axios";
import produce from "immer";
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from "typesafe-actions";
import {
  Comment,
  CommentData,
  CommentParam,
  Post,
  PostParam,
} from "../interface/post";
import shortId from "shortid";

export interface PostState {
  mainPosts: Post[]; // 메인에 보여질 포스트내용
  imagePaths: string[]; // 미리보기 이미지 경로
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: AxiosError | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: AxiosError | null;
}

// 초기 상태
const initialState: PostState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "손티브",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src:
            "data:image/png;base64,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",
        },
        {
          src:
            "data:image/png;base64,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",
        },
        {
          src:
            "data:image/png;base64,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",
        },
      ],
      Comments: [
        {
          User: {
            id: 22,
            nickname: "nero",
          },
          content: "우와~ 또하세요~?",
        },
        {
          User: {
            id: 23,
            nickname: "toth",
          },
          content: "jum is dorok",
        },
      ],
      createdAt: "2020-10-29",
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
let tempId = 2;

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const addPost = createAsyncAction(
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE
)<PostParam, Post, AxiosError>();

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addComment = createAsyncAction(
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
)<CommentParam, CommentData, AxiosError>();

type PostAction = ActionType<typeof addPost | typeof addComment>;

const post = createReducer<PostState, PostAction>(initialState, {
  [ADD_POST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.addPostDone = false;
      draft.addPostLoading = true;
    }),
  [ADD_POST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.payload);
      tempId++;
    }),
  [ADD_POST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.addPostLoading = false;
      draft.addPostError = action.payload;
    }),
  [ADD_COMMENT_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.addCommentDone = false;
      draft.addCommentLoading = true;
    }),
  [ADD_COMMENT_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      const index = state.mainPosts.findIndex(
        (post) => post.id === action.payload.postId
      );
      draft.mainPosts[index].Comments.push(action.payload.commentData);

      tempId++;
    }),
  [ADD_COMMENT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.addCommentLoading = false;
      draft.addCommentError = action.payload;
    }),
});

export default post;
