// Arreglo para almacenar los productos
const productos = [
    { nombre: "Helado de mandarina", valor: 18.00 },
    { nombre: "Helado de pasas", valor: 8.00 },
    { nombre: "Helado de vainilla", valor: 15.00 },
    { nombre: "Helado de chocolate", valor: 6.00 }
];

// Arreglo para almacenar los productos en el carrito
const carrito = [];

// Función para agregar un producto al carrito
function agregarProducto(numeroProducto) {
    const producto = productos[numeroProducto];

    const modalTitulo = document.getElementById("ct_seleLabel").querySelector("span");
    modalTitulo.textContent = producto.nombre;

    const botonConfirmar = document.getElementById("ct_sele").querySelector(".btn-primary");
    botonConfirmar.onclick = () => {
        const cantidadInput = document.getElementById("ct_plato");
        const cantidad = parseInt(cantidadInput.value);

        if (!isNaN(cantidad) && cantidad > 0) {
            let productoExistente = null;
            for (const item of carrito) {
                if (item.nombre === producto.nombre) {
                    productoExistente = item;
                    break;
                }
            }

            if (productoExistente) {
                productoExistente.cantidad += cantidad;
            } else {
                carrito.push({ ...producto, cantidad });
            }

            actualizarCarrito();
            cantidadInput.value = "";
            document.getElementById("ct_sele").classList.remove("show");
            document.getElementById("ct_sele").setAttribute("aria-hidden", "true");
        } else {
            alert("Cantidad inválida");
        }
    };
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
    const datos = document.getElementById("datos");
    const saldo = document.getElementById("saldo");

    datos.innerHTML = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        const fila = `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${(producto.valor * producto.cantidad).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm eliminar-producto" data-index="${i}">Eliminar</button></td>
            </tr>`;
        datos.innerHTML += fila;
        total += producto.valor * producto.cantidad;
    }

    saldo.textContent = "$" + total.toFixed(2);

    // Agregar event listener a los botones de eliminar
    const botonesEliminar = document.getElementsByClassName("eliminar-producto");
    for (const boton of botonesEliminar) {
        boton.addEventListener("click", function(event) {
            const index = event.target.getAttribute("data-index");
            eliminarProducto(index);
        });
    }
}

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    const botones = document.getElementsByClassName("btn-dark");
    for (let i = 0; i < botones.length; i++) {
        botones[i].onclick = function () {
            agregarProducto(i);
        };
    }

    // Agregar event listener al botón de pagar
    document.getElementById("pagar").addEventListener("click", pagar);
});

function pagar() {
    if (carrito.length > 0) {
        alert("Pago exitoso");

        carrito.length = 0; // Limpiar el carrito de manera eficiente
        actualizarCarrito();

    } else {
        alert("Carrito vacío, debe agregar un producto");
    }
}
