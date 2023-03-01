import EvoArrow from "./EvoArrow";

export default function Evolutions({evoChain}) {
    function evoButtons(chain, i,array) {
        const length = array.length;
        const {evolves_to: evos, species} = chain;

        return(
            <div key={i}>
                <EvoArrow
                    i={i}
                    length={length}
                />
                <button className="info-pill">{species.name}</button>
                <div>
                    {evos.map(evoButtons)}
                </div>
            </div>
        )
    }

    const {chain} = evoChain;
    const {evolves_to: evos, species} = chain;
    if(evos.length === 0) {
        return null;
    } else {
    return (
        <div>
            <h3 className="soft-title">EVOLUTIONS</h3>
            <div className="evolution-tree">
                <button className="info-pill">{species.name}</button>
                <div>
                    {evos.map(evoButtons)}
                </div>
            </div>
        </div>
    )
    }
}