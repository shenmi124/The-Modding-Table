# 更新 TMT

假设你已经理解了 [the Getting Started Tutorial](getting-started.md)，并且使用 Github Desktop 和 VSCode。

当你想要更新 TMT 时，你需要:

1. 查看 changelog。如果这次更新需要你对代码做出修改，它会警告你的，你可以决定是否要更新。

2. 打开 Github Desktop，在中上点击 "fetch origin"。这会使 Github Desktop 获取到这次更新的信息

3. 点击中上部的 "current branch: master" 在提供的选项中，选择 "choose a branch to merge into master"。

4. 选择 upstream/master。不出所料的话，它将提示你存在冲突，但是我们有工具解决问题。点击 "Merge upstream/master into master"。

5. 如果你的代码和想要更新的代码中在同一个地方出现了不同的修改，就会产生冲突。点击 "open in Visual Studio Code" 去到第一个文件。 

6. 浏览整个文件，冲突的代码会以红色与绿色高亮标记出来，尽你所能，在不影响你自己代码功能的情况下解决冲突。

7. 重复这个过程，直到解决了所有冲突。

8. 做收尾工作。
