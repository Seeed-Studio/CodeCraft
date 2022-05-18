/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2011 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Toolbox from whence to create blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Toolbox');

goog.require('Blockly.Events.Ui');
goog.require('Blockly.HorizontalFlyout');
goog.require('Blockly.Touch');
goog.require('Blockly.VerticalFlyout');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.BrowserFeature');
goog.require('goog.html.SafeHtml');
goog.require('goog.html.SafeStyle');
goog.require('goog.math.Rect');
goog.require('goog.style');
goog.require('goog.ui.tree.TreeControl');
goog.require('goog.ui.tree.TreeNode');


/**
 * Class for a Toolbox.
 * Creates the toolbox's DOM.
 * @param {!Blockly.Workspace} workspace The workspace in which to create new
 *     blocks.
 * @constructor
 */
Blockly.Toolbox = function (workspace) {
  /**
   * @type {!Blockly.Workspace}
   * @private
   */
  this.workspace_ = workspace;

  /**
   * Whether toolbox categories should be represented by icons instead of text.
   * @type {boolean}
   * @private
   */
  this.iconic_ = false;

  /**
   * Is RTL vs LTR.
   * @type {boolean}
   */
  this.RTL = workspace.options.RTL;

  /**
   * Whether the toolbox should be laid out horizontally.
   * @type {boolean}
   * @private
   */
  this.horizontalLayout_ = workspace.options.horizontalLayout;

  /**
   * Position of the toolbox and flyout relative to the workspace.
   * @type {number}
   */
  this.toolboxPosition = workspace.options.toolboxPosition;

  this.preItemId = null;

  this.searchInput = '';

  this.searchDiv = '';
};

/**
 * Width of the toolbox, which changes only in vertical layout.
 * This is the sum of the width of the flyout (250) and the category menu (60).
 * @type {number}
 */
// Blockly.Toolbox.prototype.width = 310;
Blockly.Toolbox.prototype.width = 360;

/**
 * Height of the toolbox, which changes only in horizontal layout.
 * @type {number}
 */
Blockly.Toolbox.prototype.height = 0;

Blockly.Toolbox.prototype.selectedItem_ = null;

Blockly.Toolbox.extensionButtonShow = null;
Blockly.Toolbox.extensionButtonClick = null;
Blockly.Toolbox.openDevicesLibrary = null;

Blockly.Toolbox.prototype.blockSearch = 'blockSearch';

/**
 * Initializes the toolbox.
 */
Blockly.Toolbox.prototype.init = function () {
  var workspace = this.workspace_;
  var svg = this.workspace_.getParentSvg();

  /**
   * HTML container for the Toolbox menu.
   * @type {Element}
   */
  this.HtmlDiv =
    goog.dom.createDom(goog.dom.TagName.DIV, 'blocklyToolboxDiv');
  this.HtmlDiv.setAttribute('dir', workspace.RTL ? 'RTL' : 'LTR');
  svg.parentNode.insertBefore(this.HtmlDiv, svg);

  // Clicking on toolbox closes popups.
  Blockly.bindEventWithChecks_(this.HtmlDiv, 'mousedown', this,
    function (e) {
      // Cancel any gestures in progress.
      this.workspace_.cancelCurrentGesture();
      if (Blockly.utils.isRightButton(e) || e.target == this.HtmlDiv) {
        // Close flyout.
        Blockly.hideChaff(false);
        // 隐藏积木区
        this.flyout_.hide();
        this.clearSelection();
      } else {
        // Just close popups.
        Blockly.hideChaff(true);
      }
      Blockly.Touch.clearTouchIdentifier();  // Don't block future drags.
    }, /*opt_noCaptureIdentifier*/ false, /*opt_noPreventDefault*/ true);

  this.createFlyout_();
  this.categoryMenu_ = new Blockly.Toolbox.CategoryMenu(this, this.HtmlDiv);
  this.populate_(workspace.options.languageTree);
  this.position();

  // 无搜索结果
  this.noResultDiv = goog.dom.createDom(goog.dom.TagName.DIV, 'noResultDiv');
  this.noResultDiv.innerHTML = `<div>
    <div class="noResultTitle">${Blockly.Msg.TOOLBOX_NO_RESULT}</div>
    <div class="noResultText">${Blockly.Msg.TOOLBOX_NO_BLOCKS}</div>
    <div class="noResultText">${Blockly.Msg.TOOLBOX_SEARCH_OTHER_DEVICE}</div>
    <div class="toggleDevice">
      <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjMgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIzIDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRCOUZGMDt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzLjksMTMuOUg3Yy0zLjgsMC02LjktMy4xLTYuOS02LjlDMC4xLDMuMiwzLjIsMCw3LDBoMC44djJIN0M0LjMsMiwyLjEsNC4zLDIuMSw3czIuMiw0LjksNC45LDQuOWgyLjgKCQlMNy45LDkuNGwxLjYtMS4yTDEzLjksMTMuOXoiLz4KPC9nPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNiwxMy45aC0wLjh2LTJIMTZjMi43LDAsNC45LTIuMiw0LjktNC45UzE4LjgsMiwxNiwyaC0yLjhsMS45LDIuNWwtMS42LDEuMkw5LjIsMEgxNkMxOS45LDAsMjMsMy4yLDIzLDcKCQlDMjMsMTAuOCwxOS45LDEzLjksMTYsMTMuOXoiLz4KPC9nPgo8L3N2Zz4K" class="toggleIcon" />
      ${Blockly.Msg.TOOLBOX_TOGGLE_DEVICE}
    </div>
  </div>`;
  svg.parentNode.insertBefore(this.noResultDiv, svg);
};

