import React from "react";
import Modal from "react-modal";
import { useHistory } from 'react-router-dom';

import EditSessionFormHook from "../components/sessionForms/EditSessionFormHook";

class SessionShowPage extends React.Component {
  state = {
    session: undefined,
    hobby: undefined,
    modalOneIsOpen: false,
  };

  fetchSessionInfo = () => {
    const hobbyId = this.props.match.params.id;
    const seshId = this.props.match.params.seshId;
    fetch(
      `http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions/${seshId}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((jsonData) => this.setState({ session: jsonData }));

    fetch(`http://localhost:4000/api/v1/hobbies/${hobbyId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jsonData) => this.setState({ hobby: jsonData }));
  };

  componentDidMount() {
    this.fetchSessionInfo();
  }

  deleteSession = (seshId) => {
    const hobbyId = this.props.match.params.id;
    if (window.confirm("Are you sure you want to delete this session?")) {
      fetch(
        `http://localhost:4000/api/v1/hobbies/${hobbyId}/sessions/${seshId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((jsonData) => console.log(jsonData))
        .then(() => this.props.history.push(`/hobbies/${hobbyId}`));
    }
  };

  openEditSessionModal = () => {
    this.setState({ modalOneIsOpen: true });
  };
  closeEditSessionModal = () => {
    this.setState({ modalOneIsOpen: false });
  };

  render() {
    if (!this.state.hobby || !this.state.session) {
      return <div>Loading</div>;
    }

    return (
      <>
        <div className="container mx-auto flex justify-center">
          <div className="border-8 border-blue-800 items-center text-center w-96 shadow-4xl mt-8 bg-blue-200">
            <div className="underline bg-red-200 py-4">
              <h5>{this.state.hobby.name} Session Details </h5>
              <h1 className="text-2xl">
                Session Nickname: {this.state.session.nickName}
              </h1>
            </div>
            <div className="underline bg-blue-200 py-4">
              <h5>Duration</h5>
              <h1 className="text-2xl">
                {this.state.session.duration} minutes
              </h1>
            </div>
            <div className="sessionGoals py-4 h-28 bg-gray-50 shadow-xl">
              <div className="">
                <h3 className="text-lg underline " >Session Goals:</h3>
              </div>
              <div>
                <p className="text-2xl" >{this.state.session.sessionGoals}</p>
              </div>
            </div>
            <div className="bg-red-200 py-6">
              <h3>Challenge Level</h3>
              <div className="font-bold text-4xl text-blue-600">
                <p>{this.state.session.challengeLevel}</p>
              </div>
            </div>
            <div className="bg-gray-50 h-28 py-4">
              <h3>Notes</h3>
              <div>
                <p>{this.state.session.notes}</p>
              </div>
            </div>
            <div className="my-4 flex justify-around bg-blue-200">
              <button
                className="px-4 py-2 bg-green-400 hover:bg-green-100 w-full mx-1"
                onClick={() => this.openEditSessionModal()}
              >
                Edit Session
              </button>
              <button onClick={() => this.props.history.goBack()} className="px-4 py-2 bg-red-400 hover:bg-red-100 w-full mx-1">Back to Hobbies</button>

            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalOneIsOpen}
          style={{
            content: {
              width: "500px",
              margin: "auto",
            },
          }}
        >
          <EditSessionFormHook
            sessionInfo={this.state.session}
            fetchSessionInfo={this.fetchSessionInfo}
            deleteSession={this.deleteSession}
            closeEditSessionModal={this.closeEditSessionModal}
          />
        </Modal>
      </>
    );
  }
}

export default SessionShowPage;
