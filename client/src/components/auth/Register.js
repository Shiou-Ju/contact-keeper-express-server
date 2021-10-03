import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

export const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  let errorMsg = null;
  if (error) errorMsg = error.data.msg;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (errorMsg === "用戶已存在") {
      setAlert(errorMsg, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [errorMsg, isAuthenticated, authContext.user, props.history]);

  // create defaultUser
  const defaultUser = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  // useState for componenet level state
  const [user, setUser] = useState(defaultUser);

  const { name, email, password, password2 } = user;

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("所有項目為必填", "danger");
    } else if (password !== password2) {
      setAlert("確認密碼不相符", "danger");
    } else {
      const formData = {
        name,
        email,
        password,
      };
      register(formData);
    }
  };

  return (
    <div className="form-container">
      <h1>
        <span className="text-primary">註冊</span>帳戶
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">名字</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">確認密碼</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};
