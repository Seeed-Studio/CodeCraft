'use strict';

goog.provide('Blockly.FieldIRRemoteControl');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

/**
 * 构造函数
 */
Blockly.FieldIRRemoteControl = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'x': '3px',
        'y': '5px',
        'height': '20px',
        'width': '20px',
      });
      
    Blockly.FieldIRRemoteControl.superClass_.constructor.call(this, value);
}

// 继承 Blockly.Field
goog.inherits(Blockly.FieldIRRemoteControl, Blockly.Field);

// 
Blockly.FieldIRRemoteControl.fromJson = function (options) {
    let selectedIndex = options['default'];
    return new Blockly.FieldIRRemoteControl(selectedIndex);
};

/**
 * 初始化函数
 */
Blockly.FieldIRRemoteControl.prototype.init = function (block) {
    this.className_ += ' blocklyDropdownText';
    this.size_ = new goog.math.Size(30, 30);

    Blockly.FieldIRRemoteControl.superClass_.init.call(this);

    this.selectedIndex = 0;
    this.gridMap = null;
    this.drawSelectBox(); // 画边框
    this.drawSelectIcon();// 画icon
    this.keyData = null;
}

Blockly.FieldIRRemoteControl.prototype.getKeyData = function () {
    if (!this.keyData) {
        this.keyData = [{
            text: 'CH-', color: '#EB5656', index: '0'
        }, {
            text: 'CH', color: '#EB5656', index: '1'
        }, {
            text: 'CH+', color: '#EB5656', index: '2'
        }, {
            text: '|<<', color: '#3CA8DF', icon: 'codecraft/field/icon_qian.svg', index: '3'
        }, {
            text: '>>|', color: '#3CA8DF', icon: 'codecraft/field/icon_hou.svg', index: '4'
        }, {
            text: '>||', color: '#5FAD72', icon: 'codecraft/field/icon_play.svg', index: '5'
        }, {
            text: '-', color: '#5E66FF', icon: 'codecraft/field/icon_jian.svg', index: '6'
        }, {
            text: '+', color: '#5E66FF', icon: 'codecraft/field/icon_jia.svg', index: '7'
        }, {
            text: 'EQ', color: '#6A49BD', index: '8'
        }, {
            text: '0', color: '#535353', index: '9'
        }, {
            text: '100+', color: '#535353', index: '10'
        }, {
            text: '200+', color: '#535353', index: '11'
        }, {
            text: '1', color: '#535353', index: '12'
        }, {
            text: '2', color: '#535353', index: '13'
        }, {
            text: '3', color: '#535353', index: '14'
        }, {
            text: '4', color: '#535353', index: '15'
        }, {
            text: '5', color: '#535353', index: '16'
        }, {
            text: '6', color: '#535353', index: '17'
        }, {
            text: '7', color: '#535353', index: '18'
        }, {
            text: '8', color: '#535353', index: '19'
        }, {
            text: '9', color: '#535353', index: '20'
        }];
    }
    return this.keyData;
}

Blockly.FieldIRRemoteControl.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '18rem';
    box.style.height = '30.5rem';
    box.style.paddingTop = '1px';
    // box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '0.625rem';
    // box.style.padding = '1rem';
    box.style.position = 'relative';
    box.style.boxSizing = 'content-box';
    box.style.backgroundColor = '#FFF';
    box.appendChild(this.createCloseBt());
    box.appendChild(this.createGridMap());
    return box;
}

