import { startCase, replace, upperFirst } from "lodash";

const parseName = (name) => {
    let output;
    const exceptions1 = ["jangmo-o", "hakamo-o", "kommo-o"];
    const exceptions2 = ["ho-oh", "porygon-z", "wo-chien", "chi-yu", "ting-lu", "chien-pao"];
    const in1 = exceptions1.includes(name);
    const in2 = exceptions2.includes(name);

    if(!in1) {
       output = startCase(name);
    } else {
        output = upperFirst(name);
    }
    
    if(in2) {
        output = replace(output, " ", "-");
    }

    if(output === "Kommo O Totem") {
        output = "Kommo-o Totem"
    }

    return output;
}

export function findId(url) {
    const urlArray = url.split("/");
    const idI = urlArray.length - 2;
    return urlArray[idI];
};

export function pkmImageUrl(url) {
    const id = findId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export { parseName };