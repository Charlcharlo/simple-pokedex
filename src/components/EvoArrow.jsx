import { East, NorthEast, SouthEast } from "@mui/icons-material";

export default function EvoArrow({i, length}) {
    if (i === 0 && length > 1) {
        return (
            <div className="evo-arrow">
                <NorthEast />
            </div>
        )
    } else if (i === length - 1 && length > 1) {
        return(
            <div className="evo-arrow">
                <SouthEast />
            </div>
        )
    } else {
        return(
            <div className="evo-arrow">
                <East />
            </div>
        )
    }
}