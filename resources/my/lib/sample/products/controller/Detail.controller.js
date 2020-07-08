sap.ui.define(["my/lib/sample/base/BaseController","sap/base/Log"],function(e,t){"use strict";return e.extend("my.lib.sample.products.controller.Detail",{onInit:function(){e.prototype.onInit.apply(this,arguments);this.getOwnerComponent().getRouter().getRoute("detailRoute").attachPatternMatched(this._onMatched,this)},_onMatched:function(e){t.info(this.getView().getControllerName(),"_onMatched");var n=e.getParameter("arguments");this.getOwnerComponent().getModel().metadataLoaded().then(this._bindData.bind(this,n.id))},_bindData:function(e){t.info(this.getView().getControllerName(),"_bindData");var n=this.getOwnerComponent().getModel().createKey("Products",{ProductID:e});this.getView().bindElement({path:"/"+n,parameters:{expand:"Supplier,Category"},events:{change:function(){t.info(this.getView().getControllerName(),"_bindData change");this.getView().setBusy(false)}.bind(this),dataRequested:function(){t.info(this.getView().getControllerName(),"_bindData dataRequested");this.getView().setBusy(true)}.bind(this),dataReceived:function(){t.info(this.getView().getControllerName(),"_bindData dataReceived");this.getView().setBusy(false);if(this.getView().getBindingContext()===null){this.getOwnerComponent().getRouter().getTargets().display("notFound")}}.bind(this)}})},onPressSupplier:function(e){t.info(this.getView().getControllerName(),"onPressSupplier "+e.getSource().getBindingContext().getObject().SupplierID);var n=this.getOwnerComponent();var i=n.getModel();var o=e.getSource().getBindingContext();var r=o.getProperty("SupplierID");n.fireEvent("toSupplier",{supplierID:r,supplierKey:encodeURIComponent("/"+i.createKey("Suppliers",{SupplierID:r}))})},onPressCategory:function(e){t.info(this.getView().getControllerName(),"onPressCategory "+e.getSource().getBindingContext().getObject().CategoryID);var n=this.getOwnerComponent();var i=n.getModel();var o=e.getSource().getBindingContext();var r=o.getProperty("CategoryID");n.fireEvent("toCategory",{categoryID:r,categoryKey:encodeURIComponent("/"+i.createKey("Categories",{CategoryID:r}))})}})});