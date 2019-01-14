/**
 * @license
 * Visual Blocks Language
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

/**
 * @fileoverview Generating Yaml for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Yaml.procedures');

goog.require('Blockly.Yaml');


Blockly.Yaml['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Yaml.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Yaml.statementToCode(block, 'STACK');
  if (Blockly.Yaml.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.Yaml.prefixLines(
        Blockly.Yaml.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + id + '\''), Blockly.Yaml.INDENT) + branch;
  }
  if (Blockly.Yaml.INFINITE_LOOP_TRAP) {
    branch = Blockly.Yaml.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Yaml.valueToCode(block, 'RETURN',
      Blockly.Yaml.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = Blockly.Yaml.INDENT + 'return ' + returnValue + ';\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Yaml.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Yaml.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Yaml.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Yaml['procedures_defnoreturn'] =
    Blockly.Yaml['procedures_defreturn'];

Blockly.Yaml['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Yaml.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Yaml.valueToCode(block, 'ARG' + i,
        Blockly.Yaml.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Yaml.ORDER_FUNCTION_CALL];
};

Blockly.Yaml['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Yaml.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Yaml.valueToCode(block, 'ARG' + i,
        Blockly.Yaml.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.Yaml['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Yaml.valueToCode(block, 'CONDITION',
      Blockly.Yaml.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Yaml.valueToCode(block, 'VALUE',
        Blockly.Yaml.ORDER_NONE) || 'null';
    code += Blockly.Yaml.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.Yaml.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};
