import { useState } from "react";
import { buildTree } from "./trie";

const prepareMons = () => {
    let keys

    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((data) => {
        const { results } = data;
        keys = results
    })
    .then(buildTree(keys));
}

const findMon = (url) => {
    fetch(url)
    .then((response) => response.json())
    .then((monData) => {
        // console.log(data)
        fetch(monData.species.url)
        .then((response) => response.json())
        .then((speciesData) => {
            monData.species.info = speciesData;
        })
        .then(() => {
            // return monData;
            console.log(monData);
        })
    })
}

export { prepareMons, findMon }