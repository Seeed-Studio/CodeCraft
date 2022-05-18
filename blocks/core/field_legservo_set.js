'use strict';

goog.provide('Blockly.FieldLegservoSet');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

/**
 * 构造函数
 */
Blockly.FieldLegservoSet = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'x': '5px',
        'y': '5px',
        'height': '20px',
        'width': '20px',
      });
    value = '8'
    Blockly.FieldLegservoSet.superClass_.constructor.call(this, value);
}

// 继承 Blockly.Field
goog.inherits(Blockly.FieldLegservoSet, Blockly.Field);

// 
Blockly.FieldLegservoSet.fromJson = function (options) {
    return new Blockly.FieldLegservoSet(options['default']);
};

/**
 * 初始化函数
 */
Blockly.FieldLegservoSet.prototype.init = function (block) {
    this.className_ += ' blocklyDropdownText';
    this.size_ = new goog.math.Size(30, 30);

    Blockly.FieldLegservoSet.superClass_.init.call(this);

    this.selectedIndex = 0;
    this.gridMap = null;
    this.drawSelectBox(); // 画边框
    this.drawSelectIcon();// 画icon
    this.keyData = null;
}

Blockly.FieldLegservoSet.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '40rem';
    box.style.height = '28rem';
    box.style.paddingTop = '1px';
    // box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '0.625rem';
    // box.style.padding = '1rem';
    box.style.position = 'relative';
    box.style.boxSizing = 'content-box';
    box.style.backgroundColor = '#FFF';
    box.appendChild(this.createCloseBt());
    box.appendChild(this.createLegservoSet());
    box.appendChild(this.createLegservoSetNum());
    return box;
}

Blockly.FieldLegservoSet.prototype.createLegservoSet = function () {
    let div = document.createElement('div');
    div.style.width = '40rem';
    div.style.height = '28rem';
    div.style.position = 'absolute';

    div.appendChild(this.createBittleBody());
    div.appendChild(this.createBittleHead());
    div.appendChild(this.createBittleRightForelegLower());
    div.appendChild(this.createBittleRightForelegUpper());
    div.appendChild(this.createBittleLeftForelegLower());
    div.appendChild(this.createBittleLeftForelegUpper());
    div.appendChild(this.createBittleLeftHindlegLower());
    div.appendChild(this.createBittleLeftHindlegUpper());
    div.appendChild(this.createBittleRightHindlegLower());
    div.appendChild(this.createBittleRightHindlegUpper());


    return div
}
Blockly.FieldLegservoSet.prototype.createLegservoSetNum = function () {
    let div = document.createElement('div');
    div.style.width = '40rem';
    div.style.height = '28rem';
    div.style.position = 'absolute';
    div.style.zIndex = '999'
    div.appendChild(this.rightForelegLowerNum());
    div.appendChild(this.rightForelegUpperNum());
    div.appendChild(this.leftForelegLowerNum());
    div.appendChild(this.leftForelegUpperNum());
    div.appendChild(this.leftHindlegLowerNum());
    div.appendChild(this.leftHindlegUpperNum());
    div.appendChild(this.rightHindlegLowerNum());
    div.appendChild(this.rightHindlegUpperNum());


    return div
}

Blockly.FieldLegservoSet.prototype.createBittleBody = function () {
    let body = document.createElement('div');
    body.style.width = '17.8rem';
    body.style.height = '7rem';
    body.style.position = 'absolute';
    body.style.top = '7rem';
    body.style.left = '13rem';
    
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/body.png")';
    return body
}

Blockly.FieldLegservoSet.prototype.createBittleHead = function () {
    let body = document.createElement('div');
    body.style.width = '7.8rem';
    body.style.height = '6.7rem';
    body.style.position = 'absolute';
    body.style.top = '4.1rem';
    body.style.left = '8rem';
    
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/head.png")';
    return body
}

Blockly.FieldLegservoSet.prototype.createBittleRightForelegLower = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '8.4rem';
    body.style.position = 'absolute';
    body.style.top = '12rem';
    body.style.left = '16rem';
    body.style.transform = 'rotate(-25deg)'
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/foreleg.png")';
    return body
}

Blockly.FieldLegservoSet.prototype.createBittleRightForelegUpper = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '8.4rem';
    body.style.position = 'absolute';
    body.style.top = '17rem';
    body.style.left = '15rem';
    body.style.transform = 'rotate(45deg)'
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/Leftforeleg.png")';
    return body
}

