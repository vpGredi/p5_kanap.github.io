/**
 * Faire le lien entre la page produit et la page accueil avec URLSarchParams
 */
let params = new URL(document.location).searchParams;
let id = params.get("id");

/**
 * Affichage des items sur la page produit
 */
const url = "http://localhost:3000/api/products";
fetch(url + "id")
  .then((response) => response.json())
  .then((data) => productDetails(data));

/**
 * Traitement et insertion des items dans la page produits
 */
function productDetails(data) {
  for (let i in data) {
    //image du produit
    let item = document.querySelector(".item");
    item.querySelector(".item__img").UrlSearchParams('imgUrl')
    item.querySelector(".item__img").alt = data[i].altTxt;

    //nom du produit
    item.getElementById("tittle");
    item.textContent = data[i].name;

    //prix du produit
    item.getElementById("price");
    item.textContent = data[i].price;

    //description du produit
    item.getElementById("description");
    item.textContent = data[i].description;

    //option de couleur des produits
    item.getElementById("colors");
    let color = new Option((value = data[i].data[colors]));
  }
}
