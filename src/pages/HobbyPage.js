import React from 'react';
import { Link } from 'react-router-dom';

import SessionIndex from '../components/sessionComponents/SessionIndex';
import EditHobbyForm from '../components/hobbyForms/EditHobbyForm';
import EditHobbyFormHook from '../components/hobbyForms/EditHobbyFormHook';


class HobbyPage extends React.Component {
  state ={
    hobby: undefined,
    sessions: undefined
  }
  fetchHobbyInfo = () => {
    console.log('called component did mount hobbypage')
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
  componentDidMount () {
    this.fetchHobbyInfo();
  }

  deleteHobby = (hobbyId) => {
    if (window.confirm(
      'Are you sure you want to delete this hobby? Deleting the hobby will delete all saved sessions belonging to it.'
      )) {
      fetch (`http://localhost:4000/api/v1/hobbies/${hobbyId}`,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((jsonData) => console.log(jsonData))
        .then(this.setState({
          hobby: undefined,
          sessions: undefined
        }))
        .then(this.props.history.push('/home'))
    }
  }

  render () {
    const hobbyId = this.props.match.params.id;
    if(!this.state.hobby || !this.state.sessions) {
      return <div>Loading</div>
    }
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
        <hr/>
        <h1>Edit Hobby TEMPORARY TEMPORARY</h1>
        {/* <EditHobbyForm 
        hobby={this.state.hobby} 
        history={this.props.history} 
        fetchHobbyInfo={this.fetchHobbyInfo}
        deleteHobby={this.deleteHobby}
        /> */}
        <EditHobbyFormHook 
        hobby={this.state.hobby} 
        history={this.props.history} 
        fetchHobbyInfo={this.fetchHobbyInfo}
        deleteHobby={this.deleteHobby}
        />
      </div>

    )
  }
}

export default HobbyPage;