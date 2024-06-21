import { Provider } from "react-redux";
import Advert from "../Advert";
import { render } from "@testing-library/react";

describe("Advert component", () => {
  const state = {
    ads: {
      data: [
        {
          id: "",
          name: "",
          price: 0,
          sale: false,
          tags: [],
        },
      ],
    },
  };
  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
  };
  const advert = {
    id: "1",
    name: "Advert Name",
    price: 25,
    sale: true,
    tags: ["motor", "mobile"],
    photo: "ad photo",
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Advert
          id={advert.id}
          name={advert.name}
          price={advert.price}
          sale={advert.sale}
          tags={advert.tags}
          photo={advert.photo}
        />
      </Provider>
    );
  it("should take a snapshot for Advert component", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
