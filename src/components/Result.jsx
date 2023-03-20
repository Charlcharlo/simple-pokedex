export default function Result({renderResult, mon}) {

    return (
        <div 
            onClick={() => {
                renderResult(mon);
            }}
        >
            <p>{mon.displayName}</p>
        </div>
    )
}