'use strict';

goog.provide('Blockly.FieldOled096matrix');
goog.require('Blockly.CcModal');


// 构造函数
Blockly.FieldOled096matrix = function (value) {
    this.iconImage_ = Blockly.utils.createSvgElement('image', {
        'height': '30px',
        'width': '45px'
    });

    this.value_ = '';
    this.matrix = null;
    this.matrixCache = null;
    this.pageIdx = 0;
    this.pageIdxCache = 0;
    this.selectIdxCache = 0;
    this.selectIdx = 0;
    this.selectTool = 'pen';

    Blockly.FieldOled096matrix.superClass_.constructor.call(this, value);
};


// 继承Field
goog.inherits(Blockly.FieldOled096matrix, Blockly.Field);


// 
Blockly.FieldOled096matrix.fromJson = function (options) {
    return new Blockly.FieldOled096matrix(options['default']);
};


// 初始化
Blockly.FieldOled096matrix.prototype.init = function (block) {
    if (this.fieldGroup_) {
        return;
    }
    this.className_ += ' blocklyDropdownText';
    Blockly.FieldOled096matrix.superClass_.init.call(this);
    this.size_ = new goog.math.Size(45, 30);
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
    // 创建预览图
    this.textElement_.parentNode.appendChild(this.iconImage_);

    this.pageIdx = 0;
    this.pageIdxCache = 0;
    this.selectIdxCache = 0;
    this.selectIdx = 0;
    this.selectTool = 'pen';
    //缓存为空就不需要初始化
    if (!this.matrixCache) {
        this.matrix = this.copyMatrix(this.matrixList[0]);
        this.matrixCache = this.copyMatrix(this.matrixList[0]);
        this.value_ = this.matrixToValue(this.matrix);
        this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createImage(this.matrixCache));
    }
}


// 设置控件value
Blockly.FieldOled096matrix.prototype.setValue = function (newValue) {
    if (!newValue || newValue === this.value_) {
        return;
    }
    if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
        Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
    }
    this.setText('');

    this.value_ = newValue;
    this.selectIdx = this.selectIdxCache;
    this.pageIdx = this.pageIdxCache;

    //如果为空，说明是通过打开cdc文件初始化的，需要把
    if (!this.matrixCache) {
        let valueStrList = newValue.split(",");
        let newValueList = new Array();
        for (let y = 0; y < 8; y++) {
            let width = 16;
            let horizonMatrix = new Array(width);
            for (let x = 0; x < width; x++) {
                horizonMatrix[x] = parseInt(valueStrList[y*width+x]);
            }
            newValueList.push(horizonMatrix)
        }
        this.matrixCache = newValueList;
    }
    this.matrix = this.copyMatrix(this.matrixCache);

    this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createImage(this.matrixCache));

};

Blockly.FieldOled096matrix.prototype.getValue = function () {
    return this.value_;
}


// 显示控件
Blockly.FieldOled096matrix.prototype.showEditor_ = function () {
    this.selectIdxCache = this.selectIdx;
    this.pageIdxCache = this.pageIdx;
    this.matrixCache = this.copyMatrix(this.matrix);
    let contentDiv = Blockly.CcModal.getContentDiv();
    contentDiv.appendChild(this.createView());
    Blockly.CcModal.show(this.onHide_);
}


// 创建field view
Blockly.FieldOled096matrix.prototype.createView = function () {
    let box = document.createElement('div');
    box.style.width = '46rem';
    box.style.height = '30rem';
    box.style.boxSizing = 'border-box';
    box.style.backgroundColor = '#FFF';
    box.style.borderRadius = '1rem';
    box.style.border = '1rem solid #F2F7FB';

    box.appendChild(this.createMatrix());
    box.appendChild(this.createTools());
    box.appendChild(this.createSelect());
    box.appendChild(this.createSaveButton());
    return box;
}

