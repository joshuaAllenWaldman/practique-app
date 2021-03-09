import React from 'react'
import { useForm } from 'react-hook-form';

function EditHobbyFormHook (props) {
  const {name, skillLevel, longTermGoals} = props.hobby;

  const { register, handleSubmit, watch, errors } =useForm({
    defaultValues: {
      name,
      skillLevel,
      longTermGoals
    }
  })


  const onSubmit = (data) => {
    const hobbyId = props.hobby._id;
    fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => props.fetchHobbyInfo())
      .then(() => props.closeEditHobbyModal())
      .catch((err) => console.log(err))
  }
  

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 max-w-2xl mx-auto flex flex-col justify-center items-center text ">
          <div className="my-2 flex flex-col justify-center items-center">
            <label htmlFor="name" className="underline" >Name of Hobby</label>
            <input  className="text-center border border-gray-400 block py-2 px-4 rounded" type="text" name="name" id="name"  ref={register({required: true, minLength: 3})}/>
            {errors.name && <p>This Field cannot be empty</p>}
          </div>
          <div className="my-2 flex flex-col justify-center items-center">
            <label htmlFor="skillLevel" className="underline">What's your skill level?</label>
            <select className="border border-gray-400 block py-2 px-4 rounded" name="skillLevel" id="skillLevel"  ref={register}>
              <option value="beginner">Beginner</option>
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select> 
          </div>
          <div className="my-2 flex flex-col justify-center items-center">
            <label htmlFor="longTermGoals" className="underline">What is your long term goal?</label>
            <input  className="border border-gray-400 block py-2 px-4 rounded min-w-full" type="text" name="longTermGoals" id="longTermGoals" ref={register}/>
          </div>
          <div className="flex flex-row justify-around mt-4 text-white">
            <button type="submit" className="bg-darkBlue px-3 py-4 mx-2 hover:bg-lightBlue" >Update Hobby</button>
            <button className="bg-red-800 px-3 py-1 mx-2 hover:bg-brickRed" onClick={() => props.deleteHobby(props.hobby._id)} >Delete Hobby</button>
          </div>
      </form> 

  )
}

export default EditHobbyFormHook;