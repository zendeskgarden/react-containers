"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[334],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/breadcrumb/demo/breadcrumb.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{breadcrumb:()=>breadcrumb,default:()=>breadcrumb_stories});__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const BreadcrumbContainer=_ref=>{let{children,render=children}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render({getContainerProps:_ref=>{let{role="navigation",...other}=_ref;return{role:null===role?void 0:role,"data-garden-container-id":"containers.breadcrumb","data-garden-container-version":"storybook",...other}},getCurrentPageProps:props=>({"aria-current":"page",...props})})})};BreadcrumbContainer.propTypes={render:prop_types_default().func,children:prop_types_default().func};try{BreadcrumbContainer.displayName="BreadcrumbContainer",BreadcrumbContainer.__docgenInfo={description:"",displayName:"BreadcrumbContainer",props:{render:{defaultValue:null,description:"Provides breadcrumb render prop functions\n@param options.getContainerProps Container props getter\n@param options.getCurrentPageProps Current page props getter",name:"render",required:!1,type:{name:'((options: { getContainerProps: <T extends Element>(props: Omit<HTMLProps<T>, "aria-label" | "role"> & { \'aria-label\': string; role?: "navigation" | null; }) => HTMLProps<...>; getCurrentPageProps: <T extends Element>(props?: HTMLProps<...>) => HTMLProps<...>; }) => ReactNode) | undefined'}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"((options: IUseBreadcrumbReturnValue) => ReactNode)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/breadcrumb/src/BreadcrumbContainer.tsx#BreadcrumbContainer"]={docgenInfo:BreadcrumbContainer.__docgenInfo,name:"BreadcrumbContainer",path:"packages/breadcrumb/src/BreadcrumbContainer.tsx#BreadcrumbContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{children,getContainerProps,getCurrentPageProps,role,...props}=_ref;return(0,jsx_runtime.jsxs)("div",{role,...getContainerProps(props),children:[(0,jsx_runtime.jsx)("a",{href:"#foo",children:"Home"}),(0,jsx_runtime.jsx)("span",{"aria-hidden":"true",className:"mx-2",children:">"}),(0,jsx_runtime.jsx)("a",{...getCurrentPageProps({href:"#"}),children:"Items"})]})};Component.displayName="Component";const Container=_ref2=>{let{"aria-label":ariaLabel,...props}=_ref2;return(0,jsx_runtime.jsx)(BreadcrumbContainer,{children:containerProps=>(0,jsx_runtime.jsx)(Component,{...containerProps,...props,"aria-label":ariaLabel})})};Container.displayName="Container";const Hook=_ref3=>{let{"aria-label":ariaLabel,...props}=_ref3;const hookProps={getContainerProps:_ref=>{let{role="navigation",...other}=_ref;return{role:null===role?void 0:role,"data-garden-container-id":"containers.breadcrumb","data-garden-container-version":"storybook",...other}},getCurrentPageProps:props=>({"aria-current":"page",...props})};return(0,jsx_runtime.jsx)(Component,{...hookProps,...props,"aria-label":ariaLabel})};Hook.displayName="Hook";const BreadcrumbStory=_ref4=>{let{as,"aria-label":ariaLabel,...props}=_ref4;return"container"===as?(0,jsx_runtime.jsx)(Container,{"aria-label":ariaLabel,...props}):(0,jsx_runtime.jsx)(Hook,{"aria-label":ariaLabel,...props})},README_namespaceObject="# @zendeskgarden/container-breadcrumb [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-breadcrumb\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-breadcrumb\n\nThis package includes containers relating to breadcrumbs in the [Garden Design\nSystem](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-breadcrumb\n```\n\n## Usage\n\nThis container implements the\n[breadcrumb](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb) design\npattern and can be used to build a breadcrumb component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### As a Render Prop Component\n\n```jsx\nimport { BreadcrumbContainer } from '@zendeskgarden/container-breadcrumb';\n\n<BreadcrumbContainer>\n  {(getContainerProps, getCurrentPageProps) => (\n    <div {...getContainerProps()}>\n      <a href=\"#\">Home</a>\n      <a {...getCurrentPageProps({ href: '#' })}>Items</a>\n    </div>\n  )}\n</BreadcrumbContainer>;\n```\n\n### As a hook\n\n```jsx\nimport { useBreadcrumb } from '@zendeskgarden/container-breadcrumb';\n\nconst Breadcrumb = () => {\n  const { getContainerProps, getCurrentPageProps } = useBreadcrumb();\n\n  return (\n    <div {...getContainerProps()}>\n      <a href=\"#\">Home</a>\n      <a {...getCurrentPageProps({ href: '#' })}>Items</a>\n    </div>\n  );\n};\n```\n\n## Info\n\nSee [react-breadcrumbs][breadcrumbs link] component.\n\n[breadcrumbs link]: https://github.com/zendeskgarden/react-components/tree/main/packages/breadcrumbs\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Breadcrumb",component:BreadcrumbContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Breadcrumb",args:{as:"hook","aria-label":"Breadcrumbs"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},"aria-label":{control:"text"}},children:args=>(0,jsx_runtime.jsx)(BreadcrumbStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const breadcrumb=args=>(0,jsx_runtime.jsx)(BreadcrumbStory,{...args});breadcrumb.storyName="Breadcrumb",breadcrumb.argTypes={as:{options:["container","hook"],control:"radio",table:{category:"Story"}},"aria-label":{control:"text"}},breadcrumb.args={as:"hook","aria-label":"Breadcrumbs"},breadcrumb.parameters={storySource:{source:"args => <BreadcrumbStory {...args} />"}};const componentMeta={title:"Packages/Breadcrumb",component:BreadcrumbContainer,tags:["stories-mdx"],includeStories:["breadcrumb"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const breadcrumb_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/global"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s}}]);