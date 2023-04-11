import { useState } from "react";
import Banner from "./Banner";

export default function Header() {
    const [bannerVis, SetBannerVis] = useState(true);
    function hideBanner() {
        SetBannerVis(false);
    }
    return (
        <div className="title-block" id="header">
            <h2 className="bit-title">A very simple</h2>
            <h1 className="title">Pokédex</h1>
            <div className="ball-dot">
                <div className="ball-dot"></div>
            </div>
            { bannerVis && <Banner hideBanner={hideBanner} /> }
        </div>
    )
}