import{j as C,E as F,G as U,H as v,J as V,D as $,K as b,d as M,o as i,c as r,b as e,t as g,f as s,q as k,F as L,A as I,_ as E,r as q,g as A,e as K,I as P,n as Y,p as z,a as O}from"./index-60159034.js";const{currentUser:c}=$(),y=C(!1),_=C(null);function S(){c.value&&c.value.group_id!==null?(y.value=!0,U(v.groups.get,{id:c.value.group_id},t=>{t.status===200?_.value=t.data:_.value=null,y.value=!1})):(_.value=null,y.value=!1)}function Q(){return S(),{isCurrentGroupLoading:y,currentGroup:_,getCurrrentGroup:S}}function R(){return F(v.groups.paginated)}function T(){const t=C(!1);function o(u=null){t.value=!0,V(v.groups.create,null,a=>{t.value=!1,a.status===200?(c.value!==null&&(c.value.group_id=a.data.id),_.value=a.data,b(v.groups.paginated)):_.value=null,u==null||u(a)})}return{isCreatingGroup:t,createGroup:o}}function W(){const t=C(!1);function o(u,a=null){t.value=!0,V(v.groups.join,{group_id:u},d=>{t.value=!1,d.status===200&&(c.value!==null&&(c.value.group_id=d.data.id),_.value=d.data,b(v.groups.paginated)),a==null||a(d)})}return{isJoiningGroup:t,joinGroup:o}}function X(){const t=C(!1);function o(u=null){t.value=!0,V(v.groups.leave,null,a=>{t.value=!1,a.status===200&&(c.value!==null&&(c.value.group_id=null),_.value=null,b(v.groups.paginated)),u==null||u(a)})}return{isLeavingGroup:t,leaveGroup:o}}const Z={id:"groupItemContainer"},ee={class:"groupName"},te=["disabled"],oe=M({__name:"GroupItem",props:{id:{},name:{},users:{}},setup(t){const o=t,{isJoiningGroup:u,joinGroup:a}=W(),{currentUser:d}=$();function h(){if(o.id===null)throw new Error("group id is null");a(o.id)}return(G,D)=>(i(),r("div",Z,[e("span",ee,g(G.$props.name),1),s(d)&&s(d).group_id===null?(i(),r("button",{key:0,class:"normalButton",onClick:h,disabled:s(u)===!0},g(s(u)===!0?"Joining...":"Join"),9,te)):k("",!0),e("div",null,[(i(!0),r(L,null,I(G.$props.users,p=>(i(),r("li",{class:"groupUser",key:p.id},g(p==null?void 0:p.first_name)+" "+g(p==null?void 0:p.last_name),1))),128))])]))}});const se=E(oe,[["__scopeId","data-v-08924502"]]),f=t=>(z("data-v-b96c37f2"),t=t(),O(),t),ne={id:"groupViewContainer",class:"contentViewContainer"},ue={key:0,class:"groupDiv"},ae=f(()=>e("h2",{class:"groupDivH2"},"Fetching Data...",-1)),ie=[ae],re={key:1,class:"groupDiv"},le=f(()=>e("h2",{class:"groupDivH2"},"Create a new group",-1)),de={id:"createGroupDiv"},pe=["onSubmit"],ce={class:"createGroupEle"},_e=["value","disabled"],ve={key:2,class:"groupDiv"},ge=f(()=>e("h2",{class:"groupDivH2"},"Your Group",-1)),fe=f(()=>e("div",null,[e("h3",null,"Members:")],-1)),he={id:"userGroupInfo"},Ge=["value","disabled"],me=f(()=>e("div",{id:"splitLine"},null,-1)),Ce={class:"groupDiv"},we=f(()=>e("h2",{class:"groupDivH2"},"Group List",-1)),ye={key:0},De={key:1},Le=["disabled"],Ie=M({__name:"GroupView",setup(t){const o=q({show:!1,msg:""}),{isCreatingGroup:u,createGroup:a}=T(),{isCurrentGroupLoading:d,currentGroup:h,getCurrrentGroup:G}=Q(),{isLeavingGroup:D,leaveGroup:p}=X(),{isLoading:H,data:N,getData:m,reset:B,hasMore:J}=R();m();function j(){o.show=!1,a(n=>{n.status===200?(o.msg=(n==null?void 0:n.data)??"create group success!",G(),B(),m()):o.msg=(n==null?void 0:n.data)??"create group failed!",o.show=!0})}function x(){p(n=>{n.status===200?(o.msg=(n==null?void 0:n.data)??"leave group success!",G(),B(),m()):o.msg=(n==null?void 0:n.data)??"leave group failed!",o.show=!0})}return(n,w)=>(i(),r("div",ne,[s(d)?(i(),r("div",ue,ie)):s(h)===null?(i(),r("div",re,[le,e("div",de,[e("form",{onSubmit:A(j,["prevent"])},[e("div",null,[K(P,{show:o.show,content:o.msg},null,8,["show","content"])]),e("div",ce,[e("input",{type:"submit",value:s(u)?"Creating...":"Create!",disabled:s(u)},null,8,_e)])],40,pe)])])):(i(),r("div",ve,[ge,e("div",null,[e("h3",null,g(s(h).name),1)]),fe,e("div",null,[e("ul",he,[(i(!0),r(L,null,I(s(h).users,l=>(i(),r("li",{key:l.id},[e("span",null,g(l.first_name+" "+l.last_name),1)]))),128))])]),e("input",{type:"submit",value:s(D)?"Leaving...":"Leave group",disabled:s(D),onClick:w[0]||(w[0]=l=>x())},null,8,Ge)])),me,e("div",Ce,[we,e("div",null,[s(H)?(i(),r("h3",ye,"Fetching data...")):(i(),r("ul",De,[(i(!0),r(L,null,I(s(N),l=>(i(),Y(se,{key:l.id,name:l.name,id:l.id,users:l.users},null,8,["name","id","users"]))),128))])),e("button",{class:"normalButton",disabled:s(J)===!1,onClick:w[1]||(w[1]=(...l)=>s(m)&&s(m)(...l))},g(s(J)?"View more":"No more groups"),9,Le)])])]))}});const be=E(Ie,[["__scopeId","data-v-b96c37f2"]]);export{be as default};
