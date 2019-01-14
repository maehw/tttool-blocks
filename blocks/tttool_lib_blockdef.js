Blockly.Blocks['tttool_script'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("name")
        .appendField(new Blockly.FieldTextInput("scriptname"), "script_name");
    this.appendDummyInput()
        .appendField("code")
        .appendField(new Blockly.FieldTextInput("0"), "script_code");
    this.setInputsInline(true);
    this.appendStatementInput("NAME")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tttool_product_header'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("product-id")
        .appendField(new Blockly.FieldNumber(42, 0, 999), "product_id");
    this.appendDummyInput()
        .appendField("comment")
        .appendField(new Blockly.FieldTextInput("This is my tttool product"), "comment");
    this.appendDummyInput()
        .appendField("welcome")
        .appendField(new Blockly.FieldTextInput("welcome_file"), "welcome");
    this.appendDummyInput()
        .appendField("media-path")
        .appendField(new Blockly.FieldTextInput("Audio/%s"), "mediapath");
    this.appendDummyInput()
        .appendField("GME language")
        .appendField(new Blockly.FieldDropdown([["German","GERMAN"], ["English","ENGLISH"], ["French","FRENCH"]]), "gme_lang");
    this.appendDummyInput()
        .appendField("speak language")
        .appendField(new Blockly.FieldDropdown([["German","de"], ["English","en"], ["French","fr"]]), "speak_lang");
    this.appendStatementInput("init")
        .setCheck(null)
        .appendField("init");
    this.appendStatementInput("script_container")
        .setCheck(null)
        .appendField("scripts");
    this.setInputsInline(false);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tttool_speak'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("speak \"")
        .appendField(new Blockly.FieldTextInput("text to be spoken"), "NAME")
        .appendField("\"");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tttool_jump'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("jump to script")
        .appendField(new Blockly.FieldTextInput("scriptname"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tttool_play'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("play")
        .appendField(new Blockly.FieldTextInput("filename"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
