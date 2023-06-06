/*! For license information please see tabs-demo-tabs-stories-mdx.080d6446.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[433],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-PCJTTTQV.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/tabs/demo/tabs.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{controlled:()=>controlled,default:()=>tabs_stories,uncontrolled:()=>uncontrolled});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),external_STORYBOOK_MODULE_CLIENT_API_=__webpack_require__("@storybook/client-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),reach_auto_id=__webpack_require__("./packages/utilities/node_modules/@reach/auto-id/dist/reach-auto-id.mjs"),useSelection=__webpack_require__("./packages/selection/src/useSelection.ts");const useTabs=function(_temp){let{orientation="horizontal",idPrefix,...options}=void 0===_temp?{}:_temp;const prefix=(0,reach_auto_id.M)(idPrefix),PANEL_ID=`${prefix}__panel`,TAB_ID=`${prefix}__tab`,{selectedItem,focusedItem,getContainerProps,getItemProps}=(0,useSelection.c)({direction:orientation,defaultSelectedIndex:0,...options});return{selectedItem,focusedItem,getTabListProps:function(_temp2){let{role="tablist",...other}=void 0===_temp2?{}:_temp2;return{...getContainerProps(other),role:null===role?void 0:role,"aria-orientation":orientation,"data-garden-container-id":"containers.tabs","data-garden-container-version":"storybook"}},getTabProps:_ref=>{let{role="tab",index,...other}=_ref;return{...getItemProps(other),role:null===role?void 0:role,id:`${TAB_ID}:${index}`,"aria-controls":`${PANEL_ID}:${index}`}},getTabPanelProps:_ref2=>{let{role="tabpanel",index,item,...other}=_ref2;return{role:null===role?void 0:role,id:`${PANEL_ID}:${index}`,hidden:item!==selectedItem,"aria-labelledby":`${TAB_ID}:${index}`,...other}}}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TabsContainer=_ref=>{let{children,render=children,...options}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render(useTabs(options))})};TabsContainer.defaultProps={orientation:"horizontal"},TabsContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,rtl:prop_types_default().bool,orientation:prop_types_default().oneOf(["horizontal","vertical"]),idPrefix:prop_types_default().string,defaultSelectedIndex:prop_types_default().number,selectedItem:prop_types_default().any,onSelect:prop_types_default().func};try{TabsContainer.displayName="TabsContainer",TabsContainer.__docgenInfo={description:"",displayName:"TabsContainer",props:{render:{defaultValue:null,description:"Provides tabs render prop state and functions\n@param options.focusedItem Controlled focused tab\n@param options.selectedItem Controlled selected tab\n@param options.getTabListProps Tab list props getter\n@param options.getTabProps Tab props getter\n@param options.getTabPanelProps Tab panel props getter",name:"render",required:!1,type:{name:'((options: { focusedItem?: any; selectedItem?: any; getTabListProps: <T extends Element>(props?: (Omit<HTMLProps<T>, "role"> & { role?: "tablist" | null; })) => HTMLProps<...>; getTabProps: <T extends Element>(props: Omit<...> & { ...; }) => HTMLProps<...>; getTabPanelProps: <T extends Elemen...'}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"(((options: IUseTabsReturnValue<any>) => ReactNode) & (boolean | ReactChild | ReactFragment | ReactPortal | null))"}},orientation:{defaultValue:null,description:"Determines the orientation of the tabs",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},idPrefix:{defaultValue:null,description:"Prefixes IDs for tab elements",name:"idPrefix",required:!1,type:{name:"string"}},defaultFocusedIndex:{defaultValue:null,description:"Sets the initial focused item",name:"defaultFocusedIndex",required:!1,type:{name:"number"}},defaultSelectedIndex:{defaultValue:null,description:"Sets the initial selected item",name:"defaultSelectedIndex",required:!1,type:{name:"number"}},rtl:{defaultValue:null,description:"Determines right-to-left layout",name:"rtl",required:!1,type:{name:"boolean"}},selectedItem:{defaultValue:null,description:"Sets controlled item selection",name:"selectedItem",required:!1,type:{name:"any"}},focusedItem:{defaultValue:null,description:"Sets controlled item focus",name:"focusedItem",required:!1,type:{name:"any"}},onSelect:{defaultValue:null,description:"Handles controlled item selection\n@param selectedItem The selected item",name:"onSelect",required:!1,type:{name:"((selectedItem: any) => void)"}},onFocus:{defaultValue:null,description:"Handles controlled item focus\n@param focusedItem The focused item",name:"onFocus",required:!1,type:{name:"((focusedItem?: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/tabs/src/TabsContainer.tsx#TabsContainer"]={docgenInfo:TabsContainer.__docgenInfo,name:"TabsContainer",path:"packages/tabs/src/TabsContainer.tsx#TabsContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const Component=_ref=>{let{tabs,getTabListProps,getTabPanelProps,getTabProps,selectedItem,orientation,rtl}=_ref;return(0,jsx_runtime.jsxs)("div",{className:classnames_default()({flex:"vertical"===orientation,"flex-row-reverse":"vertical"===orientation&&rtl}),children:[(0,jsx_runtime.jsx)("ul",{...getTabListProps(),className:classnames_default()("border-solid","border-transparent","flex",{"flex-col":"vertical"===orientation,"border-b-grey-600":"vertical"!==orientation,"flex-row-reverse":"vertical"!==orientation&&rtl,"border-r-grey-600":"vertical"===orientation&&!rtl,"border-l-grey-600":"vertical"===orientation&&rtl}),children:tabs.map(((tab,index)=>(0,jsx_runtime.jsx)("li",{...getTabProps({index,item:index.toString(),focusRef:tab}),className:classnames_default()("border-3","border-solid","border-transparent","cursor-pointer","px-2","py-1",{"border-b-blue-600":selectedItem===index.toString()&&"vertical"!==orientation,"border-r-blue-600":selectedItem===index.toString()&&"vertical"===orientation&&!rtl,"border-l-blue-600":selectedItem===index.toString()&&"vertical"===orientation&&rtl}),children:`Tab ${index+1}`},index)))}),tabs.map(((_,index)=>(0,jsx_runtime.jsx)("div",{...getTabPanelProps({index,item:index.toString()}),className:"p-2",children:`Panel ${index+1}`},index)))]})};Component.displayName="Component";const Container=_ref2=>{let{tabRefs,...props}=_ref2;return(0,jsx_runtime.jsx)(TabsContainer,{...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{tabs:tabRefs,orientation:props.orientation,rtl:props.rtl,...containerProps})})};Container.displayName="Container";const Hook=_ref3=>{let{tabRefs,...props}=_ref3;const hookProps=useTabs(props);return(0,jsx_runtime.jsx)(Component,{tabs:tabRefs,orientation:props.orientation,rtl:props.rtl,...hookProps})};Hook.displayName="Hook";const TabsStory=_ref4=>{let{as,tabs,...props}=_ref4;const tabRefs=Array.from({length:tabs},(()=>(0,react.createRef)()));return"container"===as?(0,jsx_runtime.jsx)(Container,{tabRefs,...props}):(0,jsx_runtime.jsx)(Hook,{tabRefs,...props})},README_namespaceObject="# @zendeskgarden/container-tabs [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-tabs\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-tabs\n\nThis package includes containers relating to tabs in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-tabs\n```\n\n## Usage\n\nThis container implements the\n[tabs](https://www.w3.org/TR/wai-aria-practices/#tabpanel) design pattern and\ncan be used to build a tabbed interface. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useTabs\n\n```jsx\nimport { useTabs } from '@zendeskgarden/container-tabs';\n\nconst tabs = ['Tab 1', 'Tab 2', 'Tab 3'];\nconst tabRefs = tabs.map(() => createRef(null));\n\nconst Tabs = () => {\n  const { selectedItem, getTabProps, getTabListProps, getTabPanelProps } = useTabs();\n  const tabComponents = [];\n  const tabPanels = [];\n\n  tabs.forEach((tab, index) => {\n    tabComponents.push(\n      <li\n        {...getTabProps({\n          item: tab,\n          index,\n          ref: tabRefs[index],\n          key: tab,\n          style: {\n            borderBottom: `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`\n          }\n        })}\n      >\n        {tab}\n      </li>\n    );\n\n    tabPanels.push(\n      <div\n        {...getTabPanelProps({\n          index,\n          item: tab,\n          key: tab,\n          style: {\n            padding: '10px 0',\n            borderTop: '1px solid'\n          }\n        })}\n      >\n        {tab} Content\n      </div>\n    );\n  });\n\n  return (\n    <>\n      <ul\n        {...getTabListProps({\n          style: {\n            display: 'flex'\n          }\n        })}\n      >\n        {tabComponents}\n      </ul>\n      {tabPanels}\n    </>\n  );\n};\n```\n\n### TabsContainer\n\n```jsx\nimport { TabsContainer } from '@zendeskgarden/container-tabs';\n\nconst Tabs = () => {\n  const tabComponents = [];\n  const tabPanels = [];\n\n  return (\n    <TabsContainer>\n      {({ selectedItem, getTabProps, getTabListProps, getTabPanelProps }) => {\n        tabs.forEach((tab, index) => {\n          tabComponents.push(\n            <li\n              {...getTabProps({\n                item: tab,\n                index,\n                ref: tabRefs[index],\n                key: tab,\n                style: {\n                  borderBottom: `3px solid ${tab === selectedItem ? '#1f73b7' : 'transparent'}`\n                }\n              })}\n            >\n              {tab}\n            </li>\n          );\n\n          tabPanels.push(\n            <div\n              {...getTabPanelProps({\n                index,\n                item: tab,\n                key: tab,\n                style: {\n                  padding: '10px 0',\n                  borderTop: '1px solid'\n                }\n              })}\n            >\n              {tab} Content\n            </div>\n          );\n        });\n\n        return (\n          <>\n            <ul\n              {...getTabListProps({\n                style: {\n                  display: 'flex'\n                }\n              })}\n            >\n              {tabComponents}\n            </ul>\n            {tabPanels}\n          </>\n        );\n      }}\n      }\n    </TabsContainer>\n  );\n};\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Tabs",component:TabsContainer,args:{as:"hook",tabs:3},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},tabs:{control:{type:"range",min:1,max:5},table:{category:"Story"}}}}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Uncontrolled",args:{defaultSelectedIndex:0},argTypes:{selectedItem:{control:!1}},children:args=>(0,jsx_runtime.jsx)(TabsStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Controlled",args:{selectedItem:"0"},argTypes:{defaultSelectedIndex:{control:!1}},children:args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(TabsStory,{...args,onSelect:selectedItem=>updateArgs({selectedItem})})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const uncontrolled=args=>(0,jsx_runtime.jsx)(TabsStory,{...args});uncontrolled.storyName="Uncontrolled",uncontrolled.argTypes={selectedItem:{control:!1}},uncontrolled.args={defaultSelectedIndex:0},uncontrolled.parameters={storySource:{source:"args => <TabsStory {...args} />"}};const controlled=args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(TabsStory,{...args,onSelect:selectedItem=>updateArgs({selectedItem})})};controlled.storyName="Controlled",controlled.argTypes={defaultSelectedIndex:{control:!1}},controlled.args={selectedItem:"0"},controlled.parameters={storySource:{source:"args => {\n  const updateArgs = useArgs()[1];\n  const handleSelect = selectedItem => updateArgs({\n    selectedItem\n  });\n  return <TabsStory {...args} onSelect={handleSelect} />;\n}"}};const componentMeta={title:"Packages/Tabs",component:TabsContainer,args:{as:"hook",tabs:3},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},tabs:{control:{type:"range",min:1,max:5},table:{category:"Story"}}},tags:["stories-mdx"],includeStories:["uncontrolled","controlled"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const tabs_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/selection/src/useSelection.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>useSelection});var react=__webpack_require__("./node_modules/react/index.js"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const stateReducer=(state,action)=>{switch(action.type){case"END":case"HOME":case"FOCUS":case"INCREMENT":case"DECREMENT":return{...state,focusedItem:action.payload};case"MOUSE_SELECT":return{...state,selectedItem:action.payload,focusedItem:void 0};case"KEYBOARD_SELECT":return{...state,selectedItem:action.payload};case"EXIT_WIDGET":return{...state,focusedItem:void 0};default:return state}},useSelection=function(_temp){let{direction="horizontal",defaultFocusedIndex=0,defaultSelectedIndex,rtl,selectedItem,focusedItem,onSelect,onFocus}=void 0===_temp?{}:_temp;const isSelectedItemControlled=void 0!==selectedItem,isFocusedItemControlled=void 0!==focusedItem,refs=[],items=[],[state,dispatch]=(0,react.useReducer)(stateReducer,{selectedItem,focusedItem}),controlledFocusedItem=(0,getControlledValue.u)(focusedItem,state.focusedItem),controlledSelectedItem=(0,getControlledValue.u)(selectedItem,state.selectedItem);(0,react.useEffect)((()=>{if(void 0!==controlledFocusedItem){const focusedIndex=items.indexOf(controlledFocusedItem);refs[focusedIndex]&&refs[focusedIndex].current.focus()}}),[controlledFocusedItem]),(0,react.useEffect)((()=>{void 0===selectedItem&&void 0!==defaultSelectedIndex&&(onSelect&&onSelect(items[defaultSelectedIndex]),isSelectedItemControlled||dispatch({type:"KEYBOARD_SELECT",payload:items[defaultSelectedIndex]}))}),[]);return{focusedItem:controlledFocusedItem,selectedItem:controlledSelectedItem,getItemProps:_ref=>{let{selectedAriaKey="aria-selected",role="option",onFocus:onFocusCallback,onKeyDown,onClick,item,focusRef,refKey="ref",...other}=_ref;refs.push(focusRef),items.push(item);const isSelected=controlledSelectedItem===item,tabIndex=(void 0===controlledFocusedItem?isSelected:controlledFocusedItem===item)||void 0===controlledSelectedItem&&void 0===controlledFocusedItem&&items.indexOf(item)===defaultFocusedIndex?0:-1,verticalDirection="vertical"===direction||"both"===direction,horizontalDirection="horizontal"===direction||"both"===direction;return{role:null===role?void 0:role,tabIndex,[selectedAriaKey]:selectedAriaKey?isSelected:void 0,[refKey]:focusRef,onFocus:(0,composeEventHandlers.M)(onFocusCallback,(()=>{onFocus&&onFocus(item),isFocusedItemControlled||dispatch({type:"FOCUS",payload:item})})),onClick:(0,composeEventHandlers.M)(onClick,(()=>{onSelect&&onSelect(item),onFocus&&onFocus(),isSelectedItemControlled||dispatch({type:"MOUSE_SELECT",payload:item})})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{let nextIndex,currentIndex;currentIndex=isFocusedItemControlled?items.indexOf(focusedItem):items.indexOf(state.focusedItem||state.selectedItem);const onIncrement=()=>{nextIndex=currentIndex+1,currentIndex===items.length-1&&(nextIndex=0),!isFocusedItemControlled&&dispatch({type:"INCREMENT",payload:items[nextIndex]}),onFocus&&onFocus(items[nextIndex])},onDecrement=()=>{nextIndex=currentIndex-1,0===currentIndex&&(nextIndex=items.length-1),!isFocusedItemControlled&&dispatch({type:"DECREMENT",payload:items[nextIndex]}),onFocus&&onFocus(items[nextIndex])};event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||(event.key===KeyboardEventValues.t.UP&&verticalDirection||event.key===KeyboardEventValues.t.LEFT&&horizontalDirection?(rtl&&horizontalDirection?onIncrement():onDecrement(),event.preventDefault()):event.key===KeyboardEventValues.t.DOWN&&verticalDirection||event.key===KeyboardEventValues.t.RIGHT&&horizontalDirection?(rtl&&horizontalDirection?onDecrement():onIncrement(),event.preventDefault()):event.key===KeyboardEventValues.t.HOME?(isFocusedItemControlled||dispatch({type:"HOME",payload:items[0]}),onFocus&&onFocus(items[0]),event.preventDefault()):event.key===KeyboardEventValues.t.END?(isFocusedItemControlled||dispatch({type:"END",payload:items[items.length-1]}),onFocus&&onFocus(items[items.length-1]),event.preventDefault()):event.key!==KeyboardEventValues.t.SPACE&&event.key!==KeyboardEventValues.t.ENTER||(onSelect&&onSelect(item),isSelectedItemControlled||dispatch({type:"KEYBOARD_SELECT",payload:item}),event.preventDefault()))})),onBlur:event=>{0===event.target.tabIndex&&(isFocusedItemControlled||dispatch({type:"EXIT_WIDGET"}),onFocus&&onFocus())},...other}},getContainerProps:function(_temp2){let{role="listbox",...other}=void 0===_temp2?{}:_temp2;return{role:null===role?void 0:role,"data-garden-container-id":"containers.selection","data-garden-container-version":"storybook",...other}}}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./packages/utilities/node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}}}]);