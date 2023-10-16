/*! For license information please see field-demo-field-stories-mdx.a7ddbe39.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[205],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/field/demo/field.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>field_stories,field:()=>field});__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useField=__webpack_require__("./packages/field/src/useField.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FieldContainer=_ref=>{let{children,render=children,...options}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render((0,useField.U)(options))})};FieldContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,idPrefix:prop_types_default().string,hasHint:prop_types_default().bool,hasMessage:prop_types_default().bool};try{FieldContainer.displayName="FieldContainer",FieldContainer.__docgenInfo={description:"",displayName:"FieldContainer",props:{render:{defaultValue:null,description:"Provides field render prop functions\n@param options.getLabelProps Field label props getter\n@param options.getHintProps Field hint props getter\n@param options.getInputProps Field input props getter\n@param options.getMessageProps Field message getter",name:"render",required:!1,type:{name:"((options: { getLabelProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<T>; getHintProps: <T extends Element>(props?: HTMLProps<T>) => HTMLProps<...>; getInputProps: <T extends Element>(props?: HTMLProps<...> | undefined) => HTMLProps<...>; getMessageProps: <T extends Element>(prop..."}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"((options: IUseFieldReturnValue) => ReactNode)"}},idPrefix:{defaultValue:null,description:"Prefixes IDs for field elements",name:"idPrefix",required:!1,type:{name:"string"}},hasHint:{defaultValue:null,description:"Indicates the field has a hint",name:"hasHint",required:!1,type:{name:"boolean"}},hasMessage:{defaultValue:null,description:"Indicates the field has a message",name:"hasMessage",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/field/src/FieldContainer.tsx#FieldContainer"]={docgenInfo:FieldContainer.__docgenInfo,name:"FieldContainer",path:"packages/field/src/FieldContainer.tsx#FieldContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{getLabelProps,getHintProps,getInputProps,getMessageProps,hasHint,hasMessage}=_ref;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("label",{...getLabelProps(),children:"Label"}),hasHint&&(0,jsx_runtime.jsx)("div",{...getHintProps(),children:"Hint"}),(0,jsx_runtime.jsx)("input",{...getInputProps()}),hasMessage&&(0,jsx_runtime.jsx)("div",{...getMessageProps(),children:"Message"})]})},Container=_ref2=>{let{hasHint,hasMessage,...props}=_ref2;return(0,jsx_runtime.jsx)(FieldContainer,{hasHint,hasMessage,...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{...containerProps,hasHint,hasMessage})})};Container.displayName="Container";const Hook=_ref3=>{let{hasHint,hasMessage,...props}=_ref3;const hookProps=(0,useField.U)({hasHint,hasMessage,...props});return(0,jsx_runtime.jsx)(Component,{...hookProps,hasHint,hasMessage})};Hook.displayName="Hook";const FieldStory=_ref4=>{let{as,...props}=_ref4;const Field=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props});return(0,jsx_runtime.jsx)(Field,{})};FieldStory.displayName="FieldStory";const README_namespaceObject="# @zendeskgarden/container-field [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-field\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-field\n\nThis package includes containers relating to field in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-field\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\nThe `useField` hook will supply the prop getters to handle `aria-labelledby` along\nwith for/id mapping and `aria-describedby` mapping when a hint and/or status message\nis applied.\n\n### useField\n\n```jsx\nimport { useField } from '@zendeskgarden/container-field';\n\nconst Field = () => {\n  const { getLabelProps, getInputProps, getHintProps, getMessageProps } = useField();\n\n  return (\n    <>\n      <label {...getLabelProps()}>Accessible Native Input</label>\n      <p {...getHintProps()}>Optional Hint</p>\n      <input {...getInputProps()} />\n      <p {...getMessageProps()}>Optional Status Message</p>\n    </>\n  );\n};\n```\n\n### FieldContainer\n\nFieldContainer is a render-prop wrapper for the `useField` hook.\n\n```jsx\nimport { FieldContainer } from '@zendeskgarden/container-field';\n\n<FieldContainer>\n  {({ getLabelProps, getInputProps, getHintProps, getMessageProps }) => (\n    <>\n      <label {...getLabelProps()}>Accessible Native Input</label>\n      <p {...getHintProps()}>Optional Hint</p>\n      <input {...getInputProps()} />\n      <p {...getMessageProps()}>Optional Status Message</p>\n    </>\n  )}\n</FieldContainer>;\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Field",component:FieldContainer}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Field",args:{as:"hook",hasHint:!0,hasMessage:!0},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},children:args=>(0,jsx_runtime.jsx)(FieldStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const field=args=>(0,jsx_runtime.jsx)(FieldStory,{...args});field.storyName="Field",field.argTypes={as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},field.args={as:"hook",hasHint:!0,hasMessage:!0},field.parameters={storySource:{source:"args => <FieldStory {...args} />"}};const componentMeta={title:"Packages/Field",component:FieldContainer,tags:["stories-mdx"],includeStories:["field"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const field_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/global"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/field/src/useField.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>useField});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/utilities/src/utils/useId.ts");const useField=_ref=>{let{idPrefix,hasHint,hasMessage}=_ref;const prefix=(0,_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_1__.M)(idPrefix),inputId=`${prefix}--input`,labelId=`${prefix}--label`,hintId=`${prefix}--hint`,messageId=`${prefix}--message`,getLabelProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp){let{id=labelId,htmlFor=inputId,...other}=void 0===_temp?{}:_temp;return{"data-garden-container-id":"containers.field.label","data-garden-container-version":"storybook",id,htmlFor,...other}}),[labelId,inputId]),getHintProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp2){let{id=hintId,...other}=void 0===_temp2?{}:_temp2;return{"data-garden-container-id":"containers.field.hint","data-garden-container-version":"storybook",id,...other}}),[hintId]),getInputProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp3){let{id=inputId,"aria-describedby":ariaDescribedBy,...other}=void 0===_temp3?{}:_temp3;return{"data-garden-container-id":"containers.field.input","data-garden-container-version":"storybook",id,"aria-labelledby":labelId,"aria-describedby":(()=>{if(ariaDescribedBy)return ariaDescribedBy;const describedBy=[];return hasHint&&describedBy.push(hintId),hasMessage&&describedBy.push(messageId),describedBy.length>0?describedBy.join(" "):void 0})(),...other}}),[inputId,labelId,hintId,messageId,hasHint,hasMessage]),getMessageProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp4){let{id=messageId,role="alert",...other}=void 0===_temp4?{}:_temp4;return{"data-garden-container-id":"containers.field.message","data-garden-container-version":"storybook",role:null===role?void 0:role,id,...other}}),[messageId]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({getLabelProps,getHintProps,getInputProps,getMessageProps})),[getLabelProps,getHintProps,getInputProps,getMessageProps])}},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++}}]);