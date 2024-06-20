import {
  adsLoadedFulfilled,
  authLoginFulfilled,
  authLoginPending,
  authLoginRejected,
} from "../actions";
import {
  ADS_LOADED_FULFILLED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_REJECTED,
} from "../types";

// Testing synchronous actions
describe("authLoginPending", () => {
  it('should return an action of type "AUTH_LOGIN_PENDING"', () => {
    const expectedAction = {
      type: AUTH_LOGIN_PENDING,
    };
    const testedAction = authLoginPending();

    expect(testedAction).toEqual(expectedAction);
  });
});

describe("authLoginFulfilled", () => {
  it('should return an action of type "AUTH_LOGIN_FULFILLED"', () => {
    const expectedAction = {
      type: AUTH_LOGIN_FULFILLED,
    };

    const testedAction = authLoginFulfilled();

    expect(testedAction).toEqual(expectedAction);
  });
});

describe("authLoginRejected", () => {
  it('should return an action of type "AUTH_LOGIN_REJECTED"', () => {
    const error = "authLoginRejected error";
    const expectedAction = {
      type: AUTH_LOGIN_REJECTED,
      payload: error,
      error: true,
    };

    const testedAction = authLoginRejected(error);

    expect(testedAction).toEqual(expectedAction);
  });
});

describe("adsLoadedFulfilled", () => {
  it('should return an action of type "ADS_LOADED_FULFILLED"', () => {
    const ads = "This should be a list of ads";

    const expectedAction = {
      type: ADS_LOADED_FULFILLED,
      payload: ads,
    };
    const testedAction = adsLoadedFulfilled(ads);

    expect(testedAction).toEqual(expectedAction);
  });
});
