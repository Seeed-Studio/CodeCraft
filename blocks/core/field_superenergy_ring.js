'use strict';

goog.provide('Blockly.FieldSuperenergyRing');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

Blockly.FieldSuperenergyRing = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'height': '30px',
        'width': '30px'
    });
    Blockly.FieldSuperenergyRing.superClass_.constructor.call(this, value);
    this.addArgType('superenergy_ring');
}
goog.inherits(Blockly.FieldSuperenergyRing, Blockly.Field);

Blockly.FieldSuperenergyRing.SUPPORT_COLORS = ['#F50000', '#FBA700', '#FFF000', '#C2FF00', '#3DFF00', '#7BFFA9', '#38FFFF', '#0051FF', '#0000FF', '#6E00FF', '#F400CF', '#F50087', '#FFFFFF', '#000000']

Blockly.FieldSuperenergyRing.PROHIBIT_SVG =

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


Blockly.FieldSuperenergyRing.fromJson = function (options) {
    return new Blockly.FieldSuperenergyRing(options['default']);
};

Blockly.FieldSuperenergyRing.prototype.init = function () {

    this.className_ += ' blocklyDropdownText';
    Blockly.FieldSuperenergyRing.superClass_.init.call(this);

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

    //初始化
    this.ringIndex = 11; // 默认为11

    //初始化shapeData数据
    this.shapeData = JSON.parse(this.value_);

    //亮度可编辑
    this.brightnessEditable = true;
}

Blockly.FieldSuperenergyRing.prototype.showEditor_ = function () {
    let contentDiv = Blockly.CcModal.getContentDiv();
    let field = this.createField()
    contentDiv.appendChild(field);

    Blockly.CcModal.show();

    //添加超能环矩形方块事件
    this.addSuperRingRectsListener()
}

Blockly.FieldSuperenergyRing.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '52rem';
    box.style.height = '28rem';
    box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '1rem';
    box.style.padding = '1rem';
    box.style.boxSizing = 'content-box';

    let fieldBox = document.createElement('div');
    fieldBox.style.width = '52rem';
    fieldBox.style.height = '28rem';
    fieldBox.style.backgroundColor = '#FFF';
    box.appendChild(fieldBox);

    //添加布局，绘制控件
    fieldBox.appendChild(this.createCloseBt());
    fieldBox.appendChild(this.createSuperRingDiv());
    fieldBox.appendChild(this.createToolsDiv());

    return box;
}

Blockly.FieldSuperenergyRing.prototype.getValue = function () {
    return this.value_;
};

Blockly.FieldSuperenergyRing.prototype.setValue = function (newValue) {
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

    this.updateSuperRingDiv();
    this.updateBrightnessDiv();
}

Blockly.FieldSuperenergyRing.prototype.updateSuperRingDiv = function () {
    let superRingDiv = document.getElementById("super-ring");
    if (superRingDiv) {
        let parentDiv = superRingDiv.parentNode;

        parentDiv.removeChild(superRingDiv);
        parentDiv.appendChild(this.createSuperRingDiv());

        this.addSuperRingRectsListener();
    }
}

