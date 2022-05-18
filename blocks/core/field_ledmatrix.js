'use strict';

goog.provide('Blockly.FieldLedmatrix');
goog.require('Blockly.Field');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.CcModal');

const MOUSE_ACTION_ERASURE = 0;
const MOUSE_ACTION_DRAW = 1;

/**
 * 构造函数
 */
Blockly.FieldLedmatrix = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'height': '30px',
        'width': '30px'
    });
    Blockly.FieldLedmatrix.superClass_.constructor.call(this, value);
    this.addArgType('ledmatrix');
}

// 继承 Blockly.Field
goog.inherits(Blockly.FieldLedmatrix, Blockly.Field);

// 
Blockly.FieldLedmatrix.fromJson = function (options) {
    return new Blockly.FieldLedmatrix(options['default']);
};

/**
 * 初始化函数
 */
Blockly.FieldLedmatrix.prototype.init = function (block) {
    this.className_ += ' blocklyDropdownText';

    Blockly.FieldLedmatrix.superClass_.init.call(this);

    this.size_ = new goog.math.Size(30, 30);
    this.shapeData = [];
    this.mouseDown = false;
    this.pageIdx = 0;
    this.pageIdxCache = 0;
    this.gridMapBox = null;
    this.gridMap = null;
    this.mouseAction = MOUSE_ACTION_DRAW;
    this.selectIdxCache = 0;
    this.selectIdx = 0;
    this.drawSelectBox(); // 画边框
    this.drawSelectIcon();// 画icon
}


Blockly.FieldLedmatrix.prototype.showEditor_ = function () {
    this.mouseAction = MOUSE_ACTION_DRAW;
    this.selectIdxCache = this.selectIdx;
    this.pageIdxCache = this.pageIdx;

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




Blockly.FieldLedmatrix.prototype.createField = function () {
    let box = document.createElement('div');
    box.style.width = '28rem';
    box.style.height = '28rem';
    box.style.backgroundColor = 'rgba(242,247,251,1)';
    box.style.borderRadius = '1rem';
    box.style.padding = '1rem';
    box.style.boxSizing = 'content-box';

    let fieldBox = document.createElement('div');
    fieldBox.style.width = '28rem';
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

Blockly.FieldLedmatrix.prototype.createCloseBt = function () {
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

Blockly.FieldLedmatrix.prototype.createGridMap = function () {
    this.gridMap = document.createElement('div');
    this.gridMap.style.width = '11rem';
    this.gridMap.style.height = '13.2rem';
    this.gridMap.style.position = 'absolute';
    this.gridMap.style.left = '8rem';
    this.gridMap.style.top = '4rem';

    let shapeData = this.getShapeData(this.getValue());
    this.setShapeData(shapeData);
    return this.gridMap;
}
Blockly.FieldLedmatrix.prototype.createTipsX = function () {
    let tipsX = document.createElement('div');
    tipsX.style.width = '11rem';
    tipsX.style.position = 'absolute';
    tipsX.style.top = '17.5rem';
    tipsX.style.left = '8rem';
    tipsX.style.color = '#ADB4D0';
    tipsX.style.userSelect = 'none';
    for (let i = 1; i <= 5; i++) {
        let item = document.createElement('div');
        item.style.width = '20%';
        item.style.float = 'left';
        item.style.textAlign = 'center';
        item.style.userSelect = 'none';
        item.innerText = i;
        tipsX.appendChild(item);
    }
    return tipsX;
}

Blockly.FieldLedmatrix.prototype.createTipsY = function () {
    let tipsY = document.createElement('div');
    tipsY.style.width = '1rem';
    tipsY.style.height = '13.2rem';
    tipsY.style.position = 'absolute';
    tipsY.style.top = '4.3rem';
    tipsY.style.left = '6.3rem';
    tipsY.style.color = '#ADB4D0';

    for (let i = 1; i <= 6; i++) {
        let item = document.createElement('div');
        item.style.width = '1rem';
        item.style.height = '17%';
        item.style.textAlign = 'center';
        item.style.userSelect = 'none';
        item.innerText = String.fromCharCode(i + 0x40);
        tipsY.appendChild(item);
    }
    return tipsY;
}

Blockly.FieldLedmatrix.prototype.createSelectGridMap = function () {
    let selectGridMap = document.createElement('div');
    selectGridMap.style.width = '28rem';
    selectGridMap.style.position = 'absolute';
    selectGridMap.style.top = '20rem';
    selectGridMap.style.left = '1rem';

    let leftBt = document.createElement('div');
    leftBt.style.width = '1.75rem';
    leftBt.style.height = '2.3rem';
    leftBt.style.margin = '0.85rem 1rem 0.85rem 1.25rem';
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
    rightBt.style.margin = '0.85rem 1.25rem 0.85rem 1rem';
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
        if (this.pageIdxCache === 0) {
            leftBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_gray@2x.png")';
        } else {
            leftBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_green@2x.png")';
        }

        if (this.pageIdxCache === this.iconsData.length - 5) {
            rightBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray1@2x.png")';
        } else {
            rightBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray@2x.png")';
        }
    }).bind(this);
    setImg();

    leftBt.addEventListener('click', (function () {
        if (this.pageIdxCache === 0) return;

        if (this.pageIdxCache > 5) {
            this.pageIdxCache -= 5;
        } else {
            this.pageIdxCache = 0;
        }

        this.drawGridMapBox();
        setImg();
    }).bind(this));

    rightBt.addEventListener('click', (function () {
        if (this.pageIdxCache === this.iconsData.length - 5) return;
        if (this.pageIdxCache < this.iconsData.length - 10) {
            this.pageIdxCache += 5;
        } else {
            this.pageIdxCache = this.iconsData.length - 5;
        }

        this.drawGridMapBox();
        setImg();
    }).bind(this));

    this.gridMapBox = document.createElement('div');
    this.gridMapBox.style.width = '20rem';
    this.gridMapBox.style.float = 'left';

    selectGridMap.appendChild(leftBt);
    this.drawGridMapBox();
    selectGridMap.appendChild(this.gridMapBox);
    selectGridMap.appendChild(rightBt);

    return selectGridMap;
}

Blockly.FieldLedmatrix.prototype.drawGridMapBox = function () {
    this.gridMapBox.innerHTML = '';
    for (let i = this.pageIdxCache; i < this.pageIdxCache + 5; i++) {
        let shapeData = this.getShapeData(this.iconsData[i]);
        let gridMap = document.createElement('div');
        gridMap.style.height = '100%';
        gridMap.style.width = '100%';
        gridMap.style.backgroundColor = '#fff';

        let gridMapBkg = document.createElement('div');
        gridMapBkg.style.padding = '2px';
        gridMapBkg.appendChild(gridMap);
        gridMapBkg.style.float = 'left';
        gridMapBkg.style.margin = '0.25rem';
        gridMapBkg.style.height = '4rem';
        gridMapBkg.style.width = '3.5rem';
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
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 5; x++) {
                let light = parseInt(shapeData[y][x]);
                gridMap.appendChild(this.createGrid(x, y, light, false));
            }
        }
        this.gridMapBox.appendChild(gridMapBkg);
    }
    return this.gridMapBox;
}







