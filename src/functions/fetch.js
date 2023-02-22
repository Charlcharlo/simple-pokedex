import { buildTree } from "./trie";

async function prepareMons() {
    const keys = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((data) => {
        const { results } = data;
        return results;
    })
    buildTree(keys);
}

async function findBase(url) {
    const monData = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
        return data
    });
    return monData;
};

async function findMon(url) {
    const monData = await findBase(url);
    const speciesData = await findBase(monData.species.url);
    monData.species.info = speciesData;
    return monData;
    // console.log(monData);
};

export { prepareMons, findMon }