Blockly.FieldOled096matrix.prototype.createSaveButton = function () {
    let button = document.createElement('div');
    button.style.width = '6rem';
    button.style.height = '2rem';
    button.style.borderRadius = '1rem';
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, 0)';
    button.style.bottom = '2.5rem';
    button.style.background = 'linear-gradient(90deg,rgba(74,156,240,1) 0%,rgba(81,221,212,1) 100%)';
    button.style.cursor = 'pointer';

    let icon = document.createElement('div');
    icon.style.width = '6rem';
    icon.style.height = '2rem';
    icon.style.borderRadius = '1rem';
    icon.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_right@2x.png")';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.backgroundPosition = 'center';
    icon.style.backgroundSize = '1.5rem 1rem';

    button.appendChild(icon);

    button.addEventListener('click', (function (e) {
        Blockly.CcModal.hide(e);
        let newValue = this.matrixToValue(this.matrixCache);
        this.setValue(newValue);
    }).bind(this));
    return button;
}

Blockly.FieldOled096matrix.prototype.matrixToValue = function (matrix) {
    return matrix.toString();
    // let valueList = new Array();
    // for (let y = 0; y < matrix.length; y++) {
    //     let width = matrix[y].length;
    //     let horizonMatrix = new Array(width);
    //     for (let x = 0; x < width; x++) {
    //         let value = 0x00;
    //         if (matrix[y][x] === 1) {
    //             value = 0xFF;
    //         }
    //         horizonMatrix[x] = value;
    //     }
    //     //每一行对应是8行渲染
    //     for (let i = 0; i < 8; i++) {
    //         valueList = valueList.concat(horizonMatrix);
    //     }
    // }
    // return valueList.toString();
}


Blockly.FieldOled096matrix.prototype.createSelect = function () {

    let box = document.createElement('div');
    box.style.width = '44rem';
    box.style.position = 'absolute';
    box.style.top = `20rem`;


    let leftBt = document.createElement('div');
    leftBt.style.width = '1.75rem';
    leftBt.style.height = '2.3rem';
    leftBt.style.margin = '0.85rem 1rem 0.85rem 1.25rem';
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
    rightBt.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
    rightBt.style.borderRadius = '0.5rem';
    rightBt.style.float = 'left';
    rightBt.style.backgroundSize = '1rem';
    rightBt.style.backgroundPosition = 'center';
    rightBt.style.backgroundRepeat = 'no-repeat';
    rightBt.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
    rightBt.style.cursor = 'pointer';

    const refreshBtImg = () => {
        if (this.pageIdxCache === 0) {
            leftBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_gray@2x.png")';
        } else {
            leftBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_green@2x.png")';
        }

        if (this.pageIdxCache === this.matrixList.length - 5) {
            rightBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray1@2x.png")';
        } else {
            rightBt.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray@2x.png")';
        }
    }
    refreshBtImg();


    let matrixImgBox = document.createElement('div');
    matrixImgBox.style.float = 'left';
    matrixImgBox.style.width = '36rem';
    box.appendChild(leftBt);
    box.appendChild(matrixImgBox);
    box.appendChild(rightBt);

    const refreshMatrixImg = () => {
        matrixImgBox.innerHTML = '';
        for (let i = this.pageIdxCache; i < this.pageIdxCache + 9; i++) {
            let imgBox = document.createElement('div');
            imgBox.style.float = 'left';
            imgBox.style.boxSizing = 'border-box';
            imgBox.style.width = '3.6rem';
            imgBox.style.height = '3.6rem';
            imgBox.style.margin = '0.2rem';
            imgBox.style.padding = '0.1rem';

            if (this.selectIdxCache === i) {
                imgBox.style.background = 'linear-gradient(#50D7D7,#00AAFF)';
            }
            let img = document.createElement('div');
            img.style.width = '3.4rem';
            img.style.height = '3.4rem';
            img.style.background = `url("${this.createImage(this.matrixList[i])}") no-repeat center`;
            img.style.backgroundSize = '100%';

            img.addEventListener('click', () => {
                this.selectIdxCache = i;
                this.matrixCache = this.copyMatrix(this.matrixList[i]);
                this.refreshMatrixView();
                refreshMatrixImg();
            });
            imgBox.appendChild(img);
            matrixImgBox.appendChild(imgBox);
        }
    }
    refreshMatrixImg();


    leftBt.addEventListener('click', () => {
        if (this.pageIdxCache === 0) return;
        if (this.pageIdxCache > 5) {
            this.pageIdxCache -= 5;
        } else {
            this.pageIdxCache = 0;
        }
        refreshBtImg();
        refreshMatrixImg();
    });
    rightBt.addEventListener('click', () => {
        if (this.pageIdxCache === this.matrixList.length - 5) return;
        if (this.pageIdxCache < this.matrixList.length - 10) {
            this.pageIdxCache += 5;
        } else {
            this.pageIdxCache = this.matrixList.length - 5;
        }
        refreshBtImg();
        refreshMatrixImg();
    });


    return box;
}

