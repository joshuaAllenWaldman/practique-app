import React from 'react'
import { useForm } from 'react-hook-form'

function NewHobbyFormHook (props) {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      skillLevel: 'beginner'
    }
  });


  const onSubmit = (data) => {
    console.log(data)
    fetch ('http://localhost:4000/api/v1/hobbies/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => props.history.push('/home'))
      .catch((err) => console.log(err))
  };

  console.log(watch('name'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name of Hobby</label>
          <input type="text" name="name" id="name" ref={register({required: true, minLength: 3})}/> 
          {errors.name && <p>This field is required</p>}
          {errors.name === 'minLength' && <p>Must be at least 3 characters</p>}
          <label htmlFor="skillLevel">What's your skill level?</label>
          <select name="skillLevel" id="skillLevel" ref={register}>
            <option value="beginner">Beginner</option>
            <option value="novice">Novice</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select> <br/>
          <label htmlFor="longTermGoals">What is your long term goal?</label>
          <input type="text" name="longTermGoals" id="longTermGoals" ref={register}/>
          <button type="submit">Add Hobby</button>
        </form>
  )
}

export default NewHobbyFormHook;