import {
  ADS_LOADED_FULFILLED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  ADS_DETAIL_FULFILLED,
  ADS_CREATED_FULFILLED,
  ADS_DELETED_FULFILLED,
  ADS_REQUEST_DELETION,
  ADS_CONFIRM_DELETION,
  ADS_CANCEL_DELETION,
} from "./types";

const defaultState = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
    confirmDeletion: false,
    deletionRequest: false,
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
    case ADS_CREATED_FULFILLED:
      return { ...state, data: [action.payload, ...state.data] };
    case ADS_DETAIL_FULFILLED:
      return { ...state, data: [action.payload] };
    case ADS_DELETED_FULFILLED:
      return {
        ...state,
        data: state.data.filter((ad) => ad.id !== action.payload.id),
      };
    case ADS_REQUEST_DELETION:
      return { ...state, deletionRequest: true };
    case ADS_CONFIRM_DELETION:
      return { ...state, confirmDeletion: true };
    case ADS_CANCEL_DELETION:
      return { ...state, deletionRequest: false, confirmDeletion: false };
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
