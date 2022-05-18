'use strict';

goog.provide('Blockly.FieldColorBar');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

Blockly.FieldColorBar = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'height': '30px',
        'width': '30px'
    });
    Blockly.FieldColorBar.superClass_.constructor.call(this, value);
    this.addArgType('color_bar');
}
goog.inherits(Blockly.FieldColorBar, Blockly.Field);

Blockly.FieldColorBar.SUPPORT_COLORS = ['#F50000', '#FBA700', '#FFF000', '#C2FF00', '#3DFF00', '#7BFFA9', '#38FFFF', '#0051FF', '#0000FF', '#6E00FF', '#F400CF', '#F50087', '#FFFFFF', '#000000']

Blockly.FieldColorBar.PROHIBIT_SVG =

    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
    '	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">\n' +
    '    <style type="text/css">\n' +
    '        .st0{fill:#ADB4D0;}\n' +
    '        .st1{fill:none;stroke:#ADB4D0;stroke-width:2;stroke-miterlimit:10;}\n' +
    '    </style>\n' +
    '    <g>\n' +
    '        <path class="st0" d="M12,2c5.51,0,10,4.49,10,10s-4.49,10-10,10S2,17.51,2,12S6.49,2,12,2 M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12\n' +
    '            s12-5.37,12-12S18.63,0,12,0L12,0z"/>\n' +
    '    </g>\n' +
    '    <line class="st1" x1="5" y1="20" x2="19" y2="3"/>\n' +
    '</svg>\n';

Blockly.FieldColorBar.fromJson = function (options) {
    return new Blockly.FieldColorBar(options['default']);
};

Blockly.FieldColorBar.prototype.init = function () {

    this.className_ += ' blocklyDropdownText';
    Blockly.FieldColorBar.superClass_.init.call(this);

    this.size_ = new goog.math.Size(30, 30);
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
    this.textElement_.parentNode.appendChild(this.iconImage_);

    this.toolsDiv = null;

    this.shapeData = JSON.parse(this.value_);
    //颜色选择默认颜色
    this.colorIndex = this.shapeData.id;
    //亮度可编辑
    this.brightnessEditable = true;


}

Blockly.FieldColorBar.prototype.showEditor_ = function () {

    Blockly.CcModal.getContentDiv().appendChild(this.createField());
    Blockly.CcModal.show();
}

Blockly.FieldColorBar.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '24.2rem';
    box.style.height = '28rem';
    box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '1rem';
    box.style.padding = '1rem';
    box.style.boxSizing = 'content-box';

    let fieldBox = document.createElement('div');
    fieldBox.style.width = '24.2rem';
    fieldBox.style.height = '28rem';
    fieldBox.style.backgroundColor = '#FFF';
    box.appendChild(fieldBox);

    //添加布局，绘制控件
    fieldBox.appendChild(this.createCloseBt());
    fieldBox.appendChild(this.createToolsDiv());

    return box;
}

Blockly.FieldColorBar.prototype.getValue = function () {
    return this.value_;
};

Blockly.FieldColorBar.prototype.setValue = function (newValue) {
    if (newValue === null || newValue === this.value_) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    this.setText('');
    this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createIcon());
    this.iconImage_.setAttribute('transform', 'translate(0,0)');
    this.updateToolsDiv();
}

Blockly.FieldColorBar.prototype.createToolsDiv = function () {
    let toolsDiv = document.createElement('div');
    toolsDiv.style.position = 'absolute';
    toolsDiv.style.left = '0';
    toolsDiv.style.right = '0';
    toolsDiv.style.top = '4rem';
    toolsDiv.style.width = 'auto';
    toolsDiv.style.height = 'auto';
    toolsDiv.style.margin = '1rem';
    toolsDiv.style.display = "flex";
    toolsDiv.style.padding = '1px';
    toolsDiv.style.flexDirection = "column";

    //亮度选择布局
    toolsDiv.appendChild(this.createBrightnessSelecterBar());

    //间隔view
    let separator = document.createElement('div');
    separator.style.height = '1rem';
    toolsDiv.appendChild(separator);

    //颜色选择布局
    toolsDiv.appendChild(this.createColorSelecterBar());

    this.toolsDiv = toolsDiv;

    return toolsDiv;
}

Blockly.FieldColorBar.prototype.updateToolsDiv = function () {
    let toolsDiv = this.toolsDiv;
    if (toolsDiv) {
        //清空布局子元素
        toolsDiv.innerHTML = "";
        //亮度选择布局
        toolsDiv.appendChild(this.createBrightnessSelecterBar());

        //间隔view
        let separator = document.createElement('div');
        separator.style.height = '1rem';
        toolsDiv.appendChild(separator);

        //颜色选择布局
        toolsDiv.appendChild(this.createColorSelecterBar());
    }
}

