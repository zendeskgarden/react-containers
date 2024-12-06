(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[4162],{"./packages/focusvisible/demo/focusvisible.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FocusVisible:()=>FocusVisible,__namedExportsOrder:()=>__namedExportsOrder,default:()=>focusvisible_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useFocusVisible=__webpack_require__("./packages/focusvisible/src/useFocusVisible.ts");const FocusVisibleContainer=_ref=>{let{children,render=children,...options}=_ref;const scopeRef=(0,react.useRef)(null);return(0,useFocusVisible.Y)({scope:scopeRef,...options}),react.createElement(react.Fragment,null,render({ref:scopeRef}))};FocusVisibleContainer.defaultProps={className:"garden-focus-visible",dataAttribute:"data-garden-focus-visible"},FocusVisibleContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,relativeDocument:prop_types_default().object,className:prop_types_default().string,dataAttribute:prop_types_default().string},FocusVisibleContainer.__docgenInfo={description:"",methods:[],displayName:"FocusVisibleContainer",props:{render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: { ref: React.RefObject<HTMLDivElement> }) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ ref: React.RefObject<HTMLDivElement> }",signature:{properties:[{key:"ref",value:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}],required:!0}}]}},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A render prop function which receives a `ref`",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: { ref: React.RefObject<HTMLDivElement> }) => React.ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ ref: React.RefObject<HTMLDivElement> }",signature:{properties:[{key:"ref",value:{name:"ReactRefObject",raw:"React.RefObject<HTMLDivElement>",elements:[{name:"HTMLDivElement"}],required:!0}}]}},name:"options"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:"A children render prop function which receives a `ref`",type:{name:"func"}},className:{defaultValue:{value:"'garden-focus-visible'",computed:!1},description:"",type:{name:"string"},required:!1},dataAttribute:{defaultValue:{value:"'data-garden-focus-visible'",computed:!1},description:"",type:{name:"string"},required:!1},relativeDocument:{description:"",type:{name:"object"},required:!1}},composes:["Omit"]};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),getColor=__webpack_require__("./node_modules/@zendeskgarden/react-theming/dist/esm/utils/getColor.js"),theme=__webpack_require__("./node_modules/@zendeskgarden/react-theming/dist/esm/elements/theme/index.js");const GlobalStyle=(0,styled_components_browser_esm.DU)([":focus{outline:none;}.garden-focus-visible,[data-garden-focus-visible='true']{box-shadow:0 0 0 2px ",";}blockquote p::before{content:'“';}blockquote p::after{content:'”';}"],(0,getColor.o)({theme:theme.A,hue:"green",shade:600})),Component=(0,react.forwardRef)(((_,ref)=>react.createElement(react.Fragment,null,react.createElement(GlobalStyle,null),react.createElement("div",{ref},react.createElement("a",{href:"#test"},"Anchor"),react.createElement("br",null),react.createElement("button",{className:"my-5 px-2 py-1",type:"button"},"Button"),react.createElement("br",null),react.createElement("label",null,react.createElement("span",null,"Input"),react.createElement("input",{className:"ml-1"})),react.createElement("div",{className:"my-5",tabIndex:0},'Custom [tabindex="0"]'),react.createElement("label",null,react.createElement("span",{className:"align-top"},"Textarea"),react.createElement("textarea",{className:"ml-1"})),react.createElement("br",null),react.createElement("blockquote",{className:"my-5",contentEditable:!0,suppressContentEditableWarning:!0},react.createElement("p",null,"Content editable block quote"))))));Component.displayName="Component";const Container=props=>react.createElement(FocusVisibleContainer,props,(_ref=>{let{ref}=_ref;return react.createElement(Component,{ref})})),Hook=_ref2=>{let{scope,...props}=_ref2;return(0,useFocusVisible.Y)({scope,...props}),react.createElement(Component,{ref:scope})},FocusVisibleStory=_ref3=>{let{as,...props}=_ref3;return"container"===as?react.createElement(Container,null):react.createElement(Hook,props)};FocusVisibleStory.__docgenInfo={description:"",methods:[],displayName:"FocusVisibleStory"};const focusvisible_stories={title:"Packages/FocusVisible",component:FocusVisibleContainer},FocusVisible={render:function Render(args){const scope=(0,react.useRef)(null);return react.createElement(FocusVisibleStory,(0,esm_extends.A)({},args,{scope}))},name:"FocusVisible",args:{as:"hook"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},className:{control:!1},dataAttribute:{control:!1}}},__namedExportsOrder=["FocusVisible"];FocusVisible.parameters={...FocusVisible.parameters,docs:{...FocusVisible.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const scope = useRef<HTMLDivElement>(null);\n    return <FocusVisibleStory {...args} scope={scope} />;\n  },\n  name: 'FocusVisible',\n  args: {\n    as: 'hook'\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    },\n    className: {\n      control: false\n    },\n    dataAttribute: {\n      control: false\n    }\n  }\n}",...FocusVisible.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-H7CJXHDS.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-XP5HYGXS.mjs"),__webpack_require__("@storybook/global")),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=(__webpack_require__("storybook/internal/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__.IX},"./packages/focusvisible/src/useFocusVisible.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Y:()=>useFocusVisible});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const INPUT_TYPES_WHITE_LIST={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function useFocusVisible(_temp){let{scope,relativeDocument,className="garden-focus-visible",dataAttribute="data-garden-focus-visible"}=void 0===_temp?{}:_temp;if(!scope)throw new Error('Error: the useFocusVisible() hook requires a "scope" property');const hadKeyboardEvent=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),hadFocusVisibleRecently=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),hadFocusVisibleRecentlyTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{let environment=relativeDocument;environment||(environment=document);const isValidFocusTarget=el=>!!(el&&el!==scope.current&&"HTML"!==el.nodeName&&"BODY"!==el.nodeName&&"classList"in el&&"contains"in el.classList),isFocused=el=>!(!el||!el.classList.contains(className)&&!el.hasAttribute(dataAttribute)),addFocusVisibleClass=el=>{isFocused(el)||(el&&el.classList.add(className),el&&el.setAttribute(dataAttribute,"true"))},onKeyDown=e=>{e.metaKey||e.altKey||e.ctrlKey||(isValidFocusTarget(environment.activeElement)&&addFocusVisibleClass(environment.activeElement),hadKeyboardEvent.current=!0)},onPointerDown=()=>{hadKeyboardEvent.current=!1},onFocus=e=>{isValidFocusTarget(e.target)&&(hadKeyboardEvent.current||(el=>{const type=el.type,tagName=el.tagName;return!("INPUT"!==tagName||!INPUT_TYPES_WHITE_LIST[type]||el.readOnly)||"TEXTAREA"===tagName&&!el.readOnly||!!el.isContentEditable})(e.target))&&addFocusVisibleClass(e.target)},onBlur=e=>{var el;if(isValidFocusTarget(e.target)&&isFocused(e.target)){hadFocusVisibleRecently.current=!0,clearTimeout(hadFocusVisibleRecentlyTimeout.current);const timeoutId=setTimeout((()=>{hadFocusVisibleRecently.current=!1,clearTimeout(hadFocusVisibleRecentlyTimeout.current)}),100);hadFocusVisibleRecentlyTimeout.current=Number(timeoutId),(el=e.target).classList.remove(className),el.removeAttribute(dataAttribute)}},onInitialPointerMove=e=>{const nodeName=e.target.nodeName;nodeName&&"html"===nodeName.toLowerCase()||(hadKeyboardEvent.current=!1,removeInitialPointerMoveListeners())},removeInitialPointerMoveListeners=()=>{environment.removeEventListener("mousemove",onInitialPointerMove),environment.removeEventListener("mousedown",onInitialPointerMove),environment.removeEventListener("mouseup",onInitialPointerMove),environment.removeEventListener("pointermove",onInitialPointerMove),environment.removeEventListener("pointerdown",onInitialPointerMove),environment.removeEventListener("pointerup",onInitialPointerMove),environment.removeEventListener("touchmove",onInitialPointerMove),environment.removeEventListener("touchstart",onInitialPointerMove),environment.removeEventListener("touchend",onInitialPointerMove)},onVisibilityChange=()=>{"hidden"===environment.visibilityState&&hadFocusVisibleRecently.current&&(hadKeyboardEvent.current=!0)},currentScope=scope.current;if(environment&&currentScope)return environment.addEventListener("keydown",onKeyDown,!0),environment.addEventListener("mousedown",onPointerDown,!0),environment.addEventListener("pointerdown",onPointerDown,!0),environment.addEventListener("touchstart",onPointerDown,!0),environment.addEventListener("visibilitychange",onVisibilityChange,!0),environment.addEventListener("mousemove",onInitialPointerMove),environment.addEventListener("mousedown",onInitialPointerMove),environment.addEventListener("mouseup",onInitialPointerMove),environment.addEventListener("pointermove",onInitialPointerMove),environment.addEventListener("pointerdown",onInitialPointerMove),environment.addEventListener("pointerup",onInitialPointerMove),environment.addEventListener("touchmove",onInitialPointerMove),environment.addEventListener("touchstart",onInitialPointerMove),environment.addEventListener("touchend",onInitialPointerMove),currentScope&&currentScope.addEventListener("focus",onFocus,!0),currentScope&&currentScope.addEventListener("blur",onBlur,!0),()=>{environment.removeEventListener("keydown",onKeyDown),environment.removeEventListener("mousedown",onPointerDown),environment.removeEventListener("pointerdown",onPointerDown),environment.removeEventListener("touchstart",onPointerDown),environment.removeEventListener("visibilityChange",onVisibilityChange),removeInitialPointerMoveListeners(),currentScope&&currentScope.removeEventListener("focus",onFocus),currentScope&&currentScope.removeEventListener("blur",onBlur),clearTimeout(hadFocusVisibleRecentlyTimeout.current)}}),[relativeDocument,scope,className,dataAttribute])}},"./node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);