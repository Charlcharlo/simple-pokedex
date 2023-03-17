import { useEffect, useState } from 'react';
import { findMon } from '../functions/fetch';
import Result from './Result';

export default function Results({list, createEntry, hideResults}) {
    const [selected, setSelected] = useState(null);
    
    useEffect(() => {
        document.addEventListener(
            "keydown",
            event => {
                console.log(event.key);
                if(event.key === "ArrowDown") {
                    if(selected && selected < list.length - 1) {
                        setSelected(selected + 1);
                        console.log("down: : " + selected)

                    } else {
                        setSelected(0);
                        console.log("down: " + selected)
                    }
                } else if (event.key === "ArrowUp") {
                    if(selected !== null && selected > 0) {
                        setSelected(selected - 1);
                        console.log("up: " + selected)
                    }
                } else if (event.key === "Enter" && selected !== null) {
                    const mon = list[selected]
                    console.log(mon)
                    renderResult(mon);
                }
            }
        )
    },
    [list, selected]);

    function renderResult(mon) {
        const monData = findMon(mon.url);
        createEntry(monData, true);
        hideResults();
    }
    
    const populateList = (item, i) => {
        return (
            <Result 
                mon={item}
                monKey={i}
                selected={false}
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