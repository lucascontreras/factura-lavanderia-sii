//populate the fields based on what's just been copied from the web app
navigator.clipboard.readText().then(
  (clipText) => {
    let tablaObject = JSON.parse(clipText);
    //fill sii form
    const fillForm = function () {
      //show all 10 available rows to input products
      const btnAgregaLineaDetalle = document.querySelector("#rowDet_Botones > th > input");

      if (btnAgregaLineaDetalle !== null) {
        for (let i = 0; i < 9; i++) {
          btnAgregaLineaDetalle.dispatchEvent(new MouseEvent('click'));
        }
      }
      //write products, quantities, prices and subtotals
      const productFields = {
        EFXP_NMB : "items",
        EFXP_QTY : "cantidades",
        EFXP_PRC : "precios",
        EFXP_SUBT : "subtotales"
      }
      for (let i = 0; i < 10; i++) {
        for (let key in productFields) {
          document.querySelector(
            "[name="
            .concat(key)
            .concat("_")
            .concat(i === 9 ? 10 : "0".concat(i + 1))
            .concat("]")
          ).value = tablaObject[productFields[key]][i];
        }
        /*
        document.querySelector("[name=EFXP_NMB_".concat(i === 9 ? 10 : "0".concat(i + 1)).concat("]")).value = tablaObject.items[i];
        document.querySelector("[name=EFXP_QTY_".concat(i === 9 ? 10 : "0".concat(i + 1)).concat("]")).value = tablaObject.cantidades[i];
        document.querySelector("[name=EFXP_PRC_".concat(i === 9 ? 10 : "0".concat(i + 1)).concat("]")).value = tablaObject.precios[i];
        document.querySelector("[name=EFXP_SUBT_".concat(i === 9 ? 10 : "0".concat(i + 1)).concat("]")).value = tablaObject.subtotales[i];
        */
      }
      //datos emisor (ciudad, fecha, tipo traslado, act. econ.)
      document.querySelector("[name=cbo_dia_boleta]").value = tablaObject.fecha.split('/')[0];
      document.querySelector("[name=cbo_mes_boleta]").value = tablaObject.fecha.split('/')[1];
      document.querySelector("[name=cbo_anio_boleta]").value = tablaObject.fecha.split('/')[2];
      document.querySelector("[name=EFXP_IND_VENTA]").value = "6";
      document.querySelector("[name=EFXP_ACTECO_SELECT]").value = "960100";
        //origen (EF o LE)
        const origenes = [
          ["077083249","LOS ESPINOS 2541","MACUL","SANTIAGO","224002722"],
          ["086147915","EXEQUIEL FERNANDEZ 3685  BOD-G","MACUL","SANTIAGO","222217763"]
        ];
        const origen = tablaObject.origen === origenes[0][1] ? 0 : 1;

        document.querySelector("[name=EFXP_CDG_SII_SUCUR]").value = origenes[origen][0];
        document.querySelector("[name=EFXP_DIR_ORIGEN]").value = origenes[origen][1];
        document.querySelector("[name=EFXP_CMNA_ORIGEN]").value = origenes[origen][2];
        document.querySelector("[name=EFXP_CIUDAD_ORIGEN]").value = origenes[origen][3];
        document.querySelector("[name=EFXP_FONO_EMISOR]").value = origenes[origen][4];

      //datos receptor (rut, rs, dirección, giro)
      document.querySelector("[name=EFXP_RUT_RECEP]").value = tablaObject.rut;
      document.querySelector("[name=EFXP_DV_RECEP]").value = tablaObject.dv;
      document.querySelector("[name=EFXP_RZN_SOC_RECEP]").value = tablaObject.razonSocial;
      document.querySelector("[name=EFXP_DIR_RECEP]").value = tablaObject.direccion;
      document.querySelector("[name=EFXP_CMNA_RECEP]").value = tablaObject.comuna;
      document.querySelector("[name=EFXP_CIUDAD_RECEP]").value = tablaObject.ciudad;
      document.querySelector("[name=EFXP_GIRO_RECEP]").value = tablaObject.giro;
      
      //neto, iva y total
      document.querySelector("[name=EFXP_MNT_NETO]").value = tablaObject.neto;
      document.querySelector("[name=EFXP_IVA]").value = tablaObject.iva;
      document.querySelector("[name=EFXP_MNT_TOTAL]").value = tablaObject.total;
      
      //comments
      document.querySelector("[name=DESCRIP_".concat(tablaObject.items.indexOf("") === -1 ? 10 : "0".concat(tablaObject.items.indexOf(""))).concat("]")).dispatchEvent(new MouseEvent('click'));
      let comment = "\n" + "GUIA INTERNA: " + tablaObject.guiaInterna;
      for (let i = 0; i < tablaObject.comentario.length; i++) {
        comment += "\n" + tablaObject.comentario[i];
      }
      document.querySelector("[name=EFXP_DSC_ITEM_".concat(tablaObject.items.indexOf("") === -1 ? 10 : "0".concat(tablaObject.items.indexOf(""))).concat("]")).value = comment;

      //click 'validar y visualizar'
      document.querySelector("[name=Button_Update]").dispatchEvent(new MouseEvent('click'));
    }

    //run script on load
    if (window.addEventListener) {window.addEventListener('load', fillForm(), false);}
    else {document.addEventListener('load', fillForm(), false);}
  });


  