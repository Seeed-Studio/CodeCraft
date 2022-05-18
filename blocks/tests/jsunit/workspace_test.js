/**
 * @license
 * Blockly Tests
 *
 * Copyright 2012 Google Inc.
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
'use strict';

goog.require('goog.testing');
goog.require('goog.testing.MockControl');

var workspace;
var mockControl_;

function workspaceTest_setUp() {
  defineGetVarBlock();
  workspace = new Blockly.Workspace();
  mockControl_ = new goog.testing.MockControl();
}

function workspaceTest_tearDown() {
  undefineGetVarBlock();
  mockControl_.$tearDown();
  workspace.dispose();
}

function test_emptyWorkspace() {
  workspaceTest_setUp();
  try {
    assertEquals('Empty workspace (1).', 0, workspace.getTopBlocks(true).length);
    assertEquals('Empty workspace (2).', 0, workspace.getTopBlocks(false).length);
    assertEquals('Empty workspace (3).', 0, workspace.getAllBlocks().length);
    workspace.clear();
    assertEquals('Empty workspace (4).', 0, workspace.getTopBlocks(true).length);
    assertEquals('Empty workspace (5).', 0, workspace.getTopBlocks(false).length);
    assertEquals('Empty workspace (6).', 0, workspace.getAllBlocks().length);
  }
  finally {
    workspaceTest_tearDown();
  }
}

function test_flatWorkspace() {
  workspaceTest_setUp();
  try {
    var blockA = workspace.newBlock('');
    assertEquals('One block workspace (1).', 1, workspace.getTopBlocks(true).length);
    assertEquals('One block workspace (2).', 1, workspace.getTopBlocks(false).length);
    assertEquals('One block workspace (3).', 1, workspace.getAllBlocks().length);
    var blockB = workspace.newBlock('');
    assertEquals('Two block workspace (1).', 2, workspace.getTopBlocks(true).length);
    assertEquals('Two block workspace (2).', 2, workspace.getTopBlocks(false).length);
    assertEquals('Two block workspace (3).', 2, workspace.getAllBlocks().length);
    blockA.dispose();
    assertEquals('One block workspace (4).', 1, workspace.getTopBlocks(true).length);
    assertEquals('One block workspace (5).', 1, workspace.getTopBlocks(false).length);
    assertEquals('One block workspace (6).', 1, workspace.getAllBlocks().length);
    workspace.clear();
    assertEquals('Cleared workspace (1).', 0, workspace.getTopBlocks(true).length);
    assertEquals('Cleared workspace (2).', 0, workspace.getTopBlocks(false).length);
    assertEquals('Cleared workspace (3).', 0, workspace.getAllBlocks().length);
  } finally {
    workspaceTest_tearDown();
  }
}

function test_getWorkspaceById() {
  var workspaceA = new Blockly.Workspace();
  var workspaceB = new Blockly.Workspace();
  try {
    assertEquals('Find workspaceA.', workspaceA,
        Blockly.Workspace.getById(workspaceA.id));
    assertEquals('Find workspaceB.', workspaceB,
        Blockly.Workspace.getById(workspaceB.id));
    assertEquals('No workspace found.', null,
        Blockly.Workspace.getById('I do not exist.'));
    workspaceA.dispose();
    assertEquals('Can\'t find workspaceA.', null,
        Blockly.Workspace.getById(workspaceA.id));
    assertEquals('WorkspaceB exists.', workspaceB,
        Blockly.Workspace.getById(workspaceB.id));
  } finally {
    workspaceB.dispose();
    workspaceA.dispose();
  }
}

function test_getBlockById() {
  workspaceTest_setUp();
  try {
    var blockA = workspace.newBlock('');
    var blockB = workspace.newBlock('');
    assertEquals('Find blockA.', blockA, workspace.getBlockById(blockA.id));
    assertEquals('Find blockB.', blockB, workspace.getBlockById(blockB.id));
    assertEquals('No block found.', null,
        workspace.getBlockById('I do not exist.'));
    blockA.dispose();
    assertEquals('Can\'t find blockA.', null, workspace.getBlockById(blockA.id));
    assertEquals('BlockB exists.', blockB, workspace.getBlockById(blockB.id));
    workspace.clear();
    assertEquals('Can\'t find blockB.', null, workspace.getBlockById(blockB.id));
  } finally {
    workspaceTest_tearDown();
  }
}

function test_deleteVariable_InternalTrivial() {
  workspaceTest_setUp();
  var var_1 = workspace.createVariable('name1', 'type1', 'id1');
  workspace.createVariable('name2', 'type2', 'id2');
  createMockBlock('id1');
  createMockBlock('id1');
  createMockBlock('id2');

  var uses = workspace.getVariableUsesById(var_1.getId());
  workspace.deleteVariableInternal_(var_1, uses);

  var variable = workspace.getVariableById('id1');
  var block_var_name = workspace.topBlocks_[0].getVarModels()[0].name;
  assertNull(variable);
  checkVariableValues(workspace, 'name2', 'type2', 'id2');
  assertEquals('name2', block_var_name);
  workspaceTest_tearDown();
}

// TODO(marisaleung): Test the alert for deleting a variable that is a procedure.

function test_addTopBlock_TrivialFlyoutIsTrue() {
  workspaceTest_setUp();
  var targetWorkspace = new Blockly.Workspace();
  workspace.isFlyout = true;
  workspace.targetWorkspace = targetWorkspace;
  targetWorkspace.createVariable('name1', '', '1');

  // Flyout.init usually does this binding.
  workspace.variableMap_ = targetWorkspace.getVariableMap();

  try {
    var block = createMockBlock('1');
    workspace.removeTopBlock(block);
    workspace.addTopBlock(block);
    checkVariableValues(workspace, 'name1', '', '1');
  } finally {
    workspaceTest_tearDown();
    // Have to dispose of the main workspace after the flyout workspace, because
    // it holds the variable map.
    // Normally the main workspace disposes of the flyout workspace.
    targetWorkspace.dispose();
  }
}

function test_clear_Trivial() {
  workspaceTest_setUp();
  workspace.createVariable('name1', 'type1', 'id1');
  workspace.createVariable('name2', 'type2', 'id2');
  setUpMockMethod(mockControl_, Blockly.Events, 'setGroup', [true, false],
    null);

  try {
    workspace.clear();
    var topBlocks_length = workspace.topBlocks_.length;
    var varMapLength = Object.keys(workspace.variableMap_.variableMap_).length;
    assertEquals(0, topBlocks_length);
    assertEquals(0, varMapLength);
  }
  finally {
    workspaceTest_tearDown();
  }
}

function test_clear_NoVariables() {
  workspaceTest_setUp();
  setUpMockMethod(mockControl_, Blockly.Events, 'setGroup', [true, false],
    null);

  try {
    workspace.clear();
    var topBlocks_length = workspace.topBlocks_.length;
    var varMapLength = Object.keys(workspace.variableMap_.variableMap_).length;
    assertEquals(0, topBlocks_length);
    assertEquals(0, varMapLength);
  }
  finally {
    workspaceTest_tearDown();
  }
}

function test_renameVariable_NoReference() {
  // Test renaming a variable in the simplest case: when no blocks refer to it.
  workspaceTest_setUp();
  var id = 'id1';
  var type = 'type1';
  var oldName = 'name1';
  var newName = 'name2';
  workspace.createVariable(oldName, type, id);

  try {
    workspace.renameVariableById(id, newName);
    checkVariableValues(workspace, newName, type, id);
    // Renaming should not have created a new variable.
    assertEquals(1, workspace.getAllVariables().length);
  } finally {
    workspaceTest_tearDown();
  }
}

function test_renameVariable_ReferenceExists() {
  // Test renaming a variable when a reference to it exists.
  // Expect 'renameVariable' to change oldName variable name to newName.
  workspaceTest_setUp();
  var newName = 'name2';

  createVariableAndBlock(workspace);

  workspace.renameVariableById('id1', newName);
  checkVariableValues(workspace, newName, 'type1', 'id1');
  // Renaming should not have created a new variable.
  assertEquals(1, workspace.getAllVariables().length);
  var block_var_name = workspace.topBlocks_[0].getVarModels()[0].name;
  assertEquals(newName, block_var_name);
  workspaceTest_tearDown();
}

function test_renameVariable_TwoVariablesSameType() {
  // Cannot rename variable to a name that already exists
  // for a variable of the same type.
  // Note: this behavior is different from that of blockly which allows
  // renaming variables to a name that already exists if the variables have the
  // same type.
  workspaceTest_setUp();
  var id1 = 'id1';
  var id2 = 'id2';
  var type = 'type1';

  var oldName = 'name1';
  var newName = 'name2';
  // Create two variables of the same type.
  workspace.createVariable(oldName, type, id1);
  workspace.createVariable(newName, type, id2);
  // Create blocks to refer to both of them.
  createMockBlock(id1);
  createMockBlock(id2);

  workspace.renameVariableById(id1, newName);

  // Both variables should retain the same names/ids as before.
  checkVariableValues(workspace, oldName, type, id1);
  checkVariableValues(workspace, newName, type, id2);

  // Both variables should remain on the workspace.
  assertEquals(2, workspace.getAllVariables().length);

  // References should have the correct names.
  var block_var_name_1 = workspace.topBlocks_[0].getVarModels()[0].name;
  var block_var_name_2 = workspace.topBlocks_[1].getVarModels()[0].name;
  assertEquals(oldName, block_var_name_1);
  assertEquals(newName, block_var_name_2);

  workspaceTest_tearDown();
}

function test_renameVariable_TwoVariablesDifferentType() {
  // Expect the rename to succeed, because variables with different types are
  // allowed to have the same name.
  workspaceTest_setUp();
  createTwoVariablesAndBlocks(workspace);

  var newName = 'name2';
  workspace.renameVariableById('id1', newName);

  checkVariableValues(workspace, newName, 'type1', 'id1');
  checkVariableValues(workspace, newName, 'type2', 'id2');

  // References shoul have the correct names.
  var block_var_name_1 = workspace.topBlocks_[0].getVarModels()[0].name;
  var block_var_name_2 = workspace.topBlocks_[1].getVarModels()[0].name;
  assertEquals(newName, block_var_name_1);
  assertEquals(newName, block_var_name_2);

  workspaceTest_tearDown();
}

function test_renameVariable_OldCase() {
  // Rename a variable with a single reference.  Update only the capitalization.
  workspaceTest_setUp();
  var newName = 'Name1';

  createVariableAndBlock(workspace);

  workspace.renameVariableById('id1', newName);
  checkVariableValues(workspace, newName, 'type1', 'id1');
  var variable = workspace.getVariableById('id1');
  assertNotEquals('name1', variable.name);
  workspaceTest_tearDown();
}

function test_renameVariable_TwoVariablesAndOldCase() {
  // Test renaming a variable to an in-use name, but with different
  // capitalization. Two variables with different capitalizations should
  // co-exist.
  // Note: this behavior is different from that of blockly which does not allow
  // two variables of the same name to exist with different capitalization. In
  // blockly, variable names are case insensitive, so different capitalizations
  // of a variable name are treated as the same name.

  workspaceTest_setUp();
  var oldName = 'name1';
  var oldCase = 'Name2';
  var newName = 'name2';

  var id1 = 'id1';
  var id2 = 'id2';

  var type = 'type1';

  workspace.createVariable(oldName, type, id1);
  workspace.createVariable(oldCase, type, id2);
  createMockBlock(id1);
  createMockBlock(id2);

  // Blocks should have the correct variable names
  var old_block_var_name_1 = workspace.topBlocks_[0].getVarModels()[0].name;
  var old_block_var_name_2 = workspace.topBlocks_[1].getVarModels()[0].name;
  assertEquals(oldName, old_block_var_name_1);
  assertEquals(oldCase, old_block_var_name_2);

  workspace.renameVariableById(id1, newName);

  // The old variable gets properly renamed to the new name,
  // since variables are case sensitive.
  checkVariableValues(workspace, newName, type, id1);

  // Both variables should still exist
  assertEquals(2, workspace.getAllVariables().length);

  // Block which had oldName should have been updated to use newName, while
  // block with oldCase should still have the same name.
  var block_var_name_1 = workspace.topBlocks_[0].getVarModels()[0].name;
  var block_var_name_2 = workspace.topBlocks_[1].getVarModels()[0].name;
  assertEquals(newName, block_var_name_1);
  assertNotEquals(old_block_var_name_1, block_var_name_1);
  assertEquals(oldCase, block_var_name_2);
  assertEquals(old_block_var_name_2, block_var_name_2);
  workspaceTest_tearDown();
}

function test_deleteVariableById_Trivial() {
  workspaceTest_setUp();
  createTwoVariablesAndBlocks(workspace);

  workspace.deleteVariableById('id1');
  checkVariableValues(workspace, 'name2', 'type2', 'id2');
  var variable = workspace.getVariableById('id1');
  var block_var_name = workspace.topBlocks_[0].getVarModels()[0].name;
  assertNull(variable);
  assertEquals('name2', block_var_name);
  workspaceTest_tearDown();
}
