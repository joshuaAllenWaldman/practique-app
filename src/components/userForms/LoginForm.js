import React from 'react';

class LoginForm extends React.Component {
state = {
  username: '',
  password: ''
}



handleChange = (event) => {
  this.setState({
    [event.target.id]: event.target.value
  })
}

handleSubmit = (e) => {
  e.preventDefault();
  fetch('http://localhost:4000/api/v1/users/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state)
  })
    .then(() => this.props.history.push('/home'))
    .catch((err) => console.log(err))
}


  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">UserName</label>
          <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} /> <br/>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm