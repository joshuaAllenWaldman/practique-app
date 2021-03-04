import React from 'react';
import { Link } from 'react-router-dom';

import SessionIndex from '../components/sessionComponents/SessionIndex';

class HobbyPage extends React.Component {
  state ={
    hobby: {},
    sessions: []
  }

  componentDidMount () {
    const hobbyId = this.props.match.params.id;
    fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((jsonData) => this.setState({hobby: jsonData}))
      .then(
        fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions`, {
          credentials: 'include'
        })
        .then((res2) => res2.json())
        .then((jsonData2) => this.setState({sessions: jsonData2}))
      )
      
  }

  render () {
    const hobbyId = this.props.match.params.id;

    return (
      <div className="hobbyshowContainer">
          <div className="hobbyInfoCol" >
            <h1>{this.state.hobby.name}</h1>
        </div>
        <div className="sessionCol">
        <SessionIndex sessions={this.state.sessions}/>
          <div>
            <Link to={`/hobbies/${hobbyId}/add-session`} >
              <button>Add New Session</button>
            </Link>
          </div>
        </div>
      </div>

    )
  }
}

export default HobbyPage;