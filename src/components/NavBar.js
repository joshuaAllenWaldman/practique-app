import { Link } from 'react-router-dom';
import React from 'react';


class NavBar extends React.Component {


  logout = () => {
    fetch('http://localhost:4000/api/v1/users/logout', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json)
      .then((jsonData) => console.log(jsonData))
  }
  render() {
    
    return (
      <div className="flex justify-around items-center min-h-full ">
          {this.props.isLoggedIn && <Link to="/home" className="transform transition hover:scale-110 mx-1" ><span className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 mr-1 rounded hover:text-white" >Home</span></Link>}
          {this.props.isLoggedIn && <Link to="/add-hobby" className="transform transition hover:scale-110 mx-1"><span className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 mr-1 rounded hover:text-white" >Add New Hobby</span></Link>}
          {!this.props.isLoggedIn && <Link to="/signup" className="transform transition hover:scale-110 mx-1"><span className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 mr-1 rounded hover:text-white" >SignUp</span></Link>}
          {!this.props.isLoggedIn && <Link to="/login" className="transform transition hover:scale-110 mx-1"><span className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 mr-1 rounded hover:text-white" >Login</span></Link>}
          {this.props.isLoggedIn && <Link exact to="/" 
            className="transform transition hover:scale-110 mx-1">
            <span onClick={() => {
              this.logout()
              this.props.setIsLoggedIn(false)
              }} className="bg-lightPink hover:bg-lightBlue text-darkBlue py-2 px-4 rounded hover:text-white" >Logout</span>
            </Link>}
        </div>
    )

  }
}

export default NavBar;