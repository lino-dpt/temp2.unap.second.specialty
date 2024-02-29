import{z as $,aP as al,aQ as ze,D as W,H as te,aR as nl,r as ee,N as ve,L as j,y as C,O as Z,Y as De,M as ye,Q as H,aS as Ce,a as u,W as ue,aT as _e,$ as Q,aG as Ee,ad as ne,ai as Oe,an as be,a0 as Le,ay as ol,as as Me,av as D,aU as pe,aV as He,G as _,a1 as ul,aa as me,aW as Ge,F as le,n as Y,az as il,aX as Ue,Z as ce,J as sl,aL as cl,aY as he,B as $e,aZ as rl,am as Ve,a_ as Ne,ap as dl,ar as qe,a$ as Ke,at as de,b0 as Ie,aB as re,ao as je,aq as We,aN as xe,ah as vl,aj as fl,b1 as ml,ak as hl,b2 as gl,al as yl,E as Xe,b3 as bl,b4 as pl,b5 as Vl,b6 as Sl,b7 as kl,b8 as Cl,b9 as Il,ba as xl,bb as Pl,ab as wl,T as ge,ax as Pe,bc as Tl,bd as Al,aA as Bl,be as Rl,bf as Fl,aD as se,bg as zl,bh as Dl,bi as _l,C as El,I as Ol,P as Ll,R as Ml,S as we,U as Hl,g as Gl}from"./index-BkP5V-2G.js";import{c as Ul,m as $l,u as Nl,V as Te}from"./VTextField-CTCdQeIh.js";const ql=$({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...al({origin:"center center",scrollStrategy:"block",transition:{component:ze},zIndex:2400})},"VDialog"),ht=W()({name:"VDialog",props:ql(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:t}=r;const n=te(e,"modelValue"),{scopeId:o}=nl(),i=ee();function d(l){var b,h;const v=l.relatedTarget,g=l.target;if(v!==g&&((b=i.value)!=null&&b.contentEl)&&((h=i.value)!=null&&h.globalTop)&&![document,i.value.contentEl].includes(g)&&!i.value.contentEl.contains(g)){const I=_e(i.value.contentEl);if(!I.length)return;const y=I[0],x=I[I.length-1];v===y?x.focus():y.focus()}}ve&&j(()=>n.value&&e.retainFocus,l=>{l?document.addEventListener("focusin",d):document.removeEventListener("focusin",d)},{immediate:!0}),j(n,async l=>{var v,g;await ye(),l?(v=i.value.contentEl)==null||v.focus({preventScroll:!0}):(g=i.value.activatorEl)==null||g.focus({preventScroll:!0})});const a=C(()=>H({"aria-haspopup":"dialog","aria-expanded":String(n.value)},e.activatorProps));return Z(()=>{const l=Ce.filterProps(e);return u(Ce,H({ref:i,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},l,{modelValue:n.value,"onUpdate:modelValue":v=>n.value=v,"aria-modal":"true",activatorProps:a.value,role:"dialog"},o),{activator:t.activator,default:function(){for(var v=arguments.length,g=new Array(v),b=0;b<v;b++)g[b]=arguments[b];return u(ue,{root:"VDialog"},{default:()=>{var h;return[(h=t.default)==null?void 0:h.call(t,...g)]}})}})}),De({},i)}}),Ye=Symbol.for("vuetify:selection-control-group"),Qe=$({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:Q,trueIcon:Q,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:Ee},...ne(),...Oe(),...be()},"SelectionControlGroup"),Kl=$({...Qe({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),gt=W()({name:"VSelectionControlGroup",props:Kl(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:t}=r;const n=te(e,"modelValue"),o=Le(),i=C(()=>e.id||`v-selection-control-group-${o}`),d=C(()=>e.name||i.value),a=new Set;return ol(Ye,{modelValue:n,forceUpdate:()=>{a.forEach(l=>l())},onForceUpdate:l=>{a.add(l),pe(()=>{a.delete(l)})}}),Me({[e.defaultsTarget]:{color:D(e,"color"),disabled:D(e,"disabled"),density:D(e,"density"),error:D(e,"error"),inline:D(e,"inline"),modelValue:n,multiple:C(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),name:d,falseIcon:D(e,"falseIcon"),trueIcon:D(e,"trueIcon"),readonly:D(e,"readonly"),ripple:D(e,"ripple"),type:D(e,"type"),valueComparator:D(e,"valueComparator")}}),Z(()=>{var l;return u("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(l=t.default)==null?void 0:l.call(t)])}),{}}}),Ze=$({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...ne(),...Qe()},"VSelectionControl");function jl(e){const r=il(Ye,void 0),{densityClasses:t}=Ue(e),n=te(e,"modelValue"),o=C(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),i=C(()=>e.falseValue!==void 0?e.falseValue:!1),d=C(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),a=C({get(){const I=r?r.modelValue.value:n.value;return d.value?ce(I).some(y=>e.valueComparator(y,o.value)):e.valueComparator(I,o.value)},set(I){if(e.readonly)return;const y=I?o.value:i.value;let x=y;d.value&&(x=I?[...ce(n.value),y]:ce(n.value).filter(c=>!e.valueComparator(c,o.value))),r?r.modelValue.value=x:n.value=x}}),{textColorClasses:l,textColorStyles:v}=sl(C(()=>{if(!(e.error||e.disabled))return a.value?e.color:e.baseColor})),{backgroundColorClasses:g,backgroundColorStyles:b}=cl(C(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),h=C(()=>a.value?e.trueIcon:e.falseIcon);return{group:r,densityClasses:t,trueValue:o,falseValue:i,model:a,textColorClasses:l,textColorStyles:v,backgroundColorClasses:g,backgroundColorStyles:b,icon:h}}const Ae=W()({name:"VSelectionControl",directives:{Ripple:He},inheritAttrs:!1,props:Ze(),emits:{"update:modelValue":e=>!0},setup(e,r){let{attrs:t,slots:n}=r;const{group:o,densityClasses:i,icon:d,model:a,textColorClasses:l,textColorStyles:v,backgroundColorClasses:g,backgroundColorStyles:b,trueValue:h}=jl(e),I=Le(),y=_(!1),x=_(!1),c=ee(),P=C(()=>e.id||`input-${I}`),w=C(()=>!e.disabled&&!e.readonly);o==null||o.onForceUpdate(()=>{c.value&&(c.value.checked=a.value)});function z(S){w.value&&(y.value=!0,he(S.target,":focus-visible")!==!1&&(x.value=!0))}function R(){y.value=!1,x.value=!1}function N(S){S.stopPropagation()}function X(S){w.value&&(e.readonly&&o&&ye(()=>o.forceUpdate()),a.value=S.target.checked)}return Z(()=>{var U,q;const S=n.label?n.label({label:e.label,props:{for:P.value}}):e.label,[O,E]=ul(t),G=u("input",H({ref:c,checked:a.value,disabled:!!e.disabled,id:P.value,onBlur:R,onFocus:z,onInput:X,"aria-disabled":!!e.disabled,type:e.type,value:h.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},E),null);return u("div",H({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":y.value,"v-selection-control--focus-visible":x.value,"v-selection-control--inline":e.inline},i.value,e.class]},O,{style:e.style}),[u("div",{class:["v-selection-control__wrapper",l.value],style:v.value},[(U=n.default)==null?void 0:U.call(n,{backgroundColorClasses:g,backgroundColorStyles:b}),me(u("div",{class:["v-selection-control__input"]},[((q=n.input)==null?void 0:q.call(n,{model:a,textColorClasses:l,textColorStyles:v,backgroundColorClasses:g,backgroundColorStyles:b,inputNode:G,icon:d.value,props:{onFocus:z,onBlur:R,id:P.value}}))??u(le,null,[d.value&&u(Y,{key:"icon",icon:d.value},null),G])]),[[Ge("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),S&&u(Ul,{for:P.value,onClick:N},{default:()=>[S]})])}),{isFocused:y,input:c}}}),Wl=$({indeterminate:Boolean,indeterminateIcon:{type:Q,default:"$checkboxIndeterminate"},...Ze({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Xl=W()({name:"VCheckboxBtn",props:Wl(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,r){let{slots:t}=r;const n=te(e,"indeterminate"),o=te(e,"modelValue");function i(l){n.value&&(n.value=!1)}const d=C(()=>n.value?e.indeterminateIcon:e.falseIcon),a=C(()=>n.value?e.indeterminateIcon:e.trueIcon);return Z(()=>{const l=$e(Ae.filterProps(e),["modelValue"]);return u(Ae,H(l,{modelValue:o.value,"onUpdate:modelValue":[v=>o.value=v,i],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:d.value,trueIcon:a.value,"aria-checked":n.value?"mixed":void 0}),t)}),{}}});function Be(e){const t=Math.abs(e);return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function Re(e){let{selectedElement:r,containerSize:t,contentSize:n,isRtl:o,currentScrollOffset:i,isHorizontal:d}=e;const a=d?r.clientWidth:r.clientHeight,l=d?r.offsetLeft:r.offsetTop,v=o&&d?n-l-a:l,g=t+i,b=a+v,h=a*.4;return v<=i?i=Math.max(v-h,0):g<=b&&(i=Math.min(i-(g-b-h),n-t)),i}function Yl(e){let{selectedElement:r,containerSize:t,contentSize:n,isRtl:o,isHorizontal:i}=e;const d=i?r.clientWidth:r.clientHeight,a=i?r.offsetLeft:r.offsetTop,l=o&&i?n-a-d/2-t/2:a+d/2-t/2;return Math.min(n-t,Math.max(0,l))}const Ql=Symbol.for("vuetify:v-slide-group"),Je=$({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Ql},nextIcon:{type:Q,default:"$next"},prevIcon:{type:Q,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...ne(),...rl(),...Ve(),...Ne({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),Fe=W()({name:"VSlideGroup",props:Je(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:t}=r;const{isRtl:n}=dl(),{displayClasses:o,mobile:i}=qe(e),d=Ke(e,e.symbol),a=_(!1),l=_(0),v=_(0),g=_(0),b=C(()=>e.direction==="horizontal"),{resizeRef:h,contentRect:I}=de(),{resizeRef:y,contentRect:x}=de(),c=C(()=>d.selected.value.length?d.items.value.findIndex(m=>m.id===d.selected.value[0]):-1),P=C(()=>d.selected.value.length?d.items.value.findIndex(m=>m.id===d.selected.value[d.selected.value.length-1]):-1);if(ve){let m=-1;j(()=>[d.selected.value,I.value,x.value,b.value],()=>{cancelAnimationFrame(m),m=requestAnimationFrame(()=>{if(I.value&&x.value){const p=b.value?"width":"height";v.value=I.value[p],g.value=x.value[p],a.value=v.value+1<g.value}if(c.value>=0&&y.value){const p=y.value.children[P.value];c.value===0||!a.value?l.value=0:e.centerActive?l.value=Yl({selectedElement:p,containerSize:v.value,contentSize:g.value,isRtl:n.value,isHorizontal:b.value}):a.value&&(l.value=Re({selectedElement:p,containerSize:v.value,contentSize:g.value,isRtl:n.value,currentScrollOffset:l.value,isHorizontal:b.value}))}})})}const w=_(!1);let z=0,R=0;function N(m){const p=b.value?"clientX":"clientY";R=(n.value&&b.value?-1:1)*l.value,z=m.touches[0][p],w.value=!0}function X(m){if(!a.value)return;const p=b.value?"clientX":"clientY",V=n.value&&b.value?-1:1;l.value=V*(R+z-m.touches[0][p])}function S(m){const p=g.value-v.value;l.value<0||!a.value?l.value=0:l.value>=p&&(l.value=p),w.value=!1}function O(){h.value&&(h.value[b.value?"scrollLeft":"scrollTop"]=0)}const E=_(!1);function G(m){if(E.value=!0,!(!a.value||!y.value)){for(const p of m.composedPath())for(const V of y.value.children)if(V===p){l.value=Re({selectedElement:V,containerSize:v.value,contentSize:g.value,isRtl:n.value,currentScrollOffset:l.value,isHorizontal:b.value});return}}}function U(m){E.value=!1}function q(m){var p;!E.value&&!(m.relatedTarget&&((p=y.value)!=null&&p.contains(m.relatedTarget)))&&F()}function K(m){y.value&&(b.value?m.key==="ArrowRight"?F(n.value?"prev":"next"):m.key==="ArrowLeft"&&F(n.value?"next":"prev"):m.key==="ArrowDown"?F("next"):m.key==="ArrowUp"&&F("prev"),m.key==="Home"?F("first"):m.key==="End"&&F("last"))}function F(m){var p,V,T,A,M;if(y.value)if(!m)(p=_e(y.value)[0])==null||p.focus();else if(m==="next"){const B=(V=y.value.querySelector(":focus"))==null?void 0:V.nextElementSibling;B?B.focus():F("first")}else if(m==="prev"){const B=(T=y.value.querySelector(":focus"))==null?void 0:T.previousElementSibling;B?B.focus():F("last")}else m==="first"?(A=y.value.firstElementChild)==null||A.focus():m==="last"&&((M=y.value.lastElementChild)==null||M.focus())}function L(m){const p=l.value+(m==="prev"?-1:1)*v.value;l.value=re(p,0,g.value-v.value)}const ie=C(()=>{let m=l.value>g.value-v.value?-(g.value-v.value)+Be(g.value-v.value-l.value):-l.value;l.value<=0&&(m=Be(-l.value));const p=n.value&&b.value?-1:1;return{transform:`translate${b.value?"X":"Y"}(${p*m}px)`,transition:w.value?"none":"",willChange:w.value?"transform":""}}),J=C(()=>({next:d.next,prev:d.prev,select:d.select,isSelected:d.isSelected})),f=C(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!i.value;case!0:return a.value||Math.abs(l.value)>0;case"mobile":return i.value||a.value||Math.abs(l.value)>0;default:return!i.value&&(a.value||Math.abs(l.value)>0)}}),s=C(()=>Math.abs(l.value)>0),k=C(()=>g.value>Math.abs(l.value)+v.value);return Z(()=>u(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!b.value,"v-slide-group--has-affixes":f.value,"v-slide-group--is-overflowing":a.value},o.value,e.class],style:e.style,tabindex:E.value||d.selected.value.length?-1:0,onFocus:q},{default:()=>{var m,p,V;return[f.value&&u("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!s.value}],onClick:()=>s.value&&L("prev")},[((m=t.prev)==null?void 0:m.call(t,J.value))??u(Ie,null,{default:()=>[u(Y,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),u("div",{key:"container",ref:h,class:"v-slide-group__container",onScroll:O},[u("div",{ref:y,class:"v-slide-group__content",style:ie.value,onTouchstartPassive:N,onTouchmovePassive:X,onTouchendPassive:S,onFocusin:G,onFocusout:U,onKeydown:K},[(p=t.default)==null?void 0:p.call(t,J.value)])]),f.value&&u("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!k.value}],onClick:()=>k.value&&L("next")},[((V=t.next)==null?void 0:V.call(t,J.value))??u(Ie,null,{default:()=>[u(Y,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:d.selected,scrollTo:L,scrollOffset:l,focus:F}}}),el=Symbol.for("vuetify:v-chip-group"),Zl=$({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Ee},...Je(),...ne(),...Ne({selectedClass:"v-chip--selected"}),...Ve(),...be(),...je({variant:"tonal"})},"VChipGroup");W()({name:"VChipGroup",props:Zl(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:t}=r;const{themeClasses:n}=We(e),{isSelected:o,select:i,next:d,prev:a,selected:l}=Ke(e,el);return Me({VChip:{color:D(e,"color"),disabled:D(e,"disabled"),filter:D(e,"filter"),variant:D(e,"variant")}}),Z(()=>{const v=Fe.filterProps(e);return u(Fe,H(v,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style}),{default:()=>{var g;return[(g=t.default)==null?void 0:g.call(t,{isSelected:o,select:i,next:d,prev:a,selected:l.value})]}})}),{}}});const Jl=$({activeClass:String,appendAvatar:String,appendIcon:Q,closable:Boolean,closeIcon:{type:Q,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:Q,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:xe(),onClickOnce:xe(),...vl(),...ne(),...Oe(),...fl(),...ml(),...hl(),...gl(),...yl(),...Ve({tag:"span"}),...be(),...je({variant:"tonal"})},"VChip"),et=W()({name:"VChip",directives:{Ripple:He},props:Jl(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,r){let{attrs:t,emit:n,slots:o}=r;const{t:i}=Xe(),{borderClasses:d}=bl(e),{colorClasses:a,colorStyles:l,variantClasses:v}=pl(e),{densityClasses:g}=Ue(e),{elevationClasses:b}=Vl(e),{roundedClasses:h}=Sl(e),{sizeClasses:I}=kl(e),{themeClasses:y}=We(e),x=te(e,"modelValue"),c=Cl(e,el,!1),P=Il(e,t),w=C(()=>e.link!==!1&&P.isLink.value),z=C(()=>!e.disabled&&e.link!==!1&&(!!c||e.link||P.isClickable.value)),R=C(()=>({"aria-label":i(e.closeLabel),onClick(S){S.stopPropagation(),x.value=!1,n("click:close",S)}}));function N(S){var O;n("click",S),z.value&&((O=P.navigate)==null||O.call(P,S),c==null||c.toggle())}function X(S){(S.key==="Enter"||S.key===" ")&&(S.preventDefault(),N(S))}return()=>{const S=P.isLink.value?"a":e.tag,O=!!(e.appendIcon||e.appendAvatar),E=!!(O||o.append),G=!!(o.close||e.closable),U=!!(o.filter||e.filter)&&c,q=!!(e.prependIcon||e.prependAvatar),K=!!(q||o.prepend),F=!c||c.isSelected.value;return x.value&&me(u(S,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":z.value,"v-chip--filter":U,"v-chip--pill":e.pill},y.value,d.value,F?a.value:void 0,g.value,b.value,h.value,I.value,v.value,c==null?void 0:c.selectedClass.value,e.class],style:[F?l.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:P.href.value,tabindex:z.value?0:void 0,onClick:N,onKeydown:z.value&&!w.value&&X},{default:()=>{var L;return[xl(z.value,"v-chip"),U&&u(Pl,{key:"filter"},{default:()=>[me(u("div",{class:"v-chip__filter"},[o.filter?u(ue,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},o.filter):u(Y,{key:"filter-icon",icon:e.filterIcon},null)]),[[wl,c.isSelected.value]])]}),K&&u("div",{key:"prepend",class:"v-chip__prepend"},[o.prepend?u(ue,{key:"prepend-defaults",disabled:!q,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},o.prepend):u(le,null,[e.prependIcon&&u(Y,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&u(ge,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),u("div",{class:"v-chip__content","data-no-activator":""},[((L=o.default)==null?void 0:L.call(o,{isSelected:c==null?void 0:c.isSelected.value,selectedClass:c==null?void 0:c.selectedClass.value,select:c==null?void 0:c.select,toggle:c==null?void 0:c.toggle,value:c==null?void 0:c.value.value,disabled:e.disabled}))??e.text]),E&&u("div",{key:"append",class:"v-chip__append"},[o.append?u(ue,{key:"append-defaults",disabled:!O,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},o.append):u(le,null,[e.appendIcon&&u(Y,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&u(ge,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),G&&u("button",H({key:"close",class:"v-chip__close",type:"button"},R.value),[o.close?u(ue,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},o.close):u(Y,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Ge("ripple"),z.value&&e.ripple,null]])}}}),lt=$({renderless:Boolean,...ne()},"VVirtualScrollItem"),tt=W()({name:"VVirtualScrollItem",inheritAttrs:!1,props:lt(),emits:{"update:height":e=>!0},setup(e,r){let{attrs:t,emit:n,slots:o}=r;const{resizeRef:i,contentRect:d}=de(void 0,"border");j(()=>{var a;return(a=d.value)==null?void 0:a.height},a=>{a!=null&&n("update:height",a)}),Z(()=>{var a,l;return e.renderless?u(le,null,[(a=o.default)==null?void 0:a.call(o,{itemRef:i})]):u("div",H({ref:i,class:["v-virtual-scroll__item",e.class],style:e.style},t),[(l=o.default)==null?void 0:l.call(o)])})}}),at=-1,nt=1,fe=100,ot=$({itemHeight:{type:[Number,String],default:null},height:[Number,String]},"virtual");function ut(e,r){const t=qe(),n=_(0);Pe(()=>{n.value=parseFloat(e.itemHeight||0)});const o=_(0),i=_(Math.ceil((parseInt(e.height)||t.height.value)/(n.value||16))||1),d=_(0),a=_(0),l=ee(),v=ee();let g=0;const{resizeRef:b,contentRect:h}=de();Pe(()=>{b.value=l.value});const I=C(()=>{var s;return l.value===document.documentElement?t.height.value:((s=h.value)==null?void 0:s.height)||parseInt(e.height)||0}),y=C(()=>!!(l.value&&v.value&&I.value&&n.value));let x=Array.from({length:r.value.length}),c=Array.from({length:r.value.length});const P=_(0);let w=-1;function z(s){return x[s]||n.value}const R=Tl(()=>{const s=performance.now();c[0]=0;const k=r.value.length;for(let m=1;m<=k-1;m++)c[m]=(c[m-1]||0)+z(m-1);P.value=Math.max(P.value,performance.now()-s)},P),N=j(y,s=>{s&&(N(),g=v.value.offsetTop,R.immediate(),L(),~w&&ye(()=>{ve&&window.requestAnimationFrame(()=>{J(w),w=-1})}))});j(I,(s,k)=>{k&&L()}),pe(()=>{R.clear()});function X(s,k){const m=x[s],p=n.value;n.value=p?Math.min(n.value,k):k,(m!==k||p!==n.value)&&(x[s]=k,R())}function S(s){return s=re(s,0,r.value.length-1),c[s]||0}function O(s){return it(c,s)}let E=0,G=0,U=0;function q(){if(!l.value||!v.value)return;const s=l.value.scrollTop,k=performance.now();k-U>500?(G=Math.sign(s-E),g=v.value.offsetTop):G=s-E,E=s,U=k,L()}function K(){!l.value||!v.value||(G=0,U=0,L())}let F=-1;function L(){cancelAnimationFrame(F),F=requestAnimationFrame(ie)}function ie(){if(!l.value||!I.value)return;const s=E-g,k=Math.sign(G),m=Math.max(0,s-fe),p=re(O(m),0,r.value.length),V=s+I.value+fe,T=re(O(V)+1,p+1,r.value.length);if((k!==at||p<o.value)&&(k!==nt||T>i.value)){const A=S(o.value)-S(p),M=S(T)-S(i.value);Math.max(A,M)>fe?(o.value=p,i.value=T):(p<=0&&(o.value=p),T>=r.value.length&&(i.value=T))}d.value=S(o.value),a.value=S(r.value.length)-S(i.value)}function J(s){const k=S(s);!l.value||s&&!k?w=s:l.value.scrollTop=k}const f=C(()=>r.value.slice(o.value,i.value).map((s,k)=>({raw:s,index:k+o.value})));return j(r,()=>{x=Array.from({length:r.value.length}),c=Array.from({length:r.value.length}),R.immediate(),L()},{deep:!0}),{containerRef:l,markerRef:v,computedItems:f,paddingTop:d,paddingBottom:a,scrollToIndex:J,handleScroll:q,handleScrollend:K,handleItemResize:X}}function it(e,r){let t=e.length-1,n=0,o=0,i=null,d=-1;if(e[t]<r)return t;for(;n<=t;)if(o=n+t>>1,i=e[o],i>r)t=o-1;else if(i<r)d=o,n=o+1;else return i===r?o:n;return d}const st=$({items:{type:Array,default:()=>[]},renderless:Boolean,...ot(),...ne(),...Al()},"VVirtualScroll"),ct=W()({name:"VVirtualScroll",props:st(),setup(e,r){let{slots:t}=r;const n=Bl("VVirtualScroll"),{dimensionStyles:o}=Rl(e),{containerRef:i,markerRef:d,handleScroll:a,handleScrollend:l,handleItemResize:v,scrollToIndex:g,paddingTop:b,paddingBottom:h,computedItems:I}=ut(e,D(e,"items"));return Fl(()=>e.renderless,()=>{function y(){var P,w;const c=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1)?"addEventListener":"removeEventListener";i.value===document.documentElement?(document[c]("scroll",a,{passive:!0}),document[c]("scrollend",l)):((P=i.value)==null||P[c]("scroll",a,{passive:!0}),(w=i.value)==null||w[c]("scrollend",l))}zl(()=>{i.value=Dl(n.vnode.el,!0),y(!0)}),pe(y)}),Z(()=>{const y=I.value.map(x=>u(tt,{key:x.index,renderless:e.renderless,"onUpdate:height":c=>v(x.index,c)},{default:c=>{var P;return(P=t.default)==null?void 0:P.call(t,{item:x.raw,index:x.index,...c})}}));return e.renderless?u(le,null,[u("div",{ref:d,class:"v-virtual-scroll__spacer",style:{paddingTop:se(b.value)}},null),y,u("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:se(h.value)}},null)]):u("div",{ref:i,class:["v-virtual-scroll",e.class],onScrollPassive:a,onScrollend:l,style:[o.value,e.style]},[u("div",{ref:d,class:"v-virtual-scroll__container",style:{paddingTop:se(b.value),paddingBottom:se(h.value)}},[y])])}),{scrollToIndex:g}}});function rt(e,r){const t=_(!1);let n;function o(a){cancelAnimationFrame(n),t.value=!0,n=requestAnimationFrame(()=>{n=requestAnimationFrame(()=>{t.value=!1})})}async function i(){await new Promise(a=>requestAnimationFrame(a)),await new Promise(a=>requestAnimationFrame(a)),await new Promise(a=>requestAnimationFrame(a)),await new Promise(a=>{if(t.value){const l=j(t,()=>{l(),a()})}else a()})}async function d(a){var g,b;if(a.key==="Tab"&&((g=r.value)==null||g.focus()),!["PageDown","PageUp","Home","End"].includes(a.key))return;const l=(b=e.value)==null?void 0:b.$el;if(!l)return;(a.key==="Home"||a.key==="End")&&l.scrollTo({top:a.key==="Home"?0:l.scrollHeight,behavior:"smooth"}),await i();const v=l.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");if(a.key==="PageDown"||a.key==="Home"){const h=l.getBoundingClientRect().top;for(const I of v)if(I.getBoundingClientRect().top>=h){I.focus();break}}else{const h=l.getBoundingClientRect().bottom;for(const I of[...v].reverse())if(I.getBoundingClientRect().bottom<=h){I.focus();break}}}return{onListScroll:o,onListKeydown:d}}const dt=$({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:Q,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,..._l({itemChildren:!1})},"Select"),vt=$({...dt(),...$e($l({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...El({transition:{component:ze}})},"VSelect"),yt=W()({name:"VSelect",props:vt(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,r){let{slots:t}=r;const{t:n}=Xe(),o=ee(),i=ee(),d=ee(),a=te(e,"menu"),l=C({get:()=>a.value,set:f=>{var s;a.value&&!f&&((s=i.value)!=null&&s.ΨopenChildren)||(a.value=f)}}),{items:v,transformIn:g,transformOut:b}=Ol(e),h=te(e,"modelValue",[],f=>g(f===null?[null]:ce(f)),f=>{const s=b(f);return e.multiple?s:s[0]??null}),I=C(()=>typeof e.counterValue=="function"?e.counterValue(h.value):typeof e.counterValue=="number"?e.counterValue:h.value.length),y=Nl(),x=C(()=>h.value.map(f=>f.value)),c=_(!1),P=C(()=>l.value?e.closeText:e.openText);let w="",z;const R=C(()=>e.hideSelected?v.value.filter(f=>!h.value.some(s=>s===f)):v.value),N=C(()=>e.hideNoData&&!R.value.length||e.readonly||(y==null?void 0:y.isReadonly.value)),X=C(()=>{var f;return{...e.menuProps,activatorProps:{...((f=e.menuProps)==null?void 0:f.activatorProps)||{},"aria-haspopup":"listbox"}}}),S=ee(),{onListScroll:O,onListKeydown:E}=rt(S,o);function G(f){e.openOnClear&&(l.value=!0)}function U(){N.value||(l.value=!l.value)}function q(f){var V,T;if(!f.key||e.readonly||y!=null&&y.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(f.key)&&f.preventDefault(),["Enter","ArrowDown"," "].includes(f.key)&&(l.value=!0),["Escape","Tab"].includes(f.key)&&(l.value=!1),f.key==="Home"?(V=S.value)==null||V.focus("first"):f.key==="End"&&((T=S.value)==null||T.focus("last"));const s=1e3;function k(A){const M=A.key.length===1,B=!A.ctrlKey&&!A.metaKey&&!A.altKey;return M&&B}if(e.multiple||!k(f))return;const m=performance.now();m-z>s&&(w=""),w+=f.key.toLowerCase(),z=m;const p=v.value.find(A=>A.title.toLowerCase().startsWith(w));p!==void 0&&(h.value=[p])}function K(f){if(e.multiple){const s=h.value.findIndex(k=>e.valueComparator(k.value,f.value));if(s===-1)h.value=[...h.value,f];else{const k=[...h.value];k.splice(s,1),h.value=k}}else h.value=[f],l.value=!1}function F(f){var s;(s=S.value)!=null&&s.$el.contains(f.relatedTarget)||(l.value=!1)}function L(){var f;c.value&&((f=o.value)==null||f.focus())}function ie(f){c.value=!0}function J(f){if(f==null)h.value=[];else if(he(o.value,":autofill")||he(o.value,":-webkit-autofill")){const s=v.value.find(k=>k.title===f);s&&K(s)}else o.value&&(o.value.value="")}return j(l,()=>{if(!e.hideSelected&&l.value&&h.value.length){const f=R.value.findIndex(s=>h.value.some(k=>e.valueComparator(k.value,s.value)));ve&&window.requestAnimationFrame(()=>{var s;f>=0&&((s=d.value)==null||s.scrollToIndex(f))})}}),j(R,(f,s)=>{c.value&&(!f.length&&e.hideNoData&&(l.value=!1),!s.length&&f.length&&(l.value=!0))}),Z(()=>{const f=!!(e.chips||t.chip),s=!!(!e.hideNoData||R.value.length||t["prepend-item"]||t["append-item"]||t["no-data"]),k=h.value.length>0,m=Te.filterProps(e),p=k||!c.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return u(Te,H({ref:o},m,{modelValue:h.value.map(V=>V.props.value).join(", "),"onUpdate:modelValue":J,focused:c.value,"onUpdate:focused":V=>c.value=V,validationValue:h.externalValue,counterValue:I.value,dirty:k,class:["v-select",{"v-select--active-menu":l.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":h.value.length,"v-select--selection-slot":!!t.selection},e.class],style:e.style,inputmode:"none",placeholder:p,"onClick:clear":G,"onMousedown:control":U,onBlur:F,onKeydown:q,"aria-label":n(P.value),title:n(P.value)}),{...t,default:()=>u(le,null,[u(Ll,H({ref:i,modelValue:l.value,"onUpdate:modelValue":V=>l.value=V,activator:"parent",contentClass:"v-select__content",disabled:N.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:L},X.value),{default:()=>[s&&u(Ml,H({ref:S,selected:x.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:V=>V.preventDefault(),onKeydown:E,onFocusin:ie,onScrollPassive:O,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var V,T,A;return[(V=t["prepend-item"])==null?void 0:V.call(t),!R.value.length&&!e.hideNoData&&(((T=t["no-data"])==null?void 0:T.call(t))??u(we,{title:n(e.noDataText)},null)),u(ct,{ref:d,renderless:!0,items:R.value},{default:M=>{var ke;let{item:B,index:oe,itemRef:ae}=M;const Se=H(B.props,{ref:ae,key:oe,onClick:()=>K(B)});return((ke=t.item)==null?void 0:ke.call(t,{item:B,index:oe,props:Se}))??u(we,H(Se,{role:"option"}),{prepend:ll=>{let{isSelected:tl}=ll;return u(le,null,[e.multiple&&!e.hideSelected?u(Xl,{key:B.value,modelValue:tl,ripple:!1,tabindex:"-1"},null):void 0,B.props.prependAvatar&&u(ge,{image:B.props.prependAvatar},null),B.props.prependIcon&&u(Y,{icon:B.props.prependIcon},null)])}})}}),(A=t["append-item"])==null?void 0:A.call(t)]}})]}),h.value.map((V,T)=>{function A(ae){ae.stopPropagation(),ae.preventDefault(),K(V)}const M={"onClick:close":A,onMousedown(ae){ae.preventDefault(),ae.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},B=f?!!t.chip:!!t.selection,oe=B?Hl(f?t.chip({item:V,index:T,props:M}):t.selection({item:V,index:T})):void 0;if(!(B&&!oe))return u("div",{key:V.value,class:"v-select__selection"},[f?t.chip?u(ue,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:V.title}}},{default:()=>[oe]}):u(et,H({key:"chip",closable:e.closableChips,size:"small",text:V.title,disabled:V.props.disabled},M),null):oe??u("span",{class:"v-select__selection-text"},[V.title,e.multiple&&T<h.value.length-1&&u("span",{class:"v-select__selection-comma"},[Gl(",")])])])})]),"append-inner":function(){var M;for(var V=arguments.length,T=new Array(V),A=0;A<V;A++)T[A]=arguments[A];return u(le,null,[(M=t["append-inner"])==null?void 0:M.call(t,...T),e.menuIcon?u(Y,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})}),De({isFocused:c,menu:l,select:K},o)}});export{yt as V,ht as a,ct as b,Xl as c,et as d,Ze as e,Ae as f,Qe as g,gt as h,dt as m,rt as u};
