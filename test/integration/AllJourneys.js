sap.ui.define(["sap/ui/test/Opa5","./arrangements/Startup","./NavigationJourney"],function(e,t){"use strict";e.extendConfig({arrangements:new t,viewNamespace:"my.lib.sample.root.view.",timeout:2,pollingInterval:10,autoWait:true})});