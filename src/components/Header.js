import NavBar from './NavBar'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-blue-400 text-white py-6 px-4 flex justify-between" >
      <Link exact to="/"><h1 className="text-4xl" >Practíque</h1></Link>
  
      <NavBar />
    </header>
  )
}

export default Header;