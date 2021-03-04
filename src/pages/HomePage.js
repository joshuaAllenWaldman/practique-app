import React from 'react'
import HobbyIndex from '../components/hobbyComponents/HobbyIndex'

class HomePage extends React.Component {
  state = {
    user: {},
    hobbies: [],
    sessions: []
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
        this.setState({hobbies: jsonData})
      })
      .catch((err) => console.log(err))
  }


  render () {
    console.log(this.state.hobbies)
    console.log(this.state.user)
  return (
    <div>
      <h1>Welcome Home, {this.state.user.name}</h1>
      <div className="hobbyIndex">
        <HobbyIndex hobbies={this.state.hobbies}/>
        
      </div>


    </div>
  )
  }
}

export default HomePage;