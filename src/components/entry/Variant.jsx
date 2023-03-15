export default function Variant({ current, name, createEntry, url, search }) {

    return (
        <button 
            className="info-pill"
            disabled={current}
            onClick={
                () => {
                    const monData = search(url);
                    createEntry(monData, false);
                }
            }
        >
            {name}
        </button>
    )
}