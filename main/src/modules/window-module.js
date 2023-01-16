const shell = require('electron').shell;

class WindowModule {

  constructor(window) {
    /**
     * window窗口对象
     */
    this.window = window;
  }


  /**
   * 处理版本更新相关动作
   * @param {*} response 
   */
  onWindow({ action, args = {} }) {
    // 关闭窗口
    if (action === 'close') {
      this.send('close');
    }
    // 打开帮助文档（浏览器打开）
    else if (action === 'open-document') {
      this.handleOpenDocument(args);
    }
  }
  // 打开帮助文档
  handleOpenDocument(args) {
    if (args.url) {
      console.log(args)
      shell.openExternal(args.url);
    }
  }
}

export default WindowModule;