(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92356a10"],{"02f4":function(t,e,r){var n=r("4588"),a=r("be13");t.exports=function(t){return function(e,r){var i,o,l=String(a(e)),s=n(r),c=l.length;return s<0||s>=c?t?"":void 0:(i=l.charCodeAt(s),i<55296||i>56319||s+1===c||(o=l.charCodeAt(s+1))<56320||o>57343?t?l.charAt(s):i:t?l.slice(s,s+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,r){"use strict";var n=r("02f4")(!0);t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},"0bfb":function(t,e,r){"use strict";var n=r("cb7c");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,r){"use strict";r("b0c5");var n=r("2aba"),a=r("32e9"),i=r("79e5"),o=r("be13"),l=r("2b4c"),s=r("520a"),c=l("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();t.exports=function(t,e,r){var d=l(t),p=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),g=p?!i((function(){var e=!1,r=/a/;return r.exec=function(){return e=!0,null},"split"===t&&(r.constructor={},r.constructor[c]=function(){return r}),r[d](""),!e})):void 0;if(!p||!g||"replace"===t&&!u||"split"===t&&!f){var h=/./[d],m=r(o,d,""[t],(function(t,e,r,n,a){return e.exec===s?p&&!a?{done:!0,value:h.call(e,r,n)}:{done:!0,value:t.call(r,e,n)}:{done:!1}})),v=m[0],b=m[1];n(String.prototype,t,v),a(RegExp.prototype,d,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},"28a5":function(t,e,r){"use strict";var n=r("aae3"),a=r("cb7c"),i=r("ebd6"),o=r("0390"),l=r("9def"),s=r("5f1b"),c=r("520a"),u=r("79e5"),f=Math.min,d=[].push,p="split",g="length",h="lastIndex",m=4294967295,v=!u((function(){RegExp(m,"y")}));r("214f")("split",2,(function(t,e,r,u){var b;return b="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[g]||2!="ab"[p](/(?:ab)*/)[g]||4!="."[p](/(.?)(.?)/)[g]||"."[p](/()()/)[g]>1||""[p](/.?/)[g]?function(t,e){var a=String(this);if(void 0===t&&0===e)return[];if(!n(t))return r.call(a,t,e);var i,o,l,s=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,p=void 0===e?m:e>>>0,v=new RegExp(t.source,u+"g");while(i=c.call(v,a)){if(o=v[h],o>f&&(s.push(a.slice(f,i.index)),i[g]>1&&i.index<a[g]&&d.apply(s,i.slice(1)),l=i[0][g],f=o,s[g]>=p))break;v[h]===i.index&&v[h]++}return f===a[g]?!l&&v.test("")||s.push(""):s.push(a.slice(f)),s[g]>p?s.slice(0,p):s}:"0"[p](void 0,0)[g]?function(t,e){return void 0===t&&0===e?[]:r.call(this,t,e)}:r,[function(r,n){var a=t(this),i=void 0==r?void 0:r[e];return void 0!==i?i.call(r,a,n):b.call(String(a),r,n)},function(t,e){var n=u(b,t,this,e,b!==r);if(n.done)return n.value;var c=a(t),d=String(this),p=i(c,RegExp),g=c.unicode,h=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(v?"y":"g"),y=new p(v?c:"^(?:"+c.source+")",h),_=void 0===e?m:e>>>0;if(0===_)return[];if(0===d.length)return null===s(y,d)?[d]:[];var x=0,w=0,S=[];while(w<d.length){y.lastIndex=v?w:0;var k,$=s(y,v?d:d.slice(w));if(null===$||(k=f(l(y.lastIndex+(v?0:w)),d.length))===x)w=o(d,w,g);else{if(S.push(d.slice(x,w)),S.length===_)return S;for(var C=1;C<=$.length-1;C++)if(S.push($[C]),S.length===_)return S;w=x=k}}return S.push(d.slice(x)),S}]}))},"2e08":function(t,e,r){var n=r("9def"),a=r("9744"),i=r("be13");t.exports=function(t,e,r,o){var l=String(i(t)),s=l.length,c=void 0===r?" ":String(r),u=n(e);if(u<=s||""==c)return l;var f=u-s,d=a.call(c,Math.ceil(f/c.length));return d.length>f&&(d=d.slice(0,f)),o?d+l:l+d}},3846:function(t,e,r){r("9e1e")&&"g"!=/./g.flags&&r("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:r("0bfb")})},4314:function(t,e,r){},"520a":function(t,e,r){"use strict";var n=r("0bfb"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,l="lastIndex",s=function(){var t=/a/,e=/b*/g;return a.call(t,"a"),a.call(e,"a"),0!==t[l]||0!==e[l]}(),c=void 0!==/()??/.exec("")[1],u=s||c;u&&(o=function(t){var e,r,o,u,f=this;return c&&(r=new RegExp("^"+f.source+"$(?!\\s)",n.call(f))),s&&(e=f[l]),o=a.call(f,t),s&&o&&(f[l]=f.global?o.index+o[0].length:e),c&&o&&o.length>1&&i.call(o[0],r,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)})),o}),t.exports=o},"53ca":function(t,e,r){"use strict";function n(t){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}r.d(e,"a",(function(){return n}))},"5f1b":function(t,e,r){"use strict";var n=r("23c6"),a=RegExp.prototype.exec;t.exports=function(t,e){var r=t.exec;if("function"===typeof r){var i=r.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(t))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(t,e)}},"6b54":function(t,e,r){"use strict";r("3846");var n=r("cb7c"),a=r("0bfb"),i=r("9e1e"),o="toString",l=/./[o],s=function(t){r("2aba")(RegExp.prototype,o,t,!0)};r("79e5")((function(){return"/a/b"!=l.call({source:"a",flags:"b"})}))?s((function(){var t=n(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?a.call(t):void 0)})):l.name!=o&&s((function(){return l.call(this)}))},"79d4":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"figure-list main-content"},[r("div",{staticClass:"screen-box"},[r("div",{staticClass:"screen-item"},[r("el-input",{staticStyle:{width:"220px"},attrs:{size:"small",placeholder:"请输入书本名称",clearable:""},model:{value:t.keywords,callback:function(e){t.keywords="string"===typeof e?e.trim():e},expression:"keywords"}}),t._v(" "),r("el-button",{attrs:{size:"small",icon:"el-icon-search",type:"primary"},on:{click:function(e){return t.doSearch()}}},[t._v("搜索")])],1),t._v(" "),r("div",{staticClass:"operation"},[r("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"primary"},on:{click:function(e){return t.showDialog("add")}}},[t._v("新增")])],1)]),t._v(" "),r("div",{staticClass:"content"},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.list,fit:"","highlight-current-row":"","tooltip-effect":"dark"}},[r("el-table-column",{attrs:{label:"序号",align:"center",type:"index"}}),t._v(" "),r("el-table-column",{attrs:{label:"封面图",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[r("img",{staticStyle:{display:"inline-block","vertical-align":"middle"},attrs:{src:t.row.cover,width:"50",alt:""}})]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"书名",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"author",label:"作者",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{label:"所属分类",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.classId.class_name))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"sort",label:"排序",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{prop:"pv",label:"浏览量",align:"center"}}),t._v(" "),r("el-table-column",{attrs:{label:"书本状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tag",{attrs:{type:t._f("statusFilter")(e.row.status)}},[t._v("\n            "+t._s(1==e.row.status?"已上架":2==e.row.status?"已下架":"待审核")+"\n          ")])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"createTime",label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("timeFormat")(e.row.createTime))+"\n        ")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._f("timeFormat")(e.row.updateTime))+"\n        ")]}}])}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",label:"章节",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(r){return t.seeDetail(e.row)}}},[t._v("查看章节")])]}}])}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(r){return t.showDialog("edit",e.row)}}},[t._v("修改")]),t._v(" "),1==e.row.status?r("el-button",{attrs:{type:"danger",size:"mini"},nativeOn:{click:function(r){return t.changeStatus(e.row,2)}}},[t._v("下架")]):t._e(),t._v(" "),2==e.row.status?r("el-button",{attrs:{type:"success",size:"mini"},nativeOn:{click:function(r){return t.changeStatus(e.row,1)}}},[t._v("上架")]):t._e(),t._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),r("div",{staticClass:"pagination-box"},[r("el-pagination",{attrs:{total:t.total,"current-page":t.currentPage,"page-sizes":[5,10,14,28],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),r("el-dialog",{attrs:{center:"",title:"新增书本",visible:t.dialogFormVisible,width:"40%"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"100px","label-position":"left",size:"small"}},[r("el-form-item",{attrs:{label:"封面",prop:"cover"}},[r("el-input",{attrs:{disabled:"detail"==t.dialogType},model:{value:t.form.cover,callback:function(e){t.$set(t.form,"cover",e)},expression:"form.cover "}})],1),t._v(" "),r("el-form-item",{attrs:{label:"书本名称",prop:"name"}},[r("el-input",{attrs:{disabled:"detail"==t.dialogType},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"书本作者",prop:"author"}},[r("el-input",{attrs:{disabled:"detail"==t.dialogType},model:{value:t.form.author,callback:function(e){t.$set(t.form,"author",e)},expression:"form.author"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"书本分类",prop:"classId"}},[r("el-select",{attrs:{placeholder:"请选择分类",clearable:""},model:{value:t.form.classId,callback:function(e){t.$set(t.form,"classId",e)},expression:"form.classId"}},t._l(t.libraryClass,(function(t){return r("el-option",{key:t._id,attrs:{label:t.class_name,value:t._id}})})),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"书本描述",prop:"description"}},[r("el-input",{attrs:{disabled:"detail"==t.dialogType},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),t._v(" "),r("el-form-item",["detail"!==t.dialogType?r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("保存")]):t._e(),t._v(" "),r("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")])],1)],1)],1)],1)},a=[],i=(r("7f7f"),r("d573")),o=r("ed08"),l={filters:{timeFormat:function(t){return Object(o["b"])(new Date(t))},statusFilter:function(t){var e={1:"success",2:"danger",3:"warning"};return e[t]}},data:function(){return{loading:!0,keywords:"",classId:"",status:1,list:[],libraryClass:[],pageSize:14,currentPage:1,total:0,dialogFormVisible:!1,form:{name:"",author:"",cover:"",sort:0,pv:0,description:"",classId:"",status:1},rules:{name:[{required:!0,message:"请填写书名",trigger:"blur"}],author:[{required:!0,message:"请填写作者",trigger:"blur"}],cover:[{required:!0,message:"请上传封面",trigger:"blur"}],description:[{required:!0,message:"请填写描述",trigger:"blur"}],classId:[{required:!0,message:"请选择分类",trigger:"change"}]},dialogType:"add"}},watch:{dialogFormVisible:function(t){!1===t&&(this.$refs["form"].resetFields(),this.form={name:"",author:"",cover:"",sort:0,pv:0,description:"",classId:"",status:1})}},created:function(){this.fetchData(),this.getClassList()},methods:{fetchData:function(){var t=this;i["a"].get_library({currentPage:this.currentPage,pageSize:this.pageSize,keywords:this.keywords}).then((function(e){t.loading=!1,t.total=e.data.count,t.list=e.data.list}))},getClassList:function(){var t=this;i["b"].getList({currentPage:1,pageSize:100}).then((function(e){t.libraryClass=e.data.list}))},seeDetail:function(t){this.$router.push({path:"/library/detail",query:{id:t._id}})},showDialog:function(t,e){this.dialogType=t,this.dialogFormVisible=!0,e&&(this.form=JSON.parse(JSON.stringify(e)))},onSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;e.form._id?i["a"].update_library(e.form).then((function(t){200!==t.code?e.$message({message:t.msg,type:"error"}):(e.$message({message:"更新成功",type:"success"}),e.fetchData(),e.$nextTick((function(){e.$refs.form.resetFields()})),e.dialogFormVisible=!1)})):i["a"].add_library(e.form).then((function(t){200!==t.code?e.$message({message:t.msg,type:"error"}):(e.$message({message:"新增成功",type:"success"}),e.fetchData(),e.$nextTick((function(){e.$refs.form.resetFields()})),e.dialogFormVisible=!1)}))}))},handleCurrentChange:function(t){this.currentPage=t,this.fetchData()},handleSizeChange:function(t){this.pageSize=t,this.fetchData()},handleDelete:function(t){var e=this;this.$confirm("是否删除".concat(t.name,"?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",confirmButtonClass:"danger"}).then((function(){i["a"].delete_library({id:t._id}).then((function(t){e.$message({type:"success",message:"删除成功!"}),e.fetchData()}))}))},doSearch:function(){this.currentPage=1,this.loading=!0,this.fetchData()},changeStatus:function(t,e){var r=this;this.$confirm("是否".concat(2===t.status?"上架":"下架","该书?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",confirmButtonClass:"danger"}).then((function(){i["a"].change_status({_id:t._id,status:e}).then((function(t){r.$message({type:"success",message:t.msg}),r.fetchData()}))}))}}},s=l,c=(r("ead0"),r("2877")),u=Object(c["a"])(s,n,a,!1,null,"0ea753c7",null);e["default"]=u.exports},9744:function(t,e,r){"use strict";var n=r("4588"),a=r("be13");t.exports=function(t){var e=String(a(this)),r="",i=n(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(r+=e);return r}},a481:function(t,e,r){"use strict";var n=r("cb7c"),a=r("4bf8"),i=r("9def"),o=r("4588"),l=r("0390"),s=r("5f1b"),c=Math.max,u=Math.min,f=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};r("214f")("replace",2,(function(t,e,r,h){return[function(n,a){var i=t(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,i,a):r.call(String(i),n,a)},function(t,e){var a=h(r,t,this,e);if(a.done)return a.value;var f=n(t),d=String(this),p="function"===typeof e;p||(e=String(e));var v=f.global;if(v){var b=f.unicode;f.lastIndex=0}var y=[];while(1){var _=s(f,d);if(null===_)break;if(y.push(_),!v)break;var x=String(_[0]);""===x&&(f.lastIndex=l(d,i(f.lastIndex),b))}for(var w="",S=0,k=0;k<y.length;k++){_=y[k];for(var $=String(_[0]),C=c(u(o(_.index),d.length),0),D=[],z=1;z<_.length;z++)D.push(g(_[z]));var T=_.groups;if(p){var O=[$].concat(D,C,d);void 0!==T&&O.push(T);var E=String(e.apply(void 0,O))}else E=m($,d,C,D,T,e);C>=S&&(w+=d.slice(S,C)+E,S=C+$.length)}return w+d.slice(S)}];function m(t,e,n,i,o,l){var s=n+t.length,c=i.length,u=p;return void 0!==o&&(o=a(o),u=d),r.call(l,u,(function(r,a){var l;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(s);case"<":l=o[a.slice(1,-1)];break;default:var u=+a;if(0===u)return r;if(u>c){var d=f(u/10);return 0===d?r:d<=c?void 0===i[d-1]?a.charAt(1):i[d-1]+a.charAt(1):r}l=i[u-1]}return void 0===l?"":l}))}}))},b0c5:function(t,e,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},d573:function(t,e,r){"use strict";r.d(e,"b",(function(){return a})),r.d(e,"a",(function(){return i}));var n=r("b775"),a={getList:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"get",params:t})},add_library_class:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"post",data:t})},update_library_class:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"put",data:t})},delete_library_class:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"delete",params:t})}},i={get_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"get",params:t})},add_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"post",data:t})},update_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"put",data:t})},delete_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"delete",params:t})},change_status:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"patch",data:t})}}},ead0:function(t,e,r){"use strict";r("4314")},ed08:function(t,e,r){"use strict";r.d(e,"b",(function(){return i})),r.d(e,"a",(function(){return o}));r("28a5"),r("f576"),r("a481"),r("6b54");var n=r("53ca");function a(t,e){if(0===arguments.length)return null;var r,a=e||"{y}-{m}-{d} {h}:{i}:{s}";"object"===Object(n["a"])(t)?r=t:("string"===typeof t&&/^[0-9]+$/.test(t)&&(t=parseInt(t)),"number"===typeof t&&10===t.toString().length&&(t*=1e3),r=new Date(t));var i={y:r.getFullYear(),m:r.getMonth()+1,d:r.getDate(),h:r.getHours(),i:r.getMinutes(),s:r.getSeconds(),a:r.getDay()},o=a.replace(/{([ymdhisa])+}/g,(function(t,e){var r=i[e];return"a"===e?["日","一","二","三","四","五","六"][r]:r.toString().padStart(2,"0")}));return o}function i(t,e){t=10===(""+t).length?1e3*parseInt(t):+t;var r=new Date(t),n=Date.now(),i=(n-r)/1e3;return i<30?"刚刚":i<3600?Math.ceil(i/60)+"分钟前":i<86400?Math.ceil(i/3600)+"小时前":i<172800?"1天前":e?a(t,e):r.getMonth()+1+"月"+r.getDate()+"日"+r.getHours()+"时"+r.getMinutes()+"分"}function o(t,e,r){var n,a,i,o,l,s=function s(){var c=+new Date-o;c<e&&c>0?n=setTimeout(s,e-c):(n=null,r||(l=t.apply(i,a),n||(i=a=null)))};return function(){for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];i=this,o=+new Date;var f=r&&!n;return n||(n=setTimeout(s,e)),f&&(l=t.apply(i,c),i=c=null),l}}},f576:function(t,e,r){"use strict";var n=r("5ca1"),a=r("2e08"),i=r("a25f"),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);n(n.P+n.F*o,"String",{padStart:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0,!0)}})}}]);