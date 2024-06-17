import { Link } from "react-router-dom";
import Button from "../../../components/shared/Button";
import { useAuth } from "../context";
import { logout } from "../service";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";

function AuthButton({ className }) {
  const isLogged = useSelector(getIsLogged);
  const { onLogout } = useAuth();
  const [error, setError] = useState(null);
  const resetError = () => setError(null);

  const handleLogoutClick = () => {
    try {
      logout();
      onLogout();
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