Blockly.FieldLedmatrix.prototype.setShapeData = function (newShapeData) {
    this.shapeData = newShapeData;
    this.drawGridMap();
}

Blockly.FieldLedmatrix.prototype.drawGridMap = function () {
    this.gridMap.innerHTML = '';
    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 5; x++) {
            let light = parseInt(this.shapeData[y][x]);
            this.gridMap.appendChild(this.createGrid(x, y, light));
        }
    }
}

Blockly.FieldLedmatrix.prototype.createGrid = function (x, y, light, isAddListen = true) {
    let color = light ? '#00AAFF' : 'rgba(0,0,0,0)';
    let grid = document.createElement('div');
    grid.style.width = '18%';
    grid.style.height = '15%';
    grid.style.border = '1px solid #C8E4FC';
    grid.style.backgroundColor = color;
    grid.style.float = 'left';
    grid.style.boxSizing = 'border-box';
    grid.style.margin = '1%';
    grid.setAttribute('data-light', light);
    grid.setAttribute('data-x', x);
    grid.setAttribute('data-y', y);



    const ligntOnOff = (function (e) {
        let target = e.target;
        let dataX = target.getAttribute('data-x');
        let dataY = target.getAttribute('data-y');

        if (this.mouseAction === MOUSE_ACTION_DRAW) {
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



Blockly.FieldLedmatrix.prototype.updateShapeData = function (x, y, light) {
    let data = this.shapeData[y].split('');
    data[x] = light;
    this.shapeData[y] = data.join('');
}

Blockly.FieldLedmatrix.prototype.getShapeData = function (value) {
    let shapeData = [];
    for (let i = 0; i < 6; i++) {
        let row = '';
        for (let j = 0; j < 5; j++) {
            row = row + value[j * 6 + i];
        }
        shapeData.push(row);
    }
    return shapeData;
}

Blockly.FieldLedmatrix.prototype.getShapeValue = function () {
    let value = '';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            value = value + this.shapeData[j][i];
        }
    }
    return value;
}


Blockly.FieldLedmatrix.prototype.createToolBox = function () {
    let toolBox = document.createElement('div');
    toolBox.style.width = '3rem';
    toolBox.style.height = '9rem';
    toolBox.style.position = 'absolute';
    toolBox.style.left = '21rem';
    toolBox.style.top = '5.5rem';

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
        this.mouseAction = MOUSE_ACTION_DRAW;
        pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
        rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';
        penBkg.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
        rubberBkg.style.background = 'rgba(0,0,0,0)';
    }).bind(this));



    rubber.addEventListener('click', (function () {
        this.mouseAction = MOUSE_ACTION_ERASURE;
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
        let value = '000000000000000000000000000000';
        let shapeData = this.getShapeData(value);
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
Blockly.FieldLedmatrix.prototype.createConfirmBt = function () {
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
        let newValue = this.getShapeValue();
        this.setValue(newValue);
    }).bind(this));
    return bt;
}