/**
 * Dispose of this toolbox.
 */
Blockly.Toolbox.prototype.dispose = function () {
  this.flyout_.dispose();
  this.categoryMenu_.dispose();
  this.categoryMenu_ = null;
  goog.dom.removeNode(this.HtmlDiv);
  this.workspace_ = null;
  this.lastCategory_ = null;
};

/**
 * Create and configure a flyout based on the main workspace's options.
 * @private
 */
Blockly.Toolbox.prototype.createFlyout_ = function () {
  var workspace = this.workspace_;

  var options = {
    disabledPatternId: workspace.options.disabledPatternId,
    parentWorkspace: workspace,
    RTL: workspace.RTL,
    oneBasedIndex: workspace.options.oneBasedIndex,
    horizontalLayout: workspace.horizontalLayout,
    toolboxPosition: workspace.options.toolboxPosition,
    stackGlowFilterId: workspace.options.stackGlowFilterId
  };

  if (workspace.horizontalLayout) {
    this.flyout_ = new Blockly.HorizontalFlyout(options);
  } else {
    this.flyout_ = new Blockly.VerticalFlyout(options);
  }
  this.flyout_.setParentToolbox(this);

  goog.dom.insertSiblingAfter(
    this.flyout_.createDom('svg'), this.workspace_.getParentSvg());
  this.flyout_.init(workspace);
};

/**
 * Fill the toolbox with categories and blocks.
 * @param {!Node} newTree DOM tree of blocks.
 * @private
 */
Blockly.Toolbox.prototype.populate_ = function (newTree) {
  this.categoryMenu_.populate(newTree);
  // this.showAll_(this.categoryMenu_.categories_[0]);
  // this.setSelectedItem(this.categoryMenu_.categories_[0], false);
  if (this.categoryMenu_.categories_[0]) {
    this.categoryMenu_.categories_[0].id_ = this.blockSearch;
  }
  this.setSelectedItemInit();

  var noResultDiv = document.getElementsByClassName('noResultDiv')[0];
  if (noResultDiv) {
    noResultDiv.innerHTML = `<div>
      <div class="noResultTitle">${Blockly.Msg.TOOLBOX_NO_RESULT}</div>
      <div class="noResultText">${Blockly.Msg.TOOLBOX_NO_BLOCKS}</div>
      <div class="noResultText">${Blockly.Msg.TOOLBOX_SEARCH_OTHER_DEVICE}</div>
      <div class="toggleDevice">
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjMgMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIzIDE0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRCOUZGMDt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzLjksMTMuOUg3Yy0zLjgsMC02LjktMy4xLTYuOS02LjlDMC4xLDMuMiwzLjIsMCw3LDBoMC44djJIN0M0LjMsMiwyLjEsNC4zLDIuMSw3czIuMiw0LjksNC45LDQuOWgyLjgKCQlMNy45LDkuNGwxLjYtMS4yTDEzLjksMTMuOXoiLz4KPC9nPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNiwxMy45aC0wLjh2LTJIMTZjMi43LDAsNC45LTIuMiw0LjktNC45UzE4LjgsMiwxNiwyaC0yLjhsMS45LDIuNWwtMS42LDEuMkw5LjIsMEgxNkMxOS45LDAsMjMsMy4yLDIzLDcKCQlDMjMsMTAuOCwxOS45LDEzLjksMTYsMTMuOXoiLz4KPC9nPgo8L3N2Zz4K" class="toggleIcon" />
        ${Blockly.Msg.TOOLBOX_TOGGLE_DEVICE}
      </div>
    </div>`;
    var toggleDevice = document.getElementsByClassName('toggleDevice')[0];
    toggleDevice.onclick = function () {
      Blockly.Toolbox.openDevicesLibrary();
    }
  }

  // 判断是否显示拓展按钮
  var extensionDiv = document.getElementsByClassName('extensionDiv')[0];
  if (Blockly.Toolbox.extensionButtonShow && Blockly.Toolbox.extensionButtonShow()) {
    goog.dom.removeNode(extensionDiv);
    extensionDiv = goog.dom.createDom(goog.dom.TagName.DIV, 'extensionDiv');
    extensionDiv.innerHTML =
      `<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNDAgMjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQwIDI2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzUxRERENDt9Cgkuc3Qxe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMy44LDI2aC0xLjdjLTAuNywwLTEuNC0wLjQtMS43LTFMOCwyMGgxMGwtMi41LDVDMTUuMiwyNS42LDE0LjYsMjYsMTMuOCwyNnoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTMyLjMsMEgxNy4xYy0wLjUsMC0wLjksMC4zLTEuMiwwLjdsLTEsMmMtMC4yLDAuNC0wLjcsMC43LTEuMiwwLjdoLTEuNmMtMC41LDAtMC45LTAuMy0xLjItMC43bC0xLTIKCUM5LjgsMC4zLDkuNCwwLDguOSwwSDcuN0MzLjQsMCwwLDMuNCwwLDcuN3Y2LjdDMCwxOC42LDMuNCwyMiw3LjcsMjJoMjQuN2M0LjIsMCw3LjctMy40LDcuNy03LjdWNy43QzQwLDMuNCwzNi42LDAsMzIuMywweiIvPgo8Zz4KCTxyZWN0IHg9IjIxIiB5PSIxMCIgY2xhc3M9InN0MSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjIiLz4KPC9nPgo8Zz4KCTxyZWN0IHg9IjI2IiB5PSI1IiBjbGFzcz0ic3QxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxMiIvPgo8L2c+Cjwvc3ZnPgo=" alt=""/>
            <div style="text-align:center">${Blockly.Msg.TOOLBOX_EXTENSION_CATEGORY_NAME}</div>`;
    extensionDiv.onclick = function () {
      if (Blockly.Toolbox.extensionButtonClick) {
        Blockly.Toolbox.extensionButtonClick();
      }
    }
    this.HtmlDiv.appendChild(extensionDiv);
  } else {
    goog.dom.removeNode(extensionDiv);
  }
};

