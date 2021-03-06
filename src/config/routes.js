import { Route, Switch } from 'react-router-dom'

//Pages.
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import HobbyPage from '../pages/HobbyPage';
import SessionShowPage from '../pages/SessionShowPage';

//Forms. May convert to components later.
import SignupForm from '../components/userForms/SignupForm'
import NewHobbyFormHook from '../components/hobbyForms/NewHobbyFormHook';
import LoginForm from '../components/userForms/LoginForm'
import NewSessionFormHook from '../components/sessionForms/NewSessionFormHook'



const routes = (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={HomePage} />
      
      <Route exact path='/hobbies/:id/add-session' component={ NewSessionFormHook } />
      <Route exact path='/hobbies/:id/session/:seshId' component={ SessionShowPage } />
      <Route path='/hobbies/:id' component={HobbyPage} />

      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignupForm} />
      <Route path='/add-hobby' component={NewHobbyFormHook} />
    </Switch>
  )


export default routes;