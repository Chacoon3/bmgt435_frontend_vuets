import{d as g,u as F,r as m,o as r,c as S,e as y,I as D,b as s,w as p,v as _,f as i,g as I,h as M,i as N,j as U,k as R,l as B,m as k,n as b,q as C,p as L,a as T,_ as z}from"./index-3cf7f63b.js";function h(n){return n==null?!1:(n=n.trim(),n!=="")}const A={class:"portalSubmodule"},E=["onSubmit"],q=s("div",{class:"formDiv"},[s("label",null,"directory ID")],-1),j={class:"formDiv"},G=s("div",{class:"formDiv"},[s("label",null,"password")],-1),H={class:"formDiv"},J={class:"formDiv"},K=["disabled","value"],O=g({__name:"SignIn",setup(n){const{isLoading:o,signIn:a}=F(),t=m({did:"",password:""}),e=m({show:!1,content:"",type:"error",textAlign:"center"});function d(){!h(t.did)||!h(t.password)?(e.content="Please input directory ID and password!",e.show=!0):(e.show=!1,e.content="",a(t,l=>{l.status===200?M.push({name:N.workbench}):(e.content=l===null?"Sign in failed for unknwon error!":l.data,e.show=!0)}))}return(l,c)=>(r(),S("div",A,[y(D,{config:e},null,8,["config"]),s("form",{onSubmit:I(d,["prevent"]),autocomplete:"on"},[q,s("div",j,[p(s("input",{class:"inputField",type:"text",name:"did",placeholder:"directory ID","onUpdate:modelValue":c[0]||(c[0]=f=>t.did=f)},null,512),[[_,t.did,void 0,{lazy:!0}]])]),G,s("div",H,[p(s("input",{class:"inputField",type:"password",name:"password",placeholder:"password","onUpdate:modelValue":c[1]||(c[1]=f=>t.password=f)},null,512),[[_,t.password,void 0,{lazy:!0}]])]),s("div",J,[s("input",{type:"submit",disabled:i(o),value:i(o)?"Signing in ...":"Sign In"},null,8,K)])],40,E)]))}}),P=U("signIn");function Q(n){P.value=n}function x(){return{portalState:P,setPortalState:Q}}const W={class:"portalSubmodule"},X=["onSubmit"],Y=s("div",{class:"formDiv"},[s("label",null,"directory ID")],-1),Z={class:"formDiv"},ss=s("div",{class:"formDiv"},[s("label",null,"password")],-1),es={class:"formDiv"},ts={class:"formDiv"},os=["passwordMatch"],ns={class:"formDiv"},is={class:"formDiv"},ds=["value","disabled"],as=g({__name:"SignUp",setup(n){const{isLoading:o,signUp:a}=R(),t=m({did:"",password:""}),e=m({show:!1,content:"",type:"error",textAlign:"center"}),d=U(""),l=B(()=>t.password===d.value),{setPortalState:c}=x();function f(){t.did="",t.password="",d.value=""}function V(){l.value?!h(t.did)||!h(t.password)?(e.content="Please input directory ID and password!",e.show=!0):(e.show=!1,a(t,w=>{w.status===200?(e.content="Sign up successful! Redirecting to sign in page...",e.show=!0,f(),setTimeout(()=>{c("signIn"),e.content="",e.show=!1},1e3)):(e.content=w===null?"Sign up failed for unknwon error!":w.data,e.show=!0)})):(e.content="Passwords do not match!",e.show=!0)}return(w,u)=>(r(),S("div",W,[y(D,{config:e},null,8,["config"]),s("form",{autocomplete:"on",id:"signUpForm",onSubmit:I(V,["prevent"])},[Y,s("div",Z,[p(s("input",{class:"inputField",type:"text",name:"did","onUpdate:modelValue":u[0]||(u[0]=v=>t.did=v),placeholder:"directory ID"},null,512),[[_,t.did,void 0,{lazy:!0}]])]),ss,s("div",es,[p(s("input",{class:"inputField",type:"password",name:"password","onUpdate:modelValue":u[1]||(u[1]=v=>t.password=v),placeholder:"password"},null,512),[[_,t.password]])]),s("div",ts,[s("label",{id:"passwordLabel",passwordMatch:l.value,for:"check_password"},"verify password",8,os)]),s("div",ns,[p(s("input",{class:"inputField",type:"password",name:"check_password","onUpdate:modelValue":u[2]||(u[2]=v=>d.value=v),placeholder:"password"},null,512),[[_,d.value]])]),s("div",is,[s("input",{type:"submit",value:i(o)?"Signing up...":"Sign Up",disabled:i(o)},null,8,ds)])],40,X)]))}}),ls={class:"portalSubmodule"},rs=["onSubmit"],cs=s("div",{class:"formDiv"},[s("label",null,"directory ID")],-1),us={class:"formDiv"},ps=s("div",{class:"formDiv"},[s("input",{type:"submit",value:"Send reset request"})],-1),_s=g({__name:"PasswordReset",setup(n){const o=m({show:!1,content:"",type:"error",textAlign:"center"}),a=m({did:""});function t(){if(a.did==="")o.content="Please input directory ID!",o.show=!0;else throw new Error("Not implemented yet!")}return(e,d)=>(r(),S("div",ls,[y(D,{config:o},null,8,["config"]),s("form",{autocomplete:"off",onSubmit:I(t,["prevent"])},[cs,s("div",us,[p(s("input",{class:"inputField",type:"text",name:"did","onUpdate:modelValue":d[0]||(d[0]=l=>a.did=l),placeholder:"directory ID"},null,512),[[_,a.did]])]),ps],40,rs)]))}}),$=n=>(L("data-v-9d4f2dcd"),n=n(),T(),n),ms=$(()=>s("div",{class:"streak",loc:"top"},null,-1)),fs=$(()=>s("div",{id:"titleDiv"},[s("h1",null,"BMGT435 Simulation"),s("h2",null,"Experiential Learning Platform"),s("hr")],-1)),vs={id:"portalNav"},ws=["disabled"],hs=["disabled"],gs=["disabled"],Ss=$(()=>s("div",{class:"streak",loc:"bottom"},null,-1)),bs=g({__name:"PortalView",setup(n){const{portalState:o,setPortalState:a}=x();return(t,e)=>(r(),S("div",null,[ms,fs,s("div",vs,[s("button",{onClick:e[0]||(e[0]=d=>i(a)("signIn")),disabled:i(o)==="signIn"},"Sign In",8,ws),k(" |"),s("button",{onClick:e[1]||(e[1]=d=>i(a)("signUp")),disabled:i(o)==="signUp"},"Sign Up",8,hs),k(" |"),s("button",{onClick:e[2]||(e[2]=d=>i(a)("passwordReset")),disabled:i(o)==="passwordReset"},"Password Reset",8,gs)]),s("div",null,[i(o)==="signIn"?(r(),b(O,{key:0})):i(o)==="signUp"?(r(),b(as,{key:1})):i(o)==="passwordReset"?(r(),b(_s,{key:2})):C("",!0)]),Ss]))}});const Ds=z(bs,[["__scopeId","data-v-9d4f2dcd"]]);export{Ds as default};
