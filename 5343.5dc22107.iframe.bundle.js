"use strict";(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[5343],{"./packages/menu/demo/menu.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Uncontrolled:()=>Uncontrolled,__namedExportsOrder:()=>__namedExportsOrder,default:()=>menu_stories});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("./node_modules/react/index.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),useMenu=__webpack_require__("./packages/menu/src/useMenu.ts");const MenuContainer=props=>{const{children,render=children,...options}=props;return react.createElement(react.Fragment,null,render((0,useMenu.b)(options)))};MenuContainer.propTypes={children:prop_types_default().func,render:prop_types_default().func,items:prop_types_default().arrayOf(prop_types_default().any).isRequired,triggerRef:prop_types_default().any.isRequired,menuRef:prop_types_default().any.isRequired,idPrefix:prop_types_default().string,environment:prop_types_default().any,onChange:prop_types_default().func,isExpanded:prop_types_default().bool,defaultExpanded:prop_types_default().bool,selectedItems:prop_types_default().arrayOf(prop_types_default().any),focusedValue:prop_types_default().oneOfType([prop_types_default().string]),defaultFocusedValue:prop_types_default().oneOfType([prop_types_default().string]),restoreFocus:prop_types_default().bool},MenuContainer.defaultProps={restoreFocus:!0},MenuContainer.__docgenInfo={description:"",methods:[],displayName:"MenuContainer",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"union",raw:"IMenuItemBase | IMenuItemSeparator | IMenuItemGroup",elements:[{name:"IMenuItemBase"},{name:"IMenuItemSeparator"},{name:"IMenuItemGroup"}]}],raw:"MenuItem[]"},description:"Provides an ordered list of menu items\n\n@param {string} item.value Unique item value\n@param {string} item.label Optional human-readable text value (defaults to `item.value`)\n@param {string} item.name A shared name corresponding to an item radio group\n@param {boolean} item.disabled Indicates the item is not interactive\n@param {boolean} item.selected Sets initial selection for the option\n@param {boolean} item.isNext - Indicates the item transitions to a nested menu\n@param {boolean} item.isPrevious - Indicates the item will transition back from a nested menu\n@param {boolean} item.separator Indicates the item is a placeholder for a separator\n@param {(IMenuItemBase | IMenuItemSeparator)[]} item.items Groups a list of items",type:{name:"arrayOf",value:{name:"any"}}},triggerRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"T"}],raw:"RefObject<T>"},description:"Provides ref access to the underlying trigger element",type:{name:"any"}},menuRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"M"}],raw:"RefObject<M>"},description:"Provides ref access to the underlying menu element",type:{name:"any"}},rtl:{required:!1,tsType:{name:"boolean"},description:"Determines right-to-left layout"},idPrefix:{required:!1,tsType:{name:"string"},description:"Prefixes IDs for the menu",type:{name:"string"}},isExpanded:{required:!1,tsType:{name:"boolean"},description:"Sets the expansion in a controlled menu",type:{name:"bool"}},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:"Determines menu expansion on menu initialization",type:{name:"bool"}},focusedValue:{required:!1,tsType:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},description:"Sets the focused value in a controlled menu",type:{name:"union",value:[{name:"string"}]}},defaultFocusedValue:{required:!1,tsType:{name:"string"},description:"Determines focused value on menu initialization",type:{name:"union",value:[{name:"string"}]}},restoreFocus:{required:!1,tsType:{name:"boolean"},description:"Returns keyboard focus to the element that triggered the menu",defaultValue:{value:"true",computed:!1},type:{name:"bool"}},selectedItems:{required:!1,tsType:{name:"Array",elements:[{name:"ISelectedItem"}],raw:"ISelectedItem[]"},description:"Sets the selected values in a controlled menu",type:{name:"arrayOf",value:{name:"any"}}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(changes: {\n  type: string;\n  value?: string;\n  isExpanded?: boolean;\n  focusedValue?: string | null;\n  selectedItems?: ISelectedItem[];\n}) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  type: string;\n  value?: string;\n  isExpanded?: boolean;\n  focusedValue?: string | null;\n  selectedItems?: ISelectedItem[];\n}",signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!1}},{key:"isExpanded",value:{name:"boolean",required:!1}},{key:"focusedValue",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!1}},{key:"selectedItems",value:{name:"Array",elements:[{name:"ISelectedItem"}],raw:"ISelectedItem[]",required:!1}}]}},name:"changes"}],return:{name:"void"}}},description:"Handles menu state changes\n\n@param {string} changes.type The event type that triggered the change\n@param {string} [changes.value] The item value\n@param {boolean} [changes.isExpanded] The updated menu expansion\n@param {string | null} [changes.focusedValue] The updated focused value\n@param {ISelectedItem[]} [changes.selectedItems] The updated selected items",type:{name:"func"}},environment:{required:!1,tsType:{name:"Window"},description:"Sets the environment where the menu is rendered",type:{name:"any"}},render:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: {\n  /* prop getters */\n  getTriggerProps: IUseMenuReturnValue['getTriggerProps'];\n  getMenuProps: IUseMenuReturnValue['getMenuProps'];\n  getItemProps: IUseMenuReturnValue['getItemProps'];\n  getSeparatorProps: IUseMenuReturnValue['getSeparatorProps'];\n  /* state */\n  isExpanded: IUseMenuReturnValue['isExpanded'];\n  selection: IUseMenuReturnValue['selection'];\n  focusedValue?: IUseMenuReturnValue['focusedValue'];\n}) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{\n  /* prop getters */\n  getTriggerProps: IUseMenuReturnValue['getTriggerProps'];\n  getMenuProps: IUseMenuReturnValue['getMenuProps'];\n  getItemProps: IUseMenuReturnValue['getItemProps'];\n  getSeparatorProps: IUseMenuReturnValue['getSeparatorProps'];\n  /* state */\n  isExpanded: IUseMenuReturnValue['isExpanded'];\n  selection: IUseMenuReturnValue['selection'];\n  focusedValue?: IUseMenuReturnValue['focusedValue'];\n}",signature:{properties:[{key:"getTriggerProps",value:{name:"IUseMenuReturnValue['getTriggerProps']",raw:"IUseMenuReturnValue['getTriggerProps']",required:!0}},{key:"getMenuProps",value:{name:"IUseMenuReturnValue['getMenuProps']",raw:"IUseMenuReturnValue['getMenuProps']",required:!0}},{key:"getItemProps",value:{name:"IUseMenuReturnValue['getItemProps']",raw:"IUseMenuReturnValue['getItemProps']",required:!0}},{key:"getSeparatorProps",value:{name:"IUseMenuReturnValue['getSeparatorProps']",raw:"IUseMenuReturnValue['getSeparatorProps']",required:!0}},{key:"isExpanded",value:{name:"IUseMenuReturnValue['isExpanded']",raw:"IUseMenuReturnValue['isExpanded']",required:!0}},{key:"selection",value:{name:"IUseMenuReturnValue['selection']",raw:"IUseMenuReturnValue['selection']",required:!0}},{key:"focusedValue",value:{name:"IUseMenuReturnValue['focusedValue']",raw:"IUseMenuReturnValue['focusedValue']",required:!1}}]}},name:"options"}],return:{name:"ReactNode"}}},description:"Provides menu render prop functions\n\n@param {function} [options.getTriggerProps] Trigger props getter\n@param {function} [options.getMenuProps] Menu props getter\n@param {function} [options.getItemProps] Menu item props getter\n@param {function} [options.getSeparatorProps] Separator item props getter\n@param {boolean} [options.isExpanded] Current menu expansion\n@param {ISelectedItem[]} [options.selection] Current selection\n@param {string | null} [options.focusedValue] Current focused value",type:{name:"func"}},children:{required:!1,tsType:{name:"signature",type:"function",raw:"(options: IUseMenuReturnValue) => ReactNode",signature:{arguments:[{type:{name:"IUseMenuReturnValue"},name:"options"}],return:{name:"ReactNode"}}},description:"@ignore",type:{name:"func"}}}};__webpack_require__("./node_modules/@storybook/react/dist/index.mjs");var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames);const Item=_ref=>{let{item,getItemProps,focusedValue,isSelected}=_ref;const itemProps=getItemProps({item}),itemChildren=react.createElement(react.Fragment,null,react.createElement("span",{className:"inline-flex justify-center items-center w-4"},"radio"===item?.type&&!!isSelected&&"•","checkbox"===item?.type&&!!isSelected&&"✓"),item.label||item.value);return react.createElement("li",(0,esm_extends.A)({className:classnames_default()("flex",{"bg-blue-100":!item.disabled&&focusedValue===item.value,"text-grey-400":item.disabled,"cursor-pointer":!item.disabled,"cursor-default":item.disabled}),role:itemProps.href?"none":void 0},!itemProps.href&&itemProps),itemProps.href?react.createElement("a",(0,esm_extends.A)({},itemProps,{className:"w-full rounded-sm outline-offset-0 transition-none border-width-none"}),itemChildren,!!item.isExternal&&react.createElement(react.Fragment,null,react.createElement("span",{"aria-hidden":"true"}," ↗"),react.createElement("span",{className:"sr-only"},"(opens in new window)"))):itemChildren)},Component=_ref2=>{let{items,selection,focusedValue,isExpanded,getTriggerProps,getMenuProps,getItemProps,getItemGroupProps,getSeparatorProps}=_ref2;const selectedValues=selection.map((item=>item.value));return react.createElement("div",{className:"relative"},react.createElement("button",(0,esm_extends.A)({className:"px-2 py-1",type:"button"},getTriggerProps()),"Produce"),react.createElement("ul",(0,esm_extends.A)({className:classnames_default()("border border-grey-400 border-solid w-32 absolute",{invisible:!isExpanded})},getMenuProps()),items.map((item=>"items"in item?react.createElement("li",{key:item.label,role:"none"},react.createElement("b",{"aria-hidden":"true",className:"block mt-1 ms-1"},item.label),react.createElement("hr",(0,esm_extends.A)({"aria-hidden":"true",className:"my-1 border-grey-200"},getSeparatorProps())),react.createElement("ul",getItemGroupProps({"aria-label":item.label}),item.items.map((groupItem=>react.createElement(Item,{key:groupItem.value,item:{...groupItem},getItemProps,focusedValue,isSelected:selectedValues.includes(groupItem.value)}))))):"separator"in item?react.createElement("li",(0,esm_extends.A)({key:item.value,className:"my-1 border-0 border-b border-solid border-grey-200"},getSeparatorProps())):react.createElement(Item,{key:item.value,item,focusedValue,getItemProps})))))};Component.displayName="Component";const Container=props=>react.createElement(MenuContainer,props,(containerProps=>react.createElement(Component,(0,esm_extends.A)({},props,containerProps)))),Hook=props=>{const hookProps=(0,useMenu.b)(props);return react.createElement(Component,(0,esm_extends.A)({},props,hookProps))},MenuStory=_ref3=>{let{as,...props}=_ref3;const triggerRef=(0,react.useRef)(null),menuRef=(0,react.useRef)(null);return"container"===as?react.createElement(Container,(0,esm_extends.A)({},props,{triggerRef,menuRef})):react.createElement(Hook,(0,esm_extends.A)({},props,{triggerRef,menuRef}))};MenuStory.__docgenInfo={description:"",methods:[],displayName:"MenuStory"};const menu_stories={title:"Packages/Menu",component:MenuContainer,args:{as:"hook",items:[{value:"plant-01",label:"Petunia"},{value:"plant-02",label:"Hydrangea"},{value:"separator-01",separator:!0},{value:"plant-03",label:"Violet"},{value:"plant-04",label:"Aloe Vera",href:"https://en.wikipedia.org/wiki/Aloe_vera",isExternal:!1},{value:"plant-05",label:"Succulent"},{label:"Choose favorites",items:[{value:"fruit-01",label:"Apple",type:"checkbox"},{value:"fruit-02",label:"Banana",disabled:!0,type:"checkbox"},{value:"Cherry",type:"checkbox"},{value:"fruit-04",label:"Kiwi",type:"checkbox"}]},{label:"Select one",items:[{value:"vegetable-01",label:"Asparagus",type:"radio",name:"veggies"},{value:"vegetable-02",label:"Broccoli",disabled:!0,type:"radio",name:"veggies"},{value:"vegetable-03",label:"Brussel sprouts",type:"radio",name:"veggies"},{value:"vegetable-04",label:"Kale",type:"radio",name:"veggies"}]}]},argTypes:{as:{options:["container","hook"],control:"radio",table:{category:"Story"}},menuRef:{control:!1},triggerRef:{control:!1}}},Uncontrolled={render:args=>react.createElement(MenuStory,args),name:"Uncontrolled",argTypes:{isExpanded:{control:!1},focusedValue:{control:!1},selectedItems:{control:!1}}},Controlled={render:function Render(args){const updateArgs=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useArgs)()[1];return react.createElement(MenuStory,(0,esm_extends.A)({},args,{onChange:({type,...rest})=>{updateArgs(rest)}}))},name:"Controlled",argTypes:{defaultFocusedValue:{control:!1},defaultExpanded:{control:!1},focusedValue:{control:{type:"text"}}},args:{isExpanded:!1,focusedValue:"plant-01",selectedItems:[{value:"Cherry",type:"checkbox"}]}},__namedExportsOrder=["Uncontrolled","Controlled"];Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:"{\n  render: args => <MenuStory {...args} />,\n  name: 'Uncontrolled',\n  argTypes: {\n    isExpanded: {\n      control: false\n    },\n    focusedValue: {\n      control: false\n    },\n    selectedItems: {\n      control: false\n    }\n  }\n}",...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"{\n  render: function Render(args) {\n    const updateArgs = useArgs()[1];\n    return <MenuStory {...args}\n    // eslint-disable-next-line @typescript-eslint/no-unused-vars\n    onChange={({\n      type,\n      ...rest\n    }) => {\n      updateArgs(rest);\n    }} />;\n  },\n  name: 'Controlled',\n  argTypes: {\n    defaultFocusedValue: {\n      control: false\n    },\n    defaultExpanded: {\n      control: false\n    },\n    focusedValue: {\n      control: {\n        type: 'text'\n      }\n    }\n  },\n  args: {\n    isExpanded: false,\n    focusedValue: 'plant-01',\n    selectedItems: [{\n      value: 'Cherry',\n      type: 'checkbox'\n    }]\n  }\n}",...Controlled.parameters?.docs?.source}}}}}]);