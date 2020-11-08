import Main from '../components/main/Main';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Main}/>
      </Switch>
    </div>
  );
}

export default App;