/**
 * Show all blocks for all categories in the flyout
 * @private
 */
Blockly.Toolbox.prototype.showAll_ = function (item) {
  // var allContents = [];
  // for (var i = 0; i < this.categoryMenu_.categories_.length; i++) {
  //   var category = this.categoryMenu_.categories_[i];

  //   // create a label node to go at the top of the category
  //   var labelString = '<xml><label text="' + category.name_ + '"' +
  //     ' id="' + category.id_ + '"' +
  //     ' category-label="true"' +
  //     ' showStatusButton="' + category.showStatusButton_ + '"' +
  //     ' web-class="categoryLabel">' +
  //     '</label></xml>';
  //   var labelXML = Blockly.Xml.textToDom(labelString);

  //   allContents.push(labelXML.firstChild);

  //   allContents = allContents.concat(category.getContents());
  // }
  // this.flyout_.show(allContents);
  if (item) {
    var allContents = [];
    if (item.id_ !== this.blockSearch) {
      allContents = allContents.concat(item.getContents());
    } else {
      for (var i = 0; i < this.categoryMenu_.categories_.length; i++) {
        var category = this.categoryMenu_.categories_[i];
        var getContents = category.getContents();
        if (getContents && getContents.length > 0) {
          for (var j = 0; j < getContents.length; j++) {
            if (getContents[j].outerHTML) {
              var blockType = getContents[j].getAttribute('type');
              if (Blockly.Blocks[blockType] && Blockly.Blocks[blockType].init) {
                var initStr = Blockly.Blocks[blockType].init.toString().replace(/\s+/g, "");
                if (initStr && initStr.match(/{(\S*)}/) && initStr.match(/{(\S*)}/)[1].match(/{(\S*)}/)) {
                  initStr = initStr.match(/{(\S*)}/)[1].match(/{(\S*)}/)[0].replace(/i\./g, 'Blockly.');
                  try {
                    var initObj = eval("(" + initStr + ")");
                    if (initObj) {
                      var l = 0; var msg = '';
                      while (initObj['message' + l]) {
                        msg += initObj['message' + l];
                        l++;
                      }
                      var reg1 = /%\d| /g;
                      if (msg) {
                        msg = msg.replace(reg1, "");
                        if (!this.searchInput) {
                          allContents = [];
                        } else {
                          if (msg.indexOf(this.searchInput) !== -1) {
                            allContents = allContents.concat(getContents[j]);
                          }
                        }
                      }
                    }
                  } catch (err) {
                    // console.log('initStrErr---', initStr)
                  }
                }
              }
            }
          }
        }
      }
    }
    this.flyout_.show(allContents);

    // flyout宽度自适应
    if (item.id_ !== this.blockSearch || (item.id_ === this.blockSearch && allContents.length !== 0)) {
      let flyoutWidth = 0;
      var flyoutChildren = this.flyout_.svgGroup_.children[1].firstChild.children;
      for (var i = 0; i < flyoutChildren.length; i++) {
        if (flyoutChildren[i].width) {
          var animValValue = parseInt(flyoutChildren[i].width.animVal.value * 0.75) + 50;
          if (animValValue > flyoutWidth) {
            flyoutWidth = animValValue;
          }
        } else if (flyoutChildren[i].firstChild.width) {
          var aValValue = parseInt(flyoutChildren[i].firstChild.width.animVal.value * 0.75) + 50;
          if (aValValue > flyoutWidth) {
            flyoutWidth = aValValue;
          }
        }
      }
      if (flyoutWidth === 0) {
        flyoutWidth = 250;
      }
      if (flyoutWidth > 700) {
        flyoutWidth = 700;
        Blockly.utils.addClass(/** @type {!Element} */(this.flyout_.svgGroup_), 'blocklyFlyoutOverflow');
      } else {
        Blockly.utils.removeClass(/** @type {!Element} */(this.flyout_.svgGroup_), 'blocklyFlyoutOverflow');
      }

      this.flyout_.svgGroup_.setAttribute('width', flyoutWidth);
      // 记录改变后的宽度
      this.flyout_.CHANGED_WIDTH = flyoutWidth;
      document.getElementsByClassName('blocklyFlyoutScrollbar')[0].style.transform = 'translate(' + (flyoutWidth + 100) + 'px, ' + '2.5px)';
    }
    // 搜索无积木，展示无结果提示
    if (item.id_ === this.blockSearch && allContents.length === 0) {
      this.noResultDiv.style.display = 'block';
      this.flyout_.svgGroup_.setAttribute('width', 300);
      // 记录改变后的宽度
      this.flyout_.CHANGED_WIDTH = 300;
      document.getElementsByClassName('blocklyFlyoutScrollbar')[0].style.transform = 'translate(' + (300 + 100) + 'px, ' + '2.5px)';
    }
  }
};

