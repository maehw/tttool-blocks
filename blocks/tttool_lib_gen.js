var speak_map = {};
var scriptcode_map = {};

Blockly.Yaml['tttool_script'] = function(block) {
  var script_name = block.getFieldValue('script_name');
  var script_code = block.getFieldValue('script_code');
  var statements_name = Blockly.Yaml.statementToCode(block, 'NAME');
  var code = '';
  
  if( script_code != 0 ) // given an explicit script code
  {
    if( script_name === "" ) // not an explicit script name
    {
      code = '\n ' + script_code + ':' + statements_name;
    }
    else // both given explicitely
    {
      scriptcode_map[script_code] = script_name; // append to global map
    }
  }
  
  if( script_name )
  {
    code = '\n ' + script_name + ':' + statements_name;
  }
  
  return code;
};

Blockly.Yaml['tttool_product_header'] = function(block) {
  var number_product_id = block.getFieldValue('product_id');
  var text_comment = block.getFieldValue('comment');
  var text_welcome = block.getFieldValue('welcome');
  var text_mediapath = block.getFieldValue('mediapath');
  var dropdown_gme_lang = block.getFieldValue('gme_lang');
  var dropdown_speak_lang = block.getFieldValue('speak_lang');
  var statements_init = Blockly.Yaml.statementToCode(block, 'init');
  var statements_script_container = Blockly.Yaml.statementToCode(block, 'script_container');

  // TODO: Assemble Yaml into code variable.
  
  var speak_section = '';
  for (var key in speak_map) {
    if (speak_map.hasOwnProperty(key)) {
      speak_section = speak_section + '\n   ' + key + ': "' + speak_map[key] + '"';
    }
  }

  var scriptcodes_section = '';
  for (var key in scriptcode_map) {
    if (scriptcode_map.hasOwnProperty(key)) {
      scriptcodes_section = scriptcodes_section + '\n   ' + scriptcode_map[key] + ': ' + key;
    }
  }

  var code = 'product-id: ' + number_product_id + '\n' + 
        'comment: ' + text_comment + '\n' + 
        'welcome: ' + text_welcome + '\n' + 
        'media-path: ' + text_mediapath + '\n' + 
        'gme-lang: ' + dropdown_gme_lang + '\n';

  if( statements_init )
  {
    code += 'init:' + statements_init + '\n';
  }

  code += 'scripts: ' + statements_script_container + '\n';
  
  if( speak_section )
  {
    code += 'language: ' + dropdown_speak_lang + '\n'
    code += 'speak:' + speak_section + '\n';
  }
  
  if( scriptcodes_section )
  {
    code += 'scriptcodes:' + scriptcodes_section;
  }
  
  return code;
};

Blockly.Yaml['tttool_speak'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var spk_name = text_name.toLowerCase().replace(/[^0-9a-zA-Z_]/g, "_");

  // TODO: check collissions, choose better names
  speak_map[spk_name] = text_name; // append to global map
  
  // TODO: Assemble Yaml into code variable.
  var code = ' P(' + spk_name + ') ';
  return code;
};

Blockly.Yaml['tttool_jump'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble Yaml into code variable.
  var code = ' J(' + text_name + ') ';
  return code;
};

Blockly.Yaml['tttool_play'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  // TODO: Assemble Yaml into code variable.
  var code = ' P(' + text_name + ') ';
  return code;
};
