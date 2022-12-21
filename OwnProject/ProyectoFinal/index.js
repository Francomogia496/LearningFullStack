let productoNombre, valorCosto, porcGanancia, eleccion, pagaEnCuotas
let valorCuotas, cantCuotas, cuota, cantUnidades, total, searchTxt, arrItems, btnAddToCarrito, ArrBotonesCarrito
let btnSearch, result
const searchBar = document.getElementById('SearchBar');
let items = []
let productos = []
let carrito = []

eventListeners();

function eventListeners(){
    //define the DOMContentLoaded event (this event is triggered when the form finish its load)
    document.addEventListener('DOMContentLoaded', initItems);

    //define the function for the search bar
    // let searchBar = document.getElementById('SearchBar');
    searchBar.addEventListener('keyup', filtrar);
}

btnSearch = document.getElementById('BtnSearch')
result = document.getElementById('ListaProductos')



// ------------------------------- FUNCIONES -----------------------------

async function initItems(){
    await fetchData();

    let items = document.getElementsByClassName('items-grilla');

    arrItems = Array.from(items);

    for (let item of arrItems){
        item.addEventListener('click', btnClick);
    }

    //obtenemos los botones de agregar al carrito
    btnAddToCarrito = document.getElementsByClassName('btnAddCarrito')

    ArrBotonesCarrito = Array.from(btnAddToCarrito)
    for (let btn of ArrBotonesCarrito){
        btn.addEventListener('click', cargarProducto)
    }
}

function filtrar(){
    result.innerHTML = '';

    searchTxt = searchBar.value.toLowerCase();

    for(let producto of productos){
        let nombre = producto.nombre.toLowerCase()

        if(nombre.indexOf(searchTxt) !== -1){
            
            createItems(producto);

        }
    }

    items = document.getElementsByClassName('items-grilla')

    arrItems = Array.from(items)

    for (let item of arrItems){
        item.addEventListener('click', btnClick)
    }

    //obtenemos los botones de agregar al carrito
    btnAddToCarrito = document.getElementsByClassName('btnAddCarrito')

    ArrBotonesCarrito = Array.from(btnAddToCarrito)
    for (let btn of ArrBotonesCarrito){
        btn.addEventListener('click', cargarProducto)
    }
}

function Producto(nombre, precio, imagen, cantidad){
    this.nombre = nombre
    this.precio = precio
    this.imagen = imagen
    this.cantidad = cantidad
}

async function fetchData(){
    result.innerHTML = '';
    await fetch('./ListaDeProductos.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((prod) => {

            const searchTxt = searchBar.value.toLowerCase()

            let nombre = prod.nombre.toLowerCase()

            if(nombre.indexOf(searchTxt) !== -1){
                
                createItems(prod);

            }

            productos.push(prod);
        });
    })
}

function cargarProducto(e){
    e.preventDefault();
    let nombreProd, precioProd, cantidadProd, imagenProd;

    let hijos = e.target.parentNode.parentElement.childNodes;
    for (let nodo of hijos){
        if(nodo.className === 'card-header'){
            nombreProd = nodo.innerHTML
        }
        
        if(nodo.className === 'imagenes-container'){
            let hijo1 = nodo.childNodes
            for(let hijoaux of hijo1){
                imagenProd = hijoaux.getAttribute("src")
            }
        }

        if(nodo.id === 'divPrecioyCant'){
            let hijo2 = nodo.childNodes
            for(let hijoaux of hijo2){
                if(hijoaux.className === 'card-title'){
                    precioProd = hijoaux.innerHTML
                }

                if (hijoaux.className === 'txtCantidad'){
                    cantidadProd = hijoaux.innerHTML
                }
            }
            
        }
    }
    const productoSeleccionado = new Producto(nombreProd, precioProd, imagenProd, cantidadProd)

    addToCarrito(productoSeleccionado)

    console.log(carrito)
}

function addToCarrito(producto){

    //mostramos una alerta de que el producto fue agregado al carrito
    swal({
        title: 'Producto agregado!',
        text: 'Se ha agregado el producto ' + producto.nombre + ' al carrito',
        icon: 'success',
        timer: 1100,
        buttons: false,
    })

    carrito.push(producto)
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function filtrarByCategory(e){
    console.log(e.target)
    // result.innerHTML = '';

    // for(let producto of productos){
    //     let categoria = producto.category.toLowerCase()

    //     if(categoria.indexOf(category) !== -1){

                // createItems(producto);
    //     }
    // }
}

function btnClick(e){

    if (e.target.classList.contains('btnResta')){
        restarCantidad(e)
    }

    if (e.target.classList.contains('btnSuma')){
        sumarCantidad(e)
    }

}

function restarCantidad(e){

    let hijos = e.target.parentNode.childNodes
    for (let nodo of hijos){
        if(nodo.className === 'txtCantidad'){
            let cantidad = parseInt(nodo.innerHTML)
            if (cantidad > 0){
                cantidad--
            }

            nodo.innerHTML = cantidad

            console.log(nodo.innerHTML)
        }
        
    }

}

function sumarCantidad(e){
    let hijos = e.target.parentNode.childNodes
    for (let nodo of hijos){
        if(nodo.className === 'txtCantidad'){
            let cantidad = parseInt(nodo.innerHTML)
            
            cantidad++
            
            nodo.innerHTML = cantidad

            console.log(nodo.innerHTML)
        }
        
    }
}

function createItems(productItem){
    // e.preventDefault();

    //create all elements
    const itemGrid = document.createElement('div');
    const itemCard = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardImgContainer = document.createElement('div');
    const cardImg = document.createElement('img');
    const price = document.createElement('div');
    const priceTitle = document.createElement('h5');
    const minButton = document.createElement('button');
    const plusButton = document.createElement('button');
    const quantity = document.createElement('p');
    const addButton = document.createElement('button');

    //create the card div container
    
    itemGrid.classList = 'items-grilla';
    itemGrid.id = 'itemsGrilla'
    
    //create the card
    itemCard.classList = 'card border-primary mb-3';
    itemCard.innerHTML = `<style="max-width: 18rem;/>`;

    //card's header
    cardHeader.classList = 'card-header';
    cardHeader.innerText = `${productItem.nombre}`;
    
    itemCard.appendChild(cardHeader);
    itemGrid.appendChild(itemCard);
    
    cardImgContainer.classList = 'imagenes-container';

    cardImg.classList = 'imagen-prod';
    cardImg.src = productItem.img;

    cardImgContainer.appendChild(cardImg);
    itemCard.appendChild(cardImgContainer);
    
    //div price
    price.classList = 'card-body text-primary precioContainer';
    price.id = 'divPrecioyCant'

    //price value
    priceTitle.classList = 'card-title';
    priceTitle.innerText = '$' + productItem.valor;

    price.appendChild(priceTitle);

    //minus buttons
    minButton.classList = 'btn btn-secondary btnResta';
    minButton.id = 'btnRestar'
    minButton.innerText = '-';

    //plus button
    plusButton.classList = 'btn btn-secondary btnSuma';
    plusButton.id = 'btnSumar';
    plusButton.innerText = '+';

    //quantity number
    quantity.classList = 'txtCantidad';
    quantity.innerText = '1';
    
    price.appendChild(minButton);
    price.appendChild(quantity);
    price.appendChild(plusButton);

    //add to cart button
    addButton.classList = 'btn btn-primary btnAddCarrito';
    addButton.innerText = 'Agregar al carrito';

    price.appendChild(addButton);
    itemCard.appendChild(price);
    //adding to List
    result.appendChild(itemGrid);

}