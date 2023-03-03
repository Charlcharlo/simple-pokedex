import { startCase } from "lodash";
import { useState } from "react";
import { parseName } from "../../functions/general";

export default function Information({dexData}) {
    const [ flavorIndex, setFlavorIndex ] = useState(0);

    const name = parseName(dexData.name);
    const { genera, flavor_text_entries } = dexData.species.info;
    const genus = genera.find(element => element.language.name === 'en');
    const entries = flavor_text_entries.filter((element) => {
        return element.language.name === "en";
    });
    
    return (
        <div className="flex-col">
            <div className="info-block" id="info-section">
            <div className="row-between" id="name-and-number">
                <h1 className="bit-title">{name}</h1>
            </div>
            <div className="row-between">
                <h3 className="soft-title">{genus ? `The ${genus.genus}` : "A new pokemon"}</h3>
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