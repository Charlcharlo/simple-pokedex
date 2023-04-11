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
    const evoChain = await findBase(speciesData.evolution_chain.url);
    monData.species.info = speciesData;
    monData.evoChain = evoChain;
    console.log(monData);
    return monData;
};

async function findBySpecies(url) {
    const speciesData = await findBase(url);
    const monData = await findBase(speciesData.varieties[0].pokemon.url);
    const evoChain = await findBase(speciesData.evolution_chain.url);
    monData.species.info = speciesData;
    monData.evoChain = evoChain;
    return monData;
}

export { prepareMons, findMon, findBySpecies }