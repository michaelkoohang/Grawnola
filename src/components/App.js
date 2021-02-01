import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Narrative from './narrative/Narrative';
import Interactive from './interactive/Interactive';
import Team from './team/Team';
import References from './references/References';
import Footer from "./footer/Footer";
import './App.css';


function App() {

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Narrative}/>
        <Route exact path='/interactive' component={Interactive}/>
        <Route exact path='/team' component={Team}/>
        <Route exact path='/references' component={References}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
