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
  ADS_TAGS_FULFILLED,
  ADS_MAX_PRICE,
  ADS_MIN_PRICE,
} from "./types";

const defaultState = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
    availableTags: [],
    deletionRequest: false,
    confirmDeletion: false,
    prices: {
      maxPriceAvailable: 0,
      minPriceAvailable: 0,
    },
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
    case ADS_TAGS_FULFILLED:
      return { ...state, availableTags: action.payload };
    case ADS_DETAIL_FULFILLED:
      return { ...state, data: [action.payload] };
    case ADS_DELETED_FULFILLED:
      return {
        ...state,
        data: state.data.filter((ad) => ad.id !== action.payload.id),
        deletionRequest: false,
        confirmDeletion: false,
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

export function prices(state = defaultState.ads.prices, action) {
  switch (action.type) {
    case ADS_MAX_PRICE:
      return {
        ...state,
        maxPriceAvailable: action.payload,
      };
    case ADS_MIN_PRICE:
      return {
        ...state,
        minPriceAvailable: action.payload,
      };
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
