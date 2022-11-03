/**
 * Récuperation des items dans le panier
 */
let itemSaveInCart = JSON.parse(localStorage.getItem("itemInCart"));
/**
 * Utilisation de la boucle for in pour parcourir l'array & insertion des éléments dans la page produits
 */

cartArray();

function cartArray(itemSaveInCart) {
  if (itemSaveInCart === null) {
    let emptyStorage = document.createElement("article");
    document.querySelector("#cart__item").appendChild(emptyStorage);
    emptyStorage.textContent = "Votre panier est vide.";
  } else {
    for (let p in itemSaveInCart) {
      //élément article
      let article = document.getElementById("cart__items");
      article.classList.add("cart__item");
      article.dataset.id = itemSaveInCart[p].idProduit;
      article.dataset.color = itemSaveInCart[p].color;

      //élément divImg
      let divImg = document.createElement("div");
      article.appendChild(divImg);
      divImg.classList.add("cart__item__img");

      //insertion de l'image du produit
      let imgInDiv = document.createElement("img");
      divImg.appendChild(imgInDiv);
      imgInDiv.src = itemSaveInCart[p].image;
      imgInDiv.alt = itemSaveInCart[p].alt;

      //élément div contenu
      let divContent = document.createElement("div");
      article.appendChild(divContent);
      divContent.classList.add("cart__item__content");

      //élément div description dans la div contenu
      let divContentDescription = document.createElement("div");
      divContent.appendChild(divContentDescription);
      divContentDescription.classList.add("cart__item__content__description");

      //élément h2 dans la divDescription
      let divContentDescriptionH2 = document.createElement("h2");
      divContentDescription.appendChild(divContentDescriptionH2);
      divContentDescriptionH2.textContent = itemSaveInCart[p].nom;

      //élément p color
      let divContentDescriptionColor = document.createElement("p");
      divContentDescription.appendChild(divContentDescriptionColor);
      divContentDescriptionColor.textContent = itemSaveInCart[p].color;

      //élément p price
      let divContentDescriptionPrice = document.createElement("p");
      divContentDescription.appendChild(divContentDescriptionPrice);
      divContentDescriptionPrice.textContent = itemSaveInCart[p].price + "€";

      //élément divSettings dans la div contenu
      let divContentSettings = document.createElement("div");
      divContent.appendChild(divContentSettings);
      divContentSettings.classList.add("cart__item__content__settings");

      //élément div settings quantity
      let divContentSettingsQuantity = document.createElement("div");
      divContentSettings.appendChild(divContentSettingsQuantity);
      divContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

      //élément p dans la div settings quantity
      let divContentSettingsQuantityP = document.createElement("p");
      divContentSettingsQuantity.appendChild(divContentSettingsQuantityP);
      divContentSettingsQuantityP.textContent = "Qté :";

      //création de l'input
      let inputQuantity = document.createElement("input");
      divContentSettingsQuantity.appendChild(inputQuantity);
      inputQuantity.setAttribute("type", "number");
      inputQuantity.classList.add("itemQuantity");
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("min", "1");
      inputQuantity.setAttribute("max", "100");
      inputQuantity.value = itemSaveInCart[p].quantity;

      //élément div delete
      let itemDelete = document.createElement("div");
      divContentSettings.appendChild(itemDelete);
      itemDelete.classList.add("cart__item__content__settings__delete");

      let itemDeleteP = document.createElement("p");
      itemDelete.appendChild(itemDeleteP);
      itemDeleteP.classList.add("deleteItem");
      itemDeleteP.textContent = "Supprimer";
    }
  }
}
