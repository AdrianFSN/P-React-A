import {
  ADS_LOADED_FULFILLED,
  ADS_CREATED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  ADS_DETAIL_FULFILLED,
} from "./types";

const defaultState = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
  },
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
    case ADS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    case ADS_CREATED:
      return { ...state, data: [action.payload, ...state.data] };
    case ADS_DETAIL_FULFILLED:
      return { ...state, data: [action.payload] };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }

  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type.endsWith("/pending")) {
    return { ...state, pending: true };
  }

  if (action.type.endsWith("/fulfilled")) {
    return { ...state, pending: false, error: null };
  }

  return state;
}
