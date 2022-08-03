let arrayItems; //Variable para guardar los datos de la api
let containerDetail = document.getElementById("containerDetail")




getDataApi().then(mainInit)

function mainInit(){
    console.log(arrayItems)
    let id = location.search.split("?id=")[1]
console.log(id)
let item = arrayItems.find(item =>item._id == id)


containerDetail.innerHTML =
    `
    <div class="card expand my-3">
            <img src="${item.imagen}" class="card-img-top" alt="asd">
            <div class="card-body pb-1">
                <h5 class="card-title">${item.nombre}</h5>
                <h5>${item.descripcion}</h5>
                <div class="d-flex justify-content-between">
                    <p>Stock: ${item.stock}</p>
                    <p class="card-text">Precio: $${item.precio}</p>
                </div>
            </div>
    `






}

