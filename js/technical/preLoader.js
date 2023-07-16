// Thanks to Antimatter Dimensions

/* eslint-disable import/newline-after-import, import/first, import/order */
function mergeIntoGlobal(object) {
    for (const key in object) {
        if (key === "default") {
            // Skip default exports
            continue;
        }
        const value = object[key];
        const existingValue = window[key];
        if (existingValue !== undefined) {
            throw `Property ${key} already exists in global context`;
        }

        window[key] = value;
    }
}

function loadScript(link) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = link;
        script.onload = () => resolve();
        document.getElementsByTagName('head')[0].appendChild(script);
    })
}

function asyncSeries(funs) {
    return funs.reduce((promise, fun) => promise.then(fun), Promise.resolve());
}

function loadStaticSource(links) {
    return new Promise((resolve) => {
        asyncSeries(links.map((link) => () => loadScript(link))).then(resolve)
    })
}

import * as lang from "./lang.js";
mergeIntoGlobal(lang);

let scripts = [
    "js/technical/break_eternity.js",
    "js/technical/layerSupport.js",
    "js/mod.js",
    "js/lag.js",
    "js/setting.js",
    "js/technical/loader.js",
    "js/technical/others.js",
    "js/technical/temp.js",
    "js/technical/displays.js",
    "js/game.js",
    "js/utils.js",
    "js/utils/easyAccess.js",
    "js/technical/systemComponents.js",
    "js/components.js",
    "js/technical/canvas.js",
    "js/technical/particleSystem.js",
    "js/utils/NumberFormating.js",
    "js/utils/options.js",
    "js/utils/save.js",
    "js/utils/themes.js"
]

loadStaticSource(scripts).then(() => load())

