import { Link } from "react-router-dom";
import Button from "../../../components/shared/Button";
//import { useAuth } from "../context";
import { logout } from "../service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";
import { authLogout } from "../../../store/actions";

function AuthButton({ className }) {
  const isLogged = useSelector(getIsLogged);
  //const { onLogout } = useAuth();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const resetError = () => setError(null);

  const handleLogoutClick = () => {
    try {
      logout();
      //onLogout();
      dispatch(authLogout());
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {isLogged ? (
        <Button
          onClick={handleLogoutClick}
          className={className}
        >
          Logout
        </Button>
      ) : (
        <Button
          $variant="primary"
          className={className}
          as={Link}
          to="/login"
        >
          Login
        </Button>
      )}
      <div>
        {error && (
          <div
            className="Nodepop-error"
            onClick={resetError}
          >{`${error}. Click this banner to get back`}</div>
        )}
      </div>
    </>
  );
}

export default AuthButton;
