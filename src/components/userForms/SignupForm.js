import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'

function SignupForm (props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({})
  password.current = watch("password", "")



  const onSubmit = (data) => {
    console.log(data)
    const {confPassword, ...rest} = data
    fetch('http://localhost:4000/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rest)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => props.history.push('/home'))
      .catch((err) => console.log(err))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" ref={register({required: true})}/> <br/>
          {errors.name && <p>Name Required</p>}
          <label htmlFor="username">UserName</label>
          <input type="text" name="username" id="username" ref={register({required: true, minLength: 1})} />
          {errors.username && <p>Username Required</p>}
          {errors.username === 'minLength' && <p>Must be at least 6 characters.</p>}


          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" ref={register({required: true})}/> <br/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={register({required: 'You must create a password', minLength: {value: 2, message: 'Password must have at least 6 characters'}})}/> 
          {errors.password && <p>{errors.password.message}</p>}
          <label htmlFor="confPassword">Confirm Password</label>
          <input type="password" name="confPassword" id="confPassword" ref={register({
            validate: value =>
            value === password.current || "The passwords do not match"
          })}/> 
          {errors.confPassword && <p>{errors.confPassword.message}</p>}
          <button type="submit">Signup!</button>
        </form>
  )
}

export default SignupForm;