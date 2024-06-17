import { combineReducers } from "redux";
import { ADS_LOADED, AD_CREATED, AUTH_LOGIN, AUTH_LOGOUT } from "./types";

const defaultState = {
  auth: false,
  ads: [],
};

// auth related reducer
export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function listAds(state = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED:
      return action.payload;
    case AD_CREATED:
      return [...state.ads, action.payload];
    default:
      return state;
  }
}
