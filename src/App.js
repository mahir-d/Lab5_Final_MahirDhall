import React from 'react';
import logo from './img/pika.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import Pokemon from './components/Pokemon';
import BerriesList from './components/BerriesList';
import Error from './components/Error';
import Berries from './components/Berries';


function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to your pokedex</h1>
          
          <Link className='showlink' to='/pokemon/page/0'>Pokemon</Link>
          <Link className='showlink' to='/berries/page/0'>Berries</Link>
          <Link className='showlink' to='/machines/page/0'>Machines</Link>
          

        </header>

        <br />
        <br />

        <div className='App-body'>
          
          <p>The first link is a complete list of all 890 species of Pokémon currently known to exist</p>
          <p>The second link is a complete list of all available berries that help your Pokemon grow and improve its powers</p>
          <p>The third link is a complete list of all available machines that you as a pokemon trainer can buy to train your Pokemon</p>

          
          <Route path='/pokemon/page/:page' exact component={PokemonList} />
          <Route path='/berries/page/:page' exact component={BerriesList} />
          <Route path='/pokemon/:id' exact component={Pokemon} />
          <Route path='/berries/:id' exact component={Berries} />
          <Route path='/notfound' exact component={Error} />
          
          

        </div>

      </div>

    </Router>
  );
}

export default App;
