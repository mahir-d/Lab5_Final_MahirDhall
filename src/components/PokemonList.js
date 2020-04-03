import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const PokemonList = (props) => {

    const [pageDetails, setPageDetails] = useState(undefined);
    

    useEffect(() => {

        
        async function fetchData() {
            try {
                const { data: deets } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${props.match.params.page * 20}}`);
                setPageDetails(deets);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();


    }, [props.match.params.page]);

    //if page does not exists
    if (pageDetails && props.match.params.page > pageDetails.count / 20) { 
        return <Redirect to='/notfound'/>
    }

    let prevLink = null;
    if (pageDetails && pageDetails.previous) { 
        let curr = parseInt(props.match.params.page) - 1;
        prevLink = <Link to={`/pokemon/page/${curr}`}>Previous</Link>
    }
    let nextLink = null;
    if (pageDetails && pageDetails.next) { 
        let curr = parseInt(props.match.params.page) + 1;
        nextLink = <Link to={`/pokemon/page/${curr}`}>Next</Link>
    }

    return (
        <div className='App-body'>
            
            {prevLink} {nextLink}

            <ul>
                {pageDetails && pageDetails.results.map((pokemon) => { 
                    return <li key={pokemon.name}>
                        <Link className='showLink' to={`/pokemon/${pokemon.name}`}>
                            {pokemon.name}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    );



}

export default PokemonList;