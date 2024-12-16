"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[1273],{"./packages/tabs/demo/tabs.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Uncontrolled:()=>Uncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>tabs_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),useSelection=__webpack_require__("./packages/selection/src/useSelection.ts");const useTabs=_ref=>{let{tabs,orientation="horizontal",idPrefix,...options}=_ref;const prefix=(0,useId.B)(idPrefix),PANEL_ID=`${prefix}__panel`,TAB_ID=`${prefix}__tab`,values=(0,react.useMemo)((()=>tabs.reduce(((all,tab)=>(!tab.disabled&&all.push(tab.value),all)),[])),[tabs]),{selectedValue,focusedValue,getGroupProps,getElementProps}=(0,useSelection.C)({values,direction:orientation,defaultSelectedValue:values[0],...options}),getTabListProps=(0,react.useCallback)((function(_temp){let{role="tablist",...other}=void 0===_temp?{}:_temp;return{...getGroupProps(other),role:null===role?void 0:role,"aria-orientation":orientation,"data-garden-container-id":"containers.tabs","data-garden-container-version":"storybook"}}),[getGroupProps,orientation]),getTabProps=(0,react.useCallback)((_ref2=>{let{role="tab",value,...other}=_ref2;const isDisabled=-1===values.indexOf(value),{onClick,onKeyDown,onFocus,onBlur,...elementProps}=getElementProps({value,role:null===role?void 0:role,...other});return{...elementProps,onClick:isDisabled?void 0:onClick,onFocus:isDisabled?void 0:onFocus,onKeyDown:isDisabled?void 0:onKeyDown,onBlur:isDisabled?void 0:onBlur,id:`${TAB_ID}:${value}`,"aria-disabled":isDisabled||void 0,"aria-controls":`${PANEL_ID}:${value}`}}),[getElementProps,values,PANEL_ID,TAB_ID]),getTabPanelProps=(0,react.useCallback)((_ref3=>{let{role="tabpanel",value,...other}=_ref3;return{role:null===role?void 0:role,id:`${PANEL_ID}:${value}`,hidden:value!==selectedValue,"aria-labelledby":`${TAB_ID}:${value}`,...other}}),[selectedValue,PANEL_ID,TAB_ID]);return(0,react.useMemo)((()=>({selectedValue,focusedValue,getTabListProps,getTabProps,getTabPanelProps})),[selectedValue,focusedValue,getTabListProps,getTabProps,getTabPanelProps])},TabsContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render(useTabs(options)))};TabsContainer.defaultProps={orientation:"horizontal"},TabsContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,tabs:prop_types_default().arrayOf(prop_types_default().any).isRequired,rtl:prop_types_default().bool,orientation:prop_types_default().oneOf(["horizontal","vertical"]),idPrefix:prop_types_default().string,defaultSelectedValue:prop_types_default().any,selectedValue:prop_types_default().any,onSelect:prop_types_default().func},TabsContainer.__docgenInfo={description:"",methods:[],displayName:"TabsContainer",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"ITab",elements:[{name:"Value"}],raw:"ITab<Value>"}],raw:"ITab<Value>[]"},description:"Provides an ordered list of unique tab values\n\n@param {Value} tab.value Unique tab value\n@param {boolean} tab.disabled Indicates that the tab is not interactive",type:{name:"arrayOf",value:{name:"any"}}},orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"Determines the orientation of the tabs",defaultValue:{value:"'horizontal'",computed:!1},type:{name:"enum",value:[{value:"'horizontal'",computed:!1},{value:"'vertical'",computed:!1}]}},idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for tab elements",type:{name:"string"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  focusedValue?: IUseTabsReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseTabsReturnValue<Value>['selectedValue'];\n  getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'];\n  getTabProps: IUseTabsReturnValue<Value>['getTabProps'];\n  getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  focusedValue?: IUseTabsReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseTabsReturnValue<Value>['selectedValue'];\n  getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'];\n  getTabProps: IUseTabsReturnValue<Value>['getTabProps'];\n  getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'];\n}",signature:{properties:[{key:"focusedValue",value:{name:"IUseTabsReturnValue['focusedValue']",raw:"IUseTabsReturnValue<Value>['focusedValue']",required:!1}},{key:"selectedValue",value:{name:"IUseTabsReturnValue['selectedValue']",raw:"IUseTabsReturnValue<Value>['selectedValue']",required:!1}},{key:"getTabListProps",value:{name:"IUseTabsReturnValue['getTabListProps']",raw:"IUseTabsReturnValue<Value>['getTabListProps']",required:!0}},{key:"getTabProps",value:{name:"IUseTabsReturnValue['getTabProps']",raw:"IUseTabsReturnValue<Value>['getTabProps']",required:!0}},{key:"getTabPanelProps",value:{name:"IUseTabsReturnValue['getTabPanelProps']",raw:"IUseTabsReturnValue<Value>['getTabPanelProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides tabs render prop state and functions\n\n@param {*} [options.focusedValue] Controlled focused tab\n@param {*} [options.selectedValue] Controlled selected tab\n@param {function} [options.getTabListProps] Tab list props getter\n@param {function} [options.getTabProps] Tab props getter\n@param {function} [options.getTabPanelProps] Tab panel props getter",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseTabsReturnValue<Value>) => ReactNode",signature:{arguments:[{type:{name:"IUseTabsReturnValue",elements:[{name:"Value"}],raw:"IUseTabsReturnValue<Value>"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}},rtl:{description:"",type:{name:"bool"},required:!1},defaultSelectedValue:{description:"",type:{name:"any"},required:!1},selectedValue:{description:"",type:{name:"any"},required:!1},onSelect:{description:"",type:{name:"func"},required:!1}},composes:["Omit"]};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const TabItem=_ref=>{let{tab:{value,disabled},getTabProps,selectedValue,orientation,rtl}=_ref;return react.createElement("li",(0,esm_extends.A)({key:value,className:classnames_default()("border-3 border-solid border-transparent px-2 py-1",{"border-b-blue-600":selectedValue===value&&"vertical"!==orientation,"border-r-blue-600":selectedValue===value&&"vertical"===orientation&&!rtl,"border-l-blue-600":selectedValue===value&&"vertical"===orientation&&rtl,"cursor-pointer":!disabled,"opacity-50 cursor-default":disabled})},getTabProps({value})),value)},Component=_ref2=>{let{tabs,getTabListProps,getTabPanelProps,getTabProps,selectedValue,orientation,rtl}=_ref2;return react.createElement("div",{className:classnames_default()({flex:"vertical"===orientation,"flex-row-reverse":"vertical"===orientation&&rtl})},react.createElement("ul",(0,esm_extends.A)({},getTabListProps(),{className:classnames_default()("border-solid","border-transparent","flex",{"flex-col":"vertical"===orientation,"border-b-grey-600":"vertical"!==orientation,"flex-row-reverse":"vertical"!==orientation&&rtl,"border-r-grey-600":"vertical"===orientation&&!rtl,"border-l-grey-600":"vertical"===orientation&&rtl})}),tabs.map((tab=>react.createElement(TabItem,{key:tab.value,tab,getTabProps,selectedValue,orientation,rtl})))),tabs.map((tab=>react.createElement("div",(0,esm_extends.A)({key:tab.value},getTabPanelProps({value:tab.value}),{className:"p-2"}),tab.value))))},Container=props=>{const{rtl,orientation,tabs}=props;return react.createElement(TabsContainer,props,(containerProps=>react.createElement(Component,(0,esm_extends.A)({tabs,orientation,rtl},containerProps))))},Hook=props=>{const{tabs,orientation,rtl}=props,hookProps=useTabs(props);return react.createElement(Component,(0,esm_extends.A)({tabs,orientation,rtl},hookProps))},TabsStory=_ref3=>{let{as,...props}=_ref3;return"container"===as?react.createElement(Container,props):react.createElement(Hook,props)};TabsStory.__docgenInfo={description:"",methods:[],displayName:"TabsStory",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"ITab",elements:[{name:"string"}],raw:"ITab<Value>"}],raw:"ITab<Value>[]"},description:"Provides an ordered list of unique tab values\n\n@param {Value} tab.value Unique tab value\n@param {boolean} tab.disabled Indicates that the tab is not interactive"},orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"Determines the orientation of the tabs"},idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for tab elements"},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  focusedValue?: IUseTabsReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseTabsReturnValue<Value>['selectedValue'];\n  getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'];\n  getTabProps: IUseTabsReturnValue<Value>['getTabProps'];\n  getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  focusedValue?: IUseTabsReturnValue<Value>['focusedValue'];\n  selectedValue?: IUseTabsReturnValue<Value>['selectedValue'];\n  getTabListProps: IUseTabsReturnValue<Value>['getTabListProps'];\n  getTabProps: IUseTabsReturnValue<Value>['getTabProps'];\n  getTabPanelProps: IUseTabsReturnValue<Value>['getTabPanelProps'];\n}",signature:{properties:[{key:"focusedValue",value:{name:"IUseTabsReturnValue['focusedValue']",raw:"IUseTabsReturnValue<Value>['focusedValue']",required:!1}},{key:"selectedValue",value:{name:"IUseTabsReturnValue['selectedValue']",raw:"IUseTabsReturnValue<Value>['selectedValue']",required:!1}},{key:"getTabListProps",value:{name:"IUseTabsReturnValue['getTabListProps']",raw:"IUseTabsReturnValue<Value>['getTabListProps']",required:!0}},{key:"getTabProps",value:{name:"IUseTabsReturnValue['getTabProps']",raw:"IUseTabsReturnValue<Value>['getTabProps']",required:!0}},{key:"getTabPanelProps",value:{name:"IUseTabsReturnValue['getTabPanelProps']",raw:"IUseTabsReturnValue<Value>['getTabPanelProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides tabs render prop state and functions\n\n@param {*} [options.focusedValue] Controlled focused tab\n@param {*} [options.selectedValue] Controlled selected tab\n@param {function} [options.getTabListProps] Tab list props getter\n@param {function} [options.getTabProps] Tab props getter\n@param {function} [options.getTabPanelProps] Tab panel props getter"},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseTabsReturnValue<Value>) => ReactNode",signature:{arguments:[{type:{name:"IUseTabsReturnValue",elements:[{name:"string"}],raw:"IUseTabsReturnValue<Value>"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore"},as:{required:!0,tsType:{name:"union",raw:"'hook' | 'container'",elements:[{name:"literal",value:"'hook'"},{name:"literal",value:"'container'"}]},description:""}},composes:["Omit"]};const TABS=[{value:"tab-1"},{value:"tab-2"},{value:"tab-3"},{value:"tab-4"},{value:"tab-5"}],tabs_stories={title:"Packages/Tabs",component:TabsContainer,args:{as:"hook",orientation:"horizontal",tabs:TABS,defaultSelectedValue:TABS[0].value},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}},Uncontrolled={render:args=>react.createElement(TabsStory,args),name:"Uncontrolled",argTypes:{selectedValue:{control:!1}}},Controlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(TabsStory,(0,esm_extends.A)({},args,{onSelect:selectedValue=>updateArgs({selectedValue})}))},name:"Controlled",argTypes:{defaultSelectedValue:{control:!1}}},__namedExportsOrder=["Uncontrolled","Controlled"];Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:"{\n  render: args => <TabsStory {...args} />,\n  name: 'Uncontrolled',\n  argTypes: {\n    selectedValue: {\n      control: false\n    }\n  }\n}",...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <TabsStory {...args} onSelect={selectedValue => updateArgs({\n      selectedValue\n    })} />;\n  },\n  name: 'Controlled',\n  argTypes: {\n    defaultSelectedValue: {\n      control: false\n    }\n  }\n}",...Controlled.parameters?.docs?.source}}}},"./packages/selection/src/useSelection.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>useSelection});var react=__webpack_require__("./node_modules/react/index.js"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const stateReducer=(state,action)=>{switch(action.type){case"END":case"HOME":case"FOCUS":case"INCREMENT":case"DECREMENT":return{...state,focusedValue:action.payload};case"MOUSE_SELECT":return{...state,selectedValue:action.payload,focusedValue:void 0};case"KEYBOARD_SELECT":return{...state,selectedValue:action.payload};case"EXIT_WIDGET":return{...state,focusedValue:void 0};default:return state}},useSelection=_ref=>{let{values,direction="horizontal",defaultFocusedValue=values[0],defaultSelectedValue,rtl,selectedValue,focusedValue,allowDefaultOnSelect=!1,onSelect,onFocus}=_ref;const isSelectedValueControlled=void 0!==selectedValue,isFocusedValueControlled=void 0!==focusedValue,refs=(0,react.useMemo)((()=>values.reduce(((all,value)=>(all[value]=(0,react.createRef)(),all)),{})),[values]),[state,dispatch]=(0,react.useReducer)(stateReducer,{selectedValue,focusedValue}),controlledFocusedValue=(0,getControlledValue.o)(focusedValue,state.focusedValue),controlledSelectedValue=(0,getControlledValue.o)(selectedValue,state.selectedValue);(0,react.useEffect)((()=>{if(void 0!==controlledFocusedValue){const targetRef=refs[controlledFocusedValue];targetRef?.current&&targetRef.current.focus()}}),[controlledFocusedValue]),(0,react.useEffect)((()=>{void 0===selectedValue&&void 0!==defaultSelectedValue&&(onSelect&&onSelect(defaultSelectedValue),isSelectedValueControlled||dispatch({type:"KEYBOARD_SELECT",payload:defaultSelectedValue}))}),[]);const getGroupProps=(0,react.useCallback)((function(_temp){let{role="group",...other}=void 0===_temp?{}:_temp;return{role:null===role?void 0:role,"data-garden-container-id":"containers.selection","data-garden-container-version":"storybook",...other}}),[]);return{focusedValue:controlledFocusedValue,selectedValue:controlledSelectedValue,getElementProps:_ref2=>{let{selectedAriaKey="aria-selected",onFocus:onFocusCallback,onKeyDown,onClick,value,...other}=_ref2;const isSelected=controlledSelectedValue===value,verticalDirection="vertical"===direction||"both"===direction,horizontalDirection="horizontal"===direction||"both"===direction;return{tabIndex:(void 0===controlledFocusedValue?isSelected:controlledFocusedValue===value)||void 0===controlledSelectedValue&&void 0===controlledFocusedValue&&value===defaultFocusedValue?0:-1,[selectedAriaKey]:selectedAriaKey?isSelected:void 0,ref:refs[value],onFocus:(0,composeEventHandlers.m)(onFocusCallback,(()=>{onFocus&&onFocus(value),!isFocusedValueControlled&&dispatch({type:"FOCUS",payload:value})})),onClick:(0,composeEventHandlers.m)(onClick,(()=>{onSelect&&onSelect(value),onFocus&&onFocus(value),!isSelectedValueControlled&&dispatch({type:"MOUSE_SELECT",payload:value})})),onKeyDown:(0,composeEventHandlers.m)(onKeyDown,(event=>{let nextItem,currentItem;currentItem=isFocusedValueControlled?values.find((id=>focusedValue===id)):values.find((id=>state.focusedValue===id));const onIncrement=()=>{const nextItemIndex=values.indexOf(currentItem)+1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[0]),!isFocusedValueControlled&&dispatch({type:"INCREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)},onDecrement=()=>{const nextItemIndex=values.indexOf(currentItem)-1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[values.length-1]),!isFocusedValueControlled&&dispatch({type:"DECREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)};if(!(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey))if(event.key===KeyboardEventValues.R.UP&&verticalDirection||event.key===KeyboardEventValues.R.LEFT&&horizontalDirection)rtl&&horizontalDirection?onIncrement():onDecrement(),event.preventDefault();else if(event.key===KeyboardEventValues.R.DOWN&&verticalDirection||event.key===KeyboardEventValues.R.RIGHT&&horizontalDirection)rtl&&horizontalDirection?onDecrement():onIncrement(),event.preventDefault();else if(event.key===KeyboardEventValues.R.HOME){const firstItem=values[0];!isFocusedValueControlled&&dispatch({type:"HOME",payload:firstItem}),onFocus&&onFocus(firstItem),event.preventDefault()}else if(event.key===KeyboardEventValues.R.END){const lastItem=values[values.length-1];!isFocusedValueControlled&&dispatch({type:"END",payload:lastItem}),onFocus&&onFocus(lastItem),event.preventDefault()}else event.key!==KeyboardEventValues.R.SPACE&&event.key!==KeyboardEventValues.R.ENTER||(onSelect&&onSelect(value),!isSelectedValueControlled&&dispatch({type:"KEYBOARD_SELECT",payload:value}),!allowDefaultOnSelect&&event.preventDefault())})),onBlur:event=>{0===event.target.tabIndex&&(dispatch({type:"EXIT_WIDGET"}),onFocus&&onFocus())},...other}},getGroupProps}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{m:()=>composeEventHandlers})},"./packages/utilities/src/utils/getControlledValue.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function getControlledValue(){for(var _len=arguments.length,values=new Array(_len),_key=0;_key<_len;_key++)values[_key]=arguments[_key];for(const value of values)if(void 0!==value)return value}__webpack_require__.d(__webpack_exports__,{o:()=>getControlledValue})},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.B)(id)||"id:"+idCounter++}}]);