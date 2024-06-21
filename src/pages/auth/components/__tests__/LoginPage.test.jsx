import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../../LoginPage";
import { Provider } from "react-redux";
import { authLogin } from "../../../../store/actions";
import userEvent from "@testing-library/user-event";
import { act } from "react";

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

  it("should dispatch authLogin action", () => {
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
    //const userClick = (event) => userEvent.click(event);

    expect(submitButton).toBeDisabled();

    //act(() => userType(emailInput, email));
    //userEvent.type(emailInput, email);
    fireEvent.change(emailInput, { target: { value: email } });
    //act(() => userType(passwordInput, password));
    //userEvent.type(passwordInput, password);
    fireEvent.change(passwordInput, { target: { value: password } });
    //act(() => userClick(checkbox));
    //userEvent.click(checkbox);

    //expect(checkbox).toBeChecked();
    expect(submitButton).toBeEnabled();
    fireEvent.click(checkbox);
    expect(checkbox).toBeEnabled();
    //act(() => userClick(submitButton));
    //userEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password }, storageRequest);
  });
});
