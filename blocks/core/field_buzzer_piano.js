'use strict';

goog.provide('Blockly.FieldBuzzerNote');
goog.require('Blockly.Field');
goog.require('Blockly.utils');
goog.require('Blockly.CcModal');


/**
 * 构造函数 //  field_buzzer_note
 */

Blockly.FieldBuzzerNote = function (options) {
    this.notes_ = options;
    Blockly.FieldBuzzerNote.superClass_.constructor.call(this, this.notes_[7].value);
    //更新缓存数据
    this.cachedata_value = this.notes_[7].value;
    // cachedata_value_workspace = 

};
goog.inherits(Blockly.FieldBuzzerNote, Blockly.Field);

Blockly.FieldBuzzerNote.fromJson = function (options) {
    return new Blockly.FieldBuzzerNote(options['options']);
};
// /**
//  * 初始化函数
//  */
//工作区数据缓存
Blockly.FieldBuzzerNote.prototype.cachedata_value_workspace = null

Blockly.FieldBuzzerNote.prototype.init = function (block) {
    if (this.fieldGroup_) {
        return;
    }
    this.className_ += ' blocklyDropdownText';
    Blockly.FieldBuzzerNote.superClass_.init.call(this);
    this.noteBox = document.createElement('div');

    this.box_ = Blockly.utils.createSvgElement('rect', {
        'rx': Blockly.BlockSvg.CORNER_RADIUS,
        'ry': Blockly.BlockSvg.CORNER_RADIUS,
        'x': 0,
        'y': 0,
        'width': '100px',
        'stroke': this.sourceBlock_.getColourTertiary(),
        'fill': this.sourceBlock_.getColour(),
        'class': 'blocklyBlockBackground',
        'fill-opacity': 1
    }, null);
    this.fieldGroup_.insertBefore(this.box_, this.textElement_);
}

/**
 * 设置字段值
 */
Blockly.FieldBuzzerNote.prototype.setValue = function (newValue) {
    if (newValue === null || newValue === this.value_) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    this.cachedata_value = newValue;
    var text = '';
    for (var i = 0; i < this.notes_.length; i++) {
        if (this.notes_[i].value === newValue) {
            text = this.notes_[i].text;
            break;
        }
    }
    this.setText(text);
};

/** 
*适配
*/
Blockly.FieldBuzzerNote.prototype.fixSize = function () {
    // 适配,计算了多数常用机型取得范围
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    if (width <= 1000) {
        var s = 0.7;
    } else if (width > 1000) {
        var s = 0.9;
    }
    return { width, height, s }
}
/**
 * 获取字段值
 */
Blockly.FieldBuzzerNote.prototype.getValue = function () {
    return this.value_;
};
Blockly.FieldBuzzerNote.prototype.setValue_workspace = function (value) {
    this.cachedata_value_workspace = value;
}
Blockly.FieldBuzzerNote.prototype.setValue_cachedata = function () {
    this.cachedata_value = this.cachedata_value_workspace;
    this.setValue(this.cachedata_value);
}
/**
 * 点击展开函数
 */
