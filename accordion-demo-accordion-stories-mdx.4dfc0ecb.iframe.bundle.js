/*! For license information please see accordion-demo-accordion-stories-mdx.4dfc0ecb.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[683],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/accordion/demo/accordion.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{controlled:()=>controlled,default:()=>accordion_stories,uncontrolled:()=>uncontrolled});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),external_STORYBOOK_MODULE_CLIENT_API_=__webpack_require__("@storybook/client-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts");function useAccordion(_ref){let{idPrefix,sections=[],expandedSections,defaultExpandedSections,onChange=()=>{},expandable=!0,collapsible=!0}=_ref;const prefix=(0,useId.M)(idPrefix),TRIGGER_ID=`${prefix}--trigger`,PANEL_ID=`${prefix}--panel`,isControlled=null!=expandedSections,[expandedState,setExpandedState]=(0,react.useState)(defaultExpandedSections||sections.slice(0,1)),[disabledState,setDisabledState]=(0,react.useState)(collapsible?[]:expandedState),internalExpandedState=(0,getControlledValue.u)(expandedSections,expandedState),toggle=(0,react.useCallback)((value=>{const expanded=[],disabled=[];sections.forEach((sectionValue=>{let isExpanded=!1;sectionValue===value?isExpanded=!collapsible||!1===internalExpandedState.includes(sectionValue):expandable&&(isExpanded=internalExpandedState.includes(sectionValue)),isExpanded&&(expanded.push(sectionValue),collapsible||disabled.push(sectionValue))})),onChange(value),!1===isControlled&&setExpandedState(expanded),setDisabledState(disabled)}),[sections,internalExpandedState,collapsible,expandable,isControlled,onChange]),getHeaderProps=(0,react.useCallback)((_ref2=>{let{role="heading","aria-level":ariaLevel,...props}=_ref2;return{role:null===role?void 0:role,"aria-level":ariaLevel,"data-garden-container-id":"containers.accordion","data-garden-container-version":"storybook",...props}}),[]),getTriggerProps=(0,react.useCallback)((_ref3=>{let{value,role="button",tabIndex=0,...props}=_ref3;return{id:`${TRIGGER_ID}:${value}`,role:null===role?void 0:role,tabIndex,"aria-controls":`${PANEL_ID}:${value}`,"aria-disabled":disabledState.includes(value)||void 0,"aria-expanded":internalExpandedState.includes(value),onClick:(0,composeEventHandlers.M)(props.onClick,(()=>toggle(value))),onKeyDown:(0,composeEventHandlers.M)(props.onKeyDown,(event=>{event.keyCode!==KeyboardEventValues.n.SPACE&&event.keyCode!==KeyboardEventValues.n.ENTER||(toggle(value),event.preventDefault())})),...props}}),[PANEL_ID,TRIGGER_ID,internalExpandedState,disabledState,toggle]),getPanelProps=(0,react.useCallback)((_ref4=>{let{value,role="region",...props}=_ref4;return{id:`${PANEL_ID}:${value}`,role:null===role?void 0:role,"aria-hidden":!internalExpandedState.includes(value),"aria-labelledby":`${TRIGGER_ID}:${value}`,...props}}),[PANEL_ID,TRIGGER_ID,internalExpandedState]);return(0,react.useMemo)((()=>({getHeaderProps,getTriggerProps,getPanelProps,expandedSections:internalExpandedState,disabledSections:disabledState})),[getHeaderProps,getTriggerProps,getPanelProps,internalExpandedState,disabledState])}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const AccordionContainer=props=>{const{children,render=children,...options}=props;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render(useAccordion(options))})};AccordionContainer.defaultProps={expandable:!0,collapsible:!0},AccordionContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,sections:prop_types_default().array.isRequired,expandedSections:prop_types_default().array,defaultExpandedSections:prop_types_default().array,expandable:prop_types_default().bool,collapsible:prop_types_default().bool,idPrefix:prop_types_default().string,onChange:prop_types_default().func};try{AccordionContainer.displayName="AccordionContainer",AccordionContainer.__docgenInfo={description:"",displayName:"AccordionContainer",props:{render:{defaultValue:null,description:"Provides accordion render prop functions and state\n@param options.getHeaderProps Header props getter\n@param options.getTriggerProps Trigger props getter\n@param options.getPanelProps Panel props getter\n@param options.expandedSections Current expanded sections\n@param options.disabledSections Current disabled sections",name:"render",required:!1,type:{name:'((options: { getHeaderProps: <T extends Element>(props: Omit<HTMLProps<T>, "role" | "aria-level"> & { role?: "heading" | null; \'aria-level\': number; }) => HTMLProps<...>; getTriggerProps: <T extends Element>(props: Omit<...> & { ...; }) => HTMLProps<...>; getPanelProps: <T extends Element>(props: Omit<.....'}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"((options: IUseAccordionReturnValue<any>) => ReactNode)"}},idPrefix:{defaultValue:null,description:"Prefixes IDs for the accordion trigger and panels",name:"idPrefix",required:!1,type:{name:"string"}},sections:{defaultValue:null,description:"Provides an ordered list of unique section values",name:"sections",required:!0,type:{name:"any[]"}},expandedSections:{defaultValue:null,description:"Sets the expanded sections in a controlled accordion",name:"expandedSections",required:!1,type:{name:"any[]"}},defaultExpandedSections:{defaultValue:null,description:"Sets the default expanded sections in a uncontrolled accordion",name:"defaultExpandedSections",required:!1,type:{name:"any[]"}},onChange:{defaultValue:null,description:"Handles accordion expansion changes",name:"onChange",required:!1,type:{name:"((expanded: any) => void)"}},expandable:{defaultValue:{value:"true"},description:"Determines if multiple panels can be expanded at the same time in an uncontrolled accordion",name:"expandable",required:!1,type:{name:"boolean"}},collapsible:{defaultValue:{value:"true"},description:"Determines if panels can be collapsed in an uncontrolled accordion",name:"collapsible",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/accordion/src/AccordionContainer.tsx#AccordionContainer"]={docgenInfo:AccordionContainer.__docgenInfo,name:"AccordionContainer",path:"packages/accordion/src/AccordionContainer.tsx#AccordionContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{sections,disabledSections,expandedSections,getHeaderProps,getTriggerProps,getPanelProps}=_ref;return(0,jsx_runtime.jsx)("div",{style:{width:300},children:sections.map(((value,index)=>{const disabled=-1!==disabledSections.indexOf(value),hidden=-1===expandedSections.indexOf(value);return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("div",{...getHeaderProps({"aria-level":2}),children:(0,jsx_runtime.jsx)("button",{...getTriggerProps({value,role:null,disabled}),className:"text-left w-full",type:"button",children:`Trigger ${index+1}`})}),(0,jsx_runtime.jsxs)("section",{...getPanelProps({value,role:null,hidden}),children:[`[Panel ${index+1}] `,"Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic."]})]},value)}))})};Component.displayName="Component";const Container=props=>(0,jsx_runtime.jsx)(AccordionContainer,{...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{sections:props.sections,...containerProps})});Container.displayName="Container";const Hook=props=>{const hookProps=useAccordion(props);return(0,jsx_runtime.jsx)(Component,{sections:props.sections,...hookProps})};Hook.displayName="Hook";const AccordionStory=_ref2=>{let{as,...props}=_ref2;const Accordion=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{...props}):(0,jsx_runtime.jsx)(Hook,{...props});return(0,jsx_runtime.jsx)(Accordion,{})};AccordionStory.displayName="AccordionStory";const SECTIONS=["section-1","section-2","section-3","section-4","section-5"],README_namespaceObject="# @zendeskgarden/container-accordion [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-accordion\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-accordion\n\nThis package includes containers relating to accordions in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-accordion\n```\n\n## Usage\n\nThis container implements the\n[accordion](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) design\npattern and can be used to build an accordion component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useAccordion\n\nThe `useAccordion` hook manages toggle state and required accessibility\nattributes for a group of sections.\n\n```jsx\nimport { useAccordion } from '@zendeskgarden/container-accordion';\n\nconst Accordion = ({ sections = [0, 1, 2], expandable = true, collapsible = true } = {}) => {\n  const { getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections } =\n    useAccordion({\n      sections,\n      expandedSections: [0],\n      expandable,\n      collapsible\n    });\n\n  return (\n    <>\n      {sections.map((section, index) => {\n        const disabled = disabledSections.indexOf(index) !== -1;\n        const hidden = expandedSections.indexOf(index) === -1;\n\n        return (\n          <div key={index}>\n            <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>\n              <button\n                {...getTriggerProps({\n                  index,\n                  role: null,\n                  tabIndex: null,\n                  disabled,\n                  style: { width: '100%' }\n                })}\n              >\n                {index}\n              </button>\n            </h2>\n            <section\n              {...getPanelProps({\n                index,\n                role: null,\n                hidden\n              })}\n            >\n              {section}\n            </section>\n          </div>\n        );\n      })}\n    </>\n  );\n};\n\nreturn <Accordion expandable={true} collapsible={true} />;\n```\n\n### AccordionContainer\n\n`AccordionContainer` is a render-prop wrapper for the `useAccordion` hook.\n\n```jsx\nimport { AccordionContainer } from '@zendeskgarden/container-accordion';\n\nconst Accordion = ({ sections = [0, 1, 2], expandable = true, collapsible = true } = {}) => (\n  <AccordionContainer sections={sections} expandable={expandable} collapsible={collapsible}>\n    {({ getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections }) => (\n      <>\n        {sections.map((section, index) => {\n          const disabled = disabledSections.indexOf(index) !== -1;\n          const hidden = expandedSections.indexOf(index) === -1;\n\n          return (\n            <div key={index}>\n              <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>\n                <button\n                  {...getTriggerProps({\n                    index,\n                    role: null,\n                    tabIndex: null,\n                    disabled,\n                    style: { width: '100%' }\n                  })}\n                >\n                  {index}\n                </button>\n              </h2>\n              <section\n                {...getPanelProps({\n                  index,\n                  role: null,\n                  hidden\n                })}\n              >\n                {section}\n              </section>\n            </div>\n          );\n        })}\n      </>\n    )}\n  </AccordionContainer>\n);\n\nreturn <Accordion expandable={true} collapsible={true} />;\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Accordion",component:AccordionContainer,args:{as:"hook",sections:SECTIONS},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}}}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Uncontrolled",args:{collapsible:!0,expandable:!0},argTypes:{expandedSections:{control:!1}},children:args=>(0,jsx_runtime.jsx)(AccordionStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Controlled",args:{expandedSections:SECTIONS.slice(0,1)},argTypes:{defaultExpandedSections:{control:!1},collapsible:{control:!1},expandable:{control:!1}},children:args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(AccordionStory,{...args,onChange:value=>{const expandedSections=args.expandedSections.includes(value)?args.expandedSections.filter((section=>section!==value)):[...args.expandedSections,value];updateArgs({expandedSections})}})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const uncontrolled=args=>(0,jsx_runtime.jsx)(AccordionStory,{...args});uncontrolled.storyName="Uncontrolled",uncontrolled.argTypes={expandedSections:{control:!1}},uncontrolled.args={collapsible:!0,expandable:!0},uncontrolled.parameters={storySource:{source:"args => <AccordionStory {...args} />"}};const controlled=args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(AccordionStory,{...args,onChange:value=>{const expandedSections=args.expandedSections.includes(value)?args.expandedSections.filter((section=>section!==value)):[...args.expandedSections,value];updateArgs({expandedSections})}})};controlled.storyName="Controlled",controlled.argTypes={defaultExpandedSections:{control:!1},collapsible:{control:!1},expandable:{control:!1}},controlled.args={expandedSections:SECTIONS.slice(0,1)},controlled.parameters={storySource:{source:"args => {\n  const updateArgs = useArgs()[1];\n  const handleChange = value => {\n    const expandedSections = args.expandedSections.includes(value) ? args.expandedSections.filter(section => section !== value) : [...args.expandedSections, value];\n    updateArgs({\n      expandedSections\n    });\n  };\n  return <AccordionStory {...args} onChange={handleChange} />;\n}"}};const componentMeta={title:"Packages/Accordion",component:AccordionContainer,args:{as:"hook",sections:SECTIONS},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}}},tags:["stories-mdx"],includeStories:["uncontrolled","controlled"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const accordion_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/global"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_1__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_2__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/utilities/node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++},"./packages/utilities/node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}}}]);