import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";
import * as auth from "../pages/auth/service";
import * as ads from "../pages/adverts/service";
import { withExtraArgument } from "redux-thunk";
import { failureRedirects } from "./middleware";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState, { router }) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        withExtraArgument({ services: { auth, ads }, router }),
        failureRedirects(router, {
          401: "/login",
          404: "/404",
        })
      )
    )
  );

  return store;
}
