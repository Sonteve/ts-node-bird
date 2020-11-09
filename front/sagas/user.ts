import { call, put, takeLatest } from "redux-saga/effects";
import { FollowParam, LoginParam, SignupParam } from "../interface/user";
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
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  loadFollowings,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  loadFollowers,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  removeFollower,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  loadUser,
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
      payload: err.response.data,
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
      payload: err.response.data,
    });
  }
}

function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfoSaga(action: ReturnType<typeof loginAction.request>) {
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
      payload: err.response.data,
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
      payload: err.response.data,
    });
  }
}

function changeNicknameAPI(data: { nickname: string }) {
  return axios.patch("/user/nickname", data);
}

function* changeNicknameSaga(
  action: ActionType<typeof changeNicknameAction.request>
) {
  try {
    const result = yield call(changeNicknameAPI, action.payload);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      payload: err.response.data,
    });
  }
}
function followAPI(data: FollowParam) {
  return axios.patch(`/user/${data.id}/follow`);
}

function* followSaga(action: ActionType<typeof followAction.request>) {
  try {
    const result = yield call(followAPI, action.payload);
    yield put({
      type: FOLLOW_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: FOLLOW_FAILURE,
      payload: err.response.data,
    });
  }
}

function unfollowAPI(data: FollowParam) {
  return axios.delete(`/user/${data.id}/follow`);
}

function* unfollowSaga(action: ActionType<typeof unfollowAction.request>) {
  try {
    const result = yield call(unfollowAPI, action.payload);
    yield put({
      type: UNFOLLOW_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: UNFOLLOW_FAILURE,
      payload: err.response.data,
    });
  }
}

function removeFollowerAPI(data: { id: number }) {
  return axios.delete(`/user/follower/${data.id}`);
}

function* removeFollowerSaga(
  action: ActionType<typeof removeFollower.request>
) {
  try {
    const result = yield call(removeFollowerAPI, action.payload);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadFollowingsAPI() {
  return axios.get("/user/followings");
}

function* loadFollowingsSaga() {
  try {
    const result = yield call(loadFollowingsAPI);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadFollowersAPI() {
  return axios.get("/user/followers");
}

function* loadFollowersSaga() {
  try {
    const result = yield call(loadFollowersAPI);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      payload: err.response.data,
    });
  }
}

function loadUserAPI(data: { UserId: number }) {
  return axios.get(`/user/${data.UserId}`);
}

function* loadUserSaga(action: ReturnType<typeof loadUser.request>) {
  try {
    const result = yield call(loadUserAPI, action.payload);
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.error(err.response.data);
    yield put({
      type: LOAD_USER_FAILURE,
      payload: err.response.data,
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
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowersSaga);
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowingsSaga);
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollowerSaga);
  yield takeLatest(LOAD_USER_REQUEST, loadUserSaga);
}
