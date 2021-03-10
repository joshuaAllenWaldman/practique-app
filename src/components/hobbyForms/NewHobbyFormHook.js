import React from "react";
import { useForm } from "react-hook-form";

function NewHobbyFormHook(props) {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      skillLevel: "beginner",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:4000/api/v1/hobbies/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => props.history.push("/home"))
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 max-w-3xl mx-auto flex flex-col justify-center border-darkBlue border-2 bg-lightBlue rounded mt-8"
    >
      <div className="my-2 flex flex-col justify-center items-center">
        <h1 className="text-4xl underline">
          Add A New Hobby! 
        </h1>
      </div>
      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="name">Name of Hobby</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-gray-400 block w-3/4 py-2 px-4 rounded"
          ref={register({ required: true })}
        />
        {errors.name && <p>This field is required</p>}
      </div>

      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="skillLevel">What's your skill level?</label>
        <select
          className="border border-gray-400 block py-2 px-4 w-3/4 rounded"
          name="skillLevel"
          id="skillLevel"
          ref={register}
        >
          <option value="beginner">Beginner</option>
          <option value="novice">Novice</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="longTermGoals">What is your long term goal?</label>
        <input
          type="text"
          name="longTermGoals"
          id="longTermGoals"
          className="border border-gray-400 block py-2 px-4 w-3/4 rounded"
          ref={register}
        />
      </div>
      <div className="flex justify-center text-white">
        <button
          className="bg-darkBlue w-1/4 py-4 my-2 text-xl hover:bg-blue-800 rounded-lg transform transition rounded hover:scale-110"
          type="submit"
        >
          Add Hobby
        </button>
      </div>
    </form>
  );
}

export default NewHobbyFormHook;
