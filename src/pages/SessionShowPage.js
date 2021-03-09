import React from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

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
          <div className="w-2/4 shadow-4xl mt-8 bg-darkBlue ">
            <div className="flex flex-col justify-center items-center bg-lightBlue m-8 overflow-hidden">
              <div className="py-4 w-full flex flex-col justify-center items-center transform transition rounded hover:scale-110 hover:bg-lightPink">
                <h5 className="text-2xl">{this.state.hobby.name} Session Details </h5>
                <h1 className="text-lg">
                  {this.state.session.nickName}
                </h1>
              </div>
              <div className="py-4 my-2 w-full flex flex-col justify-center items-center transform transition rounded hover:scale-110 hover:bg-lightPink">
                <h5>Duration</h5>
                <h1 className="text-2xl">
                  {this.state.session.duration} minutes
                </h1>
              </div>
              <div className="sessionGoals py-4 my-2 w-full flex flex-col justify-center items-center transform transition rounded hover:scale-110 hover:bg-lightPink">
                <div className="">
                  <h3 className="text-lg underline ">Session Goals:</h3>
                </div>
                <div>
                  <p className="text-2xl">{this.state.session.sessionGoals}</p>
                </div>
              </div>
              <div className=" w-full my-2 py-4 flex flex-col justify-center items-center transform transition rounded hover:scale-110 hover:bg-lightPink">
                <h3>Challenge Level</h3>
                <div className="font-bold text-4xl text-blue-600">
                  <p>{this.state.session.challengeLevel}</p>
                </div>
              </div>
              <div className=" py-4 my-2 w-full flex flex-col justify-center items-center transform transition rounded hover:scale-110 hover:bg-lightPink">
                <h3>Notes</h3>
                <div>
                  <p>{this.state.session.notes}</p>
                </div>
              </div>
              <div className="my-4 flex justify-around w-full overflow-hidden">
                <button
                  className="px-4 py-4 w-full bg-green-400 hover:bg-green-100 mx-1 transform transition rounded hover:scale-110"
                  onClick={() => this.openEditSessionModal()}
                >
                  Edit Session
                </button>
                <button
                  onClick={() => this.props.history.goBack()}
                  className="px-4 py-4 bg-red-400 hover:bg-red-100 w-full mx-1 transform transition rounded hover:scale-110"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalOneIsOpen}
          onRequestClose={this.closeEditSessionModal}
          style={{
          content: {
            width: "500px",
            margin: "auto",
            background: "#f6d7c3",
            border: "none",
            overflow: "scroll",
            height: "80%"
          },
          overlay: {
            backgroundColor: "rgba(48, 82, 91, 0.75)",
          }
        }}
        >
          <EditSessionFormHook
            sessionInfo={this.state.session}
            onEdit ={() => {
              this.fetchSessionInfo()
              this.closeEditSessionModal()
            }
            }
            deleteSession={this.deleteSession}
          />
        </Modal>
      </>
    );
  }
}

export default SessionShowPage;
