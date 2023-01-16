/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Inject Blockly's CSS synchronously.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * @name Blockly.Css
 * @namespace
 */
goog.provide('Blockly.Css');

goog.require('Blockly.Colours');

goog.require('goog.userAgent');

/**
 * List of cursors.
 * @enum {string}
 */
Blockly.Css.Cursor = {
  OPEN: 'handopen',
  CLOSED: 'handclosed',
  DELETE: 'handdelete'
};

/**
 * Current cursor (cached value).
 * @type {string}
 * @private
 */
Blockly.Css.currentCursor_ = '';

/**
 * Large stylesheet added by Blockly.Css.inject.
 * @type {Element}
 * @private
 */
Blockly.Css.styleSheet_ = null;

/**
 * Path to media directory, with any trailing slash removed.
 * @type {string}
 * @private
 */
Blockly.Css.mediaPath_ = '';

/**
 * Inject the CSS into the DOM.  This is preferable over using a regular CSS
 * file since:
 * a) It loads synchronously and doesn't force a redraw later.
 * b) It speeds up loading by not blocking on a separate HTTP transfer.
 * c) The CSS content may be made dynamic depending on init options.
 * @param {boolean} hasCss If false, don't inject CSS
 *     (providing CSS becomes the document's responsibility).
 * @param {string} pathToMedia Path from page to the Blockly media directory.
 */
Blockly.Css.inject = function (hasCss, pathToMedia) {
  // Only inject the CSS once.
  if (Blockly.Css.styleSheet_) {
    return;
  }
  // Placeholder for cursor rule.  Must be first rule (index 0).
  var text = '.blocklyDraggable {}\n';
  if (hasCss) {
    text += Blockly.Css.CONTENT.join('\n');
    if (Blockly.FieldDate) {
      text += Blockly.FieldDate.CSS.join('\n');
    }
  }
  // Strip off any trailing slash (either Unix or Windows).
  Blockly.Css.mediaPath_ = pathToMedia.replace(/[\\\/]$/, '');
  text = text.replace(/<<<PATH>>>/g, Blockly.Css.mediaPath_);
  // Dynamically replace colours in the CSS text, in case they have
  // been set at run-time injection.
  for (var colourProperty in Blockly.Colours) {
    if (Blockly.Colours.hasOwnProperty(colourProperty)) {
      // Replace all
      text = text.replace(
        new RegExp('\\$colour\\_' + colourProperty, 'g'),
        Blockly.Colours[colourProperty]
      );
    }
  }

  // Inject CSS tag at start of head.
  var cssNode = document.createElement('style');
  document.head.insertBefore(cssNode, document.head.firstChild);

  var cssTextNode = document.createTextNode(text);
  cssNode.appendChild(cssTextNode);
  Blockly.Css.styleSheet_ = cssNode.sheet;
};

/**
 * Set the cursor to be displayed when over something draggable.
 * See See https://github.com/google/blockly/issues/981 for context.
 * @param {Blockly.Css.Cursor} cursor Enum.
 * @deprecated April 2017.
 */
Blockly.Css.setCursor = function (cursor) {
  console.warn('Deprecated call to Blockly.Css.setCursor.' +
    'See https://github.com/google/blockly/issues/981 for context');
};

/**
 * Array making up the CSS content for Blockly.
 */
