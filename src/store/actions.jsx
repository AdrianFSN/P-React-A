import {
  ADS_LOADED,
  ADS_LOADED_FULFILLED,
  ADS_LOADED_PENDING,
  AD_CREATED,
  AD_CREATED_PENDING,
  AD_DETAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_REJECTED,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "./types";

// actions related to auth state
export const authLogin = () => ({
  type: AUTH_LOGIN,
});
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

export const authLoginPending = () => ({
  type: AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
  type: AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (error) => ({
  type: AUTH_LOGIN_REJECTED,
  payload: error,
  error: true,
});

// actions related to advertisements state
export const adsLoaded = (ads) => ({
  type: ADS_LOADED,
  payload: ads,
});

export const adsLoadedPending = () => ({
  type: ADS_LOADED_PENDING,
});

export const adsLoadedFulfilled = (ads) => ({
  type: ADS_LOADED_FULFILLED,
  payload: ads,
});

export const adsLoadedRejected = (error) => ({
  type: ADS_LOADED_FULFILLED,
  payload: error,
  error: true,
});

export const adCreated = (ad) => ({
  type: AD_CREATED,
  payload: ad,
});
export const adCreatedPending = () => ({
  type: AD_CREATED_PENDING,
});
export const adCreatedFulfilled = (ad) => ({
  type: AD_CREATED_PENDING,
  payload: ad,
});
export const adCreatedRejected = (error) => ({
  type: AD_CREATED_PENDING,
  payload: error,
  error: true,
});

export const loadAdvert = (ad) => ({
  type: AD_DETAIL,
  payload: ad,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
