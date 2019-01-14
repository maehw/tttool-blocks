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
 * @fileoverview Generating Yaml for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Yaml.variables');

goog.require('Blockly.Yaml');


Blockly.Yaml['variables_get'] = function(block) {
  // Variable getter.
  var code = '$'+Blockly.Yaml.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Yaml.ORDER_ATOMIC];
};

Blockly.Yaml['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Yaml.valueToCode(block, 'VALUE',
      Blockly.Yaml.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Yaml.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return '$' + varName + ':=' + argument0;
};
