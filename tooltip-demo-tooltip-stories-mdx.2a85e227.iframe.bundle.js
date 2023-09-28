/*! For license information please see tooltip-demo-tooltip-stories-mdx.2a85e227.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[762],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/tooltip/demo/tooltip.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>tooltip_stories,tooltip:()=>tooltip});__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useTooltip=__webpack_require__("./packages/tooltip/src/useTooltip.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TooltipContainer=_ref=>{let{children,render=children,...options}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render((0,useTooltip.l)(options))})};TooltipContainer.defaultProps={delayMilliseconds:500},TooltipContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,delayMilliseconds:prop_types_default().number,isVisible:prop_types_default().bool};try{TooltipContainer.displayName="TooltipContainer",TooltipContainer.__docgenInfo={description:"",displayName:"TooltipContainer",props:{render:{defaultValue:null,description:"A render prop function which receives tooltip state and prop getters",name:"render",required:!1,type:{name:"((options: IUseTooltipReturnValue) => ReactNode)"}},children:{defaultValue:null,description:"A children render prop function which receives tooltip state and prop getters",name:"children",required:!1,type:{name:"((options: IUseTooltipReturnValue) => ReactNode)"}},delayMilliseconds:{defaultValue:{value:"500"},description:"Milliseconds of delay before open/close of tooltip is initiated",name:"delayMilliseconds",required:!1,type:{name:"number"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},isVisible:{defaultValue:null,description:"Control visibility state of the tooltip",name:"isVisible",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/tooltip/src/TooltipContainer.tsx#TooltipContainer"]={docgenInfo:TooltipContainer.__docgenInfo,name:"TooltipContainer",path:"packages/tooltip/src/TooltipContainer.tsx#TooltipContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const Component=_ref=>{let{getTooltipProps,getTriggerProps,isVisible}=_ref;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("span",{className:classnames_default()("bg-grey-800","inline-block","mb-1","px-2","py-0.5","rounded-sm","text-sm","text-white",isVisible?"visible":"invisible"),...getTooltipProps(),children:"Tooltip"}),(0,jsx_runtime.jsx)("div",{className:"bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded",...getTriggerProps(),children:"Trigger"})]})},Container=props=>(0,jsx_runtime.jsx)(TooltipContainer,{...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{...containerProps})});Container.displayName="Container";const Hook=props=>{const hookProps=(0,useTooltip.l)(props);return(0,jsx_runtime.jsx)(Component,{...hookProps})};Hook.displayName="Hook";const TooltipStory=_ref2=>{let{as,...props}=_ref2;const Tooltip=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props});return(0,jsx_runtime.jsx)(Tooltip,{})};TooltipStory.displayName="TooltipStory";const README_namespaceObject="# @zendeskgarden/container-tooltip [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-tooltip\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-tooltip\n\nThis package includes containers relating to tooltip in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-tooltip\n```\n\n## Usage\n\nThis container implements the\n[tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern\nand can be used to build a tooltip component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useTooltip\n\n```jsx\nimport { useTooltip } from '@zendeskgarden/container-tooltip';\n\nconst Tooltip = () => {\n  const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({\n    isVisible: false,\n    delayMilliseconds: 500\n  });\n\n  const styles = {\n    visibility: isVisible ? 'visible' : 'hidden',\n    background: '#1f73b7',\n    padding: '10px',\n    margin: '6px 0',\n    color: '#fff'\n  };\n\n  return (\n    <>\n      <div {...getTooltipProps({ style: styles })}>Tooltip</div>\n      <button {...getTriggerProps()}>Trigger</button>\n    </>\n  );\n};\n```\n\n### TooltipContainer\n\n```jsx\nimport { TooltipContainer } from '@zendeskgarden/container-tooltip';\n\nconst Tooltip = () => {\n  return (\n    <TooltipContainer isVisible={false} delayMilliseconds={500}>\n      {({ isVisible, getTooltipProps, getTriggerProps }) => {\n        const styles = {\n          visibility: isVisible ? 'visible' : 'hidden',\n          background: '#1f73b7',\n          padding: '10px',\n          margin: '6px 0',\n          color: '#fff'\n        };\n\n        return (\n          <>\n            <div\n              {...getTooltipProps({\n                style: styles\n              })}\n            >\n              Tooltip\n            </div>\n            <button {...getTriggerProps()}>Trigger</button>\n          </>\n        );\n      }}\n    </TooltipContainer>\n  );\n};\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Tooltip",component:TooltipContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Tooltip",args:{as:"hook",delayMilliseconds:TooltipContainer.defaultProps.delayMilliseconds},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},children:args=>(0,jsx_runtime.jsx)(TooltipStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const tooltip=args=>(0,jsx_runtime.jsx)(TooltipStory,{...args});tooltip.storyName="Tooltip",tooltip.argTypes={as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},tooltip.args={as:"hook",delayMilliseconds:TooltipContainer.defaultProps.delayMilliseconds},tooltip.parameters={storySource:{source:"args => <TooltipStory {...args} />"}};const componentMeta={title:"Packages/Tooltip",component:TooltipContainer,tags:["stories-mdx"],includeStories:["tooltip"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const tooltip_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/global"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/tooltip/src/useTooltip.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{l:()=>useTooltip});var react=__webpack_require__("./node_modules/react/index.js"),generateUID=function(){var counter=1,map=new WeakMap,uid=function(item,index){return"number"==typeof item||"string"==typeof item?index?"idx-".concat(index):"val-".concat(item):map.has(item)?"uid"+map.get(item):(map.set(item,counter++),uid(item))};return uid},createSource=(generateUID(),function(prefix){return void 0===prefix&&(prefix=""),{value:1,prefix,uid:generateUID()}}),counter=createSource(),source=react.createContext(createSource()),useUIDState=function(){var context=(0,react.useContext)(source),uid=(0,react.useState)((function(){return function(context){var quartz=context||counter,prefix=function(source){return source?source.prefix:""}(quartz),id=function(source){return source.value++}(quartz),uid=prefix+id;return{uid,gen:function(item){return uid+quartz.uid(item)}}}(context)}))[0];return uid},composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts");const useTooltip=function(_temp){let{delayMilliseconds=500,id,isVisible}=void 0===_temp?{}:_temp;const[visibility,setVisibility]=(0,react.useState)(isVisible),seed=useUIDState().gen,_id=(0,react.useMemo)((()=>id||seed("tooltip_storybook")),[id,seed]),isMounted=(0,react.useRef)(!1),openTooltipTimeoutId=(0,react.useRef)(),closeTooltipTimeoutId=(0,react.useRef)(),openTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(closeTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!0)}),delayMs);openTooltipTimeoutId.current=Number(timerId)},closeTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(openTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!1)}),delayMs);closeTooltipTimeoutId.current=Number(timerId)};(0,react.useEffect)((()=>(isMounted.current=!0,()=>{isMounted.current=!1})),[]),(0,react.useEffect)((()=>()=>{clearTimeout(openTooltipTimeoutId.current),clearTimeout(closeTooltipTimeoutId.current)}),[closeTooltipTimeoutId,openTooltipTimeoutId]);return{isVisible:visibility,getTooltipProps:function(_temp3){let{role="tooltip",onMouseEnter,onMouseLeave,...other}=void 0===_temp3?{}:_temp3;return{role,onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,(()=>closeTooltip())),"aria-hidden":!visibility,id:_id,...other}},getTriggerProps:function(_temp2){let{tabIndex=0,onMouseEnter,onMouseLeave,onFocus,onBlur,onKeyDown,...other}=void 0===_temp2?{}:_temp2;return{tabIndex,onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,(()=>closeTooltip())),onFocus:(0,composeEventHandlers.M)(onFocus,(()=>openTooltip())),onBlur:(0,composeEventHandlers.M)(onBlur,(()=>closeTooltip(0))),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{event.keyCode===KeyboardEventValues.n.ESCAPE&&visibility&&closeTooltip(0)})),"aria-describedby":_id,"data-garden-container-id":"containers.tooltip","data-garden-container-version":"storybook",...other}},openTooltip,closeTooltip}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}}]);