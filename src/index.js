import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import storage from "./pages/utils/storage";
import { setAuthorizationHeader } from "./api/client";
//import { AuthContextProvider } from "./pages/auth/context";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/errors/errorBoundary";
import configureStore from "./store";
import { Provider } from "react-redux";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}
const store = configureStore({ auth: !!accessToken });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          {/* <AuthContextProvider isDefaultLogged={!!accessToken}> */}
          <App />
          {/* </AuthContextProvider> */}
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
