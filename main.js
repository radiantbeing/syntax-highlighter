document.addEventListener("DOMContentLoaded", (event) => {
  hljs.highlightAll();
});

// Language 선택 목록
const listLang = hljs.listLanguages();
const el = document.createElement("option");
const lang = "auto";
el.innerText = lang;
el.setAttribute("value", lang);
document.getElementById("language-select").appendChild(el);
for (let i = 0; i < listLang.length; i++) {
  const el = document.createElement("option");
  const lang = listLang[i];
  el.innerText = lang;
  el.setAttribute("value", lang);
  document.getElementById("language-select").appendChild(el);
}

// Hightlight 버튼
document.getElementById("highlight-btn").addEventListener("click", (event) => {
  event.preventDefault();
  const lang = document.getElementById("language-select").value;
  const code = document.getElementById("plain-code").value;
  if (lang == "auto") {
    highlightAuto(code);
  } else {
    changeLang(lang);
    highlightWith(code);
  }
});

function removeClassByIndex(DOMelement, index) {
  const classToDelete = Array.from(DOMelement.classList)[index];
  DOMelement.classList.remove(classToDelete);
}
function highlightAuto(code) {
  const $code = document.querySelector("pre code");
  removeClassByIndex($code, 1);
  $code.textContent = code;
  hljs.highlightAll();
}

function highlightWith(code) {
  const $code = document.querySelector("pre code");
  $code.textContent = code;
  hljs.highlightAll();
}

function changeLang(lang) {
  const $code = document.querySelector("pre code");
  const curLang = $code.classList.item(1);
  $code.classList.replace(curLang, `language-${lang}`);
}
