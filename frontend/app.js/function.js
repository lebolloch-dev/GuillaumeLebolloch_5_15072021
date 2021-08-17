// Création de la fontion compteur de produit dans l'icone Panier @refreshCart
const refreshCart = function () {
  const panier = JSON.parse(localStorage.getItem("panier"));

  if (panier == null || panier.length === 0) {
  } else {
    const number = document.getElementById("number");

    number.innerHTML = panier.length;
  }
};
