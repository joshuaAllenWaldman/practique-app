import { render } from '@testing-library/react';
import React from 'react';


class SignupForm extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    confPassword: ''
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state)
  }

  passwordConfirm = (event) => {

  }
  handleSubmit = (event) => {
    event.preventDefault();
    const {confPassword, ...rest} = this.state;
    if (confPassword !== rest.password)  {
      alert('Passwords do not match!')
      this.setState({
        password: '',
        confPassword: '',
      })
      return;
    }
    fetch('http://localhost:4000/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rest)
    })
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData))
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.log(err))
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} /> <br/>
          <label htmlFor="username">UserName</label>
          <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/> <br/>
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/> <br/>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" value={this.state.password} onChange={this.handleChange}/> <br/>
          <label htmlFor="confPassword">Confirm Password</label>
          <input type="text" name="confPassword" id="confPassword" value={this.state.confPassword} onChange={this.handleChange}/> <br/>
          <button type="submit">Signup!</button>
        </form>
      </div>
    )

  }
}

export default SignupForm;