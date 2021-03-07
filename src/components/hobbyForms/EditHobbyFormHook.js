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
      .catch((err) => console.log(err))
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
          <label htmlFor="name">Name of Hobby</label>
          <input type="text" name="name" id="name"  ref={register({required: true, minLength: 3})}/>
          {errors.name && <p>This Field cannot be empty</p>}
          <label htmlFor="skillLevel">What's your skill level?</label>
          <select name="skillLevel" id="skillLevel"  ref={register}>
            <option value="beginner">Beginner</option>
            <option value="novice">Novice</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select> <br/>
          <label htmlFor="longTermGoals">What is your long term goal?</label>
          <input type="text" name="longTermGoals" id="longTermGoals" ref={register}/>
          <button type="submit">Update Hobby</button>
        </form>
        <button onClick={() => props.deleteHobby(props.hobby._id)} >Delete Hobby</button>
      </div>  
  )
}

export default EditHobbyFormHook;