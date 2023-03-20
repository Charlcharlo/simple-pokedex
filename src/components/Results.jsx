import { findMon } from '../functions/fetch';
import Result from './Result';

export default function Results({list, createEntry, hideResults}) {
    function renderResult(mon) {
        const monData = findMon(mon.url);
        createEntry(monData, true);
        hideResults();
    };
    
    function populateList(mon, i) {
        return (
            <Result 
                mon={mon}
                key={i}
                renderResult={renderResult}
            />
        )
    }

    return (
        <div className="results">
            {list.map(populateList)}
        </div>
    )
}