/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(e,t,r){"use strict";var n={};n.applyChange=function(e,t,n){var a=n.modifier;var o=n.view;var i=n.appComponent;var l=e.getDefinition();var f=l.content.elementSelector||l.content.sRenameId;var s=a.bySelector(f,i,o);if(l.texts&&l.texts.formText&&this._isProvided(l.texts.formText.value)){if(!t){throw new Error("no Control provided for renaming")}e.setRevertData(a.getProperty(s,"text"));var c=l.texts.formText.value;a.setProperty(s,"text",c);return true}else{r.error("Change does not contain sufficient information to be applied: ["+l.layer+"]"+l.namespace+"/"+l.fileName+"."+l.fileType)}};n.revertChange=function(e,t,n){var a=e.getRevertData();var o=n.appComponent;var i=e.getDefinition();var l=n.view;var f=n.modifier;var s=i.content.elementSelector||i.content.sRenameId;var c=f.bySelector(s,o,l);if(a||a===""){f.setProperty(c,"text",a);c.getParent().invalidate();e.resetRevertData();return true}else{r.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.")}};n.completeChangeContent=function(r,n,a){var o=r.getDefinition();if(!n.changeType){throw new Error("oSpecificChangeInfo.changeType attribute required")}if(n.renamedElement&&n.renamedElement.id){var i=sap.ui.getCore().byId(n.renamedElement.id);var l;if(n.changeType==="renameLabel"){l=i.getLabel()}else if(n.changeType==="renameTitle"){l=i.getTitle()}o.content.elementSelector=t.getSelector(l,a.appComponent);r.addDependentControl(l,"elementSelector",a)}else{throw new Error("oSpecificChangeInfo.renamedElement attribute required")}if(this._isProvided(n.value)){e.setTextInChange(o,"formText",n.value,"XFLD")}else{throw new Error("oSpecificChangeInfo.value attribute required")}};n._isProvided=function(e){return typeof e==="string"};return n},true);