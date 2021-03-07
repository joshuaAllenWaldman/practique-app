import { Link, Redirect } from 'react-router-dom';
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
      <div className="flex justify-around">
          <Link to="/home" ><span className="bg-blue-500 hover:bg-red-400 text-white py-2 px-4 mr-2" >Home</span></Link> {" "}
          <Link to="/add-hobby" ><span className="bg-blue-500 hover:bg-red-400 text-white py-2 px-4 mr-2" >Add New Hobby</span></Link> {" "}
          <Link to="/signup" ><span className="bg-blue-500 hover:bg-red-400 text-white py-2 px-4 mr-2" >SignUp</span></Link> {" "}
          <Link to="/login" ><span className="bg-blue-500 hover:bg-red-400 text-white py-2 px-4 mr-2" >Login</span></Link>
          <Link exact to="/" ><span onClick={() => {this.logout()}} className="bg-blue-500 hover:bg-red-400 text-white py-2 px-4 " >Logout</span></Link>
        </div>
    )

  }
}

export default NavBar;