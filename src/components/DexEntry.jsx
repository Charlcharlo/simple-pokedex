import Forms from "./entry/Forms";
import Evolutions from "./entry/Evolutions";
import Information from "./entry/Information";
import Stats from "./entry/Stats";
import Image from "./entry/Image";
import Types from "./entry/Types";

export default function DexEntry({dexData, createEntry}) {
    const { types, stats, evoChain } = dexData;
    return(
        <div className="entry-block">
            <div className="row-between">
                <div className="col-between" id="entry-top-L">
                    <div>
                        <Information dexData={dexData} />
                    </div>
                    <div>
                        <Stats stats={stats} />
                    </div>
                </div>
                <div className="col-between" id="entry-top-R">
                    <Image dexData = {dexData}/>
                    <Types types = {types} />
                </div>
            </div>
            <div className="row-between" id="entry-bottom">
                <Evolutions 
                    evoChain = {evoChain}
                    createEntry = {createEntry}
                />
                <Forms 
                    dexData = {dexData}
                    createEntry = {createEntry}
                />
            </div>
        </div>
    )
}