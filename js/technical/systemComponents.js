function getActiveClass(layer){
	if(layer=='info-tab'){layer = 'Information'}
	if(layer=='options-tab'){layer = 'Setting'}
	if(layer=='changelog-tab'){layer = 'Changelog'}
	$("button").removeClass("active");
	$('#'+layer).addClass('active')
}

var systemComponents = {
	'tab-buttons': {
		props: ['layer', 'data', 'name'],
		template: `
			<div class="upgRow">
				<div v-for="tab in Object.keys(data)">
					<button v-if="data[tab].unlocked == undefined || data[tab].unlocked"
					v-bind:class="{
						tabButton: true,
						notify: subtabShouldNotify(layer, name, tab),
						resetNotify: subtabResetNotify(layer, name, tab),
						AcSub: tab==player.subtabs[layer][name]
					}"
					:class=""
					v-bind:id="[tab]"
					v-bind:style="[{'border-color': tmp[layer].color}, (data[tab].glowColor && subtabShouldNotify(layer, name, tab) ? {'box-shadow': 'var(--hqProperty2a), 0 0 20px '  + data[tab].glowColor} : {}), tmp[layer].componentStyles['tab-button'], data[tab].buttonStyle]"
					v-on:click="function(){
						player.subtabs[layer][name] = tab
						updateTabFormats()
						needCanvasUpdate = true
					}">{{tab}}</button>
			</div>
		`
	},

	'tree-node': {
		props: ['layer', 'abb', 'size', 'prev'],
		template: `
		<button v-if="nodeShown(layer) && ((options.ch!==undefined && modInfo.otherLanguageMod==true) || modInfo.otherLanguageMod==false)"
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

				getActiveClass(layer)
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
			}"
			v-bind:style="constructNodeStyle(layer)">
			<span v-html="(abb !== '' && tmp[layer].image === undefined) ? abb : '&nbsp;'"></span>
			<tooltip
      v-if="tmp[layer].tooltip != ''"
			:text="(tmp[layer].isLayer) ? (
				player[layer].unlocked ? (tmp[layer].tooltip ? tmp[layer].tooltip : formatWhole(player[layer].points) + ' ' + ((options.ch || modInfo.languageMod==false)?tmp[layer].resource:tmp[layer].resourceEN))
				: (tmp[layer].tooltipLocked ? (options.ch || modInfo.languageMod==false)? tmp[layer].tooltipLocked : tmp[layer].tooltipLockedEN : ((options.ch || modInfo.languageMod==false)?'达到 ':'Reach ') + formatWhole(tmp[layer].requires) + ' ' + ((options.ch || modInfo.languageMod==false)?tmp[layer].baseResource:tmp[layer].baseResourceEN) + ((options.ch || modInfo.languageMod==false)?' 以解锁 (你有 ':' to unlock (You have ') + formatWhole(tmp[layer].baseAmount) + ' ' + ((options.ch || modInfo.languageMod==false)?tmp[layer].baseResource:tmp[layer].baseResourceEN) + ')')
			)
			: (
				tmp[layer].canClick ? (tmp[layer].tooltip ? tmp[layer].tooltip : 'I am a button!')
				: (tmp[layer].tooltipLocked ? (options.ch || modInfo.languageMod==false)? tmp[layer].tooltipLocked : tmp[layer].tooltipLockedEN : 'I am a button!')
			)"></tooltip>
			<node-mark :layer='layer' :data='tmp[layer].marked'></node-mark></span>
		</button>
		`
	},
	
	'layer-tab': {
		props: ['layer', 'back', 'spacing', 'embedded'],
		template: `<div v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]" class="noBackground">
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
        <h1>{{(options.ch || modInfo.languageMod==false)?modInfo.name:modInfo.nameEN}}</h1>
        <br><br><br>

        <h2>{{ (options.ch || modInfo.languageMod==false)?"参与人员":"Authors" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"本模组作者":"Mod Author" }}:</h3><br>
			{{ modInfo.author }}<br><br>
			<h6 style="color:#aaa">({{ (options.ch || modInfo.languageMod==false)?"本Mod基于Shinwmyste的The Modding Table制作":"Based On Shinwmyste\'s The Modding Table" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"模组页主要作者":"The Modding Table Author" }}:</h3><br>
			Shinwmyste<br><br><h6 style="color:#aaa">({{ (options.ch || modInfo.languageMod==false)?"制作":"Developed" }} The Modding Tree <a v-bind:href="'https://github.com/shenmi124/The-Modding-Table/blob/main/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '10px', 'display': 'inline'}">{{TMT_VERSION.newtmtNum}}</a>)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"模组页主要帮助者":"The Modding Table Main Helper" }}:</h3><br>
			QwQe308<br><br>
			<h6 style="color:#aaa">({{ (options.ch || modInfo.languageMod==false)?"一些零碎的改动":"Made Some Minor Changes" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"模板支持":"Original TMT Author" }}:</h3><br>
			Acamaeda<br><br>
			<h6 style="color:#aaa">(The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '10px', 'display': 'inline'}">{{TMT_VERSION.tmtNum}}</a>)</h6>
		</div>
		<br><br><br><br>

        <h2>{{ (options.ch || modInfo.languageMod==false)?"统计数据":"Statistics" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"游戏时长":"Game Time" }}:</h3><br>
			{{ formatTime(player.timePlayed) }}<br><br>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ modInfo.pointsName }}:</h3><br>
			{{ format(player.points) }}<br><br>
		</div>

		<br><br><br><br>
		
        <h2>{{ (options.ch || modInfo.languageMod==false)?"其他页面":"Other Pages" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"Shinwmyste的Discord":"Shinwmyste's Discord" }}:</h3><br>
			<a class="link" href="https://discord.gg/DTJYvatRQA" target="_blank">{{ (options.ch || modInfo.languageMod==false)?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ (options.ch || modInfo.languageMod==false)?"快点来,非常好玩":"Enjoy Yourself There!" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"捐助页面":"Donate Page" }}:</h3><br>
			<a class="link" href="https://afdian.net/@Mysterious124" target="_blank">{{ (options.ch || modInfo.languageMod==false)?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">($_$)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"更新日志":"Changelog" }}:</h3><br>
			<a class="link" onclick="showTab('changelog-tab');getActiveClass('Changelog')">{{ (options.ch || modInfo.languageMod==false)?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ (options.ch || modInfo.languageMod==false)?"其实也可以点右上角的版本号":"The Top-Right Version Button Matters" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ (options.ch || modInfo.languageMod==false)?"模组树Discord":"The Modding Tree Discord" }}:</h3><br>
			<a class="link" href="https://discord.gg/F3xveHV" target="_blank">{{ (options.ch || modInfo.languageMod==false)?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ (options.ch || modInfo.languageMod==false)?"就是这些":"That\'s all" }})</h6>
		</div>
    `
    },

    'options-tab': {
        template: ` 
        <table><br><br><br><br><br><br>
            <tr>
				<td><button class="opt" onclick="save()">{{(options.ch || modInfo.languageMod==false)?'本地存档' :'Save'}}</button></td>
                <td><button class="opt" onclick="toggleOpt('autosave')">{{(options.ch || modInfo.languageMod==false)?'自动存档' :'AutoSave'}}: {{ options.autosave?((options.ch || modInfo.languageMod==false)?"已开启":"ON"):((options.ch || modInfo.languageMod==false)?"已关闭":"OFF") }}</button></td>
                <td><button class="opt" onclick="hardReset()">{{(options.ch || modInfo.languageMod==false)?'硬重置(删除存档)' :'HardReset'}}</button></td>
				<td><button class="opt" onclick="exportSave()">{{(options.ch || modInfo.languageMod==false)?'导出存档(复制到黏贴板)' :'Export'}}</button></td>
				<td><button class="opt" onclick="importSave()">{{(options.ch || modInfo.languageMod==false)?'导入存档':'Import'}}</button></td>
			</tr><br>
			<tr>
                <td><button class="opt" onclick="toggleOpt('offlineProd')">{{(options.ch || modInfo.languageMod==false)?'离线进度' :'Offline Prod'}}: {{ options.offlineProd?((options.ch || modInfo.languageMod==false)?"已开启":"ON"):((options.ch || modInfo.languageMod==false)?"已关闭":"OFF") }}</button></td>
            </tr><br>
            <tr>
                <td><button class="opt" onclick="toggleOpt('hideChallenges')">{{(options.ch || modInfo.languageMod==false)?'已完成挑战':'Completed Challenges'}}: {{ options.hideChallenges?((options.ch || modInfo.languageMod==false)?"隐藏":"HIDDEN"):((options.ch || modInfo.languageMod==false)?"显示":"SHOWN") }}</button></td>
                <td><button class="opt" onclick="adjustMSDisp()">{{(options.ch || modInfo.languageMod==false)?'显示里程碑':'Show Milestones'}}: {{(options.ch || modInfo.languageMod==false)? MS_DISPLAYS[MS_SETTINGS.indexOf(options.msDisplay)] : MS_DISPLAYS_EN[MS_SETTINGS.indexOf(options.msDisplay)]}}</button></td>
			</tr> <br>
			<tr>
                <td><button class="opt" onclick="toggleOpt('mouse')">{{(options.ch || modInfo.languageMod==false)?'优化鼠标操作' :'Optimized mouse operation'}}: {{ options.mouse ? ((options.ch || modInfo.languageMod==false)?"已开启":"ON"):((options.ch || modInfo.languageMod==false)?"已关闭":"OFF")}}</button></td>
			</tr><br>
			<tr>
				<td><button class="opt" v-if="modInfo.otherLanguageMod==true" onclick="
                options.ch=!options.ch;
                needsCanvasUpdate = true; document.title = ((options.ch || modInfo.languageMod==false)? modInfo.name : modInfo.nameEN);
                VERSION.withName = VERSION.withoutName + (VERSION.name ? ': ' + ((options.ch || modInfo.languageMod==false)? VERSION.name :VERSION.nameEN) : '');
				setupModInfo();
                ">{{(options.ch || modInfo.languageMod==false)?'语言':'Language'}}: {{ (options.ch || modInfo.languageMod==false)?"中文(Chinese)":"英文(English)" }}</button></td>
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