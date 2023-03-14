import { ArrowDropDown, ArrowDropUp, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { parseName } from "../../functions/general";
import EvoArrow from "./EvoArrow";
import Variant from "./Variant";

export default function Eeveelutions({chain, createEntry, findBySpecies, name, flex}) {
    const {species: eevee, evolves_to: evos} = chain;
    const topRow = evos.slice(0, 3);
    const midL = evos[3];
    const midR = evos[4];
    const bottomRow = evos.slice(5);

    if (midL.name === name) {
        midL.current = true;
    } else {
        midL.current = false;
    }

    if (midR.name === name) {
        midR.current = true;
    } else {
        midR.current = false;
    }

    if (eevee.name === name) {
        eevee.current = true;
    } else {
        eevee.current = false;
    }

    function flexRender(mon, i, array) {
        const { species } = mon;
        let current;
        
        if (name === species.name) {
            current = true;
        } else {
            current = false;
        }

        return (
            <div>
                <EvoArrow 
                    i={i}
                    l={array.length}
                    flex={false}
                />
                <Variant 
                    current = {current}
                    name = {parseName(species.name)}
                    url = {species.url}
                    createEntry={createEntry}
                    search={findBySpecies}
                />
            </div>
        )
    }

    function renderRow(mon) {
        const { species } = mon;
        let current;
        
        if (name === species.name) {
            current = true;
        } else {
            current = false;
        }

        return (
            <Variant 
                current = {current}
                name = {parseName(species.name)}
                url = {species.url}
                createEntry={createEntry}
                search={findBySpecies}
            />
        )
    }

    if(flex) {
        return (
            <div className="eevee-branch">
                <Variant 
                    current = {eevee.current}
                    name = {parseName(eevee.name)}
                    url = {eevee.url}
                    createEntry= {createEntry}
                    search= {findBySpecies}
                />
                <div>
                    {evos.map(flexRender)}
                </div>
            </div>
        )
    } else {
        return (
            <div id="eeveelutions">
                <div className="row-start">
                    {topRow.map(renderRow)}
                </div>
                <div className="row-start">
                    <Variant 
                        current = {midL.current}
                        name = {parseName(midL.species.name)}
                        url = {midL.species.url}
                        createEntry={createEntry}
                        search={findBySpecies}
                    />
                    <div>
                        <div className="row-between">
                            <div className="evo-arrow">
                                <ArrowDropUp />
                            </div>
                            <div className="evo-arrow">
                                <ArrowDropUp />
                            </div>
                            <div className="evo-arrow">
                                <ArrowDropUp />
                            </div>
                        </div>
                        <div className="row-between">
                            <div className="evo-arrow">
                                <ArrowLeft />
                            </div>
                            <Variant 
                                current = {eevee.current}
                                name = {parseName(eevee.name)}
                                url = {eevee.url}
                                createEntry= {createEntry}
                                search= {findBySpecies}
                            />
                            <div className="evo-arrow">
                                <ArrowRight />
                            </div>
                        </div>
                        <div className="row-between">
                            <div className="evo-arrow">
                                <ArrowDropDown />
                            </div>
                            <div className="evo-arrow">
                                <ArrowDropDown />
                            </div>
                            <div className="evo-arrow">
                                <ArrowDropDown />
                            </div>
                        </div>
                    </div>
                    <Variant 
                        current = {midR.current}
                        name = {parseName(midR.species.name)}
                        url = {midR.species.url}
                        createEntry= {createEntry}
                        search= {findBySpecies}
                    />
                </div>
                <div className="row-start">
                    {bottomRow.map(renderRow)}
                </div>
            </div>
        )
    }


    //break up array into 3 rows
    // Eevee in center, others wrap around 
    // Jolteon, Flareon, Vaporeon
    // Espeon, Eevee, Umbreon
    // Glaceon, Leafeon, Sylveon

    //Abolute position around that
    // Check flex to just diplay the two
}