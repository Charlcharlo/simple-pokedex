import { findMon } from '../functions/fetch';

export default function Results({list, createEntry, hideResults}) {
    
    const populateList = (item) => {
        const key = list.indexOf(item);
        return (
            <div key={key} onClick={() => {
                const monData = findMon(item.url);
                createEntry(monData);
                hideResults();
            }}>
                <p>{item.displayName}</p>
            </div>
        )
    }

    return (
        <div className="results">
            {list.map(populateList)}
        </div>
    )
}