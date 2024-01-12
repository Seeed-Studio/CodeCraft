'use strict';

goog.provide('Blockly.FieldRedmatrix');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('Blockly.CcModal');
/**
 * 构造函数 
 */
Blockly.FieldRedmatrix = function (value) {

  this.iconImage_ = Blockly.utils.createSvgElement('image', {
    'height': '30px',
    'width': '30px'
  });
  // 默认显示第一个
  let icon = this.rgb_icons[0];
  // 遍历矩阵
  for (let m = 0; m < this.rows; m++) {
    for (let n = 0; n < this.cols; n++) {
      this.matrix[m][n] = icon.matrix[m][n];
    }
  }
  // value赋值
  value = JSON.stringify(icon);
  // 调用父类构造函数
  Blockly.FieldRedmatrix.superClass_.constructor.call(this, value);
};
goog.inherits(Blockly.FieldRedmatrix, Blockly.Field);

Blockly.FieldRedmatrix.fromJson = function (options) {
  return new Blockly.FieldRedmatrix(options['default']);
};
/**
 * 初始化函数
 */
Blockly.FieldRedmatrix.prototype.init = function (block) {
  if (this.fieldGroup_) {
    return;
  }
  this.className_ += ' blocklyDropdownText';

  Blockly.FieldRedmatrix.superClass_.init.call(this);
  this.size_ = new goog.math.Size(30, 30);

  this.mouseDown = false;
  this.colorSelectDiv = document.createElement('div');


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

  //创建字段预览图
  this.textElement_.parentNode.appendChild(this.iconImage_);
  // this.render_();
}


/**
 * 设置字段值
 */
Blockly.FieldRedmatrix.prototype.cachData = null;
Blockly.FieldRedmatrix.prototype.setValue = function (newValue) {
  if (newValue === null || newValue === this.value_) {
    return;
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
  }
  this.value_ = newValue;
  Blockly.FieldRedmatrix.prototype.cachData = this.value_;
  this.setText('');
  this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createImage(this.value_));
};

/**
 * 获取字段值
 */
Blockly.FieldRedmatrix.prototype.getValue = function () {
  return this.value_;
};


Blockly.FieldRedmatrix.prototype.div = null;
Blockly.FieldRedmatrix.prototype.editdiv = null;
Blockly.FieldRedmatrix.prototype.eraserdiv = null;
Blockly.FieldRedmatrix.prototype.cleardiv = null;
Blockly.FieldRedmatrix.prototype.buttonstatus = "lift";
Blockly.FieldRedmatrix.prototype.initSelectStatus = true;
Blockly.FieldRedmatrix.prototype.workspaceStatus = false;
Blockly.FieldRedmatrix.prototype.selectEmojinumber = 0;


Blockly.FieldRedmatrix.prototype.fixSize = function () {
  // 适配,计算了多数常用机型取得范围
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  if (width <= 1000) {
    var s = 0.4;
  } else if (width > 1000) {
    var s = 0.75;
  }
  return { width, height, s }
}
/**
 * 点击展开函数
 */
