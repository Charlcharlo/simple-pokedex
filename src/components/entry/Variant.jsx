export default function Variant({ 
    current,
    name, 
    createEntry, 
    url, 
    search, 
    imgUrl }) {

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
            <img 
                className="variant-img"
                src={imgUrl} 
                alt={name}
            />
            {name}
        </button>
    )
}