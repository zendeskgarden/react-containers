(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[192,2770],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/schedule/demo/schedule.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-schedule [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-schedule\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-schedule\n\nThis package includes containers relating to schedule in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-schedule\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\n### As a hook\n\nThe `useSchedule` hook implements a schedule (timer) and communicates when it has elapsed.\n\n```jsx\nimport { useSchedule } from '@zendeskgarden/container-schedule';\n\nconst Animation = () => {\n  const elapsed = useSchedule({ duration: 1000, delayMS: 0 });\n\n  return <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>;\n};\n```\n\n### As a Render Prop Component\n\n```jsx\nimport { ScheduleContainer } from '@zendeskgarden/container-schedule';\n\n<ScheduleContainer duration={1000} delayMS={0}>\n  {elapsed => <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>}\n</ScheduleContainer>;\n```\n\n## Info\n\nSee [react-loaders][loaders link] component as a non-trivial use of this.\n\n[loaders link]: https://github.com/zendeskgarden/react-components/tree/main/packages/loaders\n";var schedule_stories=__webpack_require__("./packages/schedule/demo/schedule.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",...(0,lib.R)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.W8,{of:schedule_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.H2,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Hl,{children:(0,jsx_runtime.jsx)(dist.gG,{of:schedule_stories.Schedule})}),"\n",(0,jsx_runtime.jsx)(dist.oz,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.R)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/schedule/demo/schedule.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Schedule:()=>Schedule,__namedExportsOrder:()=>__namedExportsOrder,default:()=>schedule_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);const useSchedule=function(_temp){let{duration=1250,delayMS=750,loop=!0}=void 0===_temp?{}:_temp;const[elapsed,setElapsed]=(0,react.useState)(0),[delayComplete,setDelayComplete]=(0,react.useState)(!1);return(0,react.useLayoutEffect)((()=>{let raf,start,loopTimeout,destroyed=!1;const tick=()=>{destroyed||(raf=requestAnimationFrame(performAnimationFrame))},performAnimationFrame=()=>{setElapsed(Date.now()-start),tick()},onStart=()=>{destroyed||(loopTimeout=setTimeout((()=>{cancelAnimationFrame(raf),setElapsed(Date.now()-start),loop&&onStart()}),duration),start=Date.now(),setDelayComplete(!0),tick())},renderingDelayTimeout=setTimeout(onStart,delayMS);return()=>{destroyed=!0,clearTimeout(renderingDelayTimeout),clearTimeout(loopTimeout),cancelAnimationFrame(raf)}}),[duration,delayMS,loop]),{elapsed:Math.min(1,elapsed/duration),delayMS,delayComplete}},ScheduleContainer=_ref=>{let{children,render=children,...props}=_ref;return react.createElement(react.Fragment,null,render(useSchedule(props)))};ScheduleContainer.defaultProps={duration:1250,delayMS:750,loop:!0},ScheduleContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,duration:prop_types_default().number,loop:prop_types_default().bool,delayMS:prop_types_default().number},ScheduleContainer.__docgenInfo={description:"",methods:[],displayName:"ScheduleContainer",props:{duration:{required:!1,tsType:{name:"number"},description:"The duration of a schedule in miliseconds",defaultValue:{value:"1250",computed:!1},type:{name:"number"}},delayMS:{required:!1,tsType:{name:"number"},description:"The delay in miliseconds prior to the beginning of the schedule",defaultValue:{value:"750",computed:!1},type:{name:"number"}},loop:{required:!1,tsType:{name:"boolean"},description:"Determines whether a schedule should loop",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseScheduleReturnValue) => React.ReactNode",signature:{arguments:[{type:{name:"IUseScheduleReturnValue"},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A render prop function which receives the schedule state",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseScheduleReturnValue) => React.ReactNode",signature:{arguments:[{type:{name:"IUseScheduleReturnValue"},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A children render prop function which receives the schedule state",type:{name:"func"}}}};var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js");__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{delayMS,delayComplete,elapsed,loop,duration=1250}=_ref;return react.createElement("div",null,react.createElement("label",null,react.createElement("span",null,"Schedule ",delayMS/1e3,"s delay followed by ",duration/1e3,"s"," ",loop?"looped":"elapsed"," progress"),react.createElement("progress",{className:"block w-full",value:delayComplete?elapsed:void 0})))},Container=_ref2=>{let{loop,...props}=_ref2;return react.createElement(ScheduleContainer,(0,esm_extends.A)({loop},props),(containerProps=>react.createElement(Component,(0,esm_extends.A)({},containerProps,{loop}))))},Hook=props=>{const hookProps=useSchedule(props);return react.createElement(Component,(0,esm_extends.A)({},hookProps,props))},ScheduleStory=_ref3=>{let{as,...props}=_ref3;return"container"===as?react.createElement(Container,props):react.createElement(Hook,props)};ScheduleStory.__docgenInfo={description:"",methods:[],displayName:"ScheduleStory"};const schedule_stories={title:"Packages/Schedule",component:ScheduleContainer},Schedule={render:args=>react.createElement(ScheduleStory,args),name:"Schedule",args:{as:"hook",delayMS:750,duration:1250,loop:!0},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}},__namedExportsOrder=["Schedule"];Schedule.parameters={...Schedule.parameters,docs:{...Schedule.parameters?.docs,source:{originalSource:"{\n  render: args => <ScheduleStory {...args} />,\n  name: 'Schedule',\n  args: {\n    as: 'hook',\n    delayMS: 750,\n    duration: 1250,\n    loop: true\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    }\n  }\n}",...Schedule.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-H7CJXHDS.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-XP5HYGXS.mjs"),__webpack_require__("@storybook/global")),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=(__webpack_require__("storybook/internal/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__.IX},"./node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);