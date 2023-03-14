import { startCase, replace, upperFirst } from "lodash";

const parseName = (name) => {
    let output;
    const exceptions1 = ["jangmo-o", "hakomo-o", "kommo-o"];
    const exceptions2 = ["ho-oh", "porygon-z", "wo-chien", "chi-yu", "ting-lu", "chien-pao"];
    const in1 = exceptions1.includes(name);
    const in2 = exceptions2.includes(name);

    if(!in1) {
        // node.value.displayName = replace(key.name, "-", " ");
       output = startCase(name);
        // node.value.displayName = startCase(node.value.displayName);
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

function checkWidth(setWidth) {
    document.addEventListener("resize", () => {
        setWidth(window.innerWidth);
    });
}

export { parseName, checkWidth };