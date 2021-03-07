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
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 my-32 max-w-3xl mx-auto space-y-4">
        <div>
          <label htmlFor="username">UserName</label>
          <input className="border border-gray-800 ml-2 w-full" type="text" name="username" id="username" ref={register({required: true})}/> <br/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input className="border border-gray-800 ml-2 w-full" type="text" name="password" id="password"  ref={register({required: true})}/>
        </div>
        <div className="flex justify-center">
        <button className="relative items-center bg-blue-800 text-white px-16 py-2 hover:bg-blue-400" >Login</button>
        </div>
      </form>

    </div>
  )
}

export default LoginForm