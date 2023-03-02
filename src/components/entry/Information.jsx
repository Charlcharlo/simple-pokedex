import { startCase } from "lodash";
import { useState } from "react";
import { parseName } from "../../functions/general";

export default function Information({dexData}) {
    const [ flavorIndex, setFlavorIndex ] = useState(0);

    const { entry_number: id } = dexData.species.info.pokedex_numbers[0];
    const name = parseName(dexData.name);
    const { genera, flavor_text_entries } = dexData.species.info;
    const genus = genera.find(element => element.language.name === 'en');
    const entries = flavor_text_entries.filter((element) => {
        return element.language.name === "en";
    });
    
    return (
        <div className="flex-col">
            <div className="row-between" id="name-and-number">
                <h1 className="bit-title">{name}</h1>
                <h1 className="bit-title">{id}</h1>
            </div>
            <div className="info-block">
            <div className="row-between">
                <h2>{genus ? `The ${genus.genus}` : "A new pokemon"}</h2>
                {entries[0]
                && (
                <div>
                    <label className="soft-title" htmlFor="dex-select">VERSION</label>
                    <select
                        name="dex-select"
                        className="dex-select"
                        onChange={({target}) => {
                        setFlavorIndex(target.value)
                        }}
                    >
                    {entries.map((entry) => {
                        const key = entries.indexOf(entry);
                        const region = startCase(entry.version.name);
                        return(
                            <option value={key} key={key}>{region}</option>
                        )
                    })}
                    </select>
                </div>
            )}
            </div>
            <p className="entry-text">
                {entries[flavorIndex] 
                ? entries[flavorIndex].flavor_text 
                : "This is a new Pokemon and its data has not yet been loaded. Please check back later."}
            </p>
            </div>
        </div>
    )
}