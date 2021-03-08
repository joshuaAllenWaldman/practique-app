import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import SessionIndex from '../components/sessionComponents/SessionIndex';
import EditHobbyFormHook from '../components/hobbyForms/EditHobbyFormHook';
import NewSessionForm from '../components/sessionForms/NewSessionFormHook';
import NewSessionFormHook from '../components/sessionForms/NewSessionFormHook';

class HobbyPage extends React.Component {
  state ={
    hobby: undefined,
    sessions: undefined,
    modalOneIsOpen: false,
    modalTwoIsOpen: false
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
  openEditHobbyModal = () => {
    this.setState({modalOneIsOpen: true})
  }
  closeEditHobbyModal = () => {
    this.setState({modalOneIsOpen: false})
  }
  openNewSessionModal = () => {
    this.setState({modalTwoIsOpen: true})
  }
  closeNewSessionModal = () => {
    this.setState({modalTwoIsOpen: false})
  }

  
  render () {
    const hobbyId = this.props.match.params.id;
    if(!this.state.hobby || !this.state.sessions) {
      return <div>Loading</div>
    }
    return (
      <div className="container min-h-screen">
        <div className="grid grid-cols-2 gap-2 w-screen mt-28">

          <div className="hobbyCol py-2 px-2 ml-4 overflow-auto h-96 border-8 border-blue-800" >
            <div className="min-h-full flex justify-center py-2 px-2">
              <div className="py-2 px-2 w-full flex flex-col items-center justify-start " >
                <h1 className="text-4xl underline">{this.state.hobby.name}</h1>
              </div>  
            </div>
          </div>

          <div className="sessionCol border-8 border-blue-800 py-2 px-2 mr-4 h-96 overflow-auto">
            <div  className="min-h-full flex justify-center py-2 px-2 ">
              <div className="py-2 px-2 max-h-full w-full flex flex-col items-center justify-start " >
                <h1 className="text-4xl underline">Sessions:</h1>
                <SessionIndex sessions={this.state.sessions}/>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 flex justify-between mt-4">
          <div className="flex justify-center">
              <div className="bg-white border-2 border-black hover:bg-red-400 py-2 px-4">
                <button onClick={() => this.openEditHobbyModal()} >Edit Hobby</button>
                </div>
            </div>

          <div className="flex justify-center">
            <div className="bg-white border-2 border-black hover:bg-red-400 py-2 px-4">
                  <button onClick={() => this.openNewSessionModal()} >Add New Session</button>

              </div>
          </div>
        </div>
      
        <Modal 
        isOpen={this.state.modalOneIsOpen}
        style={{
          content: {
            width: "500px",
            margin: "auto"
          }
        }}
        >
          <div className="bg-white flex justify-center items-center">
            <EditHobbyFormHook 
              hobby={this.state.hobby} 
              history={this.props.history} 
              fetchHobbyInfo={this.fetchHobbyInfo}
              deleteHobby={this.deleteHobby}
              openEditHobbyModal={this.openEditHobbyModal}
              closeEditHobbyModal={this.closeEditHobbyModal}
            />
          </div>
        </Modal>

        <Modal 
        isOpen={this.state.modalTwoIsOpen}
        style={{
          content: {
            width: "500px",
            margin: "auto",
          }
        }}
        >
          <div className="bg-white flex justify-center items-center ">
            <NewSessionFormHook 
              hobby={this.state.hobby} 
              history={this.props.history} 
              fetchHobbyInfo={this.fetchHobbyInfo}
              deleteHobby={this.deleteHobby}
              openNewSessionModal={this.openNewSessionModal}
              closeNewSessionModal={this.closeNewSessionModal}
            />
          </div>
        </Modal>


      </div>

    )
  }
}

export default HobbyPage;