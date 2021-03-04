import {Link} from 'react-router-dom';


const NavBar = () => {
  return (
    <nav>
        <Link to="/home" >Home</Link> {" "}
        <Link to="/add-hobby" >Add New Hobby</Link> {" "}
        <Link to="/signup" >SignUp</Link> {" "}
        <Link to="/login" >Login</Link>
      </nav>
  )
}

export default NavBar;