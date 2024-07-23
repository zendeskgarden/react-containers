/*! For license information please see combobox-demo-combobox-mdx.b328bf0d.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[6892,9548],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./packages/combobox/demo/combobox.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-combobox [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-combobox\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-combobox\n\nThis package includes containers relating to Combobox in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-combobox\n```\n\n## Features\n\nThe combobox container encapsulates complexity while supporting a wide variety of\nstandard features. Core logic and events are backed by Downshift. Standard\nnaming and behaviors are finessed to suit Garden's point of view.\n\n- single and multiple option selection\n- non-editable select-only (similar to a native HTML `<select>`)\n- autocomplete (on by default) with user-provided option filtering\n- support for trigger as input parent (Garden layout) vs. trigger as input\n  sibling (Downshift layout)\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useCombobox\n\n```jsx\nimport { useCombobox } from '@zendeskgarden/container-combobox';\n\nconst Combobox = () => {\n  const triggerRef = createRef();\n  const inputRef = createRef();\n  const listboxRef = createRef();\n  const options = [\n    { value: 'value-1', label: 'One' },\n    { value: 'value-2', label: 'Two' },\n    { value: 'value-3', label: 'Three' }\n  ];\n  const {\n    getLabelProps,\n    getInputProps,\n    getTriggerProps,\n    getListboxProps,\n    getOptionProps,\n    isExpanded\n  } = useCombobox({\n    triggerRef,\n    inputRef,\n    listboxRef,\n    options\n  });\n\n  return (\n    <>\n      <label {...getLabelProps()}>Label</label>\n      <input {...getInputProps()} />\n      <button {...getTriggerProps()}>&#9660;</button>\n      <ul\n        {...getListboxProps({ 'aria-label': 'Options' })}\n        style={{ visibility: isExpanded ? 'visible' : 'hidden' }}\n      >\n        {options.map((option, index) => (\n          <li key={index} {...getOptionProps({ option })}>\n            {option.label}\n          </li>\n        ))}\n      </ul>\n    </>\n  );\n};\n```\n\n### ComboboxContainer\n\n```jsx\nimport { ComboboxContainer } from '@zendeskgarden/container-combobox';\n\nconst Combobox = () => {\n  const triggerRef = createRef();\n  const inputRef = createRef();\n  const listboxRef = createRef();\n  const options = [\n    { value: 'value-1', label: 'One' },\n    { value: 'value-2', label: 'Two' },\n    { value: 'value-3', label: 'Three' }\n  ];\n\n  return (\n    <ComboboxContainer\n      triggerRef={triggerRef}\n      inputRef={inputRef}\n      listboxRef={listboxRef}\n      options={options}\n    >\n      {({\n        getLabelProps,\n        getInputProps,\n        getTriggerProps,\n        getListboxProps,\n        getOptionProps,\n        isExpanded\n      }) => (\n        <>\n          <label {...getLabelProps()}>Label</label>\n          <input {...getInputProps()} />\n          <button {...getTriggerProps()}>&#9660;</button>\n          <ul\n            {...getListboxProps({ 'aria-label': 'Options' })}\n            style={{ visibility: isExpanded ? 'visible' : 'hidden' }}\n          >\n            {options.map((option, index) => (\n              <li key={index} {...getOptionProps({ option })}>\n                {option.label}\n              </li>\n            ))}\n          </ul>\n        </>\n      )}\n    </ComboboxContainer>\n  );\n};\n```\n";var combobox_stories=__webpack_require__("./packages/combobox/demo/combobox.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",...(0,lib.a)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:combobox_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.ZX,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:combobox_stories.Uncontrolled})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:combobox_stories.Controlled})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.a)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/combobox/demo/combobox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Uncontrolled:()=>Uncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>combobox_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useCombobox=__webpack_require__("./packages/combobox/src/useCombobox.ts");const ComboboxContainer=props=>{const{children,render=children,...options}=props;return react.createElement(react.Fragment,null,render((0,useCombobox.K)(options)))};ComboboxContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,idPrefix:prop_types_default().string,triggerRef:prop_types_default().any.isRequired,inputRef:prop_types_default().any.isRequired,listboxRef:prop_types_default().any.isRequired,isAutocomplete:prop_types_default().bool,isMultiselectable:prop_types_default().bool,isEditable:prop_types_default().bool,disabled:prop_types_default().bool,hasHint:prop_types_default().bool,hasMessage:prop_types_default().bool,options:prop_types_default().arrayOf(prop_types_default().any).isRequired,inputValue:prop_types_default().string,selectionValue:prop_types_default().any,isExpanded:prop_types_default().bool,defaultExpanded:prop_types_default().bool,initialExpanded:prop_types_default().bool,activeIndex:prop_types_default().number,defaultActiveIndex:prop_types_default().number,initialActiveIndex:prop_types_default().number,onChange:prop_types_default().func,environment:prop_types_default().any},ComboboxContainer.defaultProps={isEditable:!0},ComboboxContainer.__docgenInfo={description:"",methods:[],displayName:"ComboboxContainer",props:{idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for the combobox",type:{name:"string"}},triggerRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"T"}],raw:"RefObject<T>"},description:"Provides ref access to the underlying trigger element",type:{name:"any"}},inputRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLInputElement"}],raw:"RefObject<HTMLInputElement>"},description:"Provides ref access to the underlying input element",type:{name:"any"}},listboxRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"L"}],raw:"RefObject<L>"},description:"Provides ref access to the underlying listbox element",type:{name:"any"}},isAutocomplete:{required:!1,tsType:{name:"boolean"},description:"Indicates that the combobox provides autocompletion",type:{name:"bool"}},isMultiselectable:{required:!1,tsType:{name:"boolean"},description:"Determines whether multiple option values can be selected",type:{name:"bool"}},isEditable:{required:!1,tsType:{name:"boolean"},description:"Determines whether the combobox is editable or select-only",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},disabled:{required:!1,tsType:{name:"boolean"},description:"Indicates that the element is not interactive",type:{name:"bool"}},hasHint:{required:!1,tsType:{name:"boolean"},description:"Indicates the combobox has a hint",type:{name:"bool"}},hasMessage:{required:!1,tsType:{name:"boolean"},description:"Indicates the combobox has a message",type:{name:"bool"}},options:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(IOption | { options: IOption[]; label?: string })[]"},description:"Provides an ordered list of option groups and options\n\n@param {OptionValue} option.value Unique option value\n@param {string} option.label Optional human-readable text (defaults to `option.value`)\n@param {boolean} option.selected Sets initial selection for the option\n@param {boolean} option.disabled Indicates that the option is not interactive\n@param {IOption[]} option.options Groups a list of options",type:{name:"arrayOf",value:{name:"any"}}},inputValue:{required:!1,tsType:{name:"string"},description:"Sets the input value in a controlled combobox",type:{name:"string"}},selectionValue:{required:!1,tsType:{name:"union",raw:"OptionValue | OptionValue[] | null",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"OptionValue[]"},{name:"null"}]},description:"Sets the selection value (or `isMultiselectable` values) in a controlled combobox",type:{name:"any"}},isExpanded:{required:!1,tsType:{name:"boolean"},description:"Determines listbox expansion in a controlled combobox",type:{name:"bool"}},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"Determines default listbox expansion in an uncontrolled combobox",type:{name:"bool"}},initialExpanded:{required:!1,tsType:{name:"boolean"},description:"Determines listbox expansion on combobox initialization",type:{name:"bool"}},activeIndex:{required:!1,tsType:{name:"number"},description:"Sets the currently active option index in a controlled combobox",type:{name:"number"}},defaultActiveIndex:{required:!1,tsType:{name:"number"},description:"Sets the default active option index in an uncontrolled combobox",type:{name:"number"}},initialActiveIndex:{required:!1,tsType:{name:"number"},description:"Sets the active option index on combobox initialization",type:{name:"number"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(changes: {\n  type: string;\n  isExpanded?: boolean;\n  selectionValue?: OptionValue | OptionValue[] | null;\n  inputValue?: string;\n  activeIndex?: number;\n}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  type: string;\n  isExpanded?: boolean;\n  selectionValue?: OptionValue | OptionValue[] | null;\n  inputValue?: string;\n  activeIndex?: number;\n}",signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"isExpanded",value:{name:"boolean",required:!1}},{key:"selectionValue",value:{name:"union",raw:"OptionValue | OptionValue[] | null",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"OptionValue[]"},{name:"null"}],required:!1}},{key:"inputValue",value:{name:"string",required:!1}},{key:"activeIndex",value:{name:"number",required:!1}}]}},name:"changes"}],return:{name:"void"}}},description:"Handles combobox state changes\n\n@param {string} changes.type The event type that triggered the change\n@param {boolean} [changes.isExpanded] The updated listbox expansion\n@param {OptionValue|OptionValue[]} [changes.selectionValue] The updated selection value(s)\n@param {string} [changes.inputValue] The updated input value\n@param {number} [changes.activeIndex] The updated active option index",type:{name:"func"}},environment:{required:!1,tsType:{name:"Window"},description:"Sets the environment where the combobox is rendered",type:{name:"any"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  /* prop getters */\n  getLabelProps: IUseComboboxReturnValue['getLabelProps'];\n  getHintProps: IUseComboboxReturnValue['getHintProps'];\n  getTriggerProps: IUseComboboxReturnValue['getTriggerProps'];\n  getInputProps: IUseComboboxReturnValue['getInputProps'];\n  getTagProps: IUseComboboxReturnValue['getTagProps'];\n  getListboxProps: IUseComboboxReturnValue['getListboxProps'];\n  getOptGroupProps: IUseComboboxReturnValue['getOptGroupProps'];\n  getOptionProps: IUseComboboxReturnValue['getOptionProps'];\n  getMessageProps: IUseComboboxReturnValue['getMessageProps'];\n  /* state */\n  isExpanded: IUseComboboxReturnValue['isExpanded'];\n  activeValue?: IUseComboboxReturnValue['activeValue'];\n  selection: IUseComboboxReturnValue['selection'];\n  inputValue?: IUseComboboxReturnValue['inputValue'];\n  /* actions */\n  removeSelection: IUseComboboxReturnValue['removeSelection'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  /* prop getters */\n  getLabelProps: IUseComboboxReturnValue['getLabelProps'];\n  getHintProps: IUseComboboxReturnValue['getHintProps'];\n  getTriggerProps: IUseComboboxReturnValue['getTriggerProps'];\n  getInputProps: IUseComboboxReturnValue['getInputProps'];\n  getTagProps: IUseComboboxReturnValue['getTagProps'];\n  getListboxProps: IUseComboboxReturnValue['getListboxProps'];\n  getOptGroupProps: IUseComboboxReturnValue['getOptGroupProps'];\n  getOptionProps: IUseComboboxReturnValue['getOptionProps'];\n  getMessageProps: IUseComboboxReturnValue['getMessageProps'];\n  /* state */\n  isExpanded: IUseComboboxReturnValue['isExpanded'];\n  activeValue?: IUseComboboxReturnValue['activeValue'];\n  selection: IUseComboboxReturnValue['selection'];\n  inputValue?: IUseComboboxReturnValue['inputValue'];\n  /* actions */\n  removeSelection: IUseComboboxReturnValue['removeSelection'];\n}",signature:{properties:[{key:"getLabelProps",value:{name:"IUseComboboxReturnValue['getLabelProps']",raw:"IUseComboboxReturnValue['getLabelProps']",required:!0}},{key:"getHintProps",value:{name:"IUseComboboxReturnValue['getHintProps']",raw:"IUseComboboxReturnValue['getHintProps']",required:!0}},{key:"getTriggerProps",value:{name:"IUseComboboxReturnValue['getTriggerProps']",raw:"IUseComboboxReturnValue['getTriggerProps']",required:!0}},{key:"getInputProps",value:{name:"IUseComboboxReturnValue['getInputProps']",raw:"IUseComboboxReturnValue['getInputProps']",required:!0}},{key:"getTagProps",value:{name:"IUseComboboxReturnValue['getTagProps']",raw:"IUseComboboxReturnValue['getTagProps']",required:!0}},{key:"getListboxProps",value:{name:"IUseComboboxReturnValue['getListboxProps']",raw:"IUseComboboxReturnValue['getListboxProps']",required:!0}},{key:"getOptGroupProps",value:{name:"IUseComboboxReturnValue['getOptGroupProps']",raw:"IUseComboboxReturnValue['getOptGroupProps']",required:!0}},{key:"getOptionProps",value:{name:"IUseComboboxReturnValue['getOptionProps']",raw:"IUseComboboxReturnValue['getOptionProps']",required:!0}},{key:"getMessageProps",value:{name:"IUseComboboxReturnValue['getMessageProps']",raw:"IUseComboboxReturnValue['getMessageProps']",required:!0}},{key:"isExpanded",value:{name:"IUseComboboxReturnValue['isExpanded']",raw:"IUseComboboxReturnValue['isExpanded']",required:!0}},{key:"activeValue",value:{name:"IUseComboboxReturnValue['activeValue']",raw:"IUseComboboxReturnValue['activeValue']",required:!1}},{key:"selection",value:{name:"IUseComboboxReturnValue['selection']",raw:"IUseComboboxReturnValue['selection']",required:!0}},{key:"inputValue",value:{name:"IUseComboboxReturnValue['inputValue']",raw:"IUseComboboxReturnValue['inputValue']",required:!1}},{key:"removeSelection",value:{name:"IUseComboboxReturnValue['removeSelection']",raw:"IUseComboboxReturnValue['removeSelection']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides combobox render prop functions, state, and actions\n\n@param {function} [options.getLabelProps] Label props getter\n@param {function} [options.getHintProps] Hint props getter\n@param {function} [options.getTriggerProps] Trigger props getter\n@param {function} [options.getInputProps] Input props getter\n@param {function} [options.getTagProps] Tag (multiselectable value) props getter\n@param {function} [options.getListboxProps] Listbox props getter\n@param {function} [options.getOptGroupProps] Option group props getter\n@param {function} [options.getOptionProps] Option props getter\n@param {function} [options.getMessageProps] Message props getter\n@param {boolean} options.isExpanded Current listbox expansion\n@param {OptionValue} [options.activeValue] Current active option value\n@param {object|object[]} options.selection Current selection\n@param {string} [options.inputValue] Current input value\n@param {function} [options.removeSelection] Remove the specified selection value or all values if unspecified",type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseComboboxReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseComboboxReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),useGrid=__webpack_require__("./packages/grid/src/useGrid.ts");const getLabel=option=>option.label||option.value,Option=_ref=>{let{option,isGrouped,activeValue,selection,getOptionProps}=_ref;return react.createElement("li",(0,esm_extends.Z)({className:classnames_default()({"pl-2":isGrouped,"bg-blue-100":option.value===activeValue,"cursor-default":option.disabled,"cursor-pointer":!option.disabled,"text-grey-400":option.disabled,"sr-only":option.hidden})},getOptionProps({option})),!!(Array.isArray(selection)?void 0!==selection.find((value=>value.value===option.value)):selection&&selection.value===option.value)&&"✓ ",getLabel(option))};Option.displayName="Option";const Tags=_ref2=>{let{selection,getTagProps}=_ref2;const{getGridProps,getGridCellProps}=(0,useGrid.N)({matrix:Array.isArray(selection)?[selection.filter((value=>!value.disabled))]:[[]]});return react.createElement("table",(0,esm_extends.Z)({className:"inline align-top"},getGridProps({"aria-label":"Tag values"})),react.createElement("tbody",{className:"inline"},react.createElement("tr",{className:"inline"},Array.isArray(selection)&&selection.map(((option,index)=>{const tagProps=getTagProps({option,"aria-label":option.disabled?"":`Press delete or backspace to remove ${getLabel(option)}`}),previousDisabledOptions=selection.filter(((_option,_index)=>_option.disabled&&_index<index)),{role,...props}=option.disabled?tagProps:getGridCellProps({rowIndex:0,colIndex:index-previousDisabledOptions.length,...{...tagProps,role:void 0}});return react.createElement("td",{key:index,role,className:"inline"},react.createElement("button",(0,esm_extends.Z)({className:"mr-1 px-1",disabled:option.disabled},props,{type:"button"}),getLabel(option)))})))))},Component=_ref3=>{let{layout,isAutocomplete,isEditable,isMultiselectable,isExpanded,disabled,hasHint,hasMessage,activeValue,selection,getLabelProps,getHintProps,getTriggerProps,getInputProps,getTagProps,getListboxProps,getOptGroupProps,getOptionProps,getMessageProps,options}=_ref3;return react.createElement("div",{className:"relative"},react.createElement("label",getLabelProps(),"Label"),!!hasHint&&react.createElement("div",getHintProps(),"Hint"),"Garden"===layout&&react.createElement("div",(0,esm_extends.Z)({className:classnames_default()("border","border-solid","p-1",{"cursor-default":disabled,"cursor-pointer":!disabled&&(isAutocomplete||!isEditable),"cursor-text":!(disabled||isAutocomplete)&&isEditable,"bg-grey-100":disabled,"border-grey-200":disabled})},getTriggerProps()),!!isMultiselectable&&react.createElement(Tags,{selection,getTagProps}),react.createElement("input",(0,esm_extends.Z)({className:classnames_default()("border-none","bg-transparent",{"cursor-pointer":!(disabled||isEditable)})},getInputProps())),!(!isAutocomplete&&isEditable)&&react.createElement("button",{className:classnames_default()("ml-1","px-1",{"cursor-default":disabled}),disabled,tabIndex:-1,type:"button"},"▼")),"Downshift"===layout&&react.createElement("div",!isEditable&&getTriggerProps(),!!isMultiselectable&&react.createElement(Tags,{selection,getTagProps}),react.createElement("input",(0,esm_extends.Z)({className:classnames_default()({"cursor-pointer":!(disabled||isEditable)})},getInputProps())),!!isAutocomplete&&!!isEditable&&react.createElement("button",(0,esm_extends.Z)({className:"ml-1 px-1"},getTriggerProps({"aria-label":"Options"}),{type:"button"}),"▼")),!!hasMessage&&react.createElement("div",getMessageProps(),"Message"),react.createElement("ul",(0,esm_extends.Z)({className:classnames_default()("mt-1","border","border-solid","absolute","w-full",{invisible:!isExpanded})},getListboxProps({"aria-label":"Options"})),0===options.length?react.createElement("li",(0,esm_extends.Z)({className:"text-grey-400"},getOptionProps({"aria-disabled":!0})),"No matches found"):options.map(((option,index)=>"options"in option?react.createElement("li",{key:index,role:"none",className:"cursor-default",onMouseDown:event=>event.preventDefault()},!!option.label&&react.createElement("b",{className:"block mt-1"},option.label),react.createElement("hr",{"aria-hidden":"true",className:"my-1 border-grey-200"}),react.createElement("ul",getOptGroupProps({"aria-label":option.label||"group"}),option.options.map(((groupOption,groupIndex)=>react.createElement(Option,{key:`${index}.${groupIndex}`,option:groupOption,isGrouped:!0,activeValue,selection,getOptionProps}))))):react.createElement(Option,{key:index,option,activeValue,selection,getOptionProps})))))};Component.displayName="Component";const Container=props=>react.createElement(ComboboxContainer,props,(containerProps=>react.createElement(Component,(0,esm_extends.Z)({},props,containerProps)))),Hook=props=>{const hookProps=(0,useCombobox.K)(props);return react.createElement(Component,(0,esm_extends.Z)({},props,hookProps))},ComboboxStory=_ref4=>{let{as,...props}=_ref4;const triggerRef=(0,react.createRef)(),inputRef=(0,react.createRef)(),listboxRef=(0,react.createRef)(),[options,setOptions]=(0,react.useState)(props.options),onChange=changes=>{if(props.isAutocomplete&&props.isEditable&&void 0!==changes.inputValue){const value=changes.inputValue;if(""===value)setOptions(props.options);else{const _options=[];props.options.forEach((option=>{"options"in option?_options.push(...option.options):_options.push(option)}));const regex=new RegExp(value.replace(/[.*+?^${}()|[\]\\]/giu,"\\$&"),"gui");setOptions(_options.filter((option=>getLabel(option).match(regex))))}}};return"container"===as?react.createElement(Container,(0,esm_extends.Z)({},props,{triggerRef,inputRef,listboxRef,options,onChange:(0,composeEventHandlers.M)(onChange,props.onChange)})):react.createElement(Hook,(0,esm_extends.Z)({},props,{triggerRef,inputRef,listboxRef,options,onChange:(0,composeEventHandlers.M)(onChange,props.onChange)}))};ComboboxStory.__docgenInfo={description:"",methods:[],displayName:"ComboboxStory"};const combobox_stories={title:"Packages/Combobox",component:ComboboxContainer,args:{as:"hook",layout:"Garden",isEditable:!0,options:[{label:"Fruits",options:[{value:"fruit-01",label:"Apple"},{value:"fruit-02",label:"Banana",disabled:!0},{value:"fruit-03",label:"Cherry"},{value:"fruit-04",label:"Grape"},{value:"fruit-05",label:"Kiwi"},{value:"fruit-06",label:"Watermeal",hidden:!0}]},{label:"Vegetables",options:[{value:"vegetable-01",label:"Asparagus"},{value:"vegetable-02",label:"Broccoli",disabled:!0},{value:"vegetable-03",label:"Brussel sprouts"},{value:"vegetable-04",label:"Cauliflower"},{value:"vegetable-05",label:"Kale"},{value:"vegetable-06",label:"Mankai",hidden:!0}]}]},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},layout:{options:["Downshift","Garden"],control:"radio",table:{category:"Story"}},inputRef:{control:!1},listboxRef:{control:!1},triggerRef:{control:!1}}},Uncontrolled={render:args=>react.createElement(ComboboxStory,args),name:"Uncontrolled",argTypes:{isExpanded:{control:!1},inputValue:{control:!1},activeIndex:{control:!1},selectionValue:{control:!1}}},Controlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(ComboboxStory,(0,esm_extends.Z)({},args,{onChange:({type,...rest})=>{updateArgs(rest)}}))},name:"Controlled",args:{isExpanded:!1,inputValue:"",activeIndex:-1,selectionValue:null},argTypes:{defaultExpanded:{control:!1}}},__namedExportsOrder=["Uncontrolled","Controlled"];Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:"{\n  render: args => <ComboboxStory {...args} />,\n  name: 'Uncontrolled',\n  argTypes: {\n    isExpanded: {\n      control: false\n    },\n    inputValue: {\n      control: false\n    },\n    activeIndex: {\n      control: false\n    },\n    selectionValue: {\n      control: false\n    }\n  }\n}",...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <ComboboxStory {...args}\n    // eslint-disable-next-line @typescript-eslint/no-unused-vars\n    onChange={({\n      type,\n      ...rest\n    }) => {\n      updateArgs(rest);\n    }} />;\n  },\n  name: 'Controlled',\n  args: {\n    isExpanded: false,\n    inputValue: '',\n    activeIndex: -1,\n    selectionValue: null\n  },\n  argTypes: {\n    defaultExpanded: {\n      control: false\n    }\n  }\n}",...Controlled.parameters?.docs?.source}}}},"./packages/grid/src/useGrid.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{N:()=>useGrid});var react=__webpack_require__("./node_modules/react/index.js"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const getCellDown=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const rowCount=matrix.length,colCount=matrix[0].length,lastRowLength=matrix[rowCount-1].length;return rowIndex===rowCount-(colCount>lastRowLength?2:1)&&colIndex===colCount-1||(rowIndex===rowCount-(colIndex>=lastRowLength?2:1)?wrap&&(retVal=[0,colIndex+1]):retVal=[rowIndex+1,colIndex]),retVal},getCellLeft=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const colCount=matrix[0].length;return 0===rowIndex&&0===colIndex||(0===colIndex?wrap&&(retVal=[rowIndex-1,colCount-1]):retVal=[rowIndex,colIndex-1]),retVal},getCellRight=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const rowCount=matrix.length,colCount=matrix[0].length,lastRowIndex=rowCount-1,lastColIndex=matrix[lastRowIndex].length-1;return rowIndex===lastRowIndex&&colIndex===lastColIndex||(colIndex===colCount-1?wrap&&(retVal=[rowIndex+1,0]):retVal=[rowIndex,colIndex+1]),retVal},getCellUp=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const rowCount=matrix.length;if(!(0===rowIndex&&0===colIndex))if(0===rowIndex){if(wrap){const col=colIndex-1;retVal=[rowCount-(col>=matrix[rowCount-1].length?2:1),col]}}else retVal=[rowIndex-1,colIndex];return retVal},getId=(idPrefix,rowIndex,colIndex)=>`${idPrefix}--R${rowIndex+1}C${colIndex+1}`,GRID_KEYS=[KeyboardEventValues.t.LEFT,KeyboardEventValues.t.RIGHT,KeyboardEventValues.t.UP,KeyboardEventValues.t.DOWN,KeyboardEventValues.t.HOME,KeyboardEventValues.t.END];function useGrid(_ref){let{rtl,wrap,matrix,idPrefix,onChange=()=>{},environment,rowIndex:controlledRowIndex,colIndex:controlledColIndex,defaultRowIndex,defaultColIndex}=_ref;const doc=environment||document,prefix=(0,useId.M)(idPrefix),[uncontrolledRowIndex,setUncontrolledRowIndex]=(0,react.useState)(null!=defaultRowIndex?defaultRowIndex:0),[uncontrolledColIndex,setUncontrolledColIndex]=(0,react.useState)(null!=defaultColIndex?defaultColIndex:0),isControlled=null!==controlledRowIndex&&null!==controlledColIndex&&void 0!==controlledRowIndex&&void 0!==controlledColIndex,rowIndex=isControlled?controlledRowIndex:uncontrolledRowIndex,colIndex=isControlled?controlledColIndex:uncontrolledColIndex;(0,react.useEffect)((()=>{const rowCount=matrix.length,colCount=matrix[0].length,isRowIndexInvalid=rowIndex>=rowCount,isColIndexInvalid=colIndex>=colCount;if(isRowIndexInvalid||isColIndexInvalid){let _rowIndex=rowIndex,_colIndex=colIndex;isRowIndexInvalid&&(_rowIndex=rowCount>0?rowCount-1:0),isColIndexInvalid&&(_colIndex=colCount>0?colCount-1:0),isControlled||(setUncontrolledRowIndex(_rowIndex),setUncontrolledColIndex(_colIndex)),onChange(_rowIndex,_colIndex)}}),[matrix,rowIndex,colIndex,isControlled,setUncontrolledColIndex,onChange]);const getGridProps=(0,react.useCallback)((_ref2=>{let{role="grid",...other}=_ref2;return{"data-garden-container-id":"containers.grid","data-garden-container-version":"storybook",role:null===role?void 0:role,...other}}),[]),getGridCellProps=(0,react.useCallback)((function(_temp){let{role="gridcell",rowIndex:_rowIndex,colIndex:_colIndex,onFocus,onKeyDown,...other}=void 0===_temp?{rowIndex:0,colIndex:0}:_temp;return{"data-garden-container-id":"containers.grid.cell","data-garden-container-version":"storybook",id:getId(prefix,_rowIndex,_colIndex),role:null===role?void 0:role,tabIndex:rowIndex===_rowIndex&&colIndex===_colIndex?0:-1,onFocus:(0,composeEventHandlers.M)(onFocus,(()=>{isControlled||(setUncontrolledRowIndex(_rowIndex),setUncontrolledColIndex(_colIndex)),onChange(_rowIndex,_colIndex)})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{if(GRID_KEYS.includes(event.key)){event.preventDefault();let row=rowIndex,col=colIndex;switch(event.key){case KeyboardEventValues.t.RIGHT:[row,col]=rtl?getCellLeft(matrix,rowIndex,colIndex,wrap):getCellRight(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.LEFT:[row,col]=rtl?getCellRight(matrix,rowIndex,colIndex,wrap):getCellLeft(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.DOWN:[row,col]=getCellDown(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.UP:[row,col]=getCellUp(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.HOME:row=event.ctrlKey?0:rowIndex,col=0;break;case KeyboardEventValues.t.END:{const lastRowIndex=matrix.length-1,lastColIndex=matrix[lastRowIndex].length-1;row=event.ctrlKey?lastRowIndex:rowIndex,col=event.ctrlKey?lastColIndex:matrix[rowIndex].length-1;break}}if(row!==rowIndex||col!==colIndex){const id=getId(prefix,row,col),element=doc.getElementById(id);element?.focus()}}})),...other}}),[matrix,rowIndex,colIndex,doc,prefix,isControlled,onChange,rtl,wrap]);return(0,react.useMemo)((()=>({getGridProps,getGridCellProps})),[getGridProps,getGridCellProps])}},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);