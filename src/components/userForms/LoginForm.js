import React from 'react';
import { useForm } from 'react-hook-form'

const LoginForm = (props) => {

  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    fetch('http://localhost:4000/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => props.history.push('/home'))
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="username">UserName</label>
    <input type="text" name="username" id="username" ref={register({required: true})}/> <br/>
    <label htmlFor="password">Password</label>
    <input type="text" name="password" id="password"  ref={register({required: true})}/>
    <button>Login</button>
  </form>
  )
}

export default LoginForm