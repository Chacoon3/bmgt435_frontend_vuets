import{_ as w,o as s,c as i,x as U,F,b as e,d as k,l as V,t as d,p as I,a as D,f as l,r as x,j as S,w as A,y as M,e as h,z as f,A as W,n as B,I as j,B as z,m as g,C as H,q as Y,h as q,i as E,D as G}from"./index-60159034.js";import{u as J,a as K}from"./caseUtils-ae6afc67.js";import{u as Q}from"./caseRecordsUtils-2fee5389.js";const X={},Z=e("br",null,null,-1),ee=e("br",null,null,-1);function te(t,r){return s(),i(F,null,[U(t.$slots,"default"),Z,ee],64)}const y=w(X,[["render",te]]),P=t=>(I("data-v-b5f6f7aa"),t=t(),D(),t),ne={class:"centerConfigPanel"},oe={class:"foodcenterCenterName"},ae=["buttonColor"],se=P(()=>e("label",null," s ",-1)),le=["value","disabled"],ie=P(()=>e("label",null," S ",-1)),re=["value","disabled"],ce=k({__name:"CenterConfigPanel",props:{isOn:{type:Boolean},name:{},smallS:{},bigS:{}},emits:["update:isOn","update:smallS","update:bigS"],setup(t){const r=t,u=V(()=>r.isOn?"green":"red");return(n,o)=>(s(),i("div",ne,[e("div",oe,d(n.name??"Unnamed"),1),e("div",null,[e("button",{class:"normalButton",buttonColor:u.value,onClick:o[0]||(o[0]=()=>{n.$emit("update:isOn",!n.isOn)})},d(n.isOn?"Selected":"Deselected"),9,ae)]),e("div",null,[se,e("input",{class:"foodcenterInputNumber",type:"number",value:n.smallS,disabled:n.isOn===!1,onInput:o[1]||(o[1]=a=>{var c;return n.$emit("update:smallS",Number.parseInt((c=a.target)==null?void 0:c.value))})},null,40,le)]),e("div",null,[ie,e("input",{class:"foodcenterInputNumber",type:"number",value:n.bigS,disabled:n.isOn===!1,onInput:o[2]||(o[2]=a=>{var c;return n.$emit("update:bigS",Number.parseInt((c=a.target)==null?void 0:c.value))})},null,40,re)])]))}});const de=w(ce,[["__scopeId","data-v-b5f6f7aa"]]),C=t=>(I("data-v-40fa22e4"),t=t(),D(),t),ue={class:"foodcentrResultContainer"},_e={key:0},be=C(()=>e("h4",{class:"caseDescription"}," Please submit the simulation first. ",-1)),me=[be],pe={key:1},he={class:"foodcenterResultList"},ve=C(()=>e("span",null,"Total profit",-1)),fe=C(()=>e("span",null,"Total shortage",-1)),ge=C(()=>e("span",null,"Total shortage penalty",-1)),ye=C(()=>e("span",null,"Total holding cost",-1)),Se=k({__name:"FoodcenterResultPanel",props:{result:{}},setup(t){const r=t,{isDownloading:u,downloadCaseRecord:n}=Q();function o(){r.result!==null&&n(r.result.case_record_id)}return(a,c)=>(s(),i("div",ue,[a.result===null?(s(),i("div",_e,me)):(s(),i("div",pe,[e("ul",he,[e("li",null,[ve,e("span",null,"$ "+d(a.result.summary.perf_metric.toLocaleString()),1)]),e("li",null,[fe,e("span",null,d(a.result.summary.total_shortage_count.toLocaleString()),1)]),e("li",null,[ge,e("span",null,"$ "+d(a.result.summary.total_shortage_amount.toLocaleString()),1)]),e("li",null,[ye,e("span",null,"$ "+d(a.result.summary.total_holding_cost.toLocaleString()),1)])]),e("button",{class:"normalButton",onClick:o},d(l(u)===!0?"Downloading...":"Download detailed record"),1)]))]))}});const we=w(Se,[["__scopeId","data-v-40fa22e4"]]),v=t=>(I("data-v-52cbc88e"),t=t(),D(),t),Ce=v(()=>e("h2",null,"Food Center - Introduction",-1)),$e=v(()=>e("hr",{class:"lv2Hr"},null,-1)),ke={class:"caseDescription"},Ie=z('<ul id="foodcenterList" data-v-52cbc88e><li data-v-52cbc88e><b data-v-52cbc88e>Decision variables:</b><br data-v-52cbc88e> Locations to expand. <br data-v-52cbc88e> Inventory policy (s, S), one for each selected locations. </li><br data-v-52cbc88e><li data-v-52cbc88e><b data-v-52cbc88e>Random inputs:</b><br data-v-52cbc88e> Weekly demand: the number of orders observed at a center in a week. <br data-v-52cbc88e> Order amount: the total amount of an order. </li><br data-v-52cbc88e><li data-v-52cbc88e><b data-v-52cbc88e>Constraints:</b><br data-v-52cbc88e> The number of raw materials that the company can buy and distribute weekly to the new centers cannot exceed 50,000. <br data-v-52cbc88e> If the restock order across the new centers exceeds 50,000, 50,000 raw materials will be bought and distributed to each center according to the relative proportion of the original restock plan. <br data-v-52cbc88e> A fixed weekly cost of $24,000 will be applied to each selected location. <br data-v-52cbc88e> The value of all the uncovered orders will be deducted from the revenue as a measure of penalty. </li><br data-v-52cbc88e></ul><b data-v-52cbc88e>Your goals:</b><br data-v-52cbc88e><ul data-v-52cbc88e><li data-v-52cbc88e> Find the best location(s) to expand. </li><li data-v-52cbc88e> Determine the optimal inventory policy for each selected location. </li><br data-v-52cbc88e></ul>',4),De=v(()=>e("hr",null,null,-1)),Oe=v(()=>e("h2",null,"Parameter Setting",-1)),Fe=v(()=>e("hr",null,null,-1)),Be={class:"foodcenterParamDiv"},Pe=["disabled"],Te=v(()=>e("h2",null,"Simulation Result",-1)),Le=v(()=>e("hr",null,null,-1)),Ne=k({__name:"FoodCenter",setup(t){const{showModal:r,closeModal:u}=H(),n=x({show:!1,content:""}),o=S(null),a=S(!0),c=S(Array.from([1,2,3,4,5,6],$=>({isOn:!1,smallS:0,bigS:0,name:`Center ${$}`}))),{isSubmitting:b,submitCase:O}=J(),L=S(!1);function N(){if(b.value===!0)return;n.content="",n.show=!1;const $=l(c);r({title:"Submit simulation",message:"Are you sure to submit the simulation?",onConfirm:()=>{u(),O($,m=>{L.value=m.status===200,m.status!==200?(n.content=m.data??"Failed to submit simulation!",n.show=!0):(n.content="Simulation submitted successfully!",n.show=!0,o.value=m.data)})},onCancel:()=>{u()}})}return($,m)=>(s(),i("div",null,[A(e("div",null,[Ce,$e,e("p",ke,[h(y,null,{default:f(()=>[g(" Terp Delivery Inc. is a food delivery company that operates in several cities across the states. It provides both food and delivery services to its customers. ")]),_:1}),h(y,null,{default:f(()=>[g(" Currently, Terp Delivery is seeking expansion and has identified six potential locations, makred by numbers as 1, 2, 3, 4, 5 and 6. ")]),_:1}),h(y,null,{default:f(()=>[g(" Apart from the ongoing expansion, Terp Delivery also wants to optimize its inventory management by applying s-S policy that decides how much raw materials its food delivery centers should buy weekly. ")]),_:1}),h(y,null,{default:f(()=>[g(" The marketing team has conducted market research and built a simulation model to bettter estimate the performance if a delivery center is built at the location. ")]),_:1}),h(y,null,{default:f(()=>[g(" The model is comprised of the following components: ")]),_:1}),Ie])],512),[[M,a.value]]),e("button",{class:"normalButton",onClick:m[0]||(m[0]=_=>a.value=!a.value)},d(a.value===!0?"Hide introduction":"Show introduction"),1),De,Oe,Fe,e("div",Be,[(s(!0),i(F,null,W(c.value,(_,R)=>(s(),B(de,{key:R,isOn:_.isOn,"onUpdate:isOn":p=>_.isOn=p,smallS:_.smallS,"onUpdate:smallS":p=>_.smallS=p,bigS:_.bigS,"onUpdate:bigS":p=>_.bigS=p,name:_.name,"onUpdate:name":p=>_.name=p},null,8,["isOn","onUpdate:isOn","smallS","onUpdate:smallS","bigS","onUpdate:bigS","name","onUpdate:name"]))),128))]),h(j,{show:n.show,content:n.content},null,8,["show","content"]),e("div",null,[e("button",{class:"normalButton",btnFeature:"simulation",onClick:N,disabled:l(b)===!0},d(l(b)?"Submitting...":"Submit!"),9,Pe)]),Te,Le,h(we,{result:o.value,caseRecordId:1},null,8,["result"])]))}});const Re=w(Ne,[["__scopeId","data-v-52cbc88e"]]),T=t=>(I("data-v-1fa1d68c"),t=t(),D(),t),Ue={id:"workbenchContainer",class:"contentViewContainer"},Ve={key:0},xe={key:0,class:"workbenchContent"},Ae={key:0},Me={key:1},We={key:2},je=T(()=>e("h3",null,"No case currently available to you!",-1)),ze=[je],He={key:1,class:"workbenchContent"},Ye=T(()=>e("h2",null,"It appears you are not in a group yet. Please join or create a group first.",-1)),qe=k({__name:"WorkbenchView",setup(t){const r=S(null),{currentUser:u}=G(),{isLoading:n,data:o,getData:a}=K();return a(),(c,b)=>(s(),i("div",Ue,[r.value===null?(s(),i("div",Ve,[l(u)&&l(u).group_id!==null?(s(),i("div",xe,[l(n)===!0?(s(),i("div",Ae," Fetching Data... ")):l(o)!==null&&l(o)!==null&&l(o).length>0?(s(),i("div",Me,[e("h3",null,"Your Case : "+d(l(o)[0].name),1),e("div",null,[e("button",{class:"normalButton",onClick:b[0]||(b[0]=()=>r.value=l(o)[0].id)},"Click to enter simulation")])])):(s(),i("div",We,ze))])):(s(),i("div",He,[Ye,e("button",{class:"normalButton",onClick:b[1]||(b[1]=O=>l(q).push({name:l(E).grouping}))},"Okay!")]))])):r.value===1?(s(),B(Re,{key:1})):Y("",!0)]))}});const Ke=w(qe,[["__scopeId","data-v-1fa1d68c"]]);export{Ke as default};
