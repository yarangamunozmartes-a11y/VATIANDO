/*==========================================
=          VARIABLES GLOBALES              =
==========================================*/
const botonesAgregar = document.querySelectorAll(".agregar");
const listaCarrito = document.getElementById("listaCarrito");
const totalHTML = document.getElementById("total");
const botonPagar = document.getElementById("pagar");
/*==========================================
=              CARRITO                     =
==========================================*/
let carrito = [];
/*==========================================
=      EVENTOS BOTONES AGREGAR             =
==========================================*/
botonesAgregar.forEach(boton=>{
    boton.addEventListener("click",()=>{
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);
        agregarProducto(nombre,precio);
    });
});
/*==========================================
=       AGREGAR PRODUCTO AL CARRITO        =
==========================================*/
function agregarProducto(nombre,precio){
    const existe = carrito.find(producto=>producto.nombre===nombre);
    if(existe){
        existe.cantidad++;
    }else{
        carrito.push({
            nombre:nombre,
            precio:precio,
            cantidad:1
        });
    }
    actualizarCarrito();
}
/*==========================================
=      CALCULAR TOTAL GENERAL              =
==========================================*/
function calcularTotal(){
    let total = 0;
    carrito.forEach(producto=>{
        total += producto.precio * producto.cantidad;
    });
    totalHTML.textContent = "S/" + total.toFixed(2);
}
/*==========================================
=     ACTUALIZAR INTERFAZ (PARTE 2)        =
==========================================*/
function actualizarCarrito(){
    // Esta función se completará
    // en la Parte 2.
}
/*==========================================
=        ACTUALIZAR CARRITO                =
==========================================*/
function actualizarCarrito(){
    listaCarrito.innerHTML = "";
    if(carrito.length === 0){
        listaCarrito.innerHTML = `
            <p class="vacio">
                No hay productos agregados.
            </p>
        `;
        calcularTotal();
        return;
    }
    carrito.forEach((producto,index)=>{
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <div class="itemInfo">
                <h4>${producto.nombre}</h4>
                <span>
                    S/${producto.precio.toFixed(2)}
                </span>
                <div class="cantidad">
                    <button onclick="disminuirCantidad(${index})">
                        -
                    </button>
                    <strong>
                        ${producto.cantidad}
                    </strong>
                    <button onclick="aumentarCantidad(${index})">
                        +
                    </button>
                </div>
            </div>
            <button
            class="eliminar"
            onclick="eliminarProducto(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        listaCarrito.appendChild(item);
    });
    calcularTotal();
}
/*==========================================
=      AUMENTAR CANTIDAD                   =
==========================================*/
function aumentarCantidad(index){
    carrito[index].cantidad++;
    actualizarCarrito();
}
/*==========================================
=      DISMINUIR CANTIDAD                  =
==========================================*/
function disminuirCantidad(index){
    carrito[index].cantidad--;
    if(carrito[index].cantidad <= 0){
        carrito.splice(index,1);
    }
    actualizarCarrito();
}
/*==========================================
=      ELIMINAR PRODUCTO                   =
==========================================*/
function eliminarProducto(index){
    carrito.splice(index,1);
    actualizarCarrito();
}
/*==========================================
=      ENVIAR PEDIDO A WHATSAPP            =
==========================================*/
botonPagar.addEventListener("click", enviarWhatsApp);
function enviarWhatsApp(){
    if(carrito.length === 0){
        alert("Agrega al menos un producto al carrito.");
        return;
    }
    let mensaje = "🛒 *NUEVO PEDIDO*%0A%0A";
    let total = 0;
    carrito.forEach(producto=>{
        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        mensaje +=
        "📦 " + producto.nombre +
        "%0A";
        mensaje +=
        "Cantidad: " +
        producto.cantidad +
        "%0A";
        mensaje +=
        "Subtotal: S/" +
        subtotal.toFixed(2) +
        "%0A%0A";
    });
    mensaje +=
    "━━━━━━━━━━━━━━%0A";
    mensaje +=
    "💰 *TOTAL:* S/" +
    total.toFixed(2) +
    "%0A%0A";
    mensaje +=
    "Hola, deseo realizar este pedido.";
    const numero = "51967483151";
    const url =
    `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url,"_blank");
}