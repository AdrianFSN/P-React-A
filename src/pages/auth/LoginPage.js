import { useState } from "react";
import Button from "../../components/shared/Button";
import FormField from "../../components/shared/FormField";
import CheckBox from "../../components/shared/CheckBox";
import "./LoginPage.css";
import { authLogin } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../store/selectors";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { pending, error } = useSelector(getUi);

  const [checkBoxStatus, setCheckBoxStatus] = useState(false);

  const handleCheckboxChange = (event) => {
    setCheckBoxStatus(event.target.checked);
  };
  console.log("Esto es checkboxStatus: ", checkBoxStatus);
  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };
  const { email, password } = formValues;
  const buttonDisabled = !email || !password || pending;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(authLogin(formValues, checkBoxStatus));

    const to = location.state?.from || "/";
    navigate(to, { replace: true });
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          className="loginForm-field"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email here"
        ></FormField>
        <FormField
          className="loginForm-field"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Your password here"
        ></FormField>
        <Button
          className="loginForm-submit"
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
        >
          Login
        </Button>
        <CheckBox
          label="Click here to keep your session open"
          checked={checkBoxStatus}
          onChange={handleCheckboxChange}
        ></CheckBox>
      </form>
      <div>
        {error && (
          <div
            className="Nodepop-error"
            /* onClick={resetError} */
          >{`${error}. Click this banner to get back`}</div>
        )}
      </div>
    </div>
  );
}
