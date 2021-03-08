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

  console.log(watch("name"));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 max-w-3xl mx-auto flex flex-col justify-center text-xl bg-gray-50 mt-4 border-4 border-blue-800">
      <div className="mt-2">
        <label htmlFor="name">Name of Hobby</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-gray-400 block w-full py-2 px-4 rounded"
          ref={register({ required: true })}
        />
        {errors.name && <p>This field is required</p>}
      </div>

      <div>
        <label htmlFor="skillLevel">What's your skill level?</label>
        <select className="border border-gray-400 block py-2 px-4 w-full rounded" name="skillLevel" id="skillLevel" ref={register}>
          <option value="beginner">Beginner</option>
          <option value="novice">Novice</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div>
        <label htmlFor="longTermGoals">What is your long term goal?</label>
        <input
          type="text"
          name="longTermGoals"
          id="longTermGoals"
          className="border border-gray-400 block py-2 px-4 w-full rounded"
          ref={register}
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-green-400 w-1/4 py-4 my-2 text-xl hover:bg-green-200" type="submit">Add Hobby</button>
      </div>
    </form>
  );
}

export default NewHobbyFormHook;
