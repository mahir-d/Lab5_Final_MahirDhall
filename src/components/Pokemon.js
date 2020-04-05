import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../img/pika.png';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import noImage from '../img/download.jpeg';


let li = null;
let img = null;

const Pokemon = (props) => {

    const [pokeData, setPokeData] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {

        async function fetchData() {
            try {
                const { data: poke } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}/`);
                setPokeData(poke);
                console.log(poke);
            } catch (e) {
                setError(1);
                console.log(e);
            }




        }

        fetchData();


    }, [props.match.params.id]);



    const buildPokeDetails = (pokeData) => {
        if (pokeData && pokeData.sprites.front_default) {
            img = <img alt={pokeData.name} src={pokeData.sprites.front_default} />
        }
        else {
            img = <img alt='Show' src={noImage} />;
        }
        return (
            <li>
                <label>
                    Name: {pokeData.name}
                </label>

            </li>
        );
    }
    if (error && !pokeData) {
        return <Redirect to='/notfound' />
    }

    if (pokeData) {
        li = buildPokeDetails(pokeData);
        return (
            
                <div className='Appbody'>
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
                        {img}
                        <br />
                        <p>
                            <span className='title'>Height: </span>
                            {pokeData && pokeData.height}
                            <br />
                            <span className='title'>Weight:</span> {pokeData && pokeData.weight} <br />
                            <span className='title'>Moves:</span>
                            <br />
                        </p>
                        <dl className='list-unstyled'>
                            {pokeData && pokeData.moves.map((moves) => {
                                return <dt key={moves.move}>{moves.move.name}</dt>
                            })}
                        </dl>
                        <br />


                   
                </div>
            
        );
    }
    else {
        return (
            <div className='show-body'>
                <h1 className='cap-first-letter'>Loading Pokemon....</h1>
            </div>
        )
    }

}
export default Pokemon;