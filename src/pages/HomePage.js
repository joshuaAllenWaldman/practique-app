import React from 'react'
import { Link } from 'react-router-dom'
import HobbyIndex from '../components/hobbyComponents/HobbyIndex'
import SessionPreview from '../components/sessionComponents/SessionPreview'

class HomePage extends React.Component {
  state = {
    user: {},
    hobbies: [],
    sessions: [],
    currentHobby: {}
  }

  
  
  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/users/`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((jsonData) => this.setState({user: jsonData}))
      .catch((err) => console.log(err))
    
    fetch(`http://localhost:4000/api/v1/hobbies/`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((jsonData) => {
        this.setState({
          hobbies: jsonData,
          currentHobby: jsonData[0]
        })
      })
      .catch((err) => console.log(err))
  }

  

  updateCurrentHobby = (hobby) => {    
    this.setState({
      currentHobby: hobby
    })
  }

  // bg-blue-600 p-3 rounded min-w-500 min-h-screen flex justify-center
  render () {
  return (
    <div className="container min-h-screen items-center">
        <div className="grid grid-cols-2 gap-2">

          <div className="ml-2">
            <div className="card bg-blue-800 rounded text-white flex flex-col items-center min-h-screen">
              <div className="heading">
                <h1 className="text-4xl hover:bg-green underline">Hobbies</h1>
              </div>
              <HobbyIndex 
                hobbies={this.state.hobbies}
                updateCurrentHobby={this.updateCurrentHobby}
              />

            </div>
          </div>

          <div className="">
            <div className="bg-blue-800 rounded text-white flex flex-col items-center min-h-screen">
              <div className="heading py-1 ">
                <Link to={`/hobbies/${this.state.currentHobby._id}`} >
                  <h1 className="text-4xl hover:bg-green underline">{this.state.currentHobby.name}</h1>
                </Link>
              </div>
              <div className="subheading">
                <p className="items-center" >Latest Sessions:</p>

              </div>

              <div className="max-w-sm" >
                <SessionPreview hobby={this.state.currentHobby}/>
              </div>
              <div className="bg-white text-black px-4 py-2 hover:bg-red-400" >
                <Link to={`/hobbies/${this.state.currentHobby._id}`} >
                  View All Sessions
                </Link>
              </div>
            </div>
          </div>
      </div>


    </div>
  )
  }
}

export default HomePage;