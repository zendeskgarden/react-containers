/*! For license information please see tooltip-demo-patterns-patterns-stories-mdx.acb2f148.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[440],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/tooltip/demo/~patterns/patterns.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>patterns_stories,focus:()=>patterns_stories_focus});__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),classnames=(__webpack_require__("./node_modules/@storybook/react/dist/index.mjs"),__webpack_require__("./node_modules/classnames/index.js")),classnames_default=__webpack_require__.n(classnames),useTooltip=__webpack_require__("./packages/tooltip/src/useTooltip.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FocusStory=()=>{const{getTooltipProps,getTriggerProps,isVisible,openTooltip,closeTooltip}=(0,useTooltip.l)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:"bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded",...getTriggerProps(),children:"Trigger, then tab to the tooltip <button>"}),(0,jsx_runtime.jsxs)("div",{className:classnames_default()("bg-grey-800","inline-block","mt-1","px-2","rounded-sm","text-sm","text-white",isVisible?"visible":"invisible"),...getTooltipProps({onFocus:()=>openTooltip(),onBlur:()=>closeTooltip(0)}),children:["Tooltip with"," ",(0,jsx_runtime.jsx)("button",{className:"bg-grey-600 border border-solid border-grey-500 m-1 py-0.5 px-1 rounded-sm text-white",children:"tabbable"})," ","focus"]})]})};function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Tooltip/[patterns]"}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"patterns",children:"Patterns"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"focus",children:"Focus"}),"\n",(0,jsx_runtime.jsxs)(_components.p,{children:["Demonstrate ",(0,jsx_runtime.jsx)(_components.code,{children:"openTooltip"})," and ",(0,jsx_runtime.jsx)(_components.code,{children:"closeTooltip"})," overrides."]}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Focus",children:args=>(0,jsx_runtime.jsx)(FocusStory,{...args})})})]})}const patterns_stories_focus=args=>(0,jsx_runtime.jsx)(FocusStory,{...args});patterns_stories_focus.storyName="Focus",patterns_stories_focus.parameters={storySource:{source:"args => <FocusStory {...args} />"}};const componentMeta={title:"Packages/Tooltip/[patterns]",tags:["stories-mdx"],includeStories:["focus"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const patterns_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/tooltip/src/useTooltip.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{l:()=>useTooltip});var react=__webpack_require__("./node_modules/react/index.js"),generateUID=function(){var counter=1,map=new WeakMap,uid=function(item,index){return"number"==typeof item||"string"==typeof item?index?"idx-".concat(index):"val-".concat(item):map.has(item)?"uid"+map.get(item):(map.set(item,counter++),uid(item))};return uid},createSource=(generateUID(),function(prefix){return void 0===prefix&&(prefix=""),{value:1,prefix,uid:generateUID()}}),counter=createSource(),source=react.createContext(createSource()),useUIDState=function(){var context=(0,react.useContext)(source),uid=(0,react.useState)((function(){return function(context){var quartz=context||counter,prefix=function(source){return source?source.prefix:""}(quartz),id=function(source){return source.value++}(quartz),uid=prefix+id;return{uid,gen:function(item){return uid+quartz.uid(item)}}}(context)}))[0];return uid},composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts");const useTooltip=function(_temp){let{delayMilliseconds=500,id,isVisible}=void 0===_temp?{}:_temp;const[visibility,setVisibility]=(0,react.useState)(isVisible),seed=useUIDState().gen,_id=(0,react.useMemo)((()=>id||seed("tooltip_storybook")),[id,seed]),isMounted=(0,react.useRef)(!1),openTooltipTimeoutId=(0,react.useRef)(),closeTooltipTimeoutId=(0,react.useRef)(),openTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(closeTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!0)}),delayMs);openTooltipTimeoutId.current=Number(timerId)},closeTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(openTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!1)}),delayMs);closeTooltipTimeoutId.current=Number(timerId)};(0,react.useEffect)((()=>(isMounted.current=!0,()=>{isMounted.current=!1})),[]),(0,react.useEffect)((()=>()=>{clearTimeout(openTooltipTimeoutId.current),clearTimeout(closeTooltipTimeoutId.current)}),[closeTooltipTimeoutId,openTooltipTimeoutId]);return{isVisible:visibility,getTooltipProps:function(_temp3){let{role="tooltip",onMouseEnter,onMouseLeave,...other}=void 0===_temp3?{}:_temp3;return{role,onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,(()=>closeTooltip())),"aria-hidden":!visibility,id:_id,...other}},getTriggerProps:function(_temp2){let{tabIndex=0,onMouseEnter,onMouseLeave,onFocus,onBlur,onKeyDown,...other}=void 0===_temp2?{}:_temp2;return{tabIndex,onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,(()=>closeTooltip())),onFocus:(0,composeEventHandlers.M)(onFocus,(()=>openTooltip())),onBlur:(0,composeEventHandlers.M)(onBlur,(()=>closeTooltip(0))),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{event.keyCode===KeyboardEventValues.n.ESCAPE&&visibility&&closeTooltip(0)})),"aria-describedby":_id,"data-garden-container-id":"containers.tooltip","data-garden-container-version":"storybook",...other}},openTooltip,closeTooltip}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}}]);