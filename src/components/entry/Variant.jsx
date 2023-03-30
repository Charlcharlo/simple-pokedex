import { useState } from "react";

export default function Variant({ 
    current,
    name, 
    createEntry, 
    url, 
    search, 
    imgUrl }) {

    const [error, setError] = useState(false);
    const backupImg = "./images/pokeball-svgrepo.svg";
    const errorCheckHeight = {
        height: "70%",
        left: "10px"
    }
    
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
                onError={() => {
                    setError(true);
                }}
                src={
                    !error ?
                    imgUrl :
                    backupImg
                }
                alt={name}
                style={error ? errorCheckHeight : {}}
            />
            {name}
        </button>
    )
}