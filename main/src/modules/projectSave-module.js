import fs from 'fs';
import { dialog } from 'electron';


class ProjectSaveModule {

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
  onProjectSave({ action, args = {} }) {
    // 保存
    if (action === 'save-project') {
      this.handleProjectSave(args);
    }
  }

  /**
   * 保存文件
   */
  handleProjectSave(args) {
    const { data, projectName, localProjectPath } = args;
    let buffer = Buffer.from(data);
    const options = {
      filters: [
        { name: '', extensions: ['cdc', 'sb3'] }
      ],
      defaultPath: projectName,
    }
    if (localProjectPath) {
      fs.writeFileSync(localProjectPath, buffer);
      this.send('project-path', localProjectPath);
    } else {
      dialog.showSaveDialog(this.window, options, (filename) => {
        if (filename) {
          this.currentProjectPath = filename;
          fs.writeFileSync(filename, buffer);
          this.send('project-path', filename);
        } else {
          // 失败的情况
          this.send('project-path', '');
        }
      });
    }
  }

}

export default ProjectSaveModule;