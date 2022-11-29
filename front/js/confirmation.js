/**
 * Utilisation de URLSearchParams pour récupérer le numéro de commande et l'afficher sur la page de confirmation
 */
let orderParams = new URL(document.location).searchParams;
let orderNumber = orderParams.get("orderId");

let orderValue = document.getElementById("orderId");
orderValue.innerHTML = orderNumber + "</br> Merci pour votre commande.";
localStorage.clear();