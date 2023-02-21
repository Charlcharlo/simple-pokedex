import { findMon } from '../functions/fetch';

export default function Results({list}) {
    
    const populateList = (item) => {
        const key = list.indexOf(item);
        return (
            <div key={key} onClick={() => findMon(item.url)}>
                <p>{item.name}</p>
            </div>
        )
    }

    return (
        <div className="results">
            {list.map(populateList)}
        </div>
    )
}