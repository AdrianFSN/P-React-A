import {
  adsLoadedFulfilled,
  adsLoadedPending,
  authLogin,
  authLoginFulfilled,
  authLoginPending,
  authLoginRejected,
  loadAdverts,
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

// testing asynchronous actions
describe("authLogin asynchronous action", () => {
  const credentials = "credentials";
  const storageRequest = true;
  const testedAction = authLogin(credentials, storageRequest);
  const redirectUrl = "/redirectUrl";
  const dispatch = jest.fn();
  const services = { auth: {} };
  const router = {
    state: { location: { state: { from: redirectUrl } } },
    navigate: jest.fn(),
  };

  it("should follow the login flow after resolving login", async () => {
    services.auth.login = jest.fn().mockResolvedValue();

    await testedAction(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(
      credentials,
      storageRequest
    );
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl, {
      replace: true,
    });
  });
});

describe("loadAdverts asynchronous action", () => {
  const testedAction = loadAdverts();
  const dispatch = jest.fn();
  const services = { ads: { data: [] } };

  it("should follow the get adverts list flow", async () => {
    services.ads.getLatestAds = jest.fn().mockResolvedValue();

    await testedAction(dispatch, undefined, { services });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, adsLoadedPending());
    expect(dispatch).toHaveBeenNthCalledWith(2, adsLoadedFulfilled());
  });
});
