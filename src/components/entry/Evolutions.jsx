import { findBySpecies } from "../../functions/fetch";
import { parseName } from "../../functions/general";
import Eeveelutions from "./Eeveelutions";
import EvoArrow from "./EvoArrow";
import Variant from "./Variant";

export default function Evolutions({evoChain, name, createEntry, flex}) {
    let current;
    const {chain} = evoChain;
    const {evolves_to: evos, species} = chain;

    function evoButtons(chain, i, array) {
        const {evolves_to: evos, species} = chain;
        if (name === species.name) {
            current = true;
        } else {
            current = false;
        }


        return(
            <div key={i} className="evo-branch">
                <EvoArrow 
                    i={i}
                    l={array.length}
                    flex={flex}
                />
                    <Variant 
                        current = {current}
                        name = {parseName(species.name)}
                        url = {species.url}
                        createEntry={createEntry}
                        search={findBySpecies}
                    />
                <div className="third-stage">
                    {evos.map(evoButtons)}
                </div>
            </div>
        )
    }

    if (name === species.name) {
        current = true;
    } else {
        current = false;
    }

    if(evos.length === 0) {
        return null;
    } else if (evoChain.id === 67) {
        return (
            <div className="divide-half info-block col-start">
                <h3 className="soft-title">EVOLUTIONS</h3>
                <Eeveelutions 
                    chain={chain}
                    findBySpecies={findBySpecies}
                    createEntry={createEntry}
                    name={name}
                    flex={flex}
                />
            </div>
        )
    } else {
    return (
        <div className="divide-half info-block">
            <h3 className="soft-title">EVOLUTIONS</h3>
            <div className="evo-branch">
                <Variant 
                    current = {current}
                    name = {parseName(species.name)}
                    url = {species.url}
                    createEntry= {createEntry}
                    search={findBySpecies}
                />
                <div className="second-stage">
                    {evos.map(evoButtons)}
                </div>
            </div>
        </div>
    )
    }
}