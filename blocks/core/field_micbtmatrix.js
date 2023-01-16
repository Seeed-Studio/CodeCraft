'use strict';

goog.provide('Blockly.FieldMicbtmatrix');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

Blockly.FieldMicbtmatrix = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'height': '30px',
        'width': '30px'
    });
    Blockly.FieldMicbtmatrix.superClass_.constructor.call(this, value);
    this.addArgType('ledmatrix');
}
goog.inherits(Blockly.FieldMicbtmatrix, Blockly.Field);

Blockly.FieldMicbtmatrix.prototype.rows = 5;
Blockly.FieldMicbtmatrix.prototype.cols = 5;
Blockly.FieldMicbtmatrix.MOUSE_ACTION_ERASURE = 0;
Blockly.FieldMicbtmatrix.MOUSE_ACTION_DRAW = 1;

Blockly.FieldMicbtmatrix.SELECTBAR_SIZE = 5;

Blockly.FieldMicbtmatrix.fromJson = function (options) {
    return new Blockly.FieldMicbtmatrix(options['default']);
};

Blockly.FieldMicbtmatrix.prototype.init = function () {
    this.className_ += ' blocklyDropdownText';

    Blockly.FieldMicbtmatrix.superClass_.init.call(this);

    this.size_ = new goog.math.Size(30, 30);
    this.shapeData = [];
    this.mouseDown = false;
    // this.pageIdx = 0;
    // this.pageIdxCache = 0;

    /**
     * 当前 selectbar 页数
     */
    this.pageIndex = 0;
    
    this.gridMapBox = null;
    this.gridMap = null;
    this.mouseAction = Blockly.FieldMicbtmatrix.MOUSE_ACTION_DRAW;
    this.selectIdxCache = 0;
    this.selectIdx = 0;

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
    // this.drawSelectBox(); // 画边框
    // this.drawSelectIcon();// 画icon
}

Blockly.FieldMicbtmatrix.prototype.showEditor_ = function () {
    this.mouseAction = Blockly.FieldMicbtmatrix.MOUSE_ACTION_DRAW;
    this.selectIdxCache = this.selectIdx;
    // this.pageIdxCache = this.pageIdx;

    let contentDiv = Blockly.CcModal.getContentDiv();
    let field = this.createField()
    contentDiv.appendChild(field);

    Blockly.CcModal.show();

    const mouseDown_ = (function () {
        this.mouseDown = true;
        document.addEventListener('mouseup', mouseUp_);
    }).bind(this);

    const mouseUp_ = (function () {
        this.mouseDown = false;
        document.removeEventListener('mouseup', mouseUp_);
    }).bind(this);

    field.addEventListener('mousedown', mouseDown_);
}

Blockly.FieldMicbtmatrix.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '30rem';
    box.style.height = '28rem';
    box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '1rem';
    box.style.padding = '1rem';
    box.style.boxSizing = 'content-box';

    let fieldBox = document.createElement('div');
    fieldBox.style.width = '30rem';
    fieldBox.style.height = '28rem';
    fieldBox.style.backgroundColor = '#FFF';
    box.appendChild(fieldBox);

    fieldBox.appendChild(this.createCloseBt());
    fieldBox.appendChild(this.createGridMap());
    fieldBox.appendChild(this.createTipsX());
    fieldBox.appendChild(this.createTipsY());
    fieldBox.appendChild(this.createConfirmBt());
    fieldBox.appendChild(this.createToolBox());
    fieldBox.appendChild(this.createSelectGridMap());
    return box;
}

