sap.ui.define(["my/lib/sample/base/Component"],function(t){"use strict";return t.extend("my.lib.sample.root.Component",{metadata:{manifest:"json"},eventMappings:{suppliersComponent:[{name:"toProduct",route:"productsRoute",componentTargetInfo:{productsTarget:{route:"detailRoute",parameters:{id:"productID"}}}}],productsComponent:[{name:"toSupplier",route:"suppliersRoute",componentTargetInfo:{suppliersTarget:{route:"detailRoute",parameters:{id:"supplierID"},componentTargetInfo:{productsTarget:{route:"listRoute",parameters:{basepath:"supplierKey"}}}}}},{name:"toCategory",route:"categoriesRoute",componentTargetInfo:{categoriesTarget:{route:"detailRoute",parameters:{id:"categoryID"},componentTargetInfo:{productsTarget:{route:"listRoute",parameters:{basepath:"categoryKey"}}}}}},{name:"toProduct",route:"productsRoute",componentTargetInfo:{productsTarget:{route:"detailRoute",parameters:{id:"productID"}}}}],categoriesComponent:[{name:"toProduct",route:"productsRoute",componentTargetInfo:{productsTarget:{route:"detailRoute",parameters:{id:"productID"}}}}]},init:function(){t.prototype.init.apply(this,arguments)}})});