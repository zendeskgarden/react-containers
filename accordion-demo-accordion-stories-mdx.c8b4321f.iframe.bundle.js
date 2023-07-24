"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[683],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-S4VUQJ4A.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/accordion/demo/accordion.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{controlled:()=>controlled,default:()=>accordion_stories,uncontrolled:()=>uncontrolled});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),external_STORYBOOK_MODULE_CLIENT_API_=__webpack_require__("@storybook/client-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),generateUID=function(){var counter=1,map=new WeakMap,uid=function(item,index){return"number"==typeof item||"string"==typeof item?index?"idx-".concat(index):"val-".concat(item):map.has(item)?"uid"+map.get(item):(map.set(item,counter++),uid(item))};return uid},createSource=(generateUID(),function(prefix){return void 0===prefix&&(prefix=""),{value:1,prefix,uid:generateUID()}}),counter=createSource(),source=react.createContext(createSource()),useUIDState=function(){var context=(0,react.useContext)(source),uid=(0,react.useState)((function(){return function(context){var quartz=context||counter,prefix=function(source){return source?source.prefix:""}(quartz),id=function(source){return source.value++}(quartz),uid=prefix+id;return{uid,gen:function(item){return uid+quartz.uid(item)}}}(context)}))[0];return uid},getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts");function useAccordion(_temp){let{idPrefix,expandedSections,onChange,expandable=!0,collapsible=!0,defaultExpandedSections}=void 0===_temp?{}:_temp;const isControlled=null!=expandedSections,seed=useUIDState().gen,prefix=(0,react.useMemo)((()=>idPrefix||seed("accordion_storybook")),[idPrefix,seed]),TRIGGER_ID=`${prefix}--trigger`,PANEL_ID=`${prefix}--panel`,[expandedState,setExpandedState]=(0,react.useState)(defaultExpandedSections||[0]),controlledExpandedState=(0,getControlledValue.u)(expandedSections,expandedState),[disabledState,setDisabledState]=(0,react.useState)(collapsible?[]:expandedState),sectionIndices=[],toggle=index=>{const expanded=[],disabled=[];sectionIndices.forEach((sectionIndex=>{let isExpanded=!1;sectionIndex===index?isExpanded=!collapsible||-1===expandedState.indexOf(sectionIndex):expandable&&(isExpanded=-1!==expandedState.indexOf(sectionIndex)),isExpanded&&(expanded.push(sectionIndex),collapsible||disabled.push(sectionIndex))})),onChange&&onChange(index),!1===isControlled&&setExpandedState(expanded),setDisabledState(disabled)};return{getHeaderProps:function(_temp2){let{role="heading",ariaLevel,...props}=void 0===_temp2?{}:_temp2;if(void 0===ariaLevel)throw new Error("Accessibility Error: You must apply the `ariaLevel` prop to the element that contains your heading.");return{role,"aria-level":ariaLevel,"data-garden-container-id":"containers.accordion","data-garden-container-version":"storybook",...props}},getTriggerProps:function(_temp3){let{index,role="button",tabIndex=0,...props}=void 0===_temp3?{}:_temp3;if(void 0===index)throw new Error("Accessibility Error: You must provide an `index` option to `getTriggerProps()`");return sectionIndices.push(index),{id:`${TRIGGER_ID}:${index}`,role,tabIndex,"aria-controls":`${PANEL_ID}:${index}`,"aria-disabled":-1!==disabledState.indexOf(index),"aria-expanded":isControlled?controlledExpandedState.includes(index):expandedState.includes(index),onClick:(0,composeEventHandlers.M)(props.onClick,(()=>toggle(index))),onKeyDown:(0,composeEventHandlers.M)(props.onKeyDown,(event=>{event.keyCode!==KeyboardEventValues.n.SPACE&&event.keyCode!==KeyboardEventValues.n.ENTER||(toggle(index),event.preventDefault())})),...props}},getPanelProps:function(_temp4){let{index,role="region",...props}=void 0===_temp4?{}:_temp4;if(void 0===index)throw new Error("Accessibility Error: You must provide an `index` option to `getSectionProps()`");return{id:`${PANEL_ID}:${index}`,role,"aria-hidden":isControlled?!controlledExpandedState.includes(index):!expandedState.includes(index),"aria-labelledby":`${TRIGGER_ID}:${index}`,...props}},expandedSections:controlledExpandedState,disabledSections:disabledState}}var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const AccordionContainer=props=>{const{children,render=children,...options}=props;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render(useAccordion(options))})};AccordionContainer.defaultProps={expandable:!0,collapsible:!0},AccordionContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,expandedSections:prop_types_default().array,defaultExpandedSections:prop_types_default().array,expandable:prop_types_default().bool,collapsible:prop_types_default().bool,idPrefix:prop_types_default().string,onChange:prop_types_default().func};try{AccordionContainer.displayName="AccordionContainer",AccordionContainer.__docgenInfo={description:"",displayName:"AccordionContainer",props:{render:{defaultValue:null,description:"A render prop function which receives accordion state and prop getters",name:"render",required:!1,type:{name:"((options: IUseAccordionReturnValue) => ReactNode)"}},children:{defaultValue:null,description:"A children render prop function which receives accordion state and prop getters",name:"children",required:!1,type:{name:"(((options: IUseAccordionReturnValue) => ReactNode) & (boolean | ReactChild | ReactFragment | ReactPortal | null))"}},idPrefix:{defaultValue:null,description:"Prefixes IDs for the accordion trigger and panels",name:"idPrefix",required:!1,type:{name:"string"}},expandedSections:{defaultValue:null,description:"Sets the expanded sections in a controlled accordion",name:"expandedSections",required:!1,type:{name:"number[]"}},defaultExpandedSections:{defaultValue:null,description:"Sets the default expanded sections in a uncontrolled accordion",name:"defaultExpandedSections",required:!1,type:{name:"number[]"}},onChange:{defaultValue:null,description:"Handles accordion expansion changes",name:"onChange",required:!1,type:{name:"((expanded: number) => any)"}},expandable:{defaultValue:{value:"true"},description:"Determines if multiple panels can be expanded at the same time in an uncontrolled accordion",name:"expandable",required:!1,type:{name:"boolean"}},collapsible:{defaultValue:{value:"true"},description:"Determines if panels can be collapsed in an uncontrolled accordion",name:"collapsible",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/accordion/src/AccordionContainer.tsx#AccordionContainer"]={docgenInfo:AccordionContainer.__docgenInfo,name:"AccordionContainer",path:"packages/accordion/src/AccordionContainer.tsx#AccordionContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{sections,disabledSections,expandedSections,getHeaderProps,getTriggerProps,getPanelProps}=_ref;return(0,jsx_runtime.jsx)("div",{style:{width:300},children:sections.map(((section,index)=>{const disabled=-1!==disabledSections.indexOf(index),hidden=-1===expandedSections.indexOf(index);return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("div",{...getHeaderProps({ariaLevel:2}),children:(0,jsx_runtime.jsx)("button",{...getTriggerProps({index,role:null,tabIndex:null,disabled}),className:"text-left w-full",type:"button",children:`Trigger ${index+1}`})}),(0,jsx_runtime.jsxs)("section",{...getPanelProps({index,role:null,hidden}),children:[`[Panel ${index+1}] `,"Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic."]})]},section)}))})};Component.displayName="Component";const Container=_ref2=>{let{sections,...props}=_ref2;return(0,jsx_runtime.jsx)(AccordionContainer,{...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{sections,...containerProps})})};Container.displayName="Container";const Hook=_ref3=>{let{sections,...props}=_ref3;const hookProps=useAccordion(props);return(0,jsx_runtime.jsx)(Component,{sections,...hookProps})};Hook.displayName="Hook";const AccordionStory=_ref4=>{let{as,sections,...props}=_ref4;const Accordion=()=>{const _sections=Array.from({length:sections},((_,index)=>index));return"container"===as?(0,jsx_runtime.jsx)(Container,{sections:_sections,...props}):(0,jsx_runtime.jsx)(Hook,{sections:_sections,...props})};return(0,jsx_runtime.jsx)(Accordion,{})};AccordionStory.displayName="AccordionStory";const README_namespaceObject="# @zendeskgarden/container-accordion [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-accordion\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-accordion\n\nThis package includes containers relating to accordions in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-accordion\n```\n\n## Usage\n\nThis container implements the\n[accordion](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) design\npattern and can be used to build an accordion component. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useAccordion\n\nThe `useAccordion` hook manages toggle state and required accessibility\nattributes for a group of sections.\n\n```jsx\nimport { useAccordion } from '@zendeskgarden/container-accordion';\n\nconst Accordion = ({ expandable = true, collapsible = true } = {}) => {\n  const { getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections } =\n    useAccordion({\n      expandedSections: [0],\n      expandable,\n      collapsible\n    });\n\n  return (\n    <>\n      {sections.map((section, index) => {\n        const disabled = disabledSections.indexOf(index) !== -1;\n        const hidden = expandedSections.indexOf(index) === -1;\n\n        return (\n          <div key={index}>\n            <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>\n              <button\n                {...getTriggerProps({\n                  index,\n                  role: null,\n                  tabIndex: null,\n                  disabled,\n                  style: { width: '100%' }\n                })}\n              >\n                {index}\n              </button>\n            </h2>\n            <section\n              {...getPanelProps({\n                index,\n                role: null,\n                hidden\n              })}\n            >\n              {section}\n            </section>\n          </div>\n        );\n      })}\n    </>\n  );\n};\n\nreturn <Accordion expandable={true} collapsible={true} />;\n```\n\n### AccordionContainer\n\n`AccordionContainer` is a render-prop wrapper for the `useAccordion` hook.\n\n```jsx\nimport { AccordionContainer } from '@zendeskgarden/container-accordion';\n\nconst Accordion = ({ expandable = true, collapsible = true } = {}) => (\n  <AccordionContainer expandable={expandable} collapsible={collapsible}>\n    {({ getHeaderProps, getTriggerProps, getPanelProps, expandedSections, disabledSections }) => (\n      <>\n        {sections.map((section, index) => {\n          const disabled = disabledSections.indexOf(index) !== -1;\n          const hidden = expandedSections.indexOf(index) === -1;\n\n          return (\n            <div key={index}>\n              <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>\n                <button\n                  {...getTriggerProps({\n                    index,\n                    role: null,\n                    tabIndex: null,\n                    disabled,\n                    style: { width: '100%' }\n                  })}\n                >\n                  {index}\n                </button>\n              </h2>\n              <section\n                {...getPanelProps({\n                  index,\n                  role: null,\n                  hidden\n                })}\n              >\n                {section}\n              </section>\n            </div>\n          );\n        })}\n      </>\n    )}\n  </AccordionContainer>\n);\n\nreturn <Accordion expandable={true} collapsible={true} />;\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Accordion",component:AccordionContainer,args:{as:"hook",sections:5},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},sections:{control:{type:"range",min:1,max:9},table:{category:"Story"}}}}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Uncontrolled",args:{collapsible:!0,expandable:!0},argTypes:{expandedSections:{control:!1}},children:args=>(0,jsx_runtime.jsx)(AccordionStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Controlled",args:{expandedSections:[0]},argTypes:{defaultExpandedSections:{control:!1},collapsible:{control:!1},expandable:{control:!1}},children:args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(AccordionStory,{...args,onChange:index=>{const expandedSections=args.expandedSections.includes(index)?args.expandedSections.filter((section=>section!==index)):[...args.expandedSections,index];updateArgs({expandedSections})}})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const uncontrolled=args=>(0,jsx_runtime.jsx)(AccordionStory,{...args});uncontrolled.storyName="Uncontrolled",uncontrolled.argTypes={expandedSections:{control:!1}},uncontrolled.args={collapsible:!0,expandable:!0},uncontrolled.parameters={storySource:{source:"args => <AccordionStory {...args} />"}};const controlled=args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(AccordionStory,{...args,onChange:index=>{const expandedSections=args.expandedSections.includes(index)?args.expandedSections.filter((section=>section!==index)):[...args.expandedSections,index];updateArgs({expandedSections})}})};controlled.storyName="Controlled",controlled.argTypes={defaultExpandedSections:{control:!1},collapsible:{control:!1},expandable:{control:!1}},controlled.args={expandedSections:[0]},controlled.parameters={storySource:{source:"args => {\n  const updateArgs = useArgs()[1];\n  const handleChange = index => {\n    const expandedSections = args.expandedSections.includes(index) ? args.expandedSections.filter(section => section !== index) : [...args.expandedSections, index];\n    updateArgs({\n      expandedSections\n    });\n  };\n  return <AccordionStory {...args} onChange={handleChange} />;\n}"}};const componentMeta={title:"Packages/Accordion",component:AccordionContainer,args:{as:"hook",sections:5},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},sections:{control:{type:"range",min:1,max:9},table:{category:"Story"}}},tags:["stories-mdx"],includeStories:["uncontrolled","controlled"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const accordion_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s}}]);