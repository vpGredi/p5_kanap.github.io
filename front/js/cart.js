/**
 * Récuperation des items dans le panier
 */
let itemSaveInCart = JSON.parse(localStorage.getItem("itemInCart"));
localStorage.getItem('itemInCart');
/**
 * Utilisation de la boucle for in pour parcourir l'array & insertion des éléments dans la page produits
 */
function cartArray(itemSaveInCart) {
    for(let i of itemInCart) {
        //élément article
        let article = document.getElementById('cart__items');
        article.classList.add('cart__item');

        //élément imgContainer
        let imgContainer = document.createElement('div');
        article.appendChild(imgContainer);
        let basketImg = document.createElement('img');
        imgContainer.appendChild(basketImg);
        basketImg.src = itemInCart[i].image;
        basketImg.alt = itemInCart[i].alt;

        //élément infoContainer
        let infoContainer = document.createElement('div');
        infoContainer.classList.add('cart__item__content');
        let infoDescription = document.createElement('div');
        infoContainer.appendChild(infoDescription);
        infoDescription.classList.add('cart__item__content__description');
        let basketName = document.createElement('h2');
        infoDescription.appendChild(basketName);
        basketName.textContent = itemInCart[i].nom; 
    }
}