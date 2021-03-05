import React from 'react';

class EditHobbyForm extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      name: props.hobby.name,
      skillLevel: props.hobby.skillLevel,
      longTermGoals: props.hobby.longTermGoals
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.hobby.name !== prevProps.hobby.name){
      console.log('component did update ')
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }



  handleSubmit = (event) => {
    event.preventDefault();
    const hobbyId = this.props.hobby._id;
    fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => this.props.fetchHobbyInfo())
      .catch((err) => console.log(err))
  }

  render () {

    return (
      <div>
        <h1></h1>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor="name">Name of Hobby</label>
          <input type="text" name="name" id="name" value={this.state.name || this.props.hobby.name} onChange={this.handleChange}/> <br/>
          <label htmlFor="skillLevel">What's your skill level?</label>
          <select name="skillLevel" id="skillLevel" value={this.state.skillLevel || this.props.hobby.skillLevel} onChange={this.handleChange}>
            <option value="beginner">Beginner</option>
            <option value="novice">Novice</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select> <br/>
          <label htmlFor="longTermGoals">What is your long term goal?</label>
          <input type="text" name="longTermGoals" id="longTermGoals" value={this.state.longTermGoals || this.props.hobby.longTermGoals} onChange={this.handleChange}/>
          <button type="submit">Update Hobby</button>
        </form>
        <button onClick={() => this.props.deleteHobby(this.props.hobby._id)} >Delete Hobby</button>
      </div>
    )
  }
}

export default EditHobbyForm;