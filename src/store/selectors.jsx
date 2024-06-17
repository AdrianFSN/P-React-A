export const getIsLogged = (state) => state.auth;

export const areAdvertsLoaded = (state) => state.ads.loaded;
export const getListOfAds = (state) => state.ads.data;
/* export const getAdDetail = (advertId) => (state) => {
  return getListOfAds(state).find((ad) => ad.id === Number(advertId));
}; */

export const getAdDetail = (state, advertId) => {
  getListOfAds(state).find((ad) => ad.id === Number(advertId));
};

export const getUi = (state) => state.ui;
