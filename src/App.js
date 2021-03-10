import "./index.css";
import Header from "./components/Header";

import "./style/main.css";

import { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

//Pages.
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import HobbyPage from "./pages/HobbyPage";
import SessionShowPage from "./pages/SessionShowPage";

//Forms. May convert to components later.
import SignupForm from "./components/userForms/SignupForm";
import NewHobbyFormHook from "./components/hobbyForms/NewHobbyFormHook";
import LoginForm from "./components/userForms/LoginForm";
import NewSessionFormHook from "./components/sessionForms/NewSessionFormHook";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const initalPathName = useRef(window.location.pathname);

  let history = useHistory()

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/hobbies/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((jsonData) => {
        setIsLoggedIn(true);
        history.push(initalPathName.current)
      })
      .catch((err) => {
        console.log(err)
        setIsLoggedIn(false)
      });
  }, [])

  
  return (
    <div className="bg-lightPink" style={{ minHeight: "100vh", }}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Switch>
        
        {isLoggedIn && <Route path="/home" component={HomePage} />}

        {isLoggedIn && <Route
          exact
          path="/hobbies/:id/add-session"
          component={NewSessionFormHook}
        />}

        {isLoggedIn && <Route
          exact
          path="/hobbies/:id/session/:seshId"
          component={SessionShowPage}
        />}

        {isLoggedIn && <Route path="/hobbies/:id" component={HobbyPage} />}
        <Route
          path="/login"
          render={(props) => <LoginForm setIsLoggedIn={setIsLoggedIn} {...props}/> }
        />

        <Route 
          path="/signup" 
          render={(props) => <SignupForm setIsLoggedIn={setIsLoggedIn} {...props}/> }/>

        {isLoggedIn && <Route path="/add-hobby" component={NewHobbyFormHook} />}
        
        <Route exact path="/"
        render={(props) => <LandingPage isLoggedIn={isLoggedIn} {...props}/> }/>
        <Route path="/" render={() => <Redirect to="/"/>} />
      </Switch>

    </div>
  );
}


export default App;
