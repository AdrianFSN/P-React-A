import {
  ADS_LOADED,
  AD_CREATED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_REJECTED,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

const defaultState = {
  auth: false,
  ads: [],
  ui: {
    pending: false,
    error: null,
  },
};

// auth related reducer
export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_FULFILLED:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function ads(state = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED:
      return action.payload;
    case AD_CREATED:
      return [action.payload, ...state];
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  switch (action.type) {
    case UI_RESET_ERROR:
      return { ...state, error: null };

    case AUTH_LOGIN_PENDING:
      return { ...state, pending: true };

    case AUTH_LOGIN_FULFILLED:
      return { ...state, pending: false, error: null };

    case AUTH_LOGIN_REJECTED:
      return { ...state, pending: false, error: action.payload };

    default:
      return state;
  }
}
