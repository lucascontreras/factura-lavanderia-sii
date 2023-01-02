function tableToJson(table) { 
  var data = [];
  for (var i=0; i<table.rows.length; i++) { 
      var tableRow = table.rows[i]; 
      var rowData = []; 
      for (var j=0; j<tableRow.cells.length; j++) { 
          rowData.push(tableRow.cells[j].innerHTML.replace(/\t/g,'').replace(/\n/g,''));; 
      } 
      data.push(rowData); 
  } 
  return data; 
}

const tabla = document.querySelector("#tabla");

const tablaArray = tableToJson(tabla);

const detalleItems = (columna) => {
  const list = [];
  for (let i = 3; i <= 12; i++) {
    list.push(tablaArray[i][columna].trim().replace('$','').replace('<br>',''));
  }
  return list;
}

const tablaObject = {
  cliente : tablaArray[0][0],
  rut : tablaArray[0][1],
  dv : tablaArray[0][2],
  razonSocial : tablaArray[0][3],
  direccion : tablaArray[1][0],
  comuna : tablaArray[1][1],
  ciudad : tablaArray[1][2],
  giro : tablaArray[1][3],
  guiaInterna : tablaArray[2][0],
  origen : tablaArray[2][1] === "LOS ESPINOS 2541" ? "LOS ESPINOS 2541" : "EXEQUIEL FERNANDEZ 3685  BOD-G",
  seUsoExtensionDeChrome : tablaArray[2][2],
  fecha : tablaArray[15][1],
  'cantidades' : detalleItems(0),
  'items' : detalleItems(1),
  'precios' : detalleItems(2),
  'subtotales' : detalleItems(3),
  neto : tablaArray[13][3].replace('$',''),
  iva : tablaArray[14][3].replace('$',''),
  total : tablaArray[15][3].replace('$',''),
  comentario : tablaArray[16][0].replace('<!--COMENTARIO PARA TODOS-->','').trim().split('<br>')
}

const injectElement = document.createElement('div');
injectElement.id = 'tablaObject';
injectElement.style.cssText = 'opacity:0;font-size:1px';
injectElement.innerHTML = JSON.stringify(tablaObject);
document.body.appendChild(injectElement);