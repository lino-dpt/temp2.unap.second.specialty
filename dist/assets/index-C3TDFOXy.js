import{d as B,r as l,o as C,m as y,b as e,w as o,n as z,F as S,$ as w,x as $,z as k,c as F,a3 as T,i as U,t as D,a as R,h as d,f as G}from"./index-B7ut9uUa.js";import{V as _,a as M,b as A,f as j,c as E}from"./VCard-BwfAOomv.js";import{V as L}from"./VDataTableServer-DxyzUbdO.js";import{a as q}from"./VSelect-YZOlI_oo.js";import{V as H}from"./VTextField-IiyxZgeX.js";import{V as J}from"./VForm-U5a06aI8.js";import{V as K}from"./VCombobox-Cup0r6mf.js";import"./filter-b54OYVjt.js";const O={class:"d-flex"},se=B({__name:"index",setup(Q){const u=l(!1),c=l(!1),g=l([]),v=l(10),f=l(0),V=l([]),p=l(""),I=l(null),P=l([]),n=l(!1),x=l(null),h=async({page:m,itemsPerPage:t,sortBy:a,search:r})=>{if(u.value=!0,r=r===null?"":r,r.length<3&&r.length>0){u.value=!1;return}let i=await(await w.post("https://data.segundas.unap.edu.pe/api/postulants/list",{page:m,itemsPerPage:t,sortBy:a,search:r},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).data;g.value=i.headers,f.value=i.items.total,V.value=i.items.data,I.value=i.role,P.value=i.academicsPrograms,u.value=!1},s=l({programId:null,postulantId:null}),b=l(null),N=async()=>{let m=b.value,{valid:t}=await x.value.validate();if(!t)return;c.value=!0,n.value=!0,s.value.postulantId=m.Id;let a=await w.post("https://data.segundas.unap.edu.pe/api/update-academic-program",s.value,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});console.log(a.data),a.data&&(n.value=!1,s.value.programId=null,s.value.postulantId=null,await h({page:1,itemsPerPage:10,sortBy:[],search:""})),c.value=!1};return(m,t)=>(C(),y(S,null,[e(z,null,{default:o(()=>[e($,{subtitle:"Gestion de postulantes",title:"Postulantes"}),e(k)]),_:1}),e(_,{rounded:"0",elevation:"0",class:"bg-light border"},{default:o(()=>[e(M,{class:"pa-2"},{default:o(()=>[e(A,{cols:"6"}),e(A,{cols:"6"},{default:o(()=>[e(H,{modelValue:p.value,"onUpdate:modelValue":t[0]||(t[0]=a=>p.value=a),label:"Buscar"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(L,{class:"border","items-per-page":v.value,"onUpdate:itemsPerPage":t[1]||(t[1]=a=>v.value=a),headers:g.value,"items-length":f.value,items:V.value,loading:u.value,search:p.value,"item-value":"Name","no-data-text":"No se encontraron registros","items-per-page-text":"Registros por página","loading-text":"Cargando registros","multi-sort":"","items-per-page-options":[5,10,25,50],"onUpdate:options":h},{"item.AcademicProgramName":o(({item:a})=>[I.value==="ADMIN"?(C(),F(d,{key:0,onClick:r=>(n.value=!0,b.value=a),color:"surface-variant",variant:"flat",icon:"mdi-swap-horizontal",size:"small",class:"mr-2"},null,8,["onClick"])):T("",!0),U(" "+D(a.AcademicProgramName),1)]),"item.actions":o(({item:a})=>[R("div",O,[e(d,{icon:"mdi-plus",size:"small",color:"primary",variant:"tonal",link:"",to:`/a/postulants/show/${a.Id}/generals`},null,8,["to"])])]),_:2},1032,["items-per-page","headers","items-length","items","loading","search"]),e(q,{"max-width":"500",persistent:"",modelValue:n.value,"onUpdate:modelValue":t[4]||(t[4]=a=>n.value=a)},{default:o(()=>[e(J,{onSubmit:G(N,["prevent"]),ref_key:"formRef",ref:x},{default:o(()=>[e(_,{title:"Actualizar programa académico",loading:c.value},{default:o(()=>[e(j,null,{default:o(()=>[e(K,{modelValue:s.value.programId,"onUpdate:modelValue":t[2]||(t[2]=a=>s.value.programId=a),items:P.value,"item-title":"Name","item-value":"Id",label:"Programa académico","return-object":!1,rules:[()=>!!s.value.programId||"Seleccione un programa académico"],outlined:"",dense:""},null,8,["modelValue","items","rules"])]),_:1}),e(E,null,{default:o(()=>[e(d,{variant:"tonal",text:"Cancelar",color:"red",onClick:t[3]||(t[3]=a=>n.value=!1),class:"px-4"}),e(k),e(d,{type:"submit",text:"Guardar"})]),_:1})]),_:1},8,["loading"])]),_:1},512)]),_:1},8,["modelValue"])],64))}});export{se as default};