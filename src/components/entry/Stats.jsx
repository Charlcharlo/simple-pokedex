export default function Stats({stats}) {
    function renderStat(stat, i) {
        const statsAbbrev = ["HP", "Atk", "Def", "SpAtk", "SpDef", "Spd"];
        return (
            <div className="stat-block" key={i}>
                <h1 className="bit-title">{stat.base_stat}</h1>
                <h3 className="soft-title">{statsAbbrev[i]}</h3>
            </div>
        )
    }

    return (
        <div className="info-block" id="stat-container">
            <h3 className="soft-title">STATS</h3>
            <div className="row-between">
                {stats.map(renderStat)}
            </div>
        </div>
    )
}