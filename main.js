document.addEventListener("DOMContentLoaded", (event) => {
  hljs.highlightAll();
});

// Language 선택 목록
const listLang = hljs.listLanguages();
for (let i = 0; i < listLang.length; i++) {
  const el = document.createElement("option");
  const lang = listLang[i];
  el.innerText = lang;
  el.setAttribute("value", lang);
  document.getElementById("language-select").appendChild(el);
}

// Hightlight 버튼
document.getElementById("highlight-btn").addEventListener("click", (event) => {
  const lang = document.getElementById("language-select").value;
  const code = document.getElementById("plain-code").value;
  changeLang(lang);
  highlightWith(code);
});

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
