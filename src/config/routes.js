import { Route, Switch } from 'react-router-dom'

//Pages.
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import HobbyPage from '../pages/HobbyPage';

//Forms. May convert to components later.
import SignupForm from '../components/userForms/SignupForm'
import NewHobbyForm from '../components/hobbyForms/NewHobbyForm';
import LoginForm from '../components/userForms/LoginForm'
import NewSessionForm from '../components/sessionForms/NewSessionForm'


const routes = (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={HomePage} />
      <Route path='/hobbies/:id' component={HobbyPage} />
      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignupForm} />
      <Route path='/add-hobby' component={NewHobbyForm} />
      <Route path='/hobbies/:id/add-session' component={NewSessionForm} />

    </Switch>
  )


export default routes;