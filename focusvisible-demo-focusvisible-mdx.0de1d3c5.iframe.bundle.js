/*! For license information please see focusvisible-demo-focusvisible-mdx.0de1d3c5.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[3051,2161],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/focusvisible/demo/focusvisible.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-focusvisible [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-focusvisible\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-focusvisible\n\nThis package includes containers relating to [the `:focus-visible`\npolyfill](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) in\nthe [Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-focusvisible\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\n### useFocusVisible\n\n```jsx\nimport { useRef } from 'react';\nimport styled from 'styled-components';\nimport { useFocusVisible } from '@zendeskgarden/container-focusvisible';\n\nconst FocusVisibleButton = styled.button`\n  :focus {\n    outline: none;\n  }\n\n  /* Apply custom focus styling based on className */\n  &.garden-focus-visible {\n    outline: 2px dashed red;\n  }\n\n  /* Apply custom focus styling based on data attribute */\n  &[data-garden-focus-visible] {\n    outline: 2px dashed red;\n  }\n`;\n\nconst Example = () => {\n  const scope = useRef();\n  useFocusVisible({ scope });\n\n  return (\n    <div ref={scope}>\n      <FocusVisibleButton>\n        This element receives focus-visible className and data attribute\n      </FocusVisibleButton>\n    </div>\n  );\n};\n```\n\n### FocusVisibleContainer\n\n```jsx\nimport { FocusVisibleContainer } from '@zendeskgarden/container-focusvisible';\n\nconst Example = () => {\n  const scope = useRef();\n\n  return (\n    <FocusVisibleContainer scope={scope} className=\"custom-focus-visible-class\">\n      <div ref={scope}>\n        <button>Hello world</button>\n        <input placeholder=\"some elements always receive focus-visible\" />\n      </div>\n    </FocusVisibleContainer>\n  );\n};\n```\n";var focusvisible_stories=__webpack_require__("./packages/focusvisible/demo/focusvisible.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",...(0,lib.a)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:focusvisible_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.ZX,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:focusvisible_stories.FocusVisible})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.a)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/focusvisible/demo/focusvisible.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FocusVisible:()=>FocusVisible,__namedExportsOrder:()=>__namedExportsOrder,default:()=>focusvisible_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useFocusVisible=__webpack_require__("./packages/focusvisible/src/useFocusVisible.ts");const FocusVisibleContainer=_ref=>{let{children,render=children,...options}=_ref;const scopeRef=(0,react.useRef)(null);return(0,useFocusVisible._)({scope:scopeRef,...options}),react.createElement(react.Fragment,null,render({ref:scopeRef}))};FocusVisibleContainer.defaultProps={className:"garden-focus-visible",dataAttribute:"data-garden-focus-visible"},FocusVisibleContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,relativeDocument:prop_types_default().object,className:prop_types_default().string,dataAttribute:prop_types_default().string},FocusVisibleContainer.__docgenInfo={description:"",methods:[],displayName:"FocusVisibleContainer",props:{render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: { ref: React.RefObject<HTMLDivElement> }) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ ref: React.RefObject<HTMLDivElement> }",signature:{properties:[{key:"ref",value:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}],required:!0}}]}},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A render prop function which receives a `ref`",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: { ref: React.RefObject<HTMLDivElement> }) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ ref: React.RefObject<HTMLDivElement> }",signature:{properties:[{key:"ref",value:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}],required:!0}}]}},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A children render prop function which receives a `ref`",type:{name:"func"}},className:{defaultValue:{value:"'garden-focus-visible'",computed:!1},description:"",type:{name:"string"},required:!1},dataAttribute:{defaultValue:{value:"'data-garden-focus-visible'",computed:!1},description:"",type:{name:"string"},required:!1},relativeDocument:{description:"",type:{name:"object"},required:!1}},composes:["Omit"]};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),palette=__webpack_require__("./node_modules/@zendeskgarden/react-theming/dist/esm/elements/palette/index.js");const GlobalStyle=(0,styled_components_browser_esm.vJ)([":focus{outline:none;}.garden-focus-visible,[data-garden-focus-visible='true']{box-shadow:0 0 0 2px ",";}blockquote p::before{content:'“';}blockquote p::after{content:'”';}"],palette.Z.green[400]),Component=(0,react.forwardRef)(((_,ref)=>react.createElement(react.Fragment,null,react.createElement(GlobalStyle,null),react.createElement("div",{ref},react.createElement("a",{href:"#test"},"Anchor"),react.createElement("br",null),react.createElement("button",{className:"my-5 px-2 py-1",type:"button"},"Button"),react.createElement("br",null),react.createElement("label",null,react.createElement("span",null,"Input"),react.createElement("input",{className:"ml-1"})),react.createElement("div",{className:"my-5",tabIndex:0},'Custom [tabindex="0"]'),react.createElement("label",null,react.createElement("span",{className:"align-top"},"Textarea"),react.createElement("textarea",{className:"ml-1"})),react.createElement("br",null),react.createElement("blockquote",{className:"my-5",contentEditable:!0,suppressContentEditableWarning:!0},react.createElement("p",null,"Content editable block quote"))))));Component.displayName="Component";const Container=props=>react.createElement(FocusVisibleContainer,props,(_ref=>{let{ref}=_ref;return react.createElement(Component,{ref})})),Hook=_ref2=>{let{scope,...props}=_ref2;return(0,useFocusVisible._)({scope,...props}),react.createElement(Component,{ref:scope})},FocusVisibleStory=_ref3=>{let{as,...props}=_ref3;return"container"===as?react.createElement(Container,null):react.createElement(Hook,props)};FocusVisibleStory.__docgenInfo={description:"",methods:[],displayName:"FocusVisibleStory"};const focusvisible_stories={title:"Packages/FocusVisible",component:FocusVisibleContainer},FocusVisible={render:function Render(args){const scope=(0,react.useRef)(null);return react.createElement(FocusVisibleStory,(0,esm_extends.Z)({},args,{scope}))},name:"FocusVisible",args:{as:"hook"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},className:{control:!1},dataAttribute:{control:!1}}},__namedExportsOrder=["FocusVisible"];FocusVisible.parameters={...FocusVisible.parameters,docs:{...FocusVisible.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const scope = useRef<HTMLDivElement>(null);\n    return <FocusVisibleStory {...args} scope={scope} />;\n  },\n  name: 'FocusVisible',\n  args: {\n    as: 'hook'\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    },\n    className: {\n      control: false\n    },\n    dataAttribute: {\n      control: false\n    }\n  }\n}",...FocusVisible.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_SXKPGB5T_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-SXKPGB5T.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-CEH6MNVV.mjs"),__webpack_require__("@storybook/global")),storybook_internal_preview_errors__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("storybook/internal/preview-api"),__webpack_require__("storybook/internal/preview-errors")),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global;globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_SXKPGB5T_mjs__WEBPACK_IMPORTED_MODULE_0__.R6},"./packages/focusvisible/src/useFocusVisible.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{_:()=>useFocusVisible});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const INPUT_TYPES_WHITE_LIST={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function useFocusVisible(_temp){let{scope,relativeDocument,className="garden-focus-visible",dataAttribute="data-garden-focus-visible"}=void 0===_temp?{}:_temp;if(!scope)throw new Error('Error: the useFocusVisible() hook requires a "scope" property');const hadKeyboardEvent=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),hadFocusVisibleRecently=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),hadFocusVisibleRecentlyTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let environment=relativeDocument;environment||(environment=document);const isValidFocusTarget=el=>!!(el&&el!==scope.current&&"HTML"!==el.nodeName&&"BODY"!==el.nodeName&&"classList"in el&&"contains"in el.classList),isFocused=el=>!(!el||!el.classList.contains(className)&&!el.hasAttribute(dataAttribute)),addFocusVisibleClass=el=>{isFocused(el)||(el&&el.classList.add(className),el&&el.setAttribute(dataAttribute,"true"))},onKeyDown=e=>{e.metaKey||e.altKey||e.ctrlKey||(isValidFocusTarget(environment.activeElement)&&addFocusVisibleClass(environment.activeElement),hadKeyboardEvent.current=!0)},onPointerDown=()=>{hadKeyboardEvent.current=!1},onFocus=e=>{isValidFocusTarget(e.target)&&(hadKeyboardEvent.current||(el=>{const type=el.type,tagName=el.tagName;return!("INPUT"!==tagName||!INPUT_TYPES_WHITE_LIST[type]||el.readOnly)||"TEXTAREA"===tagName&&!el.readOnly||!!el.isContentEditable})(e.target))&&addFocusVisibleClass(e.target)},onBlur=e=>{var el;if(isValidFocusTarget(e.target)&&isFocused(e.target)){hadFocusVisibleRecently.current=!0,clearTimeout(hadFocusVisibleRecentlyTimeout.current);const timeoutId=setTimeout((()=>{hadFocusVisibleRecently.current=!1,clearTimeout(hadFocusVisibleRecentlyTimeout.current)}),100);hadFocusVisibleRecentlyTimeout.current=Number(timeoutId),(el=e.target).classList.remove(className),el.removeAttribute(dataAttribute)}},onInitialPointerMove=e=>{const nodeName=e.target.nodeName;nodeName&&"html"===nodeName.toLowerCase()||(hadKeyboardEvent.current=!1,removeInitialPointerMoveListeners())},removeInitialPointerMoveListeners=()=>{environment.removeEventListener("mousemove",onInitialPointerMove),environment.removeEventListener("mousedown",onInitialPointerMove),environment.removeEventListener("mouseup",onInitialPointerMove),environment.removeEventListener("pointermove",onInitialPointerMove),environment.removeEventListener("pointerdown",onInitialPointerMove),environment.removeEventListener("pointerup",onInitialPointerMove),environment.removeEventListener("touchmove",onInitialPointerMove),environment.removeEventListener("touchstart",onInitialPointerMove),environment.removeEventListener("touchend",onInitialPointerMove)},onVisibilityChange=()=>{"hidden"===environment.visibilityState&&hadFocusVisibleRecently.current&&(hadKeyboardEvent.current=!0)},currentScope=scope.current;if(environment&&currentScope)return environment.addEventListener("keydown",onKeyDown,!0),environment.addEventListener("mousedown",onPointerDown,!0),environment.addEventListener("pointerdown",onPointerDown,!0),environment.addEventListener("touchstart",onPointerDown,!0),environment.addEventListener("visibilitychange",onVisibilityChange,!0),environment.addEventListener("mousemove",onInitialPointerMove),environment.addEventListener("mousedown",onInitialPointerMove),environment.addEventListener("mouseup",onInitialPointerMove),environment.addEventListener("pointermove",onInitialPointerMove),environment.addEventListener("pointerdown",onInitialPointerMove),environment.addEventListener("pointerup",onInitialPointerMove),environment.addEventListener("touchmove",onInitialPointerMove),environment.addEventListener("touchstart",onInitialPointerMove),environment.addEventListener("touchend",onInitialPointerMove),currentScope&&currentScope.addEventListener("focus",onFocus,!0),currentScope&&currentScope.addEventListener("blur",onBlur,!0),()=>{environment.removeEventListener("keydown",onKeyDown),environment.removeEventListener("mousedown",onPointerDown),environment.removeEventListener("pointerdown",onPointerDown),environment.removeEventListener("touchstart",onPointerDown),environment.removeEventListener("visibilityChange",onVisibilityChange),removeInitialPointerMoveListeners(),currentScope&&currentScope.removeEventListener("focus",onFocus),currentScope&&currentScope.removeEventListener("blur",onBlur),clearTimeout(hadFocusVisibleRecentlyTimeout.current)}}),[relativeDocument,scope,className,dataAttribute])}},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);