Blockly.FieldColorBar.prototype.createBrightnessSelecterBar = function () {
    let shape = this.shapeData;

    let isColorBlack = '#000000' == shape.color;
    let iconL = Blockly.mainWorkspace.options.pathToMedia + `codecraft/field/light_s_${isColorBlack ? 'd' : 'n'}.svg`;
    let iconR = Blockly.mainWorkspace.options.pathToMedia + `codecraft/field/light_m_${isColorBlack ? 'd' : 'n'}.svg`;

    let brightness = isColorBlack ? 0 : shape.brightness;

    let brightnessSelecterPane = document.createElement('div');
    brightnessSelecterPane.style.width = '19.38rem';
    brightnessSelecterPane.style.height = '7rem';
    brightnessSelecterPane.style.margin = 'auto';
    brightnessSelecterPane.style.backgroundColor = 'rgba(242,247,251,1)';
    brightnessSelecterPane.style.border = "1px solid rgba(227,235,241,1)";
    brightnessSelecterPane.style.borderRadius = "10px";
    brightnessSelecterPane.style.display = "flex";
    brightnessSelecterPane.style.justifyContent = "center";
    brightnessSelecterPane.style.padding = '1rem 1.2rem';
    brightnessSelecterPane.style.flexDirection = "column";
    brightnessSelecterPane.style.boxSizing = "border-box";
    brightnessSelecterPane.setAttribute('id', 'brightness-bar');

    let iconWrapper = document.createElement('div');
    iconWrapper.style.display = "flex";
    iconWrapper.style.flexDirection = "row";
    iconWrapper.style.alignItems = "center";
    iconWrapper.style.marginTop = "0.42rem";
    iconWrapper.style.justifyContent = "space-between";
    brightnessSelecterPane.appendChild(iconWrapper);

    let icon_left = document.createElement('div');
    icon_left.style.width = '1.36rem';
    icon_left.style.height = '1.36rem';
    icon_left.style.backgroundImage = 'url("' + iconL + '")';
    icon_left.style.backgroundRepeat = 'no-repeat';
    icon_left.style.backgroundPosition = 'center';
    icon_left.style.backgroundSize = '1.36rem 1.36rem';
    icon_left.setAttribute('id', 'icon-left');

    let brightnessGradeWrap = document.createElement('div');

    brightnessGradeWrap.style.flexGrow = 1;
    brightnessGradeWrap.style.display = 'flex';
    brightnessGradeWrap.style.flexDirection = 'row';
    brightnessGradeWrap.style.justifyContent = "center";
    brightnessGradeWrap.style.padding = '3px';
    brightnessGradeWrap.style.boxSizing = 'border-box';
    brightnessGradeWrap.setAttribute('id', 'brightness-grade-bar');

    for (let i = 1; i <= 7; i++) {
        let gradeItem = document.createElement('div');
        gradeItem.style.width = '1.5rem';
        gradeItem.style.height = '1.5rem';
        gradeItem.style.backgroundColor = i <= brightness ? 'rgba(0,170,255,1)' : 'rgba(213,222,230,1)';
        gradeItem.style.margin = '3px';
        gradeItem.style.border = '2px solid rgba(230, 237, 243, 1)';
        gradeItem.style.boxSizing = "border-box";
        gradeItem.style.backgroundClip = "padding-box";
        gradeItem.onclick = isColorBlack ? null : (e) => {
            this.onToolBrightnessChanged(i);
        }
        brightnessGradeWrap.appendChild(gradeItem);
    }

    let icon_right = document.createElement('div');
    icon_right.style.width = '1.36rem';
    icon_right.style.height = '1.36rem';
    icon_right.style.backgroundImage = 'url("' + iconR + '")';
    icon_right.style.backgroundRepeat = 'no-repeat';
    icon_right.style.backgroundPosition = 'center';
    icon_right.style.backgroundSize = '1.36rem 1.36rem';
    icon_right.setAttribute('id', 'icon-right');

    iconWrapper.appendChild(icon_left);
    iconWrapper.appendChild(brightnessGradeWrap);
    iconWrapper.appendChild(icon_right);
    
    return brightnessSelecterPane;
}

/**
 * 亮度调节变化监听
 * brightness 百分比
 */
Blockly.FieldColorBar.prototype.onToolBrightnessChanged = function (brightness) {
    this.shapeData.brightness = brightness;
    this.setValue(JSON.stringify(this.shapeData));
}

