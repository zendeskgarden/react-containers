"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[858],{"./packages/focusjail/src/useFocusJail.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>useFocusJail});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),tabbable__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/focusjail/node_modules/tabbable/dist/index.esm.js"),dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/focusjail/node_modules/dom-helpers/esm/activeElement.js");const useFocusJail=function(_temp){let{focusOnMount=!0,restoreFocus=!0,environment,focusElem,containerRef}=void 0===_temp?{containerRef:(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)()}:_temp;const restoreFocusElement=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[currentRef,setCurrentRef]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(containerRef.current);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{containerRef.current!==currentRef&&setCurrentRef(containerRef.current)}));const focusElement=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((element=>{focusElem?focusElem(element):element&&element.focus()}),[focusElem]),getInitialFocusNode=()=>{const doc=environment||document,activeElem=(0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_1__.Z)(doc),containerElem=currentRef;return containerElem.contains(activeElem)?activeElem:containerElem};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const doc=environment||document;return restoreFocusElement.current=(0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_1__.Z)(doc),focusOnMount&&focusElement(currentRef),()=>{const isBodyInactive=restoreFocusElement.current!==doc.body,hasActiveElement=null!==restoreFocusElement.current;isBodyInactive&&hasActiveElement&&restoreFocus&&focusElement(restoreFocusElement.current)}}),[focusOnMount,restoreFocus,environment,focusElement,currentRef]),{getContainerProps:function(_temp2){let{onKeyDown,...other}=void 0===_temp2?{}:_temp2;return{onKeyDown:(0,_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_3__.M)(onKeyDown,(event=>{if(event.key!==_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_4__.t.TAB)return;(()=>{if(!currentRef)throw new Error("Accessibility Error: You must apply the ref prop to your containing element.")})();const tabbableNodes=(()=>{const elements=(0,tabbable__WEBPACK_IMPORTED_MODULE_2__.ht)(currentRef);return{firstItem:elements[0]||getInitialFocusNode(),lastItem:elements[elements.length-1]||getInitialFocusNode()}})();!event.shiftKey||event.target!==tabbableNodes.firstItem&&event.target!==currentRef||(focusElement(tabbableNodes.lastItem),event.preventDefault()),event.shiftKey||event.target!==tabbableNodes.lastItem||(focusElement(tabbableNodes.firstItem),event.preventDefault())})),"data-garden-container-id":"containers.focusjail","data-garden-container-version":"storybook",...other}},focusElement}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/focusjail/demo/focusjail.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>focusjail_stories,focusJail:()=>focusJail});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useFocusJail=__webpack_require__("./packages/focusjail/src/useFocusJail.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FocusJailContainer=_ref=>{let{children,render=children,...options}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render((0,useFocusJail.P)(options))})};FocusJailContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,focusOnMount:prop_types_default().bool,restoreFocus:prop_types_default().bool,environment:prop_types_default().any,containerRef:prop_types_default().any.isRequired,focusElem:prop_types_default().func},FocusJailContainer.defaultProps={focusOnMount:!0,restoreFocus:!0};try{FocusJailContainer.displayName="FocusJailContainer",FocusJailContainer.__docgenInfo={description:"",displayName:"FocusJailContainer",props:{render:{defaultValue:null,description:"Provides focus loop render prop functions\n@param options.getContainerProps Container props getter",name:"render",required:!1,type:{name:"((options: { getContainerProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>; }) => ReactNode)"}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"(((options: IUseFocusJailReturnValue) => ReactNode) & (boolean | ReactChild | ReactFragment | ReactPortal | null))"}},focusOnMount:{defaultValue:{value:"true"},description:"Directs keyboard focus to the container on mount",name:"focusOnMount",required:!1,type:{name:"boolean"}},restoreFocus:{defaultValue:{value:"true"},description:"Returns keyboard focus to the last active element on unmount",name:"restoreFocus",required:!1,type:{name:"boolean"}},environment:{defaultValue:null,description:"Sets the environment where the focus loop is rendered",name:"environment",required:!1,type:{name:"Document"}},containerRef:{defaultValue:null,description:"Provides ref access to the underlying focus loop container element",name:"containerRef",required:!0,type:{name:"RefObject<Element>"}},focusElem:{defaultValue:null,description:"@ignore testing-only",name:"focusElem",required:!1,type:{name:"((element: HTMLElement) => any)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/focusjail/src/FocusJailContainer.tsx#FocusJailContainer"]={docgenInfo:FocusJailContainer.__docgenInfo,name:"FocusJailContainer",path:"packages/focusjail/src/FocusJailContainer.tsx#FocusJailContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=(0,react.forwardRef)(((_ref,ref)=>{let{getContainerProps}=_ref;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("button",{className:"m-1 px-2 py-1",type:"button",children:"Tabbable"}),(0,jsx_runtime.jsxs)("label",{className:"m-1",children:[(0,jsx_runtime.jsx)("span",{children:"Tabbable"}),(0,jsx_runtime.jsx)("input",{className:"ml-1"})]}),(0,jsx_runtime.jsx)("button",{className:"m-1 px-2 py-1",type:"button",children:"Tabbable"}),(0,jsx_runtime.jsx)("h1",{className:"m-1 mt-4 text-lg",children:"Focus loop container"}),(0,jsx_runtime.jsxs)("div",{className:"border-2 border-dashed border-grey-400 m-1 p-2",...getContainerProps({ref,tabIndex:-1}),children:[(0,jsx_runtime.jsxs)("label",{className:"m-1 mt-2",children:[(0,jsx_runtime.jsx)("span",{children:"Tabbable"}),(0,jsx_runtime.jsx)("input",{className:"block ml-1"})]}),(0,jsx_runtime.jsxs)("label",{className:"m-1 mt-2",children:[(0,jsx_runtime.jsx)("span",{children:"Tabbable"}),(0,jsx_runtime.jsx)("input",{className:"block ml-1"})]}),(0,jsx_runtime.jsx)("button",{className:"m-1 mt-2 px-2 py-1",type:"button",children:"Tabbable"})]})]})}));Component.displayName="Component";const Container=_ref2=>{let{containerRef,...props}=_ref2;return(0,jsx_runtime.jsx)(FocusJailContainer,{containerRef,...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{...containerProps,ref:containerRef})})};Container.displayName="Container";const Hook=_ref3=>{let{containerRef,...props}=_ref3;const hookProps=(0,useFocusJail.P)({containerRef,...props});return(0,jsx_runtime.jsx)(Component,{...hookProps,ref:containerRef})};Hook.displayName="Hook";const FocusJailStory=_ref4=>{let{as,...props}=_ref4;return"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props})},README_namespaceObject="# @zendeskgarden/container-focusjail [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-focusjail\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-focusjail\n\nThis package includes containers relating to focus looping in the [Garden Design\nSystem](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-focusjail\n```\n\n## Usage\n\nThis container implements the [dialog focus\nloop](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) design pattern\nand can be used to build a modal component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useFocusJail\n\nThe `useFocusJail` hook allows you to trap focus to a container element. Useful\nfor modals and widgets. Garden uses this in react-components for the modals package.\n\n```jsx\nimport { useRef } from 'react';\nimport { useFocusJail } from '@zendeskgarden/container-focusjail';\n\nconst FocusJail = () => {\n  const containerRef = useRef(null);\n  const { getContainerProps } = useFocusJail({\n    focusOnMount: false,\n    environment: window.parent.document,\n    containerRef\n  });\n\n  return (\n    <>\n      <input />\n      <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>\n        <p>Focus is locked within the parent element</p>\n        <input />\n        <button>Focusable Items</button>\n      </div>\n    </>\n  );\n};\n```\n\n### FocusJailContainer\n\n`FocusJailContainer` is a render-prop wrapper for the `useFocusJail` hook.\n\n```jsx\nimport { createRef } from 'react';\nimport { FocusJailContainer } from '@zendeskgarden/container-focusjail';\n\nconst containerRef = createRef(null);\n\n<FocusJailContainer\n  containerRef={containerRef}\n  focusOnMount={false}\n  environment={window.parent.document}\n>\n  {({ getContainerProps }) => (\n    <>\n      <input />\n      <div {...getContainerProps({ ref: containerRef, tabIndex: -1 })}>\n        <p>Focus is locked within the parent element</p>\n        <input />\n        <button>Focusable Items</button>\n      </div>\n    </>\n  )}\n</FocusJailContainer>;\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/FocusJail",component:FocusJailContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"FocusJail",args:{as:"hook",focusOnMount:!0,restoreFocus:!0},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},containerRef:{control:!1}},children:args=>{const containerRef=(0,react.useRef)();return(0,jsx_runtime.jsx)(FocusJailStory,{...args,containerRef})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const focusJail=args=>{const containerRef=(0,react.useRef)();return(0,jsx_runtime.jsx)(FocusJailStory,{...args,containerRef})};focusJail.storyName="FocusJail",focusJail.argTypes={as:{options:["container","hook"],control:"radio",table:{category:"Story"}},containerRef:{control:!1}},focusJail.args={as:"hook",focusOnMount:!0,restoreFocus:!0},focusJail.parameters={storySource:{source:"args => {\n  const containerRef = useRef();\n  return <FocusJailStory {...args} containerRef={containerRef} />;\n}"}};const componentMeta={title:"Packages/FocusJail",component:FocusJailContainer,tags:["stories-mdx"],includeStories:["focusJail"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const focusjail_stories=componentMeta}}]);