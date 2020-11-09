import Narrative from './narrative/Narrative';
import Interactive from './interactive/Interactive';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Narrative}/>
        <Route exact path='/interactive' component={Interactive}/>
      </Switch>
    </div>
  );
}

export default App;
