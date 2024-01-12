class createSkillMode {
    constructor () {
        this.createSkillList = [];
        this.createSkillInfo = {}
        this.isCreateSkill = false;//是否创建技能

    }

    setCreateSkillList(createSkillList){
        this.createSkillList  = createSkillList
    }
    setCreateSkillInfo(createSkillInfo){
        this.createSkillInfo  = createSkillInfo
    }
    setIsCreateSkill (isCreateSkill) {
        this.isCreateSkill = isCreateSkill;
    }
    clear(){
        this.createSkillList = [];
        this.isCreateSkill = false;
    }
}

export default createSkillMode;
