import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const MachinesList = (props) => {

    const [pageDetails, setPageDetails] = useState(undefined);


    useEffect(() => {


        async function fetchData() {
            try {
                const { data: deets } = await axios.get(`https://pokeapi.co/api/v2/machine/?limit=20&offset=${props.match.params.page * 20}}`);
                setPageDetails(deets);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();


    }, [props.match.params.page]);

    //if page does not exists
    if (pageDetails && props.match.params.page > pageDetails.count / 20) {
        return <Redirect to='/notfound' />
    }

    let prevLink = null;
    if (pageDetails && pageDetails.previous) {
        let curr = parseInt(props.match.params.page) - 1;
        console.log(parseInt("123/"));
        prevLink = <Link to={`/machines/page/${curr}`}>Previous</Link>
    }
    let nextLink = null;
    if (pageDetails && pageDetails.next) {
        let curr = parseInt(props.match.params.page) + 1;
        nextLink = <Link to={`/machines/page/${curr}`}>Next</Link>
    }


    function urlSub(pokemon) {
        let s = pokemon.url;
        s = s.substring(34)
        return parseInt(s);
    }

    if (pageDetails) {
        return (
            <div className='App-body'>

                {prevLink} {nextLink}

                <ul>
                    {pageDetails && pageDetails.results.map((pokemon) => {
                        return <li key={pokemon.url}>
                            <Link className='showLink' to={`/machines/${urlSub(pokemon)}`}>
                                {urlSub(pokemon)}
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
                <h1 className='cap-first-letter'>Populating Machine List...</h1>
            </div>
        )
    }




}

export default MachinesList;