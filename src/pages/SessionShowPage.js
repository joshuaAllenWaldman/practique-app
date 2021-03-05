import React from 'react';

class SessionShowPage extends React.Component {
  state ={
    session: {},
    hobby: {}
  }

  componentDidMount () {
    const hobbyId = this.props.match.params.id;
    const seshId = this.props.match.params.seshId
    fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions/${seshId}`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((jsonData) => this.setState({session: jsonData}))  
    
      fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}`, {
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((jsonData) => this.setState({hobby: jsonData}))  
  }
  
  render () {
    console.log(this.state)
    return (
      <div className="sessionShowContainer" >
        <div className="title">
          <h1>{this.state.hobby.name} Session Details </h1>
          <h4>Session Nickname: {this.state.session.nickName}</h4>
        </div>
        <div className="sessionGoals">
          <h3>Session Goals</h3>
          <div>
            <p>{this.state.session.sessionGoals}</p>
          </div>
        </div>
        <div className="difficulty">
          <h3>Challenge Level</h3>
          <div>
            <p>{this.state.session.challengeLevel}</p>
          </div>
        </div>
    </div>
    )
  }
}

export default SessionShowPage;