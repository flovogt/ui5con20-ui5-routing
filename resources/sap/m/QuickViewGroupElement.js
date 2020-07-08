/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","./Link","./Text","sap/ui/core/CustomData"],function(e,t,a,r,u){"use strict";var i=e.QuickViewGroupElementType;var s=t.extend("sap.m.QuickViewGroupElement",{metadata:{library:"sap.m",properties:{visible:{type:"boolean",group:"Appearance",defaultValue:true},label:{type:"string",group:"Misc",defaultValue:""},value:{type:"string",group:"Misc",defaultValue:""},url:{type:"string",group:"Misc",defaultValue:""},target:{type:"string",group:"Misc",defaultValue:"_blank"},type:{type:"sap.m.QuickViewGroupElementType",group:"Misc",defaultValue:i.text},pageLinkId:{type:"string",group:"Misc",defaultValue:""},emailSubject:{type:"string",group:"Misc",defaultValue:""}}}});s.prototype._getGroupElementValue=function(e){if(!this.getValue()){return null}switch(this.getType()){case i.email:var t="mailto:"+this.getValue();var s=this.getEmailSubject();if(s){t+="?subject="+s}return new a({href:t,text:this.getValue(),wrapping:true});case i.phone:case i.mobile:return new a({href:"tel:"+this.getValue(),text:this.getValue()});case i.link:return new a({href:this.getUrl(),text:this.getValue(),target:this.getTarget()});case i.pageLink:var l=this.getPageLinkId();if(e){l=e+"-"+l}return new a({text:this.getValue(),customData:[new u({key:"pageNumber",value:l})]});default:return new r({text:this.getValue()})}};s.prototype.setProperty=function(){t.prototype.setProperty.apply(this,arguments);var e=this.getParent();if(!e){return this}var a=e.getParent();if(a){a._updatePage()}return this};s.prototype.getQuickViewBase=function(){var e=this.getParent();if(e&&e.getQuickViewBase){return e.getQuickViewBase()}return null};return s});