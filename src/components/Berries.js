import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import noImage from '../img/download.jpeg';


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

            <div className='show-body'>



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
                        return <dt key={flavors.flavor}>{flavors.flavor.name}</dt>
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
export default Berries;