"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[927],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return h}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(r),h=i,f=d["".concat(c,".").concat(h)]||d[h]||p[h]||a;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1527:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return d}});var n=r(7462),i=r(3366),a=(r(7294),r(3905)),o=["components"],s={sidebar_position:2},c="\ud83d\udee0 Architecture",l={unversionedId:"architecture",id:"architecture",isDocsHomePage:!1,title:"\ud83d\udee0 Architecture",description:"This project consists of three primary building blocks:",source:"@site/docs/architecture.md",sourceDirName:".",slug:"/architecture",permalink:"/kindly/architecture",editUrl:"https://github.com/unicef/kindly/edit/main/website/docs/architecture.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\ud83e\udd17 Introduction",permalink:"/kindly/"},next:{title:"\ud83d\udcda Benchmarking Research",permalink:"/kindly/research"}},u=[],p={toc:u};function d(e){var t=e.components,r=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"-architecture"},"\ud83d\udee0 Architecture"),(0,a.kt)("p",null,"This project consists of three primary building blocks:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Python Training Server"),": This server rebuilds the model using data obtained from the Continuous Integration (CI) server. Because training data can get exponentially large, it requires ideally a GPU to perform this task quickly. However, it can start with a CPU if training data is relatively small (say 30 MB - 50 MB). The model file that is generated at the end of the process is stored on the Python API Server to be used in prediction on the frontend client. In the absence of the actual server, the current implementation uses a service called Huggingface.com, where large model files and repositories are hosted to be used by data scientists.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Python API Server"),": This server hosts the Machine Learning (ML) model and the initial Application Programming Interface (API) to check the text against. Only a single endpoint is provided currently.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"NodeJS Client Server"),": This server hosts the frontend that users can interact with. Interacts with the Python API Server to check whether the input text is offensive or not, and reports the result back to the user. The client also sends training data from a form off to GitHub to be saved in the repository as a text file."))),(0,a.kt)("p",null,"Additionally, it also leverages the following infrastructure:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"GitHub")," hosts the source code of both the NodeJS Client Server and the Python API Server. It hosts the training data coming from the form on the Node JS Client website as text files (this seems like a convention in the ML field).")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"CI/CD Pipelines")," trigger the client website and the API to be rebuilt and deployed whenever code is updated in GitHub. It also passes on updated model training data text files and model updates to the Python Training server."))))}d.isMDXComponent=!0}}]);