/*! For license information please see tooltip-demo-tooltip-mdx.7aea3e30.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[7588,6094],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/tooltip/demo/tooltip.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-tooltip [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-tooltip\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-tooltip\n\nThis package includes containers relating to tooltip in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-tooltip\n```\n\n## Usage\n\nThis container implements the\n[tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern\nand can be used to build a tooltip component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useTooltip\n\n```jsx\nimport { useTooltip } from '@zendeskgarden/container-tooltip';\n\nconst Tooltip = () => {\n  const { isVisible, getTooltipProps, getTriggerProps } = useTooltip({\n    isVisible: false,\n    delayMilliseconds: 500\n  });\n\n  const styles = {\n    visibility: isVisible ? 'visible' : 'hidden',\n    background: '#1f73b7',\n    padding: '10px',\n    margin: '6px 0',\n    color: '#fff'\n  };\n\n  return (\n    <>\n      <div {...getTooltipProps({ style: styles })}>Tooltip</div>\n      <button {...getTriggerProps()}>Trigger</button>\n    </>\n  );\n};\n```\n\n### TooltipContainer\n\n```jsx\nimport { TooltipContainer } from '@zendeskgarden/container-tooltip';\n\nconst Tooltip = () => {\n  return (\n    <TooltipContainer isVisible={false} delayMilliseconds={500}>\n      {({ isVisible, getTooltipProps, getTriggerProps }) => {\n        const styles = {\n          visibility: isVisible ? 'visible' : 'hidden',\n          background: '#1f73b7',\n          padding: '10px',\n          margin: '6px 0',\n          color: '#fff'\n        };\n\n        return (\n          <>\n            <div\n              {...getTooltipProps({\n                style: styles\n              })}\n            >\n              Tooltip\n            </div>\n            <button {...getTriggerProps()}>Trigger</button>\n          </>\n        );\n      }}\n    </TooltipContainer>\n  );\n};\n```\n";var tooltip_stories=__webpack_require__("./packages/tooltip/demo/tooltip.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",...(0,lib.R)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.W8,{of:tooltip_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.H2,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Hl,{children:(0,jsx_runtime.jsx)(dist.gG,{of:tooltip_stories.Tooltip})}),"\n",(0,jsx_runtime.jsx)(dist.oz,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.R)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/tooltip/demo/tooltip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Tooltip:()=>Tooltip,__namedExportsOrder:()=>__namedExportsOrder,default:()=>tooltip_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useTooltip=__webpack_require__("./packages/tooltip/src/useTooltip.ts");const TooltipContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render((0,useTooltip.f)(options)))};TooltipContainer.defaultProps={delayMilliseconds:500},TooltipContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,delayMilliseconds:prop_types_default().number,isVisible:prop_types_default().bool},TooltipContainer.__docgenInfo={description:"",methods:[],displayName:"TooltipContainer",props:{delayMilliseconds:{required:!1,tsType:{name:"number"},description:"Milliseconds of delay before open/close of tooltip is initiated",defaultValue:{value:"500",computed:!1},type:{name:"number"}},id:{required:!1,tsType:{name:"string"},description:""},isVisible:{required:!1,tsType:{name:"boolean"},description:"Control visibility state of the tooltip",type:{name:"bool"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseTooltipReturnValue) => React.ReactNode",signature:{arguments:[{type:{name:"IUseTooltipReturnValue"},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A render prop function which receives tooltip state and prop getters",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseTooltipReturnValue) => React.ReactNode",signature:{arguments:[{type:{name:"IUseTooltipReturnValue"},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A children render prop function which receives tooltip state and prop getters",type:{name:"func"}}}};var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),classnames=(__webpack_require__("./node_modules/@storybook/react/dist/index.mjs"),__webpack_require__("./node_modules/classnames/index.js")),classnames_default=__webpack_require__.n(classnames);const Component=_ref=>{let{getTooltipProps,getTriggerProps,isVisible}=_ref;return react.createElement(react.Fragment,null,react.createElement("span",(0,esm_extends.A)({className:classnames_default()("bg-grey-800","inline-block","mb-1","px-2","py-0.5","rounded-sm","text-sm","text-white",isVisible?"visible":"invisible")},getTooltipProps()),"Tooltip"),react.createElement("div",(0,esm_extends.A)({className:"bg-grey-200 border border-solid cursor-pointer px-3 py-2 rounded"},getTriggerProps()),"Trigger"))},Container=props=>react.createElement(TooltipContainer,props,(containerProps=>react.createElement(Component,containerProps))),Hook=props=>{const hookProps=(0,useTooltip.f)(props);return react.createElement(Component,hookProps)},TooltipStory=_ref2=>{let{as,...props}=_ref2;return"container"===as?react.createElement(Container,props):react.createElement(Hook,props)};TooltipStory.__docgenInfo={description:"",methods:[],displayName:"TooltipStory"};const tooltip_stories={title:"Packages/Tooltip",component:TooltipContainer},Tooltip={render:args=>react.createElement(TooltipStory,args),name:"Tooltip",args:{as:"hook",delayMilliseconds:TooltipContainer.defaultProps.delayMilliseconds},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}},__namedExportsOrder=["Tooltip"];Tooltip.parameters={...Tooltip.parameters,docs:{...Tooltip.parameters?.docs,source:{originalSource:"{\n  render: args => <TooltipStory {...args} />,\n  name: 'Tooltip',\n  args: {\n    as: 'hook',\n    delayMilliseconds: TooltipContainer.defaultProps!.delayMilliseconds\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    }\n  }\n}",...Tooltip.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-H7CJXHDS.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-XP5HYGXS.mjs"),__webpack_require__("@storybook/global")),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=(__webpack_require__("storybook/internal/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__.IX},"./packages/tooltip/src/useTooltip.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{f:()=>useTooltip});var react=__webpack_require__("./node_modules/react/index.js"),generateUID=function(){var counter=1,map=new WeakMap,uid=function(item,index){return"number"==typeof item||"string"==typeof item?index?"idx-".concat(index):"val-".concat(item):map.has(item)?"uid"+map.get(item):(map.set(item,counter++),uid(item))};return uid},createSource=(generateUID(),function(prefix){return void 0===prefix&&(prefix=""),{value:1,prefix,uid:generateUID()}}),counter=createSource(),source=react.createContext(createSource()),useUIDState=function(){var context=(0,react.useContext)(source),uid=(0,react.useState)((function(){return function(context){var quartz=context||counter,prefix=function(source){return source?source.prefix:""}(quartz),id=function(source){return source.value++}(quartz),uid=prefix+id;return{uid,gen:function(item){return uid+quartz.uid(item)}}}(context)}))[0];return uid},composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts");const useTooltip=function(_temp){let{delayMilliseconds=500,id,isVisible}=void 0===_temp?{}:_temp;const[visibility,setVisibility]=(0,react.useState)(isVisible),seed=useUIDState().gen,_id=(0,react.useMemo)((()=>id||seed("tooltip_storybook")),[id,seed]),isMounted=(0,react.useRef)(!1),openTooltipTimeoutId=(0,react.useRef)(),closeTooltipTimeoutId=(0,react.useRef)(),openTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(closeTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!0)}),delayMs);openTooltipTimeoutId.current=Number(timerId)},closeTooltip=function(delayMs){void 0===delayMs&&(delayMs=delayMilliseconds),clearTimeout(openTooltipTimeoutId.current);const timerId=setTimeout((()=>{isMounted.current&&setVisibility(!1)}),delayMs);closeTooltipTimeoutId.current=Number(timerId)};(0,react.useEffect)((()=>(isMounted.current=!0,()=>{isMounted.current=!1})),[]),(0,react.useEffect)((()=>()=>{clearTimeout(openTooltipTimeoutId.current),clearTimeout(closeTooltipTimeoutId.current)}),[closeTooltipTimeoutId,openTooltipTimeoutId]);return{isVisible:visibility,getTooltipProps:function(_temp3){let{role="tooltip",onMouseEnter,onMouseLeave,...other}=void 0===_temp3?{}:_temp3;return{role,onMouseEnter:(0,composeEventHandlers.m)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.m)(onMouseLeave,(()=>closeTooltip())),"aria-hidden":!visibility,id:_id,...other}},getTriggerProps:function(_temp2){let{tabIndex=0,onMouseEnter,onMouseLeave,onFocus,onBlur,onKeyDown,...other}=void 0===_temp2?{}:_temp2;return{tabIndex,onMouseEnter:(0,composeEventHandlers.m)(onMouseEnter,(()=>openTooltip())),onMouseLeave:(0,composeEventHandlers.m)(onMouseLeave,(()=>closeTooltip())),onFocus:(0,composeEventHandlers.m)(onFocus,(()=>openTooltip())),onBlur:(0,composeEventHandlers.m)(onBlur,(()=>closeTooltip(0))),onKeyDown:(0,composeEventHandlers.m)(onKeyDown,(event=>{event.key===KeyboardEventValues.R.ESCAPE&&visibility&&closeTooltip(0)})),"aria-describedby":_id,"data-garden-container-id":"containers.tooltip","data-garden-container-version":"storybook",...other}},openTooltip,closeTooltip}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{m:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);