import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>您好 {user && user.name} </li>
      <li>
        {" "}
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt">
            <span className="hide-sm">登出</span>
          </i>
        </a>{" "}
      </li>
      <li>{}</li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">註冊</Link>
      </li>
      <li>
        <Link to="/login">登入</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "聯絡簿",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
