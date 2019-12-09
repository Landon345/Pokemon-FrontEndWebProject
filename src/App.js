import React from 'react';
import './App.css';
import Pokemon from './Pokemon';
import itemDetail from './itemDetail';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {

  //use react-router-dom to change urls
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path="/" exact component = {Pokemon}/>
          <Route path="/:id" exact component ={itemDetail}/> 
          
        </Switch>
    </div>
    </Router>
  );
}

export default App;
