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
  loadPost,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
} from "../reducers/post";
import { Post, CommentParam } from "../interface/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import axios from "axios";

function addPostAPI(data: string) {
  return axios.post("/post", { content: data });
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
      payload: err,
    });
  }
}

export const generateDummyPost = (number: number) =>
  Array(number)
    .fill(null)
    .map((v, i) => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: shortId.generate(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
      createdAt: "2020-10-29",
    }));

function* loadPostsSaga(action: ReturnType<typeof loadPost.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      payload: generateDummyPost(10),
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_POSTS_FAILURE,
      payload: err,
    });
  }
}

export default function* postSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPostSaga);
  yield takeLatest(ADD_COMMENT_REQUEST, addCommentSaga);
  yield takeLatest(REMOVE_POST_REQUEST, removePostSaga);
  yield takeLatest(LOAD_POSTS_REQUEST, loadPostsSaga);
}
