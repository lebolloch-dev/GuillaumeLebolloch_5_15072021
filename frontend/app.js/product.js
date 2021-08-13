// récupération grace à l'ID du Teddy voulu
const urlSearch = new URLSearchParams(window.location.search);
const id = urlSearch.get("id");

// Création de la fontion compteur de produit dans l'icone Panier @refreshCart
const refreshCart = function () {
  const panier = JSON.parse(localStorage.getItem("panier"));
  console.log(panier);

  if (panier == null || panier.length === 0) {
  } else {
    const number = document.getElementById("number");

    number.innerHTML = panier.length;
  }
};

// Appel API FETCH avec un ciblage de produit grace à L'ID récupéré plus haut. Cela dans une fonction Async @pageTeddy
const pageTeddy = async function () {
  try {
    let res = await fetch("http://localhost:3000/api/teddies/" + id);

    // condition si la reponse est OK
    if (res.ok) {
      let teddy = await res.json();

      const main = document.querySelector("main");

      // Création des différentes parties HTML de l'affichage du produit
      const teddyImage = document.createElement("div");
      main.appendChild(teddyImage);
      teddyImage.classList.add("teddyImage");

      const img = document.createElement("img");
      teddyImage.appendChild(img);
      img.src = teddy.imageUrl;
      img.style.width = "100%";

      const info = document.createElement("div");
      main.appendChild(info);
      info.classList.add("info");

      const teddyTitle = document.createElement("h3");
      info.appendChild(teddyTitle);
      teddyTitle.innerHTML = teddy.name;
      teddyTitle.classList.add("teddyTitle");

      const tilteDescription = document.createElement("h4");
      info.appendChild(tilteDescription);
      tilteDescription.innerHTML = "Description :";
      tilteDescription.classList.add("tilteDescription");

      const teddyDescription = document.createElement("p");
      info.appendChild(teddyDescription);
      teddyDescription.innerHTML = teddy.description;
      teddyDescription.classList.add("teddyDescription");

      const teddyPrice = document.createElement("p");
      info.appendChild(teddyPrice);
      teddyPrice.innerHTML = "prix " + teddy.price / 100 + " €";
      teddyPrice.classList.add("teddyPrice");

      const teddyColors = document.createElement("select");
      info.appendChild(teddyColors);
      teddyColors.setAttribute("id", "teddyColors");
      teddyColors.name = "colors";

      const option = document.createElement("option");
      teddyColors.appendChild(option);
      option.innerHTML = "Choisissez la couleurs";

      // Selection couleur Teddys
      const colors = teddy.colors;
      for (i = 0; i < colors.length; i++) {
        const optionColors = document.createElement("option");
        teddyColors.appendChild(optionColors);
        optionColors.textContent = colors[i];
        optionColors.value = colors[i];
      }

      // Creation bouton d'ajout au panier
      const bouttonValidation = document.createElement("button");
      info.appendChild(bouttonValidation);
      bouttonValidation.type = "submit";
      bouttonValidation.setAttribute("id", "bouttonValidation");
      bouttonValidation.innerHTML = "Ajouter au panier";

      bouttonValidation.addEventListener("click", function (event) {
        event.preventDefault();

        // Objet qui regroupe les informations du teddy à récuprer
        const selectTeddy = {
          teddyId: teddy._id,
          teddyName: teddy.name,
          teddyImg: teddy.imageUrl,
          teddyPrice: teddy.price,
        };

        // creation de la clé panier dansle localStorage
        let localStorageTeddy = JSON.parse(localStorage.getItem("panier"));

        // Ajout des information du teddy souhaité dans le localstorage
        if (localStorageTeddy) {
          localStorageTeddy.push(selectTeddy);
          localStorage.setItem("panier", JSON.stringify(localStorageTeddy));
        } else {
          localStorageTeddy = [];
          localStorageTeddy.push(selectTeddy);
          localStorage.setItem("panier", JSON.stringify(localStorageTeddy));
        }

        // Appel de la Fonction @refreshCart pour rajout du produit dans le compteur de l'icone panier
        refreshCart();
      });
    }
  } catch (err) {
    alert("Erreur : ");
  }
};

// appel des fonctions créés plus haut

pageTeddy();

refreshCart();
