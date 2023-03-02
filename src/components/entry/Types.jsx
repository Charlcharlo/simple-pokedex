export default function Types({types}) {
    function renderType(type) {
        const classes = `info-pill ${type.type.name}`;
        return (
            <div className={classes} key={type.slot}>
                <p>{type.type.name}</p>
            </div>
        )
    }

    return (
        <div className="types">
            {types.map(renderType)}
        </div>
    )
}