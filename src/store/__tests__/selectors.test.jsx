import { getAdDetail } from "../selectors";

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