/**
 * Get the width of the toolbox.
 * @return {number} The width of the toolbox.
 */
Blockly.Toolbox.prototype.getWidth = function () {
  return this.width;
};

/**
 * Get the height of the toolbox, not including the block menu.
 * @return {number} The height of the toolbox.
 */
Blockly.Toolbox.prototype.getHeight = function () {
  return this.categoryMenu_ ? this.categoryMenu_.getHeight() : 0;
};

/**
 * Move the toolbox to the edge.
 */
Blockly.Toolbox.prototype.position = function () {
  var treeDiv = this.HtmlDiv;
  if (!treeDiv) {
    // Not initialized yet.
    return;
  }
  var svg = this.workspace_.getParentSvg();
  var svgSize = Blockly.svgSize(svg);
  if (this.horizontalLayout_) {
    treeDiv.style.left = '0';
    treeDiv.style.height = 'auto';
    treeDiv.style.width = svgSize.width + 'px';
    this.height = treeDiv.offsetHeight;
    if (this.toolboxPosition == Blockly.TOOLBOX_AT_TOP) {  // Top
      treeDiv.style.top = '0';
    } else {  // Bottom
      treeDiv.style.bottom = '0';
    }
  } else {
    if (this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT) {  // Right
      treeDiv.style.right = '0';
    } else {  // Left
      treeDiv.style.left = '0';
    }
    // treeDiv.style.height = '100%';
  }
  this.flyout_.position();
};

/**
 * Unhighlight any previously specified option.
 */
Blockly.Toolbox.prototype.clearSelection = function () {
  this.setSelectedItem(null);
};

/**
 * Adds a style on the toolbox. Usually used to change the cursor.
 * @param {string} style The name of the class to add.
 * @package
 */
Blockly.Toolbox.prototype.addStyle = function (style) {
  Blockly.utils.addClass(/** @type {!Element} */(this.HtmlDiv), style);
};

/**
 * Removes a style from the toolbox. Usually used to change the cursor.
 * @param {string} style The name of the class to remove.
 * @package
 */
Blockly.Toolbox.prototype.removeStyle = function (style) {
  Blockly.utils.removeClass(/** @type {!Element} */(this.HtmlDiv), style);
};

/**
 * Return the deletion rectangle for this toolbox.
 * @return {goog.math.Rect} Rectangle in which to delete.
 */
Blockly.Toolbox.prototype.getClientRect = function () {
  if (!this.HtmlDiv) {
    return null;
  }

  // If not an auto closing flyout, always use the (larger) flyout client rect
  // if (!this.flyout_.autoClose) {
  //   return this.flyout_.getClientRect();
  // }

  // BIG_NUM is offscreen padding so that blocks dragged beyond the toolbox
  // area are still deleted.  Must be smaller than Infinity, but larger than
  // the largest screen size.
  var BIG_NUM = 10000000;
  var toolboxRect = this.HtmlDiv.getBoundingClientRect();

  var x = toolboxRect.left;
  var y = toolboxRect.top;
  var width = toolboxRect.width;
  var height = toolboxRect.height;

  // Assumes that the toolbox is on the SVG edge.  If this changes
  // (e.g. toolboxes in mutators) then this code will need to be more complex.
  if (this.toolboxPosition == Blockly.TOOLBOX_AT_LEFT) {
    // toolbox中的垃圾桶开关盖
    return new goog.math.Rect(x, -BIG_NUM, width, 2 * BIG_NUM);
    // return new goog.math.Rect(-BIG_NUM, -BIG_NUM, BIG_NUM + x + width, 2 * BIG_NUM);
  } else if (this.toolboxPosition == Blockly.TOOLBOX_AT_RIGHT) {
    return new goog.math.Rect(toolboxRect.right - width, -BIG_NUM, BIG_NUM + width, 2 * BIG_NUM);
  } else if (this.toolboxPosition == Blockly.TOOLBOX_AT_TOP) {
    return new goog.math.Rect(-BIG_NUM, -BIG_NUM, 2 * BIG_NUM,
      BIG_NUM + y + height);
  } else {  // Bottom
    return new goog.math.Rect(0, y, 2 * BIG_NUM, BIG_NUM);
  }
};

