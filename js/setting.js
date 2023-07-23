function layerDisplay(id){
    if(tmp[id].layerShown===undefined){
        return true
    }
    return tmp[id].layerShown
}

function layerDisplayTotal(id){
    for(i in id){
        let a = layerDisplay(id[i])
        if(a==true){
            return true
        }
    }
}

addLayer("OtherTab small", {
    name: "AllLayer",
    position: -1,
    row: 999,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 其他页面 ↓' : '↓ Other Tab ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 其他页面 ↓' : '↓ Other Tab ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['Setting','Statistics','Information','Changelog'])},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("Setting", {
    name: "Setting",
    position: 0,
    row: 999,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '设置' : 'Setting'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '设置' : 'Setting'},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("Information", {
    name: "Information",
    position: 2,
    row: 999,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '信息' : 'Information'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '信息' : 'Information'},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})

addLayer("Changelog", {
    name: "Changelog",
    position: 3,
    row: 999,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '更新日志' : 'Changelog'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '更新日志' : 'Changelog'},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})