Blockly.Css.CONTENT = [
  '.blocklySvg {',
  'background-color: $colour_workspace;',
  'outline: none;',
  'overflow: hidden;', /* IE overflows by default. */
  'position: absolute;',
  'display: block;',
  '}',

  /* Necessary to position the drag surface */
  '.blocklyRelativeWrapper {',
  'position: relative;',
  'width: 100%;',
  'height: 100%;',
  '}',

  '.blocklyWidgetDiv {',
  'display: none;',
  'position: absolute;',
  'z-index: 99999;', /* big value for bootstrap3 compatibility */
  'padding: 4px 0;',
  '}',

  '.injectionDiv {',
  'height: 100%;',
  'position: relative;',
  'overflow: hidden;', /* So blocks in drag surface disappear at edges */
  'touch-action: none',
  '}',

  '.blocklyNonSelectable {',
  'user-select: none;',
  '-moz-user-select: none;',
  '-webkit-user-select: none;',
  '-ms-user-select: none;',
  '}',

  '.blocklyWidgetDiv.fieldTextInput {',
  'overflow: hidden;',
  'border: 1px solid;',
  'box-sizing: border-box;',
  'transform-origin: 0 0;',
  '-ms-transform-origin: 0 0;',
  '-moz-transform-origin: 0 0;',
  '-webkit-transform-origin: 0 0;',
  '}',

  '.blocklyWidgetDiv.fieldTextInput.removableTextInput {',
  'overflow: visible;',
  '}',

  '.blocklyTextDropDownArrow {',
  'position: absolute;',
  '}',

  '.blocklyTextRemoveIcon {',
  'position: absolute;',
  'width: 24px;',
  'height: 24px;',
  'top: -40px;',
  'left: 50%;',
  'margin-left: -12px;',
  'cursor: pointer;',
  '}',

  '.blocklyNonSelectable {',
  'user-select: none;',
  '-moz-user-select: none;',
  '-webkit-user-select: none;',
  '-ms-user-select: none;',
  '}',

  '.blocklyWsDragSurface {',
  'display: none;',
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  '}',
  /* Added as a separate rule with multiple classes to make it more specific
     than a bootstrap rule that selects svg:root. See issue #1275 for context.
  */
  '.blocklyWsDragSurface.blocklyOverflowVisible {',
  'overflow: visible;',
  '}',

  '.blocklyBlockDragSurface {',
  'display: none;',
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  'right: 0;',
  'bottom: 0;',
  'overflow: visible !important;',
  'z-index: 50;', /* Display above the toolbox */
  'opacity: 0.7',
  '}',

  '.blocklyTooltipDiv {',
  'background-color: #ffffc7;',
  'border: 1px solid #ddc;',
  'box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);',
  'color: #000;',
  'display: none;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 9pt;',
  'opacity: 0.9;',
  'padding: 2px;',
  'position: absolute;',
  'z-index: 100000;', /* big value for bootstrap3 compatibility */
  '}',

  '.blocklyDropDownDiv {',
  'position: fixed;',
  'left: 0;',
  'top: 0;',
  'z-index: 1000;',
  'display: none;',
  // 'border: 1px solid;',
  'border-radius: 4px;',
  // 'box-shadow: 0px 0px 8px 1px ' + Blockly.Colours.dropDownShadow + ';',
  'box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.1);',
  // 'padding: 4px;',
  '-webkit-user-select: none;',
  'min-height: 26px;',
  'border-radius: 10px;',
  '}',

  '.blocklyDropDownContent {',
  'max-height: 300px;', // @todo: spec for maximum height.
  'overflow: auto;',
  'border-radius: 10px;',
  '}',

  '.blocklyDropDownArrow {',
  'position: absolute;',
  'left: 0;',
  'top: 1px;',
  'width: 16px;',
  'height: 16px;',
  'z-index: -1;',
  'background-color: inherit;',
  'border-color: inherit;',
  '}',

  '.blocklyDropDownButton {',
  'display: inline-block;',
  'float: left;',
  'padding: 0;',
  'margin: 4px;',
  'border-radius: 4px;',
  'outline: none;',
  'border: 1px solid;',
  'transition: box-shadow .1s;',
  'cursor: pointer;',
  '}',

  '.blocklyDropDownButtonHover {',
  'box-shadow: 0px 0px 0px 4px ' + Blockly.Colours.fieldShadow + ';',
  '}',

  '.blocklyDropDownButton:active {',
  'box-shadow: 0px 0px 0px 6px ' + Blockly.Colours.fieldShadow + ';',
  '}',

  '.blocklyDropDownButton > img {',
  'width: 80%;',
  'height: 80%;',
  'margin-top: 5%',
  '}',

  '.blocklyDropDownPlaceholder {',
  'display: inline-block;',
  'float: left;',
  'padding: 0;',
  'margin: 4px;',
  '}',

  '.blocklyNumPadButton {',
  'display: inline-block;',
  'float: left;',
  'padding: 0;',
  'width: 48px;',
  'height: 48px;',
  'margin: 4px;',
  'border-radius: 4px;',
  'background: $colour_numPadBackground;',
  'color: $colour_numPadText;',
  'outline: none;',
  'border: 1px solid $colour_numPadBorder;',
  'cursor: pointer;',
  'font-weight: 600;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 12pt;',
  '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',

  '.blocklyNumPadButton > img {',
  'margin-top: 10%;',
  'width: 80%;',
  'height: 80%;',
  '}',

  '.blocklyNumPadButton:active {',
  'background: $colour_numPadActiveBackground;',
  '-webkit-tap-highlight-color: rgba(0,0,0,0);',
  '}',

  '.arrowTop {',
  // 'border-top: 1px solid;',
  // 'border-left: 1px solid;',
  'border-top-left-radius: 4px;',
  'border-color: inherit;',
  // 'box-shadow:0px 6px 10px 0px rgba(0, 0, 0, 0.1);',
  '}',

  '.arrowBottom {',
  // 'border-bottom: 1px solid;',
  // 'border-right: 1px solid;',
  'border-bottom-right-radius: 4px;',
  'border-color: inherit;',
  '}',

  '.valueReportBox {',
  'min-width: 50px;',
  'max-width: 300px;',
  'max-height: 200px;',
  'overflow: auto;',
  'word-wrap: break-word;',
  'text-align: center;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: .8em;',
  'margin-top: 6px;',
  'color: #4E515A;',
  '}',

  '.blocklyResizeSE {',
  'cursor: se-resize;',
  'fill: #aaa;',
  '}',

  '.blocklyResizeSW {',
  'cursor: sw-resize;',
  'fill: #aaa;',
  '}',

  '.blocklyResizeLine {',
  'stroke: #888;',
  'stroke-width: 1;',
  '}',

  '.blocklyHighlightedConnectionPath {',
  'fill: none;',
  'stroke: #F1D968;',
  'stroke-width: 3;',
  '}',

  '.blocklyPath {',
  'stroke-width: 0.6;',
  '}',

  '.blocklySelected .blocklyShadowPath {',
  // 'display: none;',
  '}',

  '.blocklySelected>.blocklyPath {',
  // 'stroke: #F1D968;',
  // 'stroke-width: 3;',
  '}',

  '.blocklySelected .blocklyDraggable>.blocklyPath {',
  // 'stroke: #F1D968;',
  // 'stroke-width: 3;',
  '}',

  '.blocklySelected.blocklyRunning .blocklyDraggable>.blocklyPath {',
  // 'stroke: #F1D968;',
  // 'stroke-width: 3;',
  '}',


  '.blocklySelected>.blocklyPathLight {',
  'display: none;',
  '}',

  '.blocklyDraggable {',
  /* backup for browsers (e.g. IE11) that don't support grab */
  'cursor: url("<<<PATH>>>/handopen.cur"), auto;',
  'cursor: grab;',
  'cursor: -webkit-grab;',
  'cursor: -moz-grab;',
  '}',

  '.blocklyDragging {',
  /* backup for browsers (e.g. IE11) that don't support grabbing */
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  'cursor: -moz-grabbing;',
  '}',
  /* Changes cursor on mouse down. Not effective in Firefox because of
    https://bugzilla.mozilla.org/show_bug.cgi?id=771241 */
  '.blocklyDraggable:active {',
  /* backup for browsers (e.g. IE11) that don't support grabbing */
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  'cursor: -moz-grabbing;',
  '}',
  /* Change the cursor on the whole drag surface in case the mouse gets
     ahead of block during a drag. This way the cursor is still a closed hand.
   */
  '.blocklyBlockDragSurface .blocklyDraggable {',
  /* backup for browsers (e.g. IE11) that don't support grabbing */
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  'cursor: -moz-grabbing;',
  '}',

  '.blocklyDragging.blocklyDraggingDelete {',
  // 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyDragging.blocklyDraggingMouseThrough {',
  'pointer-events: none;',
  '}',

  '.blocklyToolboxDelete {',
  // 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyToolboxGrab {',
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',

  '.blocklyDragging>.blocklyPath,',
  '.blocklyDragging>.blocklyPathLight {',
  'fill-opacity: 1.0;',
  'stroke-opacity: 1.0;',
  '}',

  '.blocklyDragging>.blocklyPath {',
  '}',

  '.blocklyDisabled>.blocklyPath {',
  'fill-opacity: .5;',
  'stroke-opacity: .5;',
  '}',

  '.blocklyInsertionMarker>.blocklyPath {',
  'stroke: none;',
  '}',
  '.blocklyInsertionMarker>.blocklyShadowPath {',
  'stroke: none;',
  'fill: transparent;',
  '}',

  '.blocklyText {',
  'fill: #fff;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 12pt;',
  'font-weight: 500;',
  '}',

  '.blocklyTextTruncated {',
  'font-size: 11pt;',
  '}',

  '.blocklyNonEditableText>text {',
  'pointer-events: none;',
  '}',
  '.blocklyNonEditableText>text,',
  '.blocklyEditableText>text {',
  'fill: $colour_text;',
  '}',

  '.blocklyEditableText>.blocklyEditableLabel {',
  'fill: #fff;',
  '}',

  '.blocklyDropdownText {',
  'fill: #fff !important;',
  '}',

  '.blocklyBubbleText {',
  'fill: $colour_text;',
  '}',
  '.blocklyFlyout {',
  'position: absolute;',
  'z-index: -20;',
  '}',
  '.blocklyFlyoutOverflow {',
  'overflow: hidden;',
  '}',
  '.blocklyFlyoutOverflow:hover {',
  'overflow: visible;',
  '}',
  '.blocklyFlyoutButton {',
  'fill: none;',
  'pointer-events: all;',
  '}',

  '.blocklyFlyoutButtonBackground {',
  'stroke: #81CBFC;',
  '}',

  '.blocklyFlyoutButton .blocklyText {',
  'fill: $colour_text;',
  '}',

  '.blocklyFlyoutButtonShadow {',
  'fill: #D4ECFC;',
  // 'fill: transparent;',
  '}',

  '.blocklyFlyoutButton:hover {',
  'fill: #D4ECFC;',
  'cursor: pointer;',
  '}',

  '.blocklyFlyoutLabel {',
  'cursor: default;',
  '}',

  '.blocklyFlyoutLabelBackground {',
  'opacity: 0;',
  '}',

  '.blocklyFlyoutLabelText {',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 14pt;',
  'fill: #575E75;',
  'font-weight: bold;',
  '}',

  /*
    Don't allow users to select text.  It gets annoying when trying to
    drag a block and selected text moves instead.
  */
  '.blocklySvg text, .blocklyBlockDragSurface text, .blocklyFlyout text, .blocklyToolboxDiv text {',
  'user-select: none;',
  '-moz-user-select: none;',
  '-webkit-user-select: none;',
  'cursor: inherit;',
  '}',

  '.blocklyHidden {',
  'display: none;',
  '}',

  '.blocklyFieldDropdown:not(.blocklyHidden) {',
  'display: block;',
  '}',

  '.blocklyIconGroup {',
  'cursor: default;',
  '}',

  '.blocklyIconGroup:not(:hover),',
  '.blocklyIconGroupReadonly {',
  'opacity: .6;',
  '}',

  '.blocklyIconShape {',
  'fill: #00f;',
  'stroke: #fff;',
  'stroke-width: 1px;',
  '}',

  '.blocklyIconSymbol {',
  'fill: #fff;',
  '}',

  '.blocklyMinimalBody {',
  'margin: 0;',
  'padding: 0;',
  'overflow: hidden;',
  'min-width: auto;',
  'min-height: auto;',
  '}',

  '.blocklyCommentForeignObject {',
  'position: relative;',
  'z-index: 0;',
  '}',

  '.blocklyCommentRect {',
  'fill: #E7DE8E;',
  'stroke: #bcA903;',
  'stroke-width: 1px',
  '}',

  '.blocklyCommentTarget {',
  'fill: transparent;',
  'stroke: #bcA903;',
  '}',

  '.blocklyCommentTargetFocused {',
  'fill: none;',
  '}',

  '.blocklyCommentHandleTarget {',
  'fill: none;',
  '}',

  '.blocklyCommentHandleTargetFocused {',
  'fill: transparent;',
  '}',

  '.blocklyFocused>.blocklyCommentRect {',
  'fill: #B9B272;',
  'stroke: #B9B272;',
  '}',

  '.blocklySelected>.blocklyCommentTarget {',
  'stroke: #F1D968;',
  'stroke-width: 3;',
  '}',


  '.blocklyCommentTextarea {',
  'background-color: #fef49c;',
  'border: 0;',
  'outline: 0;',
  'margin: 0;',
  'padding: 3px;',
  'resize: none;',
  'display: block;',
  'overflow: hidden;',
  '}',

  '.blocklyCommentDeleteIcon {',
  'cursor: pointer;',
  'fill: #000;',
  'display: none',
  '}',

  '.blocklySelected > .blocklyCommentDeleteIcon {',
  'display: block',
  '}',

  '.blocklyDeleteIconShape {',
  'fill: #000;',
  'stroke: #000;',
  'stroke-width: 1px;',
  '}',

  '.blocklyDeleteIconShape.blocklyDeleteIconHighlighted {',
  'stroke: #F1D968;',
  '}',

  // Scratch Comments

  '.scratchCommentForeignObject {',
  'position: relative;',
  '}',

  '.scratchCommentBody {',
  'background-color: #fef49c;',
  '}',

  '.scratchCommentRect {',
  'fill: #fef49c;',
  '}',

  '.scratchCommentTarget {',
  'fill: transparent;',
  '}',

  '.scratchWorkspaceCommentBorder {',
  'stroke: #bcA903;',
  'stroke-width: 1px;',
  '}',

  '.scratchCommentTargetFocused {',
  'fill: none;',
  '}',

  '.scratchCommentTopBar {',
  'fill: #000000;',
  'fill-opacity: 0.1',
  '}',

  '.scratchCommentText {',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 12pt;',
  'font-weight: 400;',
  '}',

  '.scratchCommentTextarea {',
  'background-color: #fef49c;',
  'border: 0;',
  'outline: 0;',
  'padding: 0;',
  'resize: none;',
  'overflow: hidden;',
  '}',

  '.scratchCommentResizeSE {',
  'cursor: se-resize;',
  'fill: transparent;',
  '}',

  '.scratchCommentResizeSW {',
  'cursor: sw-resize;',
  'fill: transparent;',
  '}',

  '.blocklyHtmlInput {',
  'border: none;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 12pt;',
  'height: 100%;',
  'margin: 0;',
  'outline: none;',
  'box-sizing: border-box;',
  'width: 100%;',
  'text-align: center;',
  'color: $colour_text;',
  'font-weight: 500;',
  '}',

  '.blocklyMainBackground {',
  'stroke-width: 1;',
  'stroke: #c6c6c6;', /* Equates to #ddd due to border being off-pixel. */
  '}',

  '.blocklyMutatorBackground {',
  'fill: #fff;',
  'stroke: #ddd;',
  'stroke-width: 1;',
  '}',

  '.blocklyFlyoutBackground {',
  'fill: $colour_flyout;',
  'fill-opacity: .8;',
  '}',

  '.blocklyMainWorkspaceScrollbar {',
  'z-index: 20;',
  '}',

  '.blocklyFlyoutScrollbar {',
  'z-index: 30;',
  'opacity: 0.7;',
  '}',

  '.blocklyScrollbarHorizontal, .blocklyScrollbarVertical {',
  'position: absolute;',
  'outline: none;',
  '}',

  '.blocklyScrollbarBackground {',
  'opacity: 0;',
  '}',

  '.blocklyScrollbarHandle {',
  'opacity: 0.5;',
  'fill: $colour_scrollbar;',
  '}',

  '.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyScrollbarHandle:hover {',
  'fill: $colour_scrollbarHover;',
  '}',

  '.blocklyZoom>image {',
  'opacity: 1;',
  'cursor: pointer;',
  'box-shadow:0rem 0rem 1rem 0rem rgba(0,48,104,0.1);',
  '}',

  /* Darken flyout scrollbars due to being on a grey background. */
  /* By contrast, workspace scrollbars are on a white background. */
  '.blocklyFlyout .blocklyScrollbarHandle {',
  'fill: #bbb;',
  '}',

  '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyFlyout .blocklyScrollbarHandle:hover {',
  'fill: #aaa;',
  '}',

  '.blocklyInvalidInput {',
  'background: #faa;',
  '}',

  '.blocklyAngleCircle {',
  'stroke: ' + Blockly.Colours.motion.tertiary + ';',
  'stroke-width: 1;',
  'fill: ' + Blockly.Colours.motion.secondary + ';',
  '}',

  '.blocklyAngleCenterPoint {',
  'stroke: #fff;',
  'stroke-width: 1;',
  'fill: #fff;',
  '}',

  '.blocklyAngleDragHandle {',
  'stroke: #fff;',
  'stroke-width: 5;',
  'stroke-opacity: 0.25;',
  'fill: #fff;',
  'cursor: pointer;',
  '}',


  '.blocklyAngleMarks {',
  'stroke: #fff;',
  'stroke-width: 1;',
  'stroke-opacity: 0.5;',
  '}',

  '.blocklyAngleGauge {',
  'fill: #fff;',
  'fill-opacity: 0.20;',
  '}',

  '.blocklyAngleLine {',
  'stroke: #fff;',
  'stroke-width: 1;',
  'stroke-linecap: round;',
  'pointer-events: none;',
  '}',

  '.blocklyContextMenu {',
  'border-radius: 10px;',
  '}',

  '.blocklyDropdownMenu {',
  'padding: 0 !important;',
  '}',

  '.blocklyDropDownNumPad {',
  'background-color: $colour_numPadBackground;',
  '}',

  /* Override the default Closure URL. */
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon {',
  // 'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
  'background: url(<<<PATH>>>/icon_selected.png) no-repeat;',
  'background-size: 100% 100%;',
  'width: 18px;',
  'height: 12px;',
  'margin-top: 4px;',
  '}',

  /* Category tree in Toolbox. */
  '.blocklyToolboxDiv {',
  'background-color: $colour_toolbox;',
  'color: $colour_toolboxText;',
  // 'overflow-x: visible;',
  // 'overflow-y: auto;',
  'position: absolute;',
  'width: auto;',
  'height: 100%;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'z-index: 40;', /* so blocks go over toolbox when dragging */
  '-webkit-tap-highlight-color: transparent;', /* issue #1345 */
  'box-shadow: 0rem 0rem 0.5rem 0rem rgba(0, 48, 104, 0.1);',
  '}',

  '.blocklyToolboxDiv.blocklyToolboxDivSelect {',
  'box-shadow: none;',
  '}',

  '.extensionDiv {',
  'position: absolute;',
  'left: 0;',
  'right: 0;',
  'bottom: 0;',
  'height: 4.31rem;',
  'background:rgba(255,255,255,1);',
  'border-top:1px solid rgba(232,239,247,1);',
  'border-bottom:1px solid rgba(232,239,247,1);',
  'display: flex;',
  'flex-direction: column;',
  'justify-content: center;',
  'align-items: center;',
  'font-size: 0.75rem;',
  'font-weight: 400;',
  'color: rgba(81,221,212,1);',
  'cursor: pointer;',
  '}',

  '.extensionDiv img {',
  'width:2.5rem;',
  'margin-bottom: 0.25rem;',
  'margin-top: 0.3rem;',
  '}',

  '.blocklyExtensionDiv {',
  'width: 90px;',
  'height: 30px;',
  'line-height: 28px;',
  'color: #717682;',
  'text-align: center;',
  'margin: 10px auto 0;',
  'border-radius: 22px;',
  'position: relative;',
  'border: 2px solid rgba(242,247,251,1);',
  '}',

  '.blocklyExtensionDiv:hover {',
  'cursor: pointer;',
  '}',

  '.blocklyExtensionDivText {',
  'position: absolute;',
  'display: inline-block;',
  'width: 90px;',
  'left: -2px;',
  'color: #717682;',
  'white-space: nowrap;',
  'overflow: hidden;',
  'padding: 0 10px;',
  'text-overflow: ellipsis;',
  '}',

  '.blocklyTreeRoot {',
  'padding: 4px 0;',
  '}',

  '.blocklyTreeRoot:focus {',
  'outline: none;',
  '}',

  '.blocklyTreeRow {',
  'height: 22px;',
  'line-height: 22px;',
  'margin-bottom: 3px;',
  'padding-right: 8px;',
  'white-space: nowrap;',
  '}',

  '.blocklyHorizontalTree {',
  'float: left;',
  'margin: 1px 5px 8px 0;',
  '}',

  '.blocklyHorizontalTreeRtl {',
  'float: right;',
  'margin: 1px 0 8px 5px;',
  '}',

  '.blocklyToolboxDiv[dir="RTL"] .blocklyTreeRow {',
  'margin-left: 8px;',
  '}',

  '.blocklyTreeRow:not(.blocklyTreeSelected):hover {',
  'background-color: #e4e4e4;',
  '}',

  '.blocklyTreeSeparator {',
  'border-bottom: solid #e5e5e5 1px;',
  'height: 0;',
  'margin: 5px 0;',
  '}',

  '.blocklyTreeSeparatorHorizontal {',
  'border-right: solid #e5e5e5 1px;',
  'width: 0;',
  'padding: 5px 0;',
  'margin: 0 5px;',
  '}',

  '.blocklyTreeIcon {',
  'background-image: url(<<<PATH>>>/sprites.png);',
  'height: 16px;',
  'vertical-align: middle;',
  'width: 16px;',
  '}',

  '.blocklyTreeIconClosedLtr {',
  'background-position: -32px -1px;',
  '}',

  '.blocklyTreeIconClosedRtl {',
  'background-position: 0px -1px;',
  '}',

  '.blocklyTreeIconOpen {',
  'background-position: -16px -1px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedLtr {',
  'background-position: -32px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconClosedRtl {',
  'background-position: 0px -17px;',
  '}',

  '.blocklyTreeSelected>.blocklyTreeIconOpen {',
  'background-position: -16px -17px;',
  '}',

  '.blocklyTreeIconNone,',
  '.blocklyTreeSelected>.blocklyTreeIconNone {',
  'background-position: -48px -1px;',
  '}',

  '.blocklyTreeLabel {',
  'cursor: default;',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 16px;',
  'padding: 0 3px;',
  'vertical-align: middle;',
  '}',

  '.blocklyToolboxDelete .blocklyTreeLabel {',
  // 'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',

  '.blocklyTreeSelected .blocklyTreeLabel {',
  'color: #fff;',
  '}',

  '.blocklyDropDownDiv .goog-slider-horizontal {',
  'margin: 8px;',
  'height: 22px;',
  'width: 150px;',
  'position: relative;',
  'outline: none;',
  'border-radius: 11px;',
  'margin-bottom: 20px;',
  '}',

  '.blocklyDropDownDiv .goog-slider-horizontal .goog-slider-thumb {',
  'width: 26px;',
  'height: 26px;',
  'top: -1px;',
  'position: absolute;',
  'background-color: white;',
  'border-radius: 100%;',
  '-webkit-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
  '-moz-box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
  'box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.15);',
  '}',

  '.scratchEyedropper {',
  'background: none;',
  'outline: none;',
  'border: none;',
  'width: 100%;',
  'text-align: center;',
  'border-top: 1px solid #ddd;',
  'padding-top: 5px;',
  'cursor: pointer;',
  '}',

  '.scratchColourPickerLabel {',
  'font-family: "Helvetica Neue", Helvetica, sans-serif;',
  'font-size: 0.65rem;',
  'color: $colour_toolboxText;',
  'margin: 8px;',
  '}',

  '.scratchColourPickerLabelText {',
  'font-weight: bold;',
  '}',

  '.scratchColourPickerReadout {',
  'margin-left: 10px;',
  '}',

  '.scratchMatrixButtonDiv {',
  'width: 50%;',
  'text-align: center;',
  'float: left;',
  '}',

  /* Copied from: goog/css/menu.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menu {',
  'background: #fff;',
  // 'border-color: #ccc #666 #666 #ccc;',
  // 'border-style: solid;',
  // 'border-width: 1px;',
  'cursor: default;',
  'font: normal 14px "Helvetica Neue", Helvetica, sans-serif;',
  'margin: 0;',
  'outline: none;',
  // 'padding: 4px 0;',
  'position: absolute;',
  'overflow-y: auto;',
  'overflow-x: hidden;',
  'z-index: 20000;', /* Arbitrary, but some apps depend on it... */
  'box-shadow:0rem 0rem 1rem 0rem rgba(0,48,104,0.1);',
  '}',

  '.blocklyDropDownDiv .goog-menu {',
  'cursor: default;',
  'font: normal 14px "Helvetica Neue", Helvetica, sans-serif;',
  'outline: none;',
  'z-index: 20000;', /* Arbitrary, but some apps depend on it... */
  '}',

  /* Copied from: goog/css/menuitem.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuItemRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  /**
   * State: resting.
   *
   * NOTE(mleibman,chrishenry):
   * The RTL support in Closure is provided via two mechanisms -- "rtl" CSS
   * classes and BiDi flipping done by the CSS compiler.  Closure supports RTL
   * with or without the use of the CSS compiler.  In order for them not
   * to conflict with each other, the "rtl" CSS classes need to have the #noflip
   * annotation.  The non-rtl counterparts should ideally have them as well, but,
   * since .goog-menuitem existed without .goog-menuitem-rtl for so long before
   * being added, there is a risk of people having templates where they are not
   * rendering the .goog-menuitem-rtl class when in RTL and instead rely solely
   * on the BiDi flipping by the CSS compiler.  That's why we're not adding the
   * #noflip to .goog-menuitem.
   */
  '.blocklyWidgetDiv .goog-menuitem {',
  'color: #4E515A;',
  'font-weight:400;',
  'font: normal 14px "Helvetica Neue", Helvetica, sans-serif;',
  'list-style: none;',
  'margin: 0;',
  /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
  'padding: 10px 7em 10px 20px;',
  'white-space: nowrap;',
  '}',

  '.blocklyDropDownDiv .goog-menuitem {',
  // 'color: #fff;',
  'color: #4E515A;',
  'font: normal 14px "Helvetica Neue", Helvetica, sans-serif;',
  // 'font-weight: bold;',
  'list-style: none;',
  'margin: 0;',
  'height: 24px;',
  /* 28px on the left for icon or checkbox; 7em on the right for shortcut. */
  'padding: 8px 7em 28px 32px;',
  'white-space: nowrap;',
  'overflow: hidden;',
  '}',

  /* BiDi override for the resting state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem.goog-menuitem-rtl, ',
  '.blocklyDropDownDiv .goog-menuitem.goog-menuitem-rtl {',
  /* Flip left/right padding for BiDi. */
  'padding-left: 7em;',
  'padding-right: 28px;',
  '}',

  /* If a menu doesn't have checkable items or items with icons, remove padding. */
  '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem, ',
  '.blocklyDropDownDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyDropDownDiv .goog-menu-noicon .goog-menuitem { ',
  'padding-left: 12px;',
  '}',

  /*
   * If a menu doesn't have items with shortcuts, leave just enough room for
   * submenu arrows, if they are rendered.
   */
  '.blocklyWidgetDiv .goog-menu-noaccel .goog-menuitem, ',
  '.blocklyDropDownDiv .goog-menu-noaccel .goog-menuitem {',
  'padding-right: 20px;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-content ',
  '.blocklyDropDownDiv .goog-menuitem-content {',
  'color: #000;',
  'font: normal 14px "Helvetica Neue", Helvetica, sans-serif;',
  '}',

  /* State: disabled. */
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-accel,',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content, ',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-accel,',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-content {',
  'color: #B1BECA !important;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon, ',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-icon {',
  'opacity: 0.3;',
  '-moz-opacity: 0.3;',
  'filter: alpha(opacity=30);',
  '}',

  /* State: hover. */
  '.blocklyWidgetDiv .goog-menuitem-highlight,',
  '.blocklyWidgetDiv .goog-menuitem-hover {',
  'background-color: #CFEAFE;',
  /* Use an explicit top and bottom border so that the selection is visible',
   * in high contrast mode. */
  // 'border-color: #d6e9f8;',
  // 'border-style: dotted;',
  // 'border-width: 1px 0;',
  // 'padding-bottom: 3px;',
  // 'padding-top: 3px;',
  'color: #1798FF;',
  'cursor: pointer;',
  '}',

  '.blocklyDropDownDiv .goog-menuitem-highlight,',
  '.blocklyDropDownDiv .goog-menuitem-hover {',
  'background-color: #CFEAFE;',
  'color: #1798FF;',
  'cursor: pointer;',
  '}',

  /* State: selected/checked. */
  '.blocklyWidgetDiv .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-icon, ',
  '.blocklyDropDownDiv .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-menuitem-icon {',
  'background-repeat: no-repeat;',
  'height: 16px;',
  'left: 6px;',
  'position: absolute;',
  'right: auto;',
  'vertical-align: middle;',
  'width: 16px;',
  '}',

  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {',
  /* Client apps may override the URL at which they serve the sprite. */
  // 'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px !important;',
  'background: url(<<<PATH>>>/icon_selected.png) no-repeat;',
  'background-size: 100% 100%;',
  'position: static;', /* Scroll with the menu. */
  'float: left;',
  'margin-left: -24px;',
  'width: 18px;',
  'height: 12px;',
  'margin-top: 3px;',
  '}',

  /* BiDi override for the selected/checked state. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
  /* Flip left/right positioning. */
  'float: right;',
  'margin-right: -24px;',
  '}',

  /* Keyboard shortcut ("accelerator") style. */
  '.blocklyWidgetDiv .goog-menuitem-accel, ',
  '.blocklyDropDownDiv .goog-menuitem-accel {',
  'color: #999;',
  /* Keyboard shortcuts are untranslated; always left-to-right. */
  /* #noflip */
  'direction: ltr;',
  'left: auto;',
  'padding: 0 6px;',
  'position: absolute;',
  'right: 0;',
  'text-align: right;',
  '}',

  /* BiDi override for shortcut style. */
  /* #noflip */
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-accel, ',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-accel {',
  /* Flip left/right positioning and text alignment. */
  'left: 0;',
  'right: auto;',
  'text-align: left;',
  '}',

  /* Mnemonic styles. */
  '.blocklyWidgetDiv .goog-menuitem-mnemonic-hint, ',
  '.blocklyDropDownDiv .goog-menuitem-mnemonic-hint {',
  'text-decoration: underline;',
  '}',

  '.blocklyWidgetDiv .goog-menuitem-mnemonic-separator, ',
  '.blocklyDropDownDiv .goog-menuitem-mnemonic-separator {',
  'color: #999;',
  'font-size: 12px;',
  'padding-left: 4px;',
  '}',

  /* Copied from: goog/css/menuseparator.css */
  /*
   * Copyright 2009 The Closure Library Authors. All Rights Reserved.
   *
   * Use of this source code is governed by the Apache License, Version 2.0.
   * See the COPYING file for details.
   */

  /**
   * Standard styling for menus created by goog.ui.MenuSeparatorRenderer.
   *
   * @author attila@google.com (Attila Bodis)
   */

  '.blocklyWidgetDiv .goog-menuseparator, ',
  '.blocklyDropDownDiv .goog-menuseparator {',
  'border-top: 1px solid #ccc;',
  'margin: 4px 0;',
  'padding: 0;',
  '}',

  '.blocklyFlyoutCheckbox {',
  'fill: white;',
  'stroke: #c8c8c8;',
  '}',

  '.blocklyFlyoutCheckbox.checked {',
  'fill: ' + Blockly.Colours.motion.primary + ';',
  'stroke: ' + Blockly.Colours.motion.tertiary + ';',
  '}',

  '.blocklyFlyoutCheckboxPath {',
  'stroke: white;',
  'stroke-width: 3;',
  'stroke-linecap: round;',
  'stroke-linejoin: round;',
  '}',

  '.scratchCategoryMenu {',
  'width: 110px;',

  'height: calc(100% - 4.31rem)!important;',
  'overflow-x: visible;',
  'overflow-y: auto;',

  'background: $colour_toolbox;',
  'color: $colour_toolboxText;',
  'font-size: .7rem;',
  'user-select: none;',
  '-webkit-user-select: none;',
  '-moz-user-select: none;',
  '-ms-user-select: none;',
  '}',

  '.scratchCategoryMenuSp {',
  'width: 110px;',

  'height: calc(100%) !important;',
  'overflow-x: visible;',
  'overflow-y: auto;',

  'background: $colour_toolbox;',
  'color: $colour_toolboxText;',
  'font-size: .7rem;',
  'user-select: none;',
  '-webkit-user-select: none;',
  '-moz-user-select: none;',
  '-ms-user-select: none;',
  '}',

  '.trashContainer {',
  'width: 100%;',
  'height: 100%;',
  'position: absolute;',
  'background: rgba(0, 0, 0, 0.5);',
  'box-shadow:6px 0px 10px 0px rgba(0,48,104,0.1);',
  'justify-content: center;',
  'align-items: center;',
  'display: none;',
  'z-index: 1',
  '}',

  '.trashContainerShow {',
  'display: flex;',
  '}',

  '.trashCoverIcon {',
  'background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjQgNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjEuNyw3SDIuM0MxLjYsNywxLDYuNSwxLDUuOGwwLDBjMC0wLjcsMC42LTEuMiwxLjItMS4yaDE5LjVjMC43LDAsMS4yLDAuNiwxLjIsMS4ybDAsMEMyMyw2LjUsMjIuNCw3LDIxLjcsNwoJeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUsMEg5QzguMiwwLDcuNSwwLjcsNy41LDEuNXYzLjRoOVYxLjVDMTYuNSwwLjcsMTUuOCwwLDE1LDB6IE0xNS4xLDMuOEMxNS4xLDMuOSwxNSw0LDE0LjksNEg5LjMKCUM5LjIsNCw5LjEsMy45LDkuMSwzLjhWMmMwLTAuMywwLjQtMC42LDAuOC0wLjZoNC42YzAuMywwLDAuNiwwLjIsMC42LDAuNVYzLjh6Ii8+Cjwvc3ZnPgo=) no-repeat 0 0;',
  'background-size: 100% 100%;',
  'width: 38px;',
  'height: 11px;',
  'transition: all .1s;',
  'transform-origin: bottom left;',
  'margin: -2px auto;',
  '}',

  '.trashCoverOpen {',
  'transform: rotate(-43deg);',
  '}',

  '.trashcanBodyIcon {',
  'background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjQgMjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0IDI2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wLjEsMC40djIyYzAsMiwxLjcsMy42LDMuNiwzLjZoMTYuNmMyLDAsMy42LTEuNiwzLjYtMy41VjAuNEgwLjF6IE0xMC4xLDE4LjFjMC4xLDAuOS0wLjgsMS44LTEuOCwxLjgKCVM2LjUsMTksNi41LDE4LjFWOC40YzAtMSwwLjktMS44LDEuOC0xLjhjMSwwLDEuOCwwLjksMS44LDEuOFYxOC4xeiBNMTcuNSwxOC4xYzAsMC45LTAuOSwxLjgtMS44LDEuOGMtMSwwLTEuOC0wLjktMS44LTEuOFY4LjQKCWMwLTEsMC45LTEuOCwxLjgtMS44YzEsMCwxLjgsMC45LDEuOCwxLjhWMTguMXoiLz4KPC9zdmc+Cg==) no-repeat 0 0px;',
  'background-size: 100% 100%;',
  'width: 25px;',
  'height: 29px;',
  'margin: 0px auto;',
  '}',

  '.scratchCategoryMenuHorizontal {',
  'width: 100%;',
  'height: 50px;',
  'background: $colour_toolbox;',
  'color: $colour_toolboxText;',
  'font-size: .7em;',
  'user-select: none;',
  '-webkit-user-select: none;',
  '-moz-user-select: none;',
  '-ms-user-select: none;',
  '}',

  '.scratchCategoryMenuHorizontal .scratchCategoryMenuRow {',
  'float: left;',
  'margin: 3px;',
  '}',

  '.scratchCategoryMenuRow {',
  '}',

  '.scratchCategoryMenuRowSearchContainer {',
  'width: 100%;',
  'height: 2.36rem;',
  'position: relative;',
  'border-bottom: 1px solid rgba(232, 239, 247, 1);',
  '}',

  '.scratchCategoryMenuRowSearchIcon {',
  'position: absolute;',
  'top: 10px;',
  'right: 5px;',
  'width: 16px;',
  'height: 16px;',
  'cursor: pointer;',
  '}',

  '.scratchCategoryMenuRowInput {',
  'width: 85px;',
  'height: 100%;',
  'border: none;',
  'color: #717582;',
  'outline: none;',
  'padding-left: 6px;',
  '}',
  '.searchLable {',
  'text-align: center !important;',
  'width: 110px !important;',
  'font-size: 0.864rem !important;',
  'font-weight: 400 !important;',
  'max-width: 110px !important;',
  '}',

  '.scratchCategoryMenuItem.categorySelected>.searchLable {',
  'color: #4B9FF0;',
  '}',

  '.noResultDiv {',
  'width: 300px;',
  'height: 300px;',
  'position: absolute;',
  'top: 0;',
  'left: 110px;',
  'z-index: 100;',
  'padding: 15px;',
  'display: none;',
  '}',

  '.noResultTitle {',
  'font-size: 14px;',
  'font-weight: 500;',
  'color: #717582;',
  'margin: 10px 0 15px;',
  '}',

  '.noResultText {',
  'font-size: 14px;',
  'font-weight: 400;',
  'color: #717582;',
  'margin-top: 10px;',
  '}',

  '.toggleDevice {',
  'display: inline-flex;',
  'height: 30px;',
  'line-height: 30px;',
  'padding: 0 15px;',
  'text-align: center;',
  'background: rgba(255,255,255,1);',
  'box-shadow: 0px 4px 16px 0px rgba(178,224,255,0.5);',
  'border-radius: 15px;',
  'font-size: 12px;',
  'font-weight: 500;',
  'color: #4B9FF0;',
  'justify-content: center;',
  'align-items: center;',
  'margin-top: 30px;',
  'cursor: pointer;',
  '}',

  '.toggleIcon {',
  'width: 20px;',
  'height: 20px;',
  'margin-right: 5px;',
  '}',

  '.scratchCategoryMenuRow:first-child .scratchCategoryMenuItem {',
  'border-top: none !important;',
  '}',

  '.scratchCategoryMenuItem {',
  'padding: 0.375rem 0px;',
  'cursor: pointer;',
  'text-align: center;',
  'height: 2.9rem;',
  'line-height: 2rem;',
  'border: 1px solid transparent;',
  'border-left: none;',
  'display: flex;',
  '}',

  '.scratchCategoryMenuHorizontal .scratchCategoryMenuItem {',
  'padding: 6px 5px;',
  '}',

  '.scratchCategoryMenuItem.categorySelected {',
  'background: $colour_toolboxSelected;',
  'border: 1px solid rgb(178, 224, 255);',
  'border-left: none;',
  'border-right: none;',
  // 'margin-right: -2px;',
  '}',

  '.scratchCategoryItemBubble {',
  'width: 14px;',
  'height: 14px;',
  // 'border-radius: 100%;',
  'border-radius: 5px;',
  'margin: 0 auto 0.125rem;',
  'float: left;',
  'margin: 8px;',
  // 'margin: 0.45rem 10px 0;',
  '}',

  '.scratchCategoryMenuItemLabel {',
  'float: left;',
  'width: 75px;',
  'text-align: left;',
  'text-overflow: ellipsis;',
  'white-space: nowrap;',
  'overflow: hidden;',
  '}',

  '.scratchCategoryItemIcon {',
  'width: 14px;',
  'height: 14px;',
  'background-size: 100%;',
  'float: left;',
  'margin: 8px',
  '}',

  '.scratchCategoryMenuItem:hover {',
  'color: $colour_toolboxHover !important;',
  '}',
  '#search .scratchCategoryMenuItem:hover {',
  'color: unset !important;',
  '}',
  ''
];
