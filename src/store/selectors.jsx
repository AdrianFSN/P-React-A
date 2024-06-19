export const getIsLogged = (state) => state.auth;

export const areAdvertsLoaded = (state) => state.ads.loaded;
export const getListOfAds = (state) => state.ads.data;
export const getAdsDeletionState = (state) => state.ads;

export const getAdDetail = (state, advertId) => {
  //getListOfAds(state).find((ad) => ad.id === `${advertId}`);
  return getListOfAds(state).find((ad) => ad.id === `${advertId}`);
};

export const getUi = (state) => state.ui;
