# Todo list before publishing the repo to public

[Starting an Open Source Project Guide](https://opensource.guide/starting-a-project) by Opensource.guide

## Code styles 代码格式规范
这部分应该放在contribution guide里，同时项目本身也要实践定好的规范

### 缩进
目前大部分文件是4空格缩进，但有的文件是2空格缩进，比如 `gui/src/components/datepicker-special` 最好统一下。

### 文件，函数，以及变量名
确定每种情况应当使用哪种命名法，比如驼峰，下划线，中划线

## Comments 注释

有很多注释只有中文，在发布前最好提供对应的英文注释。在必要的地方完善注释。

目前`gui/src/components`, `gui/src/containers`, `gui/src/lib/generators`下的注释已翻译完毕。

## Project architecture 项目结构

这部分可以放进README里面。简要介绍项目的大概结构，比如gui，blocks，vm这些文件夹都是干什么的，帮助contributer快速上手。不错的[例子](https://github.com/LLK/scratch-gui/wiki/Getting-Started#repos), [例子2](https://github.com/arduino/arduino-ide/blob/main/BUILDING.md)。

比如可以添加一个如何添加一个积木的例子，会涉及到哪些文件，大概进行什么操作。

## Contribution guide 贡献指南

也就是 `.github/CONTRIBUTING.md`

介绍贡献者如何贡献（如何提交pull request，如何提交issue），介绍项目期望哪种类型的贡献。

- 如何帮助这个项目（添加积木，修bug等等）
- 如何提交pull request(`PULL_REQUEST_TEMPLATE.yml`)
- 如何提交issue(`ISSUE_TEMPLATE.yml`)

`PULL_REQUEST_TEMPLATE.yml` 和 `ISSUE_TEMPLATE.yml` 应当放进.github文件夹里。网上有很多模板可以参考。

## Issue/Pull request tags 标签

每个issue和pull request都有一个或多个标签，比如Priority:High, In Progress, Topic:XXX, Status:XXX 等等。

## Others 其它

如果README中有哪部分太长的话可以考虑放进github wiki里面

## Before publish 发布之前

- 测试根据README是否能将项目跑起来
- 删除不必要的文件
- 如果打算在github上发布，测试issue和pull request template是否正确工作
- 联系法务部门确认可能的法律风险

## After publish 发布之后

至少有一个管理员负责审阅issue和pull request以及和项目相关的管理工作