/**
 * Update the flyout's contents without closing it.  Should be used in response
 * to a change in one of the dynamic categories, such as variables or
 * procedures.
 */
Blockly.Toolbox.prototype.refreshSelection = function () {
  this.showAll_(this.selectedItem_);
};

/**
 * @return {Blockly.Toolbox.Category} the currently selected category.
 */
Blockly.Toolbox.prototype.getSelectedItem = function () {
  return this.selectedItem_;
};

/**
 * @return {string} The name of the currently selected category.
 */
Blockly.Toolbox.prototype.getSelectedCategoryName = function () {
  return this.selectedItem_.name_;
};

/**
 * @return {string} The id of the currently selected category.
 * @public
 */
Blockly.Toolbox.prototype.getSelectedCategoryId = function () {
  return this.selectedItem_.id_;
};

/**
 * @return {number} The distance flyout is scrolled below the top of the currently
 * selected category.
 */
Blockly.Toolbox.prototype.getCategoryScrollOffset = function () {
  var categoryPos = this.getCategoryPositionById(this.getSelectedCategoryId());
  return this.flyout_.getScrollPos() - categoryPos;
};

/**
 * Get the position of a category by name.
 * @param  {string} name The name of the category.
 * @return {number} The position of the category.
 */
Blockly.Toolbox.prototype.getCategoryPositionByName = function (name) {
  var scrollPositions = this.flyout_.categoryScrollPositions;
  for (var i = 0; i < scrollPositions.length; i++) {
    if (name === scrollPositions[i].categoryName) {
      return scrollPositions[i].position;
    }
  }
};

/**
 * Get the position of a category by id.
 * @param  {string} id The id of the category.
 * @return {number} The position of the category.
 * @public
 */
Blockly.Toolbox.prototype.getCategoryPositionById = function (id) {
  var scrollPositions = this.flyout_.categoryScrollPositions;
  for (var i = 0; i < scrollPositions.length; i++) {
    if (id === scrollPositions[i].categoryId) {
      return scrollPositions[i].position;
    }
  }
};

/**
 * Get the length of a category by name.
 * @param  {string} name The name of the category.
 * @return {number} The length of the category.
 */
Blockly.Toolbox.prototype.getCategoryLengthByName = function (name) {
  var scrollPositions = this.flyout_.categoryScrollPositions;
  for (var i = 0; i < scrollPositions.length; i++) {
    if (name === scrollPositions[i].categoryName) {
      return scrollPositions[i].length;
    }
  }
};

/**
 * Get the length of a category by id.
 * @param  {string} id The id of the category.
 * @return {number} The length of the category.
 * @public
 */
Blockly.Toolbox.prototype.getCategoryLengthById = function (id) {
  var scrollPositions = this.flyout_.categoryScrollPositions;
  for (var i = 0; i < scrollPositions.length; i++) {
    if (id === scrollPositions[i].categoryId) {
      return scrollPositions[i].length;
    }
  }
};

/**
 * Set the scroll position of the flyout.
 * @param {number} pos The position to set.
 */
Blockly.Toolbox.prototype.setFlyoutScrollPos = function (pos) {
  this.flyout_.setScrollPos(pos);
};


Blockly.Toolbox.prototype.setSelectedItemInit = function (item) {
  this.selectedItem_ = item;
  // 分类显示block块
  this.showAll_(item);
  this.flyout_.hide();
  this.clearSelection();
};

/**
 * Set the currently selected category.
 * @param {Blockly.Toolbox.Category} item The category to select.
 * @param {boolean=} opt_shouldScroll Whether to scroll to the selected category. Defaults to true.
 */
Blockly.Toolbox.prototype.setSelectedItem = function (item, opt_shouldScroll, isBlockSearch) {
  if (typeof opt_shouldScroll === 'undefined') {
    opt_shouldScroll = true;
  }
  if (this.selectedItem_) {
    // They selected a different category but one was already open.  Close it.
    this.selectedItem_.setSelected(false);
  }
  if (item != null) {
    this.selectedItem_ = item;
    // 如果积木区为显示状态 且 前后两次点击的类别不同时 隐藏积木区
    if (this.flyout_.isVisible_ && item.id_ && this.preItemId === item.id_ && !isBlockSearch) {
      this.flyout_.hide();
      this.clearSelection();
    } else {
      // 分类显示block块
      this.showAll_(item);

      this.selectedItem_.setSelected(true);
      // Scroll flyout to the top of the selected category
      var categoryId = item.id_;
      if (opt_shouldScroll) {
        this.scrollToCategoryById(categoryId);
      }
    }
    this.preItemId = item.id_;
  }
};

/**
 * Select and scroll to a category by name.
 * @param {string} name The name of the category to select and scroll to.
 */
