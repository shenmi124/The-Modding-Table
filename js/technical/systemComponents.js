function getActiveClass(layer){
	if(layer=='info-tab'){layer = 'Information'}
	if(layer=='options-tab'){layer = 'Setting'}
	if(layer=='changelog-tab'){layer = 'Changelog'}
	$("button").removeClass("active");
	$('#'+layer).addClass('active')
}

function i18n(text, text2, component=true){
	let lag = false
	if(modInfo.internationalizationMod){
		lag = options.ch
	}else if(modInfo.changedDefaultLanguage){
		lag = true
	}
	if(component){
		if(modInfo.internationalizationMod){
			if(options.ch==modInfo.changedDefaultLanguage){
				lag = true
			}else{
				lag = false
			}
		}else{
			lag = true
		}
	}
	if(lag){
		return text
	}else if(text2!==undefined){
		return text2
	}else{
		return text
	}
}

var systemComponents = {
	'tab-buttons': {
		props: ['layer', 'data', 'name'],
		template: `
			<div class="upgRow">
				<div v-for="tab in Object.keys(data)">
					<button v-if="data[tab].unlocked == undefined || data[tab].unlocked"
					style="font-family: cursive;"
					v-bind:class="{
						tabButton: true,
						notify: subtabShouldNotify(layer, name, tab),
						resetNotify: subtabResetNotify(layer, name, tab),
						AcSub: tab==player.subtabs[layer][name],
						[tab]: tab==player.subtabs[layer][name]
					}"
					:class=""
					v-bind:id="[tab]"
					v-bind:style="[(data[tab].glowColor && subtabShouldNotify(layer, name, tab) ? {'box-shadow': 'var(--hqProperty2a), 0 0 20px '  + data[tab].glowColor} : {}), tmp[layer].componentStyles['tab-button'], data[tab].buttonStyle]"
					v-on:click="function(){
						player.subtabs[layer][name] = tab
						updateTabFormats()
						needCanvasUpdate = true
					}">{{(i18n(data[tab].name, data[tab].nameI18N)) ?? tab}}</button>
			</div>
		`
	},

	'tree-node': {
		props: ['layer', 'abb', 'size', 'prev'],
		template: `
		<button v-if="nodeShown(layer) && ((options.ch!==undefined && modInfo.internationalizationMod==true) || modInfo.internationalizationMod==false)"
			v-on:mouseover="player.hoverTab = layer"
			v-on:mouseleave="player.hoverTab = 'none'"
			v-bind:id="layer"
			v-on:click="function() {
				if(layer=='Information'){
					showTab('info-tab')
					getActiveClass('Information')
					return
				}
				if(layer=='Setting'){
					showTab('options-tab')
					getActiveClass('Setting')
					return
				}
				if(layer=='Changelog'){
					showTab('changelog-tab')
					getActiveClass('Changelog')
					return
				}
				if (shiftDown) player[layer].forceTooltip = !player[layer].forceTooltip
				else if(tmp[layer].isLayer) {
					if (tmp[layer].leftTab) {
						showNavTab(layer, prev)
						showTab('none')
					}
					else
						showTab(layer, prev)
				}
				else {run(layers[layer].onClick, layers[layer])}

				if(player[layer].unlocked){
					getActiveClass(layer)
				}
			}"
			v-bind:class="{
				treeNode: tmp[layer].isLayer,
				treeButton: !tmp[layer].isLayer,
				smallNode: size == 'small',
				[layer]: true,
				tooltipBox: false,
				forceTooltip: player[layer].forceTooltip,
				ghost: tmp[layer].layerShown == 'ghost',
				hidden: !tmp[layer].layerShown,
				locked: tmp[layer].isLayer ? !(player[layer].unlocked || tmp[layer].canReset) : !(tmp[layer].canClick),
				notify: tmp[layer].notify && player[layer].unlocked,
				resetNotify: tmp[layer].prestigeNotify,
				can: ((player[layer].unlocked || tmp[layer].canReset) && tmp[layer].isLayer) || (!tmp[layer].isLayer && tmp[layer].canClick),
				front: !tmp.scrolled,
				active: player.tab==layer,
				small: tmp[layer].small
			}"
			v-bind:style="constructNodeStyle(layer)">
			<span style="font-family: cursive;" v-html="(abb !== '' && tmp[layer].image === undefined) ? (abb+(tmp[layer].notify && player[layer].unlocked?'<red>!</red>':'')) : '&nbsp;'"></span>
			<node-mark :layer='layer' :data='tmp[layer].marked'></node-mark>
		</button>
		`
	},
	
	'layer-tab': {
		props: ['layer', 'back', 'spacing', 'embedded'],
		template: `<div v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]">
		<div v-if="!tmp[layer].tabFormat">
            <div v-html="getPointsDisplay()"></div>
			<infobox v-if="tmp[layer].infoboxes" :layer="layer" :data="Object.keys(tmp[layer].infoboxes)[0]":key="this.$vnode.key + '-info'"></infobox>
			<main-display v-bind:style="tmp[layer].componentStyles['main-display']" :layer="layer"></main-display>
			<div v-if="tmp[layer].type !== 'none'">
				<prestige-button v-bind:style="tmp[layer].componentStyles['prestige-button']" :layer="layer"></prestige-button>
			</div>
			<resource-display v-bind:style="tmp[layer].componentStyles['resource-display']" :layer="layer"></resource-display>
			<milestones v-bind:style="tmp[layer].componentStyles.milestones" :layer="layer"></milestones>
			<div v-if="Array.isArray(tmp[layer].midsection)">
				<column :layer="layer" :data="tmp[layer].midsection" :key="this.$vnode.key + '-mid'"></column>
			</div>
			<clickables v-bind:style="tmp[layer].componentStyles['clickables']" :layer="layer"></clickables>
			<buyables v-bind:style="tmp[layer].componentStyles.buyables" :layer="layer"></buyables>
			<upgrades v-bind:style="tmp[layer].componentStyles['upgrades']" :layer="layer"></upgrades>
			<challenges v-bind:style="tmp[layer].componentStyles['challenges']" :layer="layer"></challenges>
			<achievements v-bind:style="tmp[layer].componentStyles.achievements" :layer="layer"></achievements>
			<br><br>
		</div>
		<div v-if="tmp[layer].tabFormat">
			<column :layer="layer" :data="tmp[layer].tabFormat" :key="this.$vnode.key + '-col'"></column>
			<div v-else>
				<div class="upgTable" v-bind:style="{'padding-top': (embedded ? '0' : '25px'), 'margin-top': (embedded ? '-10px' : '0'), 'margin-bottom': '24px'}">
					<tab-buttons v-bind:style="tmp[layer].componentStyles['tab-buttons']" :layer="layer" :data="tmp[layer].tabFormat" :name="'mainTabs'"></tab-buttons>
				</div>
				<layer-tab v-if="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :layer="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :embedded="true" :key="this.$vnode.key + '-' + layer"></layer-tab>
				<column v-else :layer="layer" :data="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].content" :key="this.$vnode.key + '-col'"></column>
			</div>
		</div></div>
			`
	},

	'overlay-head': {
		template: `
		`
    },

    'info-tab': {
        template: `
        <div><br><br><br>
        <h1>{{i18n(modInfo.name, modInfo.nameI18N)}}</h1>
        <br><br><br>

        <h2>{{i18n("参与人员", "Authors", false)}}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("本模组作者", "Mod Author", false)}}:</h3><br>
			{{ modInfo.author }}<br><br>
			<h6 style="color:#aaa">({{i18n("本Mod基于辉影神秘的The Modding Table制作", "Based On Shinwmyste\'s The Modding Table", false)}})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("模组页作者", "The Modding Table Author", false)}}:</h3><br>
			辉影神秘<br><br><h6 style="color:#aaa">({{i18n("制作", "Developed", false)}} The Modding Table <a v-bind:href="'https://github.com/shenmi124/The-Modding-Table/blob/main/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '10px', 'display': 'inline'}">{{TMT_VERSION.newtmtNum}}</a>)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("模组页版本", "The Modding Table Version", false)}}:</h3><br>
			<a v-bind:href="'https://github.com/shenmi124/The-Modding-Table/blob/main/changelog.md'" target="_blank" class="link" v-bind:style = "{'display': 'inline'}">{{TMT_VERSION.newtmtNum}}</a><br><br>
			<h6 style="color:#aaa">({{i18n("同时感谢QwQe308的参与制作", "Also Thanks To QwQe308 For Their Help", false)}})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("模板支持", "Original TMT Author", false)}}:</h3><br>
			Acamaeda<br><br>
			<h6 style="color:#aaa">(The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '10px', 'display': 'inline'}">{{TMT_VERSION.tmtNum}}</a>)</h6>
		</div>
		<br><br><br><br>
		
        <h2>{{i18n("其他页面", "Other Pages", false)}}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("更新日志", "Changelog", false)}}:</h3><br>
			<a class="link" onclick="showTab('changelog-tab');getActiveClass('Changelog')">{{i18n("点击跳转", "Click Here", false)}}</a><br>
			<h6 style="color:#aaa">({{i18n("其实也可以点右上角的版本号", "The Top-Right Version Button Matters", false)}})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("辉影神秘的Discord", "Shinwmyste's Discord", false)}}:</h3><br>
			<a class="link" href="https://discord.gg/DTJYvatRQA" target="_blank">{{i18n("点击跳转", "Click Here", false)}}</a><br>
			<h6 style="color:#aaa">({{i18n("加入DC群", "Join Discord", false)}})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("QQ群", "QQ Group", false)}}:</h3><br>
			<a class="link" href="https://qm.qq.com/q/axo4Pc8xvG" target="_blank">{{i18n("点击跳转", "Click Here", false)}}</a><br>
			<h6 style="color:#aaa"><s>({{i18n("快点来,非常好玩(确信)", "I know you dont use this", false)}})</s></h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("捐助页面", "Donate Page", false)}}:</h3><br>
			<a class="link" href="https://afdian.com/a/Shinwmyste" target="_blank">{{i18n("点击跳转", "Click Here", false)}}</a><br>
			<h6 style="color:#aaa">($_$)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{i18n("模组树Discord", "The Modding Tree Discord", false)}}:</h3><br>
			<a class="link" href="https://discord.gg/F3xveHV" target="_blank">{{i18n("点击跳转", "Click Here", false)}}</a><br>
			<h6 style="color:#aaa">({{i18n("就是这些", "That\'s all", false)}})</h6>
		</div>
    `
    },

    'options-tab': {
        template: ` 
        <table><br><br><br><br><br><br>
            <tr>
				<td><h1>{{i18n('存档', 'Save', false)}}&nbsp;&nbsp;&nbsp;</h1></td>
				<td><button class="opt" onclick="save()">{{i18n('本地存档', 'Save', false)}}</button></td>
                <td><button class="opt" onclick="toggleOpt('autosave')">{{i18n('自动存档', 'AutoSave', false)}}: {{ options.autosave?(i18n("已开启", "ON", false)):(i18n("已关闭", "OFF", false)) }}</button></td>
                <td><button class="opt" onclick="hardReset()">{{i18n('硬重置(删除存档)', 'HardReset', false)}}</button></td>
				<td><button class="opt" onclick="exportSave()">{{i18n('导出存档(复制到黏贴板)', 'Export', false)}}</button></td>
				<td><button class="opt" onclick="importSave()">{{i18n('导入存档', 'Import', false)}}</button></td>
			</tr><br>
			<tr>
				<td><h1>{{i18n('优化', 'Qol', false)}}&nbsp;&nbsp;&nbsp;</h1></td>
                <td><button class="opt" onclick="toggleOpt('offlineProd')">{{i18n('离线进度', 'Offline Prod', false)}}: {{ options.offlineProd?(i18n("已开启", "ON", false)):(i18n("已关闭", "OFF", false)) }}</button></td>
                <td><button class="opt" onclick="toggleOpt('mouse')">{{i18n('优化鼠标操作', 'Optimized mouse operation', false)}}: {{ options.mouse ? (i18n("已开启", "ON", false)):(i18n("已关闭", "OFF", false))}}</button></td>
            </tr><br>
            <tr>
				<td><h1>{{i18n('显示', 'Display', false)}}&nbsp;&nbsp;&nbsp;</h1></td>
                <td><button class="opt" onclick="toggleOpt('hideChallenges')">{{i18n('已完成挑战', 'Completed Challenges', false)}}: {{ options.hideChallenges?(i18n("隐藏", "HIDDI18N", false)):(i18n("显示", "SHOWN", false)) }}</button></td>
                <td><button class="opt" onclick="adjustMSDisp()">{{ i18n('显示里程碑', 'Show Milestones', false) }}: {{ i18n(MS_DISPLAYS[MS_SETTINGS.indexOf(options.msDisplay)], MS_DISPLAYS_I18N[MS_SETTINGS.indexOf(options.msDisplay)], false)}}</button></td>
                <td><button class="opt" onclick="toggleOpt('cursive')">{{i18n('全页面草书字体', 'Cursive Font', false)}}: {{ options.cursive?(i18n("已开启", "ON", false)):(i18n("已关闭", "OFF", false)) }}<br><h6>{{ i18n("(注: 字体会根据你的浏览器的默认字体而改变, 对于不同浏览器可能会有不同效果, 对于部分浏览器可能无效)", "(Note: The font will change according to your browser's default font. Effects may vary across different browsers, and may not work in some browsers)", false)}}</h6></button></td>
			</tr> <br>
			<tr>
				<td><h1>{{modInfo.internationalizationMod?(i18n('语言', 'language', false)):""}}&nbsp;&nbsp;&nbsp;</h1></td>
				<td><button class="opt" v-if="modInfo.internationalizationMod==true" onclick="
                options.ch=!options.ch;
                needsCanvasUpdate = true; document.title = (i18n(modInfo.name, modInfo.nameI18N));
                VERSION.withName = VERSION.withoutName + (VERSION.name ? ': ' + (i18n(VERSION.name, VERSION.nameI18N)) : '');
				setupModInfo();
                ">{{i18n('语言', 'Language', false)}}: {{i18n("中文(Chinese)", "英文(English)", false)}}</button></td>
			</tr>
        </table>`
    },

    'back-button': {
        template: `
        <button v-bind:class="back" onclick="goBack()">←</button>
        `
    },


	'tooltip' : {
		props: ['text'],
		template: `<div class="tooltip" v-html="text"></div>
		`
	},

	'node-mark': {
		props: {'layer': {}, data: {}, offset: {default: 0}, scale: {default: 1}},
		template: `<div v-if='data'>
			<div v-if='data === true' class='star' v-bind:style='{position: "absolute", left: (offset-10) + "px", top: (offset-10) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}'></div>
			<img v-else class='mark' v-bind:style='{position: "absolute", left: (offset-22) + "px", top: (offset-15) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}' v-bind:src="data"></div>
		</div>
		`
	},

	'particle': {
		props: ['data', 'index'],
		template: `<div><div class='particle instant' v-bind:style="[constructParticleStyle(data), data.style]" 
			v-on:click="run(data.onClick, data)"  v-on:mouseenter="run(data.onMouseOver, data)" v-on:mouseleave="run(data.onMouseLeave, data)" ><span v-html="data.text"></span>
		</div>
		<svg version="2" v-if="data.color">
		<mask v-bind:id="'pmask' + data.id">
        <image id="img" v-bind:href="data.image" x="0" y="0" :height="data.width" :width="data.height" />
    	</mask>
    	</svg>
		</div>
		`
	},

	'bg': {
		props: ['layer'],
		template: `<div class ="bg" v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]"></div>
		`
	}

}