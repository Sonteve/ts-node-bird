import { call, delay, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  addPost,
} from "../reducers/post";
import { Post } from "../interface/post";
import { ADD_POST_TO_ME } from "../reducers/user";

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

export default function* postSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
}
