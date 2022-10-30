/**
 * Récuperation des items dans le panier
 */
let itemSaveInCart = JSON.parse(localStorage.getItem("itemInCart"));
/**
 * Utilisation de la boucle for in pour parcourir l'array & insertion des éléments dans la page produits
 */
function cartArray() {
    for(let i in itemSaveInCart) {
        //élément article
        let article = document.getElementById('cart__items');
        article.classList.add('cart__item');
        //article.classList.add('data-id, data-color')

        //élément imgContainer
        let imgContainer = document.createElement('div');
        imgContainer.classList.add('cart__item__img')
        article.appendChild(imgContainer);
        let basketImg = document.createElement('img');
        imgContainer.appendChild(basketImg);
        basketImg.src = itemSaveInCart[i].image;
        basketImg.alt = itemSaveInCart[i].alt;

        //élément infoContainer
        let infoContainer = document.createElement('div');
        infoContainer.classList.add('cart__item__content');
        let infoDescription = document.createElement('div');
        infoContainer.appendChild(infoDescription);
        infoDescription.classList.add('cart__item__content__description');
        let basketName = document.createElement('h2');
        infoDescription.appendChild(basketName);
        basketName.textContent = itemSaveInCart[i].nom;
        let basketColor = document.createElement('p');
        infoDescription.appendChild(basketColor);
        basketColor.textContent = itemSaveInCart[i].color;
    }
}