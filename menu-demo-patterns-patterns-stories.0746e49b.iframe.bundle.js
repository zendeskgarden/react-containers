"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[1260],{"./packages/menu/demo/~patterns/patterns.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NestedFocusControlled:()=>NestedFocusControlled,NestedFocusUncontrolled:()=>NestedFocusUncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>patterns_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),classnames=(__webpack_require__("./node_modules/@storybook/react/dist/index.mjs"),__webpack_require__("./node_modules/classnames/index.js")),classnames_default=__webpack_require__.n(classnames),useMenu=__webpack_require__("./packages/menu/src/useMenu.ts");const NestedStory=_ref=>{let{rtl,onChange,items}=_ref;const triggerRef=(0,react.useRef)(null),menuRef=(0,react.useRef)(null),{focusedValue,isExpanded,getTriggerProps,getMenuProps,getItemProps,getSeparatorProps}=(0,useMenu.H)({items,triggerRef,menuRef,onChange,rtl});return react.createElement("div",{className:"relative",dir:rtl?"rtl":"ltr"},react.createElement("button",getTriggerProps(),"Fruits"),react.createElement("ul",(0,esm_extends.Z)({className:classnames_default()("border border-grey-400 border-solid w-32 absolute",{invisible:!isExpanded})},getMenuProps()),items.map((item=>{if("separator"in item)return react.createElement("li",(0,esm_extends.Z)({key:item.value,className:"my-1 border-0 border-b border-solid border-grey-200"},getSeparatorProps()));if("value"in item){const{value,isNext,isPrevious}=item;return react.createElement("li",(0,esm_extends.Z)({},getItemProps({item}),{className:classnames_default()("flex cursor-default",{"bg-blue-100":focusedValue===value}),key:value}),react.createElement("span",{className:"inline-flex justify-center items-center w-4"},!!isPrevious&&react.createElement("span",{"aria-hidden":"true"},"<")),value,react.createElement("span",{className:"ms-auto inline-flex justify-center items-center w-4"},!!isNext&&react.createElement("span",{"aria-hidden":"true"},">")),!!isPrevious&&react.createElement("span",{className:"sr-only"},"Back to main menu"),!!isNext&&react.createElement("span",{className:"sr-only"},"Go to submenu"))}return null}))))};NestedStory.__docgenInfo={description:"",methods:[],displayName:"NestedStory"};const BASE_ITEMS=[{value:"Orange"},{value:"Berry",isNext:!0},{value:"Apple"}],NESTED_ITEMS=[{value:"Fruits",isPrevious:!0},{value:"separator",separator:!0},{value:"Strawberry"},{value:"Loganberry"},{value:"Boysenberry"}],patterns_stories={title:"Packages/Menu/[patterns]"},NestedFocusUncontrolled={render:function Render(args){const[_,updateArgs,resetArgs]=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)();return react.createElement(NestedStory,(0,esm_extends.Z)({},args,{onChange:({type,isExpanded})=>{const isNext=type.includes("next"),isPrev=type.includes("previous");isNext||isPrev?updateArgs({items:isNext?NESTED_ITEMS:BASE_ITEMS}):!1===isExpanded&&resetArgs(["items"])}}))},name:"Nested focus uncontrolled",args:{rtl:!1,items:BASE_ITEMS}},NestedFocusControlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(NestedStory,(0,esm_extends.Z)({},args,{onChange:({type,focusedValue,isExpanded})=>{const isNext=type.includes("next"),isPrev=type.includes("previous"),_focusedValue=focusedValue||args.focusedValue;updateArgs(isNext||isPrev?{items:isNext?NESTED_ITEMS:BASE_ITEMS,focusedValue:isNext?"Fruits":"Berry"}:!1===isExpanded?{items:BASE_ITEMS,focusedValue:_focusedValue}:{focusedValue:_focusedValue})}}))},name:"Nested focus controlled",argTypes:{focusedValue:{control:{type:"text"}}},args:{rtl:!1,items:BASE_ITEMS,focusedValue:"Orange"}},__namedExportsOrder=["NestedFocusUncontrolled","NestedFocusControlled"];NestedFocusUncontrolled.parameters={...NestedFocusUncontrolled.parameters,docs:{...NestedFocusUncontrolled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    // eslint-disable-next-line @typescript-eslint/no-unused-vars\n    const [_, updateArgs, resetArgs] = useArgs();\n    return <NestedStory {...args} onChange={({\n      type,\n      isExpanded\n    }) => {\n      const isNext = type.includes('next');\n      const isPrev = type.includes('previous');\n      if (isNext || isPrev) {\n        updateArgs({\n          items: isNext ? NESTED_ITEMS : BASE_ITEMS\n        });\n      } else if (isExpanded === false) {\n        resetArgs(['items']);\n      }\n    }} />;\n  },\n  name: 'Nested focus uncontrolled',\n  args: {\n    rtl: false,\n    items: BASE_ITEMS\n  }\n}",...NestedFocusUncontrolled.parameters?.docs?.source}}},NestedFocusControlled.parameters={...NestedFocusControlled.parameters,docs:{...NestedFocusControlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <NestedStory {...args} onChange={({\n      type,\n      focusedValue,\n      isExpanded\n    }) => {\n      const isNext = type.includes('next');\n      const isPrev = type.includes('previous');\n      const _focusedValue = focusedValue || args.focusedValue;\n      if (isNext || isPrev) {\n        updateArgs({\n          items: isNext ? NESTED_ITEMS : BASE_ITEMS,\n          focusedValue: isNext ? 'Fruits' : 'Berry'\n        });\n      } else if (isExpanded === false) {\n        updateArgs({\n          items: BASE_ITEMS,\n          focusedValue: _focusedValue\n        });\n      } else {\n        updateArgs({\n          focusedValue: _focusedValue\n        });\n      }\n    }} />;\n  },\n  name: 'Nested focus controlled',\n  argTypes: {\n    focusedValue: {\n      control: {\n        type: 'text'\n      }\n    }\n  },\n  args: {\n    rtl: false,\n    items: BASE_ITEMS,\n    focusedValue: 'Orange'\n  }\n}",...NestedFocusControlled.parameters?.docs?.source}}}}}]);