import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';
import noImage from '../img/download.jpeg';


let li = null;


const Machines = (props) => {

    const [pokeData, setPokeData] = useState(undefined);

    useEffect(() => {

        async function fetchData() {
            try {
                const { data: poke } = await axios.get(`https://pokeapi.co/api/v2/machine/${props.match.params.id}/`);
                setPokeData(poke);
                console.log(poke);
            } catch (e) {
                console.log(e);
            }




        }

        fetchData();


    }, [props.match.params.id]);

    // if (pokeData && isNaN(pokeData)) {
    //     return <Redirect to='/notfound' />;
    // }

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

            <div className='show-body'>



                <h1 className='cap-first-letter'>{pokeData && pokeData.id}</h1>
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
                <h1 className='cap-first-letter'>Loading Pokemon....</h1>
            </div>
        )
    }

}
export default Machines;