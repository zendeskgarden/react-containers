/*! For license information please see scrollregion-demo-scrollregion-stories-mdx.13948d61.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[346],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/scrollregion/demo/scrollregion.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>scrollregion_stories,scrollRegion:()=>scrollRegion});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),lodash_debounce=__webpack_require__("./node_modules/lodash.debounce/index.js"),lodash_debounce_default=__webpack_require__.n(lodash_debounce);function useScrollRegion(_ref){let{containerRef,dependency}=_ref;const[containerTabIndex,setContainerTabIndex]=(0,react.useState)(),updateContainerTabIndex=(0,react.useMemo)((()=>lodash_debounce_default()((()=>{if(containerRef.current){const regionContent=containerRef.current.children[0],regionContentHeight=regionContent.scrollHeight,regionContentWidth=regionContent.scrollWidth,containerHeight=containerRef.current.offsetHeight,containerWidth=containerRef.current.offsetWidth;setContainerTabIndex(regionContentWidth>containerWidth||regionContentHeight>containerHeight?0:void 0)}}),100)),[containerRef,setContainerTabIndex]);return(0,react.useEffect)((()=>(addEventListener("resize",updateContainerTabIndex),updateContainerTabIndex(),()=>{removeEventListener("resize",updateContainerTabIndex),updateContainerTabIndex.cancel()})),[updateContainerTabIndex,dependency]),containerTabIndex}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScrollRegionContainer=_ref=>{let{children,render=children,...props}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render(useScrollRegion(props))})};ScrollRegionContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,containerRef:prop_types_default().any.isRequired,dependency:prop_types_default().any};try{ScrollRegionContainer.displayName="ScrollRegionContainer",ScrollRegionContainer.__docgenInfo={description:"",displayName:"ScrollRegionContainer",props:{render:{defaultValue:null,description:"A render prop function which receives the tab index",name:"render",required:!1,type:{name:"((tabIndex: number) => ReactNode)"}},children:{defaultValue:null,description:"A children render prop function which receives the tab index",name:"children",required:!1,type:{name:"((tabIndex: number) => ReactNode)"}},containerRef:{defaultValue:null,description:"A [ref](https://reactjs.org/docs/refs-and-the-dom.html) pointing to the scroll region's container element",name:"containerRef",required:!0,type:{name:"RefObject<HTMLElement>"}},dependency:{defaultValue:null,description:"A value that determines if the scroll region tab index should be recalculated",name:"dependency",required:!1,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/scrollregion/src/ScrollRegionContainer.tsx#ScrollRegionContainer"]={docgenInfo:ScrollRegionContainer.__docgenInfo,name:"ScrollRegionContainer",path:"packages/scrollregion/src/ScrollRegionContainer.tsx#ScrollRegionContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const Component=(0,react.forwardRef)(((_ref,ref)=>{let{children,height,width,...props}=_ref;return(0,jsx_runtime.jsx)("div",{className:classnames_default()("border","border-solid","overflow-scroll",0===props.tabIndex?"border-blue-600":"border-grey-300"),style:{height,width},ref,...props,children:(0,jsx_runtime.jsx)("p",{className:"p-2",children})})}));Component.displayName="Component";const Container=_ref2=>{let{containerRef,height,width,...props}=_ref2;return(0,jsx_runtime.jsx)(ScrollRegionContainer,{containerRef,...props,children:containerTabIndex=>(0,jsx_runtime.jsx)(Component,{height,width,tabIndex:containerTabIndex,ref:containerRef,children:props.dependency})})};Container.displayName="Container";const Hook=_ref3=>{let{containerRef,height,width,...props}=_ref3;const containerTabIndex=useScrollRegion({containerRef,...props});return(0,jsx_runtime.jsx)(Component,{height,width,tabIndex:containerTabIndex,ref:containerRef,children:props.dependency})};Hook.displayName="Hook";const ScrollRegionStory=_ref4=>{let{as,...props}=_ref4;const ScrollRegion=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props});return(0,jsx_runtime.jsx)(ScrollRegion,{})};ScrollRegionStory.displayName="ScrollRegionStory";const DEPENDENCY="Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens corn soko endive gumbo gourd.  Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.",README_namespaceObject="# @zendeskgarden/container-scrollregion [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-scrollregion\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-scrollregion\n\nThis package includes containers relating to scroll region in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-scrollregion\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\n### As a hook\n\nA scroll region is an area of the web page that contains scrollable content. The\nscroll region hook allows keyboard users to focus and scroll the region. A\nscroll region with a dynamic layout should use the `dependency` option. The hook\nre-calculates the tab-index when the `dependency` value changes. If there are\nmultiple dependency values, a memoized object can be used as the `dependency`\nvalue.\n\n```jsx\nimport { useScrollRegion } from '@zendeskgarden/container-scrollregion';\n\nconst ScrollRegion = () => {\n  const containerRef = useRef();\n  const containerTabIndex = useScrollRegion({ containerRef });\n\n  return (\n    <div ref={containerRef} tabIndex={containerTabIndex}>\n      <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea.</p>\n    </div>\n  );\n};\n```\n\n### As a Render Prop Component\n\n```jsx\nimport { ScrollRegionContainer } from '@zendeskgarden/container-scrollregion';\n\nconst ScrollRegion = () => {\n  const containerRef = useRef();\n\n  return (\n    <ScrollRegionContainer containerRef={containerRef}>\n      {containerTabIndex => (\n        <div ref={containerRef} tabIndex={containerTabIndex}>\n          <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea.</p>\n        </div>\n      )}\n    </ScrollRegionContainer>;\n  )\n}\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/ScrollRegion",component:ScrollRegionContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"ScrollRegion",args:{as:"hook",height:100,width:200,dependency:DEPENDENCY},argTypes:{containerRef:{control:!1},as:{options:["container","hook"],control:"radio",table:{category:"Story"}},height:{table:{category:"Story"}},width:{table:{category:"Story"}}},children:args=>{const containerRef=(0,react.useRef)();return(0,jsx_runtime.jsx)(ScrollRegionStory,{...args,containerRef})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const scrollRegion=args=>{const containerRef=(0,react.useRef)();return(0,jsx_runtime.jsx)(ScrollRegionStory,{...args,containerRef})};scrollRegion.storyName="ScrollRegion",scrollRegion.argTypes={containerRef:{control:!1},as:{options:["container","hook"],control:"radio",table:{category:"Story"}},height:{table:{category:"Story"}},width:{table:{category:"Story"}}},scrollRegion.args={as:"hook",height:100,width:200,dependency:DEPENDENCY},scrollRegion.parameters={storySource:{source:"args => {\n  const containerRef = useRef();\n  return <ScrollRegionStory {...args} containerRef={containerRef} />;\n}"}};const componentMeta={title:"Packages/ScrollRegion",component:ScrollRegionContainer,tags:["stories-mdx"],includeStories:["scrollRegion"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const scrollregion_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/global"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/lodash.debounce/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var NAN=NaN,symbolTag="[object Symbol]",reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt,freeGlobal="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),objectToString=Object.prototype.toString,nativeMax=Math.max,nativeMin=Math.min,now=function(){return root.Date.now()};function isObject(value){var type=typeof value;return!!value&&("object"==type||"function"==type)}function toNumber(value){if("number"==typeof value)return value;if(function isSymbol(value){return"symbol"==typeof value||function isObjectLike(value){return!!value&&"object"==typeof value}(value)&&objectToString.call(value)==symbolTag}(value))return NAN;if(isObject(value)){var other="function"==typeof value.valueOf?value.valueOf():value;value=isObject(other)?other+"":other}if("string"!=typeof value)return 0===value?value:+value;value=value.replace(reTrim,"");var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NAN:+value}module.exports=function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=!1,maxing=!1,trailing=!0;if("function"!=typeof func)throw new TypeError("Expected a function");function invokeFunc(time){var args=lastArgs,thisArg=lastThis;return lastArgs=lastThis=void 0,lastInvokeTime=time,result=func.apply(thisArg,args)}function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime;return void 0===lastCallTime||timeSinceLastCall>=wait||timeSinceLastCall<0||maxing&&time-lastInvokeTime>=maxWait}function timerExpired(){var time=now();if(shouldInvoke(time))return trailingEdge(time);timerId=setTimeout(timerExpired,function remainingWait(time){var result=wait-(time-lastCallTime);return maxing?nativeMin(result,maxWait-(time-lastInvokeTime)):result}(time))}function trailingEdge(time){return timerId=void 0,trailing&&lastArgs?invokeFunc(time):(lastArgs=lastThis=void 0,result)}function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(void 0===timerId)return function leadingEdge(time){return lastInvokeTime=time,timerId=setTimeout(timerExpired,wait),leading?invokeFunc(time):result}(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return void 0===timerId&&(timerId=setTimeout(timerExpired,wait)),result}return wait=toNumber(wait)||0,isObject(options)&&(leading=!!options.leading,maxWait=(maxing="maxWait"in options)?nativeMax(toNumber(options.maxWait)||0,wait):maxWait,trailing="trailing"in options?!!options.trailing:trailing),debounced.cancel=function cancel(){void 0!==timerId&&clearTimeout(timerId),lastInvokeTime=0,lastArgs=lastCallTime=lastThis=timerId=void 0},debounced.flush=function flush(){return void 0===timerId?result:trailingEdge(now())},debounced}}}]);