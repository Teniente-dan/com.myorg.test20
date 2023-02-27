sap.ui.define(
  ["./BaseController",
    "sap/m/GroupHeaderListItem",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Binding"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} BaseController
   */
  function (BaseController,
	GroupHeaderListItem,
	JSONModel,
	Binding) {
    "use strict";

    return BaseController.extend("com.myorg.test20.controller.MainView", {
      onInit: function () {
        this.getRouter().getRoute("RouteMainView").attachPatternMatched(this._onRouteMatched, this);
        this.setModel(new JSONModel([]), "actividades");
        this.actividadesModel = this.getModel("actividades");
      },
      _onRouteMatched: function (oEvent) {
        var oModel = this.getModel();
        // var oView = this.getView();
        // var oTable = oView.byId("table");
        // var oBinding = oTable.getBinding("items");
        // oBinding.filter([]);
        // oBinding.sort([]);

        oModel.read("/MisActividadesSet", {
          success: function (oData) {            
            // oModel.setProperty("/Products", oData.results);
            var actividadesData = oData.results.map(x=>{
              x.Valor = parseInt(x.Valor) || 2;
              x.show = true;
              if (x.Valor = 2) {
                x.show = false;
              }
              return x;
            });
            this.actividadesModel.setData(actividadesData);
          }.bind(this),

          error: function (oError) {

          }
        });
      },
      getGroupHeader: function (oGroup) {
        return new GroupHeaderListItem({
          count: this.getGroupSum(oGroup.key),
          title: oGroup.key,
        });
      },
      getGroup: function (oContext) {
        return oContext.getProperty('MesAno');
      },
      getGroupSum: function (sKey) {
        var aContexts = this.actividadesModel.getProperty("/"),
          iSum = 0;

        aContexts.forEach(function (oContext) {
          if (oContext.MesAno === sKey) {
            iSum += parseInt(oContext.Valor);
          }
        });

        return iSum;
      }
    });
  }
);