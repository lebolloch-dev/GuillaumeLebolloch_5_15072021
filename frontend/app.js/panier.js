// récupération des informations stocké dans le localStorage
const panier = JSON.parse(localStorage.getItem("panier"));

const main = document.querySelector("main");

// Condition Panier Vide
if (panier == null || panier.length === 0) {
  // creation élément visuel pour le panier vide
  const panierVide = document.createElement("div");
  main.appendChild(panierVide);

  const titlePanierVide = document.createElement("p");
  panierVide.appendChild(titlePanierVide);
  titlePanierVide.innerHTML = "Votre paniez est vide :( ";
  titlePanierVide.classList.add("titlePanierVide");
}

// condition panier contenant au moins 1 article
else {
  const productPanier = document.createElement("div");
  main.appendChild(productPanier);
  productPanier.classList.add("productPanier");

  // Fonction @articlePanier pour creer les vignettes des differents produits ajouté au panier
  const articlePanier = function () {
    productPanier.innerHTML = panier
      .map(
        (e) =>
          `
      <div class="listProduct">
          <div class="teddyImage">
            <img src="${e.teddyImg}" alt="" />
          </div>
          <h3 class="teddyTitle">${e.teddyName}</h3>
          <p class="teddyQuantity">Quantité: 1 </p>
          <p class="teddyPrice">prix : ${e.teddyPrice / 100} €</p>
          <i class="trashIcon far fa-trash-alt"></i>
        </div>

`
      )
      .join("");
  };

  // Appel de la donction @articlePanier
  articlePanier();

  // Création de section information du panier
  const totalPanier = document.createElement("div");
  main.appendChild(totalPanier);
  totalPanier.classList.add("totalPanier");

  const product = document.createElement("div");
  totalPanier.appendChild(product);
  product.classList.add("product");

  const quantity = document.createElement("p");
  product.appendChild(quantity);
  quantity.classList.add("quantity");
  quantity.innerHTML = "Quantité: ";

  // Quantité de produit dans le Panier
  const quantityTotal = document.createElement("p");
  product.appendChild(quantityTotal);
  quantityTotal.classList.add("quantityTotal");
  quantityTotal.innerHTML = panier.length + " produits";

  const price = document.createElement("div");
  totalPanier.appendChild(price);
  price.classList.add("price");

  const total = document.createElement("p");
  price.appendChild(total);
  total.classList.add("total");
  total.innerHTML = "Total: ";

  // Prix total du panier
  const refreshTotalPrice = function () {
    let total = 0;
    for (i = 0; i < panier.length; i++) {
      total += panier[i].teddyPrice / 100;
    }
    return { total: total };
  };

  let cartData = refreshTotalPrice();
  const totalPrice = document.createElement("p");
  price.appendChild(totalPrice);
  totalPrice.classList.add("totalPrice");
  totalPrice.innerHTML = cartData.total + "€";

  // Boutton de validation du panier
  const bouttonValidation = document.createElement("button");
  totalPanier.appendChild(bouttonValidation);
  bouttonValidation.type = "submit";
  bouttonValidation.setAttribute("id", "bouttonValidation");
  bouttonValidation.innerHTML = "Valider ma commande";

  bouttonValidation.addEventListener("click", function (e) {
    e.preventDefault();

    if (panier.length < 4) {
      productPanier.style.height = "550px";
    }
    // aparition de la div validation, et suppression des bouton vider tout le panier et validation du panier
    window.top.scrollTo(0, 110);
    validation.style.display = "flex";
    bouttonValidation.style.display = "none";
    trashAll.style.display = "none";
  });

  // Bouton pour vider TOUT le panier
  const trashAll = document.createElement("button");
  totalPanier.appendChild(trashAll);
  trashAll.type = "submit";
  trashAll.setAttribute("id", "trashAll");
  trashAll.innerHTML = "Vider mon panier";

  trashAll.addEventListener("click", function (z) {
    z.preventDefault();

    if (window.confirm("voulez vous tous supprimer de votre panier ?")) {
      localStorage.removeItem("panier");
      window.location.reload();
    } else {
    }
  });

  // Bouton pour vider UN SEUL produit du panier
  let trashButton = document.getElementsByClassName("trashIcon");

  for (let i = 0; i < trashButton.length; i++) {
    trashButton[i].addEventListener("click", function (e) {
      trashButton.id = i;

      panier.splice(trashButton.id, 1);

      localStorage.setItem("panier", JSON.stringify(panier));
      JSON.parse(localStorage.getItem("panier"));

      alert("Cet article a bien été supprimé !");
      window.location.reload();
    });
  }

  // Création de la div VALIDATION
  const validation = document.createElement("div");
  productPanier.appendChild(validation);
  validation.classList.add("validation");

  const h2 = document.createElement("h2");
  validation.appendChild(h2);
  h2.innerHTML = "Validation de votre commande";

  const h3 = document.createElement("h3");
  validation.appendChild(h3);
  h3.innerHTML = "Informations Personnelles";

  const infoPersonnelle = document.createElement("form");
  validation.appendChild(infoPersonnelle);
  infoPersonnelle.action = "get";
  infoPersonnelle.classList.add("infoPersonnelle");

  // firstName avec son regEX
  const fName = document.createElement("input");
  infoPersonnelle.appendChild(fName);
  fName.classList.add("input");
  fName.type = "text";
  fName.name = "firstName";
  fName.placeholder = "Prénom";
  fName.required = true;

  fName.addEventListener("change", function (e) {
    if (/^[A-Z-a-zàâçéèêëîïôûùüÿñæœ\s]{3,20}$/.test(e.target.value)) {
      fName.style.borderColor = "#b0f2b6";
      disableSubmit(false);
    } else {
      alert("Aucun chiffre ou symbole n'est autorisé!");
      e.preventDefault();
      fName.style.borderColor = "#ab374b";
      disableSubmit(true);
    }
  });

  // LastName avec son regEX
  const lName = document.createElement("input");
  infoPersonnelle.appendChild(lName);
  lName.classList.add("input");
  lName.type = "text";
  lName.name = "lastName";
  lName.placeholder = "Nom";
  lName.required = true;

  lName.addEventListener("change", function (e) {
    if (/^[A-Z-a-z\s]{3,30}$/.test(e.target.value)) {
      lName.style.borderColor = "#b0f2b6";
      disableSubmit(false);
    } else {
      alert("Aucun chiffre ou symbole n'est autorisé!");
      e.preventDefault();
      lName.style.borderColor = "#ab374b";
      disableSubmit(true);
    }
  });

  // adress avec son regEX
  const adress = document.createElement("input");
  infoPersonnelle.appendChild(adress);
  adress.classList.add("input");
  adress.type = "text";
  adress.name = "adress";
  adress.placeholder = "Adresse";
  adress.required = true;

  adress.addEventListener("change", function (e) {
    if (/^[A-Z-a-z-0-9-zàâçéèêëîïôûùüÿñæœ\s]{5,80}$/.test(e.target.value)) {
      adress.style.borderColor = "#b0f2b6";
      disableSubmit(false);
    } else {
      alert("Aucun symbole n'est autorisé!");
      e.preventDefault();
      adress.style.borderColor = "#ab374b";
      disableSubmit(true);
    }
  });

  // city avec son regEX
  const city = document.createElement("input");
  infoPersonnelle.appendChild(city);
  city.classList.add("input");
  city.type = "text";
  city.name = "city";
  city.placeholder = "Ville";
  city.required = true;

  city.addEventListener("change", function (e) {
    if (/^[A-Z-a-z-zàâçéèêëîïôûùüÿñæœ\s]{3,45}$/.test(e.target.value)) {
      city.style.borderColor = "#b0f2b6";
      disableSubmit(false);
    } else {
      alert("Aucun chiffre ou symbole n'est autorisé!");
      e.preventDefault();
      city.style.borderColor = "#ab374b";
      disableSubmit(true);
    }
  });

  // email avec son regEX
  const email = document.createElement("input");
  infoPersonnelle.appendChild(email);
  email.classList.add("input");
  email.type = "email";
  email.name = "email";
  email.placeholder = "E-mail";
  email.required = true;

  email.addEventListener("change", function (e) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
      email.style.borderColor = "#b0f2b6";
      disableSubmit(false);
    } else {
      alert("Adresse mail NON valide!");
      e.preventDefault();
      email.style.borderColor = "#ab374b";
      disableSubmit(true);
    }
  });

  // Bouton d'envoi du formulaire personnel
  const submitButton = document.createElement("input");
  infoPersonnelle.appendChild(submitButton);
  submitButton.classList.add("submitButton");
  submitButton.type = "submit";
  submitButton.name = "commander";
  submitButton.value = "COMMANDER";

  // fonction qui empéche le click pour l'envoi du formulaire si tout les champs ne sont pas remplis(et pour savoir si les champs sont bien remplis cela se passe au niveau des regEX)
  function disableSubmit(disable) {
    if (disable) {
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "grey";
      submitButton.style.cursor = "not-allowed";
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.style.backgroundColor = "black";
      submitButton.style.cursor = "pointer";
    }
  }

  // Fonction qui envoi le formulaire d'info personnel au backend + les produit selectionné dans le panier
  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    // set up de contact et products conforme a la demande du backend
    let contact = {
      firstName: fName.value,
      lastName: lName.value,
      address: adress.value,
      city: city.value,
      email: email.value,
    };

    let products = [];
    for (teddy of panier) {
      let productsId = teddy.teddyId;
      products.push(productsId);
    }

    // Fonction @postCommand Fetch POST async dans l'ORDER de l'api
    const postCommand = async function (data) {
      try {
        let res = await fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-Type": "application/json",
          },
        });

        // condition si la reponse est OK
        if (res.ok) {
          let data = await res.json();
          // Stockage de l'oder ID fourni par le backend dans le localStorage
          localStorage.setItem("orderId", data.orderId);
          // Stockage du Prenom du client dans le localStorage
          localStorage.setItem("orderName", contact.firstName);
          // Stockage du Prix de la commande dans le localStorage
          localStorage.setItem("orderPrice", cartData.total);

          // redirection sur la page confirmation
          window.location = "confirmation.html";

          // Clear de la clé panier du localStorage
          localStorage.removeItem("panier");
        } else {
          e.preventDefault();

          alert("Erreur rencontrée : " + res.status);
        }
      } catch (error) {
        alert("Erreur : " + error);
      }
    };

    // Appel de la fonction @postCommand
    postCommand({ contact, products });
  });

  // Bouton annulation du formulaire d'info personnel
  const annul = document.createElement("input");
  infoPersonnelle.appendChild(annul);
  annul.classList.add("annul");
  annul.name = "annuler";
  annul.value = "ANNULER";

  annul.addEventListener("click", function (f) {
    f.preventDefault();
    validation.style.display = "none";
    productPanier.style.height = "fit-content";
    bouttonValidation.style.display = "flex";
    trashAll.style.display = "flex";

    fName.style.borderColor = "grey";
    lName.style.borderColor = "grey";
    adress.style.borderColor = "grey";
    city.style.borderColor = "grey";
    email.style.borderColor = "grey";

    // Clear de la value des differents inputs
    fName.value = "";
    lName.value = "";
    adress.value = "";
    city.value = "";
    email.value = "";
  });
}
