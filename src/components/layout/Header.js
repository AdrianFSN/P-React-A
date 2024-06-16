import clsx from "clsx";
import { ReactComponent as Icon } from "../../assets/logo.svg";
import AuthButton from "../../pages/auth/components/AuthButton";
import "./Header.css";

import { Link, NavLink } from "react-router-dom";

export default function Header({ className }) {
  return (
    <header className={clsx("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width={32} height={32} fill="rgb(29, 161, 242)" />
        </div>
      </Link>

      <nav className="header-nav">
        <NavLink to="/adverts" end>
          See adverts
        </NavLink>
        <NavLink to="/adverts/new">Create new advert</NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}
