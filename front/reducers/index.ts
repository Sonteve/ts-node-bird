import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import post, { PostState } from "./post";
import user, { UserState } from "./user";

type State = {
  user: UserState;
  post: PostState;
};

const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    //ssr 액션
    // 기존 store의 데이터를 덮는다.
    case HYDRATE:
      console.log(action);
      console.log(action.payload);
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
