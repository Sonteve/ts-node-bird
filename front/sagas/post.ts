import { call, delay, put, takeLatest } from "redux-saga/effects";

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
} from "../reducers/post";
import { Post } from "../interface/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

/* function loginAPI(data: LoginParam) {
  return axios.get("/api/login");
} */

let tempId = 2;

function* addPostSaga(action: ReturnType<typeof addPost.request>) {
  try {
    const { id, nickname, content } = action.payload;
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    const dummyPost: Post = {
      id: tempId,
      User: {
        id,
        nickname,
      },
      content,
      Images: [],
      Comments: [],
      createdAt: "2020-10-28",
    };
    yield put({
      type: ADD_POST_SUCCESS,
      payload: dummyPost,
    });
    yield put({
      type: ADD_POST_TO_ME,
      payload: { id: tempId },
    });
    tempId++;
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addCommentSaga(action: ReturnType<typeof addComment.request>) {
  try {
    const { userId, postId, nickname, content } = action.payload;
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: {
        commentData: {
          User: {
            id: userId,
            nickname,
          },
          content,
        },
        postId,
      },
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* removePostSaga(action: ReturnType<typeof removePost.request>) {
  try {
    const { id } = action.payload;
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: {
        id,
      },
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      payload: {
        id,
      },
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

export default function* postSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
  yield takeLatest(REMOVE_POST_REQUEST, removePostSaga);
}
