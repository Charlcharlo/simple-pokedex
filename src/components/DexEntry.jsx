import { useState } from "react";

export default function DexEntry({dexData}) {
    const [flavorIndex, setFlavorIndex] = useState(0)
    const {name, types, id} = dexData;
    const {"official-artwork": image} = dexData.sprites.other;
    const { genera, flavor_text_entries } = dexData.species.info;
    // console.log(genera)
    const genus = genera.find(element => element.language.name === 'en');
    const entries = flavor_text_entries.filter((element) => {
        return element.language.name === "en";
    })


    const renderType = (type) => {
        const classes = `type-block ${type.type.name}`;
        return (
            <div className={classes} key={type.slot}>
                <p>{type.type.name}</p>
            </div>
        )
    }



    return(
        <div className="entry-block">
            <div>
                <div className="name-and-number">
                    <h1 className="bit-title">{name}</h1>
                    <h1 className="bit-title">{id}</h1>
                </div>
                <div className="name-and-number">
                    <h2>{genus ? genus.genus : "A new pokemon"}</h2>
                    {entries[0]
                    && (
                        <select 
                        className="dex-select"
                        onChange={({target}) => {
                            setFlavorIndex(target.value)
                        }}>
                            {entries.map((entry) => {
                                const key = entries.indexOf(entry);
                                return(
                                    <option value={key} key={key}>{entry.version.name}</option>
                                )
                            })}
                        </select>
                    )}
                </div>
                <p>{entries[flavorIndex] 
                    ? entries[flavorIndex].flavor_text 
                    : "This is a new Pokemon and its data has not yet been loaded. Please check back later."}
                </p>
            </div>
            <div>
                <div className="img-block">
                    <img src={image.front_default} alt="zigzagoon" />
                </div>
                <div className="types">
                    {types.map(renderType)}
                </div>
            </div>
        </div>
    )
}