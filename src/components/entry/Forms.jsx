import { startCase } from "lodash";
import { findMon } from "../../functions/fetch";
// import { useState } from "react";

export default function Forms({dexData, createEntry}) {
    const {varieties} = dexData.species.info;
    const {name} = dexData.species;
    const {name: pkmName} = dexData;
    const selectStyle = {
        // color: "white",
        backgroundColor: "var(--yellow)",
        borderColor: "var(--blue)",
        cursor: "default"
    }

    const renderForms = (form) => {
        let shortForm
        const length = name.length + 1;
        if(name !== form.pokemon.name) {
            shortForm = form.pokemon.name.slice(length);
        } else {
            shortForm = "Base";
        }

        shortForm = startCase(shortForm);

        if(form.pokemon.name === pkmName) {
            return (
                <button 
                    className="info-pill"
                    style={selectStyle}
                    disabled
                >
                    {shortForm}
                </button>
            )
        } else {
            return (
                <button 
                    className="info-pill"
                    onClick={() => {
                        const monData = findMon(form.pokemon.url);
                        createEntry(monData);
                    }}
                >
                    {shortForm}
                </button>
            )
        }
    }

    if(varieties.length > 1) {
        return (
            <div  className="divide-half info-block">
                <h3 className="soft-title">FORMS</h3>
                <div className="name-and-number">
                    { varieties.map(renderForms)}
                </div>
            </div>
        )
    } else {
        return null;
    }
}