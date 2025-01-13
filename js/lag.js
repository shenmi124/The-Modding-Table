addLayer("Language", {
    name: "Language",
    position: 0,
    row: 999,
    tooltip() { return false },
    startData() { return {
        unlocked: true,
        sure: false,
    }},
    color: "#fff",
    type: "none",
    layerShown(){return options.ch==undefined && modInfo.internationalizationMod==true},
    tabFormat: [
        "blank",
        ["display-text", function() { return "<h3>本游戏基于The Modding <b>Table</b>制作<br>This game based on The Modding <b>Table</b><br><br>选择语言<br>Choose your language<br><br>你可以在设置中改变语言<br>You can change the language in the settings.</h3>" }],
        "blank", 
        "blank",
        'clickables',
        "blank",
        "blank",
        ["display-text", function() { return "<a href='https://afdian.net/@Mysterious124' class='link' target='_blank'>点我捐助</a><br><a href='https://afdian.net/@Mysterious124' class='link' target='_blank'>Click me to donate</a><br><a href='https://discord.gg/DdWRz6cJ' class='link' target='_blank'>Shinwmyste Game Discord</a>" }],
    ],
    clickables: {
        11: {
            display(){return '<h2>中文<br>(Chinese)</h2>'+(player.Language.sure==true ? '<br>你确定吗?<br>再次点击生效<br>请确保你已经阅读过这些!' : '')},
            displayI18N(){return '<h2>中文<br>(Chinese)</h2>'+(player.Language.sure==true ? '<br>你确定吗?<br>再次点击生效<br>请确保你已经阅读过这些!' : '')},
            canClick(){return true},
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
            onClick(){
                if(player.Language.sure==false){
                    player.Language.sure = true
                }else{
                    options.ch=true
                    setupModInfo()
                    showTab('none')
                }
            }
        },  
        12: {
            display(){return '<h2>English<br>(英文)</h2>'+(player.Language.sure==true ? "<br>Are you sure?<br>Click again to active<br>Make sure you've read this!" : '')},
            displayI18N(){return '<h2>English<br>(英文)</h2>'+(player.Language.sure==true ? "<br>Are you sure?<br>Click again to active<br>Make sure you've read this!" : '')},
            canClick(){return true},
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
            onClick(){
                if(player.Language.sure==false){
                    player.Language.sure = true
                }else{
                    options.ch=false
                    setupModInfo()
                    showTab('none')
                }
            }
        },  
    },
})