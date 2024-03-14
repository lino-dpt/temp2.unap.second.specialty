import{$ as Se,ah as he,B as Q,a0 as Te,ai as Pe,aj as me,ak as we,al as Ie,am as Ae,an as Be,ao as Ee,ap as ve,aq as $e,ar as De,E as Z,I as fe,J as N,as as Fe,at as Ue,au as ye,av as ze,aw as Ge,ax as Le,ay as Ne,az as Re,L as be,aA as P,G as Me,b as e,aB as Oe,q as L,U as te,h as p,R as W,d as ee,s as ge,r as _,o as v,m as I,c as A,w as t,e as j,i,n as X,z as O,ad as je,x as w,S as Ye,t as y,f as le,F,aC as qe,a as He,ab as $,aa as D,p as K,a3 as Xe,C as Je,aD as We,P as pe,X as Ke,aE as Qe,aF as Ze,aG as ea,aH as aa,aI as ta,aJ as la,g as na}from"./index-B7ut9uUa.js";import{V as x,b as k,a as J,e as ne,c as oe}from"./VCard-BwfAOomv.js";import{V as se}from"./VForm-U5a06aI8.js";import{V as oa,a as ie,i as sa,j as re}from"./VSelect-YZOlI_oo.js";import{V as ue}from"./VTextField-IiyxZgeX.js";const ia="https://data.segundas.unap.edu.pe/api",R=Se.create({baseURL:ia,headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")}}),de=async a=>(await R.get("postulants/generals/"+a)).data,ra=async a=>(await R.get("postulants/evaluation/"+a)).data,ua=async a=>(await R.post("postulants/evaluation",a)).data,ce=async a=>(await R.post("postulants/evaluation-detail",a)).data,da=async a=>(await R.post("postulants/experience/minus",a)).data,ca=async a=>(await R.post("postulants/experience/add",a)).data,ma=he("v-alert-title"),va=["success","info","warning","error"],fa=Q({border:{type:[Boolean,String],validator:a=>typeof a=="boolean"||["top","end","bottom","start"].includes(a)},borderColor:String,closable:Boolean,closeIcon:{type:Te,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:a=>va.includes(a)},...Pe(),...me(),...we(),...Ie(),...Ae(),...Be(),...Ee(),...ve(),...$e(),...De({variant:"flat"})},"VAlert"),ya=Z()({name:"VAlert",props:fa(),emits:{"click:close":a=>!0,"update:modelValue":a=>!0},setup(a,r){let{emit:u,slots:l}=r;const n=fe(a,"modelValue"),o=N(()=>{if(a.icon!==!1)return a.type?a.icon??`$${a.type}`:a.icon}),m=N(()=>({color:a.color??a.type,variant:a.variant})),{themeClasses:c}=Fe(a),{colorClasses:f,colorStyles:b,variantClasses:M}=Ue(m),{densityClasses:S}=ye(a),{dimensionStyles:V}=ze(a),{elevationClasses:U}=Ge(a),{locationStyles:z}=Le(a),{positionClasses:B}=Ne(a),{roundedClasses:G}=Re(a),{textColorClasses:C,textColorStyles:s}=be(P(a,"borderColor")),{t:d}=Me(),E=N(()=>({"aria-label":d(a.closeLabel),onClick(h){n.value=!1,u("click:close",h)}}));return()=>{const h=!!(l.prepend||o.value),Y=!!(l.title||a.title),T=!!(l.close||a.closable);return n.value&&e(a.tag,{class:["v-alert",a.border&&{"v-alert--border":!!a.border,[`v-alert--border-${a.border===!0?"start":a.border}`]:!0},{"v-alert--prominent":a.prominent},c.value,f.value,S.value,U.value,B.value,G.value,M.value,a.class],style:[b.value,V.value,z.value,a.style],role:"alert"},{default:()=>{var q,H;return[Oe(!1,"v-alert"),a.border&&e("div",{key:"border",class:["v-alert__border",C.value],style:s.value},null),h&&e("div",{key:"prepend",class:"v-alert__prepend"},[l.prepend?e(te,{key:"prepend-defaults",disabled:!o.value,defaults:{VIcon:{density:a.density,icon:o.value,size:a.prominent?44:28}}},l.prepend):e(L,{key:"prepend-icon",density:a.density,icon:o.value,size:a.prominent?44:28},null)]),e("div",{class:"v-alert__content"},[Y&&e(ma,{key:"title"},{default:()=>{var g;return[((g=l.title)==null?void 0:g.call(l))??a.title]}}),((q=l.text)==null?void 0:q.call(l))??a.text,(H=l.default)==null?void 0:H.call(l)]),l.append&&e("div",{key:"append",class:"v-alert__append"},[l.append()]),T&&e("div",{key:"close",class:"v-alert__close"},[l.close?e(te,{key:"close-defaults",defaults:{VBtn:{icon:a.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var g;return[(g=l.close)==null?void 0:g.call(l,{props:E.value})]}}):e(p,W({key:"close-btn",icon:a.closeIcon,size:"x-small",variant:"text"},E.value),null)])]}})}}}),ba=ee({__name:"TabCv",setup(a){const r=ge(),u=_({indicator:null,description:"",criteria:1,evaluationId:null}),l=_({indicator:{id:3,name:"Certificación",score:1},description:"Años de Experiencia",criteria:2,evaluationId:null}),n=_({indicator:{id:4,name:"Certificación",score:.25},description:"",criteria:3,evaluationId:null}),o=_(!1),m=_(!1),c=_(null),f=_([{id:1,name:"Título profesional",score:8},{id:2,name:"Maestría",score:2}]),b=_([{id:1,name:"Formación académica",description:"Formación académica",maxScore:20},{id:2,name:"Experiencia laboral",description:"Experiencia laboral",maxScore:20},{id:3,name:"Capacitaciones",description:"Formación profesional",maxScore:20}]),M=async()=>{let C=await ra(r.params.id);c.value=C||null},S=async()=>{let C={postulantId:r.params.id,callId:1},s=await ua(C);c.value=s?s.evaluacion:null},V=async()=>{try{u.value.evaluationId=c.value.Id,await ce(u.value),o.value=!1}catch{alert("Ocurrio un error")}},U=async()=>{try{n.value.evaluationId=c.value.Id,await ce(n.value),o.value=!1}catch{}},z=async()=>{l.value.evaluationId=c.value.Id,await ca(l.value)},B=async()=>{l.value.evaluationId=c.value.Id,await da(l.value)};return(async()=>{await M()})(),(C,s)=>(v(),I(F,null,[c.value===null?(v(),A(x,{key:0,class:"text-center mx-auto my-5",width:"300"},{default:t(()=>[e(j,null,{default:t(()=>[e(ya,{type:"info",variant:"text",class:"mb-5"},{default:t(()=>[i(" Aún no se ha iniciado la evaluación ")]),_:1}),e(p,{block:"",onClick:S},{default:t(()=>[i(" Iniciar Evaluación ")]),_:1})]),_:1})]),_:1})):(v(),A(J,{key:1},{default:t(()=>[e(k,{cols:"12"},{default:t(()=>[e(x,{rounded:"0",elevation:"0"},{default:t(()=>[e(X,{density:"compact",title:b.value[0].name},{default:t(()=>[e(O),e(p,{icon:"",onClick:s[0]||(s[0]=d=>o.value=!0)},{default:t(()=>[e(L,null,{default:t(()=>[i("mdi-plus")]),_:1})]),_:1})]),_:1},8,["title"]),e(je),e(j)]),_:1})]),_:1}),e(k,{cols:"12"},{default:t(()=>[e(x,{rounded:"0",elevation:"0"},{default:t(()=>[e(X,{density:"compact",title:b.value[0].name},{default:t(()=>[e(O)]),_:1},8,["title"]),e(w,{class:"my-3",title:"Año(s) de experiencia"},{prepend:t(()=>[e(Ye,null,{default:t(()=>[i(y(0))]),_:1})]),append:t(()=>[e(p,{icon:"",variant:"tonal",color:"blue",onClick:z},{default:t(()=>[e(L,null,{default:t(()=>[i("mdi-plus")]),_:1})]),_:1}),e(p,{icon:"",variant:"tonal",color:"black",onClick:B},{default:t(()=>[e(L,null,{default:t(()=>[i("mdi-minus")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(k,{cols:"12"},{default:t(()=>[e(x,{rounded:"0",elevation:"0"},{default:t(()=>[e(X,{density:"compact",title:b.value[2].name},{default:t(()=>[e(O),e(p,{icon:"",onClick:s[1]||(s[1]=d=>m.value=!0)},{default:t(()=>[e(L,null,{default:t(()=>[i("mdi-plus")]),_:1})]),_:1})]),_:1},8,["title"])]),_:1})]),_:1})]),_:1})),e(ie,{modelValue:o.value,"onUpdate:modelValue":s[5]||(s[5]=d=>o.value=d),"max-width":"600"},{default:t(()=>[e(se,{ref:"formAddFA","lazy-validation":"",onSubmit:le(V,["prevent"])},{default:t(()=>[e(x,null,{default:t(()=>[e(ne,null,{default:t(()=>[i(" Agregar Formación Académica ")]),_:1}),e(j,null,{default:t(()=>[e(J,null,{default:t(()=>[e(k,{cols:"12"},{default:t(()=>[e(oa,{modelValue:u.value.indicator,"onUpdate:modelValue":s[2]||(s[2]=d=>u.value.indicator=d),label:"Indicador",items:f.value,"item-title":"name","item-value":"id","return-object":!0},null,8,["modelValue","items"])]),_:1}),e(k,{cols:"12"},{default:t(()=>[e(ue,{modelValue:u.value.description,"onUpdate:modelValue":s[3]||(s[3]=d=>u.value.description=d),label:"Descripción"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(oe,null,{default:t(()=>[e(O),e(p,{color:"error",onClick:s[4]||(s[4]=d=>o.value=!1)},{default:t(()=>[i("Cancelar")]),_:1}),e(p,{color:"primary",variant:"flat",type:"submit"},{default:t(()=>[i("Guardar")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1},8,["modelValue"]),e(ie,{modelValue:m.value,"onUpdate:modelValue":s[8]||(s[8]=d=>m.value=d),"max-width":"600"},{default:t(()=>[e(se,{ref:"FormC",onSubmit:le(U,["prevent"])},{default:t(()=>[e(x,null,{default:t(()=>[e(ne,null,{default:t(()=>[i(" Agregar Formación Académica ")]),_:1}),e(j,null,{default:t(()=>[e(J,null,{default:t(()=>[e(k,{cols:"12"},{default:t(()=>[e(ue,{modelValue:n.value.description,"onUpdate:modelValue":s[6]||(s[6]=d=>n.value.description=d),label:"Descripción"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(oe,null,{default:t(()=>[e(O),e(p,{color:"error",onClick:s[7]||(s[7]=d=>m.value=!1)},{default:t(()=>[i("Cancelar")]),_:1}),e(p,{color:"primary",type:"submit",variant:"flat"},{default:t(()=>[i("Guardar")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1},8,["modelValue"])],64))}}),ga=["src"],pa=["src"],_a=ee({__name:"TabGenerals",props:{data:Object},setup(a){return(r,u)=>(v(),I(F,null,[e(X,{dense:""},{default:t(()=>[e(qe,null,{default:t(()=>{var l;return[He("small",null,y((l=a.data)==null?void 0:l.FullName),1)]}),_:1})]),_:1}),e(j,{fluid:""},{default:t(()=>[e(J,null,{default:t(()=>{var l;return[e(k,{cols:"12",lg:"6"},{default:t(()=>[e(x,{title:"Datos Generales",rounded:"0",elevation:"0"},{default:t(()=>[e(w,null,{default:t(()=>[e($,null,{default:t(()=>[i("Nombre Completo")]),_:1}),e(D,null,{default:t(()=>{var n;return[i(y((n=a.data)==null?void 0:n.FullName),1)]}),_:1})]),_:1}),e(w,null,{default:t(()=>[e($,null,{default:t(()=>[i("Fecha de nacimiento")]),_:1}),e(D,null,{default:t(()=>{var n;return[i(y((n=a.data)==null?void 0:n.BirthDate),1)]}),_:1})]),_:1}),e(w,null,{default:t(()=>[e($,null,{default:t(()=>[i("Documento de identidad")]),_:1}),e(D,null,{default:t(()=>{var n,o;return[i(y(((n=a.data)==null?void 0:n.DocumentType)==="001"?"DNI":"CE")+" - "+y((o=a.data)==null?void 0:o.DocumentNumber),1)]}),_:1})]),_:1})]),_:1})]),_:1}),e(k,{cols:"12",lg:"6"},{default:t(()=>[e(x,{title:"Datos del Programa",rounded:"0",elevation:"0"},{default:t(()=>[e(w,null,{default:t(()=>[e($,null,{default:t(()=>[i("Programa academico")]),_:1}),e(D,null,{default:t(()=>{var n;return[i(y((n=a.data)==null?void 0:n.AcademicProgramName),1)]}),_:1})]),_:1})]),_:1})]),_:1}),e(k,{cols:"12",lg:"6"},{default:t(()=>[e(x,{title:"Medios de contacto",rounded:"0",elevation:"0"},{default:t(()=>{var n;return[(v(!0),I(F,null,K((n=a.data)==null?void 0:n.media_contacts,o=>(v(),A(w,{key:o.id},{default:t(()=>[e($,null,{default:t(()=>[i(y(o.Type==="001"?"Correo Personal":"Telefono Personal"),1)]),_:2},1024),e(D,null,{default:t(()=>[i(y(o.Value),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),e(k,{cols:"12",lg:"6"},{default:t(()=>[e(x,{title:"Ubigeos",rounded:"0",elevation:"0"},{default:t(()=>{var n;return[(v(!0),I(F,null,K((n=a.data)==null?void 0:n.places,o=>(v(),A(w,{key:o.id},{default:t(()=>[e($,null,{default:t(()=>[i(y(o.Type==="001"?"Lugar de nacimiento":"Lugar de residencia"),1)]),_:2},1024),e(D,null,{default:t(()=>[i(y(o.Ubigeo)+" - "+y(`${o.UbigeoData.departamento}, ${o.UbigeoData.provincia}, ${o.UbigeoData.distrito}`),1)]),_:2},1024),o.Address?(v(),A(D,{key:0},{default:t(()=>[e(L,null,{default:t(()=>[i("mdi-map-marker")]),_:1}),i(" "+y(o.Address),1)]),_:2},1024)):Xe("",!0)]),_:2},1024))),128))]}),_:1})]),_:1}),(v(!0),I(F,null,K((l=a.data)==null?void 0:l.documents,n=>(v(),A(k,{cols:"12",lg:"6",key:n.id},{default:t(()=>[e(x,{title:n.Type==="001"?"Titulo":"Foto",rounded:"0",elevation:"0"},{default:t(()=>[e(w,null,{default:t(()=>[e($,null,{default:t(()=>[i(y(n.Name),1)]),_:2},1024)]),_:2},1024),n.Type==="001"?(v(),I("embed",{key:0,src:n.Path,type:"application/pdf",width:"100%",height:"300px"},null,8,ga)):(v(),I("img",{key:1,src:n.Path,width:"100%"},null,8,pa))]),_:2},1032,["title"])]),_:2},1024))),128))]}),_:1})]),_:1})],64))}}),_e=Symbol.for("vuetify:v-tabs"),Va=Q({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...Je(We({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),Ve=Z()({name:"VTab",props:Va(),setup(a,r){let{slots:u,attrs:l}=r;const{textColorClasses:n,textColorStyles:o}=be(a,"sliderColor"),m=_(),c=_(),f=N(()=>a.direction==="horizontal"),b=N(()=>{var S,V;return((V=(S=m.value)==null?void 0:S.group)==null?void 0:V.isSelected.value)??!1});function M(S){var U,z;let{value:V}=S;if(V){const B=(z=(U=m.value)==null?void 0:U.$el.parentElement)==null?void 0:z.querySelector(".v-tab--selected .v-tab__slider"),G=c.value;if(!B||!G)return;const C=getComputedStyle(B).color,s=B.getBoundingClientRect(),d=G.getBoundingClientRect(),E=f.value?"x":"y",h=f.value?"X":"Y",Y=f.value?"right":"bottom",T=f.value?"width":"height",q=s[E],H=d[E],g=q>H?s[Y]-d[Y]:s[E]-d[E],Ce=Math.sign(g)>0?f.value?"right":"bottom":Math.sign(g)<0?f.value?"left":"top":"center",xe=(Math.abs(g)+(Math.sign(g)<0?s[T]:d[T]))/Math.max(s[T],d[T])||0,ke=s[T]/d[T]||0,ae=1.5;Qe(G,{backgroundColor:[C,"currentcolor"],transform:[`translate${h}(${g}px) scale${h}(${ke})`,`translate${h}(${g/ae}px) scale${h}(${(xe-1)/ae+1})`,"none"],transformOrigin:Array(3).fill(Ce)},{duration:225,easing:Ze})}}return pe(()=>{const S=p.filterProps(a);return e(p,W({symbol:_e,ref:m,class:["v-tab",a.class],style:a.style,tabindex:b.value?0:-1,role:"tab","aria-selected":String(b.value),active:!1},S,l,{block:a.fixed,maxWidth:a.fixed?300:void 0,"onGroup:selected":M}),{...u,default:()=>{var V;return e(F,null,[((V=u.default)==null?void 0:V.call(u))??a.text,!a.hideSlider&&e("div",{ref:c,class:["v-tab__slider",n.value],style:o.value},null)])}})}),Ke({},m)}});function Ca(a){return a?a.map(r=>la(r)?r:{text:r,value:r}):[]}const xa=Q({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...sa({mandatory:"force"}),...me(),...ve()},"VTabs"),ka=Z()({name:"VTabs",props:xa(),emits:{"update:modelValue":a=>!0},setup(a,r){let{slots:u}=r;const l=fe(a,"modelValue"),n=N(()=>Ca(a.items)),{densityClasses:o}=ye(a),{backgroundColorClasses:m,backgroundColorStyles:c}=ea(P(a,"bgColor"));return aa({VTab:{color:P(a,"color"),direction:P(a,"direction"),stacked:P(a,"stacked"),fixed:P(a,"fixedTabs"),sliderColor:P(a,"sliderColor"),hideSlider:P(a,"hideSlider")}}),pe(()=>{const f=re.filterProps(a);return e(re,W(f,{modelValue:l.value,"onUpdate:modelValue":b=>l.value=b,class:["v-tabs",`v-tabs--${a.direction}`,`v-tabs--align-tabs-${a.alignTabs}`,{"v-tabs--fixed-tabs":a.fixedTabs,"v-tabs--grow":a.grow,"v-tabs--stacked":a.stacked},o.value,m.value,a.class],style:[{"--v-tabs-height":ta(a.height)},c.value,a.style],role:"tablist",symbol:_e}),{default:()=>[u.default?u.default():n.value.map(b=>e(Ve,W(b,{key:b.text}),null))]})}),{}}}),Aa=ee({__name:"show",setup(a){const r=ge(),u=_(r.params.tab),l=_(null),n=async m=>{m==="generals"&&(l.value=await de(r.params.id))};return(async()=>{u.value==="generals"&&(l.value=await de(r.params.id))})(),(m,c)=>(v(),I(F,null,[e(ka,{modelValue:u.value,"onUpdate:modelValue":[c[0]||(c[0]=f=>u.value=f),n],"bg-color":"grey-lighten-3",rounded:"0"},{default:t(()=>[e(Ve,{rounded:"0",link:"",to:`/a/postulants/show/${na(r).params.id}/generals`,value:"generals"},{default:t(()=>[i(" General ")]),_:1},8,["to"])]),_:1},8,["modelValue"]),u.value==="generals"?(v(),A(_a,{key:0,data:l.value},null,8,["data"])):(v(),A(ba,{key:1}))],64))}});export{Aa as default};
