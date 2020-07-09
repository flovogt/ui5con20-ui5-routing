/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/InvisibleText","./ListItemBaseRenderer"],function(e,t,r,a){"use strict";var i=e.ListGrowingDirection;var s=e.ListKeyboardMode;var n=e.ToolbarDesign;var o={apiVersion:2};o.ModeOrder={None:0,Delete:1,MultiSelect:-1,SingleSelect:1,SingleSelectLeft:-1,SingleSelectMaster:0};o.render=function(e,t){e.openStart("div",t);e.class("sapMList");if(t.getInset()){e.class("sapMListInsetBG")}e.style("width",t.getWidth());if(t.getBackgroundDesign){e.class("sapMListBG"+t.getBackgroundDesign())}var r=t.getTooltip_AsString();if(r){e.attr("title",r)}var a=t.getStickyStyleValue();if(a){e.class("sapMSticky");e.class("sapMSticky"+a)}this.renderContainerAttributes(e,t);e.openEnd();e.renderControl(t.getAggregation("_messageStrip"));var o=t.getHeaderText();var d=t.getHeaderToolbar();if(d){d.setDesign(n.Transparent,true);d.addStyleClass("sapMListHdr");d.addStyleClass("sapMListHdrTBar");d.addStyleClass("sapMTBHeader-CTX");e.renderControl(d)}else if(o){e.openStart("header",t.getId("header"));e.class("sapMListHdr").class("sapMListHdrText").openEnd();e.text(o);e.close("header")}var l=t.getInfoToolbar();if(l){l.setDesign(n.Info,true);l.addStyleClass("sapMListInfoTBar");e.openStart("div").class("sapMListInfoTBarContainer").openEnd();e.renderControl(l);e.close("div")}var g=t.getItems(),c=t.getShowNoData(),u=t.shouldRenderItems()&&g.length,p=t.getKeyboardMode()==s.Edit?-1:0,f=t.getGrowingDirection()==i.Upwards&&t.getGrowing();if(f){this.renderGrowing(e,t)}this.renderDummyArea(e,t,"before",-1);this.renderListStartAttributes(e,t);e.class("sapMListUl");if(t._iItemNeedsHighlight){e.class("sapMListHighlight")}if(u||c){e.attr("tabindex",p)}e.class("sapMListShowSeparators"+t.getShowSeparators());e.class("sapMListMode"+t.getMode());if(t._iItemNeedsNavigated){e.class("sapMListNavigated")}e.openEnd();this.renderListHeadAttributes(e,t);if(u){if(f){g.reverse()}for(var S=0;S<g.length;S++){e.renderControl(g[S])}}if(!u&&c){this.renderNoData(e,t)}this.renderListEndAttributes(e,t);this.renderDummyArea(e,t,"after",p);if(!f){this.renderGrowing(e,t)}if(t.getFooterText()){e.openStart("footer",t.getId("footer")).class("sapMListFtr").openEnd();e.text(t.getFooterText());e.close("footer")}e.close("div")};o.renderContainerAttributes=function(e,t){};o.renderListHeadAttributes=function(e,t){};o.renderListStartAttributes=function(e,t){e.openStart("ul",t.getId("listUl"));e.class("sapMListItems");t.addNavSection(t.getId("listUl"));e.accessibilityState(t,this.getAccessibilityState(t))};o.getAriaRole=function(e){return"listbox"};o.getNoDataAriaRole=function(){return null};o.getAriaLabelledBy=function(e){var t=e.getHeaderToolbar();if(t){var r=t.getTitleControl();if(r){return r.getId()}}else if(e.getHeaderText()){return e.getId("header")}};o.getAriaDescribedBy=function(e){if(e.getFooterText()){return e.getId("footer")}};o.getAccessibilityState=function(e){var t=this.getAriaRole(e);return{role:t,multiselectable:t&&e._bSelectionMode?e.getMode()=="MultiSelect":undefined,labelledby:{value:this.getAriaLabelledBy(e),append:true},describedby:{value:this.getAriaDescribedBy(e),append:true}}};o.renderListEndAttributes=function(e,t){e.close("ul")};o.renderNoData=function(e,t){e.openStart("li",t.getId("nodata"));e.attr("tabindex",t.getKeyboardMode()==s.Navigation?-1:0);var r=this.getNoDataAriaRole();if(r){e.attr("role",r)}e.class("sapMLIB").class("sapMListNoData").class("sapMLIBTypeInactive");a.addFocusableClasses.call(a,e);e.openEnd();e.openStart("div",t.getId("nodata-text")).class("sapMListNoDataText").openEnd();e.text(t.getNoDataText(true));e.close("div");e.close("li")};o.renderDummyArea=function(e,r,a,i){e.openStart("div",r.getId(a)).attr("tabindex",i);if(t.system.desktop){e.class("sapMListDummyArea")}e.openEnd().close("div")};o.renderGrowing=function(e,t){var r=t._oGrowingDelegate;if(r){r.render(e)}};o.getAriaAnnouncement=function(e){return r.getStaticId("sap.m",e)};return o},true);