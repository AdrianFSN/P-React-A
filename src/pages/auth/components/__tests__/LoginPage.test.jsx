import { render, screen } from "@testing-library/react";
import LoginPage from "../../LoginPage";
import { Provider } from "react-redux";
import { authLogin } from "../../../../store/actions";

import { act } from "react";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../store/actions");

const userType = (input, text) => userEvent.type(input, text);

describe("LoginPage", () => {
  const state = {
    ui: {
      pending: false,
      error: null,
    },
  };

  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

  it("should take a snapshot for LoginPage Component", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should dispatch authLogin action", async () => {
    const email = "username@example.com";
    const password = "password";
    const storageRequest = true;
    renderComponent();
    const emailInput = screen.getByPlaceholderText(/Your email here/i);
    /* const emailInput = screen.getByRole("textbox", {
      name: "",
    }); */
    const passwordInput = screen.getByPlaceholderText(/Your password here/i);
    const submitButton = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");

    expect(submitButton).toBeDisabled();

    await act(async () => await userType(emailInput, email));
    await act(async () => await userType(passwordInput, password));

    expect(submitButton).toBeEnabled();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(submitButton);
    expect(authLogin).toHaveBeenCalledWith({ email, password }, storageRequest);
  });
});
