/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","sap/ui/core/InvisibleText","./PlanningCalendarLegend","sap/ui/unified/library"],function(e,a,t,l,n,r){"use strict";var s=2;var i=2;var o=1;var p=r.CalendarDayType;var d={apiVersion:2};d.render=function(e,a){e.openStart("div",a);e.class("sapMSinglePCGrid");e.openEnd();e.renderControl(a.getAggregation("_columnHeaders"));this.renderBlockersContainer(e,a);e.openStart("div");e.attr("role","grid");e.class("sapMSinglePCGridContent");e.openEnd();this.renderRowHeaders(e,a);this.renderNowMarker(e,a);this.renderColumns(e,a);e.close("div");e.close("div")};d.renderBlockersContainer=function(t,r){var s=r._getColumns(),i=r._getBlockersToRender().iMaxlevel,o=r.getStartDate(),p=(i+1)*r._getBlockerRowHeight()+3,d=r._getDateFormatter(),c=r.getSpecialDates(),g=e.fromLocalJSDate(o),u=r._getColumnHeaders()._getDateTypes(g),f,S;t.openStart("div");t.attr("role","grid");t.class("sapMSinglePCBlockersRow");t.openEnd();t.openStart("div");t.attr("role","row");t.class("sapMSinglePCBlockersColumns");if(c&&r._getColumns()===1){if(u&&u[0]){f=u[0];t.class("sapUiCalItem"+f.type);S=n.findLegendItemForItem(sap.ui.getCore().byId(r._sLegendId),f)}t.class("sapMSpecialDaysInDayView")}t.style("height",p+"px");t.openEnd();this.renderDndPlaceholders(t,r,r.getAggregation("_blockersPlaceholders"));for(var C=0;C<s;C++){var v=new e(o.getFullYear(),o.getMonth(),o.getDate()+C);t.openStart("div");t.attr("role","gridcell");t.attr("data-sap-start-date",d.format(v.toLocalJSDate()));t.attr("data-sap-end-date",d.format(v.toLocalJSDate()));t.attr("aria-labelledby",l.getStaticId("sap.m","SPC_BLOCKERS")+" "+"fullDay-"+d.format(v.toLocalJSDate())+"-Descr");t.class("sapMSinglePCBlockersColumn");t.attr("tabindex",-1);if(v.isSame(new e)){t.class("sapMSinglePCBlockersColumnToday")}if(a._isWeekend(v,r._getCoreLocaleData())){t.class("sapMSinglePCBlockersColumnWeekend")}t.openEnd();t.openStart("span","fullDay-"+d.format(v.toLocalJSDate())+"-Descr");t.class("sapUiInvisibleText");t.openEnd();t.text(r._getCellStartEndInfo(v.toLocalJSDate()));if(r._sLegendId&&S){t.text(S)}t.close("span");t.close("div")}this.renderBlockers(t,r);t.close("div");t.close("div")};d.renderBlockers=function(e,a){var t=this,n=a._getBlockersToRender().oBlockersList;e.openStart("div");e.attr("role","list");e.attr("aria-labelledby",l.getStaticId("sap.m","SPC_BLOCKERS"));e.class("sapMSinglePCBlockers");e.class("sapUiCalendarRowVisFilled");e.openEnd();n.getIterator().forEach(function(l){t.renderBlockerAppointment(e,a,l)});e.close("div")};d.renderBlockerAppointment=function(t,n,r){var s=e.fromLocalJSDate(n.getStartDate()),i=r.getData(),o=e.fromLocalJSDate(i.getStartDate()),d=e.fromLocalJSDate(i.getEndDate()),c=a._daysBetween(o,s),g=a._daysBetween(d,s),u=n._getColumns(),f=n._getBlockerRowHeight(),S=r.level,C=r.width,v=i.getTooltip_AsString(),b=i.getType(),m=i.getColor(),A=i.getTitle(),T=i.getText(),y=i.getIcon(),M=i.getId(),_={role:"listitem",labelledby:{value:l.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},w=n.getAriaLabelledBy(),E=c*(100/u),P=(u-g-1)*(100/u),D=sap.ui.getCore().getConfiguration().getRTL(),h;if(w.length>0){_["labelledby"].value=_["labelledby"].value+" "+w.join(" ")}if(A){_["labelledby"].value=_["labelledby"].value+" "+M+"-Title"}_["labelledby"].value=_["labelledby"].value+" "+M+"-Descr";if(T){_["labelledby"].value=_["labelledby"].value+" "+M+"-Text"}if(i.getTentative()){_["labelledby"].value=_["labelledby"].value+" "+l.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(i.getSelected()){_["labelledby"].value=_["labelledby"].value+" "+l.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}t.openStart("div",i);t.attr("data-sap-level",S);t.attr("data-sap-width",C);t.attr("tabindex",0);if(v){t.attr("title",v)}t.accessibilityState(i,_);t.class("sapMSinglePCAppointmentWrap");t.class("sapUiCalendarRowApps");if(!m&&b!==p.None){t.class("sapUiCalendarApp"+b)}if(m){if(sap.ui.getCore().getConfiguration().getRTL()){t.style("border-right-color",m)}else{t.style("border-left-color",m)}}t.style("top",f*S+1+"px");t.style(D?"right":"left",Math.max(E,0)+"%");t.style(D?"left":"right",Math.max(P,0)+"%");t.openEnd();t.openStart("div");t.class("sapUiCalendarApp");if(i.getSelected()){t.class("sapUiCalendarAppSel")}if(i.getTentative()){t.class("sapUiCalendarAppTent")}if(y){t.class("sapUiCalendarAppWithIcon")}t.openEnd();t.openStart("div");t.class("sapUiCalendarAppCont");if(m){t.style("background-color",i._getCSSColorForBackground(m))}t.openEnd();if(E<0){h=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];t.icon("sap-icon://arrow-left",h,{title:null})}if(y){h=["sapUiCalendarAppIcon"];var I={};I["id"]=M+"-Icon";I["title"]=null;t.icon(y,h,I)}if(A){t.openStart("span",M+"-Title");t.class("sapUiCalendarAppTitle");t.openEnd();t.text(A,true);t.close("span")}if(P<0){h=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];t.icon("sap-icon://arrow-right",h,{title:null})}t.openStart("span",M+"-Descr");t.class("sapUiInvisibleText");t.openEnd();t.text(n._getAppointmentAnnouncementInfo(i));t.close("span");t.close("div");t.close("div");t.close("div")};d.renderRowHeaders=function(e,a){var t=a._getVisibleStartHour(),l=a._getVisibleEndHour(),n=new Date,r=a._getHoursFormat(),s=a._getAMPMFormat();e.openStart("div");e.class("sapMSinglePCRowHeaders");e.openEnd();for(var i=t;i<=l;i++){n.setHours(i);e.openStart("span");e.class("sapMSinglePCRowHeader");e.class("sapMSinglePCRowHeader"+i);if(a._shouldHideRowHeader(i)){e.class("sapMSinglePCRowHeaderHidden")}e.openEnd();e.text(r.format(n));if(a._hasAMPM()){e.openStart("span");e.class("sapMSinglePCRowHeaderAMPM");e.openEnd();e.text(" "+s.format(n));e.close("span")}e.close("span")}e.close("div")};d.renderColumns=function(t,n){var r=n._getColumns(),s=n.getStartDate(),i=n._getAppointmentsToRender();t.openStart("div");t.attr("role","grid");t.attr("aria-labelledby",l.getStaticId("sap.m","SPC_APPOINTMENTS"));t.class("sapMSinglePCColumns");t.openEnd();for(var o=0;o<r;o++){var p=new e(s.getFullYear(),s.getMonth(),s.getDate()+o),d=n._getDateFormatter(),c=d.format(p.toLocalJSDate());t.openStart("div");t.attr("role","row");t.attr("data-sap-day",c);t.class("sapMSinglePCColumn");if(p.isSame(new e)){t.class("sapMSinglePCColumnToday")}if(a._isWeekend(p,n._getCoreLocaleData())){t.class("sapMSinglePCColumnWeekend")}t.openEnd();this.renderDndPlaceholders(t,n,n._dndPlaceholdersMap[p]);this.renderRows(t,n,c);this.renderAppointments(t,n,i[c],p);t.close("div")}t.close("div")};d.renderDndPlaceholders=function(e,a,t){e.openStart("div");e.class("sapMSinglePCOverlay");e.openEnd();t.forEach(e.renderControl);e.close("div")};d.renderRows=function(e,a,t){var l=a._getVisibleStartHour(),n=a._getVisibleEndHour(),r=a._getDateFormatter(),s,i;for(var o=l;o<=n;o++){s=a._parseDateStringAndHours(t,o);i=new Date(s.getFullYear(),s.getMonth(),s.getDate(),s.getHours()+1);e.openStart("div");e.attr("role","gridcell");e.class("sapMSinglePCRow");if(!a._isVisibleHour(o)){e.class("sapMSinglePCNonWorkingRow")}e.attr("data-sap-hour",o);e.attr("data-sap-start-date",r.format(s));e.attr("data-sap-end-date",r.format(i));e.attr("aria-labelledby",r.format(s)+"-Descr");e.attr("tabindex",-1);e.openEnd();e.openStart("span",r.format(s)+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(a._getCellStartEndInfo(s,i));e.close("span");e.close("div")}};d.renderAppointments=function(e,a,t,l){var n=this;if(t){e.openStart("div");e.attr("role","list");e.class("sapMSinglePCAppointments");e.class("sapUiCalendarRowVisFilled");e.openEnd();t.oAppointmentsList.getIterator().forEach(function(r){var s=t.iMaxLevel,i=r.level,o=r.width,p=r.getData();n.renderAppointment(e,a,s,i,o,p,l)});e.close("div")}};d.renderAppointment=function(n,r,d,c,g,u,f){var S=e.fromLocalJSDate(r.getStartDate()),C=new e(S),v=r._getRowHeight(),b=new t(f.getYear(),f.getMonth(),f.getDate(),r._getVisibleStartHour()),m=new t(f.getYear(),f.getMonth(),f.getDate(),r._getVisibleEndHour(),59,59),A=u.getStartDate(),T=u.getEndDate(),y=e.fromLocalJSDate(A),M=e.fromLocalJSDate(T),_=u.getTooltip_AsString(),w=u.getType(),E=u.getColor(),P=u.getTitle(),D=u.getText(),h=u.getIcon(),I=u.getId(),x=this._getLineClamp(A,T),L={role:"listitem",labelledby:{value:l.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},U=r.getAriaLabelledBy(),k=b.getTime()>A.getTime(),R=m.getTime()<T.getTime(),H=k?0:r._calculateTopPosition(A),B=R?0:r._calculateBottomPosition(T),N=100/(d+1),V,F,J,O,W;C.setDate(C.getDate()+r._getColumns()-1);V=a._daysBetween(y,S);F=a._daysBetween(C,M);J=f.isSame(S);O=f.isSame(C);if(U.length>0){L["labelledby"].value=L["labelledby"].value+" "+U.join(" ")}if(P){L["labelledby"].value=L["labelledby"].value+" "+I+"-Title"}L["labelledby"].value=L["labelledby"].value+" "+I+"-Descr";if(D){L["labelledby"].value=L["labelledby"].value+" "+I+"-Text"}if(u.getTentative()){L["labelledby"].value=L["labelledby"].value+" "+l.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(u.getSelected()){L["labelledby"].value=L["labelledby"].value+" "+l.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}n.openStart("div",u);n.attr("data-sap-level",c);n.attr("data-sap-width",g);n.attr("tabindex",0);if(_){n.attr("title",_)}n.accessibilityState(u,L);n.class("sapMSinglePCAppointmentWrap");n.class("sapUiCalendarRowApps");if(!E&&w!==p.None){n.class("sapUiCalendarApp"+w)}if(E){if(sap.ui.getCore().getConfiguration().getRTL()){n.style("border-right-color",E)}else{n.style("border-left-color",E)}}n.style("top",H+"px");n.style("bottom",B+"px");n.style(sap.ui.getCore().getConfiguration().getRTL()?"right":"left",N*c+"%");n.style("width",N*g+"%");n.openEnd();n.openStart("div");n.class("sapUiCalendarApp");n.style("min-height",(v-(s+i+o))/2+"px");if(u.getSelected()){n.class("sapUiCalendarAppSel")}if(u.getTentative()){n.class("sapUiCalendarAppTent")}if(h){n.class("sapUiCalendarAppWithIcon")}n.openEnd();n.openStart("div");n.class("sapUiCalendarAppCont");if(E){n.style("background-color",u._getCSSColorForBackground(E))}n.openEnd();if(J&&V<0){W=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];n.icon("sap-icon://arrow-left",W,{title:null})}if(h){W=["sapUiCalendarAppIcon"];var z={};z["id"]=I+"-Icon";z["title"]=null;n.icon(h,W,z)}n.openStart("div");n.class("sapUiCalendarAppTitleWrapper");n.class("sapUiSPCAppLineClamp"+x);n.openEnd();if(P){n.openStart("span",I+"-Title");n.class("sapUiCalendarAppTitle");n.openEnd();n.text(P,true);n.close("span")}if(D){n.openStart("span",I+"-Text");n.class("sapUiCalendarAppText");n.openEnd();n.text(D,true);n.close("span")}n.close("div");if(O&&F<0){W=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];n.icon("sap-icon://arrow-right",W,{title:null})}n.openStart("span",I+"-Descr");n.class("sapUiInvisibleText");n.openEnd();n.text(r._getAppointmentAnnouncementInfo(u));n.close("span");n.close("div");if(r.getEnableAppointmentsResize()&&!k&&!R){this.renderResizeHandles(n)}n.close("div");n.close("div")};d.renderNowMarker=function(e,a){var t=new Date;e.openStart("div",a.getId()+"-nowMarker");e.style("top",a._calculateTopPosition(t)+"px");e.class("sapMSinglePCNowMarker");if(!a._isVisibleHour(t.getHours())){e.class("sapMSinglePCNowMarkerHidden")}e.openEnd();e.openStart("span",a.getId()+"-nowMarkerText");e.class("sapMSinglePCNowMarkerText");e.openEnd();e.text(a._formatTimeAsString(t));if(a._hasAMPM()){e.openStart("span",a.getId()+"-nowMarkerAMPM");e.class("sapMSinglePCNowMarkerAMPM");e.openEnd();e.text(a._addAMPM(t));e.close("span")}e.close("span");e.close("div")};d.renderResizeHandles=function(e){e.openStart("span");e.class("sapMSinglePCAppResizeHandleBottom");e.openEnd();e.close("span");e.openStart("span");e.class("sapMSinglePCAppResizeHandleTop");e.openEnd();e.close("span")};d._getLineClamp=function(e,t){var l=a._minutesBetween(e,t);if(l>=51&&l<69){return"2"}else if(l>=69&&l<90){return"3"}else if(l>=90&&l<110){return"4"}else if(l>=110&&l<130){return"5"}else if(l>=130&&l<150){return"6"}else if(l>=150&&l<170){return"7"}else if(l>=170&&l<190){return"8"}else if(l>=190){return"9"}else{return"1"}};return d},true);