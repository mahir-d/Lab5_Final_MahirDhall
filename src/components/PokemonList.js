import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import logo from '../img/pika.png';
import '../App.css'

const PokemonList = (props) => {

    const [pageDetails, setPageDetails] = useState(undefined);
    const [error, setError] = useState(undefined);


    useEffect(() => {


        async function fetchData() {
            try {

                
                if (isNaN(props.match.params.page)) { 
                    throw new Error('parameter page is not a number')
                }
                const { data: deets } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${props.match.params.page * 20}}`);
                setPageDetails(deets);
            } catch (e) {
                setError(1);
                console.log(e);
            }
        }

        fetchData();


    }, [props.match.params.page]);

    //if page does not exists
    if (pageDetails && props.match.params.page > pageDetails.count / 20) {
        return <Redirect to='/notfound' />
    }
    else if (error) { 
        return <Redirect to='/notfound' />
    }

    let prevLink = null;
    if (pageDetails && pageDetails.previous) {
        let curr = parseInt(props.match.params.page) - 1;
        console.log(parseInt("123/"));
        prevLink = <Link to={`/pokemon/page/${curr}`}>Previous</Link>
    }
    let nextLink = null;
    if (pageDetails && pageDetails.next) {
        let curr = parseInt(props.match.params.page) + 1;
        nextLink = <Link to={`/pokemon/page/${curr}`}>Next</Link>
    }

    
    function urlSub(pokemon) {
        let s = pokemon.url;
        s = s.substring(34)
        return parseInt(s);
    }

    if (pageDetails) {
        return (
            <div className='App-body'>

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

                {prevLink} {nextLink}

                <ul>
                    {pageDetails && pageDetails.results.map((pokemon) => {
                        return <li key={pokemon.name}>
                            <Link className='showLink' to={`/pokemon/${urlSub(pokemon)}`}>
                                {pokemon.name}
                            </Link>
                        </li>
                    })}
                </ul>

            </div>
        );

    }
    else {
        return (
            <div className='show-body'>
                <h1 className='cap-first-letter'>Populating Pokemon List...</h1>
            </div>
        )
    }




}

export default PokemonList;