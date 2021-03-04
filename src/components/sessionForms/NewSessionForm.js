import React from 'react';

class NewSessionForm extends React.Component {
  state = {
    nickname: '',
    goals: '',
    challengeLevel: '',
    notes: '',
    startTime: '',
    duration: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state)
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.props)
    // fetch ('http://localhost:4000/api/v1/hobbies/', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // })
    //   .then((res) => res.json())
    //   .then((jsonData) => console.log(jsonData))
    //   .then(() => this.props.history.push('/home'))
    //   .catch((err) => console.log(err))
  }

  render () {
    return (
      <div>
        <h1>New Session</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="nickname">Session Nickname(optional):</label>
          <input type="text" name="nickname" id="nickname" value={this.state.nickname} onChange={this.handleChange}/> <br/>
          <label htmlFor="goals">What is your goal for this session?</label>
          <input type="text" name="goals" id="goals" value={this.state.goals} onChange={this.handleChange}/> <br/>
          <label htmlFor="challengeLevel">How Challening was this session? 1 being easy 5 being hard.</label>
          <select name="challengLevel" id="challengeLevel" value={this.state.challengeLevel} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> <br/>
          <label htmlFor="notes">Add some notes of how your session when</label>
          <textarea name="notes" id="notes" cols="30" rows="10" value={this.state.notes} onChange={this.handleChange}>Type here</textarea> <br/>
          <label htmlFor="startTime">Start Time</label>
          <input type="Time" name="startTime" id="startTime" value={this.state.startTime} onChange={this.handleChange}/> <br/>
          <label htmlFor="duration">How Long did you practice for?</label>
          <input type="Time" name="duration" id="duration" value={this.state.duration} onChange={this.handleChange}/>
          <button>Save Session</button>
        </form>
      </div>
    )
  }
}

export default NewSessionForm;