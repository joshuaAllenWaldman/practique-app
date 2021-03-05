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
    <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="nickName">Session nickname:</label>
          <input type="text" name="nickName" id="nickName" ref={register} /> <br/>
          <label htmlFor="sessionGoals">What is your goal for this session?</label>
          <input type="text" name="sessionGoals" id="sessionGoals" ref={register} /> <br/>
          <label htmlFor="challengeLevel">How Challening was this session? 1 being easy 5 being hard.</label>
          <select name="challengeLevel" id="challengeLevel" ref={register({required: true})} >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select> 
          {errors.challengeLevel === 'required' && <span>You must select a challenge level</span>}
          <br/>
          <label htmlFor="notes">Add some notes of how your session went</label>
          <textarea name="notes" id="notes" cols="30" rows="10" ref={register}></textarea> <br/>
          <label htmlFor="duration">How Long did you practice for?(In Minutes)</label>
          <input type="number" name="duration" id="duration" ref={register} />
          <button>Add Session</button>
        </form>
  )
}

export default NewSessionFormHook;