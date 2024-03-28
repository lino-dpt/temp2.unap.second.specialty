import{d as j,r as p,o as i,l as x,b as e,w as a,n as K,e as Q,F as N,p as W,a as X,t as r,i as d,h as _,y,ac as S,ab as V,m as M,f as A,B as P,a0 as h,c as U,q,a4 as Y,v as Z,g as ee}from"./index-Cpba7QVi.js";import{V as ae,g as le,a as te,_ as ue}from"./VTabs-Bfc2lLLG.js";import{V as L}from"./VChip-CJF47lsE.js";import{V as G,a as s}from"./VRow-D9NjwHaF.js";import{V as C,d as oe,c as R}from"./VCard-BeaLY7Br.js";import{V as z}from"./VForm-CuMe0f8B.js";import{V as v}from"./VTextField-BMsZ9TUb.js";import{V as de}from"./VSelect-DZIe-0_3.js";import"./VInput-DEMVTei1.js";const ne=j({__name:"TabGeneralsEdit",props:{data:Object},emits:["onUpdate"],setup(m,{emit:k}){var I;const T=k,n=m,D=p(null),w=p(null),b=p(!1),f=p(!1),g=p({Id:null,Type:null,Value:null,Status:null,PostulantId:null}),o=p({id:(I=n.data)==null?void 0:I.Id,name:null,fatherSurname:null,motherSurname:null,marriedSurname:null,birthDate:null,documentType:null,documentNumber:null}),O=async()=>{var c,t,l,u,E,$,B,F;o.value={id:(c=n.data)==null?void 0:c.Id,name:(t=n.data)==null?void 0:t.Name,fatherSurname:(l=n.data)==null?void 0:l.FatherSurname,motherSurname:(u=n.data)==null?void 0:u.MotherSurname,marriedSurname:(E=n.data)==null?void 0:E.MarriedSurname,birthDate:($=n.data)==null?void 0:$.BirthDate,documentType:(B=n.data)==null?void 0:B.DocumentType,documentNumber:(F=n.data)==null?void 0:F.DocumentNumber}},H=async()=>{console.log(o.value);let{valid:c}=await D.value.validate();if(!c)return;console.log(o.value);let t=await h.post("https://data.segundas.unap.edu.pe/api/postulants/update-generals",o.value,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});t.data===!0?(b.value=!1,T("onUpdate",!0)):alert(t.data.details)},J=async()=>{let{valid:c}=await w.value.validate();if(!c)return;let t=await h.post("https://data.segundas.unap.edu.pe/api/postulants/update-media-contacts/",g.value,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});t.data===!0?(f.value=!1,T("onUpdate",!0)):alert(t.data.details)};return(c,t)=>(i(),x(N,null,[e(K,{dense:""},{default:a(()=>[e(W,null,{default:a(()=>{var l;return[X("small",null,r((l=m.data)==null?void 0:l.FullName),1)]}),_:1})]),_:1}),e(Q,{fluid:""},{default:a(()=>[e(G,null,{default:a(()=>[e(s,{cols:"12",lg:"6"},{default:a(()=>[e(C,{rounded:"0",elevation:"0"},{default:a(()=>[e(oe,{class:"d-flex justify-space-between"},{default:a(()=>[d(" Datos Generales "),e(_,{"prepend-icon":"mdi-pencil",variant:"tonal",color:"primary",onClick:t[0]||(t[0]=l=>(b.value=!0,O()))},{default:a(()=>[d(" Editar ")]),_:1})]),_:1}),e(y,null,{default:a(()=>[e(S,null,{default:a(()=>[d("Nombre Completo")]),_:1}),e(V,null,{default:a(()=>{var l;return[d(r((l=m.data)==null?void 0:l.FullName),1)]}),_:1})]),_:1}),e(y,null,{default:a(()=>[e(S,null,{default:a(()=>[d("Fecha de nacimiento")]),_:1}),e(V,null,{default:a(()=>{var l;return[d(r((l=m.data)==null?void 0:l.BirthDate),1)]}),_:1})]),_:1}),e(y,null,{default:a(()=>[e(S,null,{default:a(()=>[d("Documento de identidad")]),_:1}),e(V,null,{default:a(()=>{var l,u;return[d(r(((l=m.data)==null?void 0:l.DocumentType)==="001"?"DNI":"CE")+" - "+r((u=m.data)==null?void 0:u.DocumentNumber),1)]}),_:1})]),_:1})]),_:1})]),_:1}),e(s,{cols:"12",lg:"6"},{default:a(()=>[e(C,{title:"Datos del Programa",rounded:"0",elevation:"0"},{default:a(()=>[e(y,null,{default:a(()=>[e(S,null,{default:a(()=>[d("Programa academico")]),_:1}),e(V,null,{default:a(()=>{var l;return[d(r((l=m.data)==null?void 0:l.AcademicProgramName),1)]}),_:1})]),_:1})]),_:1})]),_:1}),e(s,{cols:"12",lg:"6"},{default:a(()=>[e(C,{title:"Medios de contacto",rounded:"0",elevation:"0"},{default:a(()=>{var l;return[(i(!0),x(N,null,M((l=m.data)==null?void 0:l.media_contacts,u=>(i(),U(y,{key:u.id},{append:a(()=>[e(_,{variant:"tonal",size:"small",icon:"",color:"primary",onClick:E=>(f.value=!0,g.value=u)},{default:a(()=>[e(q,null,{default:a(()=>[d("mdi-pencil")]),_:1})]),_:2},1032,["onClick"])]),default:a(()=>[e(S,null,{default:a(()=>[d(r(u.Type==="001"?"Correo Personal":"Telefono Personal"),1)]),_:2},1024),e(V,null,{default:a(()=>[d(r(u.Value),1)]),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1}),e(s,{cols:"12",lg:"6"},{default:a(()=>[e(C,{title:"Ubigeos",rounded:"0",elevation:"0"},{default:a(()=>{var l;return[(i(!0),x(N,null,M((l=m.data)==null?void 0:l.places,u=>(i(),U(y,{key:u.id},{default:a(()=>[e(S,null,{default:a(()=>[d(r(u.Type==="001"?"Lugar de nacimiento":"Lugar de residencia"),1)]),_:2},1024),e(V,null,{default:a(()=>[d(r(u.Ubigeo)+" - "+r(`${u.UbigeoData.departamento}, ${u.UbigeoData.provincia}, ${u.UbigeoData.distrito}`),1)]),_:2},1024),u.Address?(i(),U(V,{key:0},{default:a(()=>[e(q,null,{default:a(()=>[d("mdi-map-marker")]),_:1}),d(" "+r(u.Address),1)]),_:2},1024)):Y("",!0)]),_:2},1024))),128))]}),_:1})]),_:1})]),_:1})]),_:1}),e(L,{modelValue:b.value,"onUpdate:modelValue":t[9]||(t[9]=l=>b.value=l),width:"auto"},{default:a(()=>[e(z,{ref_key:"formGenerals",ref:D,onSubmit:A(H,["prevent"])},{default:a(()=>[e(C,{"max-width":"600","prepend-icon":"mdi-pencil",title:"Editar datos generales"},{actions:a(()=>[e(_,{color:"red",variant:"tonal",class:"ms-auto px-4",text:"cancelar",onClick:t[8]||(t[8]=l=>b.value=!1)}),e(P),e(_,{type:"submit",class:"ms-auto px-4",text:"guardar"})]),default:a(()=>[e(R,null,{default:a(()=>[e(G,null,{default:a(()=>[e(s,{cols:"12"},{default:a(()=>[e(v,{modelValue:o.value.name,"onUpdate:modelValue":t[1]||(t[1]=l=>o.value.name=l),label:"Nombre completo",rules:[l=>!!l||"El nombre es requerido"]},null,8,["modelValue","rules"])]),_:1}),e(s,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:o.value.fatherSurname,"onUpdate:modelValue":t[2]||(t[2]=l=>o.value.fatherSurname=l),label:"Apellido paterno",rules:[l=>!!l||"El nombre es requerido"]},null,8,["modelValue","rules"])]),_:1}),e(s,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:o.value.motherSurname,"onUpdate:modelValue":t[3]||(t[3]=l=>o.value.motherSurname=l),label:"Apellido materno"},null,8,["modelValue"])]),_:1}),e(s,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:o.value.marriedSurname,"onUpdate:modelValue":t[4]||(t[4]=l=>o.value.marriedSurname=l),label:"Apellido de casada"},null,8,["modelValue"])]),_:1}),e(s,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:o.value.birthDate,"onUpdate:modelValue":t[5]||(t[5]=l=>o.value.birthDate=l),label:"Fecha de nacimiento",rules:[l=>!!l||"El nombre es requerido"],type:"date"},null,8,["modelValue","rules"])]),_:1}),e(s,{cols:"12",md:"6"},{default:a(()=>[e(de,{disabled:!0,modelValue:o.value.documentType,"onUpdate:modelValue":t[6]||(t[6]=l=>o.value.documentType=l),items:[{title:"DNI",value:"001"},{title:"CE",value:"004"}],label:"Tipo de documento",rules:[l=>!!l||"El nombre es requerido"]},null,8,["modelValue","rules"])]),_:1}),e(s,{cols:"12",md:"6"},{default:a(()=>[e(v,{disabled:!0,modelValue:o.value.documentNumber,"onUpdate:modelValue":t[7]||(t[7]=l=>o.value.documentNumber=l),label:"Número de documento",rules:[l=>!!l||"El nombre es requerido"]},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1},8,["modelValue"]),e(L,{modelValue:f.value,"onUpdate:modelValue":t[12]||(t[12]=l=>f.value=l),width:"400"},{default:a(()=>[e(z,{ref_key:"formMediaContactsRef",ref:w,onSubmit:A(J,["prevent"])},{default:a(()=>[e(C,{"max-width":"600","prepend-icon":"mdi-pencil",title:"Editar medio de contacto"},{actions:a(()=>[e(_,{color:"red",variant:"tonal",class:"ms-auto px-4",text:"cancelar",onClick:t[11]||(t[11]=l=>f.value=!1)}),e(P),e(_,{type:"submit",class:"ms-auto px-4",text:"guardar"})]),default:a(()=>[e(R,null,{default:a(()=>[e(G,null,{default:a(()=>[e(s,{cols:"12"},{default:a(()=>[e(v,{modelValue:g.value.Value,"onUpdate:modelValue":t[10]||(t[10]=l=>g.value.Value=l),label:"Value",rules:[l=>!!l||"El nombre es requerido"]},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1},8,["modelValue"])],64))}}),be=j({__name:"edit",setup(m){const k=Z(),T=p(null),n=p("generals"),D=async()=>{T.value=await le(k.params.id)};return(async()=>{await D()})(),(b,f)=>(i(),x(N,null,[e(ae,{modelValue:n.value,"onUpdate:modelValue":f[0]||(f[0]=g=>n.value=g),"bg-color":"grey-lighten-3",rounded:"0"},{default:a(()=>[e(te,{rounded:"0",link:"",to:`/a/postulants/show/${ee(k).params.id}/generals`,value:"generals"},{default:a(()=>[d(" General ")]),_:1},8,["to"])]),_:1},8,["modelValue"]),n.value==="generals"?(i(),U(ne,{key:0,data:T.value,onOnUpdate:D},null,8,["data"])):(i(),U(ue,{key:1}))],64))}});export{be as default};