import{z as p,ad as b,D as v,r as F,O as V,Y as y,a as D}from"./index-BkP5V-2G.js";import{d as R,e as h}from"./VTextField-CTCdQeIh.js";const P=e=>!!e||"Campo Obligatorio.",S=e=>/.+@.+\..+/.test(e)?!0:"El email debe ser válido.",$=e=>/^[0-9]+$/.test(e)?!0:"Solo se permite números.",k=e=>/^[0-9]{8}$/.test(e)?!0:"El DNI debe tener 8 dígitos.",N=e=>/^[0-9]{12}$/.test(e)?!0:"El carnet de extranjeria debe tener 12 dígitos.",x=e=>/^[0-9]+(\.[0-9]+)?$/.test(e)?!0:"Solo se permite números.",E=p({...b(),...R()},"VForm"),O=v()({name:"VForm",props:E(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,m){let{slots:a,emit:l}=m;const r=h(e),n=F();function c(s){s.preventDefault(),r.reset()}function u(s){const o=s,t=r.validate();o.then=t.then.bind(t),o.catch=t.catch.bind(t),o.finally=t.finally.bind(t),l("submit",o),o.defaultPrevented||t.then(d=>{var i;let{valid:f}=d;f&&((i=n.value)==null||i.submit())}),o.preventDefault()}return V(()=>{var s;return D("form",{ref:n,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:c,onSubmit:u},[(s=a.default)==null?void 0:s.call(a,r)])}),y(r,n)}});export{O as V,k as a,N as b,$ as c,x as d,S as e,P as i};
