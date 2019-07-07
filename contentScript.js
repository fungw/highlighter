var marked = {
  highlightedValue: '',
  getHighlightedValue() {
    return this.highlightedValue;
  },
  setHighlightedValue(value) {
    this.highlightedValue = value;
  }
};

document.addEventListener('mouseup', () => {
  var markInstance = new Mark('body');
  var selectedValue = window.getSelection().toString();

  // Remove any highlighted yellow marks
  markInstance.unmark();
  if (selectedValue) {
    var options = {
      separateWordSearch: false
    }
    markInstance.mark(selectedValue, options);
    // Set selected value to be used later for copy to clipboard
    marked.setHighlightedValue(selectedValue);
  }
});

function bindCtrlCmdEvents(marked) {
  var cmdControlHeld = false;
  var cmdKeyCode = {
    left: 91,
    right: 93
  };
  var ctrlKeyCode = {
    left: 17,
    right: 17
  };
  var c_copyKeyCode = 67;

  var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if (isMac) {
    handleKeyCode = cmdKeyCode;
  } else {
    handleKeyCode = ctrlKeyCode;
  }

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === handleKeyCode.left || e.keyCode === handleKeyCode.right) {
      cmdControlHeld = true;
    }
  });

  document.addEventListener('keyup', function(e) {
    if (e.keyCode === handleKeyCode.left || e.keyCode === handleKeyCode.right) {
      cmdControlHeld = false;
    }
  });

  document.addEventListener('keydown', function(e) {
    // If CTRL/CMD held, and C down (copy), copy highlighted text into clipboard
    if (e.keyCode === c_copyKeyCode && cmdControlHeld == true) {
      var markedValue = marked.getHighlightedValue();
      if (markedValue) {
        navigator.clipboard.writeText(markedValue);
      }
    }
  });
}

bindCtrlCmdEvents(marked);