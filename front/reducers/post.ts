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
  CommentParam,
  LikeData,
  Post,
  PostParam,
} from "../interface/post";
import shortId from "shortid";
import faker from "faker";

export interface PostState {
  mainPosts: Post[]; // 메인에 보여질 포스트내용
  imagePaths: string[]; // 미리보기 이미지 경로
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: AxiosError | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: AxiosError | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: AxiosError | null;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: AxiosError | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: AxiosError | null;
  unLikePostLoading: boolean;
  unLikePostDone: boolean;
  unLikePostError: AxiosError | null;
  hasMorePosts: boolean;
}

// 초기 상태
const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
  hasMorePosts: true,
};

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
)<CommentParam, Comment, AxiosError>();

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
export const removePost = createAsyncAction(
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE
)<{ postId: number }, { PostId: number }, AxiosError>();

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const likePost = createAsyncAction(
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE
)<{ postId: number }, LikeData, AxiosError>();

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const unLikePost = createAsyncAction(
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE
)<{ postId: number }, LikeData, AxiosError>();

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const loadPosts = createAsyncAction(
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE
)<undefined, Post[], AxiosError>();

type PostAction = ActionType<
  | typeof addPost
  | typeof addComment
  | typeof removePost
  | typeof loadPosts
  | typeof likePost
  | typeof unLikePost
>;

const post = createReducer<PostState, PostAction>(initialState, {
  [LIKE_POST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.likePostDone = false;
      draft.likePostLoading = true;
    }),
  [LIKE_POST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
      if (!post) return;
      post.Likers.push({ id: action.payload.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;

      /* draft.mainPosts.unshift(action.payload); */
    }),
  [LIKE_POST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.likePostLoading = false;
      draft.likePostError = action.payload;
    }),
  [UNLIKE_POST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.unLikePostDone = false;
      draft.unLikePostLoading = true;
    }),
  [UNLIKE_POST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
      if (!post) return;
      const index = post.Likers.findIndex(
        (v) => v.id === action.payload.UserId
      );
      post.Likers.splice(index, 1);
      draft.unLikePostLoading = false;
      draft.unLikePostDone = true;
      /* draft.mainPosts.unshift(action.payload); */
    }),
  [UNLIKE_POST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.unLikePostLoading = false;
      draft.unLikePostError = action.payload;
    }),
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
      const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
      post?.Comments.unshift(action.payload);
    }),
  [ADD_COMMENT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.addCommentLoading = false;
      draft.addCommentError = action.payload;
    }),
  [REMOVE_POST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.removePostDone = false;
      draft.removePostLoading = true;
    }),
  [REMOVE_POST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.removePostLoading = false;
      draft.removePostDone = true;
      const index = state.mainPosts.findIndex(
        (post) => post.id === action.payload.PostId
      );
      draft.mainPosts.splice(index, 1);
    }),
  [REMOVE_POST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.removePostLoading = false;
      draft.removePostError = action.payload;
    }),
  [LOAD_POSTS_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loadPostsDone = false;
      draft.loadPostsLoading = true;
    }),
  [LOAD_POSTS_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts.push(...action.payload);
      draft.hasMorePosts = draft.mainPosts.length < 50;
    }),
  [LOAD_POSTS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.payload;
    }),
});

export default post;
