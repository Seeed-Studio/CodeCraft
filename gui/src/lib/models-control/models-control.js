class ModelsControl {

    constructor() {
        //图像模型数据
        this.imageModels = [];
        //物体模型数据
        this.objectModels = [];
        //训练模型数据
        this.trainModels = [];
        //cdc mark文件模型载入监听
        this.loadCdcModelsCallback = null;
        //创建技能模型数据
        this.createSkillModels = {
            newCreateAngleList:[{
                // --- 新建分界线 ---    --- 分界线 --- \\
                newHeaderNum:0,

                newLeftForelegUpperNum:0,// 右前腿上关节
                newLeftForelegLowerNum:0,// 右前腿下关节

                newRightForelegUpperNum:0, // 左前腿上关节
                newRightForelegLowerNum:0,// 左前腿下关节

                newLeftHindlegUpperNum:0,// 右后腿上关节
                newLeftHindlegLowerNum:0,// 右后腿下关节

                newRightHindlegUpperNum:0, // 左后腿上关节
                newRightHindlegLowerNum:0,// 左后腿下关节
                // --- 分界线 ---   --- 分界线 --- \\
                newHeaderInput:0,

                newLeftForelegLowerInput:0,// 右前腿上关节
                newLeftForelegUpperInput:0,// 右前腿下关节

                newRightForelegUpperInput:0, // 左前腿上关节
                newRightForelegLowerInput:0,// 左前腿下关节

                newLeftHindlegUpperInput:0,// 右后腿上关节
                newLeftHindlegLowerInput:0,// 右后腿下关节

                newRightHindlegUpperInput:0, // 左后腿上关节
                newRightHindlegLowerInput:0,// 左后腿下关节
            }],
            isCreateSkill:false,
            isCailbrate:false
        };
        this.isCailbrate = false;
        //cdc bittle文件模型载入监听
        this.loadBittleCdcModelsCallback = null;
    }

    /**
     * 载入cdc文件中模型数据
     * @param {*} param0 
     */
    loadCdcModels(imageModels = [], objectModels = [], trainModels = [], createSkillModels = []) {
        this.imageModels = imageModels;
        this.objectModels = objectModels;
        this.trainModels = trainModels;
        this.createSkillModels = createSkillModels
        if (this.loadCdcModelsCallback) {
            this.loadCdcModelsCallback(imageModels, objectModels, trainModels, createSkillModels);
        }
    }

    loadBittleCdcModels(createSkillModels = []) {
        this.createSkillModels = createSkillModels
        if (this.loadBittleCdcModelsCallback) {
            this.loadBittleCdcModelsCallback(createSkillModels);
        }
    }

    /**
     * 更新图像模型数据
     * @param {*} imageModels 
     */
    updateImageModels(imageModels = []) {
        this.imageModels = imageModels;
    }

    /**
     * 更新物体模型数据
     * @param {*} objectModels 
     */
    updateObjectModels(objectModels = []) {
        this.objectModels = objectModels;
    }

    /**
     * 更新训练模型数据
     * @param {*} objectModels 
     */
    updateTrainModels(trainModels = []) {
        this.trainModels = trainModels;
    }

    /**
     * 更新训练模型数据
     * @param {*} objectModels 
     */
    updateCreateSkillModels(createSkillModels = []) {
        this.createSkillModels = createSkillModels;
    }
    setIsCailbrate (isCailbrate) {
        this.isCailbrate = isCailbrate;
    }
    /**
     * 释放模型资源
     */
    dispose() {
        this.imageModels = [];
        this.objectModels = [];
        this.trainModels = [];
        this.createSkillModels = [];
    }

}

export default ModelsControl;
