import React from 'react'
import { useForm } from 'react-hook-form'

function NewSessionFormHook (props) {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      nickName: 'Practice Session',
      duration: 0
    }
  });

  const onSubmit = (data) => {
    const hobbyId = props.match.params.id
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
      .then(() => props.history.push(`/hobbies/${hobbyId}`))
      .catch((err) => console.log(err))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 max-w-3xl mx-auto">
      <div>
        <label htmlFor="nickName">Session nickname:</label>
        <input className="border border-gray-400 block py-2 px-4 w-fuu rounded"  type="text" name="nickName" id="nickName" ref={register} /> <br/>
      </div>
      <div>
        <label htmlFor="sessionGoals">What is your goal for this session?</label>
        <input className="border border-gray-400 block py-2 px-4 w-fuu rounded" type="text" name="sessionGoals" id="sessionGoals" ref={register} /> <br/>
      </div>
      <div>
        <label htmlFor="challengeLevel">How Challening was this session? 1 being easy 5 being hard.</label>
        <select className="border border-gray-400 block py-2 px-4 w-fuu rounded" name="challengeLevel" id="challengeLevel" ref={register({required: true})} >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select> 
        {errors.challengeLevel === 'required' && <span>You must select a challenge level</span>}
      </div>
          <br/>
        <div>
          <label htmlFor="notes">Add some notes of how your session went</label>
          <textarea className="border border-gray-400 block py-2 px-4 w-fuu rounded" name="notes" id="notes" cols="30" rows="10" ref={register}></textarea> <br/>
        </div>
        <div>
          <label htmlFor="duration">How Long did you practice for?(In Minutes)</label>
          <input className="border border-gray-400 block py-2 px-4 w-fuu rounded" type="number" name="duration" id="duration" ref={register} />
        </div>
          <button className="border py-2 px-4 bg-green-400 hover:bg-green-200" >Add Session</button>
        </form>
  )
}

export default NewSessionFormHook;