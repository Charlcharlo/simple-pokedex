import { useState } from "react";
import { Star, StarOutline } from "@mui/icons-material";

export default function Image({dexData}) {
    const {name} = dexData;
    const {"official-artwork": image} = dexData.sprites.other;
    const [shiny, setShiny] = useState(false);


    return (
        <div className="img-block">
            <img 
                src={
                    shiny ?
                    image.front_shiny :
                    image.front_default
                }
                alt={name} 
            />
            <button 
                className="invisibutton"
                style={{
                    color:  shiny ?
                            "var(--red)" :
                            "var(--blue)"
                }}
                onClick={() => {
                    setShiny(!shiny);
                }}
            >
                {
                    shiny ?
                    <Star fontSize="large"/> :
                    <StarOutline fontSize="large"/> 
                }
            </button>
        </div>
    )
}