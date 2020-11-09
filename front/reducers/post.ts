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
  addPostError: Error | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: Error | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: Error | null;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: Error | null;
  singlePost: Post | null;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: any | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: Error | null;
  unLikePostLoading: boolean;
  unLikePostDone: boolean;
  unLikePostError: Error | null;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: Error | null;
  removeImageLoading: boolean;
  removeImageDone: boolean;
  removeImageError: Error | null;
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
  singlePost: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  removeImageLoading: false,
  removeImageDone: false,
  removeImageError: null,
  hasMorePosts: true,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const addPost = createAsyncAction(
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE
)<FormData, Post, Error>();

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addComment = createAsyncAction(
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
)<CommentParam, Comment, Error>();

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
export const removePost = createAsyncAction(
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE
)<{ postId: number }, { PostId: number }, Error>();

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const likePost = createAsyncAction(
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE
)<{ postId: number }, LikeData, Error>();

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const unLikePost = createAsyncAction(
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE
)<{ postId: number }, LikeData, Error>();

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const loadPosts = createAsyncAction(
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE
)<{ lastId: number | undefined }, Post[], Error>();

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";
export const loadPost = createAsyncAction(
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE
)<{ PostId: number }, Post, Error>();

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const loadUserPostsAction = createAsyncAction(
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE
)<{ UserId: number; lastId: number | undefined }, Post[], Error>();

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const uploadImage = createAsyncAction(
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE
)<FormData, string[], Error>();

export const REMOVE_IMAGE_REQUEST = "REMOVE_IMAGE_REQUEST";
export const REMOVE_IMAGE_SUCCESS = "REMOVE_IMAGE_SUCCESS";
export const REMOVE_IMAGE_FAILURE = "REMOVE_IMAGE_FAILURE";

export const removeImage = createAsyncAction(
  REMOVE_IMAGE_REQUEST,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_FAILURE
)<{ filename: string }, { filename: string }, Error>();
export const RETWEET_POST_REQUEST = "RETWEET_POST_REQUEST";
export const RETWEET_POST_SUCCESS = "RETWEET_POST_SUCCESS";
export const RETWEET_POST_FAILURE = "RETWEET_POST_FAILURE";

export const retweetPost = createAsyncAction(
  RETWEET_POST_REQUEST,
  RETWEET_POST_SUCCESS,
  RETWEET_POST_FAILURE
)<{ PostId: number }, Post, Error>();

type PostAction = ActionType<
  | typeof addPost
  | typeof addComment
  | typeof removePost
  | typeof loadPosts
  | typeof likePost
  | typeof unLikePost
  | typeof uploadImage
  | typeof removeImage
  | typeof retweetPost
  | typeof loadPost
  | typeof loadUserPostsAction
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
      draft.imagePaths = [];
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
      draft.hasMorePosts = action.payload.length === 10;
    }),
  [LOAD_POSTS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.payload;
    }),
  [LOAD_POST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loadPostDone = false;
      draft.loadPostLoading = true;
    }),
  [LOAD_POST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.singlePost = action.payload;
    }),
  [LOAD_POST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostLoading = false;
      draft.loadPostError = action.payload;
    }),
  [UPLOAD_IMAGES_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.uploadImagesDone = false;
      draft.uploadImagesLoading = true;
    }),
  [UPLOAD_IMAGES_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.imagePaths = action.payload;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
    }),
  [UPLOAD_IMAGES_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.payload;
    }),
  [REMOVE_IMAGE_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.removeImageDone = false;
      draft.removeImageLoading = true;
    }),
  [REMOVE_IMAGE_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      console.log("이상하네?", action.payload.filename);
      const index = draft.imagePaths.findIndex(
        (v) => v === action.payload.filename
      );
      draft.imagePaths.splice(index, 1);
      draft.removeImageLoading = false;
      draft.removeImageDone = true;
    }),
  [REMOVE_IMAGE_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.removeImageLoading = false;
      draft.removeImageError = action.payload;
    }),
  [RETWEET_POST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.addPostDone = false;
      draft.addPostLoading = true;
    }),
  [RETWEET_POST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.payload);
      draft.imagePaths = [];
    }),
  [RETWEET_POST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.addPostLoading = false;
      draft.addPostError = action.payload;
    }),
  [LOAD_USER_POSTS_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.loadPostsDone = false;
      draft.loadPostsLoading = true;
    }),
  [LOAD_USER_POSTS_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts.push(...action.payload);
      draft.hasMorePosts = action.payload.length === 10;
    }),
  [LOAD_USER_POSTS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.payload;
    }),
});

export default post;
