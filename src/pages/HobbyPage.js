import React from 'react';
import { Link } from 'react-router-dom';

import SessionIndex from '../components/sessionComponents/SessionIndex';

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
      <div className="container min-h-screen">
        <div className="grid grid-cols-2 gap-2">

          <div className="hobbyCol py-2 px-2" >
            <div className="bg-blue-400 min-h-full flex justify-center py-2 px-2">
              <h1 className="text-4xl underline">{this.state.hobby.name}</h1>
            </div>
          </div>

          <div className="sessionCol py-2 px-2">
            <div  className="bg-blue-400 min-h-full flex justify-center py-2 px-2">
              <div className="bg-blue-100 py-2 px-2 w-full flex flex-col items-center justify-center" >
                <h1 className="text-4xl underline">Sessions:</h1>
                <SessionIndex sessions={this.state.sessions}/>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 flex justify-between">
          <div className="flex justify-center">
              <div className="bg-white border-2 border-black hover:bg-red-400 py-2 px-4">
                  <Link to={`/hobbies/${hobbyId}/add-session`} >
                    <button>Edit Hobby</button>
                  </Link>
                </div>
            </div>

          <div className="flex justify-center">
            <div className="bg-white border-2 border-black hover:bg-red-400 py-2 px-4">
                <Link to={`/hobbies/${hobbyId}/add-session`} >
                  <button>Add New Session</button>
                </Link>
              </div>
          </div>
        </div>
      


        {/* <div className="form">
          <h1>Edit Hobby TEMPORARY TEMPORARY</h1>
          <EditHobbyFormHook 
            hobby={this.state.hobby} 
            history={this.props.history} 
            fetchHobbyInfo={this.fetchHobbyInfo}
            deleteHobby={this.deleteHobby}
          />
        </div> */}
      </div>

    )
  }
}

export default HobbyPage;