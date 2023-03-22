import { findMon } from "../../functions/fetch";
import { startCase } from "lodash";
import Variant from "./Variant";

// import { useState } from "react";

export default function Forms({dexData, createEntry}) {
    const {varieties} = dexData.species.info;
    const {name} = dexData.species;
    const {name: pkmName} = dexData;


    const renderForms = (form, i) => {
        let shortForm
        let current
        const length = name.length + 1;
        if(name !== form.pokemon.name) {
            shortForm = form.pokemon.name.slice(length);
        } else {
            shortForm = "Base";
        }

        if (pkmName === form.pokemon.name) {
            current = true;
        } else {
            current = false;
        }

        shortForm = startCase(shortForm);
        return (
            <Variant
                key={i}
                name={shortForm}
                current={current}
                createEntry={createEntry}
                url={form.pokemon.url}
                search={findMon}
            />
        )
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