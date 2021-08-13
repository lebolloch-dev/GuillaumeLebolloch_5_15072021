const section = document.querySelector("section");
/*


*/
// Appel API FETCH dans une fonction Async @getteedyVignettes
const getTeddyVignettes = async function () {
  try {
    let res = await fetch("http://localhost:3000/api/teddies");

    // condition si la reponse est OK
    if (res.ok) {
      let teddies = await res.json();

      // Boucle de création des vignettes des TEDDYS
      for (let i of teddies) {
        const teddyVignettes = document.createElement("a");
        teddyVignettes.href = "pages-html/product.html?id=" + i._id;
        section.appendChild(teddyVignettes);
        teddyVignettes.classList.add("teddyVignettes");

        const teddyImage = document.createElement("img");
        teddyImage.src = i.imageUrl;
        teddyImage.alt = "représentation ours en peluche " + i.name;
        teddyVignettes.appendChild(teddyImage);
        teddyImage.classList.add("teddyImage");

        const teddyInfo = document.createElement("div");
        teddyVignettes.appendChild(teddyInfo);
        teddyInfo.classList.add("teddyInfo");

        const teddyInfoTitle = document.createElement("h3");
        teddyInfoTitle.innerHTML = i.name;
        teddyInfo.appendChild(teddyInfoTitle);
        teddyInfoTitle.classList.add("teddyInfoTitle");

        const teddyInfoDescription = document.createElement("div");
        teddyInfo.appendChild(teddyInfoDescription);
        teddyInfoDescription.classList.add("teddyInfoDescription");

        const teddyParagraphe = document.createElement("p");
        teddyParagraphe.innerHTML = i.description;
        teddyInfoDescription.appendChild(teddyParagraphe);
        teddyParagraphe.classList.add("paragraphe");

        const teddyPrice = document.createElement("paragraphe");
        teddyPrice.innerHTML = "Prix : " + i.price / 100 + " €";
        teddyInfoDescription.appendChild(teddyPrice);
        teddyPrice.classList.add("paragraphe", "bold");
      }
    }
  } catch (err) {
    alert(
      "Erreur : Nous n'avons pas pu charger les produits, veuillez réessayer plus tard."
    );
  }
};

// Appel de la fonction @getteedyVignettes
getTeddyVignettes();

/*


*/

// Création de la fontion compteur de produit dans l'icone Panier @refreshCart
const refreshCart = function () {
  const panier = JSON.parse(localStorage.getItem("panier"));

  if (panier == null || panier.length === 0) {
  } else {
    const number = document.getElementById("number");

    number.innerHTML = panier.length;
  }
};

// Appel de la Fonction @refreshCart
refreshCart();
