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
  origen : tablaArray[2][1],
  fecha : tablaArray[15][1],
  cantidades : [tablaArray[3][0].trim(),tablaArray[4][0].trim(),tablaArray[5][0].trim(),tablaArray[6][0].trim(),tablaArray[7][0].trim(),tablaArray[8][0].trim(),tablaArray[9][0].trim(),tablaArray[10][0].trim(),tablaArray[11][0].trim(),tablaArray[12][0].trim()],
  items : [tablaArray[3][1],tablaArray[4][1],tablaArray[5][1],tablaArray[6][1],tablaArray[7][1],tablaArray[8][1],tablaArray[9][1],tablaArray[10][1],tablaArray[11][1],tablaArray[12][1]],
  precios : [tablaArray[3][2].replace('$',''),tablaArray[4][2].replace('$',''),tablaArray[5][2].replace('$',''),tablaArray[6][2].replace('$',''),tablaArray[7][2].replace('$',''),tablaArray[8][2].replace('$',''),tablaArray[9][2].replace('$',''),tablaArray[10][2].replace('$',''),tablaArray[11][2].replace('$',''),tablaArray[12][2].replace('$','')],
  subtotales : [tablaArray[3][3].replace('$','').replace('<br>',''),tablaArray[4][3].replace('$','').replace('<br>',''),tablaArray[5][3].replace('$','').replace('<br>',''),tablaArray[6][3].replace('$','').replace('<br>',''),tablaArray[7][3].replace('$','').replace('<br>',''),tablaArray[8][3].replace('$','').replace('<br>',''),tablaArray[9][3].replace('$','').replace('<br>',''),tablaArray[10][3].replace('$','').replace('<br>',''),tablaArray[11][3].replace('$','').replace('<br>',''),tablaArray[12][3].replace('$','').replace('<br>','')],
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