/*! For license information please see 6253.145af525.iframe.bundle.js.LICENSE.txt */
(self.webpackChunk_zendeskgarden_react_containers=self.webpackChunk_zendeskgarden_react_containers||[]).push([[6253],{"./node_modules/@storybook/react/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";var _chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/react/dist/chunk-H7CJXHDS.mjs"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/@storybook/react/dist/chunk-XP5HYGXS.mjs"),__webpack_require__("@storybook/global")),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),{window:globalWindow}=(__webpack_require__("storybook/internal/preview-api"),_storybook_global__WEBPACK_IMPORTED_MODULE_2__.global);globalWindow&&(globalWindow.STORYBOOK_ENV="react");_chunk_H7CJXHDS_mjs__WEBPACK_IMPORTED_MODULE_0__.IX},"./node_modules/dom-helpers/esm/activeElement.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function activeElement(doc){void 0===doc&&(doc=function ownerDocument(node){return node&&node.ownerDocument||document}());try{var active=doc.activeElement;return active&&active.nodeName?active:null}catch(e){return doc.body}}__webpack_require__.d(__webpack_exports__,{A:()=>activeElement})},"./node_modules/prop-types/factoryWithThrowingShims.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var ReactPropTypesSecret=__webpack_require__("./node_modules/prop-types/lib/ReactPropTypesSecret.js");function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,module.exports=function(){function shim(props,propName,componentName,location,propFullName,secret){if(secret!==ReactPropTypesSecret){var err=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw err.name="Invariant Violation",err}}function getShim(){return shim}shim.isRequired=shim;var ReactPropTypes={array:shim,bigint:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return ReactPropTypes.PropTypes=ReactPropTypes,ReactPropTypes}},"./node_modules/prop-types/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/prop-types/factoryWithThrowingShims.js")()},"./node_modules/prop-types/lib/ReactPropTypesSecret.js":module=>{"use strict";module.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},"./node_modules/tabbable/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Kr:()=>tabbable});var candidateSelectors=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],candidateSelector=candidateSelectors.join(","),NoElement="undefined"==typeof Element,matches=NoElement?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,getRootNode=!NoElement&&Element.prototype.getRootNode?function(element){var _element$getRootNode;return null==element||null===(_element$getRootNode=element.getRootNode)||void 0===_element$getRootNode?void 0:_element$getRootNode.call(element)}:function(element){return null==element?void 0:element.ownerDocument},isInert=function isInert(node,lookUp){var _node$getAttribute;void 0===lookUp&&(lookUp=!0);var inertAtt=null==node||null===(_node$getAttribute=node.getAttribute)||void 0===_node$getAttribute?void 0:_node$getAttribute.call(node,"inert");return""===inertAtt||"true"===inertAtt||lookUp&&node&&isInert(node.parentNode)},getCandidates=function getCandidates(el,includeContainer,filter){if(isInert(el))return[];var candidates=Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));return includeContainer&&matches.call(el,candidateSelector)&&candidates.unshift(el),candidates=candidates.filter(filter)},getCandidatesIteratively=function getCandidatesIteratively(elements,includeContainer,options){for(var candidates=[],elementsToCheck=Array.from(elements);elementsToCheck.length;){var element=elementsToCheck.shift();if(!isInert(element,!1))if("SLOT"===element.tagName){var assigned=element.assignedElements(),nestedCandidates=getCandidatesIteratively(assigned.length?assigned:element.children,!0,options);options.flatten?candidates.push.apply(candidates,nestedCandidates):candidates.push({scopeParent:element,candidates:nestedCandidates})}else{matches.call(element,candidateSelector)&&options.filter(element)&&(includeContainer||!elements.includes(element))&&candidates.push(element);var shadowRoot=element.shadowRoot||"function"==typeof options.getShadowRoot&&options.getShadowRoot(element),validShadowRoot=!isInert(shadowRoot,!1)&&(!options.shadowRootFilter||options.shadowRootFilter(element));if(shadowRoot&&validShadowRoot){var _nestedCandidates=getCandidatesIteratively(!0===shadowRoot?element.children:shadowRoot.children,!0,options);options.flatten?candidates.push.apply(candidates,_nestedCandidates):candidates.push({scopeParent:element,candidates:_nestedCandidates})}else elementsToCheck.unshift.apply(elementsToCheck,element.children)}}return candidates},hasTabIndex=function hasTabIndex(node){return!isNaN(parseInt(node.getAttribute("tabindex"),10))},getTabIndex=function getTabIndex(node){if(!node)throw new Error("No node provided");return node.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName)||function isContentEditable(node){var _node$getAttribute2,attValue=null==node||null===(_node$getAttribute2=node.getAttribute)||void 0===_node$getAttribute2?void 0:_node$getAttribute2.call(node,"contenteditable");return""===attValue||"true"===attValue}(node))&&!hasTabIndex(node)?0:node.tabIndex},sortOrderedTabbables=function sortOrderedTabbables(a,b){return a.tabIndex===b.tabIndex?a.documentOrder-b.documentOrder:a.tabIndex-b.tabIndex},isInput=function isInput(node){return"INPUT"===node.tagName},isNonTabbableRadio=function isNonTabbableRadio(node){return function isRadio(node){return isInput(node)&&"radio"===node.type}(node)&&!function isTabbableRadio(node){if(!node.name)return!0;var radioSet,radioScope=node.form||getRootNode(node),queryRadios=function queryRadios(name){return radioScope.querySelectorAll('input[type="radio"][name="'+name+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)radioSet=queryRadios(window.CSS.escape(node.name));else try{radioSet=queryRadios(node.name)}catch(err){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",err.message),!1}var checked=function getCheckedRadio(nodes,form){for(var i=0;i<nodes.length;i++)if(nodes[i].checked&&nodes[i].form===form)return nodes[i]}(radioSet,node.form);return!checked||checked===node}(node)},isZeroArea=function isZeroArea(node){var _node$getBoundingClie=node.getBoundingClientRect(),width=_node$getBoundingClie.width,height=_node$getBoundingClie.height;return 0===width&&0===height},isHidden=function isHidden(node,_ref){var displayCheck=_ref.displayCheck,getShadowRoot=_ref.getShadowRoot;if("hidden"===getComputedStyle(node).visibility)return!0;var nodeUnderDetails=matches.call(node,"details>summary:first-of-type")?node.parentElement:node;if(matches.call(nodeUnderDetails,"details:not([open]) *"))return!0;if(displayCheck&&"full"!==displayCheck&&"legacy-full"!==displayCheck){if("non-zero-area"===displayCheck)return isZeroArea(node)}else{if("function"==typeof getShadowRoot){for(var originalNode=node;node;){var parentElement=node.parentElement,rootNode=getRootNode(node);if(parentElement&&!parentElement.shadowRoot&&!0===getShadowRoot(parentElement))return isZeroArea(node);node=node.assignedSlot?node.assignedSlot:parentElement||rootNode===node.ownerDocument?parentElement:rootNode.host}node=originalNode}if(function isNodeAttached(node){var _nodeRoot,_nodeRootHost,_nodeRootHost$ownerDo,_node$ownerDocument,nodeRoot=node&&getRootNode(node),nodeRootHost=null===(_nodeRoot=nodeRoot)||void 0===_nodeRoot?void 0:_nodeRoot.host,attached=!1;if(nodeRoot&&nodeRoot!==node)for(attached=!!(null!==(_nodeRootHost=nodeRootHost)&&void 0!==_nodeRootHost&&null!==(_nodeRootHost$ownerDo=_nodeRootHost.ownerDocument)&&void 0!==_nodeRootHost$ownerDo&&_nodeRootHost$ownerDo.contains(nodeRootHost)||null!=node&&null!==(_node$ownerDocument=node.ownerDocument)&&void 0!==_node$ownerDocument&&_node$ownerDocument.contains(node));!attached&&nodeRootHost;){var _nodeRoot2,_nodeRootHost2,_nodeRootHost2$ownerD;attached=!(null===(_nodeRootHost2=nodeRootHost=null===(_nodeRoot2=nodeRoot=getRootNode(nodeRootHost))||void 0===_nodeRoot2?void 0:_nodeRoot2.host)||void 0===_nodeRootHost2||null===(_nodeRootHost2$ownerD=_nodeRootHost2.ownerDocument)||void 0===_nodeRootHost2$ownerD||!_nodeRootHost2$ownerD.contains(nodeRootHost))}return attached}(node))return!node.getClientRects().length;if("legacy-full"!==displayCheck)return!0}return!1},isNodeMatchingSelectorFocusable=function isNodeMatchingSelectorFocusable(options,node){return!(node.disabled||isInert(node)||function isHiddenInput(node){return isInput(node)&&"hidden"===node.type}(node)||isHidden(node,options)||function isDetailsWithSummary(node){return"DETAILS"===node.tagName&&Array.prototype.slice.apply(node.children).some((function(child){return"SUMMARY"===child.tagName}))}(node)||function isDisabledFromFieldset(node){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName))for(var parentNode=node.parentElement;parentNode;){if("FIELDSET"===parentNode.tagName&&parentNode.disabled){for(var i=0;i<parentNode.children.length;i++){var child=parentNode.children.item(i);if("LEGEND"===child.tagName)return!!matches.call(parentNode,"fieldset[disabled] *")||!child.contains(node)}return!0}parentNode=parentNode.parentElement}return!1}(node))},isNodeMatchingSelectorTabbable=function isNodeMatchingSelectorTabbable(options,node){return!(isNonTabbableRadio(node)||getTabIndex(node)<0||!isNodeMatchingSelectorFocusable(options,node))},isValidShadowRootTabbable=function isValidShadowRootTabbable(shadowHostNode){var tabIndex=parseInt(shadowHostNode.getAttribute("tabindex"),10);return!!(isNaN(tabIndex)||tabIndex>=0)},sortByOrder=function sortByOrder(candidates){var regularTabbables=[],orderedTabbables=[];return candidates.forEach((function(item,i){var isScope=!!item.scopeParent,element=isScope?item.scopeParent:item,candidateTabindex=function getSortOrderTabIndex(node,isScope){var tabIndex=getTabIndex(node);return tabIndex<0&&isScope&&!hasTabIndex(node)?0:tabIndex}(element,isScope),elements=isScope?sortByOrder(item.candidates):element;0===candidateTabindex?isScope?regularTabbables.push.apply(regularTabbables,elements):regularTabbables.push(element):orderedTabbables.push({documentOrder:i,tabIndex:candidateTabindex,item,isScope,content:elements})})),orderedTabbables.sort(sortOrderedTabbables).reduce((function(acc,sortable){return sortable.isScope?acc.push.apply(acc,sortable.content):acc.push(sortable.content),acc}),[]).concat(regularTabbables)},tabbable=function tabbable(container,options){var candidates;return candidates=(options=options||{}).getShadowRoot?getCandidatesIteratively([container],options.includeContainer,{filter:isNodeMatchingSelectorTabbable.bind(null,options),flatten:!1,getShadowRoot:options.getShadowRoot,shadowRootFilter:isValidShadowRootTabbable}):getCandidates(container,options.includeContainer,isNodeMatchingSelectorTabbable.bind(null,options)),sortByOrder(candidates)}}}]);