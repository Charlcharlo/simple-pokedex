import { useState } from "react";
import { parseName } from "../functions/general";
import { StarOutline, Star } from "@mui/icons-material";
import { startCase } from "lodash";
import Forms from "./Forms";
import Evolutions from "./Evolutions";

export default function DexEntry({dexData, createEntry}) {
    const [ flavorIndex, setFlavorIndex ] = useState(0);
    const [shiny, setShiny] = useState(false);
    const { types, stats, evoChain } = dexData;
    const { entry_number: id } = dexData.species.info.pokedex_numbers[0];
    const name = parseName(dexData.name);
    const {"official-artwork": image} = dexData.sprites.other;
    const { genera, flavor_text_entries } = dexData.species.info;
    // console.log(genera)
    const genus = genera.find(element => element.language.name === 'en');
    const entries = flavor_text_entries.filter((element) => {
        return element.language.name === "en";
    });

    const renderType = (type) => {
        const classes = `info-pill ${type.type.name}`;
        return (
            <div className={classes} key={type.slot}>
                <p>{type.type.name}</p>
            </div>
        )
    }
    
    const renderStat = (stat, i) => {
        const statsAbbrev = ["HP", "Atk", "Def", "SpAtk", "SpDef", "Spd"];
        return (
            <div className="stat-block" key={i}>
                <h1 className="bit-title">{stat.base_stat}</h1>
                <h2>{statsAbbrev[i]}</h2>
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
                <p>{entries[flavorIndex] 
                    ? entries[flavorIndex].flavor_text 
                    : "This is a new Pokemon and its data has not yet been loaded. Please check back later."}
                </p>
                <h3 className="soft-title">STATS</h3>
                <div className="name-and-number">
                    {stats.map(renderStat)}
                </div>
                <Forms 
                    dexData = {dexData}
                    createEntry = {createEntry}
                />
                <Evolutions 
                    evoChain = {evoChain}
                />
            </div>
            <div>
                <div className="img-block">
                    <img 
                        src={
                            shiny ?
                            image.front_shiny :
                            image.front_default
                        }
                        alt={name} 
                    />
                    <button 
                        className="invisibutton"
                        style={{
                            color:  shiny ?
                                    "var(--red)" :
                                    "var(--blue)"
                        }}
                        onClick={() => {
                            setShiny(!shiny);
                        }}
                    >
                        {
                            shiny ?
                            <Star fontSize="large"/> :
                            <StarOutline fontSize="large"/> 
                        }
                    </button>
                </div>
                <div className="types">
                    {types.map(renderType)}
                </div>
            </div>
        </div>
    )
}