import React from 'react'
import { useForm } from 'react-hook-form'
import moment from 'moment'

function NewSessionFormHook (props) {
  const newSeshDate = moment().format("ddd")
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      nickName: 'Practice Session',
    }
  });

  const onSubmit = (data) => {
    const hobbyId = props.hobby._id
    console.log(props)
    fetch (`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then((jsonData) => props.onCreate(jsonData))
      .catch((err) => console.log(err))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 max-w-3xl max-h-full mx-auto flex justify-around flex-col items-center">
      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="nickName" className="underline text-2xl">Session nickname:</label>
        <input className="border border-gray-400 block py-2 px-4 rounded" placeholder="NickName" type="text" name="nickName" id="nickName" ref={register} /> 
      </div>
      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="sessionGoals">What is your goal for this session?</label>
        <input className="border border-gray-400 block py-2 px-4 w-full rounded" type="text" name="sessionGoals" id="sessionGoals" ref={register} /> 
      </div>
      <div className="my-1 flex flex-col justify-center items-center">
        <label htmlFor="challengeLevel">How Challening was this session?</label>
        <select className="border border-gray-400 block py-2 px-4 w-full rounded" name="challengeLevel" id="challengeLevel" ref={register({required: true})} >
          <option value={1}>1 - Easy Peasy</option>
          <option value={2}>2 - Medium Easiness</option>
          <option value={3}>3 - Slightly Challening</option>
          <option value={4}>4 - Full blown Challenging</option>
          <option value={5}>5 - Very Very Challenging</option>
        </select> 
        {errors.challengeLevel === 'required' && <span>You must select a challenge level</span>}
      </div>
          
        <div className="my-1 flex flex-col justify-center items-center">
          <label htmlFor="notes">Add some notes of how your session went</label>
          <textarea className="border border-gray-400 block py-2 px-4 w-full rounded" name="notes" id="notes" cols="30" rows="10" ref={register}></textarea> 
        </div>
        <div className="my-1 flex flex-col justify-center items-center">
          <label htmlFor="duration">How Long did you practice for?(In Minutes)</label>
          <input className="border border-gray-400 block py-2 px-4 w-full rounded" type="number" min="0" name="duration" id="duration" ref={register({required: true})} />
          {errors.duration && <span className="text-brickRed ">You must enter a duration</span>}

        </div>
          <div className="flex flex-row justify-around  mt-4 text-white" >
            <button type="submit" className="border px-3 py-4 mx-2 bg-darkBlue hover:bg-lightBlue " >Add Session</button>

          </div>
          
        </form>
  )
}

export default NewSessionFormHook;