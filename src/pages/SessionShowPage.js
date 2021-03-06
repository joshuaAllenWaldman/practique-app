import React from 'react';

import EditSessionFormHook from '../components/sessionForms/EditSessionFormHook';

class SessionShowPage extends React.Component {
  state ={
    session: undefined,
    hobby: undefined
  }

  fetchSessionInfo = () => {
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

  componentDidMount () {
    this.fetchSessionInfo();
  }

  deleteSession = (seshId) => {
    const hobbyId = this.props.match.params.id;
    if (window.confirm('Are you sure you want to delete this session?')) {
      fetch (`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions/${seshId}`,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((jsonData) => console.log(jsonData))
        .then(() => this.props.history.push(`/hobbies/${hobbyId}`))
    }

  }
  
  
  render () {
    if(!this.state.hobby || !this.state.session) {
      return <div>Loading</div>
    }
    
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
        <EditSessionFormHook 
          sessionInfo={this.state.session}
          fetchSessionInfo={this.fetchSessionInfo}
          deleteSession={this.deleteSession }
        />
    </div>
    )
  }
}

export default SessionShowPage;