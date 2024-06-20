import { adsLoadedFulfilled, authLoginFulfilled, authLogout } from "../actions";
import { ads, auth, defaultState } from "../reducers";

describe("auth reducer", () => {
  it('should manage "AUTH_LOGIN_FULFILLED" action', () => {
    const state = defaultState.auth;
    const action = authLoginFulfilled();
    expect(auth(state, action)).toBe(true);
  });

  it('should manage "AUTH_LOGOUT" action', () => {
    const state = defaultState.auth;
    const action = authLogout();
    expect(auth(state, action)).toBe(false);
  });
});

/* describe("ads reducer", () => {
  it('should manage "ADS_LOADED_FULFILLED" action', () => {
    const ads = [
      { id: 1, title: "Ad 1" },
      { id: 2, title: "Ad 2" },
    ];
    const state = defaultState.ads;
    const action = adsLoadedFulfilled(ads);
    const expectedResult = { ...state, loaded: true, data: ads };
    expect(ads(state, action)).toEqual(expectedResult);
  });
}); */