/**
 * 画边框
 */
Blockly.FieldLedmatrix.prototype.drawSelectBox = function () {
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
Blockly.FieldLedmatrix.prototype.drawSelectIcon = function () {
    this.textElement_.parentNode.appendChild(this.iconImage_);
}




/**
 * 获取值
 */
Blockly.FieldLedmatrix.prototype.getValue = function () {
    return this.value_;
};


/**
 * 设置值
 */
Blockly.FieldLedmatrix.prototype.setValue = function (newValue) {
    if (newValue === null || newValue === this.value_) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.value_ = newValue;
    this.setText('');
    this.selectIdx = this.selectIdxCache;
    this.pageIdx = this.pageIdxCache;
    this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createIcon());
    this.iconImage_.setAttribute('transform', 'translate(0,0)');
}



function svgEncode(svg) {
    svg = svg.replace(/%/g, '%25');
    svg = svg.replace(/"/g, '%22');
    svg = svg.replace(/#/g, '%23');
    svg = svg.replace(/{/g, '%7B');
    svg = svg.replace(/}/g, '%7D');
    svg = svg.replace(/</g, '%3C');
    svg = svg.replace(/>/g, '%3E');
    return svg;
  }
/**
 * 根据二进制字符串 icon svg返回
 */
Blockly.FieldLedmatrix.prototype.createIcon = function () {
    let bits = this.value_.split('');
    let svg = 'data:image/svg+xml;utf8,<svg width="26" height="25" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="26" height="25" style="fill:#fff;"/>';
    for (let i = 0; i < bits.length; i++) {
        let val = bits[i];
        let y = (i % 6) + 1;
        let x = parseInt(i / 6) + 1;
        x = 1 + ((x - 1) * 5);
        y = 1 + ((y - 1) * 4);
        svg += '<rect x="' + x + '" y="' + y + '" width="4" height="3" style="fill:' + (val === '0' ? 'rgb(237, 245, 254)' : '#00AAFF') + ';"/>';
    }
    svg += '</svg>';
    return svgEncode(svg);
}

Blockly.FieldLedmatrix.prototype.iconsData = [
    '001000011100001110011100001000',
    '000000001100000110001100000000',
    '000100000010000100001000010000',
    '010001001010000100001010010001',
    '111111011110011110011110111111',
    '000100010010000010010010000100',
    '000010010100000100010100000010',
    '000000010111000101010111000000',
    '110000010101000001010101110000',
    '000000010010000010010010000000',
    '010000010101000010010101010000',
    '010000110101010001110101010000',
    '001011011001111111011000001000',
    '000000010000100101011000000000',
    '000000000000111101000000000000',
    '010000111111000010000010000011',
    '111100010110111111000010000111',
    '001100011111111101011111001100',
    '100110011001001011011001100110',
    '001000011111111000011111001000',
    '001000010000111111010000001000',
    '000100000010111111000010000100',
    '001000011100101010001000001000',
    '001000001000101010011100001000',
    '011100100010101010100010011100',
];

/**
 * 注册
 */
Blockly.Field.register('field_ledmatrix', Blockly.FieldLedmatrix);



