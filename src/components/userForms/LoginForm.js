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
 
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 max-w-2xl mx-auto flex flex-col items-center text-xl bg-gray-50 mt-4 border-4 border-blue-800 rounded-2xl">
        <div className="my-2">
          <label htmlFor="username">UserName</label>
          <input className="border border-gray-800 ml-2 w-full" type="text" name="username" id="username" ref={register({required: true})}/> <br/>
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input className="border border-gray-800 ml-2 w-full" type="text" name="password" id="password"  ref={register({required: true})}/>
        </div>
        <div className="flex justify-center">
        <button className="relative items-center bg-green-400 text-white px-8 py-2 hover:bg-green-200 my-2" >Login</button>
        </div>
      </form>


  )
}

export default LoginForm