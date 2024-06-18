import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import AdvertPage from "./pages/adverts/AdvertPage";
import LoginPage from "./pages/auth/LoginPage";
import RequireAuth from "./pages/auth/components/RequireAuth";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/adverts"
        element={
          <div className="container">
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          </div>
        }
      >
        <Route
          index
          element={<AdvertsPage />}
        />
        <Route
          path="new"
          element={<NewAdvertPage />}
        />
        <Route
          path=":advertId"
          element={<AdvertPage />}
        />
      </Route>
      <Route
        path="/"
        element={<Navigate to="/adverts" />}
      />
      <Route
        path="/404"
        element={<NotFound />}
      />
      <Route
        path="*"
        element={<Navigate to="/404" />}
      />
    </Routes>
  );
}

export default App;
