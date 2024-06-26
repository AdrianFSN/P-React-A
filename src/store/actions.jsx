//import * as advertsService from "../pages/adverts/service";
//import { getAdvert, getLatestAds } from "../pages/adverts/service";
//import { login } from "../pages/auth/service";
//import { getAdDetail } from "./selectors";
import {
  ADS_LOADED_FULFILLED,
  ADS_LOADED_PENDING,
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
  ADS_DELETED_PENDING,
  ADS_DELETED_FULFILLED,
  ADS_DELETED_REJECTED,
  ADS_REQUEST_DELETION,
  ADS_CONFIRM_DELETION,
  ADS_CANCEL_DELETION,
  ADS_TAGS_PENDING,
  ADS_TAGS_FULFILLED,
  ADS_TAGS_REJECTED,
  ADS_MAX_PRICE,
  ADS_MIN_PRICE,
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

export const adsDeletedPending = () => ({
  type: ADS_DELETED_PENDING,
});
export const adsDeletedFulfilled = (advertId) => ({
  type: ADS_DELETED_FULFILLED,
  payload: advertId,
});
export const adsDeletedRejected = (error) => ({
  type: ADS_DELETED_REJECTED,
  payload: error,
  error: true,
});

export const adsRequestDeletion = () => ({
  type: ADS_REQUEST_DELETION,
});
export const adsConfirmDeletion = () => ({
  type: ADS_CONFIRM_DELETION,
});
export const adsCancelDeletion = () => ({
  type: ADS_CANCEL_DELETION,
});

export const adsTagsPending = () => ({
  type: ADS_TAGS_PENDING,
});
export const adsTagsFulfilled = (tags) => ({
  type: ADS_TAGS_FULFILLED,
  payload: tags,
});
export const adsTagsRejected = (error) => ({
  type: ADS_TAGS_REJECTED,
  payload: error,
  error: true,
});

export const adsMaxPrice = (maxPrice) => ({
  type: ADS_MAX_PRICE,
  payload: maxPrice,
});
export const adsMinPrice = (minPrice) => ({
  type: ADS_MIN_PRICE,
  payload: minPrice,
});

export const calculateMaxMinPricesAvailable = (advertsList) => (dispatch) => {
  if (advertsList.length) {
    const prices = advertsList.map((advert) => advert.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    dispatch(adsMaxPrice(maxPrice));
    dispatch(adsMinPrice(minPrice));
  }
};

export const loadAdverts = () => {
  return async function (dispatch, _getState, { services }) {
    try {
      dispatch(adsLoadedPending());
      const adverts = await services.ads.getLatestAds();
      dispatch(adsLoadedFulfilled(adverts));
    } catch (error) {
      dispatch(adsLoadedRejected(error));
    }
  };
};

export const loadTags = () => {
  return async function (dispatch, _getState, { services }) {
    try {
      dispatch(adsTagsPending());
      const tags = await services.ads.getTags();
      dispatch(adsTagsFulfilled(tags));
    } catch (error) {
      dispatch(adsTagsRejected(error));
    }
  };
};

export const loadAdvert = (advertId) => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(adsDetailPending);
      const advert = await services.ads.getAdvert(advertId);
      dispatch(adsDetailFulfilled(advert));
      router.navigate(`/adverts/${advert.id}`);
    } catch (error) {
      dispatch(adsDetailRejected(error));
    }
  };
};

export const createAdvert = (advert) => {
  return async function (dispatch, _getState, { services, router }) {
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

export const requestDeletionProcess = () => {
  return (dispatch) => {
    dispatch(adsConfirmDeletion());
  };
};

export const confirmDeletionProcess = (advertId) => {
  return async (dispatch) => {
    dispatch(adsRequestDeletion());
    setTimeout(async () => {
      await dispatch(deleteAdvert(advertId));
    }, 2000);
  };
};

export const deleteAdvert = (advertId) => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(adsDeletedPending());
      await services.ads.deleteAd(advertId);
      dispatch(adsDeletedFulfilled(advertId));
      router.navigate("/adverts");
    } catch (error) {
      dispatch(adsDeletedRejected(error));
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
