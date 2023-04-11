import { findMon } from '../functions/fetch';
import Result from './Result';

export default function Results({list, createEntry, hideResults, chooseItem}) {

    function renderResult(mon) {
        console.log(mon);
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
                index={i}
                chooseItem={chooseItem}
            />
        )
    }

    return (
        <div className="results">
            {list.map(populateList)}
        </div>
    )
}