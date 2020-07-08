/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/Icon","sap/ui/core/delegate/ScrollEnablement","./SideNavigationRenderer"],function(t,e,i,o,s,n){"use strict";var r=e.extend("sap.tnt.SideNavigation",{metadata:{library:"sap.tnt",properties:{expanded:{type:"boolean",group:"Misc",defaultValue:true},selectedKey:{type:"string",group:"Data"}},defaultAggregation:"item",aggregations:{item:{type:"sap.tnt.NavigationList",multiple:false,bindable:"bindable"},fixedItem:{type:"sap.tnt.NavigationList",multiple:false},footer:{type:"sap.tnt.NavigationList",multiple:false},_topArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_bottomArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.tnt.NavigationListItem",multiple:false}},events:{itemSelect:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});r.prototype.init=function(){this._scroller=new s(this,this.getId()+"-Flexible-Content",{horizontal:false,vertical:true});this.data("sap-ui-fastnavgroup","true",true)};r.prototype.setAggregation=function(t,i){if(i&&i.attachItemSelect){i.attachItemSelect(this._itemSelectionHandler.bind(this))}return e.prototype.setAggregation.apply(this,arguments)};r.prototype.setExpanded=function(t){if(this.getExpanded()===t){return this}var e=this,i=this.$(),o=e.getAggregation("item"),s=e.getAggregation("fixedItem"),n;if(!this.getDomRef()){this.setProperty("expanded",t);if(o){o.setExpanded(t)}if(s){s.setExpanded(t)}return this}this.setProperty("expanded",t,true);if(e._hasActiveAnimation){e._finishAnimation(!t);i.stop()}if(t){i.toggleClass("sapTntSideNavigationNotExpanded",!t);if(o){o.setExpanded(t)}if(s){s.setExpanded(t)}}else{this._scroller.setVertical(false)}e._hasActiveAnimation=true;n=t?"15rem":"3rem";i.animate({width:n},{duration:300,complete:function(){var t=e.getExpanded();e._finishAnimation(t)}});return this};r.prototype._finishAnimation=function(t){if(!this._hasActiveAnimation||!this.getDomRef()){return}this.$().toggleClass("sapTntSideNavigationNotExpandedWidth",!t);if(!t){this.$().toggleClass("sapTntSideNavigationNotExpanded",!t);if(this.getAggregation("item")){this.getAggregation("item").setExpanded(t)}if(this.getAggregation("fixedItem")){this.getAggregation("fixedItem").setExpanded(t)}this._scroller.setVertical(true)}this.$().css("width","");this._hasActiveAnimation=false;setTimeout(this._toggleArrows.bind(this),0)};r.prototype.onBeforeRendering=function(){var t=this.getSelectedItem(),e=this.getSelectedKey();if(e){this.setSelectedKey(e)}else if(t){this.setSelectedItem(t)}this._deregisterControl()};r.prototype.onAfterRendering=function(){this._ResizeHandler=i.register(this.getDomRef(),this._toggleArrows.bind(this));this._toggleArrows()};r.prototype.setSelectedKey=function(t){var e,i=this.getItem(),o=this.getFixedItem();if(t&&i){e=i._findItemByKey(t);if(!e&&o){e=o._findItemByKey(t)}}if(e){this.setSelectedItem(e)}this.setProperty("selectedKey",t,true);return this};r.prototype.setSelectedItem=function(t){var i=this.getAggregation("item");var o=this.getAggregation("fixedItem");var s;var n;if(!t){if(i.setSelectedItem){i.setSelectedItem(null)}if(o.setSelectedItem){o.setSelectedItem(null)}}if(typeof t==="string"){s=sap.ui.getCore().byId(t)}else{s=t}n=s?s._getUniqueKey():"";this.setProperty("selectedKey",n,true);var r=s&&s.getNavigationList&&s.getNavigationList()===i;var a=s&&s.getNavigationList&&s.getNavigationList()===o;if(r){i.setSelectedItem(s);if(o){o.setSelectedKey(null)}}if(a){o.setSelectedItem(s);if(i){i.setSelectedKey(null)}}return e.prototype.setAssociation.call(this,"selectedItem",s,true)};r.prototype.exit=function(){if(this._scroller){this._scroller.destroy();this._scroller=null}this._deregisterControl()};r.prototype._itemSelectionHandler=function(t){var e=t.getParameter("item");this.setSelectedItem(e);this.fireItemSelect({item:e})};r.prototype._deregisterControl=function(){if(this._ResizeHandler){i.deregister(this._ResizeHandler);this._ResizeHandler=null}};r.prototype._getTopArrowControl=function(){var t=this.getAggregation("_topArrowControl");var e=this;if(!t){t=new o({src:"sap-icon://navigation-up-arrow",noTabStop:true,useIconTooltip:false,tooltip:"",press:this._arrowPress.bind(e)}).addStyleClass("sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconUp");this.setAggregation("_topArrowControl",t,true)}return t};r.prototype._getBottomArrowControl=function(){var t=this.getAggregation("_bottomArrowControl");var e=this;if(!t){t=new o({src:"sap-icon://navigation-down-arrow",noTabStop:true,useIconTooltip:false,tooltip:"",press:this._arrowPress.bind(e)}).addStyleClass("sapTntSideNavigationScrollIcon sapTntSideNavigationScrollIconDown");this.setAggregation("_bottomArrowControl",t,true)}return t};r.prototype._toggleArrows=function(){var t=this.getDomRef();if(!t){return}var e=this.$("Flexible")[0];var i=this.$("Flexible-Content")[0];var o=this.getExpanded();if(this._hasActiveAnimation){t.querySelector(".sapTntSideNavigationScrollIconUp").style.display="none";t.querySelector(".sapTntSideNavigationScrollIconDown").style.display="none";return}if(i.offsetHeight>e.offsetHeight&&!o){t.querySelector(".sapTntSideNavigationScrollIconUp").style.display="block";t.querySelector(".sapTntSideNavigationScrollIconDown").style.display="block";t.querySelector(".sapTntSideNavigationScrollIconDown").classList.remove("sapTntSideNavigationScrollIconDisabled")}else{t.querySelector(".sapTntSideNavigationScrollIconUp").style.display="none";t.querySelector(".sapTntSideNavigationScrollIconDown").style.display="none"}};r.prototype._arrowPress=function(t){t.preventDefault();var e=document.getElementById(t.oSource.sId);var i=e.classList.contains("sapTntSideNavigationScrollIconDown")?true:false;var o=this.$("Flexible");var s=i?40:-40;o[0].scrollTop+=s};return r});