/**
 * Récuperation des items dans le panier
 */
let itemSaveInCart = JSON.parse(localStorage.getItem("itemInCart"));
/**
 * Utilisation de la boucle for in pour parcourir l'array & insertion des éléments dans la page produits
 */
cartArray();
totalItemInCart();
modifyQuantity();
deleteItem();
checkForm();

function cartArray() {
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
      divContentDescriptionPrice.textContent = itemSaveInCart[p].prix + "€";

      //élément divSettings dans la div contenu
      let divContentSettings = document.createElement("div");
      divContent.appendChild(divContentSettings);
      divContentSettings.classList.add("cart__item__content__settings");

      //élément div settings quantity
      let divContentSettingsQuantity = document.createElement("div");
      divContentSettings.appendChild(divContentSettingsQuantity);
      divContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );

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

/**
 * Fonction total items
 */
function totalItemInCart() {
  // quantité
  let elementQuantity = document.getElementsByClassName("itemQuantity");
  let totalQuantitySelected = 0;
  for (let i = 0; i < elementQuantity.length; i++) {
    totalQuantitySelected += elementQuantity[i].valueAsNumber;
  }
  let totalQuantityItem = document.getElementById("totalQuantity");
  totalQuantityItem.textContent = totalQuantitySelected;

  //prix
  let totalPrice = 0;
  for (let i = 0; i < elementQuantity.length; i++) {
    totalPrice += elementQuantity[i].valueAsNumber * itemSaveInCart[i].prix;
  }
  let totalItemPrice = document.getElementById("totalPrice");
  totalItemPrice.textContent = totalPrice;
}
/**
 * Utilisation de addEventListener de type change pour modifier la quantité ou supprimer un produit du panier
 */
function modifyQuantity() {
  const modifQuantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < modifQuantity.length; i++) {
    modifQuantity[i].addEventListener("change", function (event) {
      event.preventDefault();
      itemSaveInCart[i].quantity = event.target.value;
      if (itemSaveInCart[i].quantity < 1 || itemSaveInCart[i].quantity > 100) {
        alert("Veuillez saisir une quantité comprise entre 1 et 100");
        location.reload();
      } else {
        localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
        totalItemInCart();
      }
    });
  }
}

/**
 * Utilisation de addEventListener pour supprimer un item
 */

function deleteItem() {
  const delItem = document.querySelectorAll(".deleteItem");
  for (let d = 0; d < delItem.lenght; d++) {
    delItem[d].addEventListener("onclick", (e) => {
      console.log(itemSaveInCart);
      e.preventDefault();
      if (itemSaveInCart) {
        let idDelItem = itemSaveInCart[d].idProduit;
        let colorDelItem = itemSaveInCart[d].color;

        itemSaveInCart = itemSaveInCart.filter(
          (element) =>
            element.idProduit !== idDelItem || element.color !== colorDelItem
        );
        localStorage.setItem("itemInCart", JSON.stringify(itemSaveInCart));
      }
      location.reload();
    });
  }
}

/**
 * Formulaire de commande
 */
function checkForm() {
  //récupération des input du form
  let submit = document.getElementById("order");
  let inputFirstName = document.getElementById("firstName");
  let inputLastName = document.getElementById("lastName");
  let inputAdress = document.getElementById("adress");
  let inputCity = document.getElementById("city");
  let inputMail = document.getElementById("email");

  //mise en place des RegEx du formulaire
  let inputFirstNameRegEx =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  let inputLastNameRegEx =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  let inputAdressRegEx = /([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/;
  let inputCityRegEx = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  let inputMailRegEx =
    /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  //conditon pour valider ou non le formulaire
  submit.addEventListener("click", (e) => {
    if (
      !inputFirstNameRegEx.test(inputFirstName) ||
      !inputLastNameRegEx.test(inputLastName) ||
      !inputAdressRegEx.test(inputAdress) ||
      !inputCityRegEx.test(inputCity) ||
      !inputMailRegEx.test(inputMail)
    ) {
      let firstNameErrMessage = document.getElementById("firstNameErrorMsg");
      firstNameErrMessage.textContent =
        "Message d'erreur : Le champ est incomplet ou la valeur saisie n'est pas valide";

      let lastNameErrMessage = document.getElementById("lastNameErrorMsg");
      lastNameErrMessage.textContent =
        "Message d'erreur : Le champ est incomplet ou la valeur saisie n'est pas valide";

      let adressErrMessage = document.getElementById("addressErrorMsg");
      adressErrMessage.textContent =
        "Message d'erreur : Le champ est incomplet ou la valeur saisie n'est pas valide";

      let cityErrMessage = document.getElementById("cityErrorMsg");
      cityErrMessage.textContent =
        "Message d'erreur : Le champ est incomplet ou la valeur saisie n'est pas valide";

      let mailErrMessage = document.getElementById("emailErrorMsg");
      mailErrMessage.textContent =
        "Message d'erreur : Veuillez saisir une adresse mail valide";
    } else {
      //Si le formulaire est valide, création de l'objet qui contiendra les produits, et les infos clients
      let productsBought = [];
      productsBought.push(itemSaveInCart);

      let order = {
        contact: {
          firstName: inputFirstName.value,
          latsName: inputLastName.value,
          adress: inputAdress.value,
          city: inputCity.value,
          mail: inputMail.value,
        },
        products: productsBought,
      };
    }
  });
}

/**
 * Boutton de commande
 */
let buttonEmptyCart = document.getElementById("order");
buttonEmptyCart.addEventListener("click", () => {
  localStorage.clear();
});


/** Création de l'en-tête de la requête POST */

let options = {
  method: "POST",
  body: JSON.stringify(order),
  headers: { "Contents-Type": "application/json;charset=utf-8" },
};