Blockly.FieldColorBar.prototype.createColorSelecterBar = function () {
    let colorSelecterPane = document.createElement('div');
    colorSelecterPane.style.width = 'auto';
    colorSelecterPane.style.height = '15.6rem';
    colorSelecterPane.style.display = 'flex';
    colorSelecterPane.style.alignItems = "center";
    colorSelecterPane.style.justifyContent = "center";

    let colorSelecterWrap = document.createElement('div');
    colorSelecterWrap.style.width = '19.38rem';
    colorSelecterWrap.style.height = '12.13rem';
    colorSelecterWrap.style.borderRadius = "10px";
    colorSelecterWrap.style.backgroundColor = 'rgba(242,247,251,1)';
    colorSelecterWrap.style.border = "1px solid rgba(227,235,241,1)";
    colorSelecterWrap.style.display = 'flex';
    colorSelecterWrap.style.flexDirection = 'row';
    colorSelecterWrap.style.flexWrap = 'wrap';
    colorSelecterWrap.style.padding = '8px';
    colorSelecterWrap.style.boxSizing = 'border-box';
    colorSelecterWrap.setAttribute('id', 'color-wrap');
    colorSelecterPane.appendChild(colorSelecterWrap);

    let colors = Blockly.FieldColorBar.SUPPORT_COLORS;
    for (let i = 0; i < colors.length; i++) {
        let col = colors[i];
        let colorItem = document.createElement('div');
        colorItem.style.width = '2.38rem';
        colorItem.style.height = '2.38rem';
        colorItem.style.backgroundColor = col;
        colorItem.style.margin = '0.625rem';
        colorItem.style.boxSizing = "border-box";
        colorItem.style.backgroundClip = "padding-box";

        if (i == this.colorIndex) {
            colorItem.style.border = "2px solid #00AAFF";
        } else {
            colorItem.style.border = '2px solid rgba(230, 237, 243, 1)';
        }

        colorItem.onclick = (e) => {
            this.onToolColorItemSelected(i, col, e);
        }
        colorSelecterWrap.appendChild(colorItem);
    }

    let colorItemRandom = document.createElement('div');
    colorItemRandom.style.width = '2.38rem';
    colorItemRandom.style.height = '2.38rem';
    colorItemRandom.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/random@2x.png")';
    colorItemRandom.style.backgroundRepeat = 'no-repeat';
    colorItemRandom.style.backgroundPosition = 'center';
    colorItemRandom.style.backgroundSize = '2.38rem 2.38rem';
    colorItemRandom.style.margin = '0.625rem';
    colorItemRandom.style.boxSizing = "border-box";
    colorItemRandom.style.backgroundClip = "padding-box";

    colorItemRandom.onclick = (e) => {
        let index = Math.floor(Math.random() * 14);
        let color = colors[index];
        this.onToolColorItemSelected(index, color, e);
    }

    colorSelecterWrap.appendChild(colorItemRandom);

    return colorSelecterPane;
}


Blockly.FieldColorBar.prototype.onToolColorItemSelected = function (index, color, e) {
    this.colorIndex = index;
    this.shapeData.id = index;
    this.shapeData.color = Blockly.FieldColorBar.SUPPORT_COLORS[index];
    this.setValue(JSON.stringify(this.shapeData));
}

Blockly.FieldColorBar.prototype.createCloseBt = function () {
    let closeBt = document.createElement('div');
    closeBt.style.position = 'absolute';
    closeBt.style.right = '2rem';
    closeBt.style.top = '2rem';
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

Blockly.FieldColorBar.prototype.createIcon = function () {
    let shape = JSON.parse(this.getValue());
    let color = shape.color;
    let svgheader = "data:image/svg+xml;utf8,";
    let svgcontent =
        svgheader +
        `<svg style="display: block; cursor: pointer;" width="324" height="324" viewBox="0 0 166 166" xmlns="http://www.w3.org/2000/svg">\n` +
        `    <rect fill="${color}" width="166" height="166" x="0" y="0" rx="45" ry="45"></rect>\n` +
        `</svg>`;
    return this.svgEncode(svgcontent);
}

Blockly.FieldColorBar.prototype.svgEncode = function (svg) {
    svg = svg.replace(/%/g, '%25');
    svg = svg.replace(/"/g, '%22');
    svg = svg.replace(/#/g, '%23');
    svg = svg.replace(/{/g, '%7B');
    svg = svg.replace(/}/g, '%7D');
    svg = svg.replace(/</g, '%3C');
    svg = svg.replace(/>/g, '%3E');
    return svg;
}

Blockly.FieldColorBar.prototype.shapeData = {
    id: 0,
    brightness: 50,
    color: '#F50000'
}

Blockly.Field.register('field_color_bar', Blockly.FieldColorBar);