Blockly.FieldRedmatrix.prototype.showEditor_ = function () {
  let contentDiv = Blockly.CcModal.getContentDiv();
  let field = this.createField();
  contentDiv.appendChild(field);
  Blockly.CcModal.show(this.onHide_);

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


Blockly.FieldRedmatrix.prototype.createField = function () {
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
  fieldBox.appendChild(this.initCanvas_());
  fieldBox.appendChild(this.initSelect_());
  fieldBox.appendChild(this.matrixTipsX());
  fieldBox.appendChild(this.matrixTipsY());
  fieldBox.appendChild(this.determine_());

  let editdiv = this.edit();
  Blockly.FieldRedmatrix.prototype.editdiv = editdiv;
  fieldBox.appendChild(editdiv);

  let eraserdiv = this.eraser();
  Blockly.FieldRedmatrix.prototype.eraserdiv = eraserdiv;
  fieldBox.appendChild(eraserdiv);

  let cleardiv = this.clear();
  Blockly.FieldRedmatrix.prototype.cleardiv = cleardiv;
  fieldBox.appendChild(cleardiv);

  // 创建颜色选额区域
  // this.colorSelect();

  return box;
}

Blockly.FieldRedmatrix.prototype.createCloseBt = function () {
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
/**
 * 收起菜单函数
 */
Blockly.FieldRedmatrix.prototype.onHide_ = function () {

};


//创建确定按钮
Blockly.FieldRedmatrix.prototype.determine_ = function () {
  let self = this;
  let determine = document.createElement('div');
  determine.style.width = `6rem`;
  determine.style.height = `2rem`;
  determine.style.position = 'fixed';
  determine.style.borderRadius = '1rem';
  determine.style.left = '50%';
  determine.style.bottom = `2rem`;
  determine.style.transform = 'translateX(-50%)';
  determine.style.background = 'linear-gradient(90deg,rgba(74,156,240,1) 0%,rgba(81,221,212,1) 100%)';

  let icon = document.createElement('div');
  icon.style.width = '6rem';
  icon.style.height = '2rem';
  icon.style.borderRadius = '1rem';
  icon.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_right@2x.png")';
  icon.style.backgroundRepeat = 'no-repeat';
  icon.style.backgroundPosition = 'center';
  icon.style.backgroundSize = '1.5rem 1rem';
  determine.appendChild(icon);

  determine.addEventListener('click', function (e) {
    // 存储color
    let getrecolor = self.active_color;
    self.setRemberColor(getrecolor)
    // 存储底部模板
    let reiconid = self.selectEmojinumber;
    self.setRemberIcon(reiconid)
    self.setValueFromWorkspace()
    Blockly.CcModal.hide(e);
  })
  return determine
}
//创建编辑按钮
Blockly.FieldRedmatrix.prototype.edit = function () {
  let self = Blockly.FieldRedmatrix.prototype;
  let edit = document.createElement('div');
  let pen = document.createElement('div');

  edit.style.position = 'absolute';
  edit.style.left = '24rem';
  edit.style.top = '6rem';
  edit.style.width = '3rem';
  edit.style.height = '3rem';
  edit.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
  edit.style.borderRadius = '50%';
  edit.style.padding = '0.7rem';
  edit.style.boxSizing = 'border-box'

  pen.style.width = '1.6rem';
  pen.style.height = '1.6rem';
  if (self.buttonstatus === "lift") {
    pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
    edit.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
  } else {
    edit.style.background = 'rgba(0,0,0,0)';
    pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_purple@2x.png")';
  }
  pen.style.backgroundSize = 'contain';
  pen.style.backgroundRepeat = 'no-repeat';

  edit.appendChild(pen);

  self.active_color = self.select_color;
  // self.buttonstatus = "lift";
  pen.addEventListener('click', function () {
    edit.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
    pen.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_white@2x.png")';
    //清除其他按钮的样式
    self.eraserdiv.style.background = 'rgba(0,0,0,0)';
    self.eraserdiv.children[0].style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';

    self.buttonstatus = "lift";
    self.active_color = self.select_color;
  })
  return edit
}

//创建橡皮擦按钮
Blockly.FieldRedmatrix.prototype.eraser = function () {
  let self = Blockly.FieldRedmatrix.prototype;
  let eraser = document.createElement('div');
  let rubber = document.createElement('div');

  eraser.style.position = 'absolute';
  eraser.style.left = '24rem';
  eraser.style.top = '10rem';
  eraser.style.borderRadius = '50%';
  eraser.style.background = 'rgba(0,0,0,0)';
  eraser.style.height = '3rem';
  eraser.style.width = '3rem';
  eraser.style.padding = '0.7rem';
  eraser.style.boxSizing = 'border-box';

  rubber.style.width = '1.6rem';
  rubber.style.height = '1.6rem';
  
  if (self.buttonstatus === "lift") {
    eraser.style.background = 'rgba(0,0,0,0)';
    rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_orange@2x.png")';
  } else {
    eraser.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';
    rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_white@2x.png")';
  }
  rubber.style.backgroundSize = 'contain';
  rubber.style.backgroundRepeat = 'no-repeat';

  eraser.appendChild(rubber);

  eraser.addEventListener('click', function () {
    rubber.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_eraser_white@2x.png")';
    eraser.style.background = 'linear-gradient(-8deg,rgba(80,215,215,0.8),rgba(0,170,255,0.8))';

    //清除其他按钮的样式：
    self.editdiv.style.background = 'rgba(0,0,0,0)';
    self.editdiv.children[0].style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_pen_purple@2x.png")';

    self.buttonstatus = "edit";
    self.active_color = '#EDF5FE';
  })
  return eraser
}

//创建清除按钮
Blockly.FieldRedmatrix.prototype.clear = function () {
  let clear = document.createElement('div');
  let trashCan = document.createElement('div');
  clear.appendChild(trashCan);

  clear.style.position = 'absolute';
  clear.style.left = '24rem';
  clear.style.top = '14rem';
  clear.style.borderRadius = '50%';
  clear.style.background = 'rgba(0,0,0,0)';
  clear.style.height = '3rem';
  clear.style.width = '3rem';
  clear.style.padding = '0.7rem';
  clear.style.boxSizing = 'border-box'

  trashCan.style.width = '1.6rem';
  trashCan.style.height = '1.6rem';
  trashCan.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_rubbish_red@2x.png")';
  trashCan.style.backgroundSize = 'contain';
  trashCan.style.backgroundRepeat = 'no-repeat';

  clear.addEventListener('click', () => {
    // 遍历矩阵
    for (let m = 0; m < 8; m++) {
      for (let n = 0; n < 8; n++) {
        Blockly.FieldRedmatrix.prototype.matrix[m][n] = Blockly.FieldRedmatrix.prototype.clear_defalut.matrix[m][n];
      }
    }
    Blockly.FieldRedmatrix.prototype.workspaceStatus = true;
    this.draw();
  })

  return clear;
}
//颜色选择
Blockly.FieldRedmatrix.prototype.colorSelect = function () {

  this.colorSelectDiv.innerHTML = '';
  this.colorSelectDiv.style.width = `3.9rem`;
  this.colorSelectDiv.style.height = `7.8rem`;
  this.colorSelectDiv.style.position = 'absolute';
  this.colorSelectDiv.style.left = '3.5rem';
  this.colorSelectDiv.style.top = '6rem';
  this.colorSelectDiv.style.backgroundColor = 'rgba(0,0,0,0)';

  let contentDiv = Blockly.CcModal.getContentDiv();
  contentDiv.appendChild(this.colorSelectDiv);

  for (let i = 0; i < 8; i++) {
    let borderDiv = document.createElement('div');
    borderDiv.style.background = this.__proto__.selectColorIdx === i ? 'linear-gradient(#50D7D7,#00AAFF)' : 'rgba(0,0,0,0)';
    borderDiv.style.width = `1.7rem`;
    borderDiv.style.height = `1.7rem`;
    borderDiv.style.margin = `0.1rem`;
    borderDiv.style.padding = this.__proto__.selectColorIdx === i ? `2px` : '0';

    borderDiv.style.boxSizing = 'border-box';
    borderDiv.style.float = 'left';
    borderDiv.style.borderRadius = '3px';
    borderDiv.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';

    let div = document.createElement('div');
    borderDiv.appendChild(div);
    div.style.width = '100%';
    div.style.height = '100%';
    // div.style.borderRadius = '5px';
    div.style.backgroundColor = this.colors[i].drawColor;


    this.colorSelectDiv.appendChild(borderDiv)

    borderDiv.addEventListener('click', () => {
      this.__proto__.selectColorIdx = i;
      // this.colorSelect();
    })
  }
  return this.colorSelectDiv;
}
//生成矩阵提示Y轴
Blockly.FieldRedmatrix.prototype.matrixTipsY = function () {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = `6rem`;
  div.style.top = `4rem`;
  for (let i = 0; i < Blockly.FieldRedmatrix.prototype.rows; i++) {
    let text = document.createElement('span');
    text.innerHTML = i;
    text.style.lineHeight = `1.75rem`
    text.style.fontSize = `0.8rem`;
    text.style.color = '#ADB4D0';
    text.style.fontWeight = 'Bold';
    text.style.display = 'block';
    text.style.fontFamily = 'PingFang-SC-Bold';
    div.appendChild(text)
  }
  return div
}
//生成矩阵提示X轴
Blockly.FieldRedmatrix.prototype.matrixTipsX = function () {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = `7rem`;
  div.style.top = '2.8rem';
  div.style.display = 'flex';
  for (let i = 0; i < Blockly.FieldRedmatrix.prototype.cols; i++) {
    let text = document.createElement('span');
    text.style.width = `1.75rem`;
    text.style.textAlign = 'center';
    text.innerHTML = i;
    text.style.fontSize = `0.8rem`;
    text.style.color = '#ADB4D0';
    text.style.fontWeight = 'Bold';
    text.style.display = 'block';
    text.style.fontFamily = 'PingFang-SC-Bold';
    div.appendChild(text)
  }
  return div
}


Blockly.FieldRedmatrix.prototype.bgDiv = null;

/**
 * 初始化矩阵
 */
Blockly.FieldRedmatrix.prototype.initCanvas_ = function () {
  // 如果value_有值，赋值当前rgb点阵
  if (this.value_ !== undefined) {
    // 获取json对象
    let icon = JSON.parse(this.value_);
    // 遍历矩阵
    for (let m = 0; m < Blockly.FieldRedmatrix.prototype.rows; m++) {
      for (let n = 0; n < Blockly.FieldRedmatrix.prototype.cols; n++) {
        this.matrix[m][n] = icon.matrix[m][n];
      }
    }
  }
  //定义渲染哪个矩阵
  let rgbmatrix = this.matrix;
  //生成背景
  this.bgDiv = document.createElement('div');
  this.bgDiv.style.width = `14rem`;
  this.bgDiv.style.height = `14rem`;
  this.bgDiv.style.left = `7rem`;
  this.bgDiv.style.top = `4rem`;
  this.bgDiv.style.position = 'absolute';
  this.bgDiv.style.display = 'flex';
  this.bgDiv.style.flexDirection = 'column'
  this.bgDiv.style.justifyContent = 'space-around';
  this.bgDiv.style.alignItems = 'space-around';
  this.bgDiv.style.flexWrap = 'wrap';
  this.bgDiv.setAttribute('id', 'matrix');
  //定义网格行列数
  let _rows = Blockly.FieldRedmatrix.prototype.rows;
  let _cols = Blockly.FieldRedmatrix.prototype.cols;
  this.__proto__.workspaceStatus = true;

  //生成小方格,默认选择第一个模板
  for (let i = 0; i < _rows; i++) {
    let col = document.createElement('div');
    col.style.width = '100%';
    col.style.display = 'flex';
    col.style.justifyContent = 'space-around';
    this.bgDiv.appendChild(col);
    for (let j = 0; j < _cols; j++) {
      let grid = document.createElement('div')
      grid.style.width = '1.6rem';
      grid.style.height = '1.6rem';
      grid.style.cssFloat = 'left';
      grid.style.border = '1px solid rgba(200,228,252,1)';
      grid.setAttribute('col', j);
      grid.setAttribute('row', i);
      grid.style.backgroundColor = this.codeColorToDrawColor(rgbmatrix[i][j]);

      const gridClick = () => {
        let row = i
        let col = j
        if (this.__proto__.buttonstatus == 'lift') {
          grid.style.backgroundColor = "#ED5969";
          this.__proto__.matrix[row][col] = 1;
        } else {
          grid.style.backgroundColor = "#EDF5FE";
          this.__proto__.matrix[row][col] = 0;
        }
      }

      grid.addEventListener('click', gridClick);
      grid.addEventListener('mousemove', (function () {
        if (!this.mouseDown) return;
        gridClick();
      }).bind(this));

      col.appendChild(grid)
    }
  }
  return this.bgDiv;
};


/**
 *矩阵缓存-是否点亮
 */
Blockly.FieldRedmatrix.prototype.matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

/**
 * 定义绘画方法 
 */
Blockly.FieldRedmatrix.prototype.draw = function () {

  for (let i = 0; i < Blockly.FieldRedmatrix.prototype.rows; i++) {
    for (let j = 0; j < Blockly.FieldRedmatrix.prototype.cols; j++) {
      let color = this.codeColorToDrawColor(Blockly.FieldRedmatrix.prototype.matrix[i][j]);
      this.bgDiv.childNodes[i].childNodes[j].style.background = color;
    }
  }

}

Blockly.FieldRedmatrix.prototype.cacheMatrix = false;


Blockly.FieldRedmatrix.prototype.gridMove = function (event) {
  let Blocklyele = Blockly.FieldRedmatrix.prototype;
  let evt = event || window.event;
  let touch = evt.touches[0];
  let x = touch.pageX;
  let y = touch.pageY;
  let ele = document.elementFromPoint(x, y);
  let row = ele.getAttribute('row');
  let col = ele.getAttribute('col');
  let newcolor = Blocklyele.buttonstatus == 'lift' ? Blocklyele.active_color : "#EDF5FE";
  let newlight = Blocklyele.buttonstatus == 'lift' ? 1 : 0;
  ele.style.backgroundColor = newcolor;
  Blocklyele.matrix[row][col] = newlight;
  
}

/**
 * 设置当前value
 * 数据源来自工作区
 */
Blockly.FieldRedmatrix.prototype.setValueFromWorkspace = function () {
  // 设置当前value
  let _matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  // 遍历矩阵
  for (let m = 0; m < Blockly.FieldRedmatrix.prototype.rows; m++) {
    for (let n = 0; n < Blockly.FieldRedmatrix.prototype.cols; n++) {
      _matrix[m][n] = Blockly.FieldRedmatrix.prototype.matrix[m][n];
    }
  }
  // 设置当前value
  this.setValue(JSON.stringify(
    {
      emoji_number: Blockly.FieldRedmatrix.prototype.workspaceStatus ? undefined : parseInt(Blockly.FieldRedmatrix.prototype.selectEmojinumber),//判断代码是否来自工作区
      matrix: _matrix,
    }
  ));
}




/**
 * 定义当前颜色
 * #000 默认颜色为黑色
 */
Blockly.FieldRedmatrix.prototype.active_color = '#EDF5FE'

/**
 * 定义画板选择
 * #000 默认颜色为黑色
 */
Blockly.FieldRedmatrix.prototype.select_color = '#EDF5FE'

/**
 * 定义颜色选择列表
 */
Blockly.FieldRedmatrix.prototype.colors = [
  { drawColor: '#ED5969', codeColor: '#ff0000' },
  { drawColor: '#4BF4FF', codeColor: '#00ffa2' },
  { drawColor: '#ffffff', codeColor: '#ffffff' },
  { drawColor: '#00AAFF', codeColor: '#009fff' },
  { drawColor: '#FFE971', codeColor: '#ffc000' },
  { drawColor: '#A28FFF', codeColor: '#a200ff' },
  { drawColor: '#48D4B5', codeColor: '#7bff00' },
  { drawColor: '#FF99FF', codeColor: '#ff00b7' },
];

Blockly.FieldRedmatrix.prototype.codeColorToDrawColor = (codeColor) => {
  if (codeColor == 1) {
    return '#ED5969';
  } else {
    return '#EDF5FE';
  }
}

Blockly.FieldRedmatrix.prototype.selectColorIdx = 0;


Blockly.FieldRedmatrix.prototype.icons = [
  '001000011100001110011100001000',
  '2A4C6D00110000011000112A4C6D00',
  '00012A4C6D10000100001000010000',
  '010001001010000100001010010001',
  '111111011110011110011110111111',
  '000100010010000010010010000100',
  '00001001010000010001012A4C6D10',
  '2A4C6D0101110001010101112A4C6D',
  '110000010101000001010101110000',
  '2A4C6D010010000010010012A4C6D0',
  '010000010101000010010101010000',
  '010000110101010001110101010000',
  '001011011001111111011000001000',
  '2A4C6D0100001001010112A4C6D000',
  '2A4C6D2A4C6D1111012A4C6D2A4C6D',
  '010000111111000010000010000011',
  '111100010110111111000010000111',
  '001100011111111101011111001100',
  '100110011001001011011001100110',
  '001000011111111000011111001000',
  '001000010000111111012A4C6D1000',
  '00012A4C6D10111111000010000100',
  '001000011100101010001000001000',
  '001000001000101010011100001000',
  '011100100010101010100010011100',
];

//底部系统样式选中,下方模板前后翻页
Blockly.FieldRedmatrix.prototype.initSelect_ = function () {
  // 渲染底部模板时，先判断并定位到上次选中的那个
  let rembericonid = this.reiconid_;
  let pageIndex = rembericonid ? parseInt(rembericonid / 5) : 0;
  //暂存第几页有被选中的图案
  let select_pageIndex = pageIndex;
  let hightlightindex = rembericonid ? parseInt(rembericonid % 5) : 0;
  let div = document.createElement('div');
  div.style.width = `18rem`;
  div.style.height = `12rem`;
  div.style.position = 'absolute';
  div.style.top = `20rem`;
  div.style.left = '50%';
  div.style.transform = 'translateX(-50%)';
  div.style.display = 'flex';
  div.style.justifyContent = 'space-between';

  let list = [];
  let updateList = (() => {
    list.forEach((value) => {
      div.removeChild(value);
    });
    list.splice(0, list.length);
    for (let i = 0; i < 5; i++) {
      let item = document.createElement('div');
      {
        let shape = document.createElement('img');
        shape.style.width = '100%';
        shape.style.height = '100%';
        shape.style.border = '2px solid rgba(0,0,0,0)';
        shape.style.display = 'inline-block';
        shape.style.boxSizing = 'border-box';

        let icon;
        let _pos_index = pageIndex * 5 + i;

        if (_pos_index > this.rgb_icons.length - 1) {
          icon = this.rgb_icons_defalut;
        } else {
          icon = this.rgb_icons[_pos_index];
        }
        let _iconstr = JSON.stringify(icon);
        shape.src = this.createImage(_iconstr);
        item.appendChild(shape);
        item.style.width = '3.2rem';
        item.style.height = '3.2rem';
        item.style.boxSizing = 'border-box';

        item.style.background = `${i == hightlightindex && select_pageIndex == pageIndex ? 'linear-gradient(#50D7D7,#00AAFF)' : '#FFF'}`;

        item.style.borderRadius = `2px`;
        // item.style.boxSizing = 'border-box';
        //添加编号属性
        item.setAttribute('emojinumber', _pos_index)
        if (this.__proto__.initSelectStatus) {
          this.__proto__.initSelectStatus = false;
        }
        shape.addEventListener('click', (event) => {
          let evt = event || window.event;
          //清除其他item的boder样式
          for (let i = 0; i < evt.target.parentNode.parentNode.children.length; i++) {
            evt.target.parentNode.parentNode.children[i].style.background = '#fff';
            // evt.target.parentNode.parentNode.children[i].style.border = '2px solid #fff';
          }
          //添加选中状态
          evt.target.parentNode.parentNode.children[i].style.background = 'linear-gradient(#50D7D7,#00AAFF)';
          // evt.target.parentNode.style.border = `2px solid rgb(0, 170, 255)`;
          evt.target.parentNode.style.borderRadius = `2px`;
          // 遍历矩阵
          for (let m = 0; m < this.__proto__.rows; m++) {
            for (let n = 0; n < this.__proto__.cols; n++) {
              this.__proto__.matrix[m][n] = icon.matrix[m][n];
            }
          }
          this.__proto__.workspaceStatus = true;
          this.__proto__.selectEmojinumber = evt.target.parentNode.getAttribute('emojinumber');

          // 重新绘图         
          this.draw();
        })
      }
      list.push(item);
    }
    list.forEach((value) => {
      div.appendChild(value);
    });
  }).bind(this)
  updateList();
  //左右切换按钮
  let contentDiv = Blockly.CcModal.getContentDiv();

  let leftButton = document.createElement('div');
  leftButton.id = "leftButton"

  leftButton.style.width = '1.75rem';
  leftButton.style.height = '2.3rem';
  leftButton.style.position = 'absolute';
  leftButton.style.top = '20.35rem';
  leftButton.style.left = '2.55rem';
  leftButton.style.backgroundImage = '#FFF';
  leftButton.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
  leftButton.style.borderRadius = '0.5rem';
  leftButton.style.backgroundSize = '1rem';
  leftButton.style.backgroundPosition = 'center';
  leftButton.style.cursor = 'pointer';
  leftButton.style.backgroundRepeat = 'no-repeat';
  contentDiv.appendChild(leftButton);

  let rightButton = document.createElement('div');
  rightButton.id = "rightButton"
  rightButton.style.width = '1.75rem';
  rightButton.style.height = '2.3rem';
  rightButton.style.position = 'absolute';
  rightButton.style.top = '20.35rem';
  rightButton.style.right = '2.55rem';
  rightButton.style.backgroundImage = '#FFF';
  rightButton.style.boxShadow = '0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1)';
  rightButton.style.borderRadius = '0.5rem';
  rightButton.style.backgroundSize = '1rem';
  rightButton.style.backgroundPosition = 'center';
  rightButton.style.backgroundRepeat = 'no-repeat';
  rightButton.style.cursor = 'pointer';
  contentDiv.appendChild(rightButton);


  const setImg = (function () {
    if (pageIndex < 1) {
      leftButton.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_gray@2x.png")';
    } else {
      leftButton.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_prious_green@2x.png")';
    }

    if (pageIndex >= 3) {
      rightButton.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray1@2x.png")';
    } else {
      rightButton.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray@2x.png")';
    }
  }).bind(this);

  setImg();

  leftButton.addEventListener('click', () => {
    if (pageIndex > 0 && pageIndex <= 3) {
      pageIndex--;
      updateList();
      setImg();
    }
  });

  rightButton.addEventListener('click', () => {
    if (pageIndex >= 0 && pageIndex < 3) {
      pageIndex++;
      updateList();
      setImg();
    }

  });

  return div;
}

/**
 * 记忆上次选中的底部模板
 */
Blockly.FieldRedmatrix.prototype.setRemberIcon = function (reiconid) {
  if (reiconid === null || reiconid === this.reiconid_) {
    return;
  }
  // if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
  //   Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.reiconid_, reiconid));
  // }
  this.reiconid_ = reiconid;
};
/**
 * 记忆上次选中的色彩
 */
Blockly.FieldRedmatrix.prototype.setRemberColor = function (recolor) {
  if (recolor === null || recolor === this.recolor_) {
    return;
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.recolor_, recolor));
  }
  this.recolor_ = recolor;
};

