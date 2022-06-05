"use strict";

/**
 * Shortcut of 'document.quertSelector()'
 * @param {String} name
 * @returns DOMelement
 */
function QS(name) {
  return document.querySelector(name);
}

/**
 * Shortcut of 'document.createElement()'
 *
 * @param {String} name
 * @returns
 */
function createElement(name) {
  return document.createElement(name);
}

/**
 * Get class name by index
 * @param {DOMelement} element
 * @param {Integer} index
 * @returns class name of DOMelement at index
 */
function getClassByIndex(element, index) {
  return Array.from(element.classList)[index];
}

/**
 * Remove class which includes input string
 * @param {DOMelement} DOMelement
 * @param {String} string
 * @returns if success return true, or not false
 */
function removeClassInclude(DOMelement, string) {
  const classList = DOMelement.classList;
  classList.forEach((element) => {
    if (element.includes(string)) classList.remove(element);
    return true;
  });
  return false;
}

/**
 * Create <optgroup></optgroup> element by input array
 * @param {Array of String} array
 * @param {String} label
 * @returns optgroup element
 */
function createOptgroup(array, label) {
  const optgroup = createElement("optgroup");
  optgroup.label = label;
  for (let i = 0; i < array.length; i++) {
    const option = createElement("option");
    option.textContent = array[i];
    option.setAttribute("value", array[i]);
    optgroup.appendChild(option);
  }
  return optgroup;
}

/**
 * If one of classes of DOMelement includes input string return it
 *
 * @param {DOMelement} DOMelement
 * @param {String} string
 * @returns class name
 */
function getClassIncludes(DOMelement, string) {
  const classList = DOMelement.classList;
  let result = null;
  classList.forEach((element) => {
    if (element.includes(string)) {
      result = element;
    }
  });
  return result;
}

/**
 * get current recognized language
 *
 * @returns current recognized language
 */
function getRecognizedLanguage() {
  let result = getClassIncludes(QS(".highlight-text"), "language");
  return result.slice(9);
}

/**
 * Change content of Badge element.
 */
function updateLanguageBadge() {
  const currentLanguage = getRecognizedLanguage();
  languageBadge.innerText = `${currentLanguage}`;
}

/**
 * Handler of 'Highlight!' button
 *
 * @param {Object} event
 */
function highlightHandler(event) {
  event.preventDefault();

  const plainCode = document.getElementById("plainCode");
  const language = languageSelection.value;
  const code = plainCode.value;

  if (language == "auto") highlightAuto(code);
  else highlightManual(code, language);

  updateLanguageBadge();
}

/**
 * Highlight code in auto mode
 * @param {String} code
 */
function highlightAuto(code) {
  removeClassInclude(QS(".highlight-text"), "language");
  const highlightedCode = QS("pre code");
  highlightedCode.textContent = code;
  hljs.highlightAll();

  if (getRecognizedLanguage() == "undefined") {
    highlightManual(code, "plaintext");
  }
}

/**
 * Highlight code in manual mode
 * @param {String} code
 * @param {String} lang
 */
function highlightManual(code, lang) {
  replaceLanguage(lang);

  const highlightedCode = QS("pre code");
  highlightedCode.textContent = code;
  hljs.highlightAll();
}

/**
 * Replace language to input 'lang'
 * @param {String} lang
 */
function replaceLanguage(lang) {
  const highlightedCode = QS("pre code");
  const currentLangClass = getClassIncludes(QS(".highlight-text"), "language");
  highlightedCode.classList.replace(currentLangClass, `language-${lang}`);
}

/**
 * Main Function of this js context
 */
(function () {
  hljs.highlightAll();

  const highlightBtn = document.getElementById("highlightBtn");
  highlightBtn.addEventListener("click", highlightHandler);

  // Add <optgroup> of languages to <select> tag
  const languageSelection = QS("#languageSelection");
  const languages = hljs.listLanguages();
  languages.unshift("auto");
  const languageOptGroup = createOptgroup(languages, "Languages");
  languageSelection.appendChild(languageOptGroup);
})();
