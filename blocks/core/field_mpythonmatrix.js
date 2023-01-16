'use strict';

goog.provide('Blockly.FieldMpythonmatrix');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('Blockly.CcModal');
/**
 * 构造函数 
 */
Blockly.FieldMpythonmatrix = function (value) {

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
      this.rgbmatrix_colors[m][n] = icon.colors_matrix[m][n];
    }
  }
  // value赋值
  value = JSON.stringify(icon);
  // 调用父类构造函数
  Blockly.FieldMpythonmatrix.superClass_.constructor.call(this, value);
};
goog.inherits(Blockly.FieldMpythonmatrix, Blockly.Field);

Blockly.FieldMpythonmatrix.fromJson = function (options) {
  return new Blockly.FieldMpythonmatrix(options['default']);
};
/**
 * 初始化函数
 */
Blockly.FieldMpythonmatrix.prototype.init = function (block) {
  if (this.fieldGroup_) {
    return;
  }
  this.className_ += ' blocklyDropdownText';

  Blockly.FieldMpythonmatrix.superClass_.init.call(this);
  this.size_ = new goog.math.Size(30, 30);

  this.mouseDown = false;


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
Blockly.FieldMpythonmatrix.prototype.cachData = null;
Blockly.FieldMpythonmatrix.prototype.setValue = function (newValue) {
  if (newValue === null || newValue === this.value_) {
    return;
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.value_, newValue));
  }
  this.value_ = newValue;
  Blockly.FieldMpythonmatrix.prototype.cachData = this.value_;
  // console.info(Blockly.FieldMpythonmatrix.prototype);
  this.setText('');
  // http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink//转义
  this.iconImage_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.createImage(this.value_));
  // this.iconImage_.setAttributeNS('http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink', 'xlink:href', this.createImage(this.value_));
};

/**
 * 获取字段值
 */
Blockly.FieldMpythonmatrix.prototype.getValue = function () {
  return this.value_;
};


Blockly.FieldMpythonmatrix.prototype.div = null;
Blockly.FieldMpythonmatrix.prototype.buttonstatus = "lift";
Blockly.FieldMpythonmatrix.prototype.initSelectStatus = true;
Blockly.FieldMpythonmatrix.prototype.workspaceStatus = false;
Blockly.FieldMpythonmatrix.prototype.selectEmojinumber = 0;