Blockly.FieldRedmatrix.prototype.canvas = null;

Blockly.FieldRedmatrix.prototype.girdSpace = 5;

Blockly.FieldRedmatrix.prototype.rows = 8;
Blockly.FieldRedmatrix.prototype.cols = 8;

Blockly.FieldRedmatrix.prototype.girdWidth = 220;
Blockly.FieldRedmatrix.prototype.girdHeight = 220;

Blockly.FieldRedmatrix.prototype.canvasWidth = 266;
Blockly.FieldRedmatrix.prototype.canvasHeight = 220;

Blockly.FieldRedmatrix.prototype.colorBarSize = 46;
Blockly.FieldRedmatrix.prototype.rowLabelBarSize = 32;
Blockly.FieldRedmatrix.prototype.colLabelBarSize = 32;


Blockly.FieldRedmatrix.prototype.clear_defalut = {
  matrix: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]
}

/**
 * icon列表
 */
Blockly.FieldRedmatrix.prototype.rgb_icons = [
  {
    emoji_number: 0x00,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ]
  },
  {
    emoji_number: 0x01,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ]
  },
  {
    emoji_number: 0x02,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ]
  },
  {
    emoji_number: 0x03,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
  },
  {
    emoji_number: 0x04,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
  },
  {
    emoji_number: 0x05,
    matrix: [
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x06,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x07,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x08,
    matrix: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
    ]
  },
  {
    emoji_number: 0x09,
    matrix: [
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x0A,
    matrix: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ]
  },
  {
    emoji_number: 0x0B,
    matrix: [
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x0C,
    matrix: [
      [0, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x0D,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 0],
    ]
  },
  {
    emoji_number: 0x0E,
    matrix: [
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ]
  },
  {
    emoji_number: 0x0F,
    matrix: [
      [1, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 0, 0, 1],
      [0, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 1],
      [0, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 1, 1, 1, 0],
    ]
  },
  {
    emoji_number: 0x10,
    matrix: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x11,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x12,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    emoji_number: 0x13,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }
];

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
 * 
 * @param {*} value 
 */
Blockly.FieldRedmatrix.prototype.createImage = function (value) {

  let _itemobj = JSON.parse(value);
  let _matrix = _itemobj.matrix;

  var svg = 'data:image/svg+xml;utf8,<svg width="26" height="26" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="26" height="26" style="fill:#fff;"/>';

  let _w = 2.155;
  let _h = 2.155;

  for (let i = 0; i < Blockly.FieldRedmatrix.prototype.rows; i++) {
    for (let j = 0; j < Blockly.FieldRedmatrix.prototype.cols; j++) {
      let x = (j + 1) * 1 + j * _w;
      let y = (i + 1) * 1 + i * _h;

      let _color;
      if (_matrix[j][i] === 1) {
        _color = this.codeColorToDrawColor(_matrix[j][i]);
      } else {
        _color = 'rgb(237, 245, 254)';
      }

      svg += '<rect x="' + y + '" y="' + x + '" width="' + _w + '" height="' + _h + '" style="fill:' + _color + ';"/>';
    }
  }
  svg += '</svg>';

  return svgEncode(svg);
}
Blockly.Field.register('field_redmatrix', Blockly.FieldRedmatrix);