Blockly.FieldSuperenergyRing.prototype.createSuperRingDiv = function () {

    let colors = this.shapeData.map(i => i.color);
    let brightnesses = this.shapeData.map(i => i.brightness);

    let superRingDiv = document.createElement('div');
    superRingDiv.style.position = 'absolute';
    superRingDiv.style.left = '1rem';
    superRingDiv.style.top = '1rem';
    superRingDiv.style.width = '26rem';
    superRingDiv.style.height = '26rem';
    superRingDiv.style.margin = '1rem';
    superRingDiv.style.display = 'flex';
    superRingDiv.style.alignItems = "center";
    superRingDiv.style.justifyContent = "center";
    superRingDiv.setAttribute('id', 'super-ring');

    let percentSvgPane = document.createElement('div');
    percentSvgPane.style.position = "absolute";
    percentSvgPane.style.left = '0';
    percentSvgPane.style.top = '0';
    percentSvgPane.style.right = '0';
    percentSvgPane.style.bottom = '0';
    percentSvgPane.style.display = 'flex';
    percentSvgPane.style.alignItems = "center";
    percentSvgPane.style.justifyContent = "center";
    superRingDiv.appendChild(percentSvgPane);

    let percentsvgContainer = document.createElement('div');
    percentsvgContainer.style.width = '398px';
    percentsvgContainer.style.height = '398px';
    percentSvgPane.appendChild(percentsvgContainer);

    let percentSvgContent =
        `<svg style="display: block; cursor: pointer;" width="398" height="398" viewBox="0 0 166 166" xmlns="http://www.w3.org/2000/svg">\n` +
        `    <rect width="166" height="166" x="0" y="0" fill="rgba(0, 0, 0, 0)"></rect>\n` +
        `    <image transform="rotate(30, 120.11554419695379, 19.835123713895783)" width="26" height="14" x="107.11554419695379" y="12.835123713895783" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[0]=='#000000'?'0': brightnesses[0]}.svg" />` +
        `    <image transform="rotate(60, 146.9856018820426, 46.70518139898459)" width="26" height="14" x="133.9856018820426" y="39.70518139898459" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[1]=='#000000'?'0': brightnesses[1]}.svg" />\n` +
        `    <image transform="rotate(90, 156.8207255959384, 83.4103627979692)" width="26" height="14" x="143.8207255959384" y="76.4103627979692" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[2]=='#000000'?'0':brightnesses[2]}.svg" />\n` +
        `    <image transform="rotate(120, 146.9856018820426, 120.11554419695378)" width="26" height="14" x="133.9856018820426" y="113.11554419695378" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[3]=='#000000'?'0':brightnesses[3]}.svg" />\n` +
        `    <image transform="rotate(150, 120.11554419695382, 146.9856018820426)" width="26" height="14" x="107.11554419695382" y="139.9856018820426" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[4]=='#000000'?'0':brightnesses[4]}.svg" />\n` +
        `    <image transform="rotate(180, 83.41036279796921, 156.8207255959384)" width="26" height="14" x="70.41036279796921" y="149.8207255959384" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[5]=='#000000'?'0':brightnesses[5]}.svg" />\n` +
        `    <image transform="rotate(210, 46.70518139898462, 146.98560188204263)" width="26" height="14" x="33.70518139898462" y="139.98560188204263" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[6]=='#000000'?'0':brightnesses[6]}.svg" />\n` +
        `    <image transform="rotate(240, 19.835123713895804, 120.11554419695383)" width="26" height="14" x="6.835123713895804" y="113.11554419695383" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[7]=='#000000'?'0':brightnesses[7]}.svg" />\n` +
        `    <image transform="rotate(270, 10, 83.41036279796921)" width="26" height="14" x="-3" y="76.41036279796921" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[8]=='#000000'?'0':brightnesses[8]}.svg" />\n` +
        `    <image transform="rotate(300, 19.83512371389576, 46.70518139898465)" width="26" height="14" x="6.83512371389576" y="39.70518139898465" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[9]=='#000000'?'0':brightnesses[9]}.svg" />\n` +
        `    <image transform="rotate(330, 46.705181398984564, 19.83512371389581)" width="26" height="14" x="33.705181398984564" y="12.83512371389581" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[10]=='#000000'?'0':brightnesses[10]}.svg" />\n` +
        `    <image transform="rotate(0, 83.41036279796919, 10)" width="26" height="14" x="70.41036279796919" y="3" xlink:href="${Blockly.mainWorkspace.options.pathToMedia}codecraft/field/light_${colors[11]=='#000000'?'0':brightnesses[11]}.svg" />\n` +
        `</svg>`;

    percentsvgContainer.innerHTML = percentSvgContent;

    let rectsDiv = document.createElement('div');
    rectsDiv.style.position = "absolute";
    rectsDiv.style.left = '0';
    rectsDiv.style.top = '0';
    rectsDiv.style.right = '0';
    rectsDiv.style.bottom = '0';
    rectsDiv.style.display = 'flex';
    rectsDiv.style.alignItems = "center";
    rectsDiv.style.justifyContent = "center";
    superRingDiv.appendChild(rectsDiv);

    let mainWrapper = document.createElement('div');
    mainWrapper.style.width = '340px';
    mainWrapper.style.height = '340px';
    mainWrapper.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/backwheel@2x.png")';
    mainWrapper.style.backgroundRepeat = 'no-repeat';
    mainWrapper.style.backgroundPosition = 'center';
    mainWrapper.style.backgroundSize = '340px 340px';
    rectsDiv.appendChild(mainWrapper);

    let svgContainer = document.createElement('div');
    svgContainer.style.width = '270px';
    svgContainer.style.height = '270px';
    svgContainer.style.margin = "35px";
    mainWrapper.appendChild(svgContainer);

    let stroke = 'stroke="#51dad6" stroke-width="0.15rem" box-shadow="0px 5px 10px 0px rgba(32,151,228,0.5)"';
    let stroke_n = 'stroke="rgba(230, 237, 243, 1)" stroke-width="0.072rem"';

    let svgcontent =
        `<svg style="display: block; cursor: pointer;" width="270" height="270" viewBox="0 0 166 166" xmlns="http://www.w3.org/2000/svg">\n` +
        `    <rect width="166" height="166" x="0" y="0" fill="rgba(255, 255, 255, 0)"></rect>\n` +
        `    <rect ${this.ringIndex == 0 ? stroke : stroke_n} id="rect0" fill="${colors[0]}" transform="rotate(30, 120.11554419695379, 19.835123713895783)" width="14" height="14" x="113.11554419695379" y="12.835123713895783" dataindex="0"></rect>\n` +
        `    <rect ${this.ringIndex == 1 ? stroke : stroke_n} id="rect1" fill="${colors[1]}" transform="rotate(60, 146.9856018820426, 46.70518139898459)" width="14" height="14" x="139.9856018820426" y="39.70518139898459" dataindex="1"></rect>\n` +
        `    <rect ${this.ringIndex == 2 ? stroke : stroke_n} id="rect2" fill="${colors[2]}" transform="rotate(90, 156.8207255959384, 83.4103627979692)" width="14" height="14" x="149.8207255959384" y="76.4103627979692" dataindex="2"></rect>\n` +
        `    <rect ${this.ringIndex == 3 ? stroke : stroke_n} id="rect3" fill="${colors[3]}" transform="rotate(300, 146.9856018820426, 120.11554419695378)" width="14" height="14" x="139.9856018820426" y="113.11554419695378" dataindex="3"></rect>\n` +
        `    <rect ${this.ringIndex == 4 ? stroke : stroke_n} id="rect4" fill="${colors[4]}" transform="rotate(330, 120.11554419695382, 146.9856018820426)" width="14" height="14" x="113.11554419695382" y="139.9856018820426" dataindex="4"></rect>\n` +
        `    <rect ${this.ringIndex == 5 ? stroke : stroke_n} id="rect5" fill="${colors[5]}" transform="rotate(0, 83.41036279796921, 156.8207255959384)" width="14" height="14" x="76.41036279796921" y="149.8207255959384" dataindex="5"></rect>\n` +
        `    <rect ${this.ringIndex == 6 ? stroke : stroke_n} id="rect6" fill="${colors[6]}" transform="rotate(30, 46.70518139898462, 146.98560188204263)" width="14" height="14" x="39.70518139898462" y="139.98560188204263" dataindex="6"></rect>\n` +
        `    <rect ${this.ringIndex == 7 ? stroke : stroke_n} id="rect7" fill="${colors[7]}" transform="rotate(60, 19.835123713895804, 120.11554419695383)" width="14" height="14" x="12.835123713895804" y="113.11554419695383" dataindex="7"></rect>\n` +
        `    <rect ${this.ringIndex == 8 ? stroke : stroke_n} id="rect8" fill="${colors[8]}" transform="rotate(270, 10, 83.41036279796921)" width="14" height="14" x="3" y="76.41036279796921" dataindex="8"></rect>\n` +
        `    <rect ${this.ringIndex == 9 ? stroke : stroke_n} id="rect9" fill="${colors[9]}" transform="rotate(300, 19.83512371389576, 46.70518139898465)" width="14" height="14" x="12.83512371389576" y="39.70518139898465" dataindex="9"></rect>\n` +
        `    <rect ${this.ringIndex == 10 ? stroke : stroke_n} id="rect10" fill="${colors[10]}" transform="rotate(330, 46.705181398984564, 19.83512371389581)" width="14" height="14" x="39.705181398984564" y="12.83512371389581" dataindex="10"></rect>\n` +
        `    <rect ${this.ringIndex == 11 ? stroke : stroke_n} id="rect11" fill="${colors[11]}" transform="rotate(0, 83.41036279796919, 10)" width="14" height="14" x="76.41036279796919" y="3" dataindex="11"></rect>\n` +
        `</svg>`;

    svgContainer.innerHTML = svgcontent;

    return superRingDiv;
}

