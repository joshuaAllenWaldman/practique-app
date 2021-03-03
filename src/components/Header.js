import NavBar from './NavBar'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header" >
      <Link exact to="/"><h1>Practíque</h1></Link>
      
      <NavBar />
    </header>
  )
}

export default Header;