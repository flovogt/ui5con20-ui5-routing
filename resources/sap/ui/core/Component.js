/*
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Manifest","./ComponentMetadata","./Element","sap/base/util/extend","sap/base/util/deepExtend","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectRegistry","sap/ui/thirdparty/URI","sap/ui/performance/trace/Interaction","sap/base/assert","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/UriParameters","sap/base/util/isPlainObject","sap/base/util/LoaderExtensions","sap/ui/VersionInfo"],function(e,t,n,a,i,r,o,s,u,f,c,p,d,l,g,m,y){"use strict";var v={JSON:"JSON",XML:"XML",HTML:"HTML",JS:"JS",Template:"Template"};var h={lazy:"lazy",eager:"eager",waitFor:"waitFor"};function M(e){["sap-client","sap-server"].forEach(function(t){if(!e.hasSearch(t)){var n=sap.ui.getCore().getConfiguration().getSAPParam(t);if(n){e.addSearch(t,n)}}})}function _(e,t,n,a){if(n){for(var i in e){if(!t[i]&&n[i]&&n[i].uri){t[i]=a}}}}function w(e,n,a,r){var o=n.getEntry(a);if(o!==undefined&&!g(o)){return o}var s,u;if(r&&(s=e.getParent())instanceof t){u=s.getManifestEntry(a,r)}if(u||o){o=i({},u,o)}return o}function b(e,t){var n=Object.create(Object.getPrototypeOf(e));n._oMetadata=e;n._oManifest=t;for(var a in e){if(!/^(getManifest|getManifestObject|getManifestEntry|getMetadataVersion)$/.test(a)&&typeof e[a]==="function"){n[a]=e[a].bind(e)}}n.getManifest=function(){return t&&t.getJson()};n.getManifestObject=function(){return t};n.getManifestEntry=function(n,a){return w(e,t,n,a)};n.getMetadataVersion=function(){return 2};return n}function S(e,t,n){c(typeof e==="function","fn must be a function");var a=o._sOwnerId;try{o._sOwnerId=t;return e.call(n)}finally{o._sOwnerId=a}}var C=o.extend("sap.ui.core.Component",{constructor:function(e,t){var n=Array.prototype.slice.call(arguments);if(typeof e!=="string"){t=e;e=undefined}if(t&&typeof t._metadataProxy==="object"){this._oMetadataProxy=t._metadataProxy;this._oManifest=t._metadataProxy._oManifest;delete t._metadataProxy;this.getMetadata=function(){return this._oMetadataProxy}}if(t&&typeof t._cacheTokens==="object"){this._mCacheTokens=t._cacheTokens;delete t._cacheTokens}if(t&&Array.isArray(t._activeTerminologies)){this._aActiveTerminologies=t._activeTerminologies;delete t._activeTerminologies}if(t&&typeof t._manifestModels==="object"){this._mManifestModels=t._manifestModels;delete t._manifestModels}else{this._mManifestModels={}}this._mServices={};o.apply(this,n)},metadata:{stereotype:"component",abstract:true,specialSettings:{componentData:"any"},version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},t);s.apply(C,{onDeregister:function(e){n.registry.forEach(function(t){if(t._sapui_candidateForDestroy&&t._sOwnerId===e&&!t.getParent()){p.debug("destroying dangling template "+t+" when destroying the owner component");t.destroy()}})}});C.prototype.getManifest=function(){if(!this._oManifest){return this.getMetadata().getManifest()}else{return this._oManifest.getJson()}};C.prototype.getManifestEntry=function(e){return this._getManifestEntry(e)};C.prototype._getManifestEntry=function(e,t){if(!this._oManifest){return this.getMetadata().getManifestEntry(e,t)}else{return w(this.getMetadata(),this._oManifest,e,t)}};C.prototype.getManifestObject=function(){if(!this._oManifest){return this.getMetadata().getManifestObject()}else{return this._oManifest}};C.prototype._isVariant=function(){if(this._oManifest){var e=this.getManifestEntry("/sap.ui5/componentName");return e&&e!==this.getManifestEntry("/sap.app/id")}else{return false}};C.activateCustomizing=function(e){};C.deactivateCustomizing=function(e){};C.getOwnerIdFor=function(e){c(e instanceof o,"oObject must be given and must be a ManagedObject");var t=e instanceof o&&e._sOwnerId;return t||undefined};C.getOwnerComponentFor=function(e){return C.get(C.getOwnerIdFor(e))};C.prototype.runAsOwner=function(e){return S(e,this.getId())};C.prototype.getInterface=function(){return this};C.prototype._initCompositeSupport=function(e){this.oComponentData=e&&e.componentData;if(!this._isVariant()){this.getMetadata().init()}else{this._oManifest.init(this);var t=this._oManifest.getEntry("/sap.app/id");if(t){U(t,this._oManifest.resolveUri("./","manifest"))}}this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=function(e){var t=e.originalEvent;this.onWindowError(t.message,t.filename,t.lineno)}.bind(this);window.addEventListener("error",this._fnWindowErrorHandler)}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=this.onWindowBeforeUnload.bind(this);window.addEventListener("beforeunload",this._fnWindowBeforeUnloadHandler)}if(this.onWindowUnload){this._fnWindowUnloadHandler=this.onWindowUnload.bind(this);window.addEventListener("unload",this._fnWindowUnloadHandler)}};C.prototype.destroy=function(){for(var e in this._mServices){if(this._mServices[e].instance){this._mServices[e].instance.destroy()}}delete this._mServices;for(var t in this._mManifestModels){this._mManifestModels[t].destroy()}delete this._mManifestModels;if(this._fnWindowErrorHandler){window.removeEventListener("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler}if(this._fnWindowBeforeUnloadHandler){window.removeEventListener("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler}if(this._fnWindowUnloadHandler){window.removeEventListener("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus}o.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);if(!this._isVariant()){this.getMetadata().exit()}else{this._oManifest.exit(this);delete this._oManifest}};C.prototype.getComponentData=function(){return this.oComponentData};C.prototype.getEventBus=function(){if(!this._oEventBus){var e=this.getMetadata().getName();p.warning("Synchronous loading of EventBus, due to #getEventBus() call on Component '"+e+"'.","SyncXHR",null,function(){return{type:"SyncXHR",name:e}});var t=sap.ui.requireSync("sap/ui/core/EventBus");this._oEventBus=new t}return this._oEventBus};C.prototype.initComponentModels=function(){var e=this.getMetadata();if(e.isBaseClass()){return}var t=this._getManifestEntry("/sap.app/dataSources",true)||{};var n=this._getManifestEntry("/sap.ui5/models",true)||{};this._initComponentModels(n,t,this._mCacheTokens)};C.prototype._initComponentModels=function(e,t,n){var a=C._createManifestModelConfigurations({models:e,dataSources:t,component:this,mergeParent:true,cacheTokens:n,activeTerminologies:this.getActiveTerminologies()});if(!a){return}var i={};for(var r in a){if(!this._mManifestModels[r]){i[r]=a[r]}}var o=C._createManifestModels(i,this.toString());for(var r in o){this._mManifestModels[r]=o[r]}for(var r in this._mManifestModels){var s=this._mManifestModels[r];this.setModel(s,r||undefined)}};C.prototype.getService=function(e){if(!this._mServices[e]){this._mServices[e]={};this._mServices[e].promise=new Promise(function(t,n){sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"],function(a){var i=this._getManifestEntry("/sap.ui5/services/"+e,true);var r=i&&i.factoryName;if(!r){n(new Error("Service "+e+" not declared!"));return}var o=a.get(r);if(o){o.createInstance({scopeObject:this,scopeType:"component",settings:i.settings||{}}).then(function(a){if(!this.bIsDestroyed){this._mServices[e].instance=a;this._mServices[e].interface=a.getInterface();t(this._mServices[e].interface)}else{n(new Error("Service "+e+" could not be loaded as its Component was destroyed."))}}.bind(this)).catch(n)}else{var s="The ServiceFactory "+r+" for Service "+e+" not found in ServiceFactoryRegistry!";var u=this._getManifestEntry("/sap.ui5/services/"+e+"/optional",true);if(!u){p.error(s)}n(new Error(s))}}.bind(this),n)}.bind(this))}return this._mServices[e].promise};function O(e,t){var n=e._getManifestEntry("/sap.ui5/services",true);var a=t?[]:null;if(!n){return a}var i=Object.keys(n);if(!t&&i.some(function(e){return n[e].startup===h.waitFor})){throw new Error('The specified component "'+e.getMetadata().getName()+'" cannot be loaded in sync mode since it has some services declared with "startup" set to "waitFor"')}return i.reduce(function(t,a){if(n[a].lazy===false||n[a].startup===h.waitFor||n[a].startup===h.eager){var i=e.getService(a);if(n[a].startup===h.waitFor){t.push(i)}}return t},a)}C.prototype.createComponent=function(e){c(typeof e==="string"&&e||typeof e==="object"&&typeof e.usage==="string"&&e.usage,"vUsage either must be a non-empty string or an object with a non-empty usage id");var t={async:true};if(e){var n;if(typeof e==="object"){n=e.usage;["id","async","settings","componentData"].forEach(function(n){if(e[n]!==undefined){t[n]=e[n]}})}else if(typeof e==="string"){n=e}t=this._enhanceWithUsageConfig(n,t)}return C._createComponent(t,this)};C.prototype._enhanceWithUsageConfig=function(e,t){var n=this.getManifestEntry("/sap.ui5/componentUsages/"+e);if(!n){throw new Error('Component usage "'+e+'" not declared in Component "'+this.getManifestObject().getComponentName()+'"!')}if(n.activeTerminologies){throw new Error("Terminologies vector can't be used in component usages")}return i(n,t)};C.prototype.getActiveTerminologies=function(){return this._aActiveTerminologies?this._aActiveTerminologies.slice():undefined};C._createComponent=function(e,t){function n(){if(e.async===true){return C.create(e)}else{return sap.ui.component(e)}}if(t){return t.runAsOwner(n)}else{return n()}};C._createManifestModelConfigurations=function(e){var n=e.component;var a=e.manifest||n.getManifestObject();var i=e.mergeParent;var r=e.cacheTokens||{};var o=n?n.toString():a.getComponentName();var s=sap.ui.getCore().getConfiguration();var f=e.activeTerminologies;if(!e.models){return null}var c={models:e.models,dataSources:e.dataSources||{},origin:{dataSources:{},models:{}}};if(n&&i){var d=n.getMetadata();while(d instanceof t){var l=d.getManifestObject();var g=d.getManifestEntry("/sap.app/dataSources");_(c.dataSources,c.origin.dataSources,g,l);var m=d.getManifestEntry("/sap.ui5/models");_(c.models,c.origin.models,m,l);d=d.getParent()}}var y={};for(var v in c.models){var h=c.models[v];var w=false;var b=null;if(typeof h==="string"){h={dataSource:h}}if(h.dataSource){var S=c.dataSources&&c.dataSources[h.dataSource];if(typeof S==="object"){if(S.type===undefined){S.type="OData"}var C;if(!h.type){switch(S.type){case"OData":C=S.settings&&S.settings.odataVersion;if(C==="4.0"){h.type="sap.ui.model.odata.v4.ODataModel"}else if(!C||C==="2.0"){h.type="sap.ui.model.odata.v2.ODataModel"}else{p.error('Component Manifest: Provided OData version "'+C+'" in '+'dataSource "'+h.dataSource+'" for model "'+v+'" is unknown. '+'Falling back to default model type "sap.ui.model.odata.v2.ODataModel".','["sap.app"]["dataSources"]["'+h.dataSource+'"]',o);h.type="sap.ui.model.odata.v2.ODataModel"}break;case"JSON":h.type="sap.ui.model.json.JSONModel";break;case"XML":h.type="sap.ui.model.xml.XMLModel";break;default:}}if(h.type==="sap.ui.model.odata.v4.ODataModel"&&S.settings&&S.settings.odataVersion){h.settings=h.settings||{};h.settings.odataVersion=S.settings.odataVersion}if(!h.uri){h.uri=S.uri;w=true}if(S.type==="OData"&&S.settings&&typeof S.settings.maxAge==="number"){h.settings=h.settings||{};h.settings.headers=h.settings.headers||{};h.settings.headers["Cache-Control"]="max-age="+S.settings.maxAge}if(S.type==="OData"&&S.settings&&S.settings.annotations){var O=S.settings.annotations;for(var E=0;E<O.length;E++){var P=c.dataSources[O[E]];if(!P){p.error('Component Manifest: ODataAnnotation "'+O[E]+'" for dataSource "'+h.dataSource+'" could not be found in manifest','["sap.app"]["dataSources"]["'+O[E]+'"]',o);continue}if(P.type!=="ODataAnnotation"){p.error('Component Manifest: dataSource "'+O[E]+'" was expected to have type "ODataAnnotation" but was "'+P.type+'"','["sap.app"]["dataSources"]["'+O[E]+'"]',o);continue}if(!P.uri){p.error('Component Manifest: Missing "uri" for ODataAnnotation "'+O[E]+'"','["sap.app"]["dataSources"]["'+O[E]+'"]',o);continue}var U=new u(P.uri);if(h.type==="sap.ui.model.odata.v2.ODataModel"){["sap-language","sap-client"].forEach(function(e){if(!U.hasQuery(e)&&s.getSAPParam(e)){U.setQuery(e,s.getSAPParam(e))}});var T=r.dataSources&&r.dataSources[P.uri];if(T){var j=function(){if(!U.hasQuery("sap-language")){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for ODataAnnotation "'+O[E]+'" ('+U.toString()+"). "+'Missing "sap-language" URI parameter','["sap.app"]["dataSources"]["'+O[E]+'"]',o);return}if(!U.hasQuery("sap-client")){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for ODataAnnotation "'+O[E]+'" ('+U.toString()+"). "+'Missing "sap-client" URI parameter','["sap.app"]["dataSources"]["'+O[E]+'"]',o);return}if(!U.hasQuery("sap-client",s.getSAPParam("sap-client"))){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for ODataAnnotation "'+O[E]+'" ('+U.toString()+"). "+'URI parameter "sap-client='+U.query(true)["sap-client"]+'" must be identical with configuration "sap-client='+s.getSAPParam("sap-client")+'"','["sap.app"]["dataSources"]["'+O[E]+'"]',o);return}if(U.hasQuery("sap-context-token")&&!U.hasQuery("sap-context-token",T)){var e=U.query(true)["sap-context-token"];p.warning('Component Manifest: Overriding existing "sap-context-token='+e+'" with provided value "'+T+'" for ODataAnnotation "'+O[E]+'" ('+U.toString()+").",'["sap.app"]["dataSources"]["'+O[E]+'"]',o)}U.setQuery("sap-context-token",T)};j()}}var k=c.origin.dataSources[O[E]]||a;var x=k._resolveUri(U).toString();h.settings=h.settings||{};h.settings.annotationURI=h.settings.annotationURI||[];h.settings.annotationURI.push(x)}}}else{p.error('Component Manifest: dataSource "'+h.dataSource+'" for model "'+v+'" not found or invalid','["sap.app"]["dataSources"]["'+h.dataSource+'"]',o);continue}}if(!h.type){p.error('Component Manifest: Missing "type" for model "'+v+'"','["sap.ui5"]["models"]["'+v+'"]',o);continue}if(h.type==="sap.ui.model.odata.ODataModel"&&(!h.settings||h.settings.json===undefined)){h.settings=h.settings||{};h.settings.json=true}if(h.type==="sap.ui.model.resource.ResourceModel"){if(h.uri&&h.settings&&h.settings.bundleUrl){p.warning("Defining both model uri and bundleUrl is not supported. Only model uri will be resolved.")}if(!h.uri&&h.settings&&h.settings.terminologies){if(h.bundleUrl||h.settings.bundleUrl){h.uri=h.bundleUrl||h.settings.bundleUrl;delete h.settings.bundleUrl}}}if(h.uri){var A=new u(h.uri);var D=(w?c.origin.dataSources[h.dataSource]:c.origin.models[v])||a;A=D._resolveUri(A);if(h.dataSource){M(A);if(h.type==="sap.ui.model.odata.v2.ODataModel"){b=h.settings&&h.settings.metadataUrlParams;if((!b||typeof b["sap-language"]==="undefined")&&!A.hasQuery("sap-language")&&s.getSAPParam("sap-language")){h.settings=h.settings||{};b=h.settings.metadataUrlParams=h.settings.metadataUrlParams||{};b["sap-language"]=s.getSAPParam("sap-language")}if(r.dataSources){var T=r.dataSources[S.uri];if(T){var I=function(){if(A.hasQuery("sap-context-token")){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for model "'+v+'" ('+A.toString()+"). "+'Model URI already contains parameter "sap-context-token='+A.query(true)["sap-context-token"]+'"','["sap.ui5"]["models"]["'+v+'"]',o);return}if((!b||typeof b["sap-language"]==="undefined")&&!A.hasQuery("sap-language")){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for model "'+v+'" ('+A.toString()+"). "+'Missing "sap-language" parameter','["sap.ui5"]["models"]["'+v+'"]',o);return}if(!A.hasQuery("sap-client")){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for model "'+v+'" ('+A.toString()+"). "+'Missing "sap-client" parameter','["sap.ui5"]["models"]["'+v+'"]',o);return}if(!A.hasQuery("sap-client",s.getSAPParam("sap-client"))){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for model "'+v+'" ('+A.toString()+"). "+'URI parameter "sap-client='+A.query(true)["sap-client"]+'" must be identical with configuration "sap-client='+s.getSAPParam("sap-client")+'"','["sap.ui5"]["models"]["'+v+'"]',o);return}if(b&&typeof b["sap-client"]!=="undefined"){if(b["sap-client"]!==s.getSAPParam("sap-client")){p.warning('Component Manifest: Ignoring provided "sap-context-token='+T+'" for model "'+v+'" ('+A.toString()+"). "+'Parameter metadataUrlParams["sap-client"] = "'+b["sap-client"]+'" must be identical with configuration "sap-client='+s.getSAPParam("sap-client")+'"','["sap.ui5"]["models"]["'+v+'"]',o);return}}if(b&&b["sap-context-token"]&&b["sap-context-token"]!==T){p.warning('Component Manifest: Overriding existing "sap-context-token='+b["sap-context-token"]+'" with provided value "'+T+'" for model "'+v+'" ('+A.toString()+").",'["sap.ui5"]["models"]["'+v+'"]',o)}if(!b){h.settings=h.settings||{};b=h.settings.metadataUrlParams=h.settings.metadataUrlParams||{}}b["sap-context-token"]=T};I()}}}}h.uri=A.toString()}if(h.uriSettingName===undefined){switch(h.type){case"sap.ui.model.odata.ODataModel":case"sap.ui.model.odata.v2.ODataModel":case"sap.ui.model.odata.v4.ODataModel":h.uriSettingName="serviceUrl";break;case"sap.ui.model.resource.ResourceModel":h.uriSettingName="bundleUrl";break;default:}}var N;var R;if(n){R=n.getComponentData()}else{R=e.componentData}N=R&&R.startupParameters&&R.startupParameters["sap-system"];if(!N){N=s.getSAPParam("sap-system")}var H=false;var B;if(N&&["sap.ui.model.odata.ODataModel","sap.ui.model.odata.v2.ODataModel"].indexOf(h.type)!=-1){H=true;B=sap.ui.requireSync("sap/ui/model/odata/ODataUtils")}if(h.uri){if(H){h.preOriginBaseUri=h.uri.split("?")[0];h.uri=B.setOrigin(h.uri,{alias:N});h.postOriginBaseUri=h.uri.split("?")[0]}if(h.uriSettingName!==undefined){h.settings=h.settings||{};if(!h.settings[h.uriSettingName]){h.settings[h.uriSettingName]=h.uri}}else if(h.settings){h.settings=[h.uri,h.settings]}else{h.settings=[h.uri]}}else{if(H&&h.uriSettingName!==undefined&&h.settings&&h.settings[h.uriSettingName]){h.preOriginBaseUri=h.settings[h.uriSettingName].split("?")[0];h.settings[h.uriSettingName]=B.setOrigin(h.settings[h.uriSettingName],{alias:N});h.postOriginUri=h.settings[h.uriSettingName].split("?")[0]}}if(H&&h.settings&&h.settings.annotationURI){var F=[].concat(h.settings.annotationURI);var W=[];for(var E=0;E<F.length;E++){W.push(B.setAnnotationOrigin(F[E],{alias:N,preOriginBaseUri:h.preOriginBaseUri,postOriginBaseUri:h.postOriginBaseUri}))}h.settings.annotationURI=W}if(h.type==="sap.ui.model.resource.ResourceModel"&&h.settings){if(f){h.settings.activeTerminologies=f}a._processResourceConfiguration(h.settings,undefined,true)}if(h.settings&&!Array.isArray(h.settings)){h.settings=[h.settings]}y[v]=h}if(a.getEntry("/sap.ui5/commands")||n&&n._getManifestEntry("/sap.ui5/commands",true)){y["$cmd"]={type:"sap.ui.model.json.JSONModel"}}return y};C._createManifestModels=function(e,t){var n={};for(var a in e){var i=e[a];try{sap.ui.requireSync(i.type.replace(/\./g,"/"))}catch(e){p.error('Component Manifest: Class "'+i.type+'" for model "'+a+'" could not be loaded. '+e,'["sap.ui5"]["models"]["'+a+'"]',t);continue}var r=d.get(i.type);if(!r){p.error('Component Manifest: Class "'+i.type+'" for model "'+a+'" could not be found','["sap.ui5"]["models"]["'+a+'"]',t);continue}var o=[null].concat(i.settings||[]);var s=r.bind.apply(r,o);var u=new s;n[a]=u}return n};function E(e,t,n,a){var i={afterManifest:{},afterPreload:{}};var o=r({},e.getEntry("/sap.app/dataSources"));var s=r({},e.getEntry("/sap.ui5/models"));var u=C._createManifestModelConfigurations({models:s,dataSources:o,manifest:e,componentData:t,cacheTokens:n,activeTerminologies:a});var f=l.fromQuery(window.location.search).get("sap-ui-xx-preload-component-models-"+e.getComponentName());var c=f&&f.split(",");for(var d in u){var g=u[d];if(!g.preload&&c&&c.indexOf(d)>-1){g.preload=true;p.warning('FOR TESTING ONLY!!! Activating preload for model "'+d+'" ('+g.type+")",e.getComponentName(),"sap.ui.core.Component")}if(g.type==="sap.ui.model.resource.ResourceModel"&&Array.isArray(g.settings)&&g.settings.length>0&&g.settings[0].async!==true){i.afterPreload[d]=g}else if(g.preload){if(sap.ui.loader._.getModuleState(g.type.replace(/\./g,"/")+".js")){i.afterManifest[d]=g}else{p.warning('Can not preload model "'+d+'" as required class has not been loaded: "'+g.type+'"',e.getComponentName(),"sap.ui.core.Component")}}}return i}function P(e){return sap.ui.require.toUrl(e.replace(/\./g,"/")+"/manifest.json")}function U(e,t){m.registerResourcePath(e.replace(/\./g,"/"),t)}function T(e){var n=[];var a=[];function i(e){if(!e._oManifest){var r=e.getComponentName();var o=P(r);var s=m.loadResource({url:o,dataType:"json",async:true}).catch(function(e){p.error('Failed to load component manifest from "'+o+'" (component '+r+")! Reason: "+e);return{}});n.push(s);a.push(e)}var u=e.getParent();if(u&&u instanceof t&&!u.isBaseClass()){i(u)}}i(e);return Promise.all(n).then(function(e){for(var t=0;t<e.length;t++){if(e[t]){a[t]._applyManifest(e[t])}}})}C._fnLoadComponentCallback=null;C._fnOnInstanceCreated=null;C._fnPreprocessManifest=null;C.create=function(e){if(e==null||typeof e!=="object"){throw new TypeError("Component.create() must be called with a configuration object.")}var t=r({},e);t.async=true;if(t.manifest===undefined){t.manifest=true}return j(t)};sap.ui.component=function(e){if(!e){throw new Error("sap.ui.component cannot be called without parameter!")}var t=function(e){return{type:"sap.ui.component",name:e}};if(typeof e==="string"){p.warning("Do not use deprecated function 'sap.ui.component' ("+e+") + for Component instance lookup. "+"Use 'Component.get' instead","sap.ui.component",null,t.bind(null,e));return sap.ui.getCore().getComponent(e)}if(e.async){p.info("Do not use deprecated factory function 'sap.ui.component' ("+e["name"]+"). "+"Use 'Component.create' instead","sap.ui.component",null,t.bind(null,e["name"]))}else{p.warning("Do not use synchronous component creation ("+e["name"]+")! "+"Use the new asynchronous factory 'Component.create' instead","sap.ui.component",null,t.bind(null,e["name"]))}return j(e)};function j(e){var t=C.get(o._sOwnerId);var n=e.activeTerminologies||t&&t.getActiveTerminologies()||sap.ui.getCore().getConfiguration().getActiveTerminologies();if(!e.asyncHints||!e.asyncHints.cacheTokens){var i=t&&t._mCacheTokens;if(typeof i==="object"){e.asyncHints=e.asyncHints||{};e.asyncHints.cacheTokens=i}}function r(e,t){if(typeof C._fnOnInstanceCreated==="function"){var n=C._fnOnInstanceCreated(e,t);if(t.async&&n instanceof Promise){return n}}if(t.async){return Promise.resolve(e)}return e}function s(t){var i=e.name,o=e.id,s=e.componentData,u=i+".Component",f=e.settings;var d=new t(a({},f,{id:o,componentData:s,_cacheTokens:e.asyncHints&&e.asyncHints.cacheTokens,_activeTerminologies:n}));c(d instanceof C,'The specified component "'+u+'" must be an instance of sap.ui.core.Component!');p.info("Component instance Id = "+d.getId());var l=d.getMetadata().handleValidation()!==undefined||e.handleValidation;if(l){if(d.getMetadata().handleValidation()!==undefined){l=d.getMetadata().handleValidation()}else{l=e.handleValidation}sap.ui.getCore().getMessageManager().registerObject(d,l)}var g=O(d,e.async);if(e.async){return r(d,e).then(function(){return Promise.all(g)}).then(function(){return d})}else{r(d,e);return d}}var u=k(e,{failOnError:true,createModels:true,waitFor:e.asyncHints&&e.asyncHints.waitFor,activeTerminologies:n});if(e.async){var f=o._sOwnerId;return u.then(function(e){return S(function(){return s(e)},f)})}else{return s(u)}}C.load=function(e){var t=r({},e);t.async=true;if(t.manifest===undefined){t.manifest=true}return k(t,{preloadOnly:t.asyncHints&&t.asyncHints.preloadOnly})};C.get=function(e){return sap.ui.getCore().getComponent(e)};sap.ui.component.load=function(e,t){p.warning("Do not use deprecated function 'sap.ui.component.load'! Use 'Component.load' instead");return k(e,{failOnError:t,preloadOnly:e.asyncHints&&e.asyncHints.preloadOnly})};function k(t,n){var a=n.activeTerminologies,o=t.name,s=t.url,u=sap.ui.getCore().getConfiguration(),d=/^(sync|async)$/.test(u.getComponentPreload()),l=t.manifest,g,m,h,M,_,w;function S(n,a){var i=JSON.parse(JSON.stringify(n));if(t.async){return O(i).then(function(t){return new e(t,a)})}else{return new e(i,a)}}function O(e){if(typeof C._fnPreprocessManifest==="function"&&e!=null){try{var n=i({},t);return C._fnPreprocessManifest(e,n)}catch(e){p.error("Failed to execute flexibility hook for manifest preprocessing.",e);return Promise.reject(e)}}else{return Promise.resolve(e)}}c(!s||typeof s==="string","sUrl must be a string or undefined");if(o&&typeof s==="string"){U(o,s)}f.setStepComponent(o);if(l===undefined){g=t.manifestFirst===undefined?u.getManifestFirst():!!t.manifestFirst;m=t.manifestUrl}else{if(t.async===undefined){t.async=true}g=!!l;m=l&&typeof l==="string"?l:undefined;h=l&&typeof l==="object"?S(l,{url:t&&t.altManifestUrl,activeTerminologies:a}):undefined}if(!h&&m){h=e.load({activeTerminologies:a,manifestUrl:m,componentName:o,processJson:O,async:t.async,failOnError:true})}if(h&&!t.async){o=h.getComponentName();if(o&&typeof s==="string"){U(o,s)}}if(!(h&&t.async)){if(!o){throw new Error("The name of the component is undefined.")}c(typeof o==="string","sName must be a string")}if(g&&!h){h=e.load({activeTerminologies:a,manifestUrl:P(o),componentName:o,async:t.async,processJson:O,failOnError:false})}function j(){return(o+".Component").replace(/\./g,"/")}function k(e){var t=o+".Component";if(!e){var a="The specified component controller '"+t+"' could not be found!";if(n.failOnError){throw new Error(a)}else{p.warning(a)}}if(h){var i=b(e.getMetadata(),h);var r=function(){var t=Array.prototype.slice.call(arguments);var n;if(t.length===0||typeof t[0]==="object"){n=t[0]=t[0]||{}}else if(typeof t[0]==="string"){n=t[1]=t[1]||{}}n._metadataProxy=i;if(M){n._manifestModels=M}var a=Object.create(e.prototype);e.apply(a,t);return a};r.getMetadata=function(){return i};r.extend=function(){throw new Error("Extending Components created by Manifest is not supported!")};return r}else{return e}}function x(e,t){c(typeof e==="string"&&e||typeof e==="object"&&typeof e.name==="string"&&e.name,"reference either must be a non-empty string or an object with a non-empty 'name' and an optional 'url' property");if(typeof e==="object"){if(e.url){U(e.name,e.url)}return e.lazy&&t!==true?undefined:e.name}return e}function A(e,t){var n=e+".Component",a=sap.ui.getCore().getConfiguration().getDepCache(),i,r,o;if(d&&e!=null&&!sap.ui.loader._.getModuleState(n.replace(/\./g,"/")+".js")){if(t){r=y._getTransitiveDependencyForComponent(e);if(r){o=[r.library];Array.prototype.push.apply(o,r.dependencies);return sap.ui.getCore().loadLibraries(o,{preloadOnly:true})}else{i=n.replace(/\./g,"/")+(a?"-h2-preload.js":"-preload.js");return sap.ui.loader._.loadJSResourceAsync(i,true)}}try{i=n+"-preload";sap.ui.requireSync(i.replace(/\./g,"/"))}catch(e){p.warning("couldn't preload component from "+i+": "+(e&&e.message||e))}}else if(t){return Promise.resolve()}}function D(e,t,n){var a=[];var i=n?function(e){a.push(e)}:function(){};t.defineResourceRoots();var r=t.getEntry("/sap.ui5/dependencies/libs");if(r){var o=[];for(var s in r){if(!r[s].lazy){o.push(s)}}if(o.length>0){p.info('Component "'+e+'" is loading libraries: "'+o.join(", ")+'"');i(sap.ui.getCore().loadLibraries(o,{async:n}))}}var u=t.getEntry("/sap.ui5/extends/component");if(u){i(A(u,n))}var f=[];var c=t.getEntry("/sap.ui5/dependencies/components");if(c){for(var e in c){if(!c[e].lazy){f.push(e)}}}var d=t.getEntry("/sap.ui5/componentUsages");if(d){for(var l in d){if(d[l].lazy===false&&f.indexOf(d[l].name)===-1){f.push(d[l].name)}}}if(f.length>0){f.forEach(function(e){i(A(e,n))})}return n?Promise.all(a):undefined}if(t.async){var I=t.asyncHints||{},N=[],R=function(e){e=e.then(function(e){return{result:e,rejected:false}},function(e){return{result:e,rejected:true}});return e},H=function(e){if(e){N.push(R(e))}},B=function(e){return e},F,W;if(h&&n.createModels){H(h.then(function(e){_=E(e,t.componentData,I.cacheTokens,a);return e}).then(function(e){if(Object.keys(_.afterManifest).length>0){M=C._createManifestModels(_.afterManifest,e.getComponentName())}return e}))}F=[];if(Array.isArray(I.preloadBundles)){I.preloadBundles.forEach(function(e){F.push(sap.ui.loader._.loadJSResourceAsync(x(e,true),true))})}if(Array.isArray(I.libs)){W=I.libs.map(x).filter(B);F.push(sap.ui.getCore().loadLibraries(W,{preloadOnly:true}))}F=Promise.all(F);if(W&&!n.preloadOnly){F=F.then(function(){return sap.ui.getCore().loadLibraries(W)})}H(F);if(!h){H(A(o,true))}else{H(h.then(function(e){var t=e.getComponentName();if(typeof s==="string"){U(t,s)}return A(t,true).then(function(){return e._processI18n(true)}).then(function(){if(!n.createModels){return null}var a=Object.keys(_.afterPreload);if(a.length===0){return null}return new Promise(function(e,t){sap.ui.require(["sap/ui/model/resource/ResourceModel"],function(t){e(t)},t)}).then(function(i){function r(e){var a=_.afterPreload[e];if(Array.isArray(a.settings)&&a.settings.length>0){var r=a.settings[0];r.activeTerminologies=n.activeTerminologies;return i.loadResourceBundle(r,true).then(function(e){r.bundle=e;delete r.terminologies;delete r.activeTerminologies;delete r.enhanceWith},function(n){p.error("Component Manifest: Could not preload ResourceBundle for ResourceModel. "+"The model will be skipped here and tried to be created on Component initialization.",'["sap.ui5"]["models"]["'+e+'"]',t);p.error(n);delete _.afterPreload[e]})}else{return Promise.resolve()}}return Promise.all(a.map(r)).then(function(){if(Object.keys(_.afterPreload).length>0){var t=C._createManifestModels(_.afterPreload,e.getComponentName());if(!M){M={}}for(var n in t){M[n]=t[n]}}})})})}));w=function(e){if(typeof C._fnLoadComponentCallback==="function"){var n=i({},t);var a=r({},e);try{C._fnLoadComponentCallback(n,a)}catch(t){p.error('Callback for loading the component "'+e.getComponentName()+'" run into an error. The callback was skipped and the component loading resumed.',t,"sap.ui.core.Component")}}}}if(I.components){Object.keys(I.components).forEach(function(e){H(A(x(I.components[e]),true))})}return Promise.all(N).then(function(e){var t=[],n=false,a;n=e.some(function(e){if(e&&e.rejected){a=e.result;return true}t.push(e.result)});if(n){return Promise.reject(a)}return t}).then(function(e){if(h&&w){h.then(w)}return e}).then(function(e){p.debug("Component.load: all promises fulfilled, then "+e);if(h){return h.then(function(e){h=e;o=h.getComponentName();return D(o,h,true)})}else{return e}}).then(function(){if(n.preloadOnly){return true}return new Promise(function(e,t){sap.ui.require([j()],function(t){e(t)},t)}).then(function(t){var i=t.getMetadata();var r=i.getComponentName();var o=P(r);var s;if(h&&typeof l!=="object"&&(typeof m==="undefined"||m===o)){i._applyManifest(JSON.parse(JSON.stringify(h.getRawJson())))}s=T(i);return s.then(function(){var r=Promise.resolve();if(!h&&n.activeTerminologies){h=new e(i.getManifestObject().getRawJson(),{process:false,activeTerminologies:a});r=h._processI18n(true)}return r.then(k.bind(undefined,t))})})}).then(function(e){if(!h){return e}var t=[];var n;var i=h.getEntry("/sap.ui5/rootView");if(typeof i==="string"){n="XML"}else if(i&&typeof i==="object"&&i.type){n=i.type}if(n&&v[n]){var o="sap/ui/core/mvc/"+v[n]+"View";t.push(o)}var s=h.getEntry("/sap.ui5/routing");if(s&&s.routes){var u=h.getEntry("/sap.ui5/routing/config/routerClass")||"sap.ui.core.routing.Router";var f=u.replace(/\./g,"/");t.push(f)}var c=r({},h.getEntry("/sap.ui5/models"));var d=r({},h.getEntry("/sap.app/dataSources"));var l=C._createManifestModelConfigurations({models:c,dataSources:d,manifest:h,cacheTokens:I.cacheTokens,activeTerminologies:a});for(var g in l){if(!l.hasOwnProperty(g)){continue}var m=l[g];if(!m.type){continue}var y=m.type.replace(/\./g,"/");if(t.indexOf(y)===-1){t.push(y)}}if(t.length>0){return Promise.all(t.map(function(e){return new Promise(function(t,n){var a=false;function i(n){if(a){return}p.warning('Can not preload module "'+e+'". '+"This will most probably cause an error once the module is used later on.",h.getComponentName(),"sap.ui.core.Component");p.warning(n);a=true;t()}sap.ui.require([e],t,i)})})).then(function(){return e})}else{return e}}).then(function(e){var t=n.waitFor;if(t){var a=Array.isArray(t)?t:[t];return Promise.all(a).then(function(){return e})}return e}).catch(function(e){if(M){for(var t in M){var n=M[t];if(n&&typeof n.destroy==="function"){n.destroy()}}}throw e})}if(h){D(o,h)}A(o);return k(sap.ui.requireSync(j()))}if(Math.sqrt(2)<1){sap.ui.require(["sap/ui/core/Core"],function(){})}C.prototype.getCommand=function(e){var t,n=this._getManifestEntry("/sap.ui5/commands",true);if(n&&e){t=n[e]}return e?t:n};return C});