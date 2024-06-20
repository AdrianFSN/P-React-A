import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../../LoginPage";
import { Provider } from "react-redux";
import { authLogin } from "../../../../store/actions";
import { toBeChecked } from "@testing-library/jest-dom/matchers";

jest.mock("../../../../store/actions");

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

  it("should dispatch authLogin action", () => {
    const email = "username@example.com";
    const password = "password";
    const checkBoxStatus = true;
    renderComponent();
    const emailInput = screen.getByPlaceholderText(/Your email here/i);
    /* const emailInput = screen.getByRole("textbox", {
      name: "",
    }); */
    const passwordInput = screen.getByPlaceholderText(/Your password here/i);
    const submitButton = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox");

    expect(submitButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password }, checkBoxStatus);
  });
});
