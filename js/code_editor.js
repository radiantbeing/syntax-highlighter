/**
 * Enable input '\t' on inputElement (ex. <textarea>, <input>)
 * @param {DOMelement} DOMelement
 */
function enableTab(DOMelement) {
  QS(DOMelement).addEventListener("keydown", (event) => {
    if (event.key == "Tab") {
      event.preventDefault();
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      event.target.value = event.target.value.substring(0, start) + "\t" + event.target.value.substring(end);

      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  });
}

/**
 * Enable autogrow when user input 'Enter' in input area
 * @param {*} DOMelement
 */
function autoGrow(DOMelement) {
  QS(DOMelement).addEventListener("input", (event) => {
    event.target.style.height = "65px";
    event.target.style.height = event.target.scrollHeight + "px";
  });
}

/**
 * Main Function of this js context
 */
(function () {
  autoGrow("#plainCode");
  enableTab("#plainCode");
})();
