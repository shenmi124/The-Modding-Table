let recordLangs = {}

let curLang = ''

let langList = []

async function registerLangs(...langs) {
    for (let lang of langs) {
        let { langName, lang: langObject } = await import(`../langs/${lang}.js`)
        recordLangs[lang] = { langName, lang: langObject }
        if(curLang === '') curLang = lang
        langList.push([lang, langName])
    }
}

function text(key) {
    let keys = key.split('.')
    let tmp = recordLangs[curLang].lang
    for(let k of keys) tmp = tmp === undefined ? undefined : tmp[k]
    return tmp
}

function setLang(lang) {
    curLang = lang
}

function getLangList() {
    return langList
}

export { registerLangs, text, setLang, getLangList }