Blockly.FieldMpythonmatrix.prototype.fixSize = function () {
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
Blockly.FieldMpythonmatrix.prototype.showEditor_ = function () {
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


Blockly.FieldMpythonmatrix.prototype.createField = function () {
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
  fieldBox.appendChild(this.Determine_());

  return box;
}

Blockly.FieldMpythonmatrix.prototype.createCloseBt = function () {
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
Blockly.FieldMpythonmatrix.prototype.onHide_ = function () {

};


//创建确定按钮
Blockly.FieldMpythonmatrix.prototype.Determine_ = function () {
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

//生成矩阵提示Y轴
Blockly.FieldMpythonmatrix.prototype.matrixTipsY = function () {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = `8rem`;
  div.style.top = `4rem`;
  for (let i = 0; i < Blockly.FieldMpythonmatrix.prototype.rows; i++) {
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
Blockly.FieldMpythonmatrix.prototype.matrixTipsX = function () {
  let div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.left = `9rem`;
  div.style.top = '2.8rem';
  div.style.display = 'flex';
  for (let i = 0; i < Blockly.FieldMpythonmatrix.prototype.cols; i++) {
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


Blockly.FieldMpythonmatrix.prototype.bgDiv = null;

/**
 * 初始化矩阵
 */
Blockly.FieldMpythonmatrix.prototype.initCanvas_ = function () {
  // 如果value_有值，赋值当前rgb点阵
  if (this.value_ !== undefined) {
    // 获取json对象
    let icon = JSON.parse(this.value_);
    // 遍历矩阵
    for (let m = 0; m < Blockly.FieldMpythonmatrix.prototype.rows; m++) {
      for (let n = 0; n < Blockly.FieldMpythonmatrix.prototype.cols; n++) {
        this.matrix[m][n] = icon.matrix[m][n];
        this.rgbmatrix_colors[m][n] = icon.colors_matrix[m][n];
      }
    }
  }
  //定义渲染哪个矩阵
  let rgbmatrix_colors = this.rgbmatrix_colors;
  let rgbmatrix_light = this.matrix;
  //生成背景
  this.bgDiv = document.createElement('div');
  this.bgDiv.style.width = `14rem`;
  this.bgDiv.style.height = `14rem`;
  this.bgDiv.style.left = `9rem`;
  this.bgDiv.style.top = `4rem`;
  this.bgDiv.style.position = 'absolute';
  this.bgDiv.style.display = 'flex';
  this.bgDiv.style.flexDirection = 'column'
  this.bgDiv.style.justifyContent = 'space-around';
  this.bgDiv.style.alignItems = 'space-around';
  this.bgDiv.style.flexWrap = 'wrap';
  this.bgDiv.setAttribute('id', 'matrix');
  //定义网格行列数
  let _rows = Blockly.FieldMpythonmatrix.prototype.rows;
  let _cols = Blockly.FieldMpythonmatrix.prototype.cols;



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
      grid.setAttribute('light', rgbmatrix_light[i][j]);
      grid.setAttribute('col', j);
      grid.setAttribute('row', i);
      grid.style.backgroundColor = this.codeColorToDrawColor(rgbmatrix_colors[i][j]);

      const gridClick = () => {
        let row = i
        let col = j
        let drawColor = this.__proto__.colors[this.__proto__.selectColorIdx].drawColor;
        let codeColor = this.__proto__.colors[this.__proto__.selectColorIdx].codeColor;
        if (this.__proto__.buttonstatus == 'lift') {
          grid.style.backgroundColor = drawColor;
          this.__proto__.rgbmatrix_colors[row][col] = codeColor;
          this.__proto__.matrix[row][col] = 1;
        } else {
          grid.style.backgroundColor = "#EDF5FE";
          this.__proto__.rgbmatrix_colors[row][col] = "#EDF5FE";
          this.__proto__.matrix[row][col] = 0;
        }
      }

      col.appendChild(grid)
    }
  }
  return this.bgDiv;
};

/**
 * 矩阵缓存-颜色值
 * 
 */
Blockly.FieldMpythonmatrix.prototype.rgbmatrix_colors = [
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
];

/**
 *矩阵缓存-是否点亮
 */
Blockly.FieldMpythonmatrix.prototype.matrix = [
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
Blockly.FieldMpythonmatrix.prototype.draw = function () {

  for (let i = 0; i < Blockly.FieldMpythonmatrix.prototype.rows; i++) {
    for (let j = 0; j < Blockly.FieldMpythonmatrix.prototype.cols; j++) {
      let color = this.codeColorToDrawColor(Blockly.FieldMpythonmatrix.prototype.rgbmatrix_colors[i][j]);
      this.bgDiv.childNodes[i].childNodes[j].style.background = color;
      this.bgDiv.childNodes[i].childNodes[j].setAttribute('light', Blockly.FieldMpythonmatrix.prototype.matrix[i][j])
    }
  }

}

Blockly.FieldMpythonmatrix.prototype.cacheMatrix = false;



Blockly.FieldMpythonmatrix.prototype.gridMove = function (event) {
  let self = Blockly.FieldMpythonmatrix.prototype;
  // self.buttonstatus='lift'
  let Blocklyele = Blockly.FieldMpythonmatrix.prototype;
  let evt = event || window.event;
  let touch = evt.touches[0];
  let x = touch.pageX;
  let y = touch.pageY;
  let ele = document.elementFromPoint(x, y);
  let light = ele.getAttribute('light');
  if (light == 1 || light == 0) {
    let row = ele.getAttribute('row');
    let col = ele.getAttribute('col');
    let newcolor = Blocklyele.buttonstatus == 'lift' ? Blocklyele.active_color : "#EDF5FE";
    let newlight = Blocklyele.buttonstatus == 'lift' ? 1 : 0;
    ele.style.backgroundColor = newcolor;
    Blocklyele.rgbmatrix_colors[row][col] = newcolor;
    Blocklyele.matrix[row][col] = newlight;
  }
}

/**
 * 设置当前value
 * 数据源来自工作区
 */
Blockly.FieldMpythonmatrix.prototype.setValueFromWorkspace = function () {
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

  let _rgbmatrix_colors = [
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ];

  // 遍历矩阵
  for (let m = 0; m < Blockly.FieldMpythonmatrix.prototype.rows; m++) {
    for (let n = 0; n < Blockly.FieldMpythonmatrix.prototype.cols; n++) {
      _matrix[m][n] = Blockly.FieldMpythonmatrix.prototype.matrix[m][n];
      _rgbmatrix_colors[m][n] = Blockly.FieldMpythonmatrix.prototype.rgbmatrix_colors[m][n];
    }
  }
  // 设置当前value
  this.setValue(JSON.stringify(
    {
      // emoji_number: Blockly.FieldMpythonmatrix.prototype.workspaceStatus ? undefined : parseInt(Blockly.FieldMpythonmatrix.prototype.selectEmojinumber),//判断代码是否来自工作区
      emoji_number: parseInt(Blockly.FieldMpythonmatrix.prototype.selectEmojinumber),//判断代码是否来自工作区
      matrix: _matrix,
      colors_matrix: _rgbmatrix_colors
    }
  ));
}




/**
 * 定义当前颜色
 * #000 默认颜色为黑色
 */
Blockly.FieldMpythonmatrix.prototype.active_color = '#EDF5FE'

/**
 * 定义画板选择
 * #000 默认颜色为黑色
 */
Blockly.FieldMpythonmatrix.prototype.select_color = '#EDF5FE'

/**
 * 定义颜色选择列表
 */
Blockly.FieldMpythonmatrix.prototype.colors = [
  { drawColor: '#ED5969', codeColor: '#ff0000' },
  { drawColor: '#4BF4FF', codeColor: '#00ffa2' },
  { drawColor: '#ffffff', codeColor: '#ffffff' },
  { drawColor: '#00AAFF', codeColor: '#009fff' },
  { drawColor: '#FFE971', codeColor: '#ffc000' },
  { drawColor: '#A28FFF', codeColor: '#a200ff' },
  { drawColor: '#48D4B5', codeColor: '#7bff00' },
  { drawColor: '#FF99FF', codeColor: '#ff00b7' },
];

Blockly.FieldMpythonmatrix.prototype.codeColorToDrawColor = (codeColor) => {
  let colors = Blockly.FieldMpythonmatrix.prototype.colors;
  for (let i = 0; i < 8; i++) {
    if (colors[i].codeColor === codeColor) {
      return colors[i].drawColor;
    }
  }

  return '#EDF5FE';
}


Blockly.FieldMpythonmatrix.prototype.selectColorIdx = 0;


Blockly.FieldMpythonmatrix.prototype.icons = [
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
Blockly.FieldMpythonmatrix.prototype.initSelect_ = function () {
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

        // item.style.border = `2px solid ${i == hightlightindex && select_pageIndex == pageIndex ? 'rgb(0, 170, 255)' : '#fff'}`;
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
              this.__proto__.rgbmatrix_colors[m][n] = icon.colors_matrix[m][n];
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

    if (pageIndex >= 6) {
      rightButton.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray1@2x.png")';
    } else {
      rightButton.style.backgroundImage = 'url("' + Blockly.mainWorkspace.options.pathToMedia + 'codecraft/field/icon_next_gray@2x.png")';
    }
  }).bind(this);

  setImg();

  leftButton.addEventListener('click', () => {
    if (pageIndex > 0 && pageIndex <= 6) {
      pageIndex--;
      updateList();
      setImg();
    }
  });

  rightButton.addEventListener('click', () => {
    if (pageIndex >= 0 && pageIndex < 6) {
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
Blockly.FieldMpythonmatrix.prototype.setRemberIcon = function (reiconid) {
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
Blockly.FieldMpythonmatrix.prototype.setRemberColor = function (recolor) {
  if (recolor === null || recolor === this.recolor_) {
    return;
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_, 'field', this.name, this.recolor_, recolor));
  }
  this.recolor_ = recolor;
};

Blockly.FieldMpythonmatrix.prototype.canvas = null;

Blockly.FieldMpythonmatrix.prototype.girdSpace = 5;

Blockly.FieldMpythonmatrix.prototype.rows = 8;
Blockly.FieldMpythonmatrix.prototype.cols = 8;

Blockly.FieldMpythonmatrix.prototype.girdWidth = 220;
Blockly.FieldMpythonmatrix.prototype.girdHeight = 220;

Blockly.FieldMpythonmatrix.prototype.canvasWidth = 266;
Blockly.FieldMpythonmatrix.prototype.canvasHeight = 220;

Blockly.FieldMpythonmatrix.prototype.colorBarSize = 46;
Blockly.FieldMpythonmatrix.prototype.rowLabelBarSize = 32;
Blockly.FieldMpythonmatrix.prototype.colLabelBarSize = 32;


Blockly.FieldMpythonmatrix.prototype.clear_defalut = {
  matrix: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],
  colors_matrix: [
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
  ]
}

/**
 * icon列表
 */
Blockly.FieldMpythonmatrix.prototype.rgb_icons = [

  {
    emoji_number: 0x00,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#009fff', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#009fff', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#009fff', '#009fff', '#009fff', '#009fff', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x01,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#009fff', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#009fff', '#ffc000'],
      ['#009fff', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#009fff'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#009fff', '#009fff', '#009fff', '#009fff', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x02,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#009fff', '#009fff', '#ffc000', '#ffc000', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x03,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#009fff', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#009fff', '#009fff', '#ffc000', '#ffc000', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x04,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#EDF5FE'],
      ['#ff0000', '#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000', '#ff0000'],
      ['#ff0000', '#ff0000', '#ffc000', '#ff0000', '#ff0000', '#ffc000', '#ff0000', '#ff0000'],
      ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'],
      ['#ff0000', '#ff0000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#ff0000'],
      ['#EDF5FE', '#ff0000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x05,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ffffff', '#ffffff', '#ffc000', '#ffc000', '#ffffff', '#ffffff', '#ffc000'],
      ['#ffc000', '#009fff', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#009fff', '#ffc000'],
      ['#ffc000', '#009fff', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#009fff', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffffff', '#ffffff', '#ffc000', '#ffc000', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffffff', '#ffffff', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x06,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#009fff', '#009fff', '#ffc000', '#ffc000', '#009fff', '#009fff', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ffc000', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#ff0000', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x07,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffffff', '#009fff', '#009fff', '#009fff', '#009fff', '#ffffff', '#009fff', '#009fff'],
      ['#009fff', '#009fff', '#009fff', '#ffc000', '#ffc000', '#009fff', '#009fff', '#009fff'],
      ['#009fff', '#009fff', '#009fff', '#ffc000', '#ffc000', '#009fff', '#009fff', '#009fff'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#009fff', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#009fff', '#009fff', '#009fff', '#009fff', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x08,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000', '#009fff', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#ff00b7', '#ff00b7', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff00b7', '#ff00b7'],
      ['#ff00b7', '#ff00b7', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff00b7', '#ff00b7'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#009fff', '#009fff', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x09,
    matrix: [
      [0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 1, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffffff', '#ffffff'],
      ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffffff'],
      ['#ff0000', '#ffffff', '#EDF5FE', '#ff0000', '#ff0000', '#ffffff', '#EDF5FE', '#ff0000'],
      ['#ff0000', '#ffffff', '#ffffff', '#ff0000', '#ff0000', '#ffffff', '#ffffff', '#ff0000'],
      ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'],
      ['#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000'],
      ['#ff0000', '#ff0000', '#EDF5FE', '#ff0000', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000'],
      ['#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x0A,
    matrix: [
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ff0000', '#ff0000', '#ffc000', '#ffc000', '#ff0000', '#ff0000', '#ffc000'],
      ['#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000'],
      ['#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000'],
      ['#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ff0000', '#ff0000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x0B,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ff0000', '#ff0000', '#ffc000', '#ffc000', '#ff0000', '#ff0000', '#ffc000'],
      ['#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ffc000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ff0000', '#ff0000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x0C,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE'],
      ['#ffffff', '#ff0000', '#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#ff0000'],
      ['#ffffff', '#ff0000', '#ff0000', '#ff0000', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000'],
      ['#ff0000', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#ff0000'],
      ['#EDF5FE', '#ff0000', '#ff0000', '#ff0000', '#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x0D,
    matrix: [
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 0, 0]
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffffff', '#009fff', '#009fff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffffff', '#ffffff', '#009fff', '#009fff', '#009fff', '#EDF5FE', '#EDF5FE'],
      ['#009fff', '#ffffff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE'],
      ['#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE'],
      ['#009fff', '#ffffff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE'],
      ['#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE', '#EDF5FE']
    ]
  },
  {
    emoji_number: 0x0E,
    matrix: [
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#ffc000', '#EDF5FE', '#ff0000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#ff0000', '#ffc000', '#ff0000', '#ffc000', '#ff0000', '#EDF5FE'],
      ['#ff0000', '#ffc000', '#ff0000', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#ff0000'],
      ['#ff0000', '#ffc000', '#ffc000', '#ffffff', '#ffffff', '#ffc000', '#ffc000', '#ff0000'],
      ['#ff0000', '#ffc000', '#ffc000', '#ffffff', '#ffffff', '#ffc000', '#ffc000', '#ff0000'],
      ['#EDF5FE', '#ff0000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x0F,
    matrix: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
    ],
    colors_matrix: [
      ['#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00'],
      ['#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00'],
      ['#7bff00', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#7bff00'],
      ['#7bff00', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#7bff00'],
      ['#7bff00', '#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00', '#7bff00'],
      ['#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00'],
      ['#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00'],
      ['#7bff00', '#7bff00', '#EDF5FE', '#7bff00', '#7bff00', '#EDF5FE', '#7bff00', '#7bff00'],
    ]
  },
  {
    emoji_number: 0x10,
    matrix: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    colors_matrix: [
      ['#ffffff', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00'],
      ['#7bff00', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#ffffff'],
      ['#7bff00', '#EDF5FE', '#ff0000', '#7bff00', '#7bff00', '#ff0000', '#EDF5FE', '#ffffff'],
      ['#ffffff', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00'],
      ['#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00'],
      ['#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#7bff00', '#ffffff'],
      ['#7bff00', '#7bff00', '#EDF5FE', '#7bff00', '#7bff00', '#EDF5FE', '#7bff00', '#7bff00'],
      ['#ffffff', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#ffffff', '#7bff00'],
    ]
  },
  {
    emoji_number: 0x11,
    matrix: [
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#00ffa2'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#00ffa2', '#7bff00'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#00ffa2', '#7bff00', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#EDF5FE', '#009fff', '#00ffa2', '#7bff00', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#009fff', '#00ffa2', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x12,
    matrix: [
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#a200ff'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#a200ff', '#ffc000'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#a200ff', '#ffc000', '#EDF5FE'],
      ['#ff0000', '#ff0000', '#EDF5FE', '#ffc000', '#a200ff', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#ffc000', '#a200ff', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x13,
    matrix: [
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#a200ff', '#ffc000'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#a200ff', '#ffc000', '#ff00b7'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#a200ff', '#ffc000', '#ff00b7', '#EDF5FE'],
      ['#009fff', '#009fff', '#EDF5FE', '#a200ff', '#ffc000', '#ff00b7', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#a200ff', '#ffc000', '#ff00b7', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#009fff', '#ff00b7', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#EDF5FE', '#009fff', '#009fff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#009fff', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x14,
    matrix: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#EDF5FE', '#009fff', '#009fff', '#009fff', '#7bff00', '#7bff00', '#009fff', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#009fff', '#009fff', '#7bff00', '#7bff00', '#009fff', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#009fff', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x15,
    matrix: [
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#EDF5FE'],
      ['#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00'],
      ['#EDF5FE', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#7bff00', '#ffc000', '#ffc000', '#7bff00', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x16,
    matrix: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#ffc000', '#ffc000', '#ff0000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#EDF5FE'],
      ['#EDF5FE', '#ff0000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ff0000', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ff0000', '#ffc000', '#ffc000', '#ff0000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff0000', '#ff0000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#7bff00', '#7bff00', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#7bff00', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x17,
    matrix: [
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#009fff', '#00ffa2', '#009fff', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#009fff', '#00ffa2', '#00ffa2', '#00ffa2', '#009fff', '#EDF5FE'],
      ['#EDF5FE', '#009fff', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#009fff'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x18,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ffffff', '#ffffff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#EDF5FE', '#EDF5FE'],
      ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#EDF5FE'],
      ['#00ffa2', '#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE', '#00ffa2'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x19,
    matrix: [
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
    ],
    colors_matrix: [
      ['#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#EDF5FE'],
      ['#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#a200ff', '#ff0000', '#a200ff', '#a200ff', '#ff0000', '#a200ff'],
      ['#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#ffffff', '#EDF5FE', '#ffffff', '#ffffff', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#a200ff'],
      ['#a200ff', '#a200ff', '#ffffff', '#ffffff', '#EDF5FE', '#ffffff', '#ffffff', '#a200ff'],
      ['#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff'],
    ]
  },
  {
    emoji_number: 0x1A,
    matrix: [
      [0, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#ffffff', '#ffffff', '#EDF5FE', '#ffffff', '#ffffff', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffffff', '#ff0000', '#EDF5FE', '#ffffff', '#ff0000', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#ffc000', '#ffc000'],
      ['#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#ffc000', '#ffc000'],
      ['#ffc000', '#EDF5FE', '#ffc000', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x1B,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#ffc000', '#EDF5FE', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000'],
      ['#EDF5FE', '#EDF5FE', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#ffc000', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x1C,
    matrix: [
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#a200ff', '#a200ff', '#EDF5FE', '#EDF5FE', '#a200ff', '#a200ff', '#EDF5FE'],
      ['#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#EDF5FE'],
      ['#a200ff', '#a200ff', '#009fff', '#a200ff', '#a200ff', '#009fff', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#EDF5FE', '#ffffff', '#ffffff', '#EDF5FE', '#a200ff', '#a200ff'],
      ['#a200ff', '#a200ff', '#a200ff', '#EDF5FE', '#EDF5FE', '#a200ff', '#a200ff', '#a200ff'],
      ['#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x1D,
    matrix: [
      [1, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1, 0, 0, 1],
      [0, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1, 1, 0, 1],
      [0, 0, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 1, 1, 1, 0],
    ],
    colors_matrix: [
      ['#a200ff', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#a200ff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#a200ff', '#EDF5FE', '#a200ff', '#EDF5FE', '#a200ff', '#EDF5FE', '#a200ff', '#EDF5FE'],
      ['#a200ff', '#a200ff', '#ff0000', '#a200ff', '#a200ff', '#EDF5FE', '#EDF5FE', '#a200ff'],
      ['#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#EDF5FE', '#ff00b7'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#ff00b7', '#ff00b7', '#ff00b7', '#EDF5FE', '#a200ff'],
      ['#EDF5FE', '#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#a200ff', '#ff00b7'],
      ['#EDF5FE', '#a200ff', '#a200ff', '#EDF5FE', '#a200ff', '#a200ff', '#a200ff', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x1E,
    matrix: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x1F,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x20,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x21,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
    ]
  },
  {
    emoji_number: 0x22,
    matrix: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    colors_matrix: [
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#00ffa2', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#00ffa2', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#00ffa2', '#00ffa2', '#00ffa2', '#00ffa2', '#EDF5FE', '#EDF5FE'],
      ['#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE', '#EDF5FE'],
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
Blockly.FieldMpythonmatrix.prototype.createImage = function (value) {

  let _itemobj = JSON.parse(value);
  let _matrix = _itemobj.matrix;
  let _colors_matrix = _itemobj.colors_matrix;

  var svg = 'data:image/svg+xml;utf8,<svg width="26" height="26" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="26" height="26" style="fill:#fff;"/>';

  let _w = 2.155;
  let _h = 2.155;

  for (let i = 0; i < Blockly.FieldMpythonmatrix.prototype.rows; i++) {
    for (let j = 0; j < Blockly.FieldMpythonmatrix.prototype.cols; j++) {
      let x = (j + 1) * 1 + j * _w;
      let y = (i + 1) * 1 + i * _h;

      let _color;
      if (_matrix[j][i] === 1) {
        _color = this.codeColorToDrawColor(_colors_matrix[j][i]);
        // _color = _colors_matrix[j][i];
      } else {
        _color = 'rgb(237, 245, 254)';
      }

      svg += '<rect x="' + y + '" y="' + x + '" width="' + _w + '" height="' + _h + '" style="fill:' + _color + ';"/>';
    }
  }
  svg += '</svg>';

  return svgEncode(svg);
}
Blockly.Field.register('field_mpythonmatrix', Blockly.FieldMpythonmatrix);