Blockly.Toolbox.prototype.setSelectedCategoryByName = function (name) {
  this.selectCategoryByName(name);
  this.scrollToCategoryByName(name);
};

/**
 * Select and scroll to a category by id.
 * @param {string} id The id of the category to select and scroll to.
 * @public
 */
Blockly.Toolbox.prototype.setSelectedCategoryById = function (id) {
  this.selectCategoryById(id);
  this.scrollToCategoryById(id);
};

/**
 * Scroll to a category by name.
 * @param {string} name The name of the category to scroll to.
 * @package
 */
Blockly.Toolbox.prototype.scrollToCategoryByName = function (name) {
  var scrollPositions = this.flyout_.categoryScrollPositions;
  for (var i = 0; i < scrollPositions.length; i++) {
    if (name === scrollPositions[i].categoryName) {
      this.flyout_.setVisible(true);
      this.flyout_.scrollTo(scrollPositions[i].position);
      return;
    }
  }
};

/**
 * Scroll to a category by id.
 * @param {string} id The id of the category to scroll to.
 * @public
 */
Blockly.Toolbox.prototype.scrollToCategoryById = function (id) {
  var scrollPositions = this.flyout_.categoryScrollPositions;
  for (var i = 0; i < scrollPositions.length; i++) {
    if (id === scrollPositions[i].categoryId) {
      this.flyout_.setVisible(true);
      this.flyout_.scrollTo(scrollPositions[i].position);
      return;
    }
  }
};

/**
 * Get a category by its index.
 * @param  {number} index The index of the category.
 * @return {Blockly.Toolbox.Category} the category, or null if there are no categories.
 * @package
 */
Blockly.Toolbox.prototype.getCategoryByIndex = function (index) {
  if (!this.categoryMenu_.categories_) return null;
  return this.categoryMenu_.categories_[index];
};

/**
 * Select a category by name.
 * @param {string} name The name of the category to select.
 * @package
 */
Blockly.Toolbox.prototype.selectCategoryByName = function (name) {
  for (var i = 0; i < this.categoryMenu_.categories_.length; i++) {
    var category = this.categoryMenu_.categories_[i];
    if (name === category.name_) {
      this.selectedItem_.setSelected(false);
      this.selectedItem_ = category;
      this.selectedItem_.setSelected(true);
    }
  }
};

/**
 * Select a category by id.
 * @param {string} id The id of the category to select.
 * @package
 */
Blockly.Toolbox.prototype.selectCategoryById = function (id) {
  for (var i = 0; i < this.categoryMenu_.categories_.length; i++) {
    var category = this.categoryMenu_.categories_[i];
    if (id === category.id_) {
      this.selectedItem_.setSelected(false);
      this.selectedItem_ = category;
      this.selectedItem_.setSelected(true);
    }
  }
};

/**
 * Wrapper function for calling setSelectedItem from a touch handler.
 * @param {Blockly.Toolbox.Category} item The category to select.
 * @return {function} A function that can be passed to bindEvent.
 */
Blockly.Toolbox.prototype.setSelectedItemFactory = function (item) {
  var selectedItem = item;
  return function () {
    this.setSelectedItem(selectedItem);
    Blockly.Touch.clearTouchIdentifier();
  };
};

// Category menu
/**
 * Class for a table of category titles that will control which category is
 * displayed.
 * @param {Blockly.Toolbox} parent The toolbox that owns the category menu.
 * @param {Element} parentHtml The containing html div.
 * @constructor
 */
Blockly.Toolbox.CategoryMenu = function (parent, parentHtml) {
  this.parent_ = parent;
  this.height_ = 0;
  this.parentHtml_ = parentHtml;
  this.createDom();
  this.categories_ = [];
};

/**
 * @return {number} the height of the category menu.
 */
Blockly.Toolbox.CategoryMenu.prototype.getHeight = function () {
  return this.height_;
};

/**
 * Create the DOM for the category menu.
 */
Blockly.Toolbox.CategoryMenu.prototype.createDom = function () {
  this.table = goog.dom.createDom('div', this.parent_.horizontalLayout_ ?
    'scratchCategoryMenuHorizontal' : (Blockly.Toolbox.extensionButtonShow && Blockly.Toolbox.extensionButtonShow() ? 'scratchCategoryMenu' : 'scratchCategoryMenuSp'));

  this.parentHtml_.appendChild(this.table);
};

/**
 * Fill the toolbox with categories and blocks by creating a new
 * {Blockly.Toolbox.Category} for every category tag in the toolbox xml.
 * @param {Node} domTree DOM tree of blocks, or null.
 */
