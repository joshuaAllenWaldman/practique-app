import NavBar from './NavBar'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className="bg-darkBlue text-lightPink h-16 px-4 flex justify-between items-center" >
      <Link exact to="/"><h1 className="text-4xl" style={{fontFamily: 'Karla'}}>Practíque</h1></Link>
  
      <NavBar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
    </header>
  )
}

export default Header;