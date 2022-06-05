/**
 * Enable input '\t' on inputElement (ex. <textarea>, <input>)
 * @param {DOMelement} DOMelement
 */
function enableTab(DOMelement) {
  QS(DOMelement).addEventListener("keydown", (event) => {
    if (event.key == "Tab") {
      event.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;

      this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

      this.selectionStart = this.selectionEnd = start + 1;
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
