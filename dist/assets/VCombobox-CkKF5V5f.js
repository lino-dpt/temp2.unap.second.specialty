import{m as Ve,u as pe,b as Ce,c as we,d as ke}from"./VSelect-BZE7mBZk.js";import{m as Se,u as Fe,V as Q}from"./VTextField-krJPK6D5.js";import{B as Ie,C as De,D as Pe,E as _e,G as Re,r as N,H as D,I as X,J as x,K as Ae,L as Te,af as O,M as P,N as Y,O as Me,P as Ee,b as o,F as L,Q as Ne,R as I,v as Oe,x as Z,S as Le,q as ee,T as Be,U as Ke,i as Ue,W as je,X as He,Y as qe,ag as ze}from"./index-Cacqs-jI.js";import{m as Ge,u as We}from"./filter-BcHimSdB.js";var el=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ll(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function $e(e,b,_){if(b==null)return e;if(Array.isArray(b))throw new Error("Multiple matches is not implemented");return typeof b=="number"&&~b?o(L,null,[o("span",{class:"v-combobox__unmask"},[e.substr(0,b)]),o("span",{class:"v-combobox__mask"},[e.substr(b,_)]),o("span",{class:"v-combobox__unmask"},[e.substr(b+_)])]):e}const Je=Ie({autoSelectFirst:{type:[Boolean,String]},clearOnSelect:{type:Boolean,default:!0},delimiters:Array,...Ge({filterKeys:["title"]}),...Ve({hideNoData:!0,returnObject:!0}),...De(Se({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...Pe({transition:!1})},"VCombobox"),tl=_e()({name:"VCombobox",props:Je(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:search":e=>!0,"update:menu":e=>!0},setup(e,b){var W;let{emit:_,slots:n}=b;const{t:B}=Re(),V=N(),h=D(!1),p=D(!0),R=D(!1),q=N(),z=N(),K=X(e,"menu"),r=x({get:()=>K.value,set:l=>{var a;K.value&&!l&&((a=q.value)!=null&&a.ΨopenChildren)||(K.value=l)}}),i=D(-1);let U=!1;const le=x(()=>{var l;return(l=V.value)==null?void 0:l.color}),G=x(()=>r.value?e.closeText:e.openText),{items:te,transformIn:ae,transformOut:ne}=Ae(e),{textColorClasses:ue,textColorStyles:oe}=Te(le),u=X(e,"modelValue",[],l=>ae(qe(l)),l=>{const a=ne(l);return e.multiple?a:a[0]??null}),S=Fe(),F=D(e.multiple?"":((W=u.value[0])==null?void 0:W.title)??""),c=x({get:()=>F.value,set:l=>{var a;if(F.value=l??"",e.multiple||(u.value=[O(e,l)]),l&&e.multiple&&((a=e.delimiters)!=null&&a.length)){const s=l.split(new RegExp(`(?:${e.delimiters.join("|")})+`));s.length>1&&(s.forEach(d=>{d=d.trim(),d&&g(O(e,d))}),F.value="")}l||(i.value=-1),p.value=!l}}),ie=x(()=>typeof e.counterValue=="function"?e.counterValue(u.value):typeof e.counterValue=="number"?e.counterValue:e.multiple?u.value.length:c.value.length);P(F,l=>{U?Y(()=>U=!1):h.value&&!r.value&&(r.value=!0),_("update:search",l)}),P(u,l=>{var a;e.multiple||(F.value=((a=l[0])==null?void 0:a.title)??"")});const{filteredItems:A,getMatches:se}=We(e,te,()=>p.value?"":c.value),m=x(()=>e.hideSelected?A.value.filter(l=>!u.value.some(a=>a.value===l.value)):A.value),re=x(()=>u.value.map(l=>l.value)),T=x(()=>{var a;return(e.autoSelectFirst===!0||e.autoSelectFirst==="exact"&&c.value===((a=m.value[0])==null?void 0:a.title))&&m.value.length>0&&!p.value&&!R.value}),j=x(()=>e.hideNoData&&!m.value.length||e.readonly||(S==null?void 0:S.isReadonly.value)),H=N(),{onListScroll:ce,onListKeydown:ve}=pe(H,V);function de(l){U=!0,e.openOnClear&&(r.value=!0)}function fe(){j.value||(r.value=!0)}function me(l){j.value||(h.value&&(l.preventDefault(),l.stopPropagation()),r.value=!r.value)}function be(l){var d;if(ze(l)||e.readonly||S!=null&&S.isReadonly.value)return;const a=V.value.selectionStart,s=u.value.length;if((i.value>-1||["Enter","ArrowDown","ArrowUp"].includes(l.key))&&l.preventDefault(),["Enter","ArrowDown"].includes(l.key)&&(r.value=!0),["Escape"].includes(l.key)&&(r.value=!1),["Enter","Escape","Tab"].includes(l.key)&&(T.value&&["Enter","Tab"].includes(l.key)&&g(A.value[0]),p.value=!0),l.key==="ArrowDown"&&T.value&&((d=H.value)==null||d.focus("next")),!!e.multiple){if(["Backspace","Delete"].includes(l.key)){if(i.value<0){l.key==="Backspace"&&!c.value&&(i.value=s-1);return}const t=i.value,v=u.value[i.value];v&&!v.props.disabled&&g(v,!1),i.value=t>=s-1?s-2:t}if(l.key==="ArrowLeft"){if(i.value<0&&a>0)return;const t=i.value>-1?i.value-1:s-1;u.value[t]?i.value=t:(i.value=-1,V.value.setSelectionRange(c.value.length,c.value.length))}if(l.key==="ArrowRight"){if(i.value<0)return;const t=i.value+1;u.value[t]?i.value=t:(i.value=-1,V.value.setSelectionRange(0,0))}l.key==="Enter"&&c.value&&(g(O(e,c.value)),c.value="")}}function he(){var l;h.value&&(p.value=!0,(l=V.value)==null||l.focus())}function g(l){let a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(e.multiple){const s=u.value.findIndex(t=>e.valueComparator(t.value,l.value)),d=a??!~s;if(~s){const t=d?[...u.value,l]:[...u.value];t.splice(s,1),u.value=t}else d&&(u.value=[...u.value,l]);e.clearOnSelect&&(c.value="")}else{const s=a!==!1;u.value=s?[l]:[],F.value=s?l.title:"",Y(()=>{r.value=!1,p.value=!0})}}function ge(l){h.value=!0,setTimeout(()=>{R.value=!0})}function ye(l){R.value=!1}function xe(l){(l==null||l===""&&!e.multiple)&&(u.value=[])}return P(h,(l,a)=>{l||l===a||(i.value=-1,r.value=!1,T.value&&!R.value&&!u.value.some(s=>{let{value:d}=s;return d===m.value[0].value})?g(m.value[0]):e.multiple&&c.value&&g(O(e,c.value)))}),P(r,()=>{if(!e.hideSelected&&r.value&&u.value.length){const l=m.value.findIndex(a=>u.value.some(s=>e.valueComparator(s.value,a.value)));Me&&window.requestAnimationFrame(()=>{var a;l>=0&&((a=z.value)==null||a.scrollToIndex(l))})}}),P(m,(l,a)=>{h.value&&(!l.length&&e.hideNoData&&(r.value=!1),!a.length&&l.length&&(r.value=!0))}),Ee(()=>{const l=!!(e.chips||n.chip),a=!!(!e.hideNoData||m.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),s=u.value.length>0,d=Q.filterProps(e);return o(Q,I({ref:V},d,{modelValue:c.value,"onUpdate:modelValue":[t=>c.value=t,xe],focused:h.value,"onUpdate:focused":t=>h.value=t,validationValue:u.externalValue,counterValue:ie.value,dirty:s,class:["v-combobox",{"v-combobox--active-menu":r.value,"v-combobox--chips":!!e.chips,"v-combobox--selection-slot":!!n.selection,"v-combobox--selecting-index":i.value>-1,[`v-combobox--${e.multiple?"multiple":"single"}`]:!0},e.class],style:e.style,readonly:e.readonly,placeholder:s?void 0:e.placeholder,"onClick:clear":de,"onMousedown:control":fe,onKeydown:be}),{...n,default:()=>o(L,null,[o(Ne,I({ref:q,modelValue:r.value,"onUpdate:modelValue":t=>r.value=t,activator:"parent",contentClass:"v-combobox__content",disabled:j.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:he},e.menuProps),{default:()=>[a&&o(Oe,I({ref:H,selected:re.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:t=>t.preventDefault(),onKeydown:ve,onFocusin:ge,onFocusout:ye,onScrollPassive:ce,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var t,v,y;return[(t=n["prepend-item"])==null?void 0:t.call(n),!m.value.length&&!e.hideNoData&&(((v=n["no-data"])==null?void 0:v.call(n))??o(Z,{title:B(e.noDataText)},null)),o(Ce,{ref:z,renderless:!0,items:m.value},{default:C=>{var J;let{item:f,index:w,itemRef:k}=C;const $=I(f.props,{ref:k,key:w,active:T.value&&w===0?!0:void 0,onClick:()=>g(f,null)});return((J=n.item)==null?void 0:J.call(n,{item:f,index:w,props:$}))??o(Z,I($,{role:"option"}),{prepend:M=>{let{isSelected:E}=M;return o(L,null,[e.multiple&&!e.hideSelected?o(we,{key:f.value,modelValue:E,ripple:!1,tabindex:"-1"},null):void 0,f.props.prependAvatar&&o(Le,{image:f.props.prependAvatar},null),f.props.prependIcon&&o(ee,{icon:f.props.prependIcon},null)])},title:()=>{var M,E;return p.value?f.title:$e(f.title,(M=se(f))==null?void 0:M.title,((E=c.value)==null?void 0:E.length)??0)}})}}),(y=n["append-item"])==null?void 0:y.call(n)]}})]}),u.value.map((t,v)=>{function y(k){k.stopPropagation(),k.preventDefault(),g(t,!1)}const C={"onClick:close":y,onMousedown(k){k.preventDefault(),k.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},f=l?!!n.chip:!!n.selection,w=f?Be(l?n.chip({item:t,index:v,props:C}):n.selection({item:t,index:v})):void 0;if(!(f&&!w))return o("div",{key:t.value,class:["v-combobox__selection",v===i.value&&["v-combobox__selection--selected",ue.value]],style:v===i.value?oe.value:{}},[l?n.chip?o(Ke,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:t.title}}},{default:()=>[w]}):o(ke,I({key:"chip",closable:e.closableChips,size:"small",text:t.title,disabled:t.props.disabled},C),null):w??o("span",{class:"v-combobox__selection-text"},[t.title,e.multiple&&v<u.value.length-1&&o("span",{class:"v-combobox__selection-comma"},[Ue(",")])])])})]),"append-inner":function(){var C;for(var t=arguments.length,v=new Array(t),y=0;y<t;y++)v[y]=arguments[y];return o(L,null,[(C=n["append-inner"])==null?void 0:C.call(n,...v),(!e.hideNoData||e.items.length)&&e.menuIcon?o(ee,{class:"v-combobox__menu-icon",icon:e.menuIcon,onMousedown:me,onClick:je,"aria-label":B(G.value),title:B(G.value)},null):void 0])}})}),He({isFocused:h,isPristine:p,menu:r,search:c,selectionIndex:i,filteredItems:A,select:g},V)}});export{tl as V,el as c,ll as g};