Blockly.FieldOled096matrix.prototype.createMatrix = function () {
    let box = document.createElement('div');
    box.style.width = '32rem';
    box.style.height = '16rem';
    box.style.position = 'absolute';
    box.style.left = '4rem';
    box.style.top = '2.5rem';

    let canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    box.appendChild(canvas);
    this.drawBoardMatrix(canvas);

    return box;
}

Blockly.FieldOled096matrix.prototype.drawBoardMatrix = function (canvas) {
    let canvasWidth = 1700;  // 画布宽度
    let canvasHeight = 900; // 画布高度
    let startX = 100;       // matrix区域起点X
    let startY = 100;       // matrix区域起点X
    let rectMargin = 5;     // 矩形外边距
    let rectWidth = 90;     // 矩形宽度
    let rectHeight = 90;    // 矩形高度

    //
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let context = canvas.getContext('2d');

    // 画x轴、y轴序号
    context.fillStyle = '#ADB4D0';
    context.font = "50px normal";
    for (let i = 0; i < 8; i++) {
        // context.fillText(i, i * 100 + startX + 25, 75); // x轴
        context.fillText(i, 25, i * 100 + startY + 75); // y轴
    }
    for (let i = 0; i < 16; i++) {
        context.fillText(i, i * 100 + startX + 25, 75); // x轴
        // context.fillText(i, 25, i * 100 + startY + 75); // y轴
    }

    // 画matrix区域
    const refreshMatrixView = () => {
        let matrix = this.matrixCache;
        // 清除matrix区域画布
        context.clearRect(startX, startY, 1600, 800);
        // 填充matrix区域背景
        context.fillStyle = '#333';
        context.fillRect(startX, startY, 1600, 800);
        // 画matrix
        for (let y in matrix) {
            for (let x in matrix[y]) {
                let rectX = startX + x * 100 + rectMargin; // 计算矩形位置
                let rectY = startY + y * 100 + rectMargin;
                if (matrix[y][x] === 1) {
                    context.fillStyle = '#FFF';
                    context.fillRect(rectX, rectY, rectWidth, rectHeight);
                }
            }
        }
    }
    refreshMatrixView();
    // 引用存到this 方便清除按钮调用
    this.refreshMatrixView = refreshMatrixView;


    // mouseMove时 
    const mouseMove = (e) => {
        let canvasDomWidth = canvas.getBoundingClientRect().width;
        let canvasDomHeight = canvas.getBoundingClientRect().height;
        // 计算鼠标位置 9个区域
        let x = Math.floor(e.offsetX / canvasDomWidth * 17);
        let y = Math.floor(e.offsetY / canvasDomHeight * 9);
        if (x < 1 || y < 1 || x > 16 || y > 8) return; // 处于1区域时 不做任何操作

        if (this.selectTool === 'pen') {
            // 画
            this.matrixCache[y - 1][x - 1] = 1;
        } else {
            // 擦除
            this.matrixCache[y - 1][x - 1] = 0;
        }
        refreshMatrixView();
    }

    // mouseDown时注册move等事件
    const mouseDown = (e) => {
        mouseMove(e);
        canvas.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    }

    // mouseUp时清除事件
    const mouseUp = () => {
        canvas.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

    // 注册canvas mouseDown事件
    canvas.addEventListener('mousedown', mouseDown);

}

Blockly.FieldOled096matrix.prototype.createTools = function () {
    let box = document.createElement('div');
    box.style.width = '3rem';
    box.style.height = '12rem';
    box.style.position = 'absolute';
    box.style.left = '38rem';
    box.style.top = '4.5rem';

    const createToolDom = () => {
        let toolBox = document.createElement('div');
        toolBox.style.width = '3rem';
        toolBox.style.height = '3rem';
        toolBox.style.borderRadius = '50%';
        toolBox.style.padding = '0.7rem';
        toolBox.style.boxSizing = 'border-box'
        toolBox.style.marginTop = '1rem';

        let tool = document.createElement('div');
        tool.style.width = '1.6rem';
        tool.style.height = '1.6rem';
        tool.style.backgroundRepeat = 'no-repeat';
        tool.style.backgroundSize = 'contain';
        toolBox.appendChild(tool);
        return { toolBox, tool };
    }

    const drawTools = () => {
        box.innerHTML = '';
        let toolDom = createToolDom();
        let penbox = toolDom.toolBox;
        let pen = toolDom.tool;

        toolDom = createToolDom();
        let eraserbox = toolDom.toolBox;
        let eraser = toolDom.tool;

        if (this.selectTool === 'pen') {
            penbox.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
            pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
            eraserbox.style.background = 'rgba(0,0,0,0)';
            eraser.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';
        } else {
            penbox.style.background = 'rgba(0,0,0,0)';
            pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_purple@2x.png")';
            eraserbox.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
            eraser.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_white@2x.png")';
        }

        toolDom = createToolDom();
        let clearbox = toolDom.toolBox;
        let clear = toolDom.tool;
        clearbox.style.background = 'rgba(0,0,0,0)';
        clear.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_rubbish_red@2x.png")';


        pen.addEventListener('click', () => {
            this.selectTool = 'pen';
            drawTools();
        });
        eraser.addEventListener('click', () => {
            this.selectTool = 'eraser';
            drawTools();
        });
        clear.addEventListener('click', () => {
            for (let row of this.matrixCache)
                for (let i in row) row[i] = 0;
            this.refreshMatrixView();
        });

        box.appendChild(penbox);
        box.appendChild(eraserbox);
        box.appendChild(clearbox);
    }
    drawTools();

    return box;
}




Blockly.FieldOled096matrix.prototype.onHide_ = function () {
};


Blockly.FieldOled096matrix.prototype.svgEncode = function (svg) {
    svg = svg.replace(/%/g, '%25');
    svg = svg.replace(/"/g, '%22');
    svg = svg.replace(/#/g, '%23');
    svg = svg.replace(/{/g, '%7B');
    svg = svg.replace(/}/g, '%7D');
    svg = svg.replace(/</g, '%3C');
    svg = svg.replace(/>/g, '%3E');
    return svg;
}

Blockly.FieldOled096matrix.prototype.copyMatrix = function (matrix) {
    return JSON.parse(JSON.stringify(matrix));
}


Blockly.FieldOled096matrix.prototype.createImage = function (matrix) {

    let svg = `data:image/svg+xml;utf8,<svg width='1600' height='800' version='1.1' xmlns='http://www.w3.org/2000/svg'>`;
    for (let y in matrix) {
        for (let x in matrix[y]) {
            let color = '#333';
            if (matrix[y][x] === 1) {
                color = '#FFF';
            }
            svg += `<rect x='${x * 100}' y='${y * 100}' width='100' height='100' style='fill:${color}; stroke-width:5; stroke:#333;'/>`;
        }
    }
    svg += `</svg>`;
    return this.svgEncode(svg);
}

Blockly.Field.register('field_oled_096matrix', Blockly.FieldOled096matrix);


Blockly.FieldOled096matrix.prototype.matrixList = [
    [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
    ],
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]], 
    [[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]]];
