import { fork } from "child_process";
import { all } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {
  yield all([userSaga(), postSaga()]);
}
