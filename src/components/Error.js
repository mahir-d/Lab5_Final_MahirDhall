import React from 'react'
import logo from '../img/pika.png';
import { Link } from 'react-router-dom';
import '../App.css';
const Error = () => {

    return (<div className='App'>
        <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to your pokedex</h1>

            <Link className='showlink' to='/pokemon/page/0'>Pokemon</Link>
            <Link className='showlink' to='/berries/page/0'>Berries</Link>
            <Link className='showlink' to='/machines/page/0'>Machines</Link>


        </header>
        <h1 className='cap-first-letter'>404 Page not found</h1>
    </div>);

}
export default Error;