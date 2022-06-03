"use strict";

function enableTab(inputElement) {
  document.getElementById(inputElement).addEventListener("keydown", function (event) {
    if (event.key == "Tab") {
      event.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;

      this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

      this.selectionStart = this.selectionEnd = start + 1;
    }
  });
}

enableTab("plainCode");

const languageLists = hljs.listLanguages();
languageLists.unshift("auto"); // auto option 추가
const languageSelection = document.getElementById("languageSelection");
const highlightBtn = document.getElementById("highlightBtn");
const plainCode = document.getElementById("plainCode");
const highlightedCode = document.querySelector("pre code");
const languageBadge = document.getElementById("languageBadge");

document.addEventListener("DOMContentLoaded", () => {
  hljs.highlightAll();
  createLanguageOptions();
  addEventToHighlightBtn();
});

plainCode.addEventListener("input", (e) => autoGrow(e.target));

// function 정의
function createLanguageOptions() {
  for (let i = 0; i < languageLists.length; i++) {
    const option = document.createElement("option");
    const language = languageLists[i];
    option.innerText = language;
    option.setAttribute("value", language);
    languageSelection.appendChild(option);
  }
}

function addEventToHighlightBtn() {
  highlightBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const language = languageSelection.value;
    const code = plainCode.value;

    if (language == "auto") highlightAuto(code);
    else highlightManual(code, language);

    changeLanguageBadge();
  });
}

function highlightAuto(code) {
  removeClassByIndex(highlightedCode, 1);
  highlightedCode.textContent = code;
  hljs.highlightAll();
}

function highlightManual(code, lang) {
  replaceLanguage(lang);
  highlight(code);
}

function changeLanguageBadge() {
  const currentLanguage = highlightedCode.classList.item(1).slice(9);
  languageBadge.innerText = `${currentLanguage}`;
}

function removeClassByIndex(DOMelement, index) {
  const classToDelete = Array.from(DOMelement.classList)[index];
  DOMelement.classList.remove(classToDelete);
}

function highlight(code) {
  const highlightedCode = document.querySelector("pre code");
  highlightedCode.textContent = code;
  hljs.highlightAll();
}

function replaceLanguage(lang) {
  const currentLanguage = highlightedCode.classList.item(1);
  highlightedCode.classList.replace(currentLanguage, `language-${lang}`);
}

function autoGrow(DOMelement) {
  DOMelement.style.height = "65px";
  DOMelement.style.height = DOMelement.scrollHeight + "px";
}