Blockly.FieldBuzzerNote.prototype.showEditor_ = function () {
    this.cachedata_value_workspace = this.getValue();

    let box = document.createElement('div');
    box.style.width = '42rem';
    box.style.height = '19rem';
    box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '1rem';
    box.style.padding = '1rem';
    box.style.boxSizing = 'border-box';

    let fieldBox = document.createElement('div');
    fieldBox.style.width = '100%';
    fieldBox.style.height = '100%';
    fieldBox.style.position = 'relative';
    fieldBox.style.backgroundColor = '#FFF';
    box.appendChild(fieldBox);

    var contentDiv = Blockly.CcModal.getContentDiv();
    contentDiv.appendChild(box);

    Blockly.CcModal.show(this.onHide_.bind(this));




    const noteTitleBox = document.createElement('div');
    noteTitleBox.style.width = '37rem';
    noteTitleBox.style.position = 'absolute';
    noteTitleBox.style.left = '1.5rem';
    noteTitleBox.style.top = '4rem';

    fieldBox.appendChild(noteTitleBox);


    // header
    const headerDivSize = {
        width: `calc(100% / 3)`,
        height: `2rem`,
        borderRadius: `0.2rem 0.2rem 0 0`,
        color: '#fff',
    }
    const headerContent = [
        Blockly.Msg.BUZZER_TONE_LOW, Blockly.Msg.BUZZER_TONE_MIDDLE, Blockly.Msg.BUZZER_TONE_HIGH
    ]

    const headerColor = [
        "#50D7D7", "#4AA0EE", "#A28FFF"
    ]
    this.headerColor = headerColor;
    for (let i = 0; i < 3; i++) {
        let headerDiv = document.createElement("div");
        headerDiv.style.width = headerDivSize.width;
        headerDiv.style.height = headerDivSize.height;
        headerDiv.style.borderRadius = headerDivSize.borderRadius;
        headerDiv.style.background = headerColor[i];
        headerDiv.style.lineHeight = headerDivSize.height;
        headerDiv.innerHTML = headerContent[i];
        headerDiv.style.textAlign = 'center';
        headerDiv.style.float = 'left';
        headerDiv.style.color = headerDivSize.color;
        headerDiv.style.fontSize = `0.8rem`;
        noteTitleBox.appendChild(headerDiv);
    }
    fieldBox.appendChild(this.initNote());

    // 生成底部提示文字
    this.textTip = document.createElement("div");
    this.textTip.style.width = '20rem';
    this.textTip.style.height = '4rem';
    this.textTip.style.position = 'absolute';
    this.textTip.style.top = '0';
    this.textTip.style.left = '10rem';
    this.textTip.style.lineHeight = '3rem'
    this.textTip.style.textAlign = 'center';
    this.textTip.style.color = '#fff';
    this.textTip.style.backgroundSize = 'contain';
    this.textTip.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/top@2x.png")';
    this.textTip.innerText = '' + this.notes_[this.cachedata_value_workspace - 1].text;

    fieldBox.appendChild(this.textTip);
    fieldBox.appendChild(this.createConfirmBt());
    fieldBox.appendChild(this.createCloseBt());

    

}

Blockly.FieldBuzzerNote.prototype.createCloseBt = function () {
    let closeBt = document.createElement('div');
    closeBt.style.position = 'absolute';
    closeBt.style.right = '1rem';
    closeBt.style.top = '1rem';
    closeBt.style.width = '1rem';
    closeBt.style.height = '1rem';
    closeBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_del@2x.png")';
    closeBt.style.backgroundSize = '1rem';
    closeBt.style.cursor = 'pointer';
    closeBt.addEventListener('click', (e) => {
        Blockly.CcModal.hide(e);
    });
    return closeBt;
  }

Blockly.FieldBuzzerNote.prototype.createConfirmBt = function () {
    let bt = document.createElement('div');
    bt.style.width = '6rem';
    bt.style.height = '2rem';
    bt.style.borderRadius = '1rem';
    bt.style.position = 'absolute';
    bt.style.left = '50%';
    bt.style.transform = 'translate(-50%, 0)';
    bt.style.bottom = '1.5rem';
    bt.style.background = 'linear-gradient(90deg,rgba(74,156,240,1) 0%,rgba(81,221,212,1) 100%)';
    bt.style.cursor = 'pointer';

    let icon = document.createElement('div');
    icon.style.width = '6rem';
    icon.style.height = '2rem';
    icon.style.borderRadius = '1rem';
    icon.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_right@2x.png")';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.backgroundPosition = 'center';
    icon.style.backgroundSize = '1.5rem 1rem';

    bt.appendChild(icon);

    bt.addEventListener('click', (e) => {
        this.setValue_cachedata();
        Blockly.CcModal.hide(e);
    });
    return bt;

}

/**
 * 收起菜单函数
 */
Blockly.FieldBuzzerNote.prototype.onHide_ = function () {


};

