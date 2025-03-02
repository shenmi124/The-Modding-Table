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

addLayer("SideTab", {
    name: "AllLayer",
    position: -999,
    row: 0,
    symbol() {return i18n('其他页面', 'Side Tab', false)},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    small: true,
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
    position: -998,
    row: 0,
    symbol() {return i18n('设置', 'Setting', false)},
    startData() { return {
        unlocked: true,
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
    position: -997,
    row: 0,
    symbol() {return i18n('信息', 'Information', false)},
    startData() { return {
        unlocked: true,
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
    position: -996,
    row: 0,
    symbol() {return i18n('更新日志', 'Changelog', false)},
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "rgb(230, 230, 236)",
    type: "none",
    tooltip(){return false},
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ],
})