Blockly.FieldSuperenergyRing.prototype.createToolsDiv = function () {
    let toolsDiv = document.createElement('div');
    toolsDiv.style.position = 'absolute';
    toolsDiv.style.right = '1rem';
    toolsDiv.style.top = '4rem';
    toolsDiv.style.width = '22rem';
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

    return toolsDiv;
}

Blockly.FieldSuperenergyRing.prototype.updateBrightnessDiv = function () {

    let brightnessGradeBar = document.getElementById("brightness-grade-bar");
    if (brightnessGradeBar) {
        brightnessGradeBar.innerHTML = "";

        let shape = this.shapeData[this.ringIndex];

        let isColorBlack = '#000000' == shape.color;

        let iconLeft = document.getElementById("icon-left");
        let iconRight = document.getElementById("icon-right");

        let iconL = Blockly.mainWorkspace.options.pathToMedia + `codecraft/field/light_s_${isColorBlack ? 'd' : 'n'}.svg`;
        let iconR = Blockly.mainWorkspace.options.pathToMedia + `codecraft/field/light_m_${isColorBlack ? 'd' : 'n'}.svg`;

        let brightness = isColorBlack ? 0 : shape.brightness;

        iconLeft.style.backgroundImage = 'url("' + iconL + '")';
        iconRight.style.backgroundImage = 'url("' + iconR + '")';

        for (let i = 1; i <= 7; i++) {
            let gradeItem = document.createElement('div');
            gradeItem.style.width = '1.5rem';
            gradeItem.style.height = '1.5rem';
            gradeItem.style.backgroundColor = i <= brightness ? 'rgba(0,170,255,1)' : 'rgba(213,222,230,1)';
            gradeItem.style.margin = '3px';
            gradeItem.style.border = '2px solid rgba(230, 237, 243, 1)';
            gradeItem.style.boxSizing = "border-box";
            gradeItem.onclick = isColorBlack ? null : (e) => {
                this.onToolBrightnessChanged(i);
            }
            brightnessGradeBar.appendChild(gradeItem);
        }
    }

}

