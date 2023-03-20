import Forms from "./entry/Forms";
import Evolutions from "./entry/Evolutions";
import Information from "./entry/Information";
import Stats from "./entry/Stats";
import Image from "./entry/Image";
import Types from "./entry/Types";

export default function DexEntry({dexData, createEntry}) {
    const { types, stats, evoChain } = dexData;
    const {name} = dexData.species;
    return(
        <div className="entry-block">
            <div className="row-between" id="entry-top">
                <div className="col-between" id="entry-top-L">
                    <Information dexData={dexData} />
                    <Stats stats={stats} />
                </div>
                <div className="col-between" id="entry-top-R">
                    <Image dexData = {dexData}/>
                    <Types types = {types} />
                </div>
            </div>
            <div className="row-between" id="entry-bottom">
                <Forms 
                    dexData = {dexData}
                    createEntry = {createEntry}
                />
                <Evolutions 
                    evoChain = {evoChain}
                    createEntry = {createEntry}
                    name = {name}
                />
            </div>
        </div>
    )
}