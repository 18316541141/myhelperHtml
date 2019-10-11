var DOMParser = require('xmldom').DOMParser;
module.exports = function (source) {
  var parser = new DOMParser();
  var domObj = parser.parseFromString(source, "text/html");
  var template = domObj.getElementsByTagName('template')[0];
  var script = domObj.getElementsByTagName('script')[0];
  var templateHtml='';
  for (var i = 0, len_i = template.childNodes.length; i < len_i; i++) {
    if (template.childNodes[i].nodeType === 1) {
      var lines = (template.childNodes[i] + '').split('\r\n');
      for(var j=0,len_j=lines.length;j<len_j;j++){
        templateHtml+=lines[j]+'\\r\\n';
      }
      templateHtml='\''+templateHtml.replace(/'/g,'\\\'')+'\'';
      break;
    }
  }
  var scriptText = script.textContent;
  var ctrlIndex = scriptText.indexOf('controller');
  var ret = scriptText.substring(0, ctrlIndex) + 'template:'+templateHtml+',' + scriptText.substring(ctrlIndex);
  return ret;
};