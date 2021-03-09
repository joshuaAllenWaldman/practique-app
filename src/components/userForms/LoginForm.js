import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => props.setIsLoggedIn(true))
      .then(() => props.history.push("/home"))
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 max-w-3xl w-1/4 mx-auto flex flex-col items-center border-darkBlue border-2 bg-lightBlue rounded mt-8 shadow-4xl"
    >
    <div>
        <h1 className="text-4xl underline my-4">Login</h1>
      </div>
      <div className="mt-2 text-2xl flex flex-col justify-center items-center">
        <label htmlFor="username">UserName</label>
        <input
          className="border border-gray-800 ml-2 w-full"
          type="text"
          name="username"
          id="username"
          ref={register({ required: true })}
        />{" "}
        <br />
      </div>

      <div className="mb-2 text-2xl flex flex-col justify-center items-center">
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-800 ml-2 w-full"
          type="text"
          name="password"
          id="password"
          ref={register({ required: true })}
        />
      </div>
      <div className="flex justify-around items-center w-full text-white">
        <button className="bg-darkBlue py-2 my-2 w-1/2 rounded px-4 text-lg hover:bg-blue-800 transform transition rounded hover:scale-110 overflow-hidden">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
