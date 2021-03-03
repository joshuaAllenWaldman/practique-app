import { Route, Switch } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage'
import LoginForm from '../components/userForms/LoginForm'
import SignupForm from '../components/userForms/SignupForm'

const routes = (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={HomePage} />
      <Route path='/login' component={LoginForm} />
      <Route path='/signup' component={SignupForm} />
    </Switch>
  )


export default routes;