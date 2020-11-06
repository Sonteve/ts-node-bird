import { call, delay, put, takeLatest } from "redux-saga/effects";
import { LoginParam, SignupParam } from "../interface/user";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  loginAction,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  logoutAction,
  signupAction,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  CHANGE_NICKNAME_REQUEST,
  changeNicknameAction,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  followAction,
  unfollowAction,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  loadMyInfoAction,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from "../reducers/user";
import { ActionType } from "typesafe-actions";

function loginAPI(data: LoginParam) {
  return axios.post("/user/login", data);
}

function* loginSaga(action: ReturnType<typeof loginAction.request>) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOG_IN_FAILURE,
      payload: err,
    });
  }
}

function logoutAPI() {
  return axios.post("/user/logout");
}

function* logoutSaga(action: ActionType<typeof logoutAction.request>) {
  try {
    const result = yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOG_OUT_FAILURE,
      payload: err,
    });
  }
}

function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfoSaga(action: ReturnType<typeof loadMyInfoAction.request>) {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      payload: err,
    });
  }
}

function signUpAPI(data: SignupParam) {
  return axios.post("/user", data);
}

function* signUpSaga(action: ActionType<typeof signupAction.request>) {
  try {
    const result = yield call(signUpAPI, action.payload);
    console.log(result.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: SIGN_UP_FAILURE,
      payload: err,
    });
  }
}

/* function loginAPI(data: LoginParam) {
  return axios.get("/api/login");
} */

function* changeNicknameSaga(
  action: ActionType<typeof changeNicknameAction.request>
) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(1000);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      payload: err,
    });
  }
}

function* followSaga(action: ActionType<typeof followAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(500);
    yield put({
      type: FOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: FOLLOW_FAILURE,
      payload: err,
    });
  }
}

function* unfollowSaga(action: ActionType<typeof unfollowAction.request>) {
  try {
    /* const result = yield call(loginAPI, action.payload); */
    yield delay(500);
    yield put({
      type: UNFOLLOW_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: UNFOLLOW_FAILURE,
      payload: err,
    });
  }
}

export default function* userSaga() {
  yield takeLatest(LOG_IN_REQUEST, loginSaga);
  yield takeLatest(LOG_OUT_REQUEST, logoutSaga);
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNicknameSaga);
  yield takeLatest(FOLLOW_REQUEST, followSaga);
  yield takeLatest(UNFOLLOW_REQUEST, unfollowSaga);
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfoSaga);
}
