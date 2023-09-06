import{d as v,j as U,o as t,c as r,b as s,t as h,F as w,A as S,q as $,_ as I,L as b,M as k,H as C,I as B,r as x,e as M,f as c,g as L,l as y,N,n as m,O as T,p as D,a as F}from"./index-bfb9ab6c.js";import{I as O}from"./InLineMsg-72f9cb2f.js";import{T as H}from"./TableView-5508a722.js";import{a as E}from"./caseUtils-bfa14604.js";import"./caseRecordsUtils-680177bc.js";const A={class:"customSelectContainer"},G=["selectState"],P={key:0,class:"customSelectOptionDiv"},R=["onClick"],j=v({__name:"CustomSelect",props:{name:{},options:{},isOn:{type:Boolean}},emits:["input"],setup(o){const e=U(!1);return(n,a)=>(t(),r("div",A,[s("button",{class:"normalButton",selectState:e.value,onClick:a[0]||(a[0]=u=>e.value=!e.value)},h(n.$props.name),9,G),e.value===!0?(t(),r("div",P,[(t(!0),r(w,null,S(n.$props.options,(u,l)=>(t(),r("div",{key:l},[s("button",{class:"customSelectOptionButton",onClick:()=>{n.$emit("input",u),e.value=!1}},h(u),9,R)]))),128))])):$("",!0)]))}});const q=I(j,[["__scopeId","data-v-0c2f714d"]]),K={};function z(o,e){return t(),r("div")}const J=I(K,[["render",z]]),{clearCacheByEndpoint:Q}=b();function W(){const o=U(!1);function e(n,a){o.value!==!0&&(o.value=!0,n.stream().getReader().read().then(u=>{B(C.manage.importUsers,u.value,l=>{o.value=!1,l.status===200&&Q(C.manage.viewUsers),a==null||a(l)})}))}return{importUsers:e,isLoading:o}}function X(){return k(C.manage.viewUsers,10)}const Y=s("h3",null,"Import User",-1),Z=s("p",null,"Please select and upload a CSV file to import users",-1),ee=s("p",null,'The CSV file should contain the following columns: "user_first_name", "user_last_name", "directory_id"',-1),te=["onSubmit"],se=s("div",null,[s("input",{id:"importUserFile",type:"file",accept:".csv"})],-1),ne=["disabled","value"],oe=v({__name:"ImportUser",setup(o){const e=x({msg:"",show:!1}),{isLoading:n,importUsers:a}=W();function u(){var i;e.show=!1;const p=(i=document.getElementById("importUserFile").files)==null?void 0:i[0];p&&a(p,d=>{d.status===200?e.msg="Import success":e.msg=d.data??"Import failed",e.show=!0})}return(l,p)=>(t(),r("div",null,[Y,Z,ee,s("form",{onSubmit:L(u,["prevent"])},[se,s("div",null,[M(O,{content:e.msg,show:e.show},null,8,["content","show"]),s("input",{type:"submit",disabled:c(n)===!0,value:c(n)===!1?"Import Users":"Importing"},null,8,ne)])],40,te)]))}}),ae={key:0},ie={key:1},re=["disabled"],le={key:2},ue=v({__name:"ViewUser",setup(o){const{isLoading:e,data:n,getData:a,clearCache:u,hasMore:l}=X();a();const p=y(()=>({title:"Users",headers:["Name","Directory ID","Group","Role"],rows:n.value.map(i=>[{elementType:"text",value:N(i)},{elementType:"text",value:i.did},{elementType:"text",value:i.group_name??""},{elementType:"text",value:i.role}])}));return(i,d)=>(t(),r("div",null,[s("div",null,[c(e)===!0?(t(),r("div",ae,"Fetching Data...")):c(n)&&c(n).length>0?(t(),r("div",ie,[M(H,{"table-config":p.value},null,8,["table-config"]),s("button",{class:"normalButton",onClick:d[0]||(d[0]=(..._)=>c(a)&&c(a)(..._)),disabled:c(l)===!1},h(c(l)?"View more":"No more records"),9,re)])):(t(),r("div",le,"No user data available at this time."))])]))}}),ce=o=>(D("data-v-03ce8872"),o=o(),F(),o),de={id:"manageViewContainer"},pe={id:"manageButtonContainer"},me=ce(()=>s("hr",{class:"lv2Hr"},null,-1)),_e={id:"manageModuleContainer"},ve=v({__name:"ManageView",setup(o){const{isLoading:e,data:n,hasMore:a,getData:u}=E();u();const l=y(()=>e.value===!0?["Loading..."]:n.value.map(d=>d.name)),p=y(()=>[{name:"User Management",options:["View Users","Import Users"]},{name:"Case Management",options:l.value},{name:"System Management",options:["Config"]}]),i=U("");return(d,_)=>(t(),r("div",de,[s("div",pe,[(t(!0),r(w,null,S(p.value,(f,V)=>(t(),m(q,{key:V,name:f.name,options:f.options,"onUpdate:options":g=>f.options=g,onInput:_[0]||(_[0]=g=>{i.value=g})},null,8,["name","options","onUpdate:options"]))),128))]),me,s("div",_e,[(t(),m(T,null,[i.value==="Import Users"?(t(),m(oe,{key:0})):i.value==="View Users"?(t(),m(ue,{key:1})):i.value==="Food center"?(t(),m(J,{key:2})):$("",!0)],1024))])]))}});const Ue=I(ve,[["__scopeId","data-v-03ce8872"]]);export{Ue as default};
