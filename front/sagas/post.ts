import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  addPost,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  addComment,
  ADD_COMMENT_SUCCESS,
  REMOVE_POST_REQUEST,
  removePost,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  loadPosts,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  likePost,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  unLikePost,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  uploadImage,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  removeImage,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_FAILURE,
  REMOVE_IMAGE_REQUEST,
  retweetPost,
  RETWEET_POST_SUCCESS,
  RETWEET_POST_FAILURE,
  RETWEET_POST_REQUEST,
  loadPost,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  loadUserPostsAction,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  loadHashtagPostsAction,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
} from "../reducers/post";
import { CommentParam } from "../interface/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import axios from "axios";

function addPostAPI(data: FormData) {
  return axios.post("/post", data);
}

function* addPostSaga(action: ReturnType<typeof addPost.request>) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      payload: { id: result.data.id },
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: ADD_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function likePostAPI(data: { postId: number }) {
  return axios.patch(`/post/${data.postId}/like`);
}

function* likePostSaga(action: ReturnType<typeof likePost.request>) {
  try {
    const result = yield call(likePostAPI, action.payload);

    yield put({
      type: LIKE_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LIKE_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function unlikePostAPI(data: { postId: number }) {
  return axios.delete(`/post/${data.postId}/like`);
}

function* unlikePostSaga(action: ReturnType<typeof unLikePost.request>) {
  try {
    const result = yield call(unlikePostAPI, action.payload);

    yield put({
      type: UNLIKE_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: UNLIKE_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function addCommentAPI(data: CommentParam) {
  return axios.post(`/post/${data.PostId}/comment`, data);
}

function* addCommentSaga(action: ReturnType<typeof addComment.request>) {
  try {
    const result = yield call(addCommentAPI, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: ADD_COMMENT_FAILURE,
      payload: err.response.data,
    });
  }
}

function removePostAPI(data: { postId: number }) {
  return axios.delete(`/post/${data.postId}`);
}

function* removePostSaga(action: ReturnType<typeof removePost.request>) {
  try {
    /* const { id } = action.payload; */
    const result = yield call(removePostAPI, action.payload);
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: REMOVE_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadPostsAPI(data: { lastId: number | undefined }) {
  return axios.get(`/posts?lastId=${data.lastId || 0}`);
}

function* loadPostsSaga(action: ReturnType<typeof loadPosts.request>) {
  try {
    const result = yield call(loadPostsAPI, action.payload);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_POSTS_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadPostAPI(data: { PostId: number }) {
  return axios.get(`/post/${data.PostId}`);
}

function* loadPostSaga(action: ReturnType<typeof loadPost.request>) {
  try {
    const result = yield call(loadPostAPI, action.payload);
    yield put({
      type: LOAD_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    /* console.error("에러 발생");
    console.error(err.response.data); */
    yield put({
      type: LOAD_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadUserPostsAPI(data: {
  lastId: number | undefined;
  UserId: number;
}) {
  return axios.get(`/user/${data.UserId}/posts?lastId=${data.lastId || 0}`);
}

function* loadUserPostsSaga(
  action: ReturnType<typeof loadUserPostsAction.request>
) {
  try {
    const result = yield call(loadUserPostsAPI, action.payload);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadHashtagPostsAPI(data: {
  Hashtag: string;
  lastId: number | undefined;
}) {
  console.log("data", data);
  return axios.get(
    `/hashtag/${encodeURIComponent(data.Hashtag)}?lastId=${data.lastId || 0}`
  );
}

function* loadHashtagPostsSaga(
  action: ReturnType<typeof loadHashtagPostsAction.request>
) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.payload);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      payload: err.response.data,
    });
  }
}

function uploadImageAPI(data: FormData) {
  return axios.post("/post/images", data);
}

function* uploadImageSaga(action: ReturnType<typeof uploadImage.request>) {
  try {
    const result = yield call(uploadImageAPI, action.payload);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error("에러", err.response.data);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      payload: err.response.data,
    });
  }
}

function removeImageAPI(data: { filename: string }) {
  return axios.delete(`/post/image/${data.filename}`);
}

function* removeImageSaga(action: ReturnType<typeof removeImage.request>) {
  try {
    const result = yield call(removeImageAPI, action.payload);
    console.log("removeImageSaga", result);
    yield put({
      type: REMOVE_IMAGE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: REMOVE_IMAGE_FAILURE,
      payload: err.response.data,
    });
  }
}

function retweetPostAPI(data: { PostId: number }) {
  return axios.post(`/post/${data.PostId}/retweet`);
}

function* retweetPostSaga(action: ReturnType<typeof retweetPost.request>) {
  try {
    const result = yield call(retweetPostAPI, action.payload);
    yield put({
      type: RETWEET_POST_SUCCESS,
      payload: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      payload: { id: result.data.id },
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: RETWEET_POST_FAILURE,
      payload: err.response.data,
    });
  }
}

export default function* postSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(RETWEET_POST_REQUEST, retweetPostSaga);
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
  yield takeLatest(REMOVE_POST_REQUEST, removePostSaga);
  yield takeLatest(LOAD_POSTS_REQUEST, loadPostsSaga);
  yield takeLatest(LIKE_POST_REQUEST, likePostSaga);
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePostSaga);
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImageSaga);
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImageSaga);
  yield takeLatest(LOAD_POST_REQUEST, loadPostSaga);
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPostsSaga);
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPostsSaga);
}
