(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{37:function(n,e,t){},38:function(n,e,t){"use strict";t.r(e);var o=t(0),r=t(1),c=t(14),a=t.n(c),i=t(3),u=function(n){var e=n.onChange;return Object(o.jsxs)("div",{children:["filter shown with \xa0",Object(o.jsx)("input",{id:"filter",onChange:e})]})},s=function(n){var e=n.description,t=n.onChange,r=n.value;return Object(o.jsxs)("div",{children:[e,": ",Object(o.jsx)("input",{onChange:t,value:r})]})},f=function(n){return console.log("Form persons comp:",n),Object(o.jsxs)("form",{onSubmit:n.onSubmit,className:"form",children:[Object(o.jsx)(s,{description:"name",onChange:n.onChangeName,value:n.name}),Object(o.jsx)(s,{description:"phone number",onChange:n.onChangeNumber,value:n.number}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},l=function(n){var e=n.id,t=n.name,r=n.number,c=n.handleDeletePerson;return Object(o.jsxs)("div",{className:"person",children:[t," ",r," \xa0",Object(o.jsx)("button",{onClick:function(){return c(e)},children:" delete "})]})},d=function(n){var e=n.findPersons,t=n.persons,r=n.handleDeletePerson;console.log("persons comp",e,t);var c=[],a="";return e?e.length>0?c=e:a="No this person is not on the list":c=t,Object(o.jsxs)(o.Fragment,{children:[c.map((function(n){return Object(o.jsx)(l,{id:n.id,name:n.name,number:n.number,handleDeletePerson:r},n.id)})),a]})},b=t(4),h=t.n(b),m="/api/persons",j=function(){return h.a.get(m).then((function(n){return n.data}))},p=function(n){return h.a.post(m,n).then((function(n){return n.data}))},O=function(n,e){return h.a.put("".concat(m,"/").concat(n),e).then((function(n){return n.data}))},v=function(n){return h.a.delete("".concat(m,"/").concat(n)).then((function(n){return n.data}))},g=(t(37),function(n){var e=n.classCss,t=n.notification;return Object(o.jsx)("div",{className:e,children:t})}),x=function(){var n=Object(r.useState)([]),e=Object(i.a)(n,2),t=e[0],c=e[1],a=Object(r.useState)(),s=Object(i.a)(a,2),l=s[0],b=s[1],h=Object(r.useState)(""),m=Object(i.a)(h,2),x=m[0],w=m[1],C=Object(r.useState)(""),S=Object(i.a)(C,2),k=S[0],y=S[1],N=Object(r.useState)(""),D=Object(i.a)(N,2),P=D[0],E=D[1],I=Object(r.useState)(""),B=Object(i.a)(I,2),F=B[0],J=B[1],L=function(){setTimeout((function(){E(null),J(null)}),5e3)};return Object(r.useEffect)((function(){j().then((function(n){c(n)}))}),[]),Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(g,{classCss:F,notification:P}),Object(o.jsx)(u,{onChange:function(n){n.target.value?b(t.filter((function(e){return function(e){return-1!==e.toLowerCase().indexOf(n.target.value.toLowerCase())}(e.name)}))):b()}}),Object(o.jsx)("h2",{children:"Add a new"}),Object(o.jsx)(f,{onSubmit:function(n){n.preventDefault();var e={name:x,number:k,date:(new Date).toISOString()};k&&x?(console.log(x),t.find((function(n){return n.name===x}))?window.confirm("".concat(x," is already added to phonebook, replace the old number with a new one?"))&&O(t.filter((function(n){return n.name===x})).map((function(n){return n.id})),e).then((function(n){c(t.map((function(e){return e.name!==x?e:n}),"person")),E("".concat(x," phone was updated to ").concat(k,".")),J("notification success"),L()})).catch((function(n){c(t.filter((function(n){return n.name!==x}))),E("Information of ".concat(x," has already been removed from server")),J("notification error"),L()})):t.find((function(n){return n.number===k}))?window.alert("the number ".concat(k," is already added to phonebook")):p(e).then((function(n){c(t.concat(n)),E("".concat(n.name," was added to the contact list")),J("notification success"),L()})).catch((function(n){E("We could not contact the server, please try again later."),J("notification error"),L()}))):window.alert("Either name or number cannot be blank"),w(""),y("")},onChangeName:function(n){console.log(n.target.value),w(n.target.value)},name:x,onChangeNumber:function(n){console.log(n.target.value),y(n.target.value)},number:k}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(d,{findPersons:l,persons:t,handleDeletePerson:function(n){window.confirm("Do you want to delete ".concat(t.filter((function(e){return e.id===n})).map((function(n){return n.name}))))&&(v(n).then((function(e){c(t.filter((function(e){return e.id!==n}))),E("".concat(t.filter((function(e){return e.id===n})).map((function(n){return n.name}))," was removed from the server.")),J("notification success"),L()})).catch((function(e){c(t.filter((function(e){return e.id!==n}))),E("".concat(t.filter((function(e){return e.id===n})).map((function(n){return n.name}))," was already removed from the server.")),J("notification error"),L()})),document.getElementById("filter").value="",b())}})]})};a.a.render(Object(o.jsx)(x,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.eb703987.chunk.js.map