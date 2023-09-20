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
    layerShown(){return options.ch==undefined && modInfo.otherLanguageMod==true},
    tabFormat: [
        "blank",
        ["display-text", function() { return "<h3>选择语言(英文版可能会有一些bug)<br>Choose your language(there may be some bugs in English mode)<br><br>你可以在设置中改变语言<br>You can change the language in the settings<br><br><a href='https://afdian.net/@Mysterious124' class='link' target='_blank'>点我捐助</a><br><a href='https://afdian.net/@Mysterious124' class='link' target='_blank'>Click me to donate</a><br><br><a href='https://discord.gg/DdWRz6cJ' class='link' target='_blank'>Shinwmyste Game Discord</a><br>如果你后悔了,你可以在选择语言后的信息页面中重新加入<br>If you regret not joining discord, you can do it in the 'Information' tab after selection.</h3>" }],
        "blank", "blank",
        'clickables',
    ],
    clickables: {
        11: {
            display(){return '中文(Chinese)'+(player.Language.sure==true ? '<br><small>你确定吗?<br>再次点击生效<br>请确保你已经阅读过这些!</small>' : '')},
            displayEN(){return '中文(Chinese)'+(player.Language.sure==true ? '<br><small>你确定吗?<br>再次点击生效<br>请确保你已经阅读过这些!</small>' : '')},
            canClick(){return true},
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
            onClick(){
                if(player.Language.sure==false){
                    player.Language.sure = true
                }else{
                    options.ch=true
                    showTab('none')
                }
            }
        },  
        12: {
            display(){return 'English(英文)'+(player.Language.sure==true ? "<br><small>Are you sure?<br>Click again to active<br>Make sure you've read this!</small>" : '')},
            displayEN(){return 'English(英文)'+(player.Language.sure==true ? "<br><small>Are you sure?<br>Click again to active<br>Make sure you've read this!</small>" : '')},
            canClick(){return true},
			style() {return {'width': "160px", "min-width": "160px", 'height': "160px", "border-radius": "5%", "margin-right": "20px",}},
            onClick(){
                if(player.Language.sure==false){
                    player.Language.sure = true
                }else{
                    options.ch=false
                    showTab('none')
                }
            }
        },  
    },
})