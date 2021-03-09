import React from 'react';
import Modal from 'react-modal';
import HobbyInfo from '../components/hobbyComponents/HobbyInfo'
import SessionIndex from '../components/sessionComponents/SessionIndex';
import EditHobbyFormHook from '../components/hobbyForms/EditHobbyFormHook';
import NewSessionFormHook from '../components/sessionForms/NewSessionFormHook';


class HobbyPage extends React.Component {
  state ={
    hobby: undefined,
    sessions: undefined,
    editHobbyModalIsOpen: false,
    newSessionModalIsOpen: false
  }


  fetchHobbyInfo = () => {
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
    this.setState({editHobbyModalIsOpen: true})
  }
  closeEditHobbyModal = () => {
    this.setState({editHobbyModalIsOpen: false})
  }
  openNewSessionModal = () => {
    this.setState({newSessionModalIsOpen: true})
  }
  closeNewSessionModal = () => {
    this.setState({newSessionModalIsOpen: false})
  }
  openShowSessionModal = () => {
    this.setState({newSessionModalIsOpen: true})
  }
  closeShowSessionModal = () => {
    this.setState({newSessionModalIsOpen: false})
  }
  
  render () {
    const hobbyId = this.props.match.params.id;
    if(!this.state.hobby || !this.state.sessions) {
      return <div>Loading</div>
    }
    return (
      <div className="container min-h-screen min-w-screen">
        <div className="grid grid-cols-2 gap-4 w-screen mt-8">

          <div className="hobbyCol py-2 px-2 ml-8 overflow-auto border-4 border-pumpkin bg-darkBlue" >
            <div className="min-h-full flex justify-center py-2 px-2">
              <div className="py-2 px-2 w-full flex flex-col items-center justify-start" >
                <div className="heading px-24 py-6 shadow-1 bg-lightPink shadow-xl mb-2 rounded" >
                  <h1 className="text-4xl text-darkBlue underline">{this.state.hobby.name}</h1> 
                </div>
                <div className="bg-lightPink w-3/4 text-center rounded">
                  <HobbyInfo 
                    hobby={this.state.hobby}
                    sessions={this.state.sessions}
                  />
                </div>
              </div> 
            </div>
          </div>

          <div className="sessionCol min-h-full border-4 border-blue-800 py-2 px-2 mr-8 h-96 overflow-auto border-pumpkin bg-darkBlue">
            <div  className=" flex justify-center py-2 px-2 ">
              <div className="py-2 px-2 max-h-full w-full flex flex-col items-center justify-start " >
                
                <h1 className="text-4xl text-darkBlue underline heading px-24 py-6 shadow-1 bg-lightPink shadow-xl mb-2 rounded">Sessions:</h1>
                <SessionIndex 
                openNewSessionModal={this.openNewSessionModal}
                closeNewSessionModal={this.closeNewSessionModal}
                sessions={this.state.sessions}/>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 flex justify-between mt-4 w-screen">

          <div className="flex justify-center items-center">
              <div onClick={() => this.openEditHobbyModal()} className="bg-darkBlue text-lightPink px-8 py-2 hover:bg-lightBlue shadow-xl my-4 transform transition rounded hover:scale-110 overflow-hidden">
                <button onClick={() => this.openEditHobbyModal()} >Edit Hobby</button>
                </div>
            </div>

          <div className="flex justify-center">
            <div onClick={() => this.openNewSessionModal()} className="bg-darkBlue text-lightPink px-8 py-2 hover:bg-lightBlue shadow-xl my-4">
                  <button onClick={() => this.openNewSessionModal()} >Add New Session</button>

              </div>
          </div>
        </div>
      
        <Modal 
        isOpen={this.state.editHobbyModalIsOpen}
        onRequestClose={this.closeEditHobbyModal}
        style={{
          content: {
            width: "500px",
            margin: "auto",
            background: "#f6d7c3",
            border: "none",
            height: "50%"
          },
          overlay: {
            backgroundColor: "rgba(48, 82, 91, 0.75)",
          }
        }}
        >
          
            <EditHobbyFormHook 
              hobby={this.state.hobby} 
              history={this.props.history} 
              fetchHobbyInfo={this.fetchHobbyInfo}
              deleteHobby={this.deleteHobby}
              openEditHobbyModal={this.openEditHobbyModal}
              closeEditHobbyModal={this.closeEditHobbyModal}
            />         
        </Modal>

        <Modal 
        isOpen={this.state.newSessionModalIsOpen}
        onRequestClose={this.closeNewSessionModal}
        style={{
          content: {
            width: "600px",
            margin: "auto",
            background: "#f6d7c3",
            border: "none",
            overflow: "scroll"
          },
          overlay: {
            backgroundColor: "rgba(48, 82, 91, 0.75)",
          }
        }}
        >
          <div className="overflow-auto">
            <NewSessionFormHook 
              hobby={this.state.hobby}
              onCreate={() => {
                this.closeNewSessionModal()
                this.fetchHobbyInfo()
                }}
            />

          </div>

        </Modal>

      

      </div>

    )
  }
}

export default HobbyPage;