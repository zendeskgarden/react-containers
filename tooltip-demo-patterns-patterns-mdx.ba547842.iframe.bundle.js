/*! For license information please see tooltip-demo-patterns-patterns-mdx.ba547842.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[9759,6385],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/tooltip/demo/~patterns/patterns.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_project_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_patterns_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/tooltip/demo/~patterns/patterns.stories.tsx");function _createMdxContent(props){const _components={code:"code",h1:"h1",h2:"h2",p:"p",...(0,_home_circleci_project_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_2__.a)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.h_,{of:_patterns_stories__WEBPACK_IMPORTED_MODULE_4__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"patterns",children:"Patterns"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"focus",children:"Focus"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Demonstrate ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"openTooltip"})," and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"closeTooltip"})," overrides."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.oG,{of:_patterns_stories__WEBPACK_IMPORTED_MODULE_4__.Focus})})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_project_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_2__.a)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/tooltip/demo/~patterns/patterns.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Focus:()=>Focus,__namedExportsOrder:()=>__namedExportsOrder,default:()=>patterns_stories});var react=__webpack_require__("./node_modules/react/index.js"),esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),classnames=(__webpack_require__("./node_modules/@storybook/react/dist/index.mjs"),__webpack_require__("./node_modules/classnames/index.js")),classnames_default=__webpack_require__.n(classnames),useTooltip=__webpack_require__("./packages/tooltip/src/useTooltip.ts");const FocusStory=()=>{const{getTooltipProps,getTriggerProps,isVisible,openTooltip,closeTooltip}=(0,useTooltip.l)();return react.createElement(react.Fragment,null,react.createElement("div",(0,esm_extends.Z)({className:"bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded"},getTriggerProps()),"Trigger, then tab to the tooltip <button>"),react.createElement("div",(0,esm_extends.Z)({className:classnames_default()("bg-grey-800","inline-block","mt-1","px-2","rounded-sm","text-sm","text-white",isVisible?"visible":"invisible")},getTooltipProps({onFocus:()=>openTooltip(),onBlur:()=>closeTooltip(0)})),"Tooltip with"," ",react.createElement("button",{className:"bg-grey-600 border border-solid border-grey-500 m-1 py-0.5 px-1 rounded-sm text-white"},"tabbable")," ","focus"))};FocusStory.__docgenInfo={description:"",methods:[],displayName:"FocusStory"};const patterns_stories={title:"Packages/Tooltip/[patterns]"},Focus={render:args=>react.createElement(FocusStory,args),name:"Focus"};Focus.parameters={...Focus.parameters,docs:{...Focus.parameters?.docs,source:{originalSource:"{\n  render: args => <FocusStory {...args} />,\n  name: 'Focus'\n}",...Focus.parameters?.docs?.source}}};const __namedExportsOrder=["Focus"]},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/react/dist/chunk-JXRZ2CQ5.mjs"),__webpack_require__("./node_modules/@storybook/react/dist/chunk-JSBTCGGE.mjs");var _storybook_global__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/global"),{window:globalWindow}=(__webpack_require__("@storybook/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react")},"./packages/tooltip/src/useTooltip.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{l:()=>useTooltip});var react=__webpack_require__("./node_modules/react/index.js"),generateUID=function(){var counter=1,map=new WeakMap,uid=function(item,index){return"number"==typeof item||"string"==typeof item?index?"idx-".concat(index):"val-".concat(item):map.has(item)?"uid"+map.get(item):(map.set(item,counter++),uid(item))};return uid},createSource=(generateUID(),function(prefix){return void 0===prefix&&(prefix=""),{value:1,prefix,uid:generateUID()}}),counter=createSource(),source=react.createContext(createSource()),useUIDState=function(){var context=(0,react.useContext)(source),uid=(0,react.useState)((function(){return function(context){var quartz=context||counter,prefix=function(source){return source?source.prefix:""}(quartz),id=function(source){return source.value++}(quartz),uid=prefix+id;return{uid,gen:function(item){return uid+quartz.uid(item)}}}(context)}))[0];return uid},composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts");const useTooltip=function(_temp){let{delayMilliseconds=500,id,isVisible}=void 0===_temp?{}:_temp;const[visibility,setVisibility]=(0,react.useState)(isVisible),seed=useUIDState().gen,_id=(0,react.useMemo)((()=>id||seed("tooltip_storybook")),[id,seed]),isMounted=(0,react.useRef)(!1),openTooltipTimeoutId=(0,react.useRef)(),closeTooltipTimeoutId=(0,react.useRef)(),openTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(closeTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!0)}),delayMs);openTooltipTimeoutId.current=Number(timerId)},closeTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(openTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!1)}),delayMs);closeTooltipTimeoutId.current=Number(timerId)};(0,react.useEffect)((()=>(isMounted.current=!0,()=>{isMounted.current=!1})),[]),(0,react.useEffect)((()=>()=>{clearTimeout(openTooltipTimeoutId.current),clearTimeout(closeTooltipTimeoutId.current)}),[closeTooltipTimeoutId,openTooltipTimeoutId]);return{isVisible:visibility,getTooltipProps:function(_temp3){let{role="tooltip",onMouseEnter,onMouseLeave,...other}=void 0===_temp3?{}:_temp3;return{role,onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,(()=>closeTooltip())),"aria-hidden":!visibility,id:_id,...other}},getTriggerProps:function(_temp2){let{tabIndex=0,onMouseEnter,onMouseLeave,onFocus,onBlur,onKeyDown,...other}=void 0===_temp2?{}:_temp2;return{tabIndex,onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,(()=>closeTooltip())),onFocus:(0,composeEventHandlers.M)(onFocus,(()=>openTooltip())),onBlur:(0,composeEventHandlers.M)(onBlur,(()=>closeTooltip(0))),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{event.key===KeyboardEventValues.t.ESCAPE&&visibility&&closeTooltip(0)})),"aria-describedby":_id,"data-garden-container-id":"containers.tooltip","data-garden-container-version":"storybook",...other}},openTooltip,closeTooltip}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);