Blockly.Toolbox.CategoryMenu.prototype.populate = function (domTree) {
  if (!domTree) {
    return;
  }
  var toolbox = this.parent_;

  if (document.getElementsByClassName('trashContainer').length === 0) {
    this.trashContainer = goog.dom.createDom('div', 'trashContainer');
    this.trashContainerDiv = goog.dom.createDom('div', 'trashContainerDiv')
    this.trashCoverIcon = goog.dom.createDom('div', 'trashCoverIcon')
    this.trashContainerDiv.appendChild(this.trashCoverIcon);
    this.trashContainerDiv.appendChild(goog.dom.createDom('div', 'trashcanBodyIcon'))
    this.trashContainer.appendChild(this.trashContainerDiv);
    toolbox.HtmlDiv.appendChild(this.trashContainer);
  }

  // Remove old categories
  this.dispose();
  this.createDom();
  var categories = [];
  // Find actual categories from the DOM tree.
  for (var i = 0, child; child = domTree.childNodes[i]; i++) {
    if (!child.tagName || child.tagName.toUpperCase() != 'CATEGORY') {
      continue;
    }
    categories.push(child);
  }

  var searchInput = goog.dom.createDom('div', 'scratchCategoryMenuRowSearchContainer');
  searchInput.innerHTML = `<span>
    <input class="scratchCategoryMenuRowInput" id="scratchCategoryMenuRowInput" placeholder=${Blockly.Msg.TOOLBOX_SEARCH} />
    <img class="scratchCategoryMenuRowSearchIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAACiUlEQVQ4T6WUS0hUcRTGv3PnQenCilq06IFQi1xVzqOdRm2K0nLuFWcGQVsEkrVwYbTpARFERO9VEqlzjfGOqdjOoEWbeaS0qI0QBkFEBD1E0mn+X9zbOI3j+IjO7t5z/r//Oef77hWURDz+xpt1zTaDbAS4H5ANAL4DnCC00eyPGbOtrf5n6bmFZylODFiZgILqA7BruQMA34tyRcNG7ctyNQWgOZQ8SCVjANYDmBLyurjV+KyW++KeW7fRLbk6iHQD2ANgnmRTVA/Y9YvCAQ4Mp7apX3gFYAsgPR5V0WEYNfNL1xF3ZbWdNwGcBfANUL5IKDhVXOcAY1b6IcBTpDyLhGqPiQiXH9muTz0B0CykFdYD+iJgPJ6pymrqs/1Sc+V2t5w4ML0SzM71JTJbNap3ALwUtSPaFPxQEKUvkT6ukSMCvAiH/PWrwRby/YPpMREehUhrpMlnC+mEmIlkJyl3SLkb1X32btYU/VbqmgDnQV6O6IFLBWDMSp0DcOtfgbFE8iooFwhciYb8F/92aCUbCXkKYDwS8h9eU3uOkMlhQBqEaA/r/kcFYLEoFFVdvODl4KaZ2UyvssWr0Fy56mIh87ZJxQCEbRu0hPzGarYxrWQPIe1CjIZ1f8NSHybS1SAnAFQBuO1R012GYeRKOyQpZiJtATjpfC1K7Y0awbdLgHlzHwFo79ILYJLCG5qbz8MNwU/OiJ5cPQVdAgnkARTiTFj3PygLdAw7mK7ThI8BbF9BnI8AhgB0OL4rgS7629gFvb2vK10Vc635sfYB2ATgKyCTAEc8qrLHMGpmzMFUBwX37DOEdEZDvvvOBWu1Sbm6ctD/AtqXFENF46H/Bv6Bpk9T2A2l9N9iGxTMNSPrugAAAABJRU5ErkJggg==" />
  </span>`;
  this.table.appendChild(searchInput);

  var scratchCategoryMenuRowInput = document.getElementById('scratchCategoryMenuRowInput');
  scratchCategoryMenuRowInput.onkeyup = function (e) {
    toolbox.searchInput = e.target.value.replace(/\ /g, "");
    toolbox.setSelectedItem(toolbox.categoryMenu_.categories_[0], false, true);
    toolbox.showAll_(toolbox.categoryMenu_.categories_[0]);
    if (!toolbox.searchInput) {
      toolbox.searchDiv.style.display = 'none';
      toolbox.flyout_.hide();
    } else {
      toolbox.searchDiv.style.display = 'block';
      toolbox.searchDiv.style.background = '#4B9FF0';
      toolbox.searchDiv.style.color = '#FFFFFF';
    }
  }
  // Create a single column of categories
  for (var i = 0; i < categories.length; i++) {
    var child = categories[i];
    var row = goog.dom.createDom('div', 'scratchCategoryMenuRow');
    if (child.id === 'search') {
      row.id = 'search';
      row.style.display = 'none';
      toolbox.searchDiv = row;
    }
    this.table.appendChild(row);
    if (child) {
      this.categories_.push(new Blockly.Toolbox.Category(this, row,
        child));
    }
  }

  this.height_ = this.table.offsetHeight;
};

/**
 * Dispose of this Category Menu and all of its children.
 */
Blockly.Toolbox.CategoryMenu.prototype.dispose = function () {
  for (var i = 0, category; category = this.categories_[i]; i++) {
    category.dispose();
  }
  this.categories_ = [];
  if (this.table) {
    goog.dom.removeNode(this.table);
    this.table = null;
  }
};


// Category
/**
 * Class for the data model of a category in the toolbox.
 * @param {Blockly.Toolbox.CategoryMenu} parent The category menu that owns this
 *     category.
 * @param {Element} parentHtml The containing html div.
 * @param {Node} domTree DOM tree of blocks.
 * @constructor
 */
