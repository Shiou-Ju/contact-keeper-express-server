import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

export const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  let errorMsg = null;
  if (error) errorMsg = error.data.msg;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (errorMsg === "無效的資訊") {
      setAlert(errorMsg, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [errorMsg, isAuthenticated, authContext.user, props.history]);

  // create defaultUser
  const defaultUser = {
    email: "",
    password: "",
  };

  // useState for componenet level state
  const [user, setUser] = useState(defaultUser);

  const { email, password } = user;

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setAlert("所有項目為必填", "danger");
    } else {
      const formData = {
        email,
        password,
      };
      login(formData);
    }
  };

  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">登入</span>帳戶
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};
