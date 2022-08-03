async function getDataApi() {
    let infoDataApi = await (await fetch("https://apipetshop.herokuapp.com/api/articulos")).json()
    // console.log(infoDataApi)
    dataAPI = infoDataApi;
    // console.log(dataAPI)
    arrayItems = dataAPI.response;

    let unidades = 1

    id = 1
    arrayItems.map(item => {
        item.nuevoid = id++, item.unidades = unidades
    })
    // console.log(arrayItems)


}


async function GetLocalStorage() {

    if (localStorage.getItem("favoritos")) {
        arrayFavoritos = JSON.parse(localStorage.getItem("favoritos"))
        // console.log(arrayFavoritos)
        data = arrayItems.filter(item => arrayFavoritos.includes(item.nuevoid))
        // console.log(arrayItems)
        // console.log(data)
        displayCarrito(data)
    } else {
        arrayFavoritos = []
    }

}


async function addItemLocalStorage(id) {
    let carrito = document.getElementById(`i${id}`)
    // console.log(carrito)
    let eventClickBorrar = document.getElementById(`b${id}`)
    carrito.classList.remove("bi-cart-plus")
    carrito.classList.add("bi-cart-check")

    btnCarrito.classList.remove("bi-cart")
    btnCarrito.classList.add("bi-cart-check")
    // console.log(carrito)
    
    if (localStorage.getItem("favoritos")) {
        if (arrayFavoritos.includes(id)) {
            eventClickBorrar.addEventListener("click", eventoClick => {
                carrito.classList.remove("bi-cart-check")
                carrito.classList.add("bi-cart-plus")
            })
            arrayFavoritos = arrayFavoritos.filter(idfav => idfav != id)
            carrito.classList.remove("bi-cart-check")
            carrito.classList.add("bi-cart-plus")
            btnCarrito.classList.remove("bi-cart-check")
        btnCarrito.classList.add("bi-cart")
        } else {
            
            arrayFavoritos.push(id)
            

        }
    } else {        
        arrayFavoritos = [id]
        
        
    }

    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos))

    GetLocalStorage()



}


function getToys() {
    arrayToys = arrayItems.filter(item => item.tipo == "Juguete")
    // console.log(arrayToys)
    // console.log(arrayToys)
}

function getMed() {
    arrayMeds = arrayItems.filter(item => item.tipo == "Medicamento")
    // console.log(arrayMeds)
}

//Pintar items

function displayItem(array) {
    console.log(array)
    containerTienda.innerHTML = "";
    // console.log(arrayToys)
    array.forEach(item => {
        containerTienda.innerHTML +=
            `
            <div class="card my-3">
            <img src="${item.imagen}" class="card-img-top" alt="asd">
            <div class="card-body pb-1">
                <h5 class="card-title text-center"><b>${item.nombre}</b></h5>
                <div class="d-flex justify-content-between">
                    <p>Stock: ${item.stock}</p>
                    <p class="card-text">Precio: $${item.precio}</p>
                </div>
            </div>
            <div class="carro">
                <a href="./detalle.html?id=${item._id}" class="verMas btn-primary">Ver Mas</a>
                <button onclick="addItemLocalStorage(${item.nuevoid})"><i id="i${item.nuevoid}" class="bi bi-cart-plus"></i></button>
                </div>
        </div>
        `
    })

}



function displayDetail() {
    console.log(arrayToys)
    array.forEach(items => {
        containerToys.innerHTML +=
            `
        <div class="card col-4 my-3" style="width: 18rem;">
            <img src=${items.imagen} class="card-img-top" alt="asd">
            <div class="card-body">
                <h5 class="card-title">${items.nombre}</h5>
                <p class="card-text">$ ${items.precio}</p>
            </div>
        </div>
        `
    })

}


function botonesTienda() {
    botonF = document.getElementById("botonFarmacia")
    botonJ = document.getElementById("botonJuguetes")

    botonJ.addEventListener('click', () => {
        if (botonJ.className === "button") {
            botonJ.classList.add("press")
            botonF.classList.remove("press")
            displayItem(arrayToys)
        } else if (botonJ.classList == "button press") {
            botonJ.classList.remove("press")
            displayItem(arrayItems)

        }
    })

    botonF.addEventListener('click', () => {
        if (botonF.className === "button") {
            botonF.classList.add("press")
            botonJ.classList.remove("press")
            displayItem(arrayMeds)
        } else if (botonF.classList == "button press") {
            botonF.classList.remove("press")
            displayItem(arrayItems)
        }
    })

}
let input;

function displayCarrito(array) {
    containerCarrito.innerHTML = ""
    // console.log(local)
    array.forEach((item, index) => {
        // console.log(array)
        // console.log(item)
        item.total = item.unidades * item.precio
        // console.log(array)
        // console.log(item)
        containerCarrito.innerHTML +=
            `
            <div class="productoCarro my-3 row">
            <div class="col-10 d-flex flex-row" id="dataProducto">
                <div> <img class="img-carrito"
                        style="width: 100px; filter: brightness(1.1); mix-blend-mode: multiply;"
                        src="${item.imagen}"
                        alt="imgitem"></div>
                <div class="d-flex flex-column justify-content-center ms-3 flex-grow-1">
                    <p>${item.nombre}</p>
                    <label>Unidades:<input class="" value=${item.unidades} type="number" onchange="PrecioItemTotal(${item.nuevoid})" id="${item.nuevoid}" name="Unidades" min="1" max="${item.stock}"></label>
                </div>
            </div>
            <div class="col-2 d-flex flex-column justify-content-center align-items-center"
                id="precioEliminar">
                <p>$${item.total}</p>
                <button id="b${item.nuevoid}" class="trash" onclick="addItemLocalStorage(${item.nuevoid})"><i class="bi bi-trash3-fill""></i></button>
            </div>
            </div>
            `
    })
    sumaTotal()
}


let product;

function PrecioItemTotal(id) {
    let containerValueOnChange = document.getElementById(id).value
    // console.log(containerValueOnChange)
    product = data.filter(item => item.nuevoid == id)
    product[0].unidades = containerValueOnChange
    product[0].total = product[0].precio * product[0].unidades
    // console.log(data)
    
    displayCarrito(data)
}


function sumaTotal() {
    contenedorTotal.innerHTML = ""
    let total = 0;
    // console.log(data)
    data.forEach(item => total += item.total)
    // console.log(total)

    contenedorTotal.innerHTML =

        `
    <button class="pagar" onclick="pagar()"><i class="bi bi-bag-check"
            style="color: white; font-size: 1.1rem; padding-right: .5rem;"></i>Pagar</button>
                <div class="total d-flex flex-column justify-content-center align-items-end">
                    <p class="m-0">Total: <b>$${total}</b></p>
                </div>
    `



}

function pagar(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No existe el metodo de pago!',
      })
}


