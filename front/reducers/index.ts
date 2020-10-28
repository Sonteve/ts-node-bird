import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers } from "redux";
import user, { UserState } from "./user";

type State = {
  user: UserState;
};

const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log(action.payload);
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
