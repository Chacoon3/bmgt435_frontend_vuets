import{d as b,o as e,c as t,t as l,q as i,b as d,F as r,A as c,P as u,_ as p}from"./index-0a6ccd0d.js";const y={class:"tableViewContainer"},f={key:0,class:"tableViewTitle"},h={class:"tableViewBody"},k={key:0,class:"tableViewRow"},C={key:0},V=["onClick"],g=["href"],m=b({__name:"TableView",props:{tableConfig:{}},emits:["clickItem"],setup(T){return(s,v)=>(e(),t("table",y,[s.tableConfig.title?(e(),t("div",f,l(s.tableConfig.title),1)):i("",!0),d("tbody",h,[s.tableConfig.headers?(e(),t("tr",k,[(e(!0),t(r,null,c(s.tableConfig.headers,(n,o)=>(e(),t("th",{class:"tableViewHead",key:o},l(n),1))),128))])):i("",!0),(e(!0),t(r,null,c(s.tableConfig.rows,(n,o)=>(e(),t("tr",{class:"tableViewRow",key:o},[(e(!0),t(r,null,c(n,(a,_)=>(e(),t("td",{class:"tableViewData",key:_},[a.elementType==="text"?(e(),t("span",C,l(a.value),1)):a.elementType==="button"?(e(),t("button",{key:1,class:u(a.elementClass??"normalButton"),onClick:a.onClick},l(a.value),11,V)):a.elementType=="a"?(e(),t("a",{key:2,href:a.href},l(a.value),9,g)):i("",!0)]))),128))]))),128))])]))}});const B=p(m,[["__scopeId","data-v-5e59bf18"]]);export{B as T};
