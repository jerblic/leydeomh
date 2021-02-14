var resistencia = document.getElementById("Va_resistencia");
var voltaje = document.getElementById("fu_voltaje");
var corriente = 1;
var Datos_resistencia = [];
var Datos_voltaje = [];
var Datos_corriente = [];
var i = 0;
var i2 = 0;

/* function borrar_canvas(){
  Cuadro_grafica.clearRect(0,0,Cuadro_grafica.Width,Cuadro_grafica.heigth);

} */

resistencia.addEventListener("input", valor_R);
voltaje.addEventListener("input", valor_v);
//esta función obtiene el valor del deslizador de resistencia y lo pasa al label de resistencia
function valor_R() {
  // alert("se llamo la función valor_R con" + Datos_resistencia.length);
  document.getElementById("res").innerHTML = resistencia.value + " &Omega;";
  corriente = voltaje.value / resistencia.value;
  document.getElementById("corriente").innerHTML = corriente.toFixed(3) + "A";
}
//esta función obtiene el valor del deslizador de voltaje y lo pasa al label de voltaje
function valor_v() {
  document.getElementById("vol").innerHTML = voltaje.value + " V";
  corriente = voltaje.value / resistencia.value;
  document.getElementById("corriente").innerHTML = corriente.toFixed(3) + "A";
}

function agregar_datos() {
  Datos_resistencia.push(resistencia.value);
  Datos_voltaje.push(voltaje.value);
  Datos_corriente.push(corriente.toFixed(2));
  i = i + 1;
  var insertar = document.getElementById("datos").insertRow(-1);
  var celda1 = (insertar.insertCell(0).innerHTML = i);
  var celda2 = (insertar.insertCell(1).innerHTML = Datos_resistencia[i2]);
  var celda3 = (insertar.insertCell(2).innerHTML = Datos_voltaje[i2]);
  var celda4 = (insertar.insertCell(3).innerHTML = Datos_corriente[i2]);
  i2 = i2 + 1;
}
function borrar_datos() {
  if (i == 0) {
    alert("No hay datos para borrar en la tabla");
  }
  if (i > 0) {
    document.getElementById("datos").deleteRow(-1);
    i = i - 1;
    i2 = i2 - 1;
    Datos_resistencia.pop();
    Datos_voltaje.pop();
    Datos_corriente.pop();
  }
}
function grafico() {
  var ejex = [];
  var ejey = [];
  var letrero;
  if (document.getElementById("grafico1").checked == true) {
    // alert("esta seleccionado voltaje resistencia");
    ejex = Datos_voltaje;
    ejey = Datos_resistencia;
    letrero = "Voltaje Vs Resistencia";
  } else if (document.getElementById("grafico2").checked == true) {
    // alert("esta seleccionado resistencia corriente");
    ejex = Datos_resistencia;
    ejey = Datos_corriente;
    letrero = "Resistencia Vs Corriente";
  } else if (document.getElementById("grafico3").checked == true) {
    // alert("esta seleccionado voltaje corriente");
    ejex = Datos_voltaje;
    ejey = Datos_corriente;
    letrero = "Voltaje Vs Corriente";
  }
  if (window.myChart != null) {
    window.myChart.destroy();
  }
  var colores = ejex;
  var datos = ejey;
  let Cuadro_grafica = document.getElementById("grafica");
  window.myChart = new Chart(Cuadro_grafica, {
    type: "line",
    data: {
      labels: colores,
      datasets: [
        {
          label: letrero,
          data: datos,
          backgroundColor: ["rgba(195, 110, 110, 0.65)"],
          borderColor: ["rgba(0, 0, 0, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
