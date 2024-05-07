/*! For license information please see selection-demo-selection-stories.2e755612.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[5431],{"./packages/selection/demo/selection.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Uncontrolled:()=>Uncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>selection_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useSelection=__webpack_require__("./packages/selection/src/useSelection.ts");const SelectionContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render((0,useSelection.c)(options)))};SelectionContainer.defaultProps={direction:"horizontal"},SelectionContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,values:prop_types_default().arrayOf(prop_types_default().any).isRequired,rtl:prop_types_default().bool,direction:prop_types_default().oneOf(["horizontal","vertical","both"]),defaultFocusedValue:prop_types_default().string,defaultSelectedValue:prop_types_default().string,focusedValue:prop_types_default().any,selectedValue:prop_types_default().any,onSelect:prop_types_default().func,onFocus:prop_types_default().func},SelectionContainer.__docgenInfo={description:"",methods:[],displayName:"SelectionContainer",props:{values:{required:!0,tsType:{name:"Array",elements:[{name:"Value"}],raw:"Value[]"},description:"Provides an ordered list of unique selection values",type:{name:"arrayOf",value:{name:"any"}}},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical' | 'both'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"},{name:"literal",value:"'both'"}]},description:"Determines the orientation of the selection",defaultValue:{value:"'horizontal'",computed:!1},type:{name:"enum",value:[{value:"'horizontal'",computed:!1},{value:"'vertical'",computed:!1},{value:"'both'",computed:!1}]}},defaultFocusedValue:{required:!1,tsType:{name:"Value"},description:"Sets the initial focused value",type:{name:"string"}},defaultSelectedValue:{required:!1,tsType:{name:"Value"},description:"Sets the initial selected value",type:{name:"string"}},rtl:{required:!1,tsType:{name:"boolean"},description:"Determines right-to-left layout",type:{name:"bool"}},selectedValue:{required:!1,tsType:{name:"Value"},description:"Sets controlled value selection",type:{name:"any"}},focusedValue:{required:!1,tsType:{name:"Value"},description:"Sets controlled value focus",type:{name:"any"}},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(selectedValue: Value) => void",signature:{arguments:[{type:{name:"Value"},name:"selectedValue"}],return:{name:"void"}}},description:"Handles controlled value selection\n\n@param selectedValue The selected value",type:{name:"func"}},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(focusedValue?: Value) => void",signature:{arguments:[{type:{name:"Value"},name:"focusedValue"}],return:{name:"void"}}},description:"Handles controlled value focus\n\n@param focusedValue The focused value",type:{name:"func"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  focusedValue?: IUseSelectionReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseSelectionReturnValue<Value>['selectedValue'];\n  getGroupProps: IUseSelectionReturnValue<Value>['getGroupProps'];\n  getElementProps: IUseSelectionReturnValue<Value>['getElementProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  focusedValue?: IUseSelectionReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseSelectionReturnValue<Value>['selectedValue'];\n  getGroupProps: IUseSelectionReturnValue<Value>['getGroupProps'];\n  getElementProps: IUseSelectionReturnValue<Value>['getElementProps'];\n}",signature:{properties:[{key:"focusedValue",value:{name:"IUseSelectionReturnValue['focusedValue']",raw:"IUseSelectionReturnValue<Value>['focusedValue']",required:!1}},{key:"selectedValue",value:{name:"IUseSelectionReturnValue['selectedValue']",raw:"IUseSelectionReturnValue<Value>['selectedValue']",required:!1}},{key:"getGroupProps",value:{name:"IUseSelectionReturnValue['getGroupProps']",raw:"IUseSelectionReturnValue<Value>['getGroupProps']",required:!0}},{key:"getElementProps",value:{name:"IUseSelectionReturnValue['getElementProps']",raw:"IUseSelectionReturnValue<Value>['getElementProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides selection render prop state and functions\n\n@param {*} [options.focusedValue] Controlled focused value\n@param {*} [options.selectedValue] Controlled selected value\n@param {function} [options.getGroupProps] Container props getter\n@param {function} [options.getElementProps] Value props getter",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseSelectionReturnValue<Value>) => ReactNode",signature:{arguments:[{type:{name:"IUseSelectionReturnValue",elements:[{name:"Value"}],raw:"IUseSelectionReturnValue<Value>"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const SelectionElement=_ref=>{let{getElementProps,value,index,direction,selectedValue}=_ref;return react.createElement("li",(0,esm_extends.Z)({key:value,className:classnames_default()("flex","justify-center","items-center","border","border-solid","cursor-pointer","rounded","h-8","w-8","m-2",{["mt-"+4*index]:"both"===direction})},getElementProps({value})),value===selectedValue&&react.createElement("span",{className:"text-lg"},"✓"))},SelectionGroup=_ref2=>{let{direction,rtl,values,getGroupProps,getElementProps,selectedValue}=_ref2;return react.createElement("ul",(0,esm_extends.Z)({"aria-label":"selection",className:classnames_default()("flex",{"flex-col":"vertical"===direction,"flex-row-reverse":"vertical"!==direction&&rtl})},getGroupProps()),values.map(((value,index)=>react.createElement(SelectionElement,{key:value,value,index,direction,selectedValue,getElementProps}))))},Container=_ref3=>{let{...props}=_ref3;return react.createElement(SelectionContainer,props,(containerProps=>react.createElement(SelectionGroup,(0,esm_extends.Z)({values:props.values,direction:props.direction,rtl:props.rtl},containerProps))))},Hook=_ref4=>{let{...props}=_ref4;const hookProps=(0,useSelection.c)({...props});return react.createElement(SelectionGroup,(0,esm_extends.Z)({values:props.values,direction:props.direction,rtl:props.rtl},hookProps))},SelectionStory=_ref5=>{let{as,...props}=_ref5;return"container"===as?react.createElement(Container,props):react.createElement(Hook,props)};SelectionStory.__docgenInfo={description:"",methods:[],displayName:"SelectionStory",props:{values:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"Value[]"},description:"Provides an ordered list of unique selection values"},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical' | 'both'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"},{name:"literal",value:"'both'"}]},description:"Determines the orientation of the selection"},defaultFocusedValue:{required:!1,tsType:{name:"string"},description:"Sets the initial focused value"},defaultSelectedValue:{required:!1,tsType:{name:"string"},description:"Sets the initial selected value"},rtl:{required:!1,tsType:{name:"boolean"},description:"Determines right-to-left layout"},selectedValue:{required:!1,tsType:{name:"string"},description:"Sets controlled value selection"},focusedValue:{required:!1,tsType:{name:"string"},description:"Sets controlled value focus"},onSelect:{required:!1,tsType:{name:"signature",type:"function",raw:"(selectedValue: Value) => void",signature:{arguments:[{type:{name:"string"},name:"selectedValue"}],return:{name:"void"}}},description:"Handles controlled value selection\n\n@param selectedValue The selected value"},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"(focusedValue?: Value) => void",signature:{arguments:[{type:{name:"string"},name:"focusedValue"}],return:{name:"void"}}},description:"Handles controlled value focus\n\n@param focusedValue The focused value"},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  focusedValue?: IUseSelectionReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseSelectionReturnValue<Value>['selectedValue'];\n  getGroupProps: IUseSelectionReturnValue<Value>['getGroupProps'];\n  getElementProps: IUseSelectionReturnValue<Value>['getElementProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  focusedValue?: IUseSelectionReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseSelectionReturnValue<Value>['selectedValue'];\n  getGroupProps: IUseSelectionReturnValue<Value>['getGroupProps'];\n  getElementProps: IUseSelectionReturnValue<Value>['getElementProps'];\n}",signature:{properties:[{key:"focusedValue",value:{name:"IUseSelectionReturnValue['focusedValue']",raw:"IUseSelectionReturnValue<Value>['focusedValue']",required:!1}},{key:"selectedValue",value:{name:"IUseSelectionReturnValue['selectedValue']",raw:"IUseSelectionReturnValue<Value>['selectedValue']",required:!1}},{key:"getGroupProps",value:{name:"IUseSelectionReturnValue['getGroupProps']",raw:"IUseSelectionReturnValue<Value>['getGroupProps']",required:!0}},{key:"getElementProps",value:{name:"IUseSelectionReturnValue['getElementProps']",raw:"IUseSelectionReturnValue<Value>['getElementProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides selection render prop state and functions\n\n@param {*} [options.focusedValue] Controlled focused value\n@param {*} [options.selectedValue] Controlled selected value\n@param {function} [options.getGroupProps] Container props getter\n@param {function} [options.getElementProps] Value props getter"},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseSelectionReturnValue<Value>) => ReactNode",signature:{arguments:[{type:{name:"IUseSelectionReturnValue",elements:[{name:"string"}],raw:"IUseSelectionReturnValue<Value>"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore"},as:{required:!0,tsType:{name:"union",raw:"'hook' | 'container'",elements:[{name:"literal",value:"'hook'"},{name:"literal",value:"'container'"}]},description:""}}};const selection_stories={title:"Packages/Selection",component:SelectionContainer,args:{as:"hook",values:["item-1","item-2","item-3","item-4","item-5"],direction:"horizontal"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}},Uncontrolled={render:args=>react.createElement(SelectionStory,args),name:"Uncontrolled",args:{defaultFocusedValue:"item-1"},argTypes:{selectedValue:{control:!1},focusedValue:{control:!1},defaultFocusedValue:{control:{type:"text"}},defaultSelectedValue:{control:{type:"text"}}}},Controlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(SelectionStory,(0,esm_extends.Z)({},args,{onSelect:selectedValue=>updateArgs({selectedValue}),onFocus:focusedValue=>updateArgs({focusedValue})}))},name:"Controlled",args:{selectedValue:"item-3"},argTypes:{selectedValue:{control:{type:"text"}},focusedValue:{control:{type:"text"}},defaultFocusedValue:{control:!1},defaultSelectedValue:{control:!1}}};Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:"{\n  render: args => <SelectionStory {...args} />,\n  name: 'Uncontrolled',\n  args: {\n    defaultFocusedValue: 'item-1'\n  },\n  argTypes: {\n    selectedValue: {\n      control: false\n    },\n    focusedValue: {\n      control: false\n    },\n    defaultFocusedValue: {\n      control: {\n        type: 'text'\n      }\n    },\n    defaultSelectedValue: {\n      control: {\n        type: 'text'\n      }\n    }\n  }\n}",...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <SelectionStory {...args} onSelect={selectedValue => updateArgs({\n      selectedValue\n    })} onFocus={focusedValue => updateArgs({\n      focusedValue\n    })} />;\n  },\n  name: 'Controlled',\n  args: {\n    selectedValue: 'item-3'\n  },\n  argTypes: {\n    selectedValue: {\n      control: {\n        type: 'text'\n      }\n    },\n    focusedValue: {\n      control: {\n        type: 'text'\n      }\n    },\n    defaultFocusedValue: {\n      control: false\n    },\n    defaultSelectedValue: {\n      control: false\n    }\n  }\n}",...Controlled.parameters?.docs?.source}}};const __namedExportsOrder=["Uncontrolled","Controlled"]},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/react/dist/chunk-JXRZ2CQ5.mjs"),__webpack_require__("./node_modules/@storybook/react/dist/chunk-JSBTCGGE.mjs");var _storybook_global__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/global"),{window:globalWindow}=(__webpack_require__("@storybook/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react")},"./packages/selection/src/useSelection.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>useSelection});var react=__webpack_require__("./node_modules/react/index.js"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const stateReducer=(state,action)=>{switch(action.type){case"END":case"HOME":case"FOCUS":case"INCREMENT":case"DECREMENT":return{...state,focusedValue:action.payload};case"MOUSE_SELECT":return{...state,selectedValue:action.payload,focusedValue:void 0};case"KEYBOARD_SELECT":return{...state,selectedValue:action.payload};case"EXIT_WIDGET":return{...state,focusedValue:void 0};default:return state}},useSelection=_ref=>{let{values,direction="horizontal",defaultFocusedValue=values[0],defaultSelectedValue,rtl,selectedValue,focusedValue,onSelect,onFocus}=_ref;const isSelectedValueControlled=void 0!==selectedValue,isFocusedValueControlled=void 0!==focusedValue,refs=(0,react.useMemo)((()=>values.reduce(((all,value)=>(all[value]=(0,react.createRef)(),all)),{})),[values]),[state,dispatch]=(0,react.useReducer)(stateReducer,{selectedValue,focusedValue}),controlledFocusedValue=(0,getControlledValue.u)(focusedValue,state.focusedValue),controlledSelectedValue=(0,getControlledValue.u)(selectedValue,state.selectedValue);(0,react.useEffect)((()=>{if(void 0!==controlledFocusedValue){const targetRef=refs[controlledFocusedValue];targetRef?.current&&targetRef.current.focus()}}),[controlledFocusedValue]),(0,react.useEffect)((()=>{void 0===selectedValue&&void 0!==defaultSelectedValue&&(onSelect&&onSelect(defaultSelectedValue),isSelectedValueControlled||dispatch({type:"KEYBOARD_SELECT",payload:defaultSelectedValue}))}),[]);const getGroupProps=(0,react.useCallback)((function(_temp){let{role="group",...other}=void 0===_temp?{}:_temp;return{role:null===role?void 0:role,"data-garden-container-id":"containers.selection","data-garden-container-version":"storybook",...other}}),[]);return{focusedValue:controlledFocusedValue,selectedValue:controlledSelectedValue,getElementProps:_ref2=>{let{selectedAriaKey="aria-selected",onFocus:onFocusCallback,onKeyDown,onClick,value,...other}=_ref2;const isSelected=controlledSelectedValue===value,verticalDirection="vertical"===direction||"both"===direction,horizontalDirection="horizontal"===direction||"both"===direction;return{tabIndex:(void 0===controlledFocusedValue?isSelected:controlledFocusedValue===value)||void 0===controlledSelectedValue&&void 0===controlledFocusedValue&&value===defaultFocusedValue?0:-1,[selectedAriaKey]:selectedAriaKey?isSelected:void 0,ref:refs[value],onFocus:(0,composeEventHandlers.M)(onFocusCallback,(()=>{onFocus&&onFocus(value),!isFocusedValueControlled&&dispatch({type:"FOCUS",payload:value})})),onClick:(0,composeEventHandlers.M)(onClick,(()=>{onSelect&&onSelect(value),onFocus&&onFocus(value),!isSelectedValueControlled&&dispatch({type:"MOUSE_SELECT",payload:value})})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{let nextItem,currentItem;currentItem=isFocusedValueControlled?values.find((id=>focusedValue===id)):values.find((id=>state.focusedValue===id));const onIncrement=()=>{const nextItemIndex=values.indexOf(currentItem)+1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[0]),!isFocusedValueControlled&&dispatch({type:"INCREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)},onDecrement=()=>{const nextItemIndex=values.indexOf(currentItem)-1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[values.length-1]),!isFocusedValueControlled&&dispatch({type:"DECREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)};if(!(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey))if(event.key===KeyboardEventValues.t.UP&&verticalDirection||event.key===KeyboardEventValues.t.LEFT&&horizontalDirection)rtl&&horizontalDirection?onIncrement():onDecrement(),event.preventDefault();else if(event.key===KeyboardEventValues.t.DOWN&&verticalDirection||event.key===KeyboardEventValues.t.RIGHT&&horizontalDirection)rtl&&horizontalDirection?onDecrement():onIncrement(),event.preventDefault();else if(event.key===KeyboardEventValues.t.HOME){const firstItem=values[0];!isFocusedValueControlled&&dispatch({type:"HOME",payload:firstItem}),onFocus&&onFocus(firstItem),event.preventDefault()}else if(event.key===KeyboardEventValues.t.END){const lastItem=values[values.length-1];!isFocusedValueControlled&&dispatch({type:"END",payload:lastItem}),onFocus&&onFocus(lastItem),event.preventDefault()}else event.key!==KeyboardEventValues.t.SPACE&&event.key!==KeyboardEventValues.t.ENTER||(onSelect&&onSelect(value),!isSelectedValueControlled&&dispatch({type:"KEYBOARD_SELECT",payload:value}),event.preventDefault())})),onBlur:event=>{0===event.target.tabIndex&&(dispatch({type:"EXIT_WIDGET"}),onFocus&&onFocus())},...other}},getGroupProps}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}}]);