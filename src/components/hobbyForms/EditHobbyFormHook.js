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
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 max-w-3xl mx-auto flex flex-col justify-center">

          <div>
            <label htmlFor="name">Name of Hobby</label>
            <input  className="border border-gray-400 block py-2 px-4 rounded" type="text" name="name" id="name"  ref={register({required: true, minLength: 3})}/>
            {errors.name && <p>This Field cannot be empty</p>}
          </div>
          <div>
            <label htmlFor="skillLevel">What's your skill level?</label>
            <select className="border border-gray-400 block py-2 px-4 rounded" name="skillLevel" id="skillLevel"  ref={register}>
              <option value="beginner">Beginner</option>
              <option value="novice">Novice</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select> 
          </div>
          <div>
            <label htmlFor="longTermGoals">What is your long term goal?</label>
            <input  className="border border-gray-400 block py-2 px-4 rounded" type="text" name="longTermGoals" id="longTermGoals" ref={register}/>
          </div>
          <div className="flex flex-row justify-around mt-2">
            <button type="submit" className="bg-blue-400 px-3 py-1 mx-2 hover:bg-blue-200" >Update Hobby</button>
            <button className="bg-green-400 ml-2 px-3 py-1 mx-2 hover:bg-red-400" onClick={() => props.closeEditHobbyModal()} >Cancel</button>
            <button className="bg-red-400 px-3 py-1 mx-2 hover:bg-red-200" onClick={() => props.deleteHobby(props.hobby._id)} >Delete Hobby</button>

          </div>

      </form> 
  )
}

export default EditHobbyFormHook;