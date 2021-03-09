import React, { useRef } from "react";
import { useForm } from "react-hook-form";

function SignupForm(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    const { confPassword, ...rest } = data;
    fetch("http://localhost:4000/api/v1/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => props.history.push("/home"))
      .catch((err) => console.log(err));
  };
  console.log(props);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 max-w-3xl w-1/4 mx-auto flex flex-col items-center border-darkBlue border-2 bg-lightBlue rounded mt-8 shadow-4xl"
    >
      <div>
        <h1 className="text-4xl underline">Sign Up!</h1>
      </div>
      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="name">Name</label>
        <input
          className="border border-gray-400 block py-1 px-4 rounded"
          type="text"
          name="name"
          id="name"
          ref={register({ required: true })}
        />
        {errors.name && <p>Name Required</p>}
      </div>
      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="username">UserName</label>
        <input
          className="border border-gray-400 block py-1 px-4 rounded"
          type="text"
          name="username"
          id="username"
          ref={register({ required: true, minLength: 1 })}
        />
        {errors.username && <p>Username Required</p>}
        {errors.username === "minLength" && (
          <p>Must be at least 6 characters.</p>
        )}
      </div>

      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="email">Email</label>
        <input
          className="border border-gray-400 block py-1 px-4 rounded"
          type="email"
          name="email"
          id="email"
          ref={register({ required: true })}
        />
        <label htmlFor="password">Password</label>
        <input
          className="border border-gray-400 block py-1 px-4 rounded"
          type="password"
          name="password"
          id="password"
          ref={register({
            required: "You must create a password",
            minLength: {
              value: 2,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="confPassword">Confirm Password</label>
        <input
          className="border border-gray-400 block py-1 px-4 rounded"
          type="password"
          name="confPassword"
          id="confPassword"
          ref={register({
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.confPassword && <p>{errors.confPassword.message}</p>}
      </div>
      <div className="flex justify-around items-center w-full text-white">
        <button
          className="bg-darkBlue py-2 my-2 w-1/2 rounded px-4 text-lg hover:bg-blue-800 transform transition rounded hover:scale-110 overflow-hidden"
          type="submit"
        >
          Signup!
        </button>

        <button
          onClick={() => props.history.push("/login")}
          className="bg-green-400 py-2 my-2 w-1/2 rounded px-4 text-lg hover:bg-red-200 transform transition rounded hover:scale-110 overflow-hidden"
        >
          Login Here
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
