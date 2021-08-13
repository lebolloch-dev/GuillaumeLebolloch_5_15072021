// Récupération des infos stocké dans le localStorage
const orderId = localStorage.getItem("orderId");
const orderName = localStorage.getItem("orderName");
const orderPrice = localStorage.getItem("orderPrice");

const main = document.querySelector("main");

// Création des différentes divs
const title = document.createElement("h2");
main.appendChild(title);
title.innerHTML = "Félicitation votre commande est confirmé.";

// Implémentations du Prénom, Prix + Numéro de l'oderId de la commande
const info = document.createElement("p");
info.innerHTML = `Merci ${orderName} pour votre commande de <b> ${orderPrice} €</b>. Votre numéro de suivi de commande est le :<b> ${orderId}</b>`;
main.appendChild(info);

// Bouton qui Clear tout le localStorage + une redirection sur la page d'acceuil du site Web
const retourPage = document.createElement("button");
main.appendChild(retourPage);
retourPage.innerHTML = "Retour à l'acceuil";
retourPage.classList.add("retourPage");
retourPage.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  window.location = "../index.html";
});
