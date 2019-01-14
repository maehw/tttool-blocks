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
 * @fileoverview Generating Yaml for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Yaml.logic');

goog.require('Blockly.Yaml');


Blockly.Yaml['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Yaml.valueToCode(block, 'IF' + n,
      Blockly.Yaml.ORDER_NONE) || 'false';
    branchCode = Blockly.Yaml.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        '\n- ' + conditionCode + '? ' + branchCode + '';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Yaml.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.Yaml['controls_ifelse'] = Blockly.Yaml['controls_if'];

Blockly.Yaml['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Yaml.ORDER_EQUALITY : Blockly.Yaml.ORDER_RELATIONAL;
  var argument0 = Blockly.Yaml.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Yaml.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Yaml['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Yaml.ORDER_LOGICAL_AND :
      Blockly.Yaml.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Yaml.valueToCode(block, 'A', order);
  var argument1 = Blockly.Yaml.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Yaml['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Yaml.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Yaml.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.Yaml['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Yaml.ORDER_ATOMIC];
};

Blockly.Yaml['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.Yaml.ORDER_ATOMIC];
};

Blockly.Yaml['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.Yaml.valueToCode(block, 'IF',
      Blockly.Yaml.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.Yaml.valueToCode(block, 'THEN',
      Blockly.Yaml.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.Yaml.valueToCode(block, 'ELSE',
      Blockly.Yaml.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.Yaml.ORDER_CONDITIONAL];
};
