/*! For license information please see grid-demo-grid-mdx.2fb3c3d0.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[5931,5253],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>MDXProvider,a:()=>useMDXComponents});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const emptyComponents={},MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((function(){return"function"==typeof components?components(contextComponents):{...contextComponents,...components}}),[contextComponents,components])}function MDXProvider(properties){let allComponents;return allComponents=properties.disableParentContext?"function"==typeof properties.components?properties.components(emptyComponents):properties.components||emptyComponents:useMDXComponents(properties.components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},properties.children)}},"./node_modules/@reach/auto-id/dist/reach-auto-id.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var react=__webpack_require__("./node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2);function canUseDOM(){return!("undefined"==typeof window||!window.document||!window.document.createElement)}var useIsomorphicLayoutEffect=canUseDOM()?react.useLayoutEffect:react.useEffect;var serverHandoffComplete=!1,id=0;function genId(){return++id}var maybeReactUseId=react_namespaceObject["useId".toString()];function useId(providedId){if(void 0!==maybeReactUseId){let generatedId=maybeReactUseId();return providedId??generatedId}let initialId=providedId??(serverHandoffComplete?genId():null),[id2,setId]=react.useState(initialId);return useIsomorphicLayoutEffect((()=>{null===id2&&setId(genId())}),[]),react.useEffect((()=>{!1===serverHandoffComplete&&(serverHandoffComplete=!0)}),[]),providedId??id2??void 0}},"./packages/grid/demo/grid.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>MDXContent});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");const README_namespaceObject="# @zendeskgarden/container-grid [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-grid\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-grid\n\nThis package provides [Garden Design System](https://zendeskgarden.github.io/)\ngrid containers.\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-grid\n```\n\n## Usage\n\nThis container is a primitive implementation of the [WAI-ARIA\ngrid](https://www.w3.org/TR/wai-aria-practices-1.1/#grid) design pattern\n– currently emphasizing layout row/column navigation. Check out\n[storybook](https://zendeskgarden.github.io/react-containers) for live examples.\nSee the backing\n[story](https://github.com/zendeskgarden/react-containers/blob/main/packages/grid/demo/stories/GridStory.tsx)\nfor example code that demonstrates accessible layouts for both hook and\ncontainer implementations.\n";var grid_stories=__webpack_require__("./packages/grid/demo/grid.stories.tsx");function _createMdxContent(props){const _components={h1:"h1",h2:"h2",...(0,lib.a)(),...props.components};return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{of:grid_stories}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.ZX,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:grid_stories.Uncontrolled})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{of:grid_stories.Controlled})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}function MDXContent(props={}){const{wrapper:MDXLayout}={...(0,lib.a)(),...props.components};return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}},"./node_modules/@storybook/core/dist/components sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/components sync recursive",module.exports=webpackEmptyContext},"./node_modules/@storybook/core/dist/theming sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/@storybook/core/dist/theming sync recursive",module.exports=webpackEmptyContext},"./packages/grid/demo/grid.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Uncontrolled:()=>Uncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>grid_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useGrid=__webpack_require__("./packages/grid/src/useGrid.ts");const GridContainer=_ref=>{let{children,render=children,...options}=_ref;return react.createElement(react.Fragment,null,render((0,useGrid.N)(options)))};GridContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,rtl:prop_types_default().bool,wrap:prop_types_default().bool,matrix:prop_types_default().any,idPrefix:prop_types_default().string,rowIndex:prop_types_default().number,colIndex:prop_types_default().number,defaultRowIndex:prop_types_default().number,defaultColIndex:prop_types_default().number,onChange:prop_types_default().func,environment:prop_types_default().any},GridContainer.__docgenInfo={description:"",methods:[],displayName:"GridContainer",props:{matrix:{required:!1,tsType:{name:"Array",elements:[{name:"Array",elements:[{name:"unknown"}],raw:"unknown[]"}],raw:"unknown[][]"},description:"Sets the two-dimension array to render the grid",type:{name:"any"}},rtl:{required:!1,tsType:{name:"boolean"},description:"Determines if navigation uses right-to-left direction",type:{name:"bool"}},wrap:{required:!1,tsType:{name:"boolean"},description:"Enables wrapped keyboard navigation",type:{name:"bool"}},idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for the grid and cells",type:{name:"string"}},rowIndex:{required:!1,tsType:{name:"number"},description:"Sets the focused row index in a controlled grid",type:{name:"number"}},colIndex:{required:!1,tsType:{name:"number"},description:"Sets the focused column index in a controlled grid",type:{name:"number"}},defaultRowIndex:{required:!1,tsType:{name:"number"},description:"Sets the default focused row index in a uncontrolled grid",type:{name:"number"}},defaultColIndex:{required:!1,tsType:{name:"number"},description:"Sets the default focused column index in a uncontrolled grid",type:{name:"number"}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(rowIndex: number, colIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"rowIndex"},{type:{name:"number"},name:"colIndex"}],return:{name:"void"}}},description:"Handles grid change event",type:{name:"func"}},environment:{required:!1,tsType:{name:"Document"},description:"Sets the environment where the grid is rendered",type:{name:"any"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  getGridProps: IUseGridReturnValue['getGridProps'];\n  getGridCellProps: IUseGridReturnValue['getGridCellProps'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  getGridProps: IUseGridReturnValue['getGridProps'];\n  getGridCellProps: IUseGridReturnValue['getGridCellProps'];\n}",signature:{properties:[{key:"getGridProps",value:{name:"IUseGridReturnValue['getGridProps']",raw:"IUseGridReturnValue['getGridProps']",required:!0}},{key:"getGridCellProps",value:{name:"IUseGridReturnValue['getGridCellProps']",raw:"IUseGridReturnValue['getGridCellProps']",required:!0}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides grid render prop functions\n\n@param {function} [options.getGridProps] Grid props getter\n@param {function} [options.getGridCellProps] Grid cell props getter",defaultValue:{value:"children",computed:!1},type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseGridReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseGridReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");const Component=_ref=>{let{rtl,matrix,layout,"aria-label":ariaLabel,getGridProps,getGridCellProps}=_ref;return react.createElement("table",(0,esm_extends.Z)({style:{direction:rtl?"rtl":"ltr"}},getGridProps({"aria-label":ariaLabel})),react.createElement("tbody",null,matrix.map(((row,rowIndex)=>react.createElement("tr",{key:rowIndex},row.map(((column,colIndex)=>{switch(layout){case"text":{const{role,...props}=getGridCellProps({rowIndex,colIndex});return react.createElement("td",(0,esm_extends.Z)({key:colIndex,className:"w-5 h-5 text-center",role},props),matrix[rowIndex][colIndex])}case"radio":{const{role,...props}=getGridCellProps({rowIndex,colIndex}),handleBlur=event=>{if(null===event.relatedTarget){if(null!==document.querySelector(`input[name='${event.target.name}']:checked`)){document.getElementsByName(event.target.name).forEach((input=>input.setAttribute("tabIndex",input.checked?"0":"-1")))}}};return react.createElement("td",{key:colIndex,role},react.createElement("label",null,react.createElement("span",{className:"sr-only"},matrix[rowIndex][colIndex]),react.createElement("input",(0,esm_extends.Z)({className:"w-5 h-5",name:"demo",type:"radio",onBlur:handleBlur},props))))}default:{const{role,...props}=getGridCellProps({rowIndex,colIndex});return react.createElement("td",{key:colIndex,role},react.createElement("button",(0,esm_extends.Z)({className:"h-7 w-7"},props,{type:"button"}),matrix[rowIndex][colIndex]))}}})))))))},Container=_ref2=>{let{"aria-label":ariaLabel,...props}=_ref2;return react.createElement(GridContainer,props,(containerProps=>react.createElement(Component,(0,esm_extends.Z)({"aria-label":ariaLabel},containerProps,props))))},Hook=_ref3=>{let{"aria-label":ariaLabel,...props}=_ref3;const hookProps=(0,useGrid.N)(props);return react.createElement(Component,(0,esm_extends.Z)({"aria-label":ariaLabel},hookProps,props))},GridStory=_ref4=>{let{as,"aria-label":ariaLabel,...props}=_ref4;return"container"===as?react.createElement(Container,(0,esm_extends.Z)({"aria-label":ariaLabel},props)):react.createElement(Hook,(0,esm_extends.Z)({"aria-label":ariaLabel},props))};GridStory.__docgenInfo={description:"",methods:[],displayName:"GridStory"};const grid_stories={title:"Packages/Grid",component:GridContainer,args:{as:"hook",layout:"button",matrix:[[1,2,3],[4,5,6],[7,8,9]],"aria-label":"Grid"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},layout:{options:["button","radio","text"],control:"radio",table:{category:"Story"}}}},Uncontrolled={render:args=>react.createElement(GridStory,args),name:"Uncontrolled",argTypes:{colIndex:{control:!1},rowIndex:{control:!1}}},Controlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(GridStory,(0,esm_extends.Z)({},args,{onChange:(rowIndex,colIndex)=>updateArgs({rowIndex,colIndex})}))},name:"Controlled",argTypes:{defaultColIndex:{control:!1},defaultRowIndex:{control:!1}}},__namedExportsOrder=["Uncontrolled","Controlled"];Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:"{\n  render: args => <GridStory {...args} />,\n  name: 'Uncontrolled',\n  argTypes: {\n    colIndex: {\n      control: false\n    },\n    rowIndex: {\n      control: false\n    }\n  }\n}",...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <GridStory {...args} onChange={(rowIndex, colIndex) => updateArgs({\n      rowIndex,\n      colIndex\n    })} />;\n  },\n  name: 'Controlled',\n  argTypes: {\n    defaultColIndex: {\n      control: false\n    },\n    defaultRowIndex: {\n      control: false\n    }\n  }\n}",...Controlled.parameters?.docs?.source}}}},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_SXKPGB5T_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-SXKPGB5T.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-CEH6MNVV.mjs"),__webpack_require__("@storybook/global")),storybook_internal_preview_errors__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("storybook/internal/preview-api"),__webpack_require__("storybook/internal/preview-errors")),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global;globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_SXKPGB5T_mjs__WEBPACK_IMPORTED_MODULE_0__.R6},"./packages/grid/src/useGrid.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{N:()=>useGrid});var react=__webpack_require__("./node_modules/react/index.js"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),useId=__webpack_require__("./packages/utilities/src/utils/useId.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const getCellDown=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const rowCount=matrix.length,colCount=matrix[0].length,lastRowLength=matrix[rowCount-1].length;return rowIndex===rowCount-(colCount>lastRowLength?2:1)&&colIndex===colCount-1||(rowIndex===rowCount-(colIndex>=lastRowLength?2:1)?wrap&&(retVal=[0,colIndex+1]):retVal=[rowIndex+1,colIndex]),retVal},getCellLeft=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const colCount=matrix[0].length;return 0===rowIndex&&0===colIndex||(0===colIndex?wrap&&(retVal=[rowIndex-1,colCount-1]):retVal=[rowIndex,colIndex-1]),retVal},getCellRight=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const rowCount=matrix.length,colCount=matrix[0].length,lastRowIndex=rowCount-1,lastColIndex=matrix[lastRowIndex].length-1;return rowIndex===lastRowIndex&&colIndex===lastColIndex||(colIndex===colCount-1?wrap&&(retVal=[rowIndex+1,0]):retVal=[rowIndex,colIndex+1]),retVal},getCellUp=(matrix,rowIndex,colIndex,wrap)=>{let retVal=[];const rowCount=matrix.length;if(!(0===rowIndex&&0===colIndex))if(0===rowIndex){if(wrap){const col=colIndex-1;retVal=[rowCount-(col>=matrix[rowCount-1].length?2:1),col]}}else retVal=[rowIndex-1,colIndex];return retVal},getId=(idPrefix,rowIndex,colIndex)=>`${idPrefix}--R${rowIndex+1}C${colIndex+1}`,GRID_KEYS=[KeyboardEventValues.t.LEFT,KeyboardEventValues.t.RIGHT,KeyboardEventValues.t.UP,KeyboardEventValues.t.DOWN,KeyboardEventValues.t.HOME,KeyboardEventValues.t.END];function useGrid(_ref){let{rtl,wrap,matrix,idPrefix,onChange=()=>{},environment,rowIndex:controlledRowIndex,colIndex:controlledColIndex,defaultRowIndex,defaultColIndex}=_ref;const doc=environment||document,prefix=(0,useId.M)(idPrefix),[uncontrolledRowIndex,setUncontrolledRowIndex]=(0,react.useState)(null!=defaultRowIndex?defaultRowIndex:0),[uncontrolledColIndex,setUncontrolledColIndex]=(0,react.useState)(null!=defaultColIndex?defaultColIndex:0),isControlled=null!==controlledRowIndex&&null!==controlledColIndex&&void 0!==controlledRowIndex&&void 0!==controlledColIndex,rowIndex=isControlled?controlledRowIndex:uncontrolledRowIndex,colIndex=isControlled?controlledColIndex:uncontrolledColIndex;(0,react.useEffect)((()=>{const rowCount=matrix.length,colCount=matrix[0].length,isRowIndexInvalid=rowIndex>=rowCount,isColIndexInvalid=colIndex>=colCount;if(isRowIndexInvalid||isColIndexInvalid){let _rowIndex=rowIndex,_colIndex=colIndex;isRowIndexInvalid&&(_rowIndex=rowCount>0?rowCount-1:0),isColIndexInvalid&&(_colIndex=colCount>0?colCount-1:0),isControlled||(setUncontrolledRowIndex(_rowIndex),setUncontrolledColIndex(_colIndex)),onChange(_rowIndex,_colIndex)}}),[matrix,rowIndex,colIndex,isControlled,setUncontrolledColIndex,onChange]);const getGridProps=(0,react.useCallback)((_ref2=>{let{role="grid",...other}=_ref2;return{"data-garden-container-id":"containers.grid","data-garden-container-version":"storybook",role:null===role?void 0:role,...other}}),[]),getGridCellProps=(0,react.useCallback)((function(_temp){let{role="gridcell",rowIndex:_rowIndex,colIndex:_colIndex,onFocus,onKeyDown,...other}=void 0===_temp?{rowIndex:0,colIndex:0}:_temp;return{"data-garden-container-id":"containers.grid.cell","data-garden-container-version":"storybook",id:getId(prefix,_rowIndex,_colIndex),role:null===role?void 0:role,tabIndex:rowIndex===_rowIndex&&colIndex===_colIndex?0:-1,onFocus:(0,composeEventHandlers.M)(onFocus,(()=>{isControlled||(setUncontrolledRowIndex(_rowIndex),setUncontrolledColIndex(_colIndex)),onChange(_rowIndex,_colIndex)})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{if(GRID_KEYS.includes(event.key)){event.preventDefault();let row=rowIndex,col=colIndex;switch(event.key){case KeyboardEventValues.t.RIGHT:[row,col]=rtl?getCellLeft(matrix,rowIndex,colIndex,wrap):getCellRight(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.LEFT:[row,col]=rtl?getCellRight(matrix,rowIndex,colIndex,wrap):getCellLeft(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.DOWN:[row,col]=getCellDown(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.UP:[row,col]=getCellUp(matrix,rowIndex,colIndex,wrap);break;case KeyboardEventValues.t.HOME:row=event.ctrlKey?0:rowIndex,col=0;break;case KeyboardEventValues.t.END:{const lastRowIndex=matrix.length-1,lastColIndex=matrix[lastRowIndex].length-1;row=event.ctrlKey?lastRowIndex:rowIndex,col=event.ctrlKey?lastColIndex:matrix[rowIndex].length-1;break}}if(row!==rowIndex||col!==colIndex){const id=getId(prefix,row,col),element=doc.getElementById(id);element?.focus()}}})),...other}}),[matrix,rowIndex,colIndex,doc,prefix,isControlled,onChange,rtl,wrap]);return(0,react.useMemo)((()=>({getGridProps,getGridCellProps})),[getGridProps,getGridCellProps])}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{t:()=>KEYS});const KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./packages/utilities/src/utils/useId.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{M:()=>useId});var _reach_auto_id__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@reach/auto-id/dist/reach-auto-id.mjs");let idCounter=0;const useId=id=>(0,_reach_auto_id__WEBPACK_IMPORTED_MODULE_0__.M)(id)||"id:"+idCounter++},"./node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);