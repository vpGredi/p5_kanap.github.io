/**
 * Faire le lien entre la page produit et la page accueil via URLSarchParams
 */
let params = new URL(document.location).searchParams;
let id = params.get("id");

/**
 * Affichage des items sur la page produit
 */
const url = "http://localhost:3000/api/products";
fetch(url + `/${id}`)
  .then((response) => response.json())
  .then((data) => productDetails(data));

/**
 * Traitement et insertion des items dans la page produit
 */
function productDetails(data) {
  //itemImg
  let itemImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(itemImg);
  itemImg.src = data.imageUrl;
  itemImg.alt = data.altTxt;

  //itemTittle
  let itemTittle = document.querySelector("title");
  itemTittle.textContent = data.name;

  //itemPrice
  let itemPrice = document.getElementById("price");
  itemPrice.textContent = data.price;

  //itemDescription
  let itemDescription = document.getElementById("description");
  itemDescription.textContent = data.description;

  //itemColors
  for (let colors of data.colors) {
    let itemColors = document.createElement("option");
    document.querySelector("#colors").appendChild(itemColors);
    itemColors.value = colors;
    itemColors.textContent = colors;
  }

  //fonction OnClick
  //addEventListener
  let addToCart = document.getElementById("addToCart");
  addToCart.addEventListener("click", (onclick) => {
    let selectQuantity = document.getElementById("quantity").value;
    let selectColor = document.getElementById("colors").value;
    if (
      selectQuantity <= 0 ||
      selectQuantity > 100 ||
      selectColor == null ||
      selectColor == ""
    ) {
      alert("Veuillez selectionner une couleur et/ou une quantité correcte");
      return;
    } else {
      let info = {
        idProduct: id,
        nom: data.name,
        description: data.description,
        image: data.imageUrl,
        alt: data.altTxt,
        color: selectColor,
        quantity: selectQuantity,
        prix: data.price,
      };
      //key déclaration
      let itemSaveInCart = JSON.parse(localStorage.getItem("itemInCart"));
      if (itemSaveInCart) {
        const findStorage = itemSaveInCart.find(
          (p) => p.idProduct === id && p.color === selectColor
        );
        if (findStorage) {
          let totalItems =
            parseInt(info.quantity) + parseInt(findStorage.quantity);
          findStorage.quantity = totalItems;
          localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
        } else {
          itemSaveInCart.push(info);
          localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
        }
      } else {
        itemSaveInCart = [];
        itemSaveInCart.push(info);
        localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
      }
    }
  });
}
