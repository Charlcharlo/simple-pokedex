import { ClickAwayListener } from '@mui/base';
import { Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import Results from './Results';
import {buildTree, search } from '../functions/trie'

export default function SearchBar() {
    const [focus, setFocus] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResult] = useState([]);
    const [keys, setKeys] = useState([]);

    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((data) => {
        const { results } = data;
        setKeys(results);
    })
    .then(buildTree(keys));

    const showResults = () => {
        setFocus(true);
    };

    const hideResults = () => {
        setFocus(false);
    }

    // buildTree(testDex);

    useEffect(() => {
        const result = search(query);
        setResult(result)
    },
    [query]);

    // const query = "p";

    // console.log(result);

    return (
        <div>
            <ClickAwayListener onClickAway={hideResults}>
                <div className="search-block">
                <input 
                    onFocus={showResults}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    className="search-bar"
                    type="text"
                    placeholder="Type here to start searching"
                />
                <Collapse in={focus}>
                    <Results
                        list={results}
                    />
                </Collapse>
                </div>
            </ClickAwayListener>
        </div>
    )
}