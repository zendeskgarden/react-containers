"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[655],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/focusvisible/demo/focusvisible.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>focusvisible_stories,focusVisible:()=>focusVisible});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useFocusVisible=__webpack_require__("./packages/focusvisible/src/useFocusVisible.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FocusVisibleContainer=_ref=>{let{children,render=children,...options}=_ref;const scopeRef=(0,react.useRef)(null);return(0,useFocusVisible._)({scope:scopeRef,...options}),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render({ref:scopeRef})})};FocusVisibleContainer.defaultProps={className:"garden-focus-visible",dataAttribute:"data-garden-focus-visible"},FocusVisibleContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,relativeDocument:prop_types_default().object,className:prop_types_default().string,dataAttribute:prop_types_default().string};try{FocusVisibleContainer.displayName="FocusVisibleContainer",FocusVisibleContainer.__docgenInfo={description:"",displayName:"FocusVisibleContainer",props:{render:{defaultValue:null,description:"A render prop function which receives a `ref`",name:"render",required:!1,type:{name:"((options: { ref: RefObject<HTMLDivElement>; }) => ReactNode)"}},children:{defaultValue:null,description:"A children render prop function which receives a `ref`",name:"children",required:!1,type:{name:"(((options: { ref: RefObject<HTMLDivElement>; }) => ReactNode) & (boolean | ReactChild | ReactFragment | ReactPortal | null))"}},relativeDocument:{defaultValue:null,description:"A relative document",name:"relativeDocument",required:!1,type:{name:"any"}},className:{defaultValue:{value:"garden-focus-visible"},description:"A class name applied to the element with `:focus-visible` behavior",name:"className",required:!1,type:{name:"string"}},dataAttribute:{defaultValue:{value:"data-garden-focus-visible"},description:"A data attribute applied to the element with `:focus-visible` behavior",name:"dataAttribute",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/focusvisible/src/FocusVisibleContainer.tsx#FocusVisibleContainer"]={docgenInfo:FocusVisibleContainer.__docgenInfo,name:"FocusVisibleContainer",path:"packages/focusvisible/src/FocusVisibleContainer.tsx#FocusVisibleContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),index_esm=__webpack_require__("./node_modules/@zendeskgarden/react-theming/dist/index.esm.js");const GlobalStyle=(0,styled_components_browser_esm.vJ)([":focus{outline:none;}.garden-focus-visible,[data-garden-focus-visible='true']{box-shadow:0 0 0 2px ",";}blockquote p::before{content:'“';}blockquote p::after{content:'”';}"],index_esm.E6.green[400]),Component=(0,react.forwardRef)(((_,ref)=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(GlobalStyle,{}),(0,jsx_runtime.jsxs)("div",{ref,children:[(0,jsx_runtime.jsx)("a",{href:"#test",children:"Anchor"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("button",{className:"my-5 px-2 py-1",type:"button",children:"Button"}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)("span",{children:"Input"}),(0,jsx_runtime.jsx)("input",{className:"ml-1"})]}),(0,jsx_runtime.jsx)("div",{className:"my-5",tabIndex:0,children:'Custom [tabindex="0"]'}),(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)("span",{className:"align-top",children:"Textarea"}),(0,jsx_runtime.jsx)("textarea",{className:"ml-1"})]}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)("blockquote",{className:"my-5",contentEditable:!0,suppressContentEditableWarning:!0,children:(0,jsx_runtime.jsx)("p",{children:"Content editable block quote"})})]})]})));Component.displayName="Component";const Container=props=>(0,jsx_runtime.jsx)(FocusVisibleContainer,{...props,children:_ref=>{let{ref}=_ref;return(0,jsx_runtime.jsx)(Component,{ref})}});Container.displayName="Container";const Hook=_ref2=>{let{scope,...props}=_ref2;return(0,useFocusVisible._)({scope,...props}),(0,jsx_runtime.jsx)(Component,{ref:scope})};Hook.displayName="Hook";const FocusVisibleStory=_ref3=>{let{as,...props}=_ref3;const FocusVisible=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{}):(0,jsx_runtime.jsx)(Hook,{...props});return(0,jsx_runtime.jsx)(FocusVisible,{})};FocusVisibleStory.displayName="FocusVisibleStory";const README_namespaceObject="# @zendeskgarden/container-focusvisible [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-focusvisible\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-focusvisible\n\nThis package includes containers relating to [the `:focus-visible`\npolyfill](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) in\nthe [Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-focusvisible\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\n### useFocusVisible\n\n```jsx\nimport { useRef } from 'react';\nimport styled from 'styled-components';\nimport { useFocusVisible } from '@zendeskgarden/container-focusvisible';\n\nconst FocusVisibleButton = styled.button`\n  :focus {\n    outline: none;\n  }\n\n  /* Apply custom focus styling based on className */\n  &.garden-focus-visible {\n    outline: 2px dashed red;\n  }\n\n  /* Apply custom focus styling based on data attribute */\n  &[data-garden-focus-visible] {\n    outline: 2px dashed red;\n  }\n`;\n\nconst Example = () => {\n  const scope = useRef();\n  useFocusVisible({ scope });\n\n  return (\n    <div ref={scope}>\n      <FocusVisibleButton>\n        This element receives focus-visible className and data attribute\n      </FocusVisibleButton>\n    </div>\n  );\n};\n```\n\n### FocusVisibleContainer\n\n```jsx\nimport { FocusVisibleContainer } from '@zendeskgarden/container-focusvisible';\n\nconst Example = () => {\n  const scope = useRef();\n\n  return (\n    <FocusVisibleContainer scope={scope} className=\"custom-focus-visible-class\">\n      <div ref={scope}>\n        <button>Hello world</button>\n        <input placeholder=\"some elements always receive focus-visible\" />\n      </div>\n    </FocusVisibleContainer>\n  );\n};\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/FocusVisible",component:FocusVisibleContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"FocusVisible",args:{as:"hook"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},className:{control:!1},dataAttribute:{control:!1}},children:args=>{const scope=(0,react.useRef)();return(0,jsx_runtime.jsx)(FocusVisibleStory,{...args,scope})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const focusVisible=args=>{const scope=(0,react.useRef)();return(0,jsx_runtime.jsx)(FocusVisibleStory,{...args,scope})};focusVisible.storyName="FocusVisible",focusVisible.argTypes={as:{options:["container","hook"],control:"radio",table:{category:"Story"}},className:{control:!1},dataAttribute:{control:!1}},focusVisible.args={as:"hook"},focusVisible.parameters={storySource:{source:"args => {\n  const scope = useRef();\n  return <FocusVisibleStory {...args} scope={scope} />;\n}"}};const componentMeta={title:"Packages/FocusVisible",component:FocusVisibleContainer,tags:["stories-mdx"],includeStories:["focusVisible"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const focusvisible_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s}}]);