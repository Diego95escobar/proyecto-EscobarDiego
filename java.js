class Producto {
    constructor(id, nombre, precio, stock, img, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.alt = alt
    }
}

class ProductoController{
    constructor(){
        this.listaProductos = []
    }
    
    cargarProductos(){
        this.listaProductos = [
            new Producto(1, "Artillery HORNET", 100000, 10, "./img/impreAHornet.jpg", "Impresora 3d 1"),
            new Producto(2, "Creality CR-10 MAX", 140000, 10, "./img/ImpreCCR10MAX.jpg", "Impresora 3d 2"),
            new Producto(3, "Creality CR-30 3D Print Mill", 200000, 10, "./img/ImpreCCR303dPrintMill.jpg", "Impresora 3d 3"),
            new Producto(4, "Creality ENDER-5 PLUS", 300000, 10, "./img/impreCEnder5plus.jpg", "Impresora 3d 4"),
            new Producto(5, "Creality ENDER-6", 350000, 10, "./img/impreCEnder6.jpg", "Impresora 3d 5"),
            new Producto(6, "Artillery Genius Pro", 150000, 10, "./img/impresora3d1.png", "Impresora 3d 6"),
            new Producto(7, "Creality Ender 6 Diy Kit Fdm", 280000, 10, "./img/impresora3d2.jpg", "Impresora 3d 6"),
            new Producto(8, "Hellbot Magna 2 300 Dykit", 260000, 10, "./img/impresora3d3.jpg", "Impresora 3d 6")
        ]
    }
    exibirEnDOM(contenedor_productos){
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `
                <div class="card" style="width: 18rem;">
                        <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Precio:Precio: $${producto.precio}</p>
                            <a href="#" id="impre-${producto.id}" class="btn btn-primary">Añadair al carrito</a>
                        </div>
                    </div>`
        })
    }
}

const controladorProductos = new ProductoController()
controladorProductos.cargarProductos()




let listaCarrito; 


//DOM
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")


if(localStorage.getItem("listaCarrito")){
    let listaCarritoJSON = localStorage.getItem("listaCarrito")
    listaCarrito = JSON.parse(listaCarritoJSON)

    listaCarrito.forEach(producto => {
        contenedor_carrito.innerHTML += 
        `<div class="card mb-3" style = "max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                    </div>
                </div>
            </div>
        </div>`
        })
}else{
    listaCarrito = []
}


controladorProductos.exibirEnDOM(contenedor_productos)


//eventos
controladorProductos.listaProductos.forEach(producto => {
    const btnAP = document.getElementById(`impre-${producto.id}`)
    btnAP.addEventListener("click", () => {

        listaCarrito.push(producto)

        //stogage en JSON
        let listaCarritoJSON = JSON.stringify(listaCarrito)
        localStorage.setItem("listaCarrito",listaCarritoJSON)


        
            contenedor_carrito.innerHTML =""
            listaCarrito.forEach(producto => {
                contenedor_carrito.innerHTML +=

            `<div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                    </div>
                </div>
            </div>
        </div>`
            })   
        })    
    })



