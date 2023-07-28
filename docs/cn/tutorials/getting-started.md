# 新手上路

这是对 TMT 开发文档的个人汉化版本。

在最简单的层次上使用 TMT 只需要将项目下载到本地，这同样有利于之后的开发。

使用 Github Desktop 可以显著降低使用 github 的难度（但是这与 gitee 无关）。

使用 github 的好处:

- 这使 TMT 的更新变得十分简单
- 使用 githack 或者 github.io 可以十分方便的部署你的 TMT 作品
- 强大的版本控制
- 高效的团队协作

## 安装 Github Desktop、Visual Studio Code，并建立 TMT 开发环境

1. 安装 [Github Desktop](https://desktop.github.com/) 与 [Visual Studio Code](https://code.visualstudio.com/)。

2. 在 github 创建账号。

3. 在浏览器中登录，并跳转到 [The Modding Tree page](https://github.com/Acamaeda/The-Modding-Tree)。右上角应当有一个名为 "fork" 的按钮。点击后你会获得属于自己的一个 TMT 分支，你可以对它随意操作。

4. 打开 Github Desktop 并登录。不用在意其他的东西，只需要点击 "clone a repository"。 一个 "repository" 可以被认为是一个 "Github project", 例如 TMT。 "Cloning" 则是将它的一个复制下载到电脑上.

5. 在仓库列表中寻找 TMT 并按下 "clone". 

6. 选择用以个人用处，然后无脑下一步。

### 使用仓库

1. 点击在右侧的 "show in explorer/finder"，之后打开文件夹中的 index.html。网页会在你的浏览器中被打开，这是你在本地调试项目的一个途径。

2. 若要编辑项目，在 Github Deskt 中选择 "open in VSCode"。

3. 在 VSCode 中打开 [mod.js](/js/mod.js)，在顶层中寻找 "modInfo" 对象。修改其中的游戏名和 id。 (接受任何字符串值，此项目主要用于标记存储文件，所以尽量不要使其重名或在中途修改)

4. 保存 [mod.js](/js/mod.js)，然后在浏览器中刷新 [index.html](/index.html) 标签页。标签页的名字以及 Info 中的信息都应该已经被修改了。 **你每次修改代码后都可以用刷新的方法简单快速的进行调试。**

5. 回到 Github Desktop。现在需要以 "commit" 的方式将做出的工作上传到 github。这会保存你的工作，同时在版本控制中为你的代码打上一个快照。之后你可以随时回到这个快照进行工作。

6. 在右下角，为你的工作做一个小总结，然后点击 "commit to master"。

7. 最后，在中上，点击 "push origin" 把你的工作推到 git 仓库里。

8. 现在，你可以在线浏览你的仓库，或将它分享给别人，只需要进入链接 https://raw.githack.com/[YOUR-GITHUB-USERNAME]/The-Modding-Tree/master/index.html 就可以了。 **如果只是在本地测试你的 mod，这一步并不需要进行。**

现在，你会用 github 了！下一篇教程在 [making a mod](making-a-mod.md)，或者你也可以查看 [documentation](/documentation/!general-info.md) 来理解 TMT 的系统是怎么工作的，并制作一个 mod。