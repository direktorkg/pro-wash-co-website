const translations=document.querySelectorAll("[data-sr][data-en]");const langButtons=document.querySelectorAll(".lang");function setLanguage(lang){document.documentElement.lang=lang;translations.forEach(el=>el.textContent=el.dataset[lang]);langButtons.forEach(b=>{const active=b.dataset.lang===lang;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});document.title=lang==="en"?"Laundry & Ironing in Kragujevac | Pro Wash CO":"Perionica veša Kragujevac | Pranje i peglanje – Pro Wash CO";document.querySelector('meta[name="description"]').content=lang==="en"?"Pro Wash CO laundry and ironing in Kragujevac, Cara Lazara 4. Services for individuals and businesses. Call +381 64 506 9536.":"Pro Wash CO – perionica veša u Kragujevcu, Cara Lazara 4. Profesionalno pranje i peglanje veša za građane i firme. Pozovite 064 506 9536.";localStorage.setItem("prowash-language",lang)}langButtons.forEach(b=>b.addEventListener("click",()=>setLanguage(b.dataset.lang)));setLanguage(localStorage.getItem("prowash-language")||"sr");const toggle=document.querySelector(".menu-toggle");const nav=document.querySelector(".nav");toggle.addEventListener("click",()=>(nav.classList.toggle("open"),toggle.setAttribute("aria-expanded",String(nav.classList.contains("open")))));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>(nav.classList.remove("open"),toggle.setAttribute("aria-expanded","false"))));document.getElementById("year").textContent=new Date().getFullYear();
/* Analytics: load only after an affirmative choice. No GA request on rejection. */
const analyticsId="G-JNZ1BW3HQS";
const consentKey="prowash-analytics-consent-v1";
const cookieBanner=document.getElementById("cookie-banner");
let analyticsLoaded=false;
function enableAnalytics(){
  if(analyticsLoaded)return;
  analyticsLoaded=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag("js",new Date());
  window.gtag("config",analyticsId,{anonymize_ip:true});
  const tag=document.createElement("script");
  tag.async=true;
  tag.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(analyticsId);
  document.head.appendChild(tag);
}
function saveAnalyticsChoice(allow){
  try{localStorage.setItem(consentKey,allow?"accepted":"rejected")}catch(e){}
  cookieBanner.hidden=true;
  if(allow)enableAnalytics();
  else if(analyticsLoaded)location.reload();
}
let savedConsent=null;
try{savedConsent=localStorage.getItem(consentKey)}catch(e){}
if(savedConsent==="accepted")enableAnalytics();
else if(savedConsent!=="rejected")cookieBanner.hidden=false;
document.getElementById("cookie-accept").addEventListener("click",()=>saveAnalyticsChoice(true));
document.getElementById("cookie-reject").addEventListener("click",()=>saveAnalyticsChoice(false));
document.getElementById("cookie-settings").addEventListener("click",()=>{cookieBanner.hidden=false;cookieBanner.scrollIntoView({behavior:"smooth",block:"nearest"})});
document.querySelectorAll('a[href^="tel:"],a[href^="viber:"],a[href*="wa.me/"],a[href*="google.com/maps/dir/"]').forEach(link=>{
  link.addEventListener("click",()=>{
    if(!analyticsLoaded||typeof window.gtag!=="function")return;
    const href=link.getAttribute("href")||"";
    const method=href.startsWith("tel:")?"phone":href.startsWith("viber:")?"viber":href.includes("wa.me/")?"whatsapp":"directions";
    window.gtag("event","contact_click",{contact_method:method});
  });
});
const mapButton=document.getElementById("load-map");
mapButton.addEventListener("click",()=>{
  const iframe=document.querySelector(".map iframe");
  if(iframe&&iframe.dataset.src){iframe.src=iframe.dataset.src;iframe.removeAttribute("data-src")}
  mapButton.hidden=true;
});
