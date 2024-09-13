"use client";
import React, { useState } from "react";

const Login = () => {
  const [useDetail, setUseDetail] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUseDetail({ ...useDetail, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(useDetail);
  };

  return (
    <div>
      <div>
        <h1 className="text-[50px] ">LOG IN PAGE</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