Blockly.Toolbox.Category = function (parent, parentHtml, domTree) {
  this.parent_ = parent;
  this.parentHtml_ = parentHtml;
  this.name_ = domTree.getAttribute('name');
  this.id_ = domTree.getAttribute('id');
  this.setColour(domTree);
  this.custom_ = domTree.getAttribute('custom');
  this.iconURI_ = domTree.getAttribute('iconURI');
  this.showStatusButton_ = domTree.getAttribute('showStatusButton');
  this.contents_ = [];
  if (!this.custom_) {
    this.parseContents_(domTree);
  }
  this.createDom();
};

/**
 * Dispose of this category and all of its contents.
 */
Blockly.Toolbox.Category.prototype.dispose = function () {
  if (this.item_) {
    goog.dom.removeNode(this.item_);
    this.item = null;
  }
  this.parent_ = null;
  this.parentHtml_ = null;
  this.contents_ = null;
};

/**
 * Create the DOM for a category in the toolbox.
 */
Blockly.Toolbox.Category.prototype.createDom = function () {
  var toolbox = this.parent_.parent_;
  this.item_ = goog.dom.createDom('div',
    { 'class': 'scratchCategoryMenuItem' });
  this.label_ = goog.dom.createDom('div',
    { 'class': 'scratchCategoryMenuItemLabel' },
    Blockly.utils.replaceMessageReferences(this.name_));
  this.label_.title = Blockly.utils.replaceMessageReferences(this.name_);
  if (this.iconURI_) {
    this.bubble_ = goog.dom.createDom('div',
      { 'class': 'scratchCategoryItemIcon' });
    this.bubble_.style.backgroundImage = 'url(' + this.iconURI_ + ')';
  } else {
    this.bubble_ = goog.dom.createDom('div',
      { 'class': 'scratchCategoryItemBubble' });
    this.bubble_.style.backgroundColor = this.colour_;
    this.bubble_.style.borderColor = this.secondaryColour_;
  }
  if (this.id_ !== 'search') {
    this.item_.appendChild(this.bubble_);
  } else {
    Blockly.utils.addClass(/** @type {!Element} */(this.label_), 'searchLable');
  }
  this.item_.appendChild(this.label_);
  this.parentHtml_.appendChild(this.item_);
  Blockly.bindEvent_(
    // this.item_, 'mouseup', toolbox, toolbox.setSelectedItemFactory(this));
    this.item_, 'click', toolbox, toolbox.setSelectedItemFactory(this));
};

/**
 * Set the selected state of this category.
 * @param {boolean} selected Whether this category is selected.
 */
Blockly.Toolbox.Category.prototype.setSelected = function (selected) {
  if (selected) {
    this.item_.className = 'scratchCategoryMenuItem categorySelected';
    this.parent_.parent_.HtmlDiv.className = 'blocklyToolboxDiv blocklyToolboxDivSelect';
  } else {
    this.item_.className = 'scratchCategoryMenuItem';
    this.parent_.parent_.HtmlDiv.className = 'blocklyToolboxDiv';

  }
};

/**
 * Set the contents of this category from DOM.
 * @param {Node} domTree DOM tree of blocks.
 * @constructor
 */
Blockly.Toolbox.Category.prototype.parseContents_ = function (domTree) {
  for (var i = 0, child; child = domTree.childNodes[i]; i++) {
    if (!child.tagName) {
      // Skip
      continue;
    }
    switch (child.tagName.toUpperCase()) {
      case 'BLOCK':
      case 'SHADOW':
      case 'LABEL':
      case 'BUTTON':
      case 'SEP':
      case 'TEXT':
        this.contents_.push(child);
        break;
      default:
        break;
    }
  }
};

/**
 * Get the contents of this category.
 * @return {!Array|string} xmlList List of blocks to show, or a string with the
 *     name of a custom category.
 */
Blockly.Toolbox.Category.prototype.getContents = function () {
  return this.custom_ ? this.custom_ : this.contents_;
};

/**
 * Set the colour of the category's background from a DOM node.
 * @param {Node} node DOM node with "colour" and "secondaryColour" attribute.
 *     Colours are a hex string or hue on a colour wheel (0-360).
 */
Blockly.Toolbox.Category.prototype.setColour = function (node) {
  var colour = node.getAttribute('colour');
  var secondaryColour = node.getAttribute('secondaryColour');
  if (goog.isString(colour)) {
    if (colour.match(/^#[0-9a-fA-F]{6}$/)) {
      this.colour_ = colour;
    } else {
      this.colour_ = Blockly.hueToRgb(colour);
    }
    if (secondaryColour.match(/^#[0-9a-fA-F]{6}$/)) {
      this.secondaryColour_ = secondaryColour;
    } else {
      this.secondaryColour_ = Blockly.hueToRgb(secondaryColour);
    }
    this.hasColours_ = true;
  } else {
    this.colour_ = '#000000';
    this.secondaryColour_ = '#000000';
  }
};
