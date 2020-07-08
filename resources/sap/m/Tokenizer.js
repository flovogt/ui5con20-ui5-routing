/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","sap/ui/core/InvisibleText","sap/ui/core/ResizeHandler","./TokenizerRenderer","sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/core/EnabledPropagator","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,t,i,o,n,s,r,a,l,d,h,c){"use strict";var p=t.extend("sap.m.Tokenizer",{metadata:{library:"sap.m",properties:{editable:{type:"boolean",group:"Misc",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},defaultAggregation:"tokens",aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},_tokensInfo:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},tokenUpdate:{allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}}}});var f=sap.ui.getCore().getLibraryResourceBundle("sap.m");h.apply(p.prototype,[true]);p.prototype.init=function(){this.bAllowTextSelection=false;this._oTokensWidthMap={};this._oIndicator=null;this._bAdjustable=false;this._aTokenValidators=[];this._oScroller=new i(this,this.getId()+"-scrollContainer",{horizontal:true,vertical:false,nonTouchScrolling:true});if(sap.ui.getCore().getConfiguration().getAccessibility()){var e=new n({text:f.getText("TOKENIZER_ARIA_CONTAIN_TOKEN")});this.setAggregation("_tokensInfo",e)}};p.prototype._handleNMoreIndicatorPress=function(e){this._fnOnNMorePress=e};p.prototype._hasMoreIndicator=function(){var e=this.$();return!!e.length&&this.$().find(".sapMHiddenToken").length>0};p.prototype._adjustTokensVisibility=function(){if(!this.getDomRef()){return}var e=parseInt(this.getMaxWidth()),t=this._getVisibleTokens().reverse(),i=t.length,o,n,s,r=-1;t.some(function(t,i){e=e-this._oTokensWidthMap[t.getId()];if(e<=0){r=i;return true}else{n=e}},this);if(i===1&&r!==-1){this.setFirstTokenTruncated(true);return}else if(i===1&&t[0].getTruncated()){this.setFirstTokenTruncated(false)}if(r>-1){for(s=0;s<i;s++){if(s>=r){t[s].addStyleClass("sapMHiddenToken")}else{t[s].removeStyleClass("sapMHiddenToken")}}this._handleNMoreIndicator(i-r);o=this._oIndicator.width();if(o>=n){r=r-1;this._handleNMoreIndicator(i-r);t[r].addStyleClass("sapMHiddenToken")}this.removeStyleClass("sapMTokenizerNoNMore")}else{this._showAllTokens();this.addStyleClass("sapMTokenizerNoNMore")}};p.prototype.setFirstTokenTruncated=function(e){var t=this.getTokens()[0];t&&t.setTruncated(e);if(e){this.addStyleClass("sapMTokenizerOneLongToken")}else{this.removeStyleClass("sapMTokenizerOneLongToken");this.scrollToEnd()}return this};p.prototype.hasOneTruncatedToken=function(){return this.getTokens().length===1&&this.getTokens()[0].getTruncated()};p.prototype._handleNMoreIndicator=function(e){if(!this.getDomRef()){return this}if(e){var t="MULTIINPUT_SHOW_MORE_TOKENS";if(e===this._getVisibleTokens().length){this.$().css("overflow","visible");if(e===1){t="TOKENIZER_SHOW_ALL_ITEM"}else{t="TOKENIZER_SHOW_ALL_ITEMS"}}this._oIndicator.removeClass("sapUiHidden");this._oIndicator.html(f.getText(t,e))}else{this.$().css("overflow","hidden");this._oIndicator.addClass("sapUiHidden")}return this};p.prototype._getVisibleTokens=function(){return this.getTokens().filter(function(e){return e.getVisible()})};p.prototype._showAllTokens=function(){this._handleNMoreIndicator(0);this._getVisibleTokens().forEach(function(e){e.removeStyleClass("sapMHiddenToken")})};p.prototype.getScrollDelegate=function(){return this._oScroller};p.prototype.scrollToEnd=function(){var e=this.getDomRef(),t;if(!e){return}if(!this._sResizeHandlerId){t=this;this._sResizeHandlerId=s.register(e,function(){t.scrollToEnd()})}var i=this.$().find(".sapMTokenizerScrollContainer")[0];e.scrollLeft=i.scrollWidth};p.prototype.setMaxWidth=function(e){this.setProperty("maxWidth",e,true);this.$().css("max-width",this.getMaxWidth());if(this.getDomRef()&&this._getAdjustable()){this._adjustTokensVisibility()}return this};p.prototype._getIndicatorVisibility=function(){return this._oIndicator&&!this._oIndicator.hasClass("sapUiHidden")};p.prototype._setAdjustable=function(e){this._bAdjustable=e};p.prototype._getAdjustable=function(){return this._bAdjustable};p.prototype.setPixelWidth=function(e){if(typeof e!=="number"){d.warning("Tokenizer.setPixelWidth called with invalid parameter. Expected parameter of type number.");return}this.setWidth(e+"px");if(this._oScroller){this._oScroller.refresh()}};p.prototype.scrollToStart=function(){var e=this.getDomRef();if(!e){return}this._deactivateScrollToEnd();e.scrollLeft=0};p.prototype._deactivateScrollToEnd=function(){this._deregisterResizeHandler()};p.prototype.getScrollWidth=function(){if(!this.getDomRef()){return 0}return this.$().children(".sapMTokenizerScrollContainer")[0].scrollWidth};p.prototype.onBeforeRendering=function(){this._setTokensAria();this._deregisterResizeHandler()};p.prototype.onAfterRendering=function(){this.scrollToEnd();this._oIndicator=this.$().find(".sapMTokenizerIndicator");this._updateTokensAriaSetAttributes();if(this._getAdjustable()){this._useCollapsedMode(this._hasMoreIndicator(),true)}};p.prototype.onThemeChanged=function(){if(!this._getAdjustable()){return}this.getTokens().forEach(function(e){if(e.getDomRef()&&!e.$().hasClass("sapMHiddenToken")&&!e.getTruncated()){this._oTokensWidthMap[e.getId()]=e.$().outerWidth(true)}}.bind(this));this._adjustTokensVisibility()};p.prototype._useCollapsedMode=function(e,t){var i=this.getParent(),o=this._getVisibleTokens();if(!o.length){return}if(e){this._adjustTokensVisibility()}else{this._showAllTokens()}if(!t){i._syncInputWidth&&setTimeout(i["_syncInputWidth"].bind(i,this),0)}};p.prototype.invalidate=function(e){var i=this.getParent();if(i instanceof sap.m.MultiInput){i.invalidate(e)}else{t.prototype.invalidate.call(this,e)}};p.prototype.onsapfocusleave=function(e){if(document.activeElement===this.getDomRef()||!this._checkFocus()){this._changeAllTokensSelection(false);this._oSelectionOrigin=null}};p.prototype.isAllTokenSelected=function(){if(this._getVisibleTokens().length===this.getSelectedTokens().length){return true}return false};p.prototype.onkeydown=function(e){var t;if(!this.getEnabled()){return}if(e.which===l.TAB){this._changeAllTokensSelection(false)}if((e.ctrlKey||e.metaKey)&&e.which===l.A){t=this.getSelectedTokens().length<this._getVisibleTokens().length;if(this._getVisibleTokens().length>0){this.focus();this._changeAllTokensSelection(t);e.preventDefault();e.stopPropagation()}}if((e.ctrlKey||e.metaKey)&&(e.which===l.C||e.which===l.INSERT)){this._copy()}if((e.ctrlKey||e.metaKey)&&e.which===l.X||e.shiftKey&&e.which===l.DELETE){if(this.getEditable()){this._cut()}else{this._copy()}}};p.prototype.onsappreviousmodifiers=function(e){this.onsapprevious(e)};p.prototype.onsapnextmodifiers=function(e){this.onsapnext(e)};p.prototype.onsaphomemodifiers=function(e){this._selectRange(false)};p.prototype.onsapendmodifiers=function(e){this._selectRange(true)};p.prototype._selectRange=function(e){var t={},i=this._getVisibleTokens(),o=c(document.activeElement).control()[0],n=i.indexOf(o);if(!o||!o.isA("sap.m.Token")){return}if(e){t.start=n;t.end=i.length-1}else{t.start=0;t.end=n}if(t.start<t.end){for(var s=t.start;s<=t.end;s++){i[s].setSelected(true)}}};p.prototype._copy=function(){var e=this.getSelectedTokens(),t="",i,n=function(e){if(e.clipboardData){e.clipboardData.setData("text/plain",t)}else{e.originalEvent.clipboardData.setData("text/plain",t)}e.preventDefault()};for(var s=0;s<e.length;s++){i=e[s];t+=(s>0?"\r\n":"")+i.getText()}if(!t){return}if(o.browser.msie&&window.clipboardData){window.clipboardData.setData("text",t)}else{document.addEventListener("copy",n);document.execCommand("copy");document.removeEventListener("copy",n)}};p.prototype._cut=function(){var e=this,t=e.getSelectedTokens(),i="",n=[],s,r,a=function(e){if(e.clipboardData){e.clipboardData.setData("text/plain",i)}else{e.originalEvent.clipboardData.setData("text/plain",i)}e.preventDefault()};s=e.fireTokenUpdate({addedTokens:[],removedTokens:n,type:p.TokenUpdateType.Removed});for(var l=0;l<t.length;l++){r=t[l];i+=(l>0?"\r\n":"")+r.getText();if(s&&r.getEditable()){e.removeToken(r);n.push(r);r.destroy()}}if(!i){return}if(o.browser.msie&&window.clipboardData){window.clipboardData.setData("text",i)}else{document.addEventListener("cut",a);document.execCommand("cut");document.removeEventListener("cut",a)}};p.prototype.onsapbackspace=function(e){var t=this.getSelectedTokens();if(!this.getEnabled()){return}if(t.length<2){e.preventDefault();this.onsapprevious(e)}else{this._focusUnselectedToken(e)}this._handleKeyboardDelete(e);e.setMarked()};p.prototype._focusUnselectedToken=function(e){var t=this.getSelectedTokens(),i=this._getVisibleTokens(),o,n;if(e.keyCode===l.DELETE){o=i.indexOf(t[t.length-1]);n=i[o+1]}if(e.keyCode===l.BACKSPACE){o=i.indexOf(t[0]);n=i[o-1]}if(n){n.focus()}else{e.setMarked("forwardFocusToParent");this.focus()}};p.prototype.onsapdelete=function(e){var t;if(!this.getEnabled()){return}t=this.getSelectedTokens();if(t.length<2){this.onsapnext(e)}else{this._focusUnselectedToken(e)}this._handleKeyboardDelete(e);e.setMarked()};p.prototype._handleKeyboardDelete=function(e){var t;if(this.getEditable()){t=c(e.target).control()[0];if(t&&t.isA("sap.m.Token")){this.handleTokenDeletion(t)}this._removeSelectedTokens();if(!this._getVisibleTokens().length){e.setMarked("forwardFocusToParent")}}};p.prototype._ensureTokenVisible=function(e){if(!e||!e.getDomRef()||!this.getDomRef()){return}var t=this.$().offset().left,i=this.$().width(),o=e.$().offset().left,n=e.$().width();if(this._getVisibleTokens().indexOf(e)===0){this.$().scrollLeft(0);return}if(o<t){this.$().scrollLeft(this.$().scrollLeft()-t+o)}if(o-t+n>i){this.$().scrollLeft(this.$().scrollLeft()+(o-t+n-i))}};p.prototype.ontap=function(e){var t=e.shiftKey,i=e.ctrlKey||e.metaKey,o=e.getMark("tokenTap"),n=e.getMark("tokenDeletePress"),s=this._getVisibleTokens(),r,a,l,d,h;if(n||!o||!t&&i){this._oSelectionOrigin=null;return}if(!t){this._oSelectionOrigin=o;this._changeAllTokensSelection(false,o)}r=o;if(this._oSelectionOrigin){r=this._oSelectionOrigin}else{this._oSelectionOrigin=r}a=this.indexOfToken(r);l=this.indexOfToken(o);d=Math.min(a,l);h=Math.max(a,l);s.forEach(function(e,t){if(t>=d&&t<=h){e.setSelected(true)}else if(!i){e.setSelected(false)}})};p.prototype.onsapprevious=function(e){var t=this._getVisibleTokens(),i=t.length;if(i===0){return}var o=c(document.activeElement).control()[0];var n=o?t.indexOf(o):-1;if(n===0){e.setMarked("forwardFocusToParent");return}var s,r;if(n>0){s=t[n-1];s.focus()}else{s=t[t.length-1];s.focus()}if(e.shiftKey){r=t[n];s.setSelected(true);r.setSelected(true)}this._deactivateScrollToEnd();this._ensureTokenVisible(s);e.setMarked();e.preventDefault()};p.prototype.onsapnext=function(e){var t=this._getVisibleTokens(),i=t.length;if(i===0){return}var o=c(document.activeElement).control()[0];var n=o?t.indexOf(o):-1;if(n<i-1){var s=t[n+1],r=t[n];s.focus();if(e.shiftKey){s.setSelected(true);r.setSelected(true)}this._ensureTokenVisible(s)}else{e.setMarked("forwardFocusToParent");return}this._deactivateScrollToEnd();e.setMarked();e.preventDefault()};p.prototype.addValidator=function(e){if(typeof e==="function"){this._aTokenValidators.push(e)}};p.prototype.removeValidator=function(e){var t=this._aTokenValidators.indexOf(e);if(t!==-1){this._aTokenValidators.splice(t,1)}};p.prototype.removeAllValidators=function(){this._aTokenValidators=[]};p.prototype._validateToken=function(e,t){var i=e.token;var o;if(i&&i.getText()){o=i.getText()}else{o=e.text}var n=e.validationCallback;var s=e.suggestionObject;var r,a,l;if(!t){t=this._aTokenValidators}l=t.length;if(l===0){if(!i&&n){n(false)}return i}for(r=0;r<l;r++){a=t[r];i=a({text:o,suggestedToken:i,suggestionObject:s,asyncCallback:this._getAsyncValidationCallback(t,r,o,s,n)});if(!i){if(n){n(false)}return null}if(i===p.WaitForAsyncValidation){return null}}return i};p.prototype._getAsyncValidationCallback=function(e,t,i,o,n){var s=this,r;return function(a){if(a){e=e.slice(t+1);a=s._validateToken({text:i,token:a,suggestionObject:o,validationCallback:n},e);r=s._addUniqueToken(a,n);if(r){s.fireTokenUpdate({addedTokens:[a],removedTokens:[],type:p.TokenUpdateType.Added})}}else{if(n){n(false)}}}};p.prototype.addValidateToken=function(e){var t=this._validateToken(e);this._addUniqueToken(t,e.validationCallback)};p.prototype._addValidateToken=function(e){var t=this._validateToken(e),i=this._addUniqueToken(t,e.validationCallback);if(i){this.fireTokenUpdate({addedTokens:[t],removedTokens:[],type:p.TokenUpdateType.Added})}};p.prototype._addUniqueToken=function(e,t){if(!e){return false}var i=this._tokenExists(e);if(i){var o=this.getParent();if(o instanceof sap.m.MultiInput&&t){t(false)}return false}this.addToken(e);if(t){t(true)}this.fireTokenChange({addedTokens:[e],removedTokens:[],type:p.TokenChangeType.TokensChanged});return true};p.prototype._parseString=function(e){return e.split(/\r\n|\r|\n/g)};p.prototype._checkFocus=function(){return this.getDomRef()&&a(this.getDomRef(),document.activeElement)};p.prototype._tokenExists=function(e){var t=this.getTokens();if(!(t&&t.length)){return false}var i=e.getKey();if(!i){return false}var o=t.length;for(var n=0;n<o;n++){var s=t[n];var r=s.getKey();if(r===i){return true}}return false};p.prototype.addToken=function(e,t){var i=this.getParent();e.setProperty("editableParent",this.getEditable());if(i instanceof sap.m.MultiInput){if(i.getMaxTokens()!==undefined&&i.getTokens().length>=i.getMaxTokens()){return this}}this.addAggregation("tokens",e,t);this.fireTokenChange({token:e,type:p.TokenChangeType.Added});e.addEventDelegate({onAfterRendering:function(){if(sap.ui.getCore().isThemeApplied()&&e.getDomRef()&&!e.getTruncated()&&!e.$().hasClass("sapMHiddenToken")){this._oTokensWidthMap[e.getId()]=e.$().outerWidth(true)}}.bind(this)});e.getAggregation("deleteIcon").attachPress(function(){if(this.getEnabled()){this.handleTokenDeletion(e)}}.bind(this));return this};p.prototype.removeToken=function(e){e=this.removeAggregation("tokens",e);this._updateTokensAriaSetAttributes();!this.getTokens().length&&this.setFirstTokenTruncated(false);this.fireTokenChange({token:e,type:p.TokenChangeType.Removed});return e};p.prototype.setTokens=function(e){var t=this.getTokens();this.removeAllTokens(false);var i;for(i=0;i<e.length;i++){this.addToken(e[i],true)}this.invalidate();this.fireTokenChange({addedTokens:e,removedTokens:t,type:p.TokenChangeType.TokensChanged})};p.prototype.removeAllTokens=function(e){var t=this.getTokens();var i=this.removeAllAggregation("tokens");this.setFirstTokenTruncated(false);if(typeof e==="boolean"&&!e){return i}this.fireTokenChange({addedTokens:[],removedTokens:t,type:p.TokenChangeType.TokensChanged});this.fireTokenChange({tokens:t,type:p.TokenChangeType.RemovedAll});return i};p.prototype.updateTokens=function(){this.destroyTokens();this.updateAggregation("tokens");this.setFirstTokenTruncated(false)};p.prototype._removeSelectedTokens=function(){var e=this.getSelectedTokens();if(e.length===0){return this}this.handleTokenDeletion(e);this._doSelect();return this};p.prototype.handleTokenDeletion=function(e){var t,i,o,n=[];n=n.concat(e);t=this.fireTokenUpdate({addedTokens:[],removedTokens:n,type:p.TokenUpdateType.Removed});if(!t){return}for(i=0;i<n.length;i++){o=n[i];if(o.getEditable()){o.destroy()}}this.scrollToEnd();this.fireTokenChange({addedTokens:[],removedTokens:n,type:p.TokenChangeType.TokensChanged})};p.prototype.selectAllTokens=function(e){if(e===undefined){e=true}this._changeAllTokensSelection(e);return this};p.prototype._changeAllTokensSelection=function(e,t){var i=this._getVisibleTokens();i.filter(function(e){return e!==t}).forEach(function(t){t.setSelected(e)});this._doSelect();return this};p.prototype.getSelectedTokens=function(){return this._getVisibleTokens().filter(function(e){return e.getSelected()})};p.prototype.onsaphome=function(e){var t=this.getTokens().filter(function(e){return e.getDomRef()&&!e.getDomRef().classList.contains("sapMHiddenToken")});t.length&&t[0].focus();this.scrollToStart();e.preventDefault()};p.prototype.onsapend=function(e){var t=this._getVisibleTokens(),i=t[t.length-1];if(i.getDomRef()!==document.activeElement){i.focus();this.scrollToEnd();e.stopPropagation()}else{e.setMarked("forwardFocusToParent")}e.preventDefault()};p.prototype.onclick=function(e){var t;if(!this.getEnabled()){return}t=e.target.classList.contains("sapMTokenizerIndicator")||e.target===this.getFocusDomRef()||this.hasOneTruncatedToken();if(t){this._fnOnNMorePress&&this._fnOnNMorePress(e)}};p.prototype.ontouchstart=function(e){e.setMarked();if(o.browser.chrome&&window.getSelection()){window.getSelection().removeAllRanges()}};p.prototype.exit=function(){this._deregisterResizeHandler()};p.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){s.deregister(this._sResizeHandlerId);delete this._sResizeHandlerId}};p.prototype._setTokensAria=function(){var e=this._getVisibleTokens().length,t,i="";if(sap.ui.getCore().getConfiguration().getAccessibility()){t=this.getAggregation("_tokensInfo");switch(e){case 0:i=f.getText("TOKENIZER_ARIA_CONTAIN_TOKEN");break;case 1:i=f.getText("TOKENIZER_ARIA_CONTAIN_ONE_TOKEN");break;default:i=f.getText("TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS",e);break}t.setText(i)}};p.prototype._updateTokensAriaSetAttributes=function(){var e=this.getTokens(),t=e.length;for(var i=0;i<t;i++){var o=e[i].getDomRef();if(o){o.setAttribute("aria-posinset",i+1);o.setAttribute("aria-setsize",t)}}};p.prototype._doSelect=function(){if(this._checkFocus()&&this._bCopyToClipboardSupport){var e=document.activeElement;var t=window.getSelection();t.removeAllRanges();if(this.getSelectedTokens().length){var i=document.createRange();i.selectNodeContents(this.getDomRef("clip"));t.addRange(i)}if(window.clipboardData&&e.id===this.getId()+"-clip"&&this.getDomRef()){this.getDomRef().focus()}}};p.prototype.getReverseTokens=function(){return!!this._reverseTokens};p.prototype.setReverseTokens=function(e){this._reverseTokens=e};p.prototype.setEditable=function(e){var t=this.getTokens();t.forEach(function(t){t.setProperty("editableParent",e)});this.setProperty("editable",e,false);if(this.getTokens().length===1){this._adjustTokensVisibility()}return this};p.prototype.getTokensInfoId=function(){return this.getAggregation("_tokensInfo").getId()};p.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};p.TokenUpdateType={Added:"added",Removed:"removed"};p.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";return p});