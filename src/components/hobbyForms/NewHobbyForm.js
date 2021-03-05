import React from 'react';

class NewHobbyForm extends React.Component {
  state = {
    name: '',
    skillLevel: 'Beginner',
    longTermGoals: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch ('http://localhost:4000/api/v1/hobbies/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>New Hobby</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name of Hobby</label>
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange}/> <br/>
          <label htmlFor="skillLevel">What's your skill level?</label>
          <select name="skillLevel" id="skillLevel" value={this.state.skillLevel} onChange={this.handleChange}>
            <option value="beginner">Beginner</option>
            <option value="novice">Novice</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select> <br/>
          <label htmlFor="longTermGoals">What is your long term goal?</label>
          <input type="text" name="longTermGoals" id="longTermGoals" value={this.state.longTermGoals} onChange={this.handleChange}/>
          <button type="submit">Add Hobby</button>
        </form>
      </div>
    )
  }
}

export default NewHobbyForm;
