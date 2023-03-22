export default function Result({renderResult, mon, index, chooseItem}) {
    const id = `result-${index}`;
    return (
        <div 
            className="result"
            tabIndex={index}
            id={id}
            onClick={() => {
                renderResult(mon);
            }}
            //Set focus to this item on hover
            onMouseEnter={() => chooseItem(index)}
        >
            <p>{mon.displayName}</p>
        </div>
    )
}