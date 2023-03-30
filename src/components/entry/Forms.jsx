import { findMon } from "../../functions/fetch";
import { startCase } from "lodash";
import Variant from "./Variant";
import { parseName, pkmImageUrl } from "../../functions/general";

// import { useState } from "react";

export default function Forms({dexData, createEntry}) {
    const {varieties} = dexData.species.info;
    const {name} = dexData.species;
    const {name: pkmName} = dexData;


    function renderForms(form, i) {
        let shortForm
        let current
        const imgUrl = pkmImageUrl(form.pokemon.url);
        const length = name.length + 1;
        const formName = parseName(form.pokemon.name);
        if(name !== form.pokemon.name) {
            shortForm = formName.slice(length);
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
                imgUrl={imgUrl}
            />
        )
    }

    if(varieties.length > 1) {
        return (
            <div
                className="divide-half info-block"
                id={
                    name === "eevee" ?
                    "eevee-forms" :
                    "forms"
                }

            >
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