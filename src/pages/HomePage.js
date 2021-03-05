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


  render () {
  return (
    <div className="homepage-container">
      <h1>Welcome Home,    {this.state.user.name}!</h1>
        <div className="homepage-row row">
          <div className="hobbyIndex">
            <HobbyIndex 
              hobbies={this.state.hobbies}
              updateCurrentHobby={this.updateCurrentHobby}
            />
        
          </div>
          <div className="sessionPreview">
            <Link to={`/hobbies/${this.state.currentHobby._id}`} >
              <h1>{this.state.currentHobby.name}</h1>
            </Link>
              <SessionPreview hobby={this.state.currentHobby}/>
          </div>
      </div>


    </div>
  )
  }
}

export default HomePage;