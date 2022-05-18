'use strict';

goog.provide('Blockly.FieldElfLedmatrix');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

Blockly.FieldElfLedmatrix = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'height': '30px',
        'width': '60px'
    });
    Blockly.FieldElfLedmatrix.superClass_.constructor.call(this, value);
    this.addArgType('ledmatrix');
}
goog.inherits(Blockly.FieldElfLedmatrix, Blockly.Field);

Blockly.FieldElfLedmatrix.prototype.rows = 8;
Blockly.FieldElfLedmatrix.prototype.cols = 16;
Blockly.FieldElfLedmatrix.MOUSE_ACTION_ERASURE = 0;
Blockly.FieldElfLedmatrix.MOUSE_ACTION_DRAW = 1;

Blockly.FieldElfLedmatrix.SELECTBAR_SIZE = 3;

Blockly.FieldElfLedmatrix.fromJson = function (options) {
    return new Blockly.FieldElfLedmatrix(options['default']);
};

Blockly.FieldElfLedmatrix.prototype.init = function () {
    this.className_ += ' blocklyDropdownText';

    Blockly.FieldElfLedmatrix.superClass_.init.call(this);

    this.size_ = new goog.math.Size(60, 30);
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
    this.mouseAction = Blockly.FieldElfLedmatrix.MOUSE_ACTION_DRAW;
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

Blockly.FieldElfLedmatrix.prototype.showEditor_ = function () {
    this.mouseAction = Blockly.FieldElfLedmatrix.MOUSE_ACTION_DRAW;
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

Blockly.FieldElfLedmatrix.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '40rem';
    box.style.height = '28rem';
    box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '1rem';
    box.style.padding = '1rem';
    box.style.boxSizing = 'content-box';

    let fieldBox = document.createElement('div');
    fieldBox.style.width = '40rem';
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

Blockly.FieldElfLedmatrix.prototype.createCloseBt = function () {
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

Blockly.FieldElfLedmatrix.prototype.createGridMap = function () {
    this.gridMap = document.createElement('div');
    this.gridMap.style.width = '26.4rem';
    this.gridMap.style.height = '13.2rem';
    this.gridMap.style.position = 'absolute';
    this.gridMap.style.left = '8rem';
    this.gridMap.style.top = '5rem';

    let shapeData = this.getShapeData(this.getValue());
    this.setShapeData(shapeData);
    return this.gridMap;
}
Blockly.FieldElfLedmatrix.prototype.createTipsX = function () {
    let tipsX = document.createElement('div');
    tipsX.style.width = '26.19rem';
    tipsX.style.position = 'absolute';
    tipsX.style.top = '3.2rem';
    tipsX.style.left = '8rem';
    tipsX.style.color = '#ADB4D0';
    tipsX.style.userSelect = 'none';
    for (let i = 1; i <= this.cols; i++) {
        let item = document.createElement('div');
        item.style.width = '6.25%';
        item.style.float = 'left';
        item.style.textAlign = 'center';
        item.style.userSelect = 'none';
        item.innerText = i;
        tipsX.appendChild(item);
    }
    return tipsX;
}

Blockly.FieldElfLedmatrix.prototype.createTipsY = function () {
    let tipsY = document.createElement('div');
    tipsY.style.width = '1rem';
    tipsY.style.height = '13.2rem';
    tipsY.style.position = 'absolute';
    tipsY.style.top = '5.4rem';
    tipsY.style.left = '6.0rem';
    tipsY.style.color = '#ADB4D0';

    for (let i = 1; i <= this.rows; i++) {
        let item = document.createElement('div');
        item.style.width = '1rem';
        item.style.height = '12.5%';
        item.style.textAlign = 'center';
        item.style.userSelect = 'none';
        item.innerText = String.fromCharCode(i + 0x40);
        tipsY.appendChild(item);
    }
    return tipsY;
}

Blockly.FieldElfLedmatrix.prototype.createSelectGridMap = function () {
    let selectGridMap = document.createElement('div');
    selectGridMap.style.width = '35rem';
    selectGridMap.style.position = 'absolute';
    selectGridMap.style.top = '20rem';
    selectGridMap.style.left = '4rem';
    selectGridMap.style.textAlign = 'center';

    let leftBt = document.createElement('div');
    leftBt.style.width = '1.75rem';
    leftBt.style.height = '2.3rem';
    leftBt.style.margin = '1.3rem 1rem 0.85rem 1.25rem';
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
    rightBt.style.margin = '1.3rem 1.25rem 0.85rem 1rem';
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
    this.gridMapBox.style.width = '30rem';

    selectGridMap.appendChild(leftBt);
    this.drawGridMapBox();
    selectGridMap.appendChild(this.gridMapBox);
    selectGridMap.appendChild(rightBt);

    return selectGridMap;
}

Blockly.FieldElfLedmatrix.prototype.pageCount = function () {
    let pageCount;
    if (this.iconsData.length % Blockly.FieldElfLedmatrix.SELECTBAR_SIZE === 0) {
        pageCount = parseInt(this.iconsData.length / Blockly.FieldElfLedmatrix.SELECTBAR_SIZE);
    } else {
        pageCount = parseInt(this.iconsData.length / Blockly.FieldElfLedmatrix.SELECTBAR_SIZE) + 1;
    }
    return pageCount;
}

Blockly.FieldElfLedmatrix.prototype.drawGridMapBox = function () {

    this.gridMapBox.innerHTML = '';

    let startIndex = this.pageIndex * Blockly.FieldElfLedmatrix.SELECTBAR_SIZE;
    // let endIndex = this.pageIndex === this.pageCount() - 1 ?
    //     (startIndex + this.iconsData.length % Blockly.FieldElfLedmatrix.SELECTBAR_SIZE) : startIndex + Blockly.FieldElfLedmatrix.SELECTBAR_SIZE;
    let endIndex = startIndex + Blockly.FieldElfLedmatrix.SELECTBAR_SIZE;
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
        gridMapBkg.style.margin = '0.2rem';
        gridMapBkg.style.height = '4.4rem';
        gridMapBkg.style.width = '8.26rem';
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

    // if(this.pageIndex === this.pageCount() - 1){
    //     let emptyView1 = document.createElement('div');
    //     emptyView1.style.padding = '2px';
    //     emptyView1.style.float = 'left';
    //     emptyView1.style.margin = '0.2rem';
    //     emptyView1.style.height = '4.4rem';
    //     emptyView1.style.width = '8.26rem';
    //     emptyView1.style.boxSizing = 'border-box';
    //     emptyView1.style.background = '#fff';
    //     this.gridMapBox.appendChild(emptyView1);
    //     let emptyView2 = document.createElement('div');
    //     emptyView2.style.padding = '2px';
    //     emptyView2.style.float = 'left';
    //     emptyView2.style.margin = '0.2rem';
    //     emptyView2.style.height = '4.4rem';
    //     emptyView2.style.width = '8.26rem';
    //     emptyView2.style.boxSizing = 'border-box';
    //     emptyView2.style.background = '#fff';
    //     this.gridMapBox.appendChild(emptyView2);
    // }

    return this.gridMapBox;
}


Blockly.FieldElfLedmatrix.prototype.setShapeData = function (newShapeData) {
    this.shapeData = newShapeData;
    this.drawGridMap();
}

Blockly.FieldElfLedmatrix.prototype.drawGridMap = function () {
    this.gridMap.innerHTML = '';
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            let el = this.shapeData[j][i];
            let view = this.createGrid(j, i, parseInt(el));
            this.gridMap.appendChild(view);
        }
    }
}

Blockly.FieldElfLedmatrix.prototype.createGrid = function (x, y, light, isAddListen = true) {
    let color = light ? '#00AAFF' : 'rgba(0,0,0,0)';
    let grid = document.createElement('div');
    grid.style.width = '5.02%';
    grid.style.height = '10.3%';
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

        if (this.mouseAction === Blockly.FieldElfLedmatrix.MOUSE_ACTION_DRAW) {
            target.style.backgroundColor = '#00AAFF';
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

Blockly.FieldElfLedmatrix.prototype.getShapeData = function (value) {
    return this.iconToMatrix(value);
}

Blockly.FieldElfLedmatrix.prototype.updateShapeData = function (x, y, light) {
    this.shapeData[x][y] = light;
}

Blockly.FieldElfLedmatrix.prototype.getShapeValue = function () {
    let result = '';
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            result += this.shapeData[j][i];
        }
    }
    return result;
}

Blockly.FieldElfLedmatrix.prototype.createToolBox = function () {
    let toolBox = document.createElement('div');
    toolBox.style.width = '3rem';
    toolBox.style.height = '9rem';
    toolBox.style.position = 'absolute';
    toolBox.style.left = '36rem';
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
        this.mouseAction = Blockly.FieldElfLedmatrix.MOUSE_ACTION_DRAW;
        pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
        rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';
        penBkg.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
        rubberBkg.style.background = 'rgba(0,0,0,0)';
    }).bind(this));

    rubber.addEventListener('click', (function () {
        this.mouseAction = Blockly.FieldElfLedmatrix.MOUSE_ACTION_ERASURE;
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
Blockly.FieldElfLedmatrix.prototype.createConfirmBt = function () {
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
// Blockly.FieldElfLedmatrix.prototype.drawSelectBox = function () {
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
// Blockly.FieldElfLedmatrix.prototype.drawSelectIcon = function () {
//     this.textElement_.parentNode.appendChild(this.iconImage_);
// }

/**
 * 获取值
 */
Blockly.FieldElfLedmatrix.prototype.getValue = function () {
    return this.value_;
};

/**
 * 设置值
 */
Blockly.FieldElfLedmatrix.prototype.setValue = function (newValue) {
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
Blockly.FieldElfLedmatrix.prototype.createIcon = function () {
    let matrix = this.iconToMatrix(this.value_);
    let svg = 'data:image/svg+xml;utf8,<svg width="52" height="25" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="52" height="25" style="fill:#fff;"/>';
    let _cellW = 2.18;
    let _cellH = 2;
    for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
            let val = matrix[i][j];
            let x = i * _cellW + (i + 1) * 1;
            let y = j * _cellH + (j + 1) * 1;
            svg += '<rect x="' + x + '" y="' + y + '" width="2.18" height="2" style="fill:' + (val === '0' ? 'rgb(237, 245, 254)' : '#00AAFF') + ';"/>';
        }
    }

    svg += '</svg>';
    return this.svgEncode(svg);
}

Blockly.FieldElfLedmatrix.prototype.svgEncode = function (svg) {
    svg = svg.replace(/%/g, '%25');
    svg = svg.replace(/"/g, '%22');
    svg = svg.replace(/#/g, '%23');
    svg = svg.replace(/{/g, '%7B');
    svg = svg.replace(/}/g, '%7D');
    svg = svg.replace(/</g, '%3C');
    svg = svg.replace(/>/g, '%3E');
    return svg;
}

Blockly.FieldElfLedmatrix.prototype.iconToMatrix = function (value) {
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

Blockly.FieldElfLedmatrix.prototype.emptyIcon = '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

Blockly.FieldElfLedmatrix.prototype.iconsData = [
    '00000000000000000000000000000000000000000000000000111100001111000100001001000010000000000000000000000000000000000000000000000000',
    '00000000000000000000000000111100000000000111111000111100011011100100001001111110000000000111111000000000001111000000000000000000',
    '00000000000000000000000000000000001111000011110001100110011001100110011001100110011001100110011000000000000000000000000000000000',
    '00000000000000000010000000000100010100000000101010111100001111010110011001100110010000100100001000000000000000000000000000000000',
    '00000000000000000101000000001010101111000011110101110010011100100101111001011110001111000011110000000000000000000000000000000000',
    '00000000000000000000000000000000000011000011000000001100001100000000110000110000000011000011000000001100001100000000000000000000',
    '00000000000000000000000000000000000011000001110000001100001110000000110001110000000011000011100000001100000111000000000000000000',
    '00000000000000000001010000101000001011100101110000111110011111000001110000111000000010000001000000000000000000000000000000000000',
    '00000000000000000001010000101000001010100101010000100010010001000001010000101000000010000001000000000000000000000000000000000000',
    '00000000000000000000000000000000001110000001110001011100001011101000001001000001111111100111111100000000000000000000000000000000',
    '00000000000000000000000000000000001110000001110001000100001000101011001001011001111111100111111100000000000000000000000000000000',
    '00000000000000000000000000000000111111101111111010011010100110100100010001000100001110000011100000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000000000010010000000111111001111110001111000011110000011000000110000000000000000000',
    '00000000000000000000000000001000000000000000101000000010010000000111111001111110001111000011110000011000000110000000000000000000',
    '00000000000000000000001001000000000001100110000000000000000000000111111001111110001111000011110000011000000110000000000000000000',
    '00001000000100000000010000100000000000100100000000000000000000000111111001111110001111000011110000011000000110000000000000000000',
    '00000000000000000011110000111100011111100111111001110010010011100101001001001110011111100111111000111100001110000000000000000000',
    '00000000000000000111111001111110011111100111111000011000000110000001100000011000000110000001100000011000000110000000000000000000',
    '00000000000000000000000000000000000111000011100000100010010001000010001001000100010011000011001000110000000011000000000000000000',
    '00000000000000000000000000000000000111000011100000100010010001000010001001000100000111000011100000000000000000000000000000000000',
    '00000000000000000000000000000000000110000001100000000100001000000000110000110000000011000011000000000000000000000000000000000000',
    '00000000000000000001001001001000000010100101000000000100001000000000110000110000000011000011000000000000000000000000000000000000',
    '00000000000000000000000000000000011111100111111001111110011111100000000000000000000000000000000000000000000000000000000000000000',
    '00000000000000000011110000111100010000100100001001010010010100100101110001011100010000000100000000111100001111000000000000000000',
    '00000000000000000000000000000000001111000011110001111110011111100101101001011010001111000011110000000000000000000000000000000000',
    '00000000000000000000000000000000000000000000000001000010010000100011110000111100000000000000000000000000000000000000000000000000',
    '00000000000000000000000000000000011111100111111000011100000111000011100000111000011111100111111000000000000000000000000000000000',
    '00000000000000000011110000111100010000100100001001011010010110100101101001011010010000100100001000111100001111000000000000000000',
    '00000000000000000000110000110000000100000000100000100000000001000000000000000000000111100111100000000110000110000000000000000000',
    '00000000000000000000000000000000111111111111111101011101010111010011101000111010000111000001110000000000000000000000000000000000',
    '00000000000000000001111001111000000101100101100000000110000110000000110000110000000000000000000000001100001100000000000000000000',
    '00000000000000000000000000000000001000100100010000010100001010000000100000010000000101000010100000100010010001000000000000000000',
    '00000000000000000000000000000000001110000101110000011100011110000000111001110000000111000011100000111000000111000000000000000000',
    '00000000000000000000000000000000000010000000100001111100011111000111111001111110011111000111110000001000000010000000000000000000',
    '00000000000000000000000000000000000100000001000000111110001111100111111001111110001111100011111000010000000100000000000000000000',
    '00000000000000000000100000010000000111000011100000111110011111000001110000111000000111000011100000011100001110000000000000000000',
    '00000000000000000001110000111000000111000011100000011100001110000011111001111100000111000011100000001000000100000000000000000000',
    '00000000000000000101011101010111010101000101010101110111010101010101010001010101010101110101011100000000000000000000000000000000',
    '00000000000000000110010101110000010101010100000001110101011101100101001001000000011000100111000000000000000000000000000000000000',
    '00000000000000000001111010010000000100101010000000010010110011000001001010100000000111101001000000000000000000000000000000000000',
    '00000000000000000111011101110110010001010101010101010101010101010101010101010101011101110111011000000000000000000000000000000000',
    '00000000000000000010101110111000001010100010000000101011101110000001001000001000000100111011100000000000000000000000000000000000',
    '00000000000000000000100101111000000011010100100000001011010010000000100101001000000010010111100000000000000000000000000000000000',
    // '00000000000000000011111111111000001000000000110000100000000011000010000000001100001000000000110000111111111110000000000000000000',
    '00000000000000000011110000111100000110000001100001000011110000100010000110000100000010011001000000100110011001000100000000000010',
    '00000000000000000000110000110000000111100111100000111110011111000110111001110110011111000011111000111011110111000000000110000000'
]

Blockly.Field.register('field_elfledmatrix', Blockly.FieldElfLedmatrix);



