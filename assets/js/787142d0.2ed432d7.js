"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[385],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return p}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=d(n),p=o,h=m["".concat(s,".").concat(p)]||m[p]||c[p]||a;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var d=2;d<a;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7555:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return u},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:3},s="Build from scratch",d={unversionedId:"ml-model/build-from-scratch",id:"ml-model/build-from-scratch",isDocsHomePage:!1,title:"Build from scratch",description:"Multiple different strategies can be used to build a machine learning model from scratch:",source:"@site/docs/ml-model/build-from-scratch.md",sourceDirName:"ml-model",slug:"/ml-model/build-from-scratch",permalink:"/kindly/ml-model/build-from-scratch",editUrl:"https://github.com/unicef/kindly/edit/main/website/docs/ml-model/build-from-scratch.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Prebuilt",permalink:"/kindly/ml-model/prebuilt"},next:{title:"Development",permalink:"/kindly/technical/development"}},u=[{value:"Deep Learning vs Machine Learning",id:"deep-learning-vs-machine-learning",children:[],level:2},{value:"Model Building",id:"model-building",children:[],level:2},{value:"Jupyter Notebook",id:"jupyter-notebook",children:[],level:2}],c={toc:u};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"build-from-scratch"},"Build from scratch"),(0,a.kt)("p",null,"Multiple different strategies can be used to build a machine learning model from scratch:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},'"Bag-of-words" is one simple strategy. Refer to this Google CodeLab that walks you thorugh the process of building a simple model from scratch.')),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"A model based on the TFIDF Vectorizer strategy was contributed by the community into the project by Emmanuel Djaba. This is new base model would be our second approach to home growing Kindly\u2019s own model using traditional machine learning until such a time where the strategy would have to be changed due to new information."))),(0,a.kt)("h2",{id:"deep-learning-vs-machine-learning"},"Deep Learning vs Machine Learning"),(0,a.kt)("p",null,"The Cardiff model from Huggingface uses the deep learning approach to identifying whereas the initial model created uses traditional ML. In simple terms, with deep learning, a lot of classified data is thrown at a neural network and it would figure out what is should look out for in predicting on its own. With traditional ML, a number of algorithmic steps are taken to try to point out features and what should be looked out for in the data, and prediction would be based off that."),(0,a.kt)("p",null,"Deep Learning involves using these packages or a combination of them to build \u201clayers\u201d of your model. A layer is a single filter or transformation of the full dataset you pass through the model. Sometimes a layer strips away some parts of the data, some other times too it adds to it or classifies and records it. This is the actual learning process. Multiple layers are created and combined to transform the input data such that the output of the model is your desired result or at least close to it. "),(0,a.kt)("h2",{id:"model-building"},"Model Building"),(0,a.kt)("p",null,"The general flow or process in building a model include. These can also be known as traditional ML steps:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Split",(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"This involves importing your full dataset,"),(0,a.kt)("li",{parentName:"ol"},"Dividing it into two sets; one for testing/validating and the other for training. The validation set is usually smaller than the training set."),(0,a.kt)("li",{parentName:"ol"},"This split ratio can be 20% is to 80% depending on the total size of your data and can be adjusted as necessary."),(0,a.kt)("li",{parentName:"ol"},"Some also further break down the training dataset into smaller chunks because training requires a lot of computing resources and can take a long time."),(0,a.kt)("li",{parentName:"ol"},"For Kindly, the initial dataset is very small so all of it can be used at once however, as more data is gathered over time, this would also have to be adjusted accordingly in the model."))),(0,a.kt)("li",{parentName:"ol"},"Model",(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"This is the actual building of the layers and transforming and tokenizing the data."),(0,a.kt)("li",{parentName:"ol"},"Tokenization is a process where classified dataset entries are converted into a format that a neural network in the model can understand and work on."),(0,a.kt)("li",{parentName:"ol"},"The model can then be saved into a single binary file and be called or used by Pytorch or Tensorflow (depending on the strategy you\u2019re using) in the API endpoints for Kindly."))),(0,a.kt)("li",{parentName:"ol"},"Train",(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},"This is where the python package\u2019s training strategy is employed to \u201cfit\u201d the dataset into the model. Different packages call this function different things such as \u2018.fit()\u2019 or \u2018.train()\u2019"))),(0,a.kt)("li",{parentName:"ol"},"Test / Validate")),(0,a.kt)("h2",{id:"jupyter-notebook"},"Jupyter Notebook"),(0,a.kt)("p",null,"The main tool used to build models is ",(0,a.kt)("a",{parentName:"p",href:"https://jupyter.org/"},"Jupyter Notebook")," which is based on the Python programming language. The file extension of a Jupyter Notebook is ipynb. It enables you to use the Machine Learning packages namely Keras, Pytorch, Scikitlearn and Tensorflow."))}m.isMDXComponent=!0}}]);