/*! For license information please see modal-demo-modal-stories.cd696017.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[263],{"./node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}},"./packages/modal/demo/modal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Modal:()=>Modal,__namedExportsOrder:()=>__namedExportsOrder,default:()=>modal_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),useFocusJail=__webpack_require__("./packages/focusjail/src/useFocusJail.ts");const useModal=_ref=>{let{onClose,modalRef,idPrefix,focusOnMount,restoreFocus,environment}=_ref;const prefix=(0,useId.M)(idPrefix),titleId=`${prefix}__title`,contentId=`${prefix}__content`,isModalMousedDownRef=(0,react.useRef)(!1),closeModal=event=>{onClose&&onClose(event)},{getContainerProps}=(0,useFocusJail.P)({containerRef:modalRef,focusOnMount,restoreFocus,environment});return{getBackdropProps:function(_temp){let{onMouseUp,...other}=void 0===_temp?{}:_temp;return{onMouseUp:(0,composeEventHandlers.M)(onMouseUp,(event=>{const isModalContainer="containers.modal"===event.target.getAttribute("data-garden-container-id");!isModalMousedDownRef.current&&isModalContainer&&closeModal(event),isModalMousedDownRef.current=!1})),"data-garden-container-id":"containers.modal","data-garden-container-version":"storybook",...other}},getModalProps:props=>getContainerProps(function(_temp2){let{role="dialog",onKeyDown,onMouseDown,...other}=void 0===_temp2?{}:_temp2;return{role:null===role?void 0:role,tabIndex:-1,"aria-modal":!0,"aria-labelledby":titleId,"aria-describedby":contentId,onMouseDown:(0,composeEventHandlers.M)(onMouseDown,(()=>{isModalMousedDownRef.current=!0})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{event.key===KeyboardEventValues.t.ESCAPE&&closeModal(event)})),...other}}(props)),getTitleProps:function(_temp3){let{id=titleId,...other}=void 0===_temp3?{}:_temp3;return{id,...other}},getContentProps:function(_temp4){let{id=contentId,...other}=void 0===_temp4?{}:_temp4;return{id,...other}},getCloseProps:_ref2=>{let{onClick,...other}=_ref2;return{onClick:(0,composeEventHandlers.M)(onClick,(event=>{closeModal(event)})),...other}},closeModal}},ModalContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render(useModal(options)))};ModalContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,onClose:prop_types_default().func,modalRef:prop_types_default().any.isRequired,idPrefix:prop_types_default().string,focusOnMount:prop_types_default().bool,restoreFocus:prop_types_default().bool,environment:prop_types_default().any},ModalContainer.defaultProps={focusOnMount:!0,restoreFocus:!0},ModalContainer.__docgenInfo={description:"",methods:[],displayName:"ModalContainer",props:{onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent | MouseEvent) => void",signature:{arguments:[{type:{name:"union",raw:"KeyboardEvent | MouseEvent",elements:[{name:"KeyboardEvent"},{name:"MouseEvent"}]},name:"event"}],return:{name:"void"}}},description:"Handles close actions",type:{name:"func"}},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"T"}],raw:"RefObject<T>"},description:"Provides ref access to the underlying dialog element",type:{name:"any"}},idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for modal elements",type:{name:"string"}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"Directs keyboard focus to the modal on mount",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},restoreFocus:{required:!1,tsType:{name:"boolean"},description:"Returns keyboard focus to the element that triggered the modal",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},environment:{required:!1,tsType:{name:"Document"},description:"Sets the environment where the modal is rendered",type:{name:"any"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  getBackdropProps: IUseModalReturnValue['getBackdropProps'];\n  getModalProps: IUseModalReturnValue['getModalProps'];\n  getCloseProps: IUseModalReturnValue['getCloseProps'];\n  getTitleProps: IUseModalReturnValue['getTitleProps'];\n  getContentProps: IUseModalReturnValue['getContentProps'];\n  closeModal?: IUseModalReturnValue['closeModal'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  getBackdropProps: IUseModalReturnValue['getBackdropProps'];\n  getModalProps: IUseModalReturnValue['getModalProps'];\n  getCloseProps: IUseModalReturnValue['getCloseProps'];\n  getTitleProps: IUseModalReturnValue['getTitleProps'];\n  getContentProps: IUseModalReturnValue['getContentProps'];\n  closeModal?: IUseModalReturnValue['closeModal'];\n}",signature:{properties:[{key:"getBackdropProps",value:{name:"IUseModalReturnValue['getBackdropProps']",raw:"IUseModalReturnValue['getBackdropProps']",required:!0}},{key:"getModalProps",value:{name:"IUseModalReturnValue['getModalProps']",raw:"IUseModalReturnValue['getModalProps']",required:!0}},{key:"getCloseProps",value:{name:"IUseModalReturnValue['getCloseProps']",raw:"IUseModalReturnValue['getCloseProps']",required:!0}},{key:"getTitleProps",value:{name:"IUseModalReturnValue['getTitleProps']",raw:"IUseModalReturnValue['getTitleProps']",required:!0}},{key:"getContentProps",value:{name:"IUseModalReturnValue['getContentProps']",raw:"IUseModalReturnValue['getContentProps']",required:!0}},{key:"closeModal",value:{name:"IUseModalReturnValue['closeModal']",raw:"IUseModalReturnValue['closeModal']",required:!1}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides modal render prop functions\n\n@param {function} [options.getBackdropProps] Backdrop props getter\n@param {function} [options.getModalProps] Modal dialog props getter\n@param {function} [options.getCloseProps] Modal close button props getter\n@param {function} [options.getTitleProps] Modal title props getter\n@param {function} [options.getContentProps] Modal content props getter",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseModalReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseModalReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=(0,react.forwardRef)(((_ref,ref)=>{let{isOpen,onOpen,getBackdropProps,getModalProps,getTitleProps,getContentProps,getCloseProps}=_ref;return react.createElement("div",{className:"flex items-center",style:{minHeight:240}},react.createElement("button",{className:"px-2 py-1",type:"button",onClick:onOpen},"Open"),!!isOpen&&react.createElement("div",(0,esm_extends.Z)({className:"absolute bg-grey-700 flex top-0 right-0 bottom-0 left-0 items-center justify-center"},getBackdropProps()),react.createElement("div",(0,esm_extends.Z)({className:"bg-white border border-solid p-6 relative rounded"},getModalProps(),{ref}),react.createElement("h1",(0,esm_extends.Z)({className:"mb-3 text-lg"},getTitleProps()),"Modal"),react.createElement("div",getContentProps(),react.createElement("label",null,react.createElement("span",null,"Tabbable"),react.createElement("input",{className:"block mb-2"})),react.createElement("label",null,react.createElement("span",null,"Tabbable"),react.createElement("input",{className:"block mb-2"})),react.createElement("button",{className:"mt-2 px-2 py-1",type:"button"},"Tabbable")),react.createElement("button",(0,esm_extends.Z)({className:"absolute bg-transparent border-none h-6 w-6 top-4 right-4"},getCloseProps({"aria-label":"Close modal"}),{type:"button"}),"❎"))))}));Component.displayName="Component";const Container=_ref2=>{let{isOpen,onOpen,modalRef,...props}=_ref2;return react.createElement(ModalContainer,(0,esm_extends.Z)({modalRef},props),(containerProps=>react.createElement(Component,(0,esm_extends.Z)({isOpen,onOpen},containerProps,{ref:modalRef}))))},Hook=_ref3=>{let{isOpen,onOpen,modalRef,...props}=_ref3;const hookProps=useModal({modalRef,...props});return react.createElement(Component,(0,esm_extends.Z)({isOpen,onOpen},hookProps,{ref:modalRef}))},ModalStory=_ref4=>{let{as,...props}=_ref4;return"container"===as?react.createElement(Container,props):react.createElement(Hook,props)};ModalStory.__docgenInfo={description:"",methods:[],displayName:"ModalStory"};const modal_stories={title:"Packages/Modal",component:ModalContainer},Modal={render:function Render(args){const modalRef=(0,react.useRef)(null),updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(ModalStory,(0,esm_extends.Z)({},args,{modalRef,onClose:()=>updateArgs({isOpen:!1}),onOpen:()=>updateArgs({isOpen:!0})}))},name:"Modal",args:{as:"hook",isOpen:!0,focusOnMount:!0,restoreFocus:!0},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},isOpen:{table:{category:"Story"}},modalRef:{control:!1}}},__namedExportsOrder=["Modal"];Modal.parameters={...Modal.parameters,docs:{...Modal.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const modalRef = useRef<HTMLDivElement>(null);\n    const updateArgs = useArgs()[1];\n    return <ModalStory {...args} modalRef={modalRef} onClose={() => updateArgs({\n      isOpen: false\n    })} onOpen={() => updateArgs({\n      isOpen: true\n    })} />;\n  },\n  name: 'Modal',\n  args: {\n    as: 'hook',\n    isOpen: true,\n    focusOnMount: true,\n    restoreFocus: true\n  },\n  argTypes: {\n    as: {\n      options: ['container', 'hook'],\n      control: 'radio',\n      table: {\n        category: 'Story'\n      }\n    },\n    isOpen: {\n      table: {\n        category: 'Story'\n      }\n    },\n    modalRef: {\n      control: false\n    }\n  }\n}",...Modal.parameters?.docs?.source}}}},"./packages/focusjail/src/useFocusJail.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>useFocusJail});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),tabbable__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/tabbable/dist/index.esm.js"),dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/dom-helpers/esm/activeElement.js");const useFocusJail=function(_temp){let{focusOnMount=!0,restoreFocus=!0,environment,focusElem,containerRef}=void 0===_temp?{containerRef:(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)()}:_temp;const restoreFocusElement=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),[currentRef,setCurrentRef]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(containerRef.current);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{containerRef.current!==currentRef&&setCurrentRef(containerRef.current)}));const focusElement=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((element=>{const htmlElement=element;focusElem?focusElem(htmlElement):htmlElement&&htmlElement.focus()}),[focusElem]),getInitialFocusNode=()=>{const doc=environment||document,activeElem=(0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_1__.Z)(doc),containerElem=currentRef;return containerElem.contains(activeElem)?activeElem:containerElem};return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const doc=environment||document;return restoreFocusElement.current=(0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_1__.Z)(doc),focusOnMount&&focusElement(currentRef),()=>{const isBodyInactive=restoreFocusElement.current!==doc.body,hasActiveElement=null!==restoreFocusElement.current;isBodyInactive&&hasActiveElement&&restoreFocus&&focusElement(restoreFocusElement.current)}}),[focusOnMount,restoreFocus,environment,focusElement,currentRef]),{getContainerProps:function(_temp2){let{onKeyDown,...other}=void 0===_temp2?{}:_temp2;return{onKeyDown:(0,_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_3__.M)(onKeyDown,(event=>{if(event.key!==_zendeskgarden_container_utilities__WEBPACK_IMPORTED_MODULE_4__.t.TAB)return;(()=>{if(!currentRef)throw new Error("Accessibility Error: You must apply the ref prop to your containing element.")})();const tabbableNodes=(()=>{const elements=(0,tabbable__WEBPACK_IMPORTED_MODULE_2__.ht)(currentRef);return{firstItem:elements[0]||getInitialFocusNode(),lastItem:elements[elements.length-1]||getInitialFocusNode()}})();!event.shiftKey||event.target!==tabbableNodes.firstItem&&event.target!==currentRef||(focusElement(tabbableNodes.lastItem),event.preventDefault()),event.shiftKey||event.target!==tabbableNodes.lastItem||(focusElement(tabbableNodes.firstItem),event.preventDefault())})),"data-garden-container-id":"containers.focusjail","data-garden-container-version":"storybook",...other}},focusElement}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++}}]);