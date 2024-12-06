(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[6436,3774],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>useMDXComponents,x:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/breadcrumb/demo/breadcrumb.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-breadcrumb [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-breadcrumb\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-breadcrumb\n\nThis package includes containers relating to breadcrumbs in the [Garden Design\nSystem](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-breadcrumb\n```\n\n## Usage\n\nThis container implements the\n[breadcrumb](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb) design\npattern and can be used to build a breadcrumb component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### As a Render Prop Component\n\n```jsx\nimport { BreadcrumbContainer } from '@zendeskgarden/container-breadcrumb';\n\n<BreadcrumbContainer>\n  {(getContainerProps, getCurrentPageProps) => (\n    <div {...getContainerProps()}>\n      <a href=\"#\">Home</a>\n      <a {...getCurrentPageProps({ href: '#' })}>Items</a>\n    </div>\n  )}\n</BreadcrumbContainer>;\n```\n\n### As a hook\n\n```jsx\nimport { useBreadcrumb } from '@zendeskgarden/container-breadcrumb';\n\nconst Breadcrumb = () => {\n  const { getContainerProps, getCurrentPageProps } = useBreadcrumb();\n\n  return (\n    <div {...getContainerProps()}>\n      <a href=\"#\">Home</a>\n      <a {...getCurrentPageProps({ href: '#' })}>Items</a>\n    </div>\n  );\n};\n```\n\n## Info\n\nSee [react-breadcrumbs][breadcrumbs link] component.\n\n[breadcrumbs link]: https://github.com/zendeskgarden/react-components/tree/main/packages/breadcrumbs\n";var breadcrumb_stories=__webpack_require__("./packages/breadcrumb/demo/breadcrumb.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",...(0,lib.R)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.W8,{of:breadcrumb_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.H2,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Hl,{children:(0,jsx_runtime.jsx)(dist.gG,{of:breadcrumb_stories.Breadcrumb})}),"\n",(0,jsx_runtime.jsx)(dist.oz,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.R)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/blocks/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/blocks/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/breadcrumb/demo/breadcrumb.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Breadcrumb:()=>Breadcrumb,__namedExportsOrder:()=>__namedExportsOrder,default:()=>breadcrumb_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);const BreadcrumbContainer=_ref=>{let{children,render=children}=_ref;return react.createElement(react.Fragment,null,render({getContainerProps:_ref=>{let{role="navigation",...other}=_ref;return{role:null===role?void 0:role,"data-garden-container-id":"containers.breadcrumb","data-garden-container-version":"storybook",...other}},getCurrentPageProps:props=>({"aria-current":"page",...props})}))};BreadcrumbContainer.propTypes={render:prop_types_default().func,children:prop_types_default().func},BreadcrumbContainer.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbContainer",props:{render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  getContainerProps: IUseBreadcrumbReturnValue['getContainerProps'];\n  getCurrentPageProps: IUseBreadcrumbReturnValue['getCurrentPageProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  getContainerProps: IUseBreadcrumbReturnValue['getContainerProps'];\n  getCurrentPageProps: IUseBreadcrumbReturnValue['getCurrentPageProps'];\n}",signature:{properties:[{key:"getContainerProps",value:{name:"IUseBreadcrumbReturnValue['getContainerProps']",raw:"IUseBreadcrumbReturnValue['getContainerProps']",required:!0}},{key:"getCurrentPageProps",value:{name:"IUseBreadcrumbReturnValue['getCurrentPageProps']",raw:"IUseBreadcrumbReturnValue['getCurrentPageProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides breadcrumb render prop functions\n\n@param {function} [options.getContainerProps] Container props getter\n@param {function} [options.getCurrentPageProps] Current page props getter",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseBreadcrumbReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseBreadcrumbReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js");__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{children,getContainerProps,getCurrentPageProps,role,...props}=_ref;return react.createElement("div",(0,esm_extends.A)({role},getContainerProps(props)),react.createElement("a",{href:"#foo"},"Home"),react.createElement("span",{"aria-hidden":"true",className:"mx-2"},">"),react.createElement("a",getCurrentPageProps({href:"#"}),"Items"))},Container=_ref2=>{let{"aria-label":ariaLabel,...props}=_ref2;return react.createElement(BreadcrumbContainer,null,(containerProps=>react.createElement(Component,(0,esm_extends.A)({},containerProps,props,{"aria-label":ariaLabel}))))},Hook=_ref3=>{let{"aria-label":ariaLabel,...props}=_ref3;const hookProps={getContainerProps:_ref=>{let{role="navigation",...other}=_ref;return{role:null===role?void 0:role,"data-garden-container-id":"containers.breadcrumb","data-garden-container-version":"storybook",...other}},getCurrentPageProps:props=>({"aria-current":"page",...props})};return react.createElement(Component,(0,esm_extends.A)({},hookProps,props,{"aria-label":ariaLabel}))},BreadcrumbStory=_ref4=>{let{as,"aria-label":ariaLabel,...props}=_ref4;return"container"===as?react.createElement(Container,(0,esm_extends.A)({"aria-label":ariaLabel},props)):react.createElement(Hook,(0,esm_extends.A)({"aria-label":ariaLabel},props))};BreadcrumbStory.__docgenInfo={description:"",methods:[],displayName:"BreadcrumbStory"};const breadcrumb_stories={title:"Packages/Breadcrumb",component:BreadcrumbContainer},Breadcrumb={render:args=>react.createElement(BreadcrumbStory,args),name:"Breadcrumb",args:{as:"hook","aria-label":"Breadcrumbs"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},"aria-label":{control:"text"}}},__namedExportsOrder=["Breadcrumb"];Breadcrumb.parameters={...Breadcrumb.parameters,docs:{...Breadcrumb.parameters?.docs,source:{originalSource:"{\n  render: args => <BreadcrumbStory {...args} />,\n  name: 'Breadcrumb',\n  args: {\n    as: 'hook',\n    'aria-label': 'Breadcrumbs'\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    },\n    'aria-label': {\n      control: 'text'\n    }\n  }\n}",...Breadcrumb.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-H7CJXHDS.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-XP5HYGXS.mjs"),__webpack_require__("@storybook/global")),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=(__webpack_require__("storybook/internal/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__.IX},"./node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);