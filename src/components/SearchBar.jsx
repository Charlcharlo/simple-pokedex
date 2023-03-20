import { ClickAwayListener } from '@mui/base';
import { Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import Results from './Results';
import {buildTree, search } from '../functions/trie';

export default function SearchBar({createEntry, setReady}) {
    const [focus, setFocus] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResult] = useState([]);
    const [keys, setKeys] = useState([]);

    //Create Trie

    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((data) => {
        const { results } = data;
        setKeys(results);
    })
    .then(
        buildTree(keys)
    );

    // useEffect(() => {

    // },
    // [keys]);

    function showResults() {
        setFocus(true);
    };

    function hideResults() {
        setFocus(false);
    }

    //Update List

    useEffect(() => {
        const result = search(query);
        setResult(result)
    },
    [query]);

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
                    <div className="results-container">
                        <Results
                            createEntry = {createEntry}
                            hideResults = {hideResults}
                            list={results}
                        />
                    </div>
                </Collapse>
                </div>
            </ClickAwayListener>
        </div>
    )
}