/**
 * Faire le lien entre la page produit et la page accueil avec URLSarchParams
 */
let params = new URL(document.location).searchParams;
let id = params.get("id");

/**
 * Affichage des items sur la page produit
 */
const url = 'http://localhost:3000/api/products';
fetch(url + `/${id}`)
  .then((response) => response.json())
  .then((data) => productDetails(data));

/**
 * Traitement et insertion des items dans la page produits
 */
function productDetails(data) {
  //itemImg
  let itemImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(itemImg);
  itemImg.src = data.imageUrl;
  itemImg.alt = data.altTxt;

  //itemTittle
  let itemTittle = document.querySelector('title');
  itemTittle.textContent = data.name;

  //itemPrice
  let itemPrice = document.getElementById('price');
  itemPrice.textContent = data.price;

  //itemDescription
  let itemDescription = document.getElementById('description');
  itemDescription.textContent = data.description;

  //itemColors
  for (let colors of data.colors) {
    let itemColors = document.createElement('option');
    document.querySelector('#colors').appendChild(itemColors);
    itemColors.value = colors;
    itemColors.textContent = colors;
  }

  //fonction OnClick
  //récupération des valeurs à mettre dans le local storage
  let valueItemInCart = {
    Id: data.id,
    quantite: 1,
    color: data.colors
   }
  //déclaration de la variable ou sont stocké les keys et values qui sont dans le localStorage
  let itemSaveInCart = JSON.parse(localStorage.getItem('itemInCart')); 
  //addEventListener
  let addToCart = document.getElementById('addToCart')
  addToCart.addEventListener('click', onclick => {
    if(itemSaveInCart) {
      itemSaveInCart.push(valueItemInCart);
      localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
    }else{
      itemSaveInCart = [];
      itemSaveInCart.push(valueItemInCart);
      localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
    }
  })
}
