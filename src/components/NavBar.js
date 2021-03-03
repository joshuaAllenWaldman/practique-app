import {Link} from 'react-router-dom';


const NavBar = () => {
  return (
    <nav>
        <Link to="/signup" >SignUp</Link> {" "}
        <Link to="/login" >Login</Link>
      </nav>
  )
}

export default NavBar;