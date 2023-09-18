/*! For license information please see 8.59f1d92c.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[8],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/menu/src/useMenu.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{H:()=>useMenu});var react=__webpack_require__("./node_modules/react/index.js"),useSelection=__webpack_require__("./packages/selection/src/useSelection.ts"),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const StateChangeTypes={FnSetStateRefs:"fn:setStateRefs",FnMenuTransitionFinish:"fn:menuTransitionFinish",TriggerClick:"trigger:click",TriggerKeyDownEnter:`trigger:keyDown:${KeyboardEventValues.t.ENTER}`,TriggerKeyDownSpace:"trigger:keyDown:Space",TriggerKeyDownArrowDown:`trigger:keyDown:${KeyboardEventValues.t.DOWN}`,TriggerKeyDownArrowUp:`trigger:keyDown:${KeyboardEventValues.t.UP}`,MenuKeyDownEscape:`menu:keyDown:${KeyboardEventValues.t.ESCAPE}`,MenuKeyDownTab:`menu:keyDown:${KeyboardEventValues.t.TAB}`,MenuBlur:"menu:blur",MenuMouseLeave:"menu:mouseLeave",MenuItemClick:"menuItem:click",MenuItemClickPrevious:"menuItem:click:previous",MenuItemClickNext:"menuItem:click:next",MenuItemMouseMove:"menuItem:mouseMove",MenuItemKeyDown:"menuItem:keyDown",MenuItemKeyDownPrevious:"menuItem:keyDown:previous",MenuItemKeyDownNext:"menuItem:keyDown:next",MenuItemKeyDownEnter:`menuItem:keyDown:${KeyboardEventValues.t.ENTER}`,MenuItemKeyDownSpace:"menuItem:keyDown:Space",MenuItemKeyDownArrowUp:`menuItem:keyDown:${KeyboardEventValues.t.UP}`,MenuItemKeyDownArrowDown:`menuItem:keyDown:${KeyboardEventValues.t.DOWN}`,MenuItemKeyDownHome:`menuItem:keyDown:${KeyboardEventValues.t.HOME}`,MenuItemKeyDownEnd:`menuItem:keyDown:${KeyboardEventValues.t.END}`},isItemGroup=item=>Object.hasOwn(item,"items"),isValidItem=item=>!item.disabled&&!item.separator&&!isItemGroup(item),toMenuItemKeyDownType=type=>`MenuItemKeyDown${type===KeyboardEventValues.t.SPACE?"Space":type}`,getStateChanges=changes=>{let retVal=null;for(const change in changes)void 0!==changes[change]&&(retVal||={},retVal[change]=changes[change]);return retVal},stateReducer=(state,action)=>{let changes=null;switch(state.focusOnOpen&&(changes={...state,focusOnOpen:!1}),action.type){case StateChangeTypes.MenuBlur:case StateChangeTypes.MenuKeyDownEscape:case StateChangeTypes.MenuKeyDownTab:case StateChangeTypes.TriggerClick:case StateChangeTypes.TriggerKeyDownEnter:case StateChangeTypes.TriggerKeyDownSpace:case StateChangeTypes.TriggerKeyDownArrowDown:case StateChangeTypes.TriggerKeyDownArrowUp:{const{focusOnOpen,focusedValue,isExpanded}=action.payload,stateChanges=getStateChanges({focusOnOpen,focusedValue,isExpanded});stateChanges&&(changes={...changes||state,...stateChanges});break}case StateChangeTypes.MenuItemClick:case StateChangeTypes.MenuItemClickNext:case StateChangeTypes.MenuItemClickPrevious:case StateChangeTypes.MenuItemKeyDownSpace:case StateChangeTypes.MenuItemKeyDownEnter:{const{selectedItems,isExpanded,nestedPathIds,transitionType,isTransitionNext,isTransitionPrevious}=action.payload,stateChanges=getStateChanges({selectedItems,isExpanded,nestedPathIds,transitionType,isTransitionNext,isTransitionPrevious});stateChanges&&(changes={...changes||state,...stateChanges});break}case StateChangeTypes.MenuItemKeyDownArrowUp:case StateChangeTypes.MenuItemKeyDownArrowDown:case StateChangeTypes.MenuItemKeyDownNext:case StateChangeTypes.MenuItemKeyDownPrevious:case StateChangeTypes.MenuItemKeyDownHome:case StateChangeTypes.MenuItemKeyDownEnd:case StateChangeTypes.MenuItemKeyDown:case StateChangeTypes.MenuItemMouseMove:{const{focusedValue,nestedPathIds,transitionType,isTransitionNext,isTransitionPrevious}=action.payload,stateChanges=getStateChanges({focusedValue,nestedPathIds,transitionType,isTransitionNext,isTransitionPrevious});stateChanges&&(changes={...changes||state,...stateChanges});break}case StateChangeTypes.FnMenuTransitionFinish:{const{focusOnOpen,focusedValue,nestedPathIds,valuesRef}=action.payload,stateChanges=getStateChanges({focusOnOpen,focusedValue,nestedPathIds,valuesRef});stateChanges&&(changes={...changes||state,...stateChanges,transitionType:null,isTransitionNext:!1,isTransitionPrevious:!1});break}case StateChangeTypes.FnSetStateRefs:{const{...props}=action.payload;changes={...changes||state,...props};break}default:throw new Error("Error: unexpected menu action provided: ",action.type)}return changes||state},useMenu=_ref=>{let{items:rawItems,idPrefix,environment,menuRef,triggerRef,rtl=!1,onChange=()=>{},isExpanded,defaultExpanded=!1,selectedItems,focusedValue,defaultFocusedValue}=_ref;const triggerId=`${`${(0,useId.M)(idPrefix)}-`}menu-trigger`,isExpandedControlled=void 0!==isExpanded,isSelectedItemsControlled=void 0!==selectedItems,isFocusedValueControlled=void 0!==focusedValue,menuItems=(0,react.useMemo)((()=>rawItems.reduce(((items,item)=>(isItemGroup(item)?items.push(...item.items.filter(isValidItem)):isValidItem(item)&&items.push(item),items)),[])),[rawItems]),initialSelectedItems=(0,react.useMemo)((()=>menuItems.filter((item=>!!(item.type&&["radio","checkbox"].includes(item.type)&&item.selected)))),[menuItems]),values=(0,react.useMemo)((()=>menuItems.map((item=>item.value))),[menuItems]),itemRefs=(0,react.useMemo)((()=>values.reduce(((acc,v)=>(acc[v]=(0,react.createRef)(),acc)),{})),[values]),[menuVisible,setMenuVisible]=(0,react.useState)(!1),[state,dispatch]=(0,react.useReducer)(stateReducer,{focusedValue:focusedValue||defaultFocusedValue,isExpanded:isExpanded||defaultExpanded,selectedItems:initialSelectedItems,valuesRef:values,focusOnOpen:!1,isTransitionNext:!1,isTransitionPrevious:!1,transitionType:null,nestedPathIds:[]}),controlledIsExpanded=(0,getControlledValue.u)(isExpanded,state.isExpanded),controlledSelectedItems=(0,getControlledValue.u)(selectedItems,state.selectedItems),uncontrolledFocusedValue=null===state.focusedValue?void 0:state.focusedValue,{focusedValue:controlledFocusedValue,getGroupProps,getElementProps}=(0,useSelection.c)({values,direction:"vertical",selectedValue:focusedValue||uncontrolledFocusedValue,focusedValue:focusedValue||uncontrolledFocusedValue}),closeMenu=(0,react.useCallback)((changeType=>{dispatch({type:changeType,payload:{...!isExpandedControlled&&{isExpanded:!1}}}),onChange({type:changeType,isExpanded:!1})}),[onChange,isExpandedControlled]),isItemSelected=(0,react.useCallback)(((value,type,name)=>{let isSelected;if("checkbox"===type)isSelected=!!controlledSelectedItems.find((item=>item.value===value));else if("radio"===type){const match=controlledSelectedItems.filter((item=>item.name===name))[0];isSelected=match?.value===value}return isSelected}),[controlledSelectedItems]),getNextFocusedValue=(0,react.useCallback)((_ref2=>{let{value,key,isAlphanumericChar}=_ref2,nextFocusedValue=value;if(isAlphanumericChar){const firstChars=menuItems.map((item=>item.label?item.label[0].toLowerCase():String(item.value)[0].toLowerCase())),index=firstChars.indexOf(key),item=menuItems[index];item&&(nextFocusedValue=item.value)}else{const index=values.indexOf(value);let nextIndex;key===KeyboardEventValues.t.UP?nextIndex=(0===index?values.length:index)-1:key===KeyboardEventValues.t.DOWN?nextIndex=(index===values.length-1?-1:index)+1:key===KeyboardEventValues.t.END?nextIndex=values.length-1:key===KeyboardEventValues.t.HOME&&(nextIndex=0);nextFocusedValue=menuItems[nextIndex].value}return nextFocusedValue}),[menuItems,values]),getSelectedItems=(0,react.useCallback)((_ref3=>{let{value,type,name,label,selected}=_ref3,changes=[...controlledSelectedItems];if(!type)return null;const selectedItem={value,type,label,...name&&{name}};if("checkbox"===type)selected?changes=changes.filter((item=>item.value!==value)):changes.push(selectedItem);else if("radio"===type){const index=changes.findIndex((item=>item.name===name));index>-1?changes.splice(index,1,selectedItem):changes.push(selectedItem)}return changes}),[controlledSelectedItems]),handleTriggerClick=(0,react.useCallback)((event=>{event.stopPropagation();const changeType=StateChangeTypes.TriggerClick;dispatch({type:changeType,payload:{...!isFocusedValueControlled&&{focusedValue:null},...!isExpandedControlled&&{isExpanded:!controlledIsExpanded}}}),onChange({type:changeType,focusedValue:null,isExpanded:!controlledIsExpanded})}),[controlledIsExpanded,isFocusedValueControlled,isExpandedControlled,onChange]),handleTriggerKeyDown=(0,react.useCallback)((event=>{const{key}=event,isArrowKey=[KeyboardEventValues.t.DOWN,KeyboardEventValues.t.UP].includes(key),isSelectKey=[KeyboardEventValues.t.ENTER,KeyboardEventValues.t.SPACE].includes(key);let changeType,nextFocusedValue;isArrowKey?(changeType=StateChangeTypes[`TriggerKeyDown${key}`],nextFocusedValue=KeyboardEventValues.t.UP===key?values[values.length-1]:values[0]):isSelectKey&&(changeType=StateChangeTypes[`TriggerKeyDown${key===KeyboardEventValues.t.SPACE?"Space":key}`],nextFocusedValue=values[0]),changeType&&(event.preventDefault(),dispatch({type:changeType,payload:{focusOnOpen:!0,...!isFocusedValueControlled&&{focusedValue:defaultFocusedValue||nextFocusedValue},...!isExpandedControlled&&{isExpanded:!0}}}),onChange({type:changeType,focusedValue:defaultFocusedValue||nextFocusedValue,isExpanded:!0}))}),[isExpandedControlled,isFocusedValueControlled,defaultFocusedValue,onChange,values]),handleMenuKeyDown=(0,react.useCallback)((event=>{const{key}=event;if([KeyboardEventValues.t.ESCAPE,KeyboardEventValues.t.TAB].includes(key)){event.preventDefault(),event.stopPropagation();const type=StateChangeTypes[key===KeyboardEventValues.t.ESCAPE?"MenuKeyDownEscape":"MenuKeyDownTab"];closeMenu(type),triggerRef?.current&&KeyboardEventValues.t.ESCAPE===key&&triggerRef.current.focus()}}),[closeMenu,triggerRef]),handleMenuBlur=(0,react.useCallback)((event=>{const path=event.composedPath();path.includes(menuRef.current)||path.includes(triggerRef.current)||closeMenu(StateChangeTypes.MenuBlur)}),[closeMenu,menuRef,triggerRef]),handleMenuMouseLeave=(0,react.useCallback)((()=>{onChange({type:StateChangeTypes.MenuMouseLeave})}),[onChange]),handleItemClick=(0,react.useCallback)((item=>{let changeType=StateChangeTypes.MenuItemClick;const{isNext,isPrevious}=item,isTransitionItem=isNext||isPrevious;isNext?changeType=StateChangeTypes.MenuItemClickNext:isPrevious&&(changeType=StateChangeTypes.MenuItemClickPrevious);const nextSelection=getSelectedItems(item);dispatch({type:changeType,payload:{...isTransitionItem&&{...isNext&&{nestedPathIds:[...state.nestedPathIds,item.value]},transitionType:changeType,isTransitionNext:isNext,isTransitionPrevious:isPrevious},...!isExpandedControlled&&!isTransitionItem&&{isExpanded:!1},...!isTransitionItem&&{nestedPathIds:[]},...!isSelectedItemsControlled&&nextSelection&&{selectedItems:nextSelection}}}),onChange({type:changeType,...!isTransitionItem&&{isExpanded:!1},...nextSelection&&{selectedItems:nextSelection}})}),[state.nestedPathIds,isExpandedControlled,isSelectedItemsControlled,getSelectedItems,onChange]),handleItemKeyDown=(0,react.useCallback)(((event,item)=>{const{key}=event,{isNext,isPrevious}=item,isJumpKey=[KeyboardEventValues.t.HOME,KeyboardEventValues.t.END].includes(key),isSelectKey=[KeyboardEventValues.t.SPACE,KeyboardEventValues.t.ENTER].includes(key),isVerticalArrowKeys=[KeyboardEventValues.t.UP,KeyboardEventValues.t.DOWN].includes(key),isAlphanumericChar=1===key.length&&/\S/u.test(key),isTransitionItem=isNext||isPrevious;let changeType,payload={},changes={};if(isSelectKey){changeType=StateChangeTypes[toMenuItemKeyDownType(key)];const nextSelection=getSelectedItems(item);isNext?changeType=StateChangeTypes.MenuItemKeyDownNext:isPrevious&&(changeType=StateChangeTypes.MenuItemKeyDownPrevious),payload={...!isExpandedControlled&&!isTransitionItem&&{isExpanded:!1},...!isTransitionItem&&{nestedPathIds:[]},...!isSelectedItemsControlled&&nextSelection&&{selectedItems:nextSelection}},changes={...!isTransitionItem&&{isExpanded:!1},...nextSelection&&{selectedItems:nextSelection}},triggerRef?.current&&!isTransitionItem&&triggerRef.current.focus()}else if(key===KeyboardEventValues.t.RIGHT)rtl&&isPrevious&&(changeType=StateChangeTypes.MenuItemKeyDownPrevious),!rtl&&isNext&&(changeType=StateChangeTypes.MenuItemKeyDownNext);else if(key===KeyboardEventValues.t.LEFT)rtl&&isNext&&(changeType=StateChangeTypes.MenuItemKeyDownNext),!rtl&&isPrevious&&(changeType=StateChangeTypes.MenuItemKeyDownPrevious);else if(isVerticalArrowKeys||isJumpKey||isAlphanumericChar){changeType=isAlphanumericChar?StateChangeTypes.MenuItemKeyDown:StateChangeTypes[toMenuItemKeyDownType(key)];const nextFocusedValue=getNextFocusedValue({value:item.value,key,isAlphanumericChar});payload={...!isFocusedValueControlled&&{focusedValue:nextFocusedValue}},changes={focusedValue:nextFocusedValue}}if(changeType){event.preventDefault(),event.stopPropagation();const transitionNext=changeType.includes("next"),willTransition=changeType.includes("previous")||transitionNext;payload={...payload,...willTransition&&{...isNext&&{nestedPathIds:[...state.nestedPathIds,item.value]},transitionType:changeType,isTransitionNext:isNext,isTransitionPrevious:isPrevious}},dispatch({type:changeType,payload}),onChange({type:changeType,...changes})}}),[rtl,triggerRef,state.nestedPathIds,isExpandedControlled,isFocusedValueControlled,isSelectedItemsControlled,getNextFocusedValue,getSelectedItems,onChange]),handleItemMouseEnter=(0,react.useCallback)((value=>{const changeType=StateChangeTypes.MenuItemMouseMove;dispatch({type:changeType,payload:{...!isFocusedValueControlled&&{focusedValue:value}}}),onChange({type:changeType,focusedValue:value})}),[isFocusedValueControlled,onChange]);(0,react.useEffect)((()=>{setMenuVisible(controlledIsExpanded)}),[controlledIsExpanded]),(0,react.useEffect)((()=>{const win=environment||window;return controlledIsExpanded?(win.document.addEventListener("click",handleMenuBlur,!0),win.document.addEventListener("keydown",handleMenuKeyDown,!0)):controlledIsExpanded||(win.document.removeEventListener("click",handleMenuBlur,!0),win.document.removeEventListener("keydown",handleMenuKeyDown,!0)),()=>{win.document.removeEventListener("click",handleMenuBlur,!0)}}),[controlledIsExpanded,handleMenuBlur,handleMenuKeyDown,environment]),(0,react.useEffect)((()=>{if(state.focusOnOpen&&menuVisible&&controlledFocusedValue&&controlledIsExpanded){let ref=itemRefs[controlledFocusedValue]?.current;ref||(ref=itemRefs[values[0]].current),ref&&ref.focus()}}),[values,menuVisible,itemRefs,controlledFocusedValue,state.focusOnOpen,controlledIsExpanded]),(0,react.useEffect)((()=>{const valuesChanged=JSON.stringify(values)!==JSON.stringify(state.valuesRef);if(!valuesChanged||state.isTransitionNext||state.isTransitionPrevious||dispatch({type:StateChangeTypes.FnSetStateRefs,payload:{valuesRef:values}}),valuesChanged&&(state.isTransitionNext||state.isTransitionPrevious)){const nextFocusedValue=state.isTransitionNext?values[0]:state.nestedPathIds.slice(-1)[0];dispatch({type:StateChangeTypes.FnMenuTransitionFinish,payload:{valuesRef:values,focusOnOpen:!0,nestedPathIds:state.isTransitionNext?state.nestedPathIds:state.nestedPathIds.slice(0,-1),...!isFocusedValueControlled&&{focusedValue:nextFocusedValue}}}),onChange({type:StateChangeTypes.FnMenuTransitionFinish,focusedValue:nextFocusedValue})}}),[values,isFocusedValueControlled,state.valuesRef,state.transitionType,state.isTransitionNext,state.isTransitionPrevious,state.nestedPathIds,onChange]);const getTriggerProps=(0,react.useCallback)((function(_temp){let{onClick,onKeyDown,type="button",role="button",disabled,...other}=void 0===_temp?{}:_temp;return{...other,"data-garden-container-id":"containers.menu.trigger","data-garden-container-version":"storybook",ref:triggerRef,id:triggerId,"aria-expanded":state.isExpanded,"aria-haspopup":!0,disabled,tabIndex:disabled?-1:0,type:null===type?void 0:type,role:null===role?void 0:role,onKeyDown:(0,composeEventHandlers.M)(onKeyDown,handleTriggerKeyDown),onClick:(0,composeEventHandlers.M)(onClick,handleTriggerClick)}}),[triggerRef,state.isExpanded,handleTriggerClick,handleTriggerKeyDown,triggerId]),getMenuProps=(0,react.useCallback)((function(_temp2){let{role="menu",onMouseLeave,...other}=void 0===_temp2?{}:_temp2;return{...other,...getGroupProps({onMouseLeave:(0,composeEventHandlers.M)(onMouseLeave,handleMenuMouseLeave)}),"data-garden-container-id":"containers.menu","data-garden-container-version":"storybook","aria-labelledby":triggerId,tabIndex:-1,role:null===role?void 0:role,ref:menuRef}}),[triggerId,menuRef,getGroupProps,handleMenuMouseLeave]),getSeparatorProps=(0,react.useCallback)((function(_temp3){let{role="separator",...other}=void 0===_temp3?{}:_temp3;return{...other,"data-garden-container-id":"containers.menu.separator","data-garden-container-version":"storybook",role:null===role?void 0:role}}),[]),getItemGroupProps=(0,react.useCallback)((_ref4=>{let{role="group",...other}=_ref4;return{...other,"data-garden-container-id":"containers.menu.item_group","data-garden-container-version":"storybook",role:null===role?void 0:role}}),[]),getItemProps=(0,react.useCallback)((_ref5=>{let{role="menuitem",onClick,onKeyDown,onMouseEnter,item,...other}=_ref5;const{disabled:itemDisabled,type,name,value,isNext=!1,isPrevious=!1,label=value}=item;let itemRole=role;"radio"===type?itemRole="menuitemradio":"checkbox"===type&&(itemRole="menuitemcheckbox");const selected=isItemSelected(value,type,name),elementProps={"data-garden-container-id":"containers.menu.item","data-garden-container-version":"storybook","aria-selected":void 0,"aria-checked":selected,"aria-disabled":itemDisabled,role:null===itemRole?void 0:itemRole,onClick,onKeyDown,onMouseEnter,...other};if(itemDisabled)return elementProps;const itemProps=getElementProps({value,...elementProps,onClick:(0,composeEventHandlers.M)(onClick,(()=>handleItemClick({...item,label,selected,isNext,isPrevious}))),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(e=>handleItemKeyDown(e,{...item,label,selected,isNext,isPrevious}))),onMouseEnter:(0,composeEventHandlers.M)(onMouseEnter,(()=>handleItemMouseEnter(value)))});return itemProps.ref!==itemRefs[value]&&(itemRefs[value]=itemProps.ref),itemProps}),[itemRefs,isItemSelected,getElementProps,handleItemClick,handleItemKeyDown,handleItemMouseEnter]);return(0,react.useMemo)((()=>({getTriggerProps,getMenuProps,getItemGroupProps,getItemProps,getSeparatorProps,isExpanded:controlledIsExpanded,selection:controlledSelectedItems,focusedValue:controlledFocusedValue})),[controlledIsExpanded,controlledSelectedItems,controlledFocusedValue,getTriggerProps,getMenuProps,getItemGroupProps,getItemProps,getSeparatorProps])}},"./packages/selection/src/useSelection.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>useSelection});var react=__webpack_require__("./node_modules/react/index.js"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const stateReducer=(state,action)=>{switch(action.type){case"END":case"HOME":case"FOCUS":case"INCREMENT":case"DECREMENT":return{...state,focusedValue:action.payload};case"MOUSE_SELECT":return{...state,selectedValue:action.payload,focusedValue:void 0};case"KEYBOARD_SELECT":return{...state,selectedValue:action.payload};case"EXIT_WIDGET":return{...state,focusedValue:void 0};default:return state}},useSelection=_ref=>{let{values,direction="horizontal",defaultFocusedValue=values[0],defaultSelectedValue,rtl,selectedValue,focusedValue,onSelect,onFocus}=_ref;const isSelectedValueControlled=void 0!==selectedValue,isFocusedValueControlled=void 0!==focusedValue,refs=(0,react.useMemo)((()=>values.reduce(((all,value)=>(all[value]=(0,react.createRef)(),all)),{})),[values]),[state,dispatch]=(0,react.useReducer)(stateReducer,{selectedValue,focusedValue}),controlledFocusedValue=(0,getControlledValue.u)(focusedValue,state.focusedValue),controlledSelectedValue=(0,getControlledValue.u)(selectedValue,state.selectedValue);(0,react.useEffect)((()=>{if(void 0!==controlledFocusedValue){const targetRef=refs[controlledFocusedValue];targetRef?.current&&targetRef.current.focus()}}),[controlledFocusedValue]),(0,react.useEffect)((()=>{void 0===selectedValue&&void 0!==defaultSelectedValue&&(onSelect&&onSelect(defaultSelectedValue),isSelectedValueControlled||dispatch({type:"KEYBOARD_SELECT",payload:defaultSelectedValue}))}),[]);const getGroupProps=(0,react.useCallback)((function(_temp){let{role="group",...other}=void 0===_temp?{}:_temp;return{role:null===role?void 0:role,"data-garden-container-id":"containers.selection","data-garden-container-version":"storybook",...other}}),[]);return{focusedValue:controlledFocusedValue,selectedValue:controlledSelectedValue,getElementProps:_ref2=>{let{selectedAriaKey="aria-selected",onFocus:onFocusCallback,onKeyDown,onClick,value,...other}=_ref2;const isSelected=controlledSelectedValue===value,verticalDirection="vertical"===direction||"both"===direction,horizontalDirection="horizontal"===direction||"both"===direction;return{tabIndex:(void 0===controlledFocusedValue?isSelected:controlledFocusedValue===value)||void 0===controlledSelectedValue&&void 0===controlledFocusedValue&&value===defaultFocusedValue?0:-1,[selectedAriaKey]:selectedAriaKey?isSelected:void 0,ref:refs[value],onFocus:(0,composeEventHandlers.M)(onFocusCallback,(()=>{onFocus&&onFocus(value),!isFocusedValueControlled&&dispatch({type:"FOCUS",payload:value})})),onClick:(0,composeEventHandlers.M)(onClick,(()=>{onSelect&&onSelect(value),onFocus&&onFocus(value),!isSelectedValueControlled&&dispatch({type:"MOUSE_SELECT",payload:value})})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{let nextItem,currentItem;currentItem=isFocusedValueControlled?values.find((id=>focusedValue===id)):values.find((id=>state.focusedValue===id));const onIncrement=()=>{const nextItemIndex=values.indexOf(currentItem)+1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[0]),!isFocusedValueControlled&&dispatch({type:"INCREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)},onDecrement=()=>{const nextItemIndex=values.indexOf(currentItem)-1;nextItem=values[nextItemIndex],nextItem||(nextItem=values[values.length-1]),!isFocusedValueControlled&&dispatch({type:"DECREMENT",payload:nextItem}),onFocus&&onFocus(nextItem)};if(!(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey))if(event.key===KeyboardEventValues.t.UP&&verticalDirection||event.key===KeyboardEventValues.t.LEFT&&horizontalDirection)rtl&&horizontalDirection?onIncrement():onDecrement(),event.preventDefault();else if(event.key===KeyboardEventValues.t.DOWN&&verticalDirection||event.key===KeyboardEventValues.t.RIGHT&&horizontalDirection)rtl&&horizontalDirection?onDecrement():onIncrement(),event.preventDefault();else if(event.key===KeyboardEventValues.t.HOME){const firstItem=values[0];!isFocusedValueControlled&&dispatch({type:"HOME",payload:firstItem}),onFocus&&onFocus(firstItem),event.preventDefault()}else if(event.key===KeyboardEventValues.t.END){const lastItem=values[values.length-1];!isFocusedValueControlled&&dispatch({type:"END",payload:lastItem}),onFocus&&onFocus(lastItem),event.preventDefault()}else event.key!==KeyboardEventValues.t.SPACE&&event.key!==KeyboardEventValues.t.ENTER||(onSelect&&onSelect(value),!isSelectedValueControlled&&dispatch({type:"KEYBOARD_SELECT",payload:value}),event.preventDefault())})),onBlur:event=>{0===event.target.tabIndex&&(dispatch({type:"EXIT_WIDGET"}),onFocus&&onFocus())},...other}},getGroupProps}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/utilities/node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./packages/utilities/node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}}}]);