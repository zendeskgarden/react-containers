/*! For license information please see treeview-demo-treeview-stories-mdx.7c6446dc.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[295],{"./node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{NF:()=>withMDXComponents,Zo:()=>MDXProvider,ah:()=>useMDXComponents,pC:()=>MDXContext});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"./node_modules/@storybook/addon-docs/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$4:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.$4,UG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.UG,Xz:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.Xz,h_:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.h_,oG:()=>_storybook_blocks__WEBPACK_IMPORTED_MODULE_1__.oG});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-PCJTTTQV.mjs");var _storybook_blocks__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs")},"./packages/treeview/demo/treeview.stories.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{controlled:()=>controlled,default:()=>treeview_stories,uncontrolled:()=>uncontrolled});var react=__webpack_require__("./node_modules/react/index.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/addon-docs/dist/index.mjs"),external_STORYBOOK_MODULE_CLIENT_API_=__webpack_require__("@storybook/client-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts"),useSelection=__webpack_require__("./packages/selection/src/useSelection.ts");let DocumentPosition=function(DocumentPosition){return DocumentPosition[DocumentPosition.DISCONNECTED=1]="DISCONNECTED",DocumentPosition[DocumentPosition.PRECEDING=2]="PRECEDING",DocumentPosition[DocumentPosition.FOLLOWING=4]="FOLLOWING",DocumentPosition[DocumentPosition.CONTAINS=8]="CONTAINS",DocumentPosition[DocumentPosition.CONTAINED_BY=16]="CONTAINED_BY",DocumentPosition[DocumentPosition.IMPLEMENTATION_SPECIFIC=32]="IMPLEMENTATION_SPECIFIC",DocumentPosition}({});const getParentTree=target=>target.closest('[role="tree"]'),getParentNode=target=>{const parent=target.closest('[role="treeitem"][aria-expanded]');return null!==parent&&target.isSameNode(parent)?getParentNode(target.parentNode):parent},handleArrowDown=target=>{const treeElement=getParentTree(target);if(null===treeElement)return;const isTargetOpened="treeitem"===(treeItem=target).getAttribute("role")&&treeItem.hasAttribute("aria-expanded")&&"true"===target.getAttribute("aria-expanded");var treeItem;const eligibleNodes=treeElement.querySelectorAll('[role="tree"] > [role="treeitem"], [role="treeitem"][aria-expanded="true"] [role="treeitem"]');for(const node of eligibleNodes){if(node.isSameNode(target)||!(node instanceof HTMLElement))continue;const positionHierarchy=target.compareDocumentPosition(node);if(isTargetOpened&&positionHierarchy&DocumentPosition.CONTAINED_BY)return void node.focus();if(positionHierarchy===DocumentPosition.FOLLOWING)return void node.focus()}},handleArrowRight=target=>{if((target=>target instanceof HTMLElement&&"treeitem"===target.getAttribute("role")&&!target.hasAttribute("aria-expanded"))(target))return;if(!("true"===target.getAttribute("aria-expanded")))return;const firstNode=target.querySelector('[role="treeitem"]:first-child');null!==firstNode&&firstNode.focus()},handleArrowUp=target=>{const treeElement=getParentTree(target);if(null===treeElement)return;const eligibleNodes=treeElement.querySelectorAll('[role="tree"] > [role="treeitem"], [role="treeitem"][aria-expanded="true"] [role="treeitem"]');for(let i=eligibleNodes.length-1,node=eligibleNodes.item(i);i>=0;node=eligibleNodes.item(--i)){if(target.isSameNode(node)||!(node instanceof HTMLElement))continue;if(target.compareDocumentPosition(node)&DocumentPosition.FOLLOWING)continue;const parentOfNode=getParentNode(node);if((!parentOfNode||!target.isSameNode(parentOfNode))&&(!parentOfNode||"false"!==parentOfNode.getAttribute("aria-expanded"))){node.focus();break}}},handleEnd=target=>{const treeElement=getParentTree(target);if(null===treeElement)return;const eligibleNodes=treeElement.querySelectorAll('[role="tree"] > [role="treeitem"]:last-of-type, [role="treeitem"][aria-expanded="true"] [role="treeitem"]:last-of-type');for(let i=eligibleNodes.length-1,node=eligibleNodes.item(i);i>=0;node=eligibleNodes.item(i--)){if(!(node instanceof HTMLElement))continue;const parentOfNode=getParentNode(node);if(parentOfNode&&parentOfNode.isSameNode(node))return void node.focus();if(!parentOfNode||parentOfNode.isSameNode(node)||"false"!==parentOfNode.getAttribute("aria-expanded")){if(target.isSameNode(node))return;return void node.focus()}}},handleHome=target=>{const treeElement=getParentTree(target);if(null===treeElement)return;const firstNode=treeElement.querySelector('[role="treeitem"]:first-of-type');null!==firstNode&&firstNode.focus()},SUPPORTED_KEYS=[KeyboardEventValues.t.ENTER,KeyboardEventValues.t.HOME,KeyboardEventValues.t.END,KeyboardEventValues.t.UP,KeyboardEventValues.t.DOWN,KeyboardEventValues.t.RIGHT,KeyboardEventValues.t.LEFT],useTreeview=function(_temp){let{orientation="vertical",openNodes,rtl,onChange=()=>{},...options}=void 0===_temp?{}:_temp;const[ownFocusedItem,setOwnFocusedItem]=(0,react.useState)(),{selectedItem,focusedItem,getContainerProps,getItemProps}=(0,useSelection.c)({focusedItem:ownFocusedItem,direction:orientation,...options}),[openNodesState,setOpenNodesState]=(0,react.useState)([]),controlledOpenedState=(0,getControlledValue.u)(openNodes,Array.from(openNodesState)),isControlled=null!=openNodes,toggleParent=item=>{const newValue=controlledOpenedState.includes(item)?controlledOpenedState.filter((i=>i!==item)):[...controlledOpenedState,item];onChange(newValue),isControlled||setOpenNodesState(newValue)};return{selectedItem,focusedItem,openNodes:Array.from(openNodesState),getTreeProps:_ref=>{let{role="tree",...other}=_ref;return{...getContainerProps(other),role:null===role?void 0:role,"aria-orientation":orientation,"data-garden-container-id":"containers.treeview","data-garden-container-version":"storybook"}},getNodeProps:_ref2=>{let{item,role="treeitem",nodeType="end",onClick,onFocus,onKeyDown,focusRef,...other}=_ref2;const expanded="parent"===nodeType?(item=>!!item&&controlledOpenedState.includes(item))(item):void 0,handleClick=(0,composeEventHandlers.M)(onClick,(event=>{"parent"===nodeType?(event.preventDefault(),toggleParent(item)):event.stopPropagation()}));return{...getItemProps({item,focusRef,onClick:handleClick,onFocus:(0,composeEventHandlers.M)(onFocus,(event=>{event.stopPropagation(),setOwnFocusedItem(item)})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{const target=focusRef.current;if(!SUPPORTED_KEYS.includes(event.key)||((e=event).ctrlKey||e.metaKey||e.shiftKey||e.altKey))return;var e;event.preventDefault();const handleRight=()=>"parent"===nodeType&&expanded?handleArrowRight(target):toggleParent(item),handleLeft=()=>"parent"===nodeType&&expanded?toggleParent(item):(target=>{const parentNode=getParentNode(target);null===parentNode||parentNode.isSameNode(target)||parentNode.focus()})(target),handleEnter=()=>{"parent"===nodeType&&toggleParent(item),handleClick(event)},shortcutMappingElement={[KeyboardEventValues.t.UP]:{vertical:handleArrowUp,horizontal:handleLeft},[KeyboardEventValues.t.DOWN]:{vertical:handleArrowDown,horizontal:handleRight},[KeyboardEventValues.t.RIGHT]:{vertical:rtl?handleLeft:handleRight,horizontal:rtl?handleArrowUp:handleArrowDown},[KeyboardEventValues.t.LEFT]:{vertical:rtl?handleRight:handleLeft,horizontal:rtl?handleArrowDown:handleArrowUp},[KeyboardEventValues.t.HOME]:{vertical:handleHome,horizontal:handleHome},[KeyboardEventValues.t.END]:{vertical:handleEnd,horizontal:handleEnd},[KeyboardEventValues.t.ENTER]:{vertical:handleEnter,horizontal:handleEnter}}[event.key],handler="vertical"===orientation?shortcutMappingElement.vertical:shortcutMappingElement.horizontal;handler&&handler(target)})),...other}),role:null===role?void 0:role,"aria-expanded":expanded,tabIndex:void 0===ownFocusedItem||ownFocusedItem===item?0:-1,"data-garden-container-version":"storybook"}},getGroupProps:function(_temp2){let{role="group",...props}=void 0===_temp2?{}:_temp2;return{role:null===role?void 0:role,"data-garden-container-version":"storybook",...props}}}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TreeviewContainer=_ref=>{let{children,render=children,...options}=_ref;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:render(useTreeview(options))})};TreeviewContainer.defaultProps={orientation:"vertical"},TreeviewContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,openNodes:prop_types_default().array,rtl:prop_types_default().bool,orientation:prop_types_default().oneOf(["horizontal","vertical"]),onChange:prop_types_default().func,defaultSelectedIndex:prop_types_default().number,selectedItem:prop_types_default().any,onSelect:prop_types_default().func};try{TreeviewContainer.displayName="TreeviewContainer",TreeviewContainer.__docgenInfo={description:"",displayName:"TreeviewContainer",props:{render:{defaultValue:null,description:"Provides treeview render prop state and functions\n@param options.focusedItem Controlled focused item\n@param options.selectedItem Controlled selected item\n@param options.openNodes Controlled open nodes\n@param options.getTreeProps Tree props getter\n@param options.getNodeProps Node props getter\n@param options.getGroupProps Group props getter",name:"render",required:!1,type:{name:'((options: { focusedItem?: any; selectedItem?: any; openNodes: any[]; getTreeProps: <T extends Element>(props: Omit<HTMLProps<T>, "aria-label" | "role"> & { \'aria-label\': string; role?: "tree" | ... 1 more ...; }) => HTMLProps<...>; getNodeProps: <T extends Element>(props: Omit<...> & { ...; }) => HTMLPr...'}},children:{defaultValue:null,description:"@ignore",name:"children",required:!1,type:{name:"(((options: IUseTreeviewReturnValue<any>) => ReactNode) & (boolean | ReactChild | ReactFragment | ReactPortal | null))"}},orientation:{defaultValue:null,description:"Determines the orientation of the tree",name:"orientation",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},openNodes:{defaultValue:null,description:"Determines which sections are expanded in a controlled treeview",name:"openNodes",required:!1,type:{name:"any[]"}},onChange:{defaultValue:null,description:"Handles node expansion changes\n@param expandedNodes The list of currently expanded nodes",name:"onChange",required:!1,type:{name:"((expandedNodes: any[]) => void)"}},defaultFocusedIndex:{defaultValue:null,description:"Sets the initial focused item",name:"defaultFocusedIndex",required:!1,type:{name:"number"}},defaultSelectedIndex:{defaultValue:null,description:"Sets the initial selected item",name:"defaultSelectedIndex",required:!1,type:{name:"number"}},rtl:{defaultValue:null,description:"Determines right-to-left layout",name:"rtl",required:!1,type:{name:"boolean"}},selectedItem:{defaultValue:null,description:"Sets controlled item selection",name:"selectedItem",required:!1,type:{name:"any"}},focusedItem:{defaultValue:null,description:"Sets controlled item focus",name:"focusedItem",required:!1,type:{name:"any"}},onSelect:{defaultValue:null,description:"Handles controlled item selection\n@param selectedItem The selected item",name:"onSelect",required:!1,type:{name:"((selectedItem: any) => void)"}},onFocus:{defaultValue:null,description:"Handles controlled item focus\n@param focusedItem The focused item",name:"onFocus",required:!1,type:{name:"((focusedItem?: any) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/treeview/src/TreeviewContainer.tsx#TreeviewContainer"]={docgenInfo:TreeviewContainer.__docgenInfo,name:"TreeviewContainer",path:"packages/treeview/src/TreeviewContainer.tsx#TreeviewContainer"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const Node=_ref=>{let{treeNode,orientation,rtl,getNodeProps,getGroupProps,level=1}=_ref;const nodeProps=getNodeProps({focusRef:(0,react.createRef)(),item:treeNode.name,nodeType:treeNode.children?"parent":"end"}),className=treeNode.children?"cursor-pointer":"cursor-default",nameClassName=classnames_default()("px-2","py-1",{"bg-blue-300":nodeProps["aria-selected"]}),parentClassName=classnames_default()({flex:"horizontal"===orientation,"pl-5":!rtl,"pr-5":rtl});return(0,jsx_runtime.jsx)("li",{className,...nodeProps,children:treeNode.children?(0,jsx_runtime.jsxs)("details",{open:nodeProps["aria-expanded"],children:[(0,jsx_runtime.jsx)("summary",{className:nameClassName,children:treeNode.name}),(0,jsx_runtime.jsx)("ul",{className:parentClassName,...getGroupProps(),children:treeNode.children.map(((node,index)=>(0,jsx_runtime.jsx)(Node,{treeNode:node,orientation,rtl,getNodeProps,getGroupProps,level:level+1},`${level}${index}`)))})]}):(0,jsx_runtime.jsx)("div",{className:nameClassName,children:treeNode.name})})};Node.displayName="Node";const Component=_ref2=>{let{getTreeProps,tree,orientation,rtl,"aria-label":ariaLabel,...props}=_ref2;return(0,jsx_runtime.jsx)("ul",{className:classnames_default()("overflow-auto","p-1",{flex:"horizontal"===orientation}),style:{direction:rtl?"rtl":"ltr"},...getTreeProps({"aria-label":ariaLabel}),children:tree.map(((node,index)=>(0,jsx_runtime.jsx)(Node,{treeNode:node,orientation,rtl,...props},index)))})};Component.displayName="Component";const Container=_ref3=>{let{tree,"aria-label":ariaLabel,...props}=_ref3;return(0,jsx_runtime.jsx)(TreeviewContainer,{...props,children:containerProps=>(0,jsx_runtime.jsx)(Component,{tree,orientation:props.orientation,rtl:props.rtl,"aria-label":ariaLabel,...containerProps})})};Container.displayName="Container";const Hook=_ref4=>{let{tree,"aria-label":ariaLabel,...props}=_ref4;const hookProps=useTreeview(props);return(0,jsx_runtime.jsx)(Component,{tree,orientation:props.orientation,rtl:props.rtl,"aria-label":ariaLabel,...hookProps})};Hook.displayName="Hook";const TreeviewStory=_ref5=>{let{as,tree,...props}=_ref5;const Treeview=()=>"container"===as?(0,jsx_runtime.jsx)(Container,{tree,...props}):(0,jsx_runtime.jsx)(Hook,{tree,...props});return(0,jsx_runtime.jsx)(Treeview,{})};TreeviewStory.displayName="TreeviewStory";const TREE=[{name:"Fruits",children:[{name:"Oranges"},{name:"Pineapple"},{name:"Apples",children:[{name:"Macintosh"},{name:"Granny Smith"},{name:"Fuji"}]},{name:"Bananas"},{name:"Pears",children:[{name:"Anjou"},{name:"Bartlett"},{name:"Bosc"},{name:"Concorde"},{name:"Seckel"},{name:"Starkrimson"}]}]},{name:"Vegetables",children:[{name:"Podded Vegetables",children:[{name:"Lentil"},{name:"Pea"},{name:"Peanut"}]},{name:"Bulb and Stem Vegetables",children:[{name:"Asparagus"},{name:"Celery"},{name:"Leek"},{name:"Onion"}]},{name:"Root and Tuberous Vegetables",children:[{name:"Carrot"},{name:"Ginger"},{name:"Parsnip"},{name:"Potato"}]}]},{name:"Grains",children:[{name:"Cereal Grains",children:[{name:"Barley"},{name:"Oats"},{name:"Rice"}]},{name:"Pseudocereal Grains",children:[{name:"Amaranth"},{name:"Buckwheat"},{name:"Chia"},{name:"Quinoa"}]},{name:"Oilseeds",children:[{name:"India Mustard"},{name:"Safflower"},{name:"Flax Seed"},{name:"Poppy Seed"}]}]}],README_namespaceObject="# @zendeskgarden/container-treeview [![npm version][npm version badge]][npm version link]\n\n[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-treeview\n[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-treeview\n\nThis package includes containers relating to Treeview in the\n[Garden Design System](https://zendeskgarden.github.io/).\n\nThis package offers a headless implementation to\n[W3C TreeView Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView) and offers\n[accessible navigation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-2/treeview-2a.html#kbd_label)\n\n## WAI-ARIA support\n\nFor a vertically oriented tree (horizontal and RTL are supported as well):\n\n### [Keyboard interactions](https://www.w3.org/TR/wai-aria-practices-1.1/#keyboard-interaction-22)\n\n- When a single-select tree receives focus:\n  - If none of the nodes are selected before the tree receives focus, focus is set on the first node.\n  - If a node is selected before the tree receives focus, focus is set on the selected node.\n- ❌ When a multi-select tree receives focus:\n  - If none of the nodes are selected before the tree receives focus, focus is set on the first\n    node.\n  - If one or more nodes are selected before the tree receives focus, focus is set on the first\n    selected node.\n- ✅ `Right arrow`:\n  - When focus is on a closed node, opens the node; focus does not move.\n  - When focus is on a open node, moves focus to the first child node.\n  - When focus is on an end node, does nothing.\n- ✅ `Left arrow`:\n  - When focus is on an open node, closes the node.\n  - When focus is on a child node that is also either an end node or a closed node, moves focus\n    to its parent node.\n  - When focus is on a root node that is also either an end node or a closed node, does nothing.\n- ✅ `Down Arrow`: Moves focus to the next node that is focusable without opening or closing a node.\n- ✅ `Up Arrow`: Moves focus to the previous node that is focusable without opening or closing a\n  node.\n- ✅ `Home`: Moves focus to the first node in the tree without opening or closing a node.\n- ✅ `End`: Moves focus to the last node in the tree that is focusable without opening a node.\n- ✅ `Enter`: activates a node, i.e., performs its default action. For parent nodes, one possible\n  default action is to open or close the node. In single-select trees where selection does not\n  follow focus (see note below), the default action is typically to select the focused node.\n- ❌ Type-ahead is recommended for all trees, especially for trees with more than 7 root nodes:\n  - Type a character: focus moves to the next node with a name that starts with the typed character.\n  - Type multiple characters in rapid succession: focus moves to the next node with a name that\n    starts with the string of characters typed.\n- ❌ `*` (Optional): Expands all siblings that are at the same level as the current node.\n- ❌ **Selection in multi-select trees:**\n\n### [WAI-ARIA Roles, States, and Properties](https://www.w3.org/TR/wai-aria-practices-1.1/#tree_roles_states_props)\n\n- ✅ All tree nodes are contained in or owned by an element with role `tree`.\n- ✅ Each element serving as a `tree` node has role `treeitem`.\n- ✅ Each root node is contained in the element with role `tree` or **❌❓referenced by an `aria-owns`\n  property set on the `tree` element.**\n- ✅ Each parent node contains or owns an element with role `group`.\n- ✅ Each child node is contained in or owned by an element with role `group` that is contained in or\n  owned by the node that serves as the parent of that child.\n- ✅ Each element with role `treeitem` that serves as a parent node has `aria-expanded` set to false\n  when the node is in a closed state and set to true when the node is in an open state. End nodes do\n  not have the `aria-expanded` attribute because, if they were to have it, they would be incorrectly\n  described to assistive technologies as parent nodes.\n- ❌ The `tree` role supports the aria-activedescendant property, which provides an alternative to\n  moving DOM focus among `treeitem` elements when implementing keyboard navigation.\n- ❌ If the `tree` supports selection of more than one node, the element with role `tree`\n  has `aria-multiselectable` set to true. Otherwise, `aria-multiselectable` is either set to false\n  or the default value of false is implied.\n- ❌ If the `tree` does not support multiple selection, `aria-selected` is set to true for the\n  selected node and it is not present on any other node in the tree.\n- ❌ if the `tree` supports multiple selection:\n  - All selected nodes have `aria-selected` set to true.\n  - All nodes that are selectable but not selected have `aria-selected` set to false.\n  - If the `tree` contains nodes that are not selectable, those nodes do not have\n    the `aria-selected` state.\n- ✅ ❓The element with role `tree` has either a visible label referenced by `aria-labelledby` or a\n  value specified for `aria-label`.\n- ❌ If the complete set of available nodes is not present in the DOM due to dynamic loading as the\n  user moves focus in or scrolls the tree, each node has `aria-level`, `aria-setsize`,\n  and `aria-posinset` specified.\n- ✅ If the `tree` element is horizontally oriented, it has `aria-orientation` set to `horizontal`.\n  The default value of `aria-orientation` for a tree is `vertical`.\n\n## Installation\n\n```sh\nnpm install @zendeskgarden/container-treeview\n```\n\n## Usage\n\nCheck out [storybook](https://zendeskgarden.github.io/react-containers) for live examples.\n\n### useTreeview\n\n```jsx\nimport { useTreeview } from '@zendeskgarden/container-treeview';\n\nconst Treeview = () => {\n  const { getTreeviewProps } = useTreeview();\n\n  return <div {...getTreeviewProps()} />;\n};\n```\n\n### TreeviewContainer\n\n```jsx\nimport { TreeviewContainer } from '@zendeskgarden/container-treeview';\n\n<TreeviewContainer>{({ getTreeviewProps }) => <div {...getTreeviewProps()} />}</TreeviewContainer>;\n```\n";function _createMdxContent(props){const _components=Object.assign({h1:"h1",h2:"h2"},(0,lib.ah)(),props.components);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Packages/Treeview",component:TreeviewContainer,args:{as:"hook",tree:TREE,"aria-label":"Treeview"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},tree:{table:{category:"Story"}}},parameters:{layout:"padded"}}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"api",children:"API"}),"\n",(0,jsx_runtime.jsx)(dist.$4,{}),"\n",(0,jsx_runtime.jsx)(_components.h1,{id:"demo",children:"Demo"}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"uncontrolled",children:"Uncontrolled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Uncontrolled",argTypes:{openNodes:{control:!1},selectedItem:{control:!1}},children:args=>(0,jsx_runtime.jsx)(TreeviewStory,{...args})})}),"\n",(0,jsx_runtime.jsx)(_components.h2,{id:"controlled",children:"Controlled"}),"\n",(0,jsx_runtime.jsx)(dist.Xz,{children:(0,jsx_runtime.jsx)(dist.oG,{name:"Controlled",argTypes:{defaultSelectedIndex:{control:!1}},children:args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(TreeviewStory,{...args,onChange:openNodes=>updateArgs({openNodes}),onSelect:selectedItem=>updateArgs({selectedItem})})}})}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:README_namespaceObject})]})}const uncontrolled=args=>(0,jsx_runtime.jsx)(TreeviewStory,{...args});uncontrolled.storyName="Uncontrolled",uncontrolled.argTypes={openNodes:{control:!1},selectedItem:{control:!1}},uncontrolled.parameters={storySource:{source:"args => <TreeviewStory {...args} />"}};const controlled=args=>{const updateArgs=(0,external_STORYBOOK_MODULE_CLIENT_API_.useArgs)()[1];return(0,jsx_runtime.jsx)(TreeviewStory,{...args,onChange:openNodes=>updateArgs({openNodes}),onSelect:selectedItem=>updateArgs({selectedItem})})};controlled.storyName="Controlled",controlled.argTypes={defaultSelectedIndex:{control:!1}},controlled.parameters={storySource:{source:"args => {\n  const updateArgs = useArgs()[1];\n  const handleOnChange = openNodes => updateArgs({\n    openNodes\n  });\n  const handleSelect = selectedItem => updateArgs({\n    selectedItem\n  });\n  return <TreeviewStory {...args} onChange={handleOnChange} onSelect={handleSelect} />;\n}"}};const componentMeta={title:"Packages/Treeview",parameters:{layout:"padded"},component:TreeviewContainer,args:{as:"hook",tree:TREE,"aria-label":"Treeview"},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},tree:{table:{category:"Story"}}},tags:["stories-mdx"],includeStories:["uncontrolled","controlled"]};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,{...props,children:(0,jsx_runtime.jsx)(_createMdxContent,{...props})}):_createMdxContent(props)}};const treeview_stories=componentMeta},"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-JWY6Y6NU.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@storybook/global/dist/index.mjs"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{window:globalWindow}=(__webpack_require__("@storybook/client-logger"),_storybook_global__WEBPACK_IMPORTED_MODULE_3__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");var api=(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.start)(_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.b,{render:_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s});api.forceReRender,api.clientApi.raw;_chunk_JWY6Y6NU_mjs__WEBPACK_IMPORTED_MODULE_0__.s},"./packages/selection/src/useSelection.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>useSelection});var react=__webpack_require__("./node_modules/react/index.js"),getControlledValue=__webpack_require__("./packages/utilities/src/utils/getControlledValue.ts"),KeyboardEventValues=__webpack_require__("./packages/utilities/src/utils/KeyboardEventValues.ts"),composeEventHandlers=__webpack_require__("./packages/utilities/src/utils/composeEventHandlers.ts");const stateReducer=(state,action)=>{switch(action.type){case"END":case"HOME":case"FOCUS":case"INCREMENT":case"DECREMENT":return{...state,focusedItem:action.payload};case"MOUSE_SELECT":return{...state,selectedItem:action.payload,focusedItem:void 0};case"KEYBOARD_SELECT":return{...state,selectedItem:action.payload};case"EXIT_WIDGET":return{...state,focusedItem:void 0};default:return state}},useSelection=function(_temp){let{direction="horizontal",defaultFocusedIndex=0,defaultSelectedIndex,rtl,selectedItem,focusedItem,onSelect,onFocus}=void 0===_temp?{}:_temp;const isSelectedItemControlled=void 0!==selectedItem,isFocusedItemControlled=void 0!==focusedItem,refs=[],items=[],[state,dispatch]=(0,react.useReducer)(stateReducer,{selectedItem,focusedItem}),controlledFocusedItem=(0,getControlledValue.u)(focusedItem,state.focusedItem),controlledSelectedItem=(0,getControlledValue.u)(selectedItem,state.selectedItem);(0,react.useEffect)((()=>{if(void 0!==controlledFocusedItem){const focusedIndex=items.indexOf(controlledFocusedItem);refs[focusedIndex]&&refs[focusedIndex].current.focus()}}),[controlledFocusedItem]),(0,react.useEffect)((()=>{void 0===selectedItem&&void 0!==defaultSelectedIndex&&(onSelect&&onSelect(items[defaultSelectedIndex]),isSelectedItemControlled||dispatch({type:"KEYBOARD_SELECT",payload:items[defaultSelectedIndex]}))}),[]);return{focusedItem:controlledFocusedItem,selectedItem:controlledSelectedItem,getItemProps:_ref=>{let{selectedAriaKey="aria-selected",role="option",onFocus:onFocusCallback,onKeyDown,onClick,item,focusRef,refKey="ref",...other}=_ref;refs.push(focusRef),items.push(item);const isSelected=controlledSelectedItem===item,tabIndex=(void 0===controlledFocusedItem?isSelected:controlledFocusedItem===item)||void 0===controlledSelectedItem&&void 0===controlledFocusedItem&&items.indexOf(item)===defaultFocusedIndex?0:-1,verticalDirection="vertical"===direction||"both"===direction,horizontalDirection="horizontal"===direction||"both"===direction;return{role:null===role?void 0:role,tabIndex,[selectedAriaKey]:selectedAriaKey?isSelected:void 0,[refKey]:focusRef,onFocus:(0,composeEventHandlers.M)(onFocusCallback,(()=>{onFocus&&onFocus(item),isFocusedItemControlled||dispatch({type:"FOCUS",payload:item})})),onClick:(0,composeEventHandlers.M)(onClick,(()=>{onSelect&&onSelect(item),onFocus&&onFocus(),isSelectedItemControlled||dispatch({type:"MOUSE_SELECT",payload:item})})),onKeyDown:(0,composeEventHandlers.M)(onKeyDown,(event=>{let nextIndex,currentIndex;currentIndex=isFocusedItemControlled?items.indexOf(focusedItem):items.indexOf(state.focusedItem||state.selectedItem);const onIncrement=()=>{nextIndex=currentIndex+1,currentIndex===items.length-1&&(nextIndex=0),!isFocusedItemControlled&&dispatch({type:"INCREMENT",payload:items[nextIndex]}),onFocus&&onFocus(items[nextIndex])},onDecrement=()=>{nextIndex=currentIndex-1,0===currentIndex&&(nextIndex=items.length-1),!isFocusedItemControlled&&dispatch({type:"DECREMENT",payload:items[nextIndex]}),onFocus&&onFocus(items[nextIndex])};event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||(event.key===KeyboardEventValues.t.UP&&verticalDirection||event.key===KeyboardEventValues.t.LEFT&&horizontalDirection?(rtl&&horizontalDirection?onIncrement():onDecrement(),event.preventDefault()):event.key===KeyboardEventValues.t.DOWN&&verticalDirection||event.key===KeyboardEventValues.t.RIGHT&&horizontalDirection?(rtl&&horizontalDirection?onDecrement():onIncrement(),event.preventDefault()):event.key===KeyboardEventValues.t.HOME?(isFocusedItemControlled||dispatch({type:"HOME",payload:items[0]}),onFocus&&onFocus(items[0]),event.preventDefault()):event.key===KeyboardEventValues.t.END?(isFocusedItemControlled||dispatch({type:"END",payload:items[items.length-1]}),onFocus&&onFocus(items[items.length-1]),event.preventDefault()):event.key!==KeyboardEventValues.t.SPACE&&event.key!==KeyboardEventValues.t.ENTER||(onSelect&&onSelect(item),isSelectedItemControlled||dispatch({type:"KEYBOARD_SELECT",payload:item}),event.preventDefault()))})),onBlur:event=>{0===event.target.tabIndex&&(isFocusedItemControlled||dispatch({type:"EXIT_WIDGET"}),onFocus&&onFocus())},...other}},getContainerProps:function(_temp2){let{role="listbox",...other}=void 0===_temp2?{}:_temp2;return{role:null===role?void 0:role,"data-garden-container-id":"containers.selection","data-garden-container-version":"storybook",...other}}}}},"./packages/utilities/src/utils/KeyboardEventValues.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{n:()=>KEY_CODES,t:()=>KEYS});const KEY_CODES={ALT:18,ASTERISK:170,BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38},KEYS={ALT:"Alt",ASTERISK:"*",BACKSPACE:"Backspace",COMMA:",",DELETE:"Delete",DOWN:"ArrowDown",END:"End",ENTER:"Enter",ESCAPE:"Escape",HOME:"Home",LEFT:"ArrowLeft",NUMPAD_ADD:"Add",NUMPAD_DECIMAL:"Decimal",NUMPAD_DIVIDE:"Divide",NUMPAD_ENTER:"Enter",NUMPAD_MULTIPLY:"Multiply",NUMPAD_SUBTRACT:"Subtract",PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",PERIOD:".",RIGHT:"ArrowRight",SHIFT:"Shift",SPACE:" ",TAB:"Tab",UNIDENTIFIED:"Unidentified",UP:"ArrowUp"}},"./packages/utilities/src/utils/composeEventHandlers.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function composeEventHandlers(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return function(event){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return fns.some((fn=>(fn&&fn(event,...args),event&&event.defaultPrevented)))}}__webpack_require__.d(__webpack_exports__,{M:()=>composeEventHandlers})},"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}}]);