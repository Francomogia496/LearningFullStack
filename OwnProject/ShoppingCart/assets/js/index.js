let searchTxt, arrItems, btnAddToCart, ArrCartButtons
let btnSearch, result
const searchBar = document.getElementById('SearchBar');
let items = []
let products = []
let shopCart = []

eventListeners();

function eventListeners(){
    //define the DOMContentLoaded event (this event is triggered when the form finish its load)
    document.addEventListener('DOMContentLoaded', initItems);

    //define the function for the search bar
    // let searchBar = document.getElementById('SearchBar');
    searchBar.addEventListener('keyup', filterItems);
}

btnSearch = document.getElementById('BtnSearch')
result = document.getElementById('ProductsList')

// ------------------------------- FUNCIONES -----------------------------

async function initItems(){
    await fetchData();

    let items = document.getElementsByClassName('grid-items');

    arrItems = Array.from(items);

    for (let item of arrItems){
        item.addEventListener('click', btnClick);
    }

    //obtenemos los botones de agregar al carrito
    btnAddToCart = document.getElementsByClassName('btnAddCart');

    ArrCartButtons = Array.from(btnAddToCart);
    for (let btn of ArrCartButtons){
        btn.addEventListener('click', loadProduct)
    }
}

function filterItems(){
    result.innerHTML = '';

    //getting the text of searchbar
    searchTxt = searchBar.value.toLowerCase();

    for(let product of products){
        //get the name of every product
        let productName = product.name.toLowerCase()

        //when text match return '-1'
        if(productName.indexOf(searchTxt) !== -1){
            createItems(product);
        }
    }

    items = document.getElementsByClassName('grid-items')

    arrItems = Array.from(items)

    for (let item of arrItems){
        item.addEventListener('click', btnClick)
    }

    //get Add to Cart button
    btnAddToCart = document.getElementsByClassName('btnAddCart');

    ArrCartButtons = Array.from(btnAddToCart)
    for (let btn of ArrCartButtons){
        btn.addEventListener('click', loadProduct)
    }
}

function Product(name, price, image, qantity){
    this.name = name
    this.price = price
    this.image = image
    this.qantity = qantity
}

async function fetchData(){
    result.innerHTML = '';
    await fetch('../assets/resources/ProductsList.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((prod) => {

            const searchTxt = searchBar.value.toLowerCase()

            let name = prod.name.toLowerCase()

            if(name.indexOf(searchTxt) !== -1){
                
                createItems(prod);

            }

            products.push(prod);
        });
    })
}

function loadProduct(e){
    e.preventDefault();
    let nameProd, priceProd, qantityProd, imageProd;

    let hijos = e.target.parentNode.parentElement.childNodes;
    for (let nodo of hijos){
        if(nodo.className === 'card-header'){
            nameProd = nodo.innerHTML
        }
        
        if(nodo.className === 'imagenes-container'){
            let hijo1 = nodo.childNodes
            for(let hijoaux of hijo1){
                imageProd = hijoaux.getAttribute("src")
            }
        }

        if(nodo.id === 'divPrecioyCant'){
            let hijo2 = nodo.childNodes
            for(let hijoaux of hijo2){
                if(hijoaux.className === 'card-title'){
                    priceProd = hijoaux.innerHTML
                }

                if (hijoaux.className === 'txtCantidad'){
                    qantityProd = hijoaux.innerHTML
                }
            }
            
        }
    }
    const selectedProduct = new Product(nameProd, priceProd, imageProd, qantityProd)

    addToCart(selectedProduct)

    console.log(shopCart)
}

function addToCart(product){

    //mostramos una alerta de que el producto fue agregado al carrito
    swal({
        title: 'Producto agregado!',
        text: 'Se ha agregado el producto ' + product.name + ' al carrito',
        icon: 'success',
        timer: 1100,
        buttons: false,
    })

    shopCart.push(product)
    localStorage.setItem('carrito', JSON.stringify(shopCart))
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
    
    itemGrid.classList = 'grid-items';
    itemGrid.id = 'itemsGrilla'
    
    //create the card
    itemCard.classList = 'card border-primary cardContainer';
    // itemCard.innerHTML = `<style="max-width: 18rem;/>`;
    // itemCard.style = 'style="max-width: 18rem height:auto"';

    //card's header
    cardHeader.classList = 'card-header cardHeader';
    cardHeader.innerText = `${productItem.name}`;
    
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
    priceTitle.innerText = '$' + productItem.price;

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
    addButton.classList = 'btn btn-primary btnAddCart';
    addButton.innerText = 'Agregar al carrito';

    price.appendChild(addButton);
    itemCard.appendChild(price);
    //adding to List
    result.appendChild(itemGrid);

}