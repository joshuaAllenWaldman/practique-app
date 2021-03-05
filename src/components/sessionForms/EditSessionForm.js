import React from 'react';

class EditSessionForm extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      nickName: props.sessionInfo.nickName,
      sessionGoals: props.sessionInfo.sessionGoals,
      challengeLevel: props.sessionInfo.challengeLevel,
      notes: props.sessionInfo.notes,
      duration: props.sessionInfo.duration,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    const hobbyId = this.props.sessionInfo.hobby
    const seshId = this.props.sessionInfo._id
    fetch (`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions/${seshId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => this.props.fetchSessionInfo())
      .catch((err) => console.log(err))
  }

  render () {
    if(!this.state) {
      console.log('no dice')
      return <div>Loading</div>
    }
    return (
      <div>
        <h1>Edit Session Session</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="nickName">Session nickname(optional):</label>
          <input type="text" name="nickName" id="nickName" value={this.state.nickName} onChange={this.handleChange}/> <br/>
          <label htmlFor="sessionGoals">What is your goal for this session?</label>
          <input type="text" name="sessionGoals" id="sessionGoals" value={this.state.sessionGoals} onChange={this.handleChange}/> <br/>
          <label htmlFor="challengeLevel">How Challening was this session? 1 being easy 5 being hard.</label>
          <select name="challengLevel" id="challengeLevel" value={this.state.challengeLevel} onChange={this.handleChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select> <br/>
          <label htmlFor="notes">Add some notes of how your session went</label>
          <textarea name="notes" id="notes" cols="30" rows="10" value={this.state.notes} onChange={this.handleChange}>Type here</textarea> <br/>
          <label htmlFor="duration">How Long did you practice for?(In Minutes)</label>
          <input type="number" name="duration" id="duration" value={this.state.duration} onChange={this.handleChange}/>
          <button>Submit Changes</button>
        </form>
          <button onClick={() => {
            this.props.deleteSession(this.props.sessionInfo._id);
            }} >Delete Session</button>
      </div>
    )
  }
}

export default EditSessionForm;