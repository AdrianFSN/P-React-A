import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";

const reducer = combineReducers(reducers);

export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools({ actionCreators }()));

  return store;
}
