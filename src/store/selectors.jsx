export const getIsLogged = (state) => state.auth;
export const getListOfAds = (state) => state.ads;
/* export const getAdDetail = (advertId) => (state) => {
  return getListOfAds(state).find((ad) => ad.id === Number(advertId));
}; */

export const getAdDetail = (state, advertId) => {
  getListOfAds(state).find((ad) => ad.id === Number(advertId));
};