Blockly.FieldMicbtmatrix.prototype.createCloseBt = function () {
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

Blockly.FieldMicbtmatrix.prototype.createGridMap = function () {
    this.gridMap = document.createElement('div');
    this.gridMap.style.width = '15.4rem';
    this.gridMap.style.height = '13.2rem';
    this.gridMap.style.position = 'absolute';
    this.gridMap.style.left = '8rem';
    this.gridMap.style.top = '5rem';

    let shapeData = this.getShapeData(this.getValue());
    this.setShapeData(shapeData);
    return this.gridMap;
}
Blockly.FieldMicbtmatrix.prototype.createTipsX = function () {
    let tipsX = document.createElement('div');
    tipsX.style.width = '15.4rem';
    tipsX.style.position = 'absolute';
    tipsX.style.top = '3.2rem';
    tipsX.style.left = '8rem';
    tipsX.style.color = '#ADB4D0';
    tipsX.style.userSelect = 'none';
    for (let i = 1; i <= this.cols; i++) {
        let item = document.createElement('div');
        item.style.width = '20%';
        item.style.lineHeight = '20%';
        item.style.float = 'left';
        item.style.textAlign = 'center';
        item.style.userSelect = 'none';
        item.innerText = i;
        tipsX.appendChild(item);
    }
    return tipsX;
}

Blockly.FieldMicbtmatrix.prototype.createTipsY = function () {
    let tipsY = document.createElement('div');
    tipsY.style.width = '1rem';
    tipsY.style.height = '13.2rem';
    tipsY.style.position = 'absolute';
    tipsY.style.top = '5rem';
    tipsY.style.left = '5.4rem';
    tipsY.style.color = '#ADB4D0';

    for (let i = 1; i <= this.rows; i++) {
        let item = document.createElement('div');
        item.style.width = '1rem';
        item.style.height = '20%';
        item.style.display = 'flex';
        item.style.justifyContent = 'center';
        item.style.alignItems = 'center';
        item.style.textAlign = 'center';
        item.style.userSelect = 'none';
        item.innerText = String.fromCharCode(i + 0x40);
        tipsY.appendChild(item);
    }
    return tipsY;
}

Blockly.FieldMicbtmatrix.prototype.createSelectGridMap = function () {
    let selectGridMap = document.createElement('div');
    selectGridMap.style.width = '30rem';
    selectGridMap.style.position = 'absolute';
    selectGridMap.style.top = '20rem';
    selectGridMap.style.left = '1rem';
    selectGridMap.style.textAlign = 'center';

    let leftBt = document.createElement('div');
    leftBt.style.width = '1.75rem';
    leftBt.style.height = '2.3rem';
    leftBt.style.margin = '1.0rem 1rem 0.85rem 1.25rem';
    leftBt.style.backgroundImage = '#FFF';
    leftBt.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
    leftBt.style.borderRadius = '0.5rem';
    leftBt.style.float = 'left';
    leftBt.style.backgroundSize = '1rem';
    leftBt.style.backgroundPosition = 'center';
    leftBt.style.backgroundRepeat = 'no-repeat';
    leftBt.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
    leftBt.style.cursor = 'pointer';

    let rightBt = document.createElement('div');
    rightBt.style.width = '1.75rem';
    rightBt.style.height = '2.3rem';
    rightBt.style.margin = '1.0rem 1.25rem 0.85rem 1rem';
    rightBt.style.backgroundImage = '#FFF';
    rightBt.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
    rightBt.style.borderRadius = '0.5rem';
    rightBt.style.float = 'left';
    rightBt.style.backgroundSize = '1rem';
    rightBt.style.backgroundPosition = 'center';
    rightBt.style.backgroundRepeat = 'no-repeat';
    rightBt.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
    rightBt.style.cursor = 'pointer';

    const setImg = (function () {
        if (this.pageIndex === 0) {
            leftBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_gray@2x.png")';
        } else {
            leftBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_green@2x.png")';
        }
        let pageCount = this.pageCount();
        if (this.pageIndex === pageCount - 1) {
            rightBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray1@2x.png")';
        } else {
            rightBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray@2x.png")';
        }
    }).bind(this);

    setImg();

    leftBt.addEventListener('click', (function () {
        if (this.pageIndex === 0) return;
        if (this.pageIndex > 0) {
            this.pageIndex--;
        }

        this.drawGridMapBox();
        setImg();

    }).bind(this));

    rightBt.addEventListener('click', (function () {
        let pageCount = this.pageCount();
        if (this.pageIndex === pageCount - 1) return;
        if (this.pageIndex < pageCount) {
            this.pageIndex++;
        }

        this.drawGridMapBox();
        setImg();

    }).bind(this));

    this.gridMapBox = document.createElement('div');
    this.gridMapBox.style.width = '26rem';

    selectGridMap.appendChild(leftBt);
    this.drawGridMapBox();
    selectGridMap.appendChild(this.gridMapBox);
    selectGridMap.appendChild(rightBt);

    return selectGridMap;
}

Blockly.FieldMicbtmatrix.prototype.pageCount = function () {
    let pageCount;
    if (this.iconsData.length % Blockly.FieldMicbtmatrix.SELECTBAR_SIZE === 0) {
        pageCount = parseInt(this.iconsData.length / Blockly.FieldMicbtmatrix.SELECTBAR_SIZE);
    } else {
        pageCount = parseInt(this.iconsData.length / Blockly.FieldMicbtmatrix.SELECTBAR_SIZE) + 1;
    }
    return pageCount;
}

Blockly.FieldMicbtmatrix.prototype.drawGridMapBox = function () {

    this.gridMapBox.innerHTML = '';

    let startIndex = this.pageIndex * Blockly.FieldMicbtmatrix.SELECTBAR_SIZE;
    let endIndex = startIndex + Blockly.FieldMicbtmatrix.SELECTBAR_SIZE;

    for (let i = startIndex; i < endIndex; i++) {
        
        let shapeData = this.getShapeData(this.iconsData[i]);

        let gridMap = document.createElement('div');
        gridMap.style.height = '100%';
        gridMap.style.width = '100%';
        gridMap.style.backgroundColor = '#fff';

        let gridMapBkg = document.createElement('div');
        gridMapBkg.style.padding = '2px';
        gridMapBkg.appendChild(gridMap);
        gridMapBkg.style.float = 'left';
        gridMapBkg.style.margin = '0.6%';
        gridMapBkg.style.height = '3.92rem';
        gridMapBkg.style.width = '15.6%';
        gridMapBkg.style.boxSizing = 'border-box';
        gridMapBkg.style.cursor = 'pointer';
        if (this.selectIdxCache === i) {
            gridMapBkg.style.background = 'linear-gradient(#50D7D7,#00AAFF)';
        }

        let idx = i;

        gridMap.addEventListener('click', (function (e) {
            let value = this.iconsData[parseInt(idx)];
            let shapeData = this.getShapeData(value);
            this.selectIdxCache = idx;
            this.setShapeData(shapeData);
            this.drawGridMapBox();
        }).bind(this));

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let el = shapeData[j][i];
                gridMap.appendChild(this.createGrid(j, i, parseInt(el), false));
            }
        }
        this.gridMapBox.appendChild(gridMapBkg);
    }

    return this.gridMapBox;
}


