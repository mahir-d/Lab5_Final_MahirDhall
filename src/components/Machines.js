import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import logo from '../img/pika.png';


let li = null;


const Machines = (props) => {

    const [pokeData, setPokeData] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {

        async function fetchData() {
            try {
                const { data: poke } = await axios.get(`https://pokeapi.co/api/v2/machine/${props.match.params.id}/`);
                setPokeData(poke);
                console.log(poke);
            } catch (e) {
                setError(1);
                console.log(e);
            }




        }

        fetchData();


    }, [props.match.params.id]);

    if (error && !pokeData) {
        return <Redirect to='/notfound' />;
    }

    const buildPokeDetails = (pokeData) => {

        return (
            <li>
                <label>
                    ID: {pokeData.id}
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



                <h1 className='cap-first-letter'>Machine: {pokeData && pokeData.id}</h1>
                <br />
                <p>
                    <span className='title'>Item: </span>
                    <label>
                        {pokeData && pokeData.item.name}
                    </label>
                    <br />
                    <br />
                    <span className='title'>Move: </span>
                    <label>
                        {pokeData && pokeData.move.name}
                    </label>
                    <br />
                    <br />
                    <span className='title'>Version-Group: </span>
                    <label>
                        {pokeData && pokeData.version_group.name}
                    </label>
                    <br />
                </p>
               
                


            </div>
        );
    }
    else {
        return (
            <div className='show-body'>
                <h1 className='cap-first-letter'>Loading Machine....</h1>
            </div>
        )
    }

}
export default Machines;