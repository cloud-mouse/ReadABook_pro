(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ffd29dc"],{"02f4":function(t,e,a){var n=a("4588"),r=a("be13");t.exports=function(t){return function(e,a){var i,o,c=String(r(e)),s=n(a),l=c.length;return s<0||s>=l?t?"":void 0:(i=c.charCodeAt(s),i<55296||i>56319||s+1===l||(o=c.charCodeAt(s+1))<56320||o>57343?t?c.charAt(s):i:t?c.slice(s,s+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,a){"use strict";var n=a("02f4")(!0);t.exports=function(t,e,a){return e+(a?n(t,e).length:1)}},"0bfb":function(t,e,a){"use strict";var n=a("cb7c");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,a){"use strict";a("b0c5");var n=a("2aba"),r=a("32e9"),i=a("79e5"),o=a("be13"),c=a("2b4c"),s=a("520a"),l=c("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var a="ab".split(t);return 2===a.length&&"a"===a[0]&&"b"===a[1]}();t.exports=function(t,e,a){var d=c(t),h=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),f=h?!i((function(){var e=!1,a=/a/;return a.exec=function(){return e=!0,null},"split"===t&&(a.constructor={},a.constructor[l]=function(){return a}),a[d](""),!e})):void 0;if(!h||!f||"replace"===t&&!u||"split"===t&&!p){var v=/./[d],g=a(o,d,""[t],(function(t,e,a,n,r){return e.exec===s?h&&!r?{done:!0,value:v.call(e,a,n)}:{done:!0,value:t.call(a,e,n)}:{done:!1}})),m=g[0],b=g[1];n(String.prototype,t,m),r(RegExp.prototype,d,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},3140:function(t,e,a){},"520a":function(t,e,a){"use strict";var n=a("0bfb"),r=RegExp.prototype.exec,i=String.prototype.replace,o=r,c="lastIndex",s=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t[c]||0!==e[c]}(),l=void 0!==/()??/.exec("")[1],u=s||l;u&&(o=function(t){var e,a,o,u,p=this;return l&&(a=new RegExp("^"+p.source+"$(?!\\s)",n.call(p))),s&&(e=p[c]),o=r.call(p,t),s&&o&&(p[c]=p.global?o.index+o[0].length:e),l&&o&&o.length>1&&i.call(o[0],a,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)})),o}),t.exports=o},"53dc":function(t,e,a){"use strict";a("3140")},"5f1b":function(t,e,a){"use strict";var n=a("23c6"),r=RegExp.prototype.exec;t.exports=function(t,e){var a=t.exec;if("function"===typeof a){var i=a.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(t))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"988c":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var n=a("b775"),r={get_chapter:function(t){return Object(n["a"])({url:"/admin-api/chapter/",method:"get",params:t})},add_chapter:function(t){return Object(n["a"])({url:"/admin-api/chapter/",method:"post",data:t})},update_chapter:function(t){return Object(n["a"])({url:"/admin-api/chapter/",method:"put",data:t})},delete_chapter:function(t){return Object(n["a"])({url:"/admin-api/chapter/",method:"delete",params:t})},importChapter:function(t){return Object(n["a"])({url:"/admin-api/chapter/imporChapter",method:"post",data:t,headers:{"Content-Type":"multipart/form-data"}})}}},a481:function(t,e,a){"use strict";var n=a("cb7c"),r=a("4bf8"),i=a("9def"),o=a("4588"),c=a("0390"),s=a("5f1b"),l=Math.max,u=Math.min,p=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,f=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,(function(t,e,a,v){return[function(n,r){var i=t(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,i,r):a.call(String(i),n,r)},function(t,e){var r=v(a,t,this,e);if(r.done)return r.value;var p=n(t),d=String(this),h="function"===typeof e;h||(e=String(e));var m=p.global;if(m){var b=p.unicode;p.lastIndex=0}var _=[];while(1){var y=s(p,d);if(null===y)break;if(_.push(y),!m)break;var C=String(y[0]);""===C&&(p.lastIndex=c(d,i(p.lastIndex),b))}for(var w="",x=0,k=0;k<_.length;k++){y=_[k];for(var j=String(y[0]),S=l(u(o(y.index),d.length),0),O=[],$=1;$<y.length;$++)O.push(f(y[$]));var z=y.groups;if(h){var I=[j].concat(O,S,d);void 0!==z&&I.push(z);var D=String(e.apply(void 0,I))}else D=g(j,d,S,O,z,e);S>=x&&(w+=d.slice(x,S)+D,x=S+j.length)}return w+d.slice(x)}];function g(t,e,n,i,o,c){var s=n+t.length,l=i.length,u=h;return void 0!==o&&(o=r(o),u=d),a.call(c,u,(function(a,r){var c;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(s);case"<":c=o[r.slice(1,-1)];break;default:var u=+r;if(0===u)return a;if(u>l){var d=p(u/10);return 0===d?a:d<=l?void 0===i[d-1]?r.charAt(1):i[d-1]+r.charAt(1):a}c=i[u-1]}return void 0===c?"":c}))}}))},b0c5:function(t,e,a){"use strict";var n=a("520a");a("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},bea0:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chapter-detail"},[a("div",{staticClass:"book-info"},[a("div",{staticClass:"info-left"},[a("div",{staticClass:"book-name"},[a("span",{staticClass:"name"},[t._v(t._s(t.bookInfo.name))]),t._v(" "),a("span",{staticClass:"author"},[t._v("("+t._s(t.bookInfo.author)+")")])]),t._v(" "),a("div",{staticClass:"description",domProps:{innerHTML:t._s(t.bookInfo.description)}})]),t._v(" "),a("img",{staticClass:"cover",attrs:{src:t.bookInfo.cover,alt:""}})]),t._v(" "),a("div",{staticClass:"chapter-content"},[a("div",{staticClass:"title"},[t._v("章节目录")]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"chapter-list"},t._l(t.chapterList,(function(e){return a("div",{key:e._id,staticClass:"chapter-item",on:{click:function(a){return t.showContents(e)}}},[t._v("\n          "+t._s(e.chapter_name)+"\n        ")])})),0),t._v(" "),t.chapterList.length?t._e():a("div",{staticClass:"no-data"},[a("p",[t._v("本书当前暂无章节，请添加章节")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-document-add"},on:{click:t.addChapter}},[t._v("添加章节")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.showGeshi=!0}}},[t._v("查看导入格式")])],1),t._v(" "),t.chapterList.length?a("div",{staticClass:"pagination-box"},[a("el-pagination",{attrs:{total:t.total,"current-page":t.currentPage,"page-sizes":[5,10,14,28],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()])]),t._v(" "),a("el-dialog",{attrs:{title:"章节Json格式",visible:t.showGeshi,width:"30%"},on:{"update:visible":function(e){t.showGeshi=e},close:function(e){t.showGeshi=!1}}},[a("div",[a("json-viewer",{attrs:{value:t.jsonData,"expand-depth":5,copyable:"",boxed:"",sort:""}})],1),t._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.showGeshi=!1}}},[t._v("我知道了")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:"文件导入",visible:t.showFileDialog,width:"30%"},on:{"update:visible":function(e){t.showFileDialog=e},close:function(e){t.showFileDialog=!1}}},[a("div",{staticClass:"import-form"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-position":"top",size:"small"}},[a("el-form-item",{attrs:{label:"选择章节文件"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{name:"design",action:"","on-remove":t.handleRemove,"on-change":t.fileChange,multiple:"","auto-upload":!1,"with-credentials":!0,limit:1}},[a("el-button",{attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[t._v("选取章节文件")])],1)],1)],1),t._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("保存")]),t._v(" "),a("el-button",{on:{click:function(e){t.showFileDialog=!1}}},[t._v("取消")])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:t.showItem.chapter_name,visible:t.showContent,width:"30%"},on:{"update:visible":function(e){t.showContent=e},close:function(e){t.showContent=!1}}},[a("div",{staticClass:"content-wrap",domProps:{innerHTML:t._s(t.showItem.content)}})])],1)},r=[],i=(a("a481"),a("7f7f"),a("d573")),o=a("988c"),c=a("5f87"),s={name:"LibraryDetail",data:function(){return{id:this.$route.query.id,total:0,currentPage:1,pageSize:10,bookInfo:{},chapterList:[],showItem:{},showContent:!1,showFileDialog:!1,showGeshi:!1,uplaodUrl:"http://localhost:3000/admin-api/chapter/imporChapter?id="+this.$route.query.id,fileList:[],token:Object(c["a"])(),form:{chapter:{}},jsonData:[{chapter_index:"章节索引",chapter_name:"章节名称",content:"章节内容"}]}},created:function(){this.getDetail(),this.getChapter()},methods:{getDetail:function(){var t=this;i["a"].get_library({id:t.id}).then((function(e){t.bookInfo=e.data}))},getChapter:function(){var t=this;o["a"].get_chapter({currentPage:this.currentPage,pageSize:this.pageSize,id:this.id}).then((function(e){t.chapterList=e.data.list,t.total=e.data.count,t.list=e.data.list}))},handleRemove:function(t,e){console.log(t,e)},fileChange:function(t,e){var a="application/json"===t.raw.type;if(!a)return this.$message.error("上传文件只能是 Json 格式!"),e.pop(),!1;var n=this.form.chapter.name===t.name;if(n)return this.$message.error("当前文件已经存在!"),e.pop(),!1;this.form.chapter=t},handleCurrentChange:function(t){this.currentPage=t,this.getChapter()},handleSizeChange:function(t){this.pageSize=t,this.getChapter()},onSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;var a=new FormData;a.append("file",e.form.chapter.raw,e.form.chapter.raw.name),a.append("id",e.id);var n=e.$loading({lock:!0,text:"文件上传中",spinner:"el-icon-loading",background:"rgba(255,255, 255, 0.5)"});console.log(a),o["a"].importChapter(a).then((function(t){200!==t.code?e.$message({message:t.msg,type:"error"}):(e.$message({message:"导入成功",type:"success"}),n.close(),e.getChapter(),e.showFileDialog=!1)})).catch((function(){n.close()}))}))},addChapter:function(){this.showFileDialog=!0},showContents:function(t){t.content=t.content.replace(/\n|\r\n/g,"<br>"),this.showItem=t,this.showContent=!0}}},l=s,u=(a("53dc"),a("2877")),p=Object(u["a"])(l,n,r,!1,null,"893b608e",null);e["default"]=p.exports},d573:function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"a",(function(){return i}));var n=a("b775"),r={getList:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"get",params:t})},add_library_class:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"post",data:t})},update_library_class:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"put",data:t})},delete_library_class:function(t){return Object(n["a"])({url:"/admin-api/library_class/",method:"delete",params:t})}},i={get_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"get",params:t})},add_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"post",data:t})},update_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"put",data:t})},delete_library:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"delete",params:t})},change_status:function(t){return Object(n["a"])({url:"/admin-api/library/",method:"patch",data:t})}}}}]);