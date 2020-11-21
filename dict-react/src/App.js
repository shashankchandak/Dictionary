import React from 'react';
import './App.css';
import LoginComponent from './components/loginComponent';
import HomeComponent from './components/homeComponent';
import WordListComponent from './components/wordListComponent';
import WordDescriptionComponent from './components/wordDescriptionComponent';
import AddNewWordComponent from './components/addNewWordComponent';
import Temp from './services/temp';
import SignupComponent from './components/SignupComponent';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//App.js is the entry point of application and consists of all routing logic
function App() {



  return (

    <Router>
      <div>
        <nav/>
        <Switch>
          <Route exact path="/" component={LoginComponent}></Route>
          <Route exact path="/signup" component={SignupComponent}></Route>
          <Route exact path="/addNewWord" component={AddNewWordComponent}></Route>
          <Route exact path="/meaning" component={WordDescriptionComponent}></Route> 
          <Route exact path="/displayWords" component={WordListComponent}></Route> 4
          <Route exact path="/home" component={HomeComponent}></Route>                 
        </Switch>
      </div>

    </Router>
  );
}

export default App;
