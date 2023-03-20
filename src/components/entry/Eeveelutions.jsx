import { ArrowDropDown, ArrowDropUp, ArrowLeft, ArrowRight } from "@mui/icons-material";
import { parseName } from "../../functions/general";
import { useFlex } from "../FlexContext";
import Variant from "./Variant";

export default function Eeveelutions({chain, createEntry, findBySpecies, name}) {
    const {species: eevee, evolves_to: evos} = chain;
    const flex = useFlex()
    console.log(flex);

    if(flex) {
        function flexRender(mon) {
            const { species } = mon;
            let current;
            
            if (name === species.name) {
                current = true;
            } else {
                current = false;
            }
    
            return (
                <div>
                    <ArrowRight />
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
}