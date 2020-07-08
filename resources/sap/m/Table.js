/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","./library","./ListBase","./ListItemBase","./CheckBox","./TableRenderer","sap/base/Log","sap/ui/core/ResizeHandler","sap/ui/core/util/PasteHelper","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/m/ListBaseRenderer","sap/ui/dom/jquery/Selectors"],function(e,t,i,o,n,s,r,a,l,u,h,p){"use strict";var d=t.ListKeyboardMode;var c=t.ListGrowingDirection;var f=t.BackgroundDesign;var g=t.PopinLayout;var y=t.ScreenSizes;var m=i.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:f.Translucent},fixedLayout:{type:"boolean",group:"Behavior",defaultValue:true},showOverlay:{type:"boolean",group:"Appearance",defaultValue:false},alternateRowColors:{type:"boolean",group:"Appearance",defaultValue:false},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:g.Block},contextualWidth:{type:"string",group:"Behavior",defaultValue:"Inherit"},autoPopinMode:{type:"boolean",group:"Behavior",defaultValue:false},hiddenInPopin:{type:"sap.ui.core.Priority[]",group:"Behavior"}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column",dnd:{draggable:true,droppable:true,layout:"Horizontal"}}},events:{beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ColumnListItem"},column:{type:"sap.m.Column"}}},paste:{allowPreventDefault:true,parameters:{data:{type:"string[][]"}}},popinChanged:{parameters:{hasPopin:{type:"boolean"},hiddenInPopin:{type:"sap.m.Column[]"}}}},designtime:"sap/m/designtime/Table.designtime"}});m.prototype.sNavItemClass="sapMListTblRow";m.prototype.init=function(){this._iItemNeedsColumn=0;i.prototype.init.call(this)};m.prototype.setContextualWidth=function(e){var t=this.getContextualWidth();if(e==t){return this}if(typeof e==="number"){this._sContextualWidth=e+"px";this._sContextualWidth=this._sContextualWidth.toLowerCase()}else{var i=e.toLowerCase(),o=y[i];if(o){this._sContextualWidth=o+"px"}else{this._sContextualWidth=e}}var n=this._validateContextualWidth(this._sContextualWidth);this._iLastContextualWidth=t;if(n){this.setProperty("contextualWidth",e,true)}else{return this}if(this._iLastContextualWidth.toLowerCase()==="auto"){this._deregisterResizeHandler()}if(this._sContextualWidth.toLowerCase()==="auto"){this._registerResizeHandler();this._applyContextualWidth(this.$().width())}else{this._applyContextualWidth(this._sContextualWidth)}return this};m.prototype._validateContextualWidth=function(e){if(!e){return}if(typeof e!="string"){throw new Error('expected string for property "contextualWidth" of '+this)}if(e.toLowerCase()==="auto"||e.toLowerCase()==="inherit"){return true}if(!/^\d+(\.\d+)?(px)$/i.test(e)){throw new Error('invalid CSS size("px", "Auto", "auto", Inherit", "inherit" required) or sap.m.ScreenSize enumeration for property "contextualWidth" of '+this)}return true};m.prototype._applyContextualWidth=function(e){e=parseFloat(e)||0;if(e){this._applyContextualSettings({contextualWidth:e})}};m.prototype._onResize=function(e){this._applyContextualWidth(e.size.width)};m.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){var e=this;window.requestAnimationFrame(function(){e._iResizeHandlerId=a.register(e,e._onResize.bind(e))})}};m.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){a.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};m.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.call(this);if(this.getAutoPopinMode()){this._configureAutoPopin();this._bAutoPopinMode=true}else{this._bAutoPopinMode=false}this._applyContextualWidth(this._sContextualWidth);this._ensureColumnsMedia();this._notifyColumns("ItemsRemoved")};m.prototype._ensureColumnsMedia=function(){this.getColumns().forEach(function(e){if(e._bShouldAddMedia){e._addMedia()}})};m.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.call(this);this.updateSelectAllCheckbox();if(this.getFixedLayout()){this._forceStyleChange()}this._renderOverlay();if(this._bPopinChanged){setTimeout(function(){this._firePopinChangedEvent()}.bind(this),0);this._bPopinChanged=false}};m.prototype._renderOverlay=function(){var e=this.$(),t=e.find(".sapMTableOverlay"),i=this.getShowOverlay();if(i&&t.length===0){t=h("<div>").addClass("sapUiOverlay sapMTableOverlay").css("z-index","1");e.append(t)}else if(!i){t.remove()}};m.prototype.setShowOverlay=function(e){this.setProperty("showOverlay",e,true);this._renderOverlay();return this};m.prototype.exit=function(){i.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null}};m.prototype.destroyItems=function(){this._notifyColumns("ItemsRemoved");return i.prototype.destroyItems.apply(this,arguments)};m.prototype.removeAllItems=function(){this._notifyColumns("ItemsRemoved");return i.prototype.removeAllItems.apply(this,arguments)};m.prototype.removeSelections=function(){i.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this};m.prototype.selectAll=function(){i.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this};m.prototype.getColumns=function(e){var t=this.getAggregation("columns",[]);if(e){t.sort(function(e,t){return e.getOrder()-t.getOrder()})}return t};m.prototype.onAfterPageLoaded=function(){this.updateSelectAllCheckbox();if(this.getAlternateRowColors()){var e=this.$("tblBody").removeClass();e.addClass(this._getAlternateRowColorsClass())}i.prototype.onAfterPageLoaded.apply(this,arguments)};m.prototype.shouldRenderItems=function(){return this.getColumns().some(function(e){return e.getVisible()})};m.prototype.onItemTypeColumnChange=function(e,t){this._iItemNeedsColumn+=t?1:-1;if(this._iItemNeedsColumn==1&&t){this._setTypeColumnVisibility(true)}else if(this._iItemNeedsColumn==0){this._setTypeColumnVisibility(false)}};m.prototype.onItemSelectedChange=function(e,t){i.prototype.onItemSelectedChange.apply(this,arguments);setTimeout(function(){this.updateSelectAllCheckbox()}.bind(this),0)};m.prototype.getTableDomRef=function(){return this.getDomRef("listUl")};m.prototype.getItemsContainerDomRef=function(){return this.getDomRef("tblBody")};m.prototype.setNavigationItems=function(e){var t=this.$("tblHeader");var i=this.$("tblFooter");var o=this.$("tblBody").children(".sapMLIB");var n=t.add(o).add(i).get();e.setItemDomRefs(n);if(e.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==c.Upwards){e.setFocusedIndex(n.length-1)}else{e.setFocusedIndex(t[0]?1:0)}}};m.prototype.checkGrowingFromScratch=function(){if(this.hasPopin()){return false}return this.getColumns().some(function(e){return e.getVisible()&&e.getMergeDuplicates()})};m.prototype.onColumnPress=function(e){this.bActiveHeaders&&this.fireEvent("columnPress",{column:e})};m.prototype.onColumnResize=function(e){if(!this.hasPopin()&&!this._mutex){var t=this.getColumns().some(function(e){return e.isPopin()});if(!t){e.setDisplay(this.getTableDomRef(),!e.isHidden());setTimeout(function(){var e=this.getHiddenInPopin()||[];var t=e.some(function(e){return!!e});if(t){this._firePopinChangedEvent()}}.bind(this),100);return}}this._dirty=this._getMediaContainerWidth()||window.innerWidth;if(!this._mutex){var i=this._getMediaContainerWidth()||window.innerWidth;this._mutex=true;this.rerender();setTimeout(function(){if(this._dirty!=i){this._dirty=0;this.rerender()}this._mutex=false}.bind(this),200)}};m.prototype.setTableHeaderVisibility=function(e){if(!this.getDomRef()){return}if(!this.shouldRenderItems()){return this.invalidate()}var t=this.$("tblHeader"),i=!t.hasClass("sapMListTblHeaderNone"),o=t.find(".sapMListTblCell:visible"),n=o.eq(0);if(o.length==1){n.width("")}else{o.each(function(){this.style.width=this.getAttribute("data-sap-width")||""})}this._colCount=o.length+3+!!p.ModeOrder[this.getMode()];this.$("tblBody").find(".sapMGHLICell").attr("colspan",this.getColSpan());this.$("nodata-text").attr("colspan",this.getColCount());if(this.getFixedLayout()){this._forceStyleChange()}if(!e&&i){t[0].className="sapMListTblRow sapMLIBFocusable sapMListTblHeader";this._headerHidden=false}else if(e&&!i&&!o.length){t[0].className="sapMListTblHeaderNone";this._headerHidden=true}};m.prototype._forceStyleChange=function(){if(e.browser.msie||e.browser.edge){var t=this.getTableDomRef().style;t.listStyleType="circle";window.setTimeout(function(){t.listStyleType="none"},0)}};m.prototype._setTypeColumnVisibility=function(e){h(this.getTableDomRef()).toggleClass("sapMListTblHasNav",e)};m.prototype._notifyColumns=function(e,t,i){this.getColumns().forEach(function(o){o["on"+e](t,i)})};m.prototype._getSelectAllCheckbox=function(){if(this.bPreventMassSelection){return}return this._selectAllCheckBox||(this._selectAllCheckBox=new n({id:this.getId("sa"),activeHandling:false}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true)}else{this.removeSelections(false,true)}},this).setTabIndex(-1))};m.prototype.updateSelectAllCheckbox=function(){if(this._selectAllCheckBox&&this.getMode()==="MultiSelect"){var e=this.getItems(),t=this.getSelectedItems().length,i=e.filter(function(e){return e.isSelectable()}).length;this._selectAllCheckBox.setSelected(e.length>0&&t==i)}};m.prototype.enhanceAccessibilityState=function(e,t){if(e==this._selectAllCheckBox){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");t.label=i.getText("TABLE_CHECKBOX_SELECT_ALL")}};m.prototype.getColSpan=function(){return(this._colCount||1)-2};m.prototype.getColCount=function(){return this._colCount||0};m.prototype.hasPopin=function(){return!!this._hasPopin};m.prototype.isHeaderRowEvent=function(e){var t=this.$("tblHeader");return!!h(e.target).closest(t,this.getTableDomRef()).length};m.prototype.isFooterRowEvent=function(e){var t=this.$("tblFooter");return!!h(e.target).closest(t,this.getTableDomRef()).length};m.prototype.getAccessibilityType=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TABLE")};m.prototype._setHeaderAnnouncement=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=e.getText("ACC_CTR_TYPE_HEADER_ROW")+" ";if(this.isAllSelectableSelected()){t+=e.getText("LIST_ALL_SELECTED")}this.getColumns(true).forEach(function(e,i){if(!e.getVisible()){return}var n=e.getHeader();if(n&&n.getVisible()){t+=o.getAccessibilityText(n)+" "}});this.updateInvisibleText(t)};m.prototype._setFooterAnnouncement=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_FOOTER_ROW")+" ";this.getColumns(true).forEach(function(t,i){if(!t.getVisible()){return}var n=t.getFooter();if(n&&n.getVisible()){var s=t.getHeader();if(s&&s.getVisible()){e+=o.getAccessibilityText(s)+" "}e+=o.getAccessibilityText(n)+" "}});this.updateInvisibleText(e)};m.prototype.onsapspace=function(e){if(e.isMarked()){return}if(e.target.id==this.getId("tblHeader")){e.preventDefault();if(this._selectAllCheckBox){this._selectAllCheckBox.setSelected(!this._selectAllCheckBox.getSelected()).fireSelect();e.setMarked()}}};m.prototype.onsaptabnext=function(e){if(e.isMarked()||this.getKeyboardMode()==d.Edit){return}var t=h();if(e.target.id==this.getId("nodata")){t=this.$("nodata")}else if(this.isHeaderRowEvent(e)){t=this.$("tblHeader")}else if(this.isFooterRowEvent(e)){t=this.$("tblFooter")}var i=t.find(":sapTabbable").get(-1)||t[0];if(e.target===i){this.forwardTab(true);e.setMarked()}};m.prototype.onsaptabprevious=function(e){if(e.isMarked()||this.getKeyboardMode()==d.Edit){return}var t=e.target.id;if(t==this.getId("nodata")||t==this.getId("tblHeader")||t==this.getId("tblFooter")){this.forwardTab(false)}else if(t==this.getId("trigger")){this.focusPrevious();e.preventDefault()}};m.prototype.onfocusin=function(e){var t=e.target;if(t.id===this.getId("tblHeader")){this._setHeaderAnnouncement()}else if(t.id===this.getId("tblFooter")){this._setFooterAnnouncement()}if(this._bThemeChanged){this._bThemeChanged=false;this._forceStyleChange()}i.prototype.onfocusin.call(this,e)};m.prototype.onThemeChanged=function(){i.prototype.onThemeChanged.call(this);this._bThemeChanged=true};m.prototype._getAlternateRowColorsClass=function(){if(this.isGrouped()){return"sapMListTblAlternateRowColorsGrouped"}if(this.hasPopin()){return"sapMListTblAlternateRowColorsPopin"}return"sapMListTblAlternateRowColors"};m.prototype.onpaste=function(e){if(e.isMarked()||/^(input|textarea)$/i.test(e.target.tagName)){return}var t=l.getPastedDataAs2DArray(e.originalEvent);if(!t||t.length===0||t[0].length===0){return}this.firePaste({data:t})};m.prototype.onkeydown=function(t){i.prototype.onkeydown.apply(this,arguments);if(e.browser.msie&&t.ctrlKey&&t.which===u.V){this.onpaste(t)}};m.prototype.ondragenter=function(e){var t=e.dragSession;if(!t||!t.getDropControl()||!t.getDropControl().isA("sap.m.Column")){return}t.setIndicatorConfig({height:this.getTableDomRef().clientHeight})};m.prototype.onColumnRecalculateAutoPopin=function(e,t){if(this.getAutoPopinMode()){this._configureAutoPopin(t)}};m.prototype._requireAutoPopinRecalculation=function(e){var t=this.getAutoPopinMode();if(this._bAutoPopinMode!==t){this._bAutoPopinMode=t;return true}if(e.length!==this._aVisibleColumns.length){return true}for(var i=0;i<e.length;i++){if(e[i]!==this._aVisibleColumns[i]){return true}}return false};m.prototype._configureAutoPopin=function(e){var t=this.getColumns(true).filter(function(e){return e.getVisible()});if(!t.length){return}if(!this._aVisibleColumns||!e&&this._requireAutoPopinRecalculation(t)){this._aVisibleColumns=t;if(!e){e=true}}if(e){var i=this.getItems();var o=[];var n=[];var s=[];for(var r=0;r<t.length;r++){var a=t[r].getImportance();if(a==="Medium"||a==="None"){n.push(t[r])}else if(a==="High"){o.push(t[r])}else{s.push(t[r])}}var l=this._getInitialAccumulatedWidth(i)||6.5;l=m._updateAccumulatedWidth(o,o.length>0,l);l=m._updateAccumulatedWidth(n,o.length===0&&n.length>0,l);m._updateAccumulatedWidth(s,o.length===0&&n.length===0&&s.length>0,l)}};m.prototype._getInitialAccumulatedWidth=function(e){var t=e.find(function(e){return e.getHighlight()!=="None"});var i=t?.375:0;var o=this.getMode()==="MultiSelect"||this.getMode()==="Delete"?3:0;var n=e.find(function(e){var t=e.getType();return t==="Detail"||t==="DetailAndActive"||e.getType()==="Navigation"});var s=n?3:0;var r=e.find(function(e){return e.getNavigated()});var a=r?.1875:0;return i+o+s+a};m._updateAccumulatedWidth=function(e,i,o){var n=o;for(var s=0;s<e.length;s++){e[s].setDemandPopin(!(i&&s===0));var r=e[s].getWidth();var a=r.replace(/[^a-z]/gi,"");var l=parseFloat(t.BaseFontSize)||16;if(a===""||a==="auto"){n=n+e[s].getAutoPopinWidth()}else if(a==="px"){n=n+parseFloat((parseFloat(r).toFixed(2)/l).toFixed(2))}else if(a==="em"||a==="rem"){n=n+parseFloat(r)}if(e[s].getDemandPopin()){e[s].setMinScreenWidth(n+"rem")}}return n};m.prototype._getHiddenInPopin=function(){var e=this.getColumns().filter(function(e){return e.getVisible()&&e.getDemandPopin()});var t=e.filter(function(e){return e._media&&!e._media.matches&&!e.isPopin()});this._iHiddenPopinColumns=t.length;return t};m.prototype._firePopinChangedEvent=function(){this.fireEvent("popinChanged",{hasPopin:this.hasPopin(),hiddenInPopin:this._getHiddenInPopin()})};return m});