// 生成琴键——事件
Blockly.FieldBuzzerNote.prototype.initNote = function () {
    let value = this.cachedata_value_workspace - 1;
    this.noteBox.innerHTML = '';
    this.noteBox.style.width = '37rem';
    this.noteBox.style.position = 'absolute';
    this.noteBox.style.left = '1.5rem';
    this.noteBox.style.top = '6rem';
    this.noteBox.style.boxSizing = 'border-box';
    let nodetxet = [
        'C', 'D', 'E', 'F', 'G', 'A', 'B',
        'C#', 'D#', 'F#', 'G#', 'A#',
    ];
    for (let i = 0; i < 21; i++) {
        let whiteNote = document.createElement("div");
        whiteNote.id = `id${i}`;
        whiteNote.style.width = 'calc(100% / 21)';
        whiteNote.style.height = '5.7rem';
        whiteNote.style.float = 'left';
        whiteNote.style.color = '#333333';
        whiteNote.style.boxSizing = 'border-box';
        whiteNote.style.borderWidth = i === value ? '0 2px 2px 2px' : '0 1px 1px 1px';
        whiteNote.style.borderStyle = 'solid';
        whiteNote.style.borderColor = i === value ? this.headerColor[parseInt(i / 7)] : '#333333';
        whiteNote.style.position = 'relative';
        whiteNote.style.borderBottomLeftRadius = '0.5rem';
        whiteNote.style.borderBottomRightRadius = '0.5rem';
        whiteNote.style.boxShadow = '0px 0.2rem #aaa';
        whiteNote.style.cursor = 'pointer';

        let nodeTextBox = document.createElement("div");
        nodeTextBox.innerText = nodetxet[i % 7];
        nodeTextBox.style.position = 'absolute';
        nodeTextBox.style.left = '0';
        nodeTextBox.style.bottom = '0';
        nodeTextBox.style.width = '100%';
        nodeTextBox.style.textAlign = 'center';

        whiteNote.appendChild(nodeTextBox);
        this.noteBox.appendChild(whiteNote);

        whiteNote.addEventListener("click", (e) => {
            let value = this.notes_[i].value;
            let text = this.notes_[i].text;
            this.setValue_workspace(value);
            this.textTip.innerText = '' + text;
            this.initNote();
        });
    }

    for (let i = 0; i < 15; i++) {

        let blackNote = document.createElement("div");
        blackNote.style.width = 'calc(100% / 21 * 2 / 3)';
        blackNote.style.height = '3.4rem';
        blackNote.style.color = '#fff';
        blackNote.style.boxSizing = 'border-box';
        blackNote.style.borderWidth = '0 2px 2px 2px';
        blackNote.style.borderStyle = 'solid';
        blackNote.style.borderColor = i + 21 === value ? this.headerColor[parseInt(i / 5)] : '#333333';
        blackNote.style.backgroundColor = '#333333';
        blackNote.style.position = 'absolute';
        blackNote.style.top = '0';
        blackNote.style.cursor = 'pointer';
        blackNote.style.borderBottomLeftRadius = '0.3rem';
        blackNote.style.borderBottomRightRadius = '0.3rem';

        let left = '';
        switch (i) {
            case 0: left = `calc(100% / 21 * 2 / 3 )`; break;
            case 1: left = `calc(100% / 21 * 5 / 3)`; break;
            case 2: left = `calc(100% / 21 * 11 / 3)`; break;
            case 3: left = `calc(100% / 21 * 14 / 3)`; break;
            case 4: left = `calc(100% / 21 * 17 / 3)`; break;

            case 5: left = `calc(100% / 21 * 23 / 3 )`; break;
            case 6: left = `calc(100% / 21 * 26 / 3)`; break;
            case 7: left = `calc(100% / 21 * 32 / 3)`; break;
            case 8: left = `calc(100% / 21 * 35 / 3)`; break;
            case 9: left = `calc(100% / 21 * 38 / 3)`; break;

            case 10: left = `calc(100% / 21 * 44 / 3 )`; break;
            case 11: left = `calc(100% / 21 * 47 / 3)`; break;
            case 12: left = `calc(100% / 21 * 53 / 3)`; break;
            case 13: left = `calc(100% / 21 * 56 / 3)`; break;
            case 14: left = `calc(100% / 21 * 59 / 3)`; break;
        }
        blackNote.style.left = left;

        let nodeTextBox = document.createElement("div");
        nodeTextBox.innerText = nodetxet[i % 5 + 7];
        nodeTextBox.style.position = 'absolute';
        nodeTextBox.style.left = '0';
        nodeTextBox.style.bottom = '0';
        nodeTextBox.style.width = '100%';
        nodeTextBox.style.fontSize = '12px';

        nodeTextBox.style.textAlign = 'center';
        blackNote.appendChild(nodeTextBox);
        this.noteBox.appendChild(blackNote);
        
        blackNote.addEventListener("click", (e) => {
            let value = this.notes_[i + 21].value;
            let text = this.notes_[i + 21].text;
            this.setValue_workspace(value);
            this.textTip.innerText = '' + text;
            this.initNote();
        });
    }

    return this.noteBox;
}


Blockly.Field.register('field_buzzer_note', Blockly.FieldBuzzerNote);