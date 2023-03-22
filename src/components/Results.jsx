import { useEffect, useState } from 'react';
import { findMon } from '../functions/fetch';
import Result from './Result';

export default function Results({list, createEntry, hideResults}) {
    const [focus, setFocus] = useState(null);

    function chooseItem(i) {
        setFocus(i);
    }

    //Set listener for up and down arrows
    useEffect(() => {
        function keyListener(event) {
            if(list.length > 0) {
                const end = list.length - 1;
                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setFocus((prevVal) => {
                        if(prevVal === null || prevVal === end) {
                            return 0;
                        } else {
                            return prevVal + 1;
                        }
                    });
                } else if(event.key === "ArrowUp") {
                    event.preventDefault();
                    setFocus((prevVal) => {
                        if (prevVal === null || prevVal === 0) {
                            return end;
                        } else {
                            return prevVal - 1;
                        }
                    });
                } else if(event.key === "Tab") {
                    event.preventDefault();
                } else if(event.key === "Backspace") {
                    setFocus(null);
                }
            }
        };
        document.addEventListener("keydown", keyListener);
        return () => document.removeEventListener("keydown", keyListener);
    },
    [list]);

    useEffect(() => {
        if(focus != null) {
            //Set focus on selected item in the list
            const targetId = `result-${focus}`;
            const target = document.getElementById(targetId);
            target.focus();
            //click item on Enter press
            function findOnEnter(event) {
                if(event.key === "Enter") {
                    target.click();
                }
            }
            document.addEventListener("keydown", findOnEnter);
            return () => document.removeEventListener("keydown", findOnEnter);
        }
    },
    [focus]);

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