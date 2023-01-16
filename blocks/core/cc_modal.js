'use strict';

goog.provide('Blockly.CcModal');

Blockly.CcModal = function () {
};

Blockly.CcModal.Box = null;
Blockly.CcModal.content_ = null;
Blockly.CcModal.onHide_ = null;

Blockly.CcModal.getContentDiv = function () {
  return Blockly.CcModal.content_;
}

Blockly.CcModal.createDom = function () {
  if (Blockly.DropDownDiv.Box) {
    return;
  }
  Blockly.CcModal.Box = document.createElement('div');
  Blockly.CcModal.Box.style.position = 'absolute';
  Blockly.CcModal.Box.style.zIndex = '999999';
  Blockly.CcModal.Box.style.left = '0';
  Blockly.CcModal.Box.style.right = '0';
  Blockly.CcModal.Box.style.top = '0';
  Blockly.CcModal.Box.style.bottom = '0';
  Blockly.CcModal.Box.style.backgroundColor = 'rgba(0,0,0,0.8)';
  Blockly.CcModal.Box.style.display = 'none';
  Blockly.CcModal.Box.addEventListener('click', Blockly.CcModal.hide);

  document.body.appendChild(Blockly.CcModal.Box);


  //
  Blockly.CcModal.content_ = document.createElement('div');
  Blockly.CcModal.content_.style.position = 'absolute';
  Blockly.CcModal.content_.style.left = '50%';
  Blockly.CcModal.content_.style.top = '50%';
  Blockly.CcModal.content_.style.transform = 'translate(-50%, -50%)';
  Blockly.CcModal.content_.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
  });


  //
  Blockly.CcModal.Box.appendChild(Blockly.CcModal.content_);
};

Blockly.CcModal.show = function (onHide) {
  Blockly.CcModal.Box.style.display = 'block';
  Blockly.CcModal.onHide_ = onHide;
}

Blockly.CcModal.hide = function (e) {
  e.stopPropagation();
  Blockly.CcModal.Box.style.display = 'none';
  Blockly.CcModal.content_.innerHTML = '';
  if (Blockly.CcModal.onHide_) {
    Blockly.CcModal.onHide_();
    Blockly.CcModal.onHide_ = null;
  }
}




