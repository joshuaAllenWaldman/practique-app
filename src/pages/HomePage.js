import React from "react";
import { Link } from "react-router-dom";
import HobbyIndex from "../components/hobbyComponents/HobbyIndex";
import SessionPreview from "../components/sessionComponents/SessionPreview";
import GlobalStatBar from '../components/hobbyComponents/GlobalStatBar'

class HomePage extends React.Component {
  sessionContainer = React.createRef();
  state = {
    user: {},
    hobbies: [],
    sessions: [],
    currentHobby: undefined,
  };

  fetchAllSessions = () => {
    const sessionsArr = [];
    this.state.hobbies.map((hobby) => {
      fetch(`http://localhost:4000/api/v1/hobbies/${hobby._id}/sessions`, {
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((jsonData) => {
          jsonData.map((obj) => {
            sessionsArr.push(obj)
          })
        })
        .catch((err) => console.log(err));
    })
    this.setState({sessions: sessionsArr})
    console.log('Fetch All Sessions - ', sessionsArr)
  }



  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/users/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jsonData) => this.setState({ user: jsonData }))
      .catch((err) => console.log(err));

    fetch(`http://localhost:4000/api/v1/hobbies/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jsonData) => {
        this.setState({
          hobbies: jsonData,
          currentHobby: jsonData[0],
        });
      })
      .catch((err) => console.log(err));
    
  }

  updateCurrentHobby = (hobby) => {
    this.setState({
      currentHobby: hobby,
    });
  };

  
  render() {
    
    return (
      <div className="container">
        <div className="w-screen flex justify-center">
          <div className="bg-darkBlue w-2/5 max-w-2/3 mt-2 text-center rounded border-4 border-pumpkin">
            <h1 className="text-lightPink py-2 text-6xl" style={{fontFamily: 'Karla'}}>
              Welcome, {this.state.user.username}!

            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 w-screen mt-4">

          <div className="hobbyCol py-2 px-2 ml-8 overflow-auto border-4 border-pumpkin bg-darkBlue">
            <div className="py-2 px-2 flex flex-col items-center ">
              <div className="heading px-24 py-6 shadow-1 bg-lightPink shadow-xl mb-2 rounded">
                <h1 className="text-4xl text-darkBlue hover:bg-green underline">
                  Hobbies:
                </h1>
              </div>
              <HobbyIndex
                hobbies={this.state.hobbies}
                updateCurrentHobby={this.updateCurrentHobby}
                history={this.props.history}
                onClick={() => this.sessionContainer.current.scrollIntoView()}
              />
            </div>
          </div>

          {this.state.currentHobby && <div ref={this.sessionContainer} className="sessionCol border-4 border-pumpkin py-2 px-2 mr-8 overflow-auto bg-darkBlue">
            <div className="min-h-full flex flex-col justify-start py-2 px-2 items-center">
              <div className="heading px-16 py-4 bg-lightPink shadow-xl hover:bg-lightBlue flex flex-col justify-center items-center mb-2 transform transition rounded hover:scale-110 overflow-hidden">
                <Link
                  to={`/hobbies/${this.state.currentHobby._id}`}
                  className=""
                >
                  <h1 className="text-4xl text-darkBlue hover:bg-lightBlue underline">
                    {this.state.currentHobby.name}
                  </h1>
                </Link>
                <div className="subheading">
                  <p className="items-center">Latest Sessions:</p>
                </div>
              </div>
              
              <SessionPreview hobby={this.state.currentHobby} />

              {/* <div className="bg-lightPink text-darkBlue px-8 py-2 hover:bg-lightBlue shadow-xl my-4 transform transition rounded hover:scale-110 overflow-hidden">
                <Link to={`/hobbies/${this.state.currentHobby._id}`}>
                  View All Sessions
                </Link>
              </div> */}
            </div>
          </div>}
        </div>
      </div>
    );
  }
}

export default HomePage;
