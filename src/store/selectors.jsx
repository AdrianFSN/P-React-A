export const getIsLogged = (state) => state.auth;

export const areAdvertsLoaded = (state) => state.ads.loaded;
export const getListOfAds = (state) => state.ads.data;

/* export const getAdDetail = (advertId) => (state) => {
  return getListOfAds(state).find((ad) => ad.id === Number(advertId));
}; */

export const getAdDetail = (state, advertId) =>
  getListOfAds(state).find((ad) => ad.id === `${advertId}`);
/* try {
    const listOfAds = getListOfAds(state);
    console.log("Esto es listofAds: ", listOfAds);
    console.log("Esto es advertId: ", advertId);

    const detailedAd = listOfAds.find((ad) => ad.id === `${advertId}`);

    console.log("Esto es detailedAd: ", detailedAd);
    return detailedAd;
  } catch (error) {
    console.error("Error fetching ad detail:", error);
    return null;
  } */

export const getUi = (state) => state.ui;
