function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
    text = document.selection.createRange().text;
  }
  return text;
}

function detectTextSelection() {
  var selectedText = getSelectedText();
  if (selectedText) {
    $(".highlighted_SEL").removeClass("highlighted_SEL")
		highlightWord(document.body, selectedText);
  }
  else {
  	$(".highlighted_SEL").removeClass("highlighted_SEL")
  }
}

function highlightWord(root, word){
  textNodesUnder(root).forEach(highlightWords);

  function textNodesUnder(root){
    var walk = document.createTreeWalker(root,NodeFilter.SHOW_TEXT, null, false),
        text = [], node;
    while(node = walk.nextNode()) text.push(node);
    return text;
  }
    
  function highlightWords(n){
    for (var i; (i = n.nodeValue.indexOf(word,i)) > -1; n = after){
      var after = n.splitText(i + word.length);
      var highlighted = n.splitText(i);
      var span = document.createElement('span');
      span.className = 'highlighted_SEL';
      span.appendChild(highlighted);
      after.parentNode.insertBefore(span,after);
    }
  }
}

document.onmouseup = detectTextSelection;
document.onkeyup = detectTextSelection;