Blockly.FieldLegservoSet.prototype.createBittleLeftForelegLower = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '5.65rem';
    body.style.position = 'absolute';
    body.style.top = '13rem';
    body.style.left = '13rem';
    body.style.transform = 'rotate(-14deg)'
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/Rightforeleg.png")';
    return body
}
Blockly.FieldLegservoSet.prototype.createBittleLeftForelegUpper = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '8.4rem';
    body.style.position = 'absolute';
    body.style.top = '14.5rem';
    body.style.left = '10.5rem';
    body.style.transform = 'rotate(65deg)'
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/Leftforeleg.png")';
    return body
}
Blockly.FieldLegservoSet.prototype.createBittleLeftHindlegLower = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '5.65rem';
    body.style.position = 'absolute';
    body.style.top = '12rem';
    body.style.left = '24rem';
    body.style.transform = 'rotate(-14deg)'
    
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/Rightforeleg.png")';
    return body
}
Blockly.FieldLegservoSet.prototype.createBittleLeftHindlegUpper = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '8.4rem';
    body.style.position = 'absolute';
    body.style.top = '14.5rem';
    body.style.left = '22rem';
    body.style.transform = 'rotate(48deg)'
    
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/Leftforeleg.png")';
    return body
}
Blockly.FieldLegservoSet.prototype.createBittleRightHindlegLower = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '8.4rem';
    body.style.position = 'absolute';

    body.style.top = '12rem';
    body.style.left = '26rem';
    body.style.transform = 'rotate(-14deg)'
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/foreleg.png")';
    return body
}
Blockly.FieldLegservoSet.prototype.createBittleRightHindlegUpper = function () {
    let body = document.createElement('div');
    body.style.width = '2rem';
    body.style.height = '8.4rem';
    body.style.position = 'absolute';
    body.style.top = '17rem';
    body.style.left = '24rem';
    body.style.transform = 'rotate(45deg)'
    
    body.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/Leftforeleg.png")';
    return body
}

Blockly.FieldLegservoSet.prototype.rightForelegLowerNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '12.5rem';
    body.style.left = '15rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '8';
    body.addEventListener('click', (function (e) {
        this.setValue('8');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.rightForelegUpperNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '18rem';
    body.style.left = '17.5rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '12';
    body.addEventListener('click', (function (e) {
        this.setValue('12');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.leftForelegLowerNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '13rem';
    body.style.left = '12.8rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '9';
    body.addEventListener('click', (function (e) {
        this.setValue('9');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.leftForelegUpperNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '16.5rem';
    body.style.left = '13.5rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '13';
    body.addEventListener('click', (function (e) {
        this.setValue('13');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.leftHindlegLowerNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '12rem';
    body.style.left = '23.6rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '10';
    body.addEventListener('click', (function (e) {
        this.setValue('10');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.leftHindlegUpperNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '15.5rem';
    body.style.left = '24.5rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '14';
    body.addEventListener('click', (function (e) {
        this.setValue('14');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.rightHindlegLowerNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '12rem';
    body.style.left = '25.5rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '11';
    body.addEventListener('click', (function (e) {
        this.setValue('11');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.rightHindlegUpperNum = function () {
    let body = document.createElement('div');
    body.style.width = '1.73rem';
    body.style.height = '1.73rem';
    body.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    body.style.borderRadius = '50%';
    body.style.color = '#E45757';
    body.style.lineHeight = '1.73rem';
    body.style.textAlign = 'center';
    body.style.border = '0.05rem dashed #EB5656'
    body.style.position = 'absolute';
    body.style.top = '18rem';
    body.style.left = '26.5rem';
    body.style.cursor = 'pointer';
    body.innerHTML = '15';
    body.addEventListener('click', (function (e) {
        this.setValue('15');
        Blockly.CcModal.hide(e);
    }).bind(this));
    return body
}

Blockly.FieldLegservoSet.prototype.createCloseBt = function () {
    let closeBt = document.createElement('div');
    closeBt.style.position = 'absolute';
    closeBt.style.right = '0.625rem';
    closeBt.style.top = '0.625rem';
    closeBt.style.width = '1rem';
    closeBt.style.height = '1rem';
    closeBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_del@2x.png")';
    closeBt.style.backgroundSize = '1rem';
    closeBt.style.cursor = 'pointer';
    closeBt.style.zIndex = '9999';
    closeBt.addEventListener('click', (e) => {
        Blockly.CcModal.hide(e);
    });
    return closeBt;
}


Blockly.FieldLegservoSet.prototype.showEditor_ = function () {
    let contentDiv = Blockly.CcModal.getContentDiv();
    let field = this.createField()
    contentDiv.appendChild(field);
    Blockly.CcModal.show();
}

/**
 * 画边框
 */
Blockly.FieldLegservoSet.prototype.drawSelectBox = function () {
    this.box_ = Blockly.utils.createSvgElement('rect', {
        'rx': Blockly.BlockSvg.CORNER_RADIUS,
        'ry': Blockly.BlockSvg.CORNER_RADIUS,
        'x': 0,
        'y': 0,
        'width': this.size_.width,
        'height': this.size_.height,
        'stroke': this.sourceBlock_.getColourTertiary(),
        'fill': this.sourceBlock_.getColour(),
        'class': 'blocklyBlockBackground',
        'fill-opacity': 1
    }, null);
    
    this.fieldGroup_.insertBefore(this.box_, this.textElement_);
}

/**
 * 画icon
 */
Blockly.FieldLegservoSet.prototype.drawSelectIcon = function () {
    this.textElement_.parentNode.appendChild(this.iconImage_);
}

/**
 * 获取值
 */
Blockly.FieldLegservoSet.prototype.getValue = function () {
    return this.value_;
};

/**
 * 设置值
 */
Blockly.FieldLegservoSet.prototype.setValue = function (newValue) {
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue
    this.setText(newValue);
}

/**
 * 注册
 */
Blockly.Field.register('field_legservo_set', Blockly.FieldLegservoSet);
