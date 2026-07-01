/* CELKONSAN çok dilli sistem — RU (ana) · KZ · ZH · EN
   Her sayfa window.PAGE_I18N = {en:{...}, kz:{...}, zh:{...}} tanımlar.
   Çevrilecek öğeler: data-i18n="key" (metin) / data-i18n-html="key" (HTML). */
(function(){
  var css=document.createElement('style');
  css.textContent='.nav-lang{display:flex !important;gap:5px;align-items:center;}.nav-lang button{background:none;border:1px solid #ddd;color:#888;font-size:12px;font-weight:700;padding:4px 9px;border-radius:6px;cursor:pointer;font-family:inherit;line-height:1;transition:all .15s;}.nav-lang button:hover{border-color:#0b0d10;color:#0b0d10;}.nav-lang button.active{background:#0b0d10;color:#fff;border-color:#0b0d10;}@media(max-width:768px){.nav-lang{display:flex !important;order:2;}.nav-lang button{padding:3px 7px;font-size:11px;}}';
  document.head.appendChild(css);
  var langs=[['ru','РУ'],['kz','ҚАЗ'],['zh','中文'],['en','EN']];
  function render(){
    var box=document.querySelector('.nav-lang'); if(!box)return;
    box.innerHTML=langs.map(function(l){return '<button data-lang="'+l[0]+'" onclick="setLang(\''+l[0]+'\')">'+l[1]+'</button>';}).join('');
  }
  function capture(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){el.dataset.ru=el.textContent;});
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){el.dataset.ruHtml=el.innerHTML;});
  }
  window.setLang=function(lang){
    var P=window.PAGE_I18N||{};
    document.documentElement.lang=(lang==='zh')?'zh-Hans':(lang==='kz'?'kk':lang);
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n');
      el.textContent=(lang==='ru')?el.dataset.ru:((P[lang]&&P[lang][k]!==undefined)?P[lang][k]:el.dataset.ru);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var k=el.getAttribute('data-i18n-html');
      el.innerHTML=(lang==='ru')?el.dataset.ruHtml:((P[lang]&&P[lang][k]!==undefined)?P[lang][k]:el.dataset.ruHtml);
    });
    document.querySelectorAll('.nav-lang button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===lang);});
    try{localStorage.setItem('celk_lang',lang);}catch(e){}
  };
  function init(){render();capture();var l='ru';try{l=localStorage.getItem('celk_lang')||'ru';}catch(e){}setLang(l);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
