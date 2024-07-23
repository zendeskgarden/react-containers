/*! For license information please see splitter-demo-splitter-mdx.4ebbb407.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[1942,7062],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}},"./packages/splitter/demo/splitter.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-splitter [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-splitter\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-splitter\n\nThis package includes containers relating to Splitter in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-splitter\n```\n\n## Usage\n\nThis container implements the [window\nsplitter](https://www.w3.org/TR/wai-aria-practices-1.1/#windowsplitter) design\npattern and can be used to build a splitter component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useSplitter\n\nThe `useSplitter` hook manages positioning and required\naccessibility attributes for the window splitting separator.\n\n```jsx\nimport {\n  useSplitter,\n  SplitterType,\n  SplitterOrientation,\n  SplitterPosition\n} from '@zendeskgarden/container-splitter';\n\nconst Splitter = () => {\n  const { getSeparatorProps, getPrimaryPaneProps, valueNow } = useSplitter({\n    label: 'primary-pane',\n    type: SplitterType.VARIABLE,\n    orientation: SplitterOrientation.VERTICAL,\n    min: 50,\n    max: 100,\n    position: SplitterPosition.TRAILS,\n    environment: window\n  });\n\n  const separatorProps = getSeparatorProps();\n  const primaryPaneProps = getPrimaryPaneProps();\n\n  return (\n    <div style={{ display: 'flex' }}>\n      <div {...primaryPaneProps} style={{ flex: `0 0 ${valueNow}px` }}>\n        <p>Primary Pane</p>\n      </div>\n      <div style={{ flex: '0 0 5px' }} {...separatorProps} />\n      <div style={{ flex: '1 1 auto' }}>\n        <p>Secondary Pane</p>\n      </div>\n    </div>\n  );\n};\n```\n\n### SplitterContainer\n\n`SplitterContainer` is a render-prop wrapper for the `useSplitter` hook.\n\n```jsx\nimport {\n  SplitterContainer,\n  SplitterType,\n  SplitterOrientation,\n  SplitterPosition\n} from '@zendeskgarden/container-splitter';\n\n<SplitterContainer\n  label=\"primary-pane\"\n  type={SplitterType.VARIABLE}\n  orientation={SplitterOrientation.VERTICAL}\n  min={50}\n  max={100}\n  position={SplitterPosition.TRAILS}\n  environment={window}\n>\n  {({ getSeparatorProps, getPrimaryPaneProps, valueNow }) => {\n    const separatorProps = getSeparatorProps();\n    const primaryPaneProps = getPrimaryPaneProps();\n\n    return (\n      <div id=\"container\" style={{ display: 'flex' }}>\n        <div {...primaryPaneProps} style={{ flex: `0 0 ${valueNow}px` }}>\n          <p>Primary Pane</p>\n        </div>\n        <div style={{ flex: '0 0 5px' }} {...separatorProps} />\n        <div style={{ flex: '1 1 auto' }}>\n          <p>Secondary Pane</p>\n        </div>\n      </div>\n    );\n  }}\n</SplitterContainer>;\n```\n";var splitter_stories=__webpack_require__("./packages/splitter/demo/splitter.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",...(0,lib.a)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:splitter_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.ZX,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:splitter_stories.Uncontrolled})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:splitter_stories.Controlled})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.a)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/splitter/demo/splitter.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Uncontrolled:()=>Uncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>splitter_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const KEYBOARD_STEP=48,normalizePointerToSeparator=function(bodyPadding,pointerPosition,separatorHeightOrWidth,viewportWidthOrHeight){return void 0===separatorHeightOrWidth&&(separatorHeightOrWidth=0),void 0===viewportWidthOrHeight&&(viewportWidthOrHeight=0),0===viewportWidthOrHeight?pointerPosition-bodyPadding-Math.floor(separatorHeightOrWidth/2):viewportWidthOrHeight-pointerPosition-bodyPadding-Math.floor(separatorHeightOrWidth/2)},xor=(a,b)=>(!a||!b)&&(a||b),useSplitter=_ref=>{let{idPrefix,environment,isFixed,min,max,orientation="vertical",keyboardStep=KEYBOARD_STEP,defaultValueNow=min,valueNow,onChange=()=>{},separatorRef,isLeading,rtl}=_ref;const primaryPaneId=`${(0,useId.M)(idPrefix)}--primary-pane`,isControlled=null!=valueNow,[state,setState]=(0,react.useState)(defaultValueNow),[separatorElement,setSeparatorElement]=(0,react.useState)(separatorRef.current),offsetRef=(0,react.useRef)({left:0,right:0,top:0,bottom:0}),separatorPosition=isControlled?valueNow:state,[lastPosition,setLastPosition]=(0,react.useState)(separatorPosition),doc=environment||document;(0,react.useEffect)((()=>{separatorRef.current!==separatorElement&&setSeparatorElement(separatorRef.current)}));const setSeparatorPosition=isControlled?onChange:setState,setRangedSeparatorPosition=(0,react.useCallback)((nextDimension=>{setSeparatorPosition(nextDimension>=max?max:nextDimension<=min?min:nextDimension)}),[max,min,setSeparatorPosition]),move=(0,react.useCallback)(((pageX,pageY)=>{if(separatorElement){const clientWidth=xor(rtl,isLeading)?doc.body.clientWidth:void 0,clientHeight=isLeading?doc.body.clientHeight:void 0;if("horizontal"===orientation){const offset=isLeading?offsetRef.current.bottom:offsetRef.current.top;setRangedSeparatorPosition(normalizePointerToSeparator(offset,pageY,separatorElement.offsetHeight,clientHeight))}else{const offset=xor(rtl,isLeading)?offsetRef.current.right:offsetRef.current.left;setRangedSeparatorPosition(normalizePointerToSeparator(offset,pageX,separatorElement.offsetWidth,clientWidth))}}}),[doc,isLeading,orientation,rtl,separatorElement,setRangedSeparatorPosition]),getSeparatorProps=(0,react.useCallback)((_ref2=>{let{role="separator",onMouseDown,onTouchStart,onKeyDown,onClick,...other}=_ref2;const onMouseMove=event=>{move(event.pageX,event.pageY)},onTouchMove=event=>{const{pageY,pageX}=event.targetTouches[0];move(pageX,pageY)},onMouseUp=()=>{doc.removeEventListener("mouseup",onMouseUp),doc.removeEventListener("mousemove",onMouseMove)},onTouchEnd=()=>{doc.removeEventListener("touchend",onTouchEnd),doc.removeEventListener("touchmove",onTouchMove)},updateOffsets=()=>{if(separatorElement){const rect=separatorElement.getBoundingClientRect(),clientWidth=doc.body.clientWidth,clientHeight=doc.body.clientHeight,win=doc.documentElement||doc.body.parentNode||doc.body;offsetRef.current.left=rect.left-separatorPosition+win.scrollLeft,offsetRef.current.right=clientWidth-rect.right-separatorPosition-win.scrollLeft,offsetRef.current.top=rect.top-separatorPosition+win.scrollTop,offsetRef.current.bottom=clientHeight-rect.bottom-separatorPosition-win.scrollTop}},handleKeyDown=event=>{if(event.key===KeyboardEventValues.t.ENTER)separatorPosition===min?setSeparatorPosition(lastPosition===min?max:lastPosition):(setLastPosition(separatorPosition),setSeparatorPosition(min));else if(event.key===KeyboardEventValues.t.HOME)separatorPosition!==min&&setLastPosition(separatorPosition),setSeparatorPosition(min);else if(event.key===KeyboardEventValues.t.END)setSeparatorPosition(max);else if(!isFixed)if(event.key===KeyboardEventValues.t.RIGHT&&"vertical"===orientation){let position;position=rtl?separatorPosition+(isLeading?keyboardStep:-keyboardStep):separatorPosition+(isLeading?-keyboardStep:keyboardStep),setRangedSeparatorPosition(position),event.preventDefault()}else if(event.key===KeyboardEventValues.t.LEFT&&"vertical"===orientation){let position;position=rtl?separatorPosition+(isLeading?-keyboardStep:keyboardStep):separatorPosition+(isLeading?keyboardStep:-keyboardStep),setRangedSeparatorPosition(position),event.preventDefault()}else event.key===KeyboardEventValues.t.UP&&"horizontal"===orientation?(setRangedSeparatorPosition(separatorPosition+(isLeading?keyboardStep:-keyboardStep)),event.preventDefault()):event.key===KeyboardEventValues.t.DOWN&&"horizontal"===orientation&&(setRangedSeparatorPosition(separatorPosition+(isLeading?-keyboardStep:keyboardStep)),event.preventDefault())},ariaValueNow=(separatorPosition-min)/(max-min)*100,ariaValueMin=isFinite(ariaValueNow)?0:min,ariaValueMax=isFinite(ariaValueNow)?100:max;return{role:null===role?void 0:role,onMouseDown:(0,composeEventHandlers.M)(onMouseDown,(()=>{isFixed||(updateOffsets(),doc.addEventListener("mouseup",onMouseUp),doc.addEventListener("mousemove",onMouseMove))})),onTouchStart:(0,composeEventHandlers.M)(onTouchStart,(()=>{isFixed||(updateOffsets(),doc.addEventListener("touchend",onTouchEnd),doc.addEventListener("touchmove",onTouchMove))})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,handleKeyDown),onClick:(0,composeEventHandlers.M)(onClick,(event=>{(isFixed||2===event.detail)&&handleKeyDown({key:KeyboardEventValues.t.ENTER})})),"aria-controls":primaryPaneId,"aria-valuenow":isFinite(ariaValueNow)?ariaValueNow:separatorPosition,"aria-valuemin":ariaValueMin,"aria-valuemax":ariaValueMax,"aria-orientation":orientation,"data-garden-container-id":"containers.splitter.separator","data-garden-container-version":"storybook",tabIndex:0,...other}}),[doc,isFixed,isLeading,keyboardStep,lastPosition,max,min,move,orientation,primaryPaneId,rtl,separatorPosition,separatorElement,setRangedSeparatorPosition,setSeparatorPosition]),getPrimaryPaneProps=(0,react.useCallback)((function(other){return void 0===other&&(other={}),{"data-garden-container-id":"containers.splitter.primaryPane","data-garden-container-version":"storybook",id:primaryPaneId,...other}}),[primaryPaneId]);return(0,react.useMemo)((()=>({getSeparatorProps,getPrimaryPaneProps,valueNow:separatorPosition})),[getSeparatorProps,getPrimaryPaneProps,separatorPosition])},SplitterContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render(useSplitter(options)))};SplitterContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,idPrefix:prop_types_default().string,environment:prop_types_default().any,isFixed:prop_types_default().bool,min:prop_types_default().number.isRequired,max:prop_types_default().number.isRequired,orientation:prop_types_default().oneOf(["horizontal","vertical"]),keyboardStep:prop_types_default().number,defaultValueNow:prop_types_default().number,valueNow:prop_types_default().number,onChange:prop_types_default().func,separatorRef:prop_types_default().any.isRequired,isLeading:prop_types_default().bool,rtl:prop_types_default().bool},SplitterContainer.defaultProps={keyboardStep:KEYBOARD_STEP,orientation:"vertical"},SplitterContainer.__docgenInfo={description:"",methods:[],displayName:"SplitterContainer",props:{idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for the splitter",type:{name:"string"}},environment:{required:!1,tsType:{name:"Document"},description:"Sets the window environment to attach events to",type:{name:"any"}},isFixed:{required:!1,tsType:{name:"boolean"},description:"Determines whether a splitter behaves in fixed or variable mode",type:{name:"bool"}},isLeading:{required:!1,tsType:{name:"boolean"},description:"Indicates whether the splitter leads or trails the primary pane",type:{name:"bool"}},rtl:{required:!1,tsType:{name:"boolean"},description:"Determines right-to-left layout",type:{name:"bool"}},orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"Determines the orientation of the splitter",defaultValue:{value:"'vertical'",computed:!1},type:{name:"enum",value:[{value:"'horizontal'",computed:!1},{value:"'vertical'",computed:!1}]}},keyboardStep:{required:!1,tsType:{name:"number"},description:"Specifies the position increment for keyboard interaction",defaultValue:{value:"48",computed:!1},type:{name:"number"}},min:{required:!0,tsType:{name:"number"},description:"Specifies the minimum permitted splitter position",type:{name:"number"}},max:{required:!0,tsType:{name:"number"},description:"Specifies the maximum permitted splitter position",type:{name:"number"}},defaultValueNow:{required:!1,tsType:{name:"number"},description:"Determines the starting position for an uncontrolled splitter",type:{name:"number"}},valueNow:{required:!1,tsType:{name:"number"},description:"Determines current position of a controlled splitter",type:{name:"number"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(valueNow: number) => void",signature:{arguments:[{type:{name:"number"},name:"valueNow"}],return:{name:"void"}}},description:"Handles splitter position changes\n\n@param valueNow The updated position",type:{name:"func"}},separatorRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"T"}],raw:"RefObject<T>"},description:"Provides ref access to the underlying separator element",type:{name:"any"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  getSeparatorProps: IUseSplitterReturnValue['getSeparatorProps'];\n  getPrimaryPaneProps: IUseSplitterReturnValue['getPrimaryPaneProps'];\n  valueNow: IUseSplitterReturnValue['valueNow'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  getSeparatorProps: IUseSplitterReturnValue['getSeparatorProps'];\n  getPrimaryPaneProps: IUseSplitterReturnValue['getPrimaryPaneProps'];\n  valueNow: IUseSplitterReturnValue['valueNow'];\n}",signature:{properties:[{key:"getSeparatorProps",value:{name:"IUseSplitterReturnValue['getSeparatorProps']",raw:"IUseSplitterReturnValue['getSeparatorProps']",required:!0}},{key:"getPrimaryPaneProps",value:{name:"IUseSplitterReturnValue['getPrimaryPaneProps']",raw:"IUseSplitterReturnValue['getPrimaryPaneProps']",required:!0}},{key:"valueNow",value:{name:"IUseSplitterReturnValue['valueNow']",raw:"IUseSplitterReturnValue['valueNow']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides splitter render prop functions\n\n@param {function} [options.getSeparatorProps] Separator props getter\n@param {function} [options.getPrimaryPaneProps] Primary pane props getter\n@param {number} [options.valueNow] Current splitter position value",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseSplitterReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseSplitterReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const Component=(0,react.forwardRef)(((_ref,ref)=>{let{getPrimaryPaneProps,getSeparatorProps,valueNow,orientation="vertical",isFixed,isLeading,rtl}=_ref;return react.createElement("div",{className:classnames_default()("border","border-solid","flex","overflow-hidden",{"flex-col":"horizontal"===orientation,"flex-row-reverse":rtl}),style:{height:"horizontal"===orientation?800:240,width:"horizontal"===orientation?240:void 0}},react.createElement("div",(0,esm_extends.Z)({className:classnames_default()("overflow-auto",{"flex-auto":isLeading,"shrink-0":!isLeading})},!isLeading&&getPrimaryPaneProps({style:{flexBasis:valueNow}})),react.createElement("div",{className:"p-4"},react.createElement("b",null,isLeading?"Secondary":"Primary"),react.createElement("p",{className:"mt-2"},"Thai tabasco pepper cremini mushrooms crumbled lentils one bowl almonds delightful blueberry scones simmer muffins red pepper jalapeño cherry pasta chocolate bruschetta."))),react.createElement("div",(0,esm_extends.Z)({className:classnames_default()("flex","flex-none","select-none",{"cursor-pointer":isFixed,"cursor-col-resize":!isFixed&&"vertical"===orientation,"cursor-row-resize":!isFixed&&"horizontal"===orientation,"w-4":"vertical"===orientation,"h-4":"horizontal"===orientation})},getSeparatorProps({"aria-label":("horizontal"===orientation?"Horizontal":"Vertical")+" splitter"}),{ref}),react.createElement("div",{className:classnames_default()("bg-blue-300","m-auto",{"h-full w-1":"vertical"===orientation,"h-1 w-full":"horizontal"===orientation})})),react.createElement("div",(0,esm_extends.Z)({className:classnames_default()("overflow-auto",{"flex-auto":!isLeading,"shrink-0":isLeading})},isLeading&&getPrimaryPaneProps({style:{flexBasis:valueNow}})),react.createElement("div",{className:"p-4"},react.createElement("b",null,isLeading?"Primary":"Secondary"),react.createElement("p",{className:"mt-2"},"Grains spring soba noodles pomegranate veggie burgers picnic cocoa green tea lime maple orange tempeh ginger tofu leek basmati double dark chocolate figs artichoke hearts raspberry fizz lemon lime minty summertime scotch bonnet pepper banana four-layer pine nuts Thai sun pepper sesame soba noodles mediterranean vegetables chocolate cookie. Udon noodles toasted hazelnuts peach strawberry mango ginger lemongrass agave green tea homemade balsamic."))))}));Component.displayName="Component";const Container=_ref2=>{let{separatorRef,...props}=_ref2;return react.createElement(SplitterContainer,(0,esm_extends.Z)({separatorRef},props),(containerProps=>react.createElement(Component,(0,esm_extends.Z)({},containerProps,{orientation:props.orientation,isFixed:props.isFixed,isLeading:props.isLeading,rtl:props.rtl,ref:separatorRef}))))},Hook=_ref3=>{let{separatorRef,...props}=_ref3;const hookProps=useSplitter({separatorRef,...props});return react.createElement(Component,(0,esm_extends.Z)({},hookProps,{orientation:props.orientation,isFixed:props.isFixed,isLeading:props.isLeading,rtl:props.rtl,ref:separatorRef}))},SplitterStory=_ref4=>{let{as,...props}=_ref4;const separatorRef=(0,react.createRef)();return"container"===as?react.createElement(Container,(0,esm_extends.Z)({},props,{separatorRef})):react.createElement(Hook,(0,esm_extends.Z)({},props,{separatorRef}))};SplitterStory.__docgenInfo={description:"",methods:[],displayName:"SplitterStory"};const splitter_stories={title:"Packages/Splitter",component:SplitterContainer,args:{as:"hook",max:700,min:200,orientation:"vertical"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},parameters:{layout:"padded"}},Uncontrolled={render:args=>react.createElement(SplitterStory,args),name:"Uncontrolled",argTypes:{valueNow:{control:!1}}},Controlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(SplitterStory,(0,esm_extends.Z)({},args,{onChange:valueNow=>updateArgs({valueNow})}))},name:"Controlled",args:{valueNow:300},argTypes:{defaultValueNow:{control:!1}}},__namedExportsOrder=["Uncontrolled","Controlled"];Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:"{\n  render: args => <SplitterStory {...args} />,\n  name: 'Uncontrolled',\n  argTypes: {\n    valueNow: {\n      control: false\n    }\n  }\n}",...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <SplitterStory {...args} onChange={valueNow => updateArgs({\n      valueNow\n    })} />;\n  },\n  name: 'Controlled',\n  args: {\n    valueNow: 300\n  },\n  argTypes: {\n    defaultValueNow: {\n      control: false\n    }\n  }\n}",...Controlled.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_SXKPGB5T_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-SXKPGB5T.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-CEH6MNVV.mjs"),__webpack_require__("@storybook/global")),storybook_internal_preview_errors__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("storybook/internal/preview-api"),__webpack_require__("storybook/internal/preview-errors")),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global;globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_SXKPGB5T_mjs__WEBPACK_IMPORTED_MODULE_0__.R6},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);