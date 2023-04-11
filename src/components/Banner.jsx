import { Close } from "@mui/icons-material";

export default function Banner({hideBanner}) {
    return (
        <div className="banner row-between">
            <p>Please note that Paldean Pokémon are not yet available in this Pokédex</p>
            <button className="invisibutton" onClick={hideBanner}>
                <Close />
            </button>
        </div>
    )
}