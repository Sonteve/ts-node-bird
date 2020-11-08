import {
  call,
  debounce,
  delay,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import shortId from "shortid";
import faker from "faker";
/* import axios from "axios"; */
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
} from "../reducers/post";
import { CommentParam, Post, PostParam } from "../interface/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import axios from "axios";
import PostImages from "../components/PostImages";

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
      payload: err,
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
      payload: err,
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
      payload: err,
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
      payload: err,
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
      payload: err,
    });
  }
}

function loadPostsAPI() {
  return axios.get("/posts");
}

function* loadPostsSaga(action: ReturnType<typeof loadPosts.request>) {
  try {
    const result = yield call(loadPostsAPI);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_POSTS_FAILURE,
      payload: err,
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
    console.error(err.response.data);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      payload: err,
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
      payload: err,
    });
  }
}

export default function* postSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
  yield takeLatest(REMOVE_POST_REQUEST, removePostSaga);
  yield takeLatest(LOAD_POSTS_REQUEST, loadPostsSaga);
  yield takeLatest(LIKE_POST_REQUEST, likePostSaga);
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePostSaga);
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImageSaga);
  yield takeLatest(REMOVE_IMAGE_REQUEST, removeImageSaga);
}
