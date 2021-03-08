import React from "react";
import { Link } from "react-router-dom";
import HobbyIndex from "../components/hobbyComponents/HobbyIndex";
import SessionPreview from "../components/sessionComponents/SessionPreview";

class HomePage extends React.Component {
  state = {
    user: {},
    hobbies: [],
    sessions: [],
    currentHobby: {},
  };

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

  // bg-blue-600 p-3 rounded min-w-500 min-h-screen flex justify-center
  render() {
    return (
      <div className="container min-h-screen">
        <div className="grid grid-cols-2 gap-2 w-screen mt-4">
          <div className="hobbyCol py-2 px-2 ml-4 overflow-auto border-8 border-blue-800">
            <div className="py-2 px-2 flex flex-col items-center h-sm ">
              <div className="heading border-2 border-black px-24 py-6 shadow-1 bg-white shadow-xl ">
                <h1 className="text-4xl hover:bg-green underline">Hobbies</h1>
              </div>
              <HobbyIndex
                hobbies={this.state.hobbies}
                updateCurrentHobby={this.updateCurrentHobby}
              />
            </div>
          </div>

          <div className="sessionCol border-8 border-blue-800 py-2 px-2 mr-4 overflow-auto">
            <div className="min-h-full flex flex-col justify-start py-2 px-2 items-center">
              <div className="heading py-1 heading border-2 border-black px-16 py-4 bg-white shadow-xl hover:bg-red-400 flex flex-col justify-center items-center">
                <Link to={`/hobbies/${this.state.currentHobby._id}`}>
                  <h1 className="text-4xl hover:bg-green underline">
                    {this.state.currentHobby.name}
                  </h1>
                </Link>
                <div className="subheading">
                  <p className="items-center">Latest Sessions:</p>
                </div>
              </div>

              <SessionPreview hobby={this.state.currentHobby} />

              <div className="bg-white text-black px-8 py-2 hover:bg-red-400 border-2 border-black shadow-xl">
                <Link to={`/hobbies/${this.state.currentHobby._id}`}>
                  View All Sessions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
