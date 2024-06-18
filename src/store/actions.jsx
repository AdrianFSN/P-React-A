//import * as advertsService from "../pages/adverts/service";
//import { getAdvert, getLatestAds } from "../pages/adverts/service";
//import { login } from "../pages/auth/service";
import { areAdvertsLoaded, getAdDetail } from "./selectors";
import {
  ADS_LOADED_FULFILLED,
  ADS_LOADED_PENDING,
  //ADS_CREATED,
  ADS_CREATED_FULFILLED,
  ADS_CREATED_PENDING,
  ADS_CREATED_REJECTED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_REJECTED,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  ADS_DETAIL_PENDING,
  ADS_DETAIL_FULFILLED,
  ADS_DETAIL_REJECTED,
} from "./types";

// actions related to auth state
export const authLogin = (credentials, storageRequest) => {
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLoginPending());
      await auth.login(credentials, storageRequest);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from || "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginRejected(error));
      throw error;
    }
  };
};

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

export const loadAdverts = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }

    try {
      dispatch(adsLoadedPending());
      const adverts = await services.ads.getLatestAds();
      dispatch(adsLoadedFulfilled(adverts));
    } catch (error) {
      dispatch(adsLoadedRejected(error));
    }
  };
};

export const adsCreatedPending = () => ({
  type: ADS_CREATED_PENDING,
});
export const adsCreatedFulfilled = (ad) => ({
  type: ADS_CREATED_FULFILLED,
  payload: ad,
});
export const adsCreatedRejected = (error) => ({
  type: ADS_CREATED_REJECTED,
  payload: error,
  error: true,
});

export const adsDetailPending = () => ({
  type: ADS_DETAIL_PENDING,
});
export const adsDetailFulfilled = (ad) => ({
  type: ADS_DETAIL_FULFILLED,
  payload: ad,
});
export const adsDetailRejected = (error) => ({
  type: ADS_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const loadAdvert = (advertId) => {
  return async function (dispatch, getState, { services, router }) {
    const state = getState();
    if (getAdDetail(advertId)(state)) {
      return;
    }
    try {
      dispatch(adsDetailPending);
      const advert = await services.ads.getAdvert(advertId);
      dispatch(adsDetailFulfilled(advert));
      router.navigate(`/adverts/${advert.id}`);
    } catch (error) {
      dispatch(adsDetailRejected(error));
      throw error;
    }
  };
};

export const createAdvert = (advert) => {
  return async function (dispatch, _getService, { services, router }) {
    try {
      dispatch(adsCreatedPending());
      const { id } = await services.ads.createNewAd(advert);
      const createdAdvert = await services.ads.getAdvert(id);
      dispatch(adsCreatedFulfilled(createdAdvert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(adsCreatedRejected(error));
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
