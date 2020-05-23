import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'
import Auth from './components/Auth'
import Users from './components/Users'



function App() {
  return (
    <div className="App"
    >
      <Router>
        <Switch>    
          <Route exact path='/' component={Auth}/>
          <Route exact path='/users' component={Users}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
