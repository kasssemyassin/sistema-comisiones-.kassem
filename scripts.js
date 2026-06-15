let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
let comisiones = JSON.parse(localStorage.getItem("comisiones")) || {};

// LOGIN
function login() {
    let u = document.getElementById("user").value;
    let p = document.getElementById("pass").value;

    if (u === "admin" && p === "1234") {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        alert("Incorrecto");
    }
}

// GUARDAR
function guardar() {
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    localStorage.setItem("comisiones", JSON.stringify(comisiones));
}

// AGREGAR FUNCIONARIO
function agregarFuncionario() {
    let nombre = document.getElementById("nombreFuncionario").value;
    if (!nombre) return;

    funcionarios.push(nombre);
    comisiones[nombre] = 0;

    guardar();
    actualizarSelect();
}

// ACTUALIZAR SELECT
function actualizarSelect() {
    let select = document.getElementById("funcionarioVenta");
    select.innerHTML = "";

    funcionarios.forEach(f => {
        select.innerHTML += `<option>${f}</option>`;
    });

    let lista = document.getElementById("listaFuncionarios");
    lista.innerHTML = funcionarios.map(f => `<li>${f}</li>`).join("");
}

// VENTA
function registrarVenta() {
    let f = document.getElementById("funcionarioVenta").value;
    let tipo = document.getElementById("tipoVenta").value;
    let g = parseFloat(document.getElementById("gananciaVenta").value);
    let c = parseFloat(document.getElementById("cantidadVenta").value);

    let comision = 0;

    if (tipo === "celular" && !isNaN(g)) {
        comision = g * 0.5;
    }

    if (tipo === "accesorio" && !isNaN(c)) {
        comision = c * 3000;
    }

    comisiones[f] = (comisiones[f] || 0) + comision;

    guardar();
    actualizarTabla();
    graficar();
}

// TABLA
function actualizarTabla() {
    let t = document.getElementById("tablaResumen");
    t.innerHTML = "";

    let total = 0;

    for (let f in comisiones) {
        t.innerHTML += `
        <tr>
            <td>${f}</td>
            <td>${comisiones[f]} Gs</td>
        </tr>`;
        total += comisiones[f];
    }

    document.getElementById("total").innerText = total + " Gs";
}

// MODO OSCURO
function toggleDark() {
    document.body.classList.toggle("dark");
}

// EXPORTAR
function exportar() {
    let texto = "REPORTE DE COMISIONES\n\n";

    for (let f in comisiones) {
        texto += `${f}: ${comisiones[f]} Gs\n`;
    }

    let blob = new Blob([texto], { type: "text/plain" });
    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "reporte.txt";
    a.click();
}

// GRAFICO SIMPLE
function graficar() {
    let canvas = document.getElementById("grafico");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 400, 200);

    let i = 0;

    for (let f in comisiones) {
        let val = comisiones[f];

        ctx.fillStyle = "blue";
        ctx.fillRect(50 + i * 60, 200 - val / 1000, 40, val / 1000);

        ctx.fillStyle = "black";
        ctx.fillText(f, 50 + i * 60, 195);

        i++;
    }
}

// INIT
actualizarSelect();
actualizarTabla();
graficar();