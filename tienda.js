let arrayItems; //Variable para guardar los datos de la api
let arrayToys; //guarda los jueguetes
let arrayMeds; // guarda los medicamentos
let containerTienda = document.getElementById("containerTienda")
let containerCarrito = document.getElementById("containerCarrito")
let carrito = document.getElementById("carrito")
let contenedorTotal = document.getElementById("contenedorTotal")
let btnCarrito = document.getElementById("btnCarrito")
// let botonFarmacia = document.getElementById("botonFarmacia")
// let botonJuguetes = document.getElementById("botonJuguetes")
let vacio = []
let local = [];
var arrayFavoritos = []
let total;
let priceForItem = [];
var data;
// console.log(local)

getDataApi().then(mainInit)



function mainInit() {
    displayItem(arrayItems)
    GetLocalStorage()
    getToys()
    getMed()
    botonesTienda()
    sumaTotal()
   
    
    // console.log(local)
    

}


