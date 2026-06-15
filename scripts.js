let funcionarios = [];
let comisiones = {};

// AGREGAR FUNCIONARIO
function agregarFuncionario() {
    let nombre = document.getElementById("nombreFuncionario").value;

    if (!nombre) return;

    funcionarios.push(nombre);
    comisiones[nombre] = 0;

    actualizarSelect();
}

// ACTUALIZAR SELECT Y LISTA
function actualizarSelect() {
    let select = document.getElementById("funcionarioVenta");
    select.innerHTML = "";

    funcionarios.forEach(f => {
        select.innerHTML += `<option>${f}</option>`;
    });

    let lista = document.getElementById("listaFuncionarios");
    lista.innerHTML = funcionarios.map(f => `<li>${f}</li>`).join("");
}

// REGISTRAR VENTA
function registrarVenta() {
    let f = document.getElementById("funcionarioVenta").value;
    let tipo = document.getElementById("tipoVenta").value;
    let g = parseFloat(document.getElementById("gananciaVenta").value);
    let c = parseFloat(document.getElementById("cantidadVenta").value);

    let comision = 0;

    if (tipo === "celular" && !isNaN(g)) {
        comision = g * 0.5; // 50%
    }

    if (tipo === "accesorio" && !isNaN(c)) {
        comision = c * 3000; // fijo accesorios
    }

    comisiones[f] = (comisiones[f] || 0) + comision;

    actualizarTabla();
}

// TABLA DE COMISIONES
function actualizarTabla() {
    let tabla = document.getElementById("tablaResumen");
    tabla.innerHTML = "";

    let total = 0;

    for (let f in comisiones) {
        tabla.innerHTML += `
            <tr>
                <td>${f}</td>
                <td>${comisiones[f]} Gs</td>
            </tr>
        `;
        total += comisiones[f];
    }

    document.getElementById("totalComisiones").innerText = total + " Gs";
}

// INICIAR
actualizarSelect();
actualizarTabla();
