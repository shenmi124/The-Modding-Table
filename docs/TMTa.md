Node:
  - Actually, there is no difference between the use of TMTa and TMT, so please refer to the TMT documentation
  - TMT Documentation: https://github.com/Acamaeda/The-Modding-Tree/blob/master/docs/!general-info.md

True Doc:
  - Subtabs cannot be used, but you can still use tabFormat and microtabs
    - In TMTa, there are significant changes to tabFormat, which is why subtabs are not supported

  - An optional feature has been added to microtabs:
    - name (and nameI18N): This allows you to change the display name of microtabs without affecting their ID

	- Added two options related to table buttons(such as nodeStyle):
	  - activeStyle: It can change the tab style when it is selected
	  - hoverStyle: It can change the tab style when it is hovered over

	- Added a option related to upgrades:
	 	- hardAfford: If it returns true, the upgrade will be forced to be buyable

  - About i18n:
    - Added 2 optional in modInfo:
      - internationalizationMod: When true, the game will prompt players to select a (usually Chinese/English) at the start
      - changedDefaultLanguage: Changes the mod default language. false -> English, true -> Chinese
    - After use internationalizationMod:
      - Add I18N to any component option that may return text (e.g. nameI18N) as the second language (except for grid tooltip, which doesnt have corresponding bilingual support)
      - Use function i18n(text, otherText) to return text in two different languages. Typically, text is English and otherText is Chinese. If changedDefaultLanguage is true, its reversed
      - You can delete the second name from each option if internationalizationMod is not enabled.
      - TMT has too much text content, I cannot guarantee all text-returning options are covered, please let me know if there is anything missing

	 - Changed the save and encode mod.
		- Now allows other characters and languages (e.g. Chinese) in the save (for e.g. microtabs)

  - The remaining changes are documented in layer.js and mod.js



注:
  - 实际上TMTa和TMT并没有什么不同,所以你可以去看TMT的doc
    - TMT Doc 链接: https://github.com/Acamaeda/The-Modding-Tree/blob/master/docs/!general-info.md

真正的Doc:
  - Subtab不能被使用,但是你仍然可以使用tabFormat和microtabs
    - 因为TMTa对tabFormat改动比较大,导致在更新中Subtab失去了其应有的功能

  - 增加了一个可选项对于microtabs:
    - name(以及nameI18N): 可以修改microtabs的显示名称,同时不会改变其id
    
	- 增加了两个可选项对于tab button(用法同nodeStyle):
	  - activeStyle: 当tab被选中时生效的style
	  - hoverStyle: 当鼠标在tab上的时候生效的style
    
	- 增加了一个可选项对于upgrades:
	 	- hardAfford: 如果它返回为true,强制此升级可被购买

  - 关于i18n
    - 在modInfo中增添了2个配置:
      - internationalizationMod: 启用时,在游戏的一开始会询问玩家选择一项语言(中文/英文),并启用双语
      - changedDefaultLanguage: 改变模板默认语言,关闭时为英文,开启为中文
    - 启用i18n之后:
      - 在任意可能返回文字的组件可选项后加上I18N(例: nameI18N)作为第二种使用的语言(但是gird的tooltip是个例外,gird的tooltip没有对应的双语)
      - 使用函数i18n(text, otherText)返回两种不同语言的文字,通常来说text为英文,otherText为中文.如果changedDefaultLanguage启用则相反
      - 如果没有用到i18n你可以删除所有第二种语言的可选项
      - TMT的文本量太大了,我无法保证所有能够返回文字的可选项,如果有遗漏请告诉我

	 - 改变了模板的存档系统
		- 现在存档可以储存其他的图标或者语言(用于例如microtabs).

  - 其余改动均在layer.js和mod.js标有注释