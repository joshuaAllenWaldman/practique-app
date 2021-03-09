import React from "react";
import { useForm } from "react-hook-form";

function EditSessionFormHook(props) {
  const {
    nickName,
    sessionGoals,
    challengeLevel,
    notes,
    duration,
  } = props.sessionInfo;

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      nickName,
      sessionGoals,
      challengeLevel,
      notes,
      duration,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const hobbyId = props.sessionInfo.hobby;
    const seshId = props.sessionInfo._id;
    fetch(
      `http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions/${seshId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((jsonData) => props.onEdit(jsonData))
      .then((jsonData) => console.log(jsonData))
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-4 max-w-3xl mx-auto flex justify-around flex-col items-center"
    >
      <div className="my-2 flex flex-col justify-center items-center">
        <label htmlFor="nickName text-2xl">Session nickname:</label>
        <input
          className="border border-gray-400 block py-2 px-4 rounded text-center"
          type="text"
          name="nickName"
          id="nickName"
          ref={register}
        />
      </div>
      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="sessionGoals">
          What is your goal for this session?
        </label>
        <input
          className="border border-gray-400 block py-2 px-4 rounded text-center"
          type="text"
          name="sessionGoals"
          id="sessionGoals"
          ref={register}
        />
      </div>
      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="challengeLevel">How Challening was this session?</label>
        <select
          className="border border-gray-400 block py-2 px-4 w-full rounded"
          name="challengeLevel"
          id="challengeLevel"
          ref={register({ required: true })}
        >
          <option value={1}>1 - Easy Peasy</option>
          <option value={2}>2 - Medium Easiness</option>
          <option value={3}>3 - Slightly Challening</option>
          <option value={4}>4 - Full blown Challenging</option>
          <option value={5}>5 - Very Very Challenging</option>
        </select>
        {errors.challengeLevel === "required" && (
          <span>You must select a challenge level</span>
        )}
      </div>

      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="notes">Add some notes of how your session went</label>
        <textarea
          className="border border-gray-400 block py-2 px-4 w-fuu rounded"
          name="notes"
          id="notes"
          cols="30"
          rows="10"
          ref={register}
        ></textarea>
      </div>
      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="duration">
          How Long did you practice for?(In Minutes)
        </label>
        <input
          className="border border-gray-400 block py-2 px-4 w-fuu rounded text-center"
          type="number"
          name="duration"
          id="duration"
          ref={register}
        />
      </div>
      <div className="flex flex-row justify-around  w-full mt-4 text-white overflow-hidden">
        <button
          type="submit"
          className="w-1/2  py-2 px-4 bg-darkBlue hover:bg-blue-800 transform transition rounded hover:scale-110"
        >
          Submit
        </button>
        <button
          className="w-1/2 bg-red-800 hover:bg-brickRed ml-2 px-3 py-1 transform transition rounded hover:scale-110"
          onClick={() => props.deleteSession(props.sessionInfo._id)}
        >
          Delete Session
        </button>
      </div>
    </form>
  );
}

export default EditSessionFormHook;
