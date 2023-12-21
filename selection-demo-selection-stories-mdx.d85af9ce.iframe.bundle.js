/*! For license information please see selection-demo-selection-stories-mdx.d85af9ce.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[863],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-HLWAVYOI.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/selection/demo/selection.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,controlled:()=>controlled,default:()=>selection_stories,uncontrolled:()=>uncontrolled});__webpack_require__("./node_modules/react/index.js");var lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),external_STORYBOOK_MODULE_CLIENT_API_=__webpack_require__("@storybook/client-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useSelection=__webpack_require__("./packages/selection/src/useSelection.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const SelectionContainer=_ref=>{let{children,render=children,...options}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render((0,useSelection.c)(options))})};SelectionContainer.defaultProps={direction:"horizontal"},SelectionContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,values:prop_types_default().arrayOf(prop_types_default().any).isRequired,rtl:prop_types_default().bool,direction:prop_types_default().oneOf(["horizontal","vertical","both"]),defaultFocusedValue:prop_types_default().string,defaultSelectedValue:prop_types_default().string,focusedValue:prop_types_default().any,selectedValue:prop_types_default().any,onSelect:prop_types_default().func,onFocus:prop_types_default().func};try{SelectionContainer.displayName="SelectionContainer",SelectionContainer.__docgenInfo={description:"",displayName:"SelectionContainer",props:{render:{defaultValue:null,description:"Provides selection render prop state and functions\n@param options.focusedValue Controlled focused value\n@param options.selectedValue Controlled selected value\n@param options.getGroupProps Container props getter\n@param options.getElementProps Value props getter",name:"render",required:!1,type:{name:'((options: { focusedValue?: any; selectedValue?: any; getGroupProps: <T extends Element>(props?: (Omit<HTMLProps<T>, "role"> & { role?: "group" | null; })) => HTMLProps<...>; getElementProps: <T extends Element>(props: HTMLProps<...> & { ...; }) => HTMLProps<...>; }) => ReactNode) | undefined'}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"((options: IUseSelectionReturnValue<any>) => ReactNode)"}},values:{defaultValue:null,description:"Provides an ordered list of unique selection values",name:"values",required:!0,type:{name:"any[]"}},direction:{defaultValue:{value:"horizontal"},description:"Determines the orientation of the selection",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'},{value:'"both"'}]}},defaultFocusedValue:{defaultValue:null,description:"Sets the initial focused value",name:"defaultFocusedValue",required:!1,type:{name:"any"}},defaultSelectedValue:{defaultValue:null,description:"Sets the initial selected value",name:"defaultSelectedValue",required:!1,type:{name:"any"}},rtl:{defaultValue:null,description:"Determines right-to-left layout",name:"rtl",required:!1,type:{name:"boolean"}},selectedValue:{defaultValue:null,description:"Sets controlled value selection",name:"selectedValue",required:!1,type:{name:"any"}},focusedValue:{defaultValue:null,description:"Sets controlled value focus",name:"focusedValue",required:!1,type:{name:"any"}},onSelect:{defaultValue:null,description:"Handles controlled value selection\n@param selectedValue The selected value",name:"onSelect",required:!1,type:{name:"((selectedValue: any) => void)"}},onFocus:{defaultValue:null,description:"Handles controlled value focus\n@param focusedValue The focused value",name:"onFocus",required:!1,type:{name:"((focusedValue?: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/selection/src/SelectionContainer.tsx#SelectionContainer"]={docgenInfo:SelectionContainer.__docgenInfo,name:"SelectionContainer",path:"packages/selection/src/SelectionContainer.tsx#SelectionContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const SelectionElement=_ref=>{let{getElementProps,value,index,direction,selectedValue}=_ref;return(0,jsx_runtime.jsx)("li",{className:classnames_default()("flex","justify-center","items-center","border","border-solid","cursor-pointer","rounded","h-8","w-8","m-2",{["mt-"+4*index]:"both"===direction}),...getElementProps({value}),children:value===selectedValue&&(0,jsx_runtime.jsx)("span",{className:"text-lg",children:"✓"})},value)};SelectionElement.displayName="SelectionElement";const SelectionGroup=_ref2=>{let{direction,rtl,values,getGroupProps,getElementProps,selectedValue}=_ref2;return(0,jsx_runtime.jsx)("ul",{"aria-label":"selection",className:classnames_default()("flex",{"flex-col":"vertical"===direction,"flex-row-reverse":"vertical"!==direction&&rtl}),...getGroupProps(),children:values.map(((value,index)=>(0,jsx_runtime.jsx)(SelectionElement,{value,index,direction,selectedValue,getElementProps},value)))})};SelectionGroup.displayName="SelectionGroup";const Container=_ref3=>{let{...props}=_ref3;return(0,jsx_runtime.jsx)(SelectionContainer,{...props,children:containerProps=>(0,jsx_runtime.jsx)(SelectionGroup,{values:props.values,direction:props.direction,rtl:props.rtl,...containerProps})})};Container.displayName="Container";const Hook=_ref4=>{let{...props}=_ref4;const hookProps=(0,useSelection.c)({...props});return(0,jsx_runtime.jsx)(SelectionGroup,{values:props.values,direction:props.direction,rtl:props.rtl,...hookProps})};Hook.displayName="Hook";const SelectionStory=_ref5=>{let{as,...props}=_ref5;return"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props})},VALUES=["item-1","item-2","item-3","item-4","item-5"],README_namespaceObject="# @zendeskgarden/container-selection [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-selection\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-selection\n\nThis package includes containers relating to selection in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-selection\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live\nexamples.\n\n### useSelection\n\nThe `useSelection` hook which manages an items focus state including keyboard controls,\naria attributes and RTL support. It uses the\n[roving tab index strategy](https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex).\n\n```jsx\nimport { useSelection } from '@zendeskgarden/container-selection';\n\nconst values = ['Value 1', 'Value 2', 'Value 3'];\n\nconst Selection = ({ direction }) => {\n  const { focusedValue, selectedValue, getGroupProps, getElementProps } = useSelection({\n    values,\n    direction\n  });\n\n  return (\n    <ul {...getGroupProps()}>\n      {values.map(value => {\n        const isSelected = selectedValue === value;\n        const isFocused = focusedValue === value;\n\n        return (\n          <li {...getElementProps({ key: value, value })}>\n            {value}\n            {isSelected && <div>[Selected]</div>}\n            {isFocused && <div>(Focused)</div>}\n          </li>\n        );\n      })}\n    </ul>\n  );\n};\n```\n\n### SelectionContainer\n\n```jsx\nimport { SelectionContainer } from '@zendeskgarden/container-selection';\n\nconst values = ['Value 1', 'Value 2', 'Value 3'];\n\n<SelectionContainer direction=\"vertical\" values={values}>\n  {({ selectedValue, focusedValue, getGroupProps, getElementProps }) => (\n    <ul {...getGroupProps()}>\n      {values.map(value => {\n        const isSelected = value === selectedValue;\n        const isFocused = value === focusedValue;\n\n        return (\n          <li {...getElementProps({ key: value, value })}>\n            {item}\n            {isSelected && <span> - Selected</span>}\n            {isFocused && <span> - Focused</span>}\n          </li>\n        );\n      })}\n    </ul>\n  )}\n</SelectionContainer>;\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Selection",component:SelectionContainer,args:{as:"hook",values:VALUES,direction:"horizontal"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Uncontrolled",args:{defaultFocusedValue:"item-1"},argTypes:{selectedValue:{control:!1},focusedValue:{control:!1},defaultFocusedValue:{control:{type:"text"}},defaultSelectedValue:{control:{type:"text"}}},children:args=>(0,jsx_runtime.jsx)(SelectionStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Controlled",args:{selectedValue:"item-3"},argTypes:{selectedValue:{control:{type:"text"}},focusedValue:{control:{type:"text"}},defaultFocusedValue:{control:!1},defaultSelectedValue:{control:!1}},children:args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(SelectionStory,{...args,onSelect:selectedValue=>updateArgs({selectedValue}),onFocus:focusedValue=>updateArgs({focusedValue})})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const uncontrolled=args=>(0,jsx_runtime.jsx)(SelectionStory,{...args});uncontrolled.storyName="Uncontrolled",uncontrolled.argTypes={selectedValue:{control:!1},focusedValue:{control:!1},defaultFocusedValue:{control:{type:"text"}},defaultSelectedValue:{control:{type:"text"}}},uncontrolled.args={defaultFocusedValue:"item-1"},uncontrolled.parameters={storySource:{source:"args => <SelectionStory {...args} />"}};const controlled=args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(SelectionStory,{...args,onSelect:selectedValue=>updateArgs({selectedValue}),onFocus:focusedValue=>updateArgs({focusedValue})})};controlled.storyName="Controlled",controlled.argTypes={selectedValue:{control:{type:"text"}},focusedValue:{control:{type:"text"}},defaultFocusedValue:{control:!1},defaultSelectedValue:{control:!1}},controlled.args={selectedValue:"item-3"},controlled.parameters={storySource:{source:"args => {\n  const updateArgs = useArgs()[1];\n  const handleSelect = selectedValue => updateArgs({\n    selectedValue\n  });\n  const handleFocus = focusedValue => updateArgs({\n    focusedValue\n  });\n  return <SelectionStory {...args} onSelect={handleSelect} onFocus={handleFocus} />;\n}"}};const componentMeta={title:"Packages/Selection",component:SelectionContainer,args:{as:"hook",values:VALUES,direction:"horizontal"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},tags:["stories-mdx"],includeStories:["uncontrolled","controlled"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const selection_stories=componentMeta,__namedExportsOrder=["uncontrolled","controlled"]},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/global"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/selection/src/useSelection.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>useSelection});var react=__webpack_require__("./node_modules/react/index.js"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const stateReducer=(state,action)=>{switch(action.type){case"END":case"HOME":case"FOCUS":case"INCREMENT":case"DECREMENT":return{...state,focusedValue:action.payload};case"MOUSE_SELECT":return{...state,selectedValue:action.payload,focusedValue:void 0};case"KEYBOARD_SELECT":return{...state,selectedValue:action.payload};case"EXIT_WIDGET":return{...state,focusedValue:void 0};default:return state}},useSelection=_ref=>{let{values,direction="horizontal",defaultFocusedValue=values[0],defaultSelectedValue,rtl,selectedValue,focusedValue,onSelect,onFocus}=_ref;const isSelectedValueControlled=void 0!==selectedValue,isFocusedValueControlled=void 0!==focusedValue,refs=(0,react.useMemo)((()=>values.reduce(((all,value)=>(all[value]=(0,react.createRef)(),all)),{})),[values]),[state,dispatch]=(0,react.useReducer)(stateReducer,{selectedValue,focusedValue}),controlledFocusedValue=(0,getControlledValue.u)(focusedValue,state.focusedValue),controlledSelectedValue=(0,getControlledValue.u)(selectedValue,state.selectedValue);(0,react.useEffect)((()=>{if(void 0!==controlledFocusedValue){const targetRef=refs[controlledFocusedValue];targetRef?.current&&targetRef.current.focus()}}),[controlledFocusedValue]),(0,react.useEffect)((()=>{void 0===selectedValue&&void 0!==defaultSelectedValue&&(onSelect&&onSelect(defaultSelectedValue),isSelectedValueControlled||dispatch({type:"KEYBOARD_SELECT",payload:defaultSelectedValue}))}),[]);const getGroupProps=(0,react.useCallback)((function(_temp){let{role="group",...other}=void 0===_temp?{}:_temp;return{role:null===role?void 0:role,"data-garden-container-id":"containers.selection","data-garden-container-version":"storybook",...other}}),[]);return{focusedValue:controlledFocusedValue,selectedValue:controlledSelectedValue,getElementProps:_ref2=>{let{selectedAriaKey="aria-selected",onFocus:onFocusCallback,onKeyDown,onClick,value,...other}=_ref2;const isSelected=controlledSelectedValue===value,verticalDirection="vertical"===direction||"both"===direction,horizontalDirection="horizontal"===direction||"both"===direction;return{tabIndex:(void 0===controlledFocusedValue?isSelected:controlledFocusedValue===value)||void 0===controlledSelectedValue&&void 0===controlledFocusedValue&&value===defaultFocusedValue?0:-1,[selectedAriaKey]:selectedAriaKey?isSelected:void 0,ref:refs[value],onFocus:(0,composeEventHandlers.M)(onFocusCallback,(()=>{onFocus&&onFocus(value),!isFocusedValueControlled&&dispatch({type:"FOCUS",payload:value})})),onClick:(0,composeEventHandlers.M)(onClick,(()=>{onSelect&&onSelect(value),onFocus&&onFocus(value),!isSelectedValueControlled&&dispatch({type:"MOUSE_SELECT",payload:value})})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{let nextItem,currentItem;currentItem=isFocusedValueControlled?values.find((id=>focusedValue===id)):values.find((id=>state.focusedValue===id));const onIncrement=()=>{const nextItemIndex=values.indexOf(currentItem)+1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[0]),!isFocusedValueControlled&&dispatch({type:"INCREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)},onDecrement=()=>{const nextItemIndex=values.indexOf(currentItem)-1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[values.length-1]),!isFocusedValueControlled&&dispatch({type:"DECREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)};if(!(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey))if(event.key===KeyboardEventValues.t.UP&&verticalDirection||event.key===KeyboardEventValues.t.LEFT&&horizontalDirection)rtl&&horizontalDirection?onIncrement():onDecrement(),event.preventDefault();else if(event.key===KeyboardEventValues.t.DOWN&&verticalDirection||event.key===KeyboardEventValues.t.RIGHT&&horizontalDirection)rtl&&horizontalDirection?onDecrement():onIncrement(),event.preventDefault();else if(event.key===KeyboardEventValues.t.HOME){const firstItem=values[0];!isFocusedValueControlled&&dispatch({type:"HOME",payload:firstItem}),onFocus&&onFocus(firstItem),event.preventDefault()}else if(event.key===KeyboardEventValues.t.END){const lastItem=values[values.length-1];!isFocusedValueControlled&&dispatch({type:"END",payload:lastItem}),onFocus&&onFocus(lastItem),event.preventDefault()}else event.key!==KeyboardEventValues.t.SPACE&&event.key!==KeyboardEventValues.t.ENTER||(onSelect&&onSelect(value),!isSelectedValueControlled&&dispatch({type:"KEYBOARD_SELECT",payload:value}),event.preventDefault())})),onBlur:event=>{0===event.target.tabIndex&&(dispatch({type:"EXIT_WIDGET"}),onFocus&&onFocus())},...other}},getGroupProps}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);