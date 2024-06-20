import {
  getAdDetail,
  getIsLogged,
  getMaxPrice,
  getMinPrice,
} from "../selectors";

describe("getIsLogged selector", () => {
  it("should return the value of auth when not logged", () => {
    const state = {
      auth: false,
    };
    const authState = false;
    expect(getIsLogged(state)).toBe(authState);
  });
  it("should return the value of auth when logged", () => {
    const state = {
      auth: true,
    };
    const authState = true;
    expect(getIsLogged(state)).toBe(authState);
  });
});

describe("getAdDetail selector", () => {
  const state = {
    ads: {
      data: [{ id: "1" }, { id: "2" }],
    },
  };
  it("should return the advert matching the requested id", () => {
    const advertId = "1";
    const expectedResult = { id: "1" };
    expect(getAdDetail(state, advertId)).toEqual(expectedResult);
  });
});

describe("getMaxPrice / getMinPrice selectors", () => {
  const state = {
    prices: {
      maxPriceAvailable: 30,
      minPriceAvailable: 2,
    },
  };
  it("should return the value for maxPriceAvailable", () => {
    const obtainedMaxPrice = 30;

    expect(getMaxPrice(state)).toBe(obtainedMaxPrice);
  });

  it("should return the value for minPriceAvailable", () => {
    const obtainedMinPrice = 2;

    expect(getMinPrice(state)).toBe(obtainedMinPrice);
  });
});
