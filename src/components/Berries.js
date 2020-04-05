import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import logo from '../img/pika.png';


let li = null;


const Berries = (props) => {

    const [pokeData, setPokeData] = useState(undefined);
    const [error, setError] = useState(undefined);
    useEffect(() => {

        async function fetchData() {
            try {
                const { data: poke } = await axios.get(`https://pokeapi.co/api/v2/berry/${props.match.params.id}/`);
                setPokeData(poke);
                
            } catch (e) {
                setError(1);
                console.log(e);
            }




        }

        fetchData();


    }, [props.match.params.id]);

    if (error && !pokeData) {
        return <Redirect to='/notfound' />
    }

    const buildPokeDetails = (pokeData) => {
        
        return (
            <li>
                <label>
                    Name: {pokeData.name}
                </label>

            </li>
        );
    }

    if (pokeData) {
        li = buildPokeDetails(pokeData);
        return (

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
                <p>The first link is a complete list of all 890 species of Pokémon currently known to exist</p>
                <p>The second link is a complete list of all available berries that help your Pokemon grow and improve its powers</p>
                <p>The third link is a complete list of all available machines that you as a pokemon trainer can buy to train your Pokemon</p>



                <h1 className='cap-first-letter'>{pokeData && pokeData.name}</h1>

                <br />
                <p>
                    <span className='title'>Growth Time: </span>
                    {pokeData && pokeData.growth_time}
                    <br />
                    <span className='title'>Size:</span> {pokeData && pokeData.size} <br />
                    <span className='title'>Smoothness:</span> {pokeData && pokeData.smoothness} <br />
                    <span className='title'>flavors:</span>
                    <br />
                </p>
                <dl className='list-unstyled'>
                    {pokeData && pokeData.flavors.map((flavors) => {
                        return <dt key={flavors.flavor.name}>{flavors.flavor.name}</dt>
                    })}
                </dl>
                <br />


            </div>
        );
    }
    else {
        return (
            <div className='show-body'>
                <h1 className='cap-first-letter'>Loading Berries....</h1>
            </div>
        )
    }

}
export default Berries;