import React, { useEffect, useState } from 'react';
import axios from 'axios';
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


    },[props.match.params.id]);

    
    
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

            <div className='show-body'>



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