import { all } from "redux-saga/effects";
import userSaga from "./user";
import postSaga from "./post";
import axios from "axios";
import { host } from "../config/test";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? host : "http://localhost:3060";
axios.defaults.withCredentials = true;
export default function* rootSaga() {
  yield all([userSaga(), postSaga()]);
}
