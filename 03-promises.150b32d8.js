var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=r);var n=r("iQIUW");function i(e,t,o){return new Promise(((r,n)=>{setTimeout((()=>{o?r({position:e,delay:t}):n({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const{delay:t,step:o,amount:r}=e.target.elements,l=Number(t.value),a=Number(o.value);(l<1||a<1||r.value<1)&&n.Notify.failure("All fields must be more than zero");const s=[];for(let e=1;e<=r.value;e+=1){const t=Math.random()>.3;s.push(i(e,l,t))}Promise.all(s).then((e=>{e.forEach((({position:e,delay:t})=>{n.Notify.success(`Fulfilled promise ${e} in ${t}ms`)}))})).catch((e=>{e.forEach((({position:e,delay:t})=>{n.Notify.failure(`Rejected promise ${e} in ${t}ms`)}))})),e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.150b32d8.js.map