Blockly.FieldIRRemoteControl.prototype.createCloseBt = function () {
    let closeBt = document.createElement('div');
    closeBt.style.position = 'absolute';
    closeBt.style.right = '0.625rem';
    closeBt.style.top = '0.625rem';
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

Blockly.FieldIRRemoteControl.prototype.createGridMap = function () {
    this.gridMap = document.createElement('div');
    this.gridMap.style.margin = '1.25rem';
    this.gridMap.style.padding = '0.625rem';
    // this.gridMap.style.width = '11rem';
    this.gridMap.style.height = 'calc(100% - 2.5rem)';
    this.gridMap.style.border = 'solid 0.75rem #535353';
    this.gridMap.style.borderRadius = '1.25rem';
    this.gridMap.innerHTML = '';
    let keyData = this.getKeyData()
    for (let index = 0; index < keyData.length; index++) {
        let key = keyData[index];
        this.gridMap.appendChild(this.createkey(key));
    }
    return this.gridMap;
}

Blockly.FieldIRRemoteControl.prototype.createkey = function (key) {
    // let color = light ? '#00AAFF' : 'rgba(0,0,0,0)';
    let grid = document.createElement('div');
    grid.style.width = '3rem';
    grid.style.height = '3rem';
    // grid.style.border = '1px solid #C8E4FC';
    grid.style.borderRadius = '50%';
    grid.style.backgroundColor = key.color;
    grid.style.float = 'left';
    grid.style.boxSizing = 'border-box';
    grid.style.margin = '0.3125rem 0.625rem';
    // grid.setAttribute('data-light', light);
    // grid.setAttribute('data-x', x);
    // grid.setAttribute('data-y', y);
    grid.style.display = 'flex';
    grid.style.justifyContent = 'center';
    grid.style.alignItems = 'center';
    grid.style.fontSize = '1rem';
    grid.style.color = '#FFFFFF';
    grid.style.fontWeight = '500';
    grid.style.cursor = 'pointer';

    if (key.icon) {
        let icon = document.createElement('div');
        icon.style.width = '3rem';
        icon.style.height = '3rem';
        icon.style.borderRadius = '1rem';
        icon.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + key.icon+ '")';
        icon.style.backgroundRepeat = 'no-repeat';
        icon.style.backgroundPosition = 'center';
        // icon.style.backgroundSize = '1.5rem 1rem';
        grid.appendChild(icon);

    }else {
        grid.innerHTML = key.text;
    }

    grid.addEventListener('click', (function (e) {
        Blockly.CcModal.hide(e);
        this.setValue(key.index);
    }).bind(this));
    
    return grid;
}

Blockly.FieldIRRemoteControl.prototype.showEditor_ = function () {
    let contentDiv = Blockly.CcModal.getContentDiv();
    let field = this.createField()
    contentDiv.appendChild(field);
    Blockly.CcModal.show();
}

/**
 * 画边框
 */
Blockly.FieldIRRemoteControl.prototype.drawSelectBox = function () {
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
Blockly.FieldIRRemoteControl.prototype.drawSelectIcon = function () {
    this.textElement_.parentNode.appendChild(this.iconImage_);
}

/**
 * 获取值
 */
Blockly.FieldIRRemoteControl.prototype.getValue = function () {
    return this.value_;
};

/**
 * 设置值
 */
Blockly.FieldIRRemoteControl.prototype.setValue = function (newValue) {
    if (newValue === null) {
        return;
    }

    if ( this.value_!=null && newValue === this.value_) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    let key = this.getKeyData()[Number(newValue)];
    let showText = key.text;

    this.selectedIndex = newValue;
    if (key.icon) {
        this.setText('');
        if (key.text=='-') {
            this.iconImage_.setAttribute('height', '5px');
            this.iconImage_.setAttribute('y', '13px');
        }else {
            this.iconImage_.setAttribute('height', '20px');
            this.iconImage_.setAttribute('y', '5px');
        }
        this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', Blockly.mainWorkspace.options.pathToMedia + key.icon);
        this.iconImage_.setAttribute('transform', 'translate(0,0)');
        this.iconImage_.setAttribute('display', 'block');
    }else {
        this.iconImage_.setAttribute('display', 'none');
        this.setText(showText);
    }
    this.value_ = newValue;
}

/**
 * 注册
 */
Blockly.Field.register('field_ir_remotecontrol', Blockly.FieldIRRemoteControl);