Blockly.FieldSuperenergyRing.prototype.createBrightnessSelecterBar = function () {

    let shape = this.shapeData[this.ringIndex];

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
Blockly.FieldSuperenergyRing.prototype.onToolBrightnessChanged = function (brightness) {
    this.shapeData[this.ringIndex].brightness = brightness;
    this.setValue(JSON.stringify(this.shapeData));
}

Blockly.FieldSuperenergyRing.prototype.createColorSelecterBar = function () {
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
    colorSelecterPane.appendChild(colorSelecterWrap);

    let colors = Blockly.FieldSuperenergyRing.SUPPORT_COLORS;
    for (let i = 0; i < colors.length - 1; i++) {
        let col = colors[i];
        let gradeItem = document.createElement('div');
        gradeItem.style.width = '2.38rem';
        gradeItem.style.height = '2.38rem';
        gradeItem.style.backgroundColor = col;
        gradeItem.style.margin = '0.625rem';
        gradeItem.style.border = '2px solid rgba(230, 237, 243, 1)';
        gradeItem.style.boxSizing = "border-box";
        gradeItem.onclick = (e) => {
            this.onToolColorItemSelected(i, col, e);
        }
        colorSelecterWrap.appendChild(gradeItem);
    }

    let gradeItemBlack = document.createElement('div');
    gradeItemBlack.style.width = '2.38rem';
    gradeItemBlack.style.height = '2.38rem';
    gradeItemBlack.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/lightoff@2x.png")';
    gradeItemBlack.style.backgroundRepeat = 'no-repeat';
    gradeItemBlack.style.backgroundPosition = 'center';
    gradeItemBlack.style.backgroundSize = '2.38rem 2.38rem';
    gradeItemBlack.style.margin = '0.625rem';
    gradeItemBlack.style.boxSizing = "border-box";
    gradeItemBlack.onclick = (e) => {
        let index = colors.length - 1;
        let color = colors[index];
        this.onToolColorItemSelected(index, color, e);
    }
    colorSelecterWrap.appendChild(gradeItemBlack);

    let gradeItemRandom = document.createElement('div');
    gradeItemRandom.style.width = '2.38rem';
    gradeItemRandom.style.height = '2.38rem';
    gradeItemRandom.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/random@2x.png")';
    gradeItemRandom.style.backgroundRepeat = 'no-repeat';
    gradeItemRandom.style.backgroundPosition = 'center';
    gradeItemRandom.style.backgroundSize = '2.38rem 2.38rem';
    gradeItemRandom.style.margin = '0.625rem';
    gradeItemRandom.style.boxSizing = "border-box";
    gradeItemRandom.onclick = (e) => {
        let index = Math.floor(Math.random() * 14);
        let color = colors[index];
        this.onToolColorItemSelected(index, color, e);
    }
    colorSelecterWrap.appendChild(gradeItemRandom);

    return colorSelecterPane;
}

Blockly.FieldSuperenergyRing.prototype.onToolColorItemSelected = function (index, color, e) {

    this.shapeData[this.ringIndex].color = color;
    this.shapeData[this.ringIndex].colorId = index;

    let lastBrightness = this.shapeData[this.ringIndex].brightness;

    if (this.ringIndex < 11) {
        this.ringIndex++;
    } else {
        this.ringIndex = 0;
    }

    this.shapeData[this.ringIndex].brightness = lastBrightness;
    this.setValue(JSON.stringify(this.shapeData));
}

Blockly.FieldSuperenergyRing.prototype.createCloseBt = function () {
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

Blockly.FieldSuperenergyRing.prototype.createIcon = function () {
    let shape = JSON.parse(this.value_);
    let colors = shape.map(i => i.color);
    let svgheader = "data:image/svg+xml;utf8,";
    let svgcontent =
        svgheader +
        `<svg style="display: block; cursor: pointer;" width="324" height="324" viewBox="0 0 166 166" xmlns="http://www.w3.org/2000/svg">\n` +
        `    <rect width="166" height="166" x="0" y="0" rx="45" ry="45" fill="rgba(0, 0, 0, .5)"></rect>\n` +
        `    <rect fill="${colors[0]}" transform="rotate(30, 120.11554419695379, 19.835123713895783)" width="12" height="12" x="114.11554419695379" y="13.835123713895783" dataindex="0"></rect>\n` +
        `    <rect fill="${colors[1]}" transform="rotate(60, 146.9856018820426, 46.70518139898459)" width="12" height="12" x="140.9856018820426" y="40.70518139898459" dataindex="1"></rect>\n` +
        `    <rect fill="${colors[2]}" transform="rotate(90, 156.8207255959384, 83.4103627979692)" width="12" height="12" x="150.8207255959384" y="77.4103627979692" dataindex="2"></rect>\n` +
        `    <rect fill="${colors[3]}" transform="rotate(300, 146.9856018820426, 120.11554419695378)" width="12" height="12" x="140.9856018820426" y="114.11554419695378" dataindex="3"></rect>\n` +
        `    <rect fill="${colors[4]}" transform="rotate(330, 120.11554419695382, 146.9856018820426)" width="12" height="12" x="114.11554419695382" y="140.9856018820426" dataindex="4"></rect>\n` +
        `    <rect fill="${colors[5]}" transform="rotate(0, 83.41036279796921, 156.8207255959384)" width="12" height="12" x="77.41036279796921" y="150.8207255959384" dataindex="5"></rect>\n` +
        `    <rect fill="${colors[6]}" transform="rotate(30, 46.70518139898462, 146.98560188204263)" width="12" height="12" x="40.70518139898462" y="140.98560188204263" dataindex="6"></rect>\n` +
        `    <rect fill="${colors[7]}" transform="rotate(60, 19.835123713895804, 120.11554419695383)" width="12" height="12" x="13.835123713895804" y="114.11554419695383" dataindex="7"></rect>\n` +
        `    <rect fill="${colors[8]}" transform="rotate(270, 10, 83.41036279796921)" width="12" height="12" x="4" y="77.41036279796921" dataindex="8"></rect>\n` +
        `    <rect fill="${colors[9]}" transform="rotate(300, 19.83512371389576, 46.70518139898465)" width="12" height="12" x="13.83512371389576" y="40.70518139898465" dataindex="9"></rect>\n` +
        `    <rect fill="${colors[10]}" transform="rotate(330, 46.705181398984564, 19.83512371389581)" width="12" height="12" x="40.705181398984564" y="13.83512371389581" dataindex="10"></rect>\n` +
        `    <rect fill="${colors[11]}" transform="rotate(0, 83.41036279796919, 10)" width="12" height="12" x="77.41036279796919" y="4" dataindex="11"></rect>\n` +
        `</svg>`;
    return this.svgEncode(svgcontent);
}

Blockly.FieldSuperenergyRing.prototype.addSuperRingRectsListener = function () {
    document.getElementById("rect0").onclick = (e) => { this.onSuperRingRectClick(0) }
    document.getElementById("rect1").onclick = (e) => { this.onSuperRingRectClick(1) }
    document.getElementById("rect2").onclick = (e) => { this.onSuperRingRectClick(2) }
    document.getElementById("rect3").onclick = (e) => { this.onSuperRingRectClick(3) }
    document.getElementById("rect4").onclick = (e) => { this.onSuperRingRectClick(4) }
    document.getElementById("rect5").onclick = (e) => { this.onSuperRingRectClick(5) }
    document.getElementById("rect6").onclick = (e) => { this.onSuperRingRectClick(6) }
    document.getElementById("rect7").onclick = (e) => { this.onSuperRingRectClick(7) }
    document.getElementById("rect8").onclick = (e) => { this.onSuperRingRectClick(8) }
    document.getElementById("rect9").onclick = (e) => { this.onSuperRingRectClick(9) }
    document.getElementById("rect10").onclick = (e) => { this.onSuperRingRectClick(10) }
    document.getElementById("rect11").onclick = (e) => { this.onSuperRingRectClick(11) }
}

Blockly.FieldSuperenergyRing.prototype.onSuperRingRectClick = function (index) {
    this.ringIndex = index;
    this.updateSuperRingDiv();
    this.updateBrightnessDiv();
}

Blockly.FieldSuperenergyRing.prototype.svgEncode = function (svg) {
    svg = svg.replace(/%/g, '%25');
    svg = svg.replace(/"/g, '%22');
    svg = svg.replace(/#/g, '%23');
    svg = svg.replace(/{/g, '%7B');
    svg = svg.replace(/}/g, '%7D');
    svg = svg.replace(/</g, '%3C');
    svg = svg.replace(/>/g, '%3E');
    return svg;
}

Blockly.FieldSuperenergyRing.prototype.shapeData = [

    {
        id: 0,
        brightness: 2,
        color: '#FFF000'
    },
    {
        id: 1,
        brightness: 2,
        color: '#FBA700'
    },
    {
        id: 2,
        brightness: 2,
        color: '#F50000'
    },
    {
        id: 3,
        brightness: 2,
        color: '#F50087'
    },
    {
        id: 4,
        brightness: 2,
        color: '#F400CF'
    },
    {
        id: 5,
        brightness: 2,
        color: '#6E00FF'
    },
    {
        id: 6,
        brightness: 2,
        color: '#0000FF'
    },
    {
        id: 7,
        brightness: 2,
        color: '#0051FF'
    },
    {
        id: 8,
        brightness: 2,
        color: '#38FFFF'
    },
    {
        id: 9,
        brightness: 2,
        color: '#C2FF00'
    },
    {
        id: 10,
        brightness: 2,
        color: '#3DFF00'
    },
    {
        id: 11,
        brightness: 50,
        color: '#7BFFA9'
    }
];

Blockly.Field.register('field_superenergy_ring', Blockly.FieldSuperenergyRing);






