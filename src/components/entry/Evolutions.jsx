import { findBySpecies } from "../../functions/fetch";
import { parseName, pkmImageUrl } from "../../functions/general";
import FlexProvider from "../FlexContext";
import Eeveelutions from "./Eeveelutions";
import EvoArrow from "./EvoArrow";
import Variant from "./Variant";

export default function Evolutions({evoChain, name, createEntry}) {
    let current;
    const {chain} = evoChain;
    const {evolves_to: evos, species} = chain;
    const imgUrl = pkmImageUrl(species.url);
    

    function evoButtons(chain, i, array) {
        const {evolves_to: evos, species} = chain;
        const imgUrl = pkmImageUrl(species.url);
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
                />
                    <Variant 
                        current = {current}
                        name = {parseName(species.name)}
                        url = {species.url}
                        createEntry={createEntry}
                        search={findBySpecies}
                        imgUrl={imgUrl}
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
            <FlexProvider>
                <div className="divide-half info-block col-start">
                    <h3 className="soft-title">EVOLUTIONS</h3>
                    <Eeveelutions 
                        chain={chain}
                        findBySpecies={findBySpecies}
                        createEntry={createEntry}
                        name={name}
                    />
                </div>
            </FlexProvider>
        )
    } else {
    return (
        <FlexProvider>
            <div className="divide-half info-block">
                <h3 className="soft-title">EVOLUTIONS</h3>
                <div className="evo-branch">
                    <Variant 
                        current = {current}
                        name = {parseName(species.name)}
                        url = {species.url}
                        createEntry= {createEntry}
                        search={findBySpecies}
                        imgUrl={imgUrl}
                    />
                    <div className="second-stage">
                        {evos.map(evoButtons)}
                    </div>
                </div>
            </div>
        </FlexProvider>
    )
    }
}