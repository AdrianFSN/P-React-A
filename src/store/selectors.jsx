export const getIsLogged = (state) => state.auth;

export const areAdvertsLoaded = (state) => state.ads.loaded;
export const getListOfAds = (state) => state.ads.data;
export const getListOfTags = (state) => state.ads.availableTags;
export const getAdsDeletionState = (state) => state.ads;
export const getMaxPrice = (state) => state.prices.maxPriceAvailable;
export const getMinPrice = (state) => state.prices.minPriceAvailable;

export const getAdDetail = (state, advertId) => {
  //getListOfAds(state).find((ad) => ad.id === `${advertId}`);
  return getListOfAds(state).find((ad) => ad.id === `${advertId}`);
};

export const getUi = (state) => state.ui;
