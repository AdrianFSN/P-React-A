import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";
import { thunk } from "redux-thunk";

const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
