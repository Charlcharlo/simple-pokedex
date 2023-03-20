import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
import { useFlex } from "../FlexContext";

export default function EvoArrow({i, l}) {
    const flex = useFlex();
    let first = false;
    let last = false;
    let rotate;
    if (i === 0 && l !== 1) {
        first = true;
        last = false;
    } else if(i === l- 1 && l !== 1) {
        first = false;
        last = true;
    }

    flex ?
    rotate = {
        transform: 
            first ?
            "rotate(30deg)" :
            last ?
            "rotate(-30deg)" :
            "rotate(0deg)"
    } :
    rotate = {
        transform: 
            first ?
            "rotate(-30deg)" :
            last ?
            "rotate(30deg)" :
            "rotate(0deg)"
    }
    
    return(
        <div  className="evo-arrow" style={rotate}>
            { 
            flex ?  
            <ArrowDropDown /> :
            <ArrowRight />
            }
        </div>
    )
}