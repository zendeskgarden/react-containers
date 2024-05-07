/*! For license information please see field-demo-field-mdx.3c6495f5.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[280,3272],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}},"./packages/field/demo/field.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-field [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-field\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-field\n\nThis package includes containers relating to field in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-field\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\nThe `useField` hook will supply the prop getters to handle `aria-labelledby` along\nwith for/id mapping and `aria-describedby` mapping when a hint and/or status message\nis applied.\n\n### useField\n\n```jsx\nimport { useField } from '@zendeskgarden/container-field';\n\nconst Field = () => {\n  const { getLabelProps, getInputProps, getHintProps, getMessageProps } = useField();\n\n  return (\n    <>\n      <label {...getLabelProps()}>Accessible Native Input</label>\n      <p {...getHintProps()}>Optional Hint</p>\n      <input {...getInputProps()} />\n      <p {...getMessageProps()}>Optional Status Message</p>\n    </>\n  );\n};\n```\n\n### FieldContainer\n\nFieldContainer is a render-prop wrapper for the `useField` hook.\n\n```jsx\nimport { FieldContainer } from '@zendeskgarden/container-field';\n\n<FieldContainer>\n  {({ getLabelProps, getInputProps, getHintProps, getMessageProps }) => (\n    <>\n      <label {...getLabelProps()}>Accessible Native Input</label>\n      <p {...getHintProps()}>Optional Hint</p>\n      <input {...getInputProps()} />\n      <p {...getMessageProps()}>Optional Status Message</p>\n    </>\n  )}\n</FieldContainer>;\n```\n";var field_stories=__webpack_require__("./packages/field/demo/field.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",...(0,lib.a)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:field_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.ZX,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:field_stories.Field})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.a)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/field/demo/field.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Field:()=>Field,__namedExportsOrder:()=>__namedExportsOrder,default:()=>field_stories});var react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useField=__webpack_require__("./packages/field/src/useField.ts");const FieldContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render((0,useField.U)(options)))};FieldContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,idPrefix:prop_types_default().string,hasHint:prop_types_default().bool,hasMessage:prop_types_default().bool},FieldContainer.__docgenInfo={description:"",methods:[],displayName:"FieldContainer",props:{idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for field elements",type:{name:"string"}},hasHint:{required:!1,tsType:{name:"boolean"},description:"Indicates the field has a hint",type:{name:"bool"}},hasMessage:{required:!1,tsType:{name:"boolean"},description:"Indicates the field has a message",type:{name:"bool"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  getLabelProps: IUseFieldReturnValue['getLabelProps'];\n  getHintProps: IUseFieldReturnValue['getHintProps'];\n  getInputProps: IUseFieldReturnValue['getInputProps'];\n  getMessageProps: IUseFieldReturnValue['getMessageProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  getLabelProps: IUseFieldReturnValue['getLabelProps'];\n  getHintProps: IUseFieldReturnValue['getHintProps'];\n  getInputProps: IUseFieldReturnValue['getInputProps'];\n  getMessageProps: IUseFieldReturnValue['getMessageProps'];\n}",signature:{properties:[{key:"getLabelProps",value:{name:"IUseFieldReturnValue['getLabelProps']",raw:"IUseFieldReturnValue['getLabelProps']",required:!0}},{key:"getHintProps",value:{name:"IUseFieldReturnValue['getHintProps']",raw:"IUseFieldReturnValue['getHintProps']",required:!0}},{key:"getInputProps",value:{name:"IUseFieldReturnValue['getInputProps']",raw:"IUseFieldReturnValue['getInputProps']",required:!0}},{key:"getMessageProps",value:{name:"IUseFieldReturnValue['getMessageProps']",raw:"IUseFieldReturnValue['getMessageProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides field render prop functions\n\n@param {function} [options.getLabelProps] Field label props getter\n@param {function} [options.getHintProps] Field hint props getter\n@param {function} [options.getInputProps] Field input props getter\n@param {function} [options.getMessageProps] Field message getter",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseFieldReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseFieldReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js");__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{getLabelProps,getHintProps,getInputProps,getMessageProps,hasHint,hasMessage}=_ref;return react.createElement(react.Fragment,null,react.createElement("label",getLabelProps(),"Label"),hasHint&&react.createElement("div",getHintProps(),"Hint"),react.createElement("input",getInputProps()),hasMessage&&react.createElement("div",getMessageProps(),"Message"))},Container=_ref2=>{let{hasHint,hasMessage,...props}=_ref2;return react.createElement(FieldContainer,(0,esm_extends.Z)({hasHint,hasMessage},props),(containerProps=>react.createElement(Component,(0,esm_extends.Z)({},containerProps,{hasHint,hasMessage}))))},Hook=_ref3=>{let{hasHint,hasMessage,...props}=_ref3;const hookProps=(0,useField.U)({hasHint,hasMessage,...props});return react.createElement(Component,(0,esm_extends.Z)({},hookProps,{hasHint,hasMessage}))},FieldStory=_ref4=>{let{as,...props}=_ref4;const Field=()=>"container"===as?react.createElement(Container,props):react.createElement(Hook,props);return react.createElement(Field,null)};FieldStory.__docgenInfo={description:"",methods:[],displayName:"FieldStory"};const field_stories={title:"Packages/Field",component:FieldContainer},Field={render:args=>react.createElement(FieldStory,args),name:"Field",args:{as:"hook",hasHint:!0,hasMessage:!0},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}};Field.parameters={...Field.parameters,docs:{...Field.parameters?.docs,source:{originalSource:"{\n  render: args => <FieldStory {...args} />,\n  name: 'Field',\n  args: {\n    as: 'hook',\n    hasHint: true,\n    hasMessage: true\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    }\n  }\n}",...Field.parameters?.docs?.source}}};const __namedExportsOrder=["Field"]},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/react/dist/chunk-JXRZ2CQ5.mjs"),__webpack_require__("./node_modules/@storybook/react/dist/chunk-JSBTCGGE.mjs");var _storybook_global__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/global"),{window:globalWindow}=(__webpack_require__("@storybook/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react")},"./packages/field/src/useField.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{U:()=>useField});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/utilities/src/utils/useId.ts");const useField=_ref=>{let{idPrefix,hasHint,hasMessage}=_ref;const prefix=(0,_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_1__.M)(idPrefix),inputId=`${prefix}--input`,labelId=`${prefix}--label`,hintId=`${prefix}--hint`,messageId=`${prefix}--message`,getLabelProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp){let{id=labelId,htmlFor=inputId,...other}=void 0===_temp?{}:_temp;return{"data-garden-container-id":"containers.field.label","data-garden-container-version":"storybook",id,htmlFor,...other}}),[labelId,inputId]),getHintProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp2){let{id=hintId,...other}=void 0===_temp2?{}:_temp2;return{"data-garden-container-id":"containers.field.hint","data-garden-container-version":"storybook",id,...other}}),[hintId]),getInputProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp3){let{id=inputId,"aria-describedby":ariaDescribedBy,...other}=void 0===_temp3?{}:_temp3;return{"data-garden-container-id":"containers.field.input","data-garden-container-version":"storybook",id,"aria-labelledby":labelId,"aria-describedby":(()=>{if(ariaDescribedBy)return ariaDescribedBy;const describedBy=[];return hasHint&&describedBy.push(hintId),hasMessage&&describedBy.push(messageId),describedBy.length>0?describedBy.join(" "):void 0})(),...other}}),[inputId,labelId,hintId,messageId,hasHint,hasMessage]),getMessageProps=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(_temp4){let{id=messageId,role="alert",...other}=void 0===_temp4?{}:_temp4;return{"data-garden-container-id":"containers.field.message","data-garden-container-version":"storybook",role:null===role?void 0:role,id,...other}}),[messageId]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>({getLabelProps,getHintProps,getInputProps,getMessageProps})),[getLabelProps,getHintProps,getInputProps,getMessageProps])}},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);