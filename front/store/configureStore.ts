import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers";
import { createStore, compose, applyMiddleware, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = () => {
  const middlewares: Middleware[] = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
