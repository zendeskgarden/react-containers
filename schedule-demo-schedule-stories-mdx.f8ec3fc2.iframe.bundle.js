"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[269],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-PCJTTTQV.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/schedule/demo/schedule.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>schedule_stories,schedule:()=>schedule});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);const useSchedule=function(_temp){let{duration=1250,delayMS=750,loop=!0}=void 0===_temp?{}:_temp;const[elapsed,setElapsed]=(0,react.useState)(0),[delayComplete,setDelayComplete]=(0,react.useState)(!1);return(0,react.useLayoutEffect)((()=>{let raf,start,loopTimeout,destroyed=!1;const tick=()=>{destroyed||(raf=requestAnimationFrame(performAnimationFrame))},performAnimationFrame=()=>{setElapsed(Date.now()-start),tick()},onStart=()=>{destroyed||(loopTimeout=setTimeout((()=>{cancelAnimationFrame(raf),setElapsed(Date.now()-start),loop&&onStart()}),duration),start=Date.now(),setDelayComplete(!0),tick())},renderingDelayTimeout=setTimeout(onStart,delayMS);return()=>{destroyed=!0,clearTimeout(renderingDelayTimeout),clearTimeout(loopTimeout),cancelAnimationFrame(raf)}}),[duration,delayMS,loop]),{elapsed:Math.min(1,elapsed/duration),delayMS,delayComplete}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleContainer=_ref=>{let{children,render=children,...props}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render(useSchedule(props))})};ScheduleContainer.defaultProps={duration:1250,delayMS:750,loop:!0},ScheduleContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,duration:prop_types_default().number,loop:prop_types_default().bool,delayMS:prop_types_default().number};try{ScheduleContainer.displayName="ScheduleContainer",ScheduleContainer.__docgenInfo={description:"",displayName:"ScheduleContainer",props:{render:{defaultValue:null,description:"A render prop function which receives the schedule state",name:"render",required:!1,type:{name:"((options: IUseScheduleReturnValue) => ReactNode)"}},children:{defaultValue:null,description:"A children render prop function which receives the schedule state",name:"children",required:!1,type:{name:"(((options: IUseScheduleReturnValue) => ReactNode) & (boolean | ReactChild | ReactFragment | ReactPortal | null))"}},duration:{defaultValue:null,description:"The duration of a schedule in miliseconds",name:"duration",required:!1,type:{name:"number"}},delayMS:{defaultValue:null,description:"The delay in miliseconds prior to the beginning of the schedule",name:"delayMS",required:!1,type:{name:"number"}},loop:{defaultValue:null,description:"Determines whether a schedule should loop",name:"loop",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/schedule/src/ScheduleContainer.tsx#ScheduleContainer"]={docgenInfo:ScheduleContainer.__docgenInfo,name:"ScheduleContainer",path:"packages/schedule/src/ScheduleContainer.tsx#ScheduleContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{delayMS,delayComplete,elapsed,loop,duration=1250}=_ref;return(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsxs)("span",{children:["Schedule ",delayMS/1e3,"s delay followed by ",duration/1e3,"s"," ",loop?"looped":"elapsed"," progress"]}),(0,jsx_runtime.jsx)("progress",{className:"block w-full",value:delayComplete?elapsed:void 0})]})})};Component.displayName="Component";const Container=_ref2=>{let{loop,...props}=_ref2;return(0,jsx_runtime.jsx)(ScheduleContainer,{loop,...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{...containerProps,loop})})};Container.displayName="Container";const Hook=props=>{const hookProps=useSchedule(props);return(0,jsx_runtime.jsx)(Component,{...hookProps,...props})};Hook.displayName="Hook";const ScheduleStory=_ref3=>{let{as,...props}=_ref3;const Schedule=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props});return(0,jsx_runtime.jsx)(Schedule,{})};ScheduleStory.displayName="ScheduleStory";const README_namespaceObject="# @zendeskgarden/container-schedule [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-schedule\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-schedule\n\nThis package includes containers relating to schedule in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-schedule\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\n### As a hook\n\nThe `useSchedule` hook implements a schedule (timer) and communicates when it has elapsed.\n\n```jsx\nimport { useSchedule } from '@zendeskgarden/container-schedule';\n\nconst Animation = () => {\n  const elapsed = useSchedule({ duration: 1000, delayMS: 0 });\n\n  return <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>;\n};\n```\n\n### As a Render Prop Component\n\n```jsx\nimport { ScheduleContainer } from '@zendeskgarden/container-schedule';\n\n<ScheduleContainer duration={1000} delayMS={0}>\n  {elapsed => <p>Percentage: {(elapsed * 100).toFixed(0)}%</p>}\n</ScheduleContainer>;\n```\n\n## Info\n\nSee [react-loaders][loaders link] component as a non-trivial use of this.\n\n[loaders link]: https://github.com/zendeskgarden/react-components/tree/main/packages/loaders\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Schedule",component:ScheduleContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Schedule",args:{as:"hook",delayMS:750,duration:1250,loop:!0},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},children:args=>(0,jsx_runtime.jsx)(ScheduleStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const schedule=args=>(0,jsx_runtime.jsx)(ScheduleStory,{...args});schedule.storyName="Schedule",schedule.argTypes={as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},schedule.args={as:"hook",delayMS:750,duration:1250,loop:!0},schedule.parameters={storySource:{source:"args => <ScheduleStory {...args} />"}};const componentMeta={title:"Packages/Schedule",component:ScheduleContainer,tags:["stories-mdx"],includeStories:["schedule"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const schedule_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s}}]);