Blockly.FieldMicbtmatrix.prototype.setShapeData = function (newShapeData) {
    this.shapeData = newShapeData;
    this.drawGridMap();
}

Blockly.FieldMicbtmatrix.prototype.drawGridMap = function () {
    this.gridMap.innerHTML = '';
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            let el = this.shapeData[j][i];
            let view = this.createGrid(j, i, parseInt(el));
            this.gridMap.appendChild(view);
        }
    }
}

Blockly.FieldMicbtmatrix.prototype.createGrid = function (x, y, light, isAddListen = true) {
    let color = light ? '#FF0000' : 'rgba(0,0,0,0)';
    let grid = document.createElement('div');
    grid.style.width = '18.8%';
    grid.style.height = '18.8%';
    grid.style.border = '1px solid #C8E4FC';
    grid.style.backgroundColor = color;
    grid.style.float = 'left';
    grid.style.boxSizing = 'border-box';
    grid.style.margin = '0.6%';
    grid.setAttribute('data-light', light);
    grid.setAttribute('data-x', x);
    grid.setAttribute('data-y', y);

    const ligntOnOff = (function (e) {
        let target = e.target;
        let dataX = target.getAttribute('data-x');
        let dataY = target.getAttribute('data-y');

        if (this.mouseAction === Blockly.FieldMicbtmatrix.MOUSE_ACTION_DRAW) {
            target.style.backgroundColor = '#FF0000';
            this.updateShapeData(dataX, dataY, '1');
        } else {
            target.style.backgroundColor = 'rgba(0,0,0,0)';
            this.updateShapeData(dataX, dataY, '0');
        }
    }).bind(this);

    if (isAddListen) {
        grid.addEventListener('mousemove', (function (e) {
            if (!this.mouseDown) return;
            ligntOnOff(e);
        }).bind(this));
        grid.addEventListener('click', ligntOnOff);
    }
    return grid;
}

Blockly.FieldMicbtmatrix.prototype.getShapeData = function (value) {
    return this.iconToMatrix(value);
}

Blockly.FieldMicbtmatrix.prototype.updateShapeData = function (x, y, light) {
    this.shapeData[x][y] = light;
}

Blockly.FieldMicbtmatrix.prototype.getShapeValue = function () {
    let result = '';
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            result += this.shapeData[j][i];
        }
    }
    return result;
}

Blockly.FieldMicbtmatrix.prototype.createToolBox = function () {
    let toolBox = document.createElement('div');
    toolBox.style.width = '3rem';
    toolBox.style.height = '9rem';
    toolBox.style.position = 'absolute';
    toolBox.style.left = '26rem';
    toolBox.style.top = '6.5rem';

    let penBkg = document.createElement('div');
    let rubberBkg = document.createElement('div');
    let trashCanBkg = document.createElement('div');

    let pen = document.createElement('div');
    let rubber = document.createElement('div');
    let trashCan = document.createElement('div');

    penBkg.appendChild(pen);
    rubberBkg.appendChild(rubber);
    trashCanBkg.appendChild(trashCan);

    penBkg.style.width = '3rem';
    penBkg.style.height = '3rem';
    penBkg.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
    penBkg.style.borderRadius = '50%';
    penBkg.style.padding = '0.7rem';
    penBkg.style.boxSizing = 'border-box'
    penBkg.style.cursor = 'pointer';

    rubberBkg.style.borderRadius = '50%';
    rubberBkg.style.background = 'rgba(0,0,0,0)';
    rubberBkg.style.height = '3rem';
    rubberBkg.style.width = '3rem';
    rubberBkg.style.padding = '0.7rem';
    rubberBkg.style.boxSizing = 'border-box'
    rubberBkg.style.marginTop = '1rem';
    rubberBkg.style.cursor = 'pointer';

    trashCanBkg.style.width = '3rem';
    trashCanBkg.style.height = '3rem';
    trashCanBkg.style.background = 'rgba(0,0,0,0)';
    trashCanBkg.style.borderRadius = '50%';
    trashCanBkg.style.padding = '0.7rem';
    trashCanBkg.style.boxSizing = 'border-box'
    trashCanBkg.style.marginTop = '1rem';
    trashCanBkg.style.cursor = 'pointer';

    pen.style.width = '1.6rem';
    pen.style.height = '1.6rem';
    pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
    pen.style.backgroundSize = 'contain';
    pen.style.backgroundRepeat = 'no-repeat';

    rubber.style.width = '1.6rem';
    rubber.style.height = '1.6rem';
    rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';
    rubber.style.backgroundSize = 'contain';
    rubber.style.backgroundRepeat = 'no-repeat';
    pen.addEventListener('click', (function () {
        this.mouseAction = Blockly.FieldMicbtmatrix.MOUSE_ACTION_DRAW;
        pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
        rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';
        penBkg.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
        rubberBkg.style.background = 'rgba(0,0,0,0)';
    }).bind(this));

    rubber.addEventListener('click', (function () {
        this.mouseAction = Blockly.FieldMicbtmatrix.MOUSE_ACTION_ERASURE;
        pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_purple@2x.png")';
        rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_white@2x.png")';
        rubberBkg.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
        penBkg.style.background = 'rgba(0,0,0,0)';
    }).bind(this));

    trashCan.style.width = '1.6rem';
    trashCan.style.height = '1.6rem';
    trashCan.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_rubbish_red@2x.png")';
    trashCan.style.backgroundSize = 'contain';
    trashCan.style.backgroundRepeat = 'no-repeat';
    trashCan.addEventListener('click', (function () {
        let shapeData = this.getShapeData(this.emptyIcon);
        this.setShapeData(shapeData);
    }).bind(this));

    toolBox.appendChild(penBkg);
    toolBox.appendChild(rubberBkg);
    toolBox.appendChild(trashCanBkg);

    return toolBox;
}


/**
 * 确认按钮
 */
Blockly.FieldMicbtmatrix.prototype.createConfirmBt = function () {
    let bt = document.createElement('div');
    bt.style.width = '6rem';
    bt.style.height = '2rem';
    bt.style.borderRadius = '1rem';
    bt.style.position = 'absolute';
    bt.style.left = '50%';
    bt.style.transform = 'translate(-50%, 0)';
    bt.style.bottom = '2.5rem';
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

    bt.addEventListener('click', (function (e) {
        Blockly.CcModal.hide(e);
        this.setValue(this.getShapeValue());
    }).bind(this));
    return bt;
}

// /**
//  * 画边框
//  */
// Blockly.FieldMicbtmatrix.prototype.drawSelectBox = function () {
//     this.box_ = Blockly.utils.createSvgElement('rect', {
//         'rx': Blockly.BlockSvg.CORNER_RADIUS,
//         'ry': Blockly.BlockSvg.CORNER_RADIUS,
//         'x': 0,
//         'y': 0,
//         'width': this.size_.width,
//         'height': this.size_.height,
//         'stroke': this.sourceBlock_.getColourTertiary(),
//         'fill': this.sourceBlock_.getColour(),
//         'class': 'blocklyBlockBackground',
//         'fill-opacity': 1
//     }, null);
//     this.fieldGroup_.insertBefore(this.box_, this.textElement_);
// }
// /**
//  * 画icon
//  */
// Blockly.FieldMicbtmatrix.prototype.drawSelectIcon = function () {
//     this.textElement_.parentNode.appendChild(this.iconImage_);
// }

/**
 * 获取值
 */
Blockly.FieldMicbtmatrix.prototype.getValue = function () {
    return this.value_;
};

/**
 * 设置值
 */
Blockly.FieldMicbtmatrix.prototype.setValue = function (newValue) {
    if (newValue === null || newValue === this.value_) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    this.setText('');
    this.selectIdx = this.selectIdxCache;
    // this.pageIdx = this.pageIdxCache;

    this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createIcon());
    this.iconImage_.setAttribute('transform', 'translate(0,0)');
}

/**
 * 根据二进制字符串 icon svg返回
 */
Blockly.FieldMicbtmatrix.prototype.createIcon = function () {
    let matrix = this.iconToMatrix(this.value_);
    let svg = 'data:image/svg+xml;utf8,<svg width="25" height="25" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="25" height="25" style="fill:#fff;"/>';
    let _cellW = 3.8;
    let _cellH = 3.8;
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            let val = matrix[i][j];
            let x = i * _cellW + (i + 1) * 1;
            let y = j * _cellH + (j + 1) * 1;
            svg += '<rect x="' + x + '" y="' + y + '" width="2.18" height="2" style="fill:' + (val === '0' ? 'rgb(237, 245, 254)' : '#FF0000') + ';"/>';
        }
    }

    svg += '</svg>';
    return this.svgEncode(svg);
}

Blockly.FieldMicbtmatrix.prototype.svgEncode = function (svg) {
    svg = svg.replace(/%/g, '%25');
    svg = svg.replace(/"/g, '%22');
    svg = svg.replace(/#/g, '%23');
    svg = svg.replace(/{/g, '%7B');
    svg = svg.replace(/}/g, '%7D');
    svg = svg.replace(/</g, '%3C');
    svg = svg.replace(/>/g, '%3E');
    return svg;
}

Blockly.FieldMicbtmatrix.prototype.iconToMatrix = function (value) {
    let result = new Array(this.cols);
    for (let index = 0; index < this.cols; index++) {
        result[index] = new Array(this.rows)
    }
    let arr = value.split('');
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let x = i % this.cols;
        let y = parseInt(i / this.cols);
        result[x][y] = element;
    }
    return result;
};

Blockly.FieldMicbtmatrix.prototype.emptyIcon = '0000000000000000000000000'

Blockly.FieldMicbtmatrix.prototype.iconsData = [
	'0101011111111110111000100', // heart
	'0000001010000001000101110', // happy
	'0000000000000001000101110', // smile
	'0000001010000000111010001', // sad
	'0000001010000000101010101', // confused
	'1000101010000001111110101', // angry
	'0000011011000000111000000', // asleep
	'0101000000001000101000100', // surprised
	'1000100000111110010100111', // silly
	'1111111011000000101001110', // fabulous
	'0101000000000100010001000', // meh
	'0000000001000101010001000', // yes
	'1000101010001000101010001', // no
	'1101111111011100111001110', // tshirt
	'0001100011111111111101010', // rollerskate
	'0110011100011110111000000', // duck
	'0010001110111110111001010', // house
	'0000001110111110101000000', // tortoise
	'0010011111001000101010001', // stickfigure
	'1101111111001001111111011', // butterfly
	'1111110101111111111110101', // ghost
	'0010000100001000111000100', // sword
	'1100001000010000111001010', // giraffe
	'0111010101111110111001110', // skull
	'0111011111001001010001100', // umbrella
    '1100011011010100111000000', // snake
    '0001000010001000000000000', // clock1
	'0000000011001000000000000', // clock2
	'0000000000001110000000000', // clock3
	'0000000000001000001100000', // clock4
	'0000000000001000001000010', // clock5
	'0000000000001000010000100', // clock6
	'0000000000001000100001000', // clock7
	'0000000000001001100000000', // clock8
	'0000000000111000000000000', // clock9
	'0000011000001000000000000', // clock10
	'0100001000001000000000000', // clock11
	'0010000100001000000000000', // clock12
    '0000000000000000000000000', // empty
    '0000000000000000000000000'  // empty
]

Blockly.Field.register('field_micbtmatrix', Blockly.FieldMicbtmatrix);



