import React, { useState } from "react";

export const Login = () => {
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
    console.log(`登入已提交`);
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
