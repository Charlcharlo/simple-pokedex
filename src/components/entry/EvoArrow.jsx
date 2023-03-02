import { East, NorthEast, SouthEast, South } from "@mui/icons-material";

export default function EvoArrow({i, length}) {
    const width = window.innerWidth;
    console.log(width)
    if (width > 600) {
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
    } else {
        return(
            <div className="evo-arrow">
                <South />
            </div>
        )
    }
}