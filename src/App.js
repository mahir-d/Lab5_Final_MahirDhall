import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import Pokemon from './components/Pokemon';
import BerriesList from './components/BerriesList';
import Error from './components/Error';
import Berries from './components/Berries';
import MachinesList from './components/MachinesList';
import Machines from './components/Machines';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <div className='App'>








        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/pokemon/page/:page' component={PokemonList} />
          <Route exact path='/berries/page/:page' component={BerriesList} />
          <Route exact path='/machines/page/:page' component={MachinesList} />
          <Route exact path='/pokemon/:id' component={Pokemon} />
          <Route exact path='/berries/:id' component={Berries} />
          <Route exact path='/machines/:id' component={Machines} />
          <Route exact path='/notfound' component={Error} />
          <Route path="*" component={Error} status={404} />
        </Switch>





      </div>

    </Router>
  );
}

export default App;
