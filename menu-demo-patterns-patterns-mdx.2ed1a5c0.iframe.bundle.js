/*! For license information please see menu-demo-patterns-patterns-mdx.2ed1a5c0.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[1724,1260],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/menu/demo/~patterns/patterns.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js"),_home_circleci_project_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"),_patterns_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/menu/demo/~patterns/patterns.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",p:"p",...(0,_home_circleci_project_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_2__.a)(),...props.components};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.h_,{of:_patterns_stories__WEBPACK_IMPORTED_MODULE_4__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"patterns",children:"Patterns"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"nested-focus-uncontrolled",children:"Nested Focus Uncontrolled"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Demonstrate nested menu with uncontrolled focus."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.oG,{of:_patterns_stories__WEBPACK_IMPORTED_MODULE_4__.NestedFocusUncontrolled})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"nested-focus-controlled",children:"Nested Focus Controlled"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Demonstrate nested menu with controlled focus."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.Xz,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.oG,{of:_patterns_stories__WEBPACK_IMPORTED_MODULE_4__.NestedFocusControlled})})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,_home_circleci_project_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_2__.a)(),...props.components};return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,{...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./packages/menu/demo/~patterns/patterns.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NestedFocusControlled:()=>NestedFocusControlled,NestedFocusUncontrolled:()=>NestedFocusUncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>patterns_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),classnames=(__webpack_require__("./node_modules/@storybook/react/dist/index.mjs"),__webpack_require__("./node_modules/classnames/index.js")),classnames_default=__webpack_require__.n(classnames),useMenu=__webpack_require__("./packages/menu/src/useMenu.ts");const NestedStory=_ref=>{let{rtl,onChange,items}=_ref;const triggerRef=(0,react.useRef)(null),menuRef=(0,react.useRef)(null),{focusedValue,isExpanded,getTriggerProps,getMenuProps,getItemProps,getSeparatorProps}=(0,useMenu.H)({items,triggerRef,menuRef,onChange,rtl});return react.createElement("div",{className:"relative",dir:rtl?"rtl":"ltr"},react.createElement("button",getTriggerProps(),"Fruits"),react.createElement("ul",(0,esm_extends.Z)({className:classnames_default()("border border-grey-400 border-solid w-32 absolute",{invisible:!isExpanded})},getMenuProps()),items.map((item=>{if("separator"in item)return react.createElement("li",(0,esm_extends.Z)({key:item.value,className:"my-1 border-0 border-b border-solid border-grey-200"},getSeparatorProps()));if("value"in item){const{value,isNext,isPrevious}=item;return react.createElement("li",(0,esm_extends.Z)({},getItemProps({item}),{className:classnames_default()("flex cursor-default",{"bg-blue-100":focusedValue===value}),key:value}),react.createElement("span",{className:"inline-flex justify-center items-center w-4"},isPrevious&&react.createElement("span",{"aria-hidden":"true"},"<")),value,react.createElement("span",{className:"ms-auto inline-flex justify-center items-center w-4"},isNext&&react.createElement("span",{"aria-hidden":"true"},">")),isPrevious&&react.createElement("span",{className:"sr-only"},"Back to main menu"),isNext&&react.createElement("span",{className:"sr-only"},"Go to submenu"))}return null}))))};NestedStory.__docgenInfo={description:"",methods:[],displayName:"NestedStory"};const BASE_ITEMS=[{value:"Orange"},{value:"Berry",isNext:!0},{value:"Apple"}],NESTED_ITEMS=[{value:"Fruits",isPrevious:!0},{value:"separator",separator:!0},{value:"Strawberry"},{value:"Loganberry"},{value:"Boysenberry"}],patterns_stories={title:"Packages/Menu/[patterns]"},NestedFocusUncontrolled={render:function Render(args){const[_,updateArgs,resetArgs]=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)();return react.createElement(NestedStory,(0,esm_extends.Z)({},args,{onChange:_ref=>{let{type,isExpanded}=_ref;const isNext=type.includes("next"),isPrev=type.includes("previous");isNext||isPrev?updateArgs({items:isNext?NESTED_ITEMS:BASE_ITEMS}):!1===isExpanded&&resetArgs(["items"])}}))},name:"Nested focus uncontrolled",args:{rtl:!1,items:BASE_ITEMS}},NestedFocusControlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(NestedStory,(0,esm_extends.Z)({},args,{onChange:_ref2=>{let{type,focusedValue,isExpanded}=_ref2;const isNext=type.includes("next"),isPrev=type.includes("previous"),_focusedValue=focusedValue||args.focusedValue;updateArgs(isNext||isPrev?{items:isNext?NESTED_ITEMS:BASE_ITEMS,focusedValue:isNext?"Fruits":"Berry"}:!1===isExpanded?{items:BASE_ITEMS,focusedValue:_focusedValue}:{focusedValue:_focusedValue})}}))},name:"Nested focus controlled",argTypes:{focusedValue:{control:{type:"text"}}},args:{rtl:!1,items:BASE_ITEMS,focusedValue:"Orange"}};NestedFocusUncontrolled.parameters={...NestedFocusUncontrolled.parameters,docs:{...NestedFocusUncontrolled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    // eslint-disable-next-line @typescript-eslint/no-unused-vars\n    const [_, updateArgs, resetArgs] = useArgs();\n    return <NestedStory {...args} onChange={({\n      type,\n      isExpanded\n    }) => {\n      const isNext = type.includes('next');\n      const isPrev = type.includes('previous');\n      if (isNext || isPrev) {\n        updateArgs({\n          items: isNext ? NESTED_ITEMS : BASE_ITEMS\n        });\n      } else if (isExpanded === false) {\n        resetArgs(['items']);\n      }\n    }} />;\n  },\n  name: 'Nested focus uncontrolled',\n  args: {\n    rtl: false,\n    items: BASE_ITEMS\n  }\n}",...NestedFocusUncontrolled.parameters?.docs?.source}}},NestedFocusControlled.parameters={...NestedFocusControlled.parameters,docs:{...NestedFocusControlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <NestedStory {...args} onChange={({\n      type,\n      focusedValue,\n      isExpanded\n    }) => {\n      const isNext = type.includes('next');\n      const isPrev = type.includes('previous');\n      const _focusedValue = focusedValue || args.focusedValue;\n      if (isNext || isPrev) {\n        updateArgs({\n          items: isNext ? NESTED_ITEMS : BASE_ITEMS,\n          focusedValue: isNext ? 'Fruits' : 'Berry'\n        });\n      } else if (isExpanded === false) {\n        updateArgs({\n          items: BASE_ITEMS,\n          focusedValue: _focusedValue\n        });\n      } else {\n        updateArgs({\n          focusedValue: _focusedValue\n        });\n      }\n    }} />;\n  },\n  name: 'Nested focus controlled',\n  argTypes: {\n    focusedValue: {\n      control: {\n        type: 'text'\n      }\n    }\n  },\n  args: {\n    rtl: false,\n    items: BASE_ITEMS,\n    focusedValue: 'Orange'\n  }\n}",...NestedFocusControlled.parameters?.docs?.source}}};const __namedExportsOrder=["NestedFocusUncontrolled","NestedFocusControlled"]},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);