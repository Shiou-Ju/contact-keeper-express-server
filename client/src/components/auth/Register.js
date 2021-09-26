import React, { useState } from "react";

export const Register = () => {
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
    console.log(`註冊已提交`);
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">確認密碼</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
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
