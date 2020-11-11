import { all } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./post";
import axios from "axios";

axios.defaults.baseURL = "http://3.34.190.114";
axios.defaults.withCredentials = true;
export default function* rootSaga() {
  yield all([userSaga(), postSaga()]);
}
