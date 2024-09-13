"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const [useDetail, setUseDetail] = useState({});
  const { push } = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUseDetail({ ...useDetail, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(useDetail);

    const res = await axios.post("http://localhost:8000/sign-up", useDetail);
    console.log(res);
    // push("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          name="username"
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
  );
};
export default SignUp;
