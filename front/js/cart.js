// creation d'une fonction asynchrone nommée getProduct qui doit avoir un id comme parametre
async function getProduct(id) {
  const produit = await fetch(`http://localhost:3000/api/products/${id}`); // recuperation de l'API + l'id
  const produitMisEnForme = await produit.json(); //produit au format json
  return produitMisEnForme;
}

//  creation d'une fonction asynchrone pour modifier les quantités
async function updateQuantity(id, quantity, color) {
  const produit = await getProduct(id); // appel de la fonction getProduct dans une const produit
  let cart = localStorage.getItem("cart"); //appel du panier dans le localstorage
  const cartParsed = JSON.parse(cart); //conversion de cart en objet
  let produitFound = cartParsed.find(
    (produit) => produit.id == id && produit.colors == color
  );
  produitFound.qty = quantity;
  localStorage.setItem("cart", JSON.stringify(cartParsed));
  console.log("produitFound", produitFound);
  displayTotalQuantity(cartParsed);
  displayTotalPrice(cartParsed);
}

//fonction qui modifie la quantité des produits
function displayTotalQuantity(cart) {
  let totalQuantity = 0; // Initialisation de la quantitée à zero

  for (produit of cart) {
    // boucle sur les produits du cart

    totalQuantity += produit.qty; // Total quantity = totalQuantity + produit.qty
  }

  let elementQuantity = document.getElementById("totalQuantity"); // recueration de l'lément html avec l'id totalQuantity
  elementQuantity.textContent = totalQuantity; // Affichage de la quantitée totale
  return totalQuantity; // return de la quantité totale
}

//  creation d'une fonction asynchrone pour modifier le prix
async function updatePrice(id, color, quantity) {
  let cart = localStorage.getItem("cart");
  const cartParsed = JSON.parse(cart);
  const produitFound = cartParsed.find(
    (produit) => produit.id == id && produit.colors == color
  );
  produitFound.qty = quantity;
  localStorage.setItem("cart", JSON.stringify(cartParsed));
  console.log(produitFound);
}

// fonction modification prix
async function displayTotalPrice(cart) {
  let totalPrice = 0;

  for (produit of cart) {
    const getProduit = await getProduct(produit.id);
    totalPrice += getProduit.price * produit.qty;
  }
  let elementPrice = document.getElementById("totalPrice");
  elementPrice.textContent = totalPrice;
  return totalPrice;
}

// fonction nouvelle quantité
function getQtyInput(event) {
  const firstParent = event.target.closest("article");

  const dataId = firstParent.dataset.id;
  const dataColor = firstParent.dataset.color;
  const newQty = event.target.valueAsNumber;
  console.log("newQty", newQty);
  updateQuantity(dataId, newQty, dataColor);
}

// fonction suppression produit
function focusDeleteProduct(event) {
  const firstParent = event.target.closest("article");
  const dataId = firstParent.dataset.id;
  const dataColor = firstParent.dataset.color;
  const suppProduct = firstParent.remove("article");
  deleteProduct(dataId, dataColor);
}

//fonction asychrone pour la suppression des produits
async function deleteProduct(id, color) {
  let cart = localStorage.getItem("cart");
  const cartParsed = JSON.parse(cart);
  const indexProduit = cartParsed.findIndex(
    (produit) => produit.id == id && produit.colors == color
  );
  cartParsed.splice(indexProduit, 1);
  localStorage.setItem("cart", JSON.stringify(cartParsed));
  displayTotalQuantity(cartParsed);
  displayTotalPrice(cartParsed);
}

// Formulaire de validation
// Prénom............................................................
function validPrenom(firstName) {
  const prenomRegExp = new RegExp("^[a-zA-Zéèêï-]+$");

  const testPrenom = prenomRegExp.test(firstName.value);
  const errorPrenom = document.getElementById("firstNameErrorMsg");
  if (testPrenom == false) {
    errorPrenom.textContent = "Prénom Invalide ";
    return false;
  } else {
    errorPrenom.textContent = "";
    return true;
  }
}

// Nom............................................................
function validNom(lastName) {
  const nomRegExp = new RegExp("^[a-zA-Zéèêï-]+$");

  const testNom = nomRegExp.test(lastName.value);
  const errorNom = document.getElementById("lastNameErrorMsg");

  if (testNom == false) {
    errorNom.textContent = "Nom Invalide ";
    return false;
  } else {
    errorNom.textContent = "";
    return true;
  }
}

// Adresse............................................................
function validAdresse(address) {
  const adresseRegExp = new RegExp("^[a-zA-Z0-9- ]+");

  const testAdresse = adresseRegExp.test(address.value);
  const errorAdresse = document.getElementById("addressErrorMsg");

  if (testAdresse == false) {
    errorAdresse.textContent = "Adresse Invalide ";
    return false;
  } else {
    errorAdresse.textContent = "";
    return true;
  }
}

// Ville............................................................
function validVille(city) {
  const villeRegExp = new RegExp("^[a-zA-Z0-9- ]+");

  const testVille = villeRegExp.test(city.value);
  const errorVille = document.getElementById("cityErrorMsg");

  if (testVille == false) {
    errorVille.textContent = "Ville Invalide ";
    return false;
  } else {
    errorVille.textContent = "";
    return true;
  }
}

// Email............................................................
function validEmail(email) {
  const emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );

  const testEmail = emailRegExp.test(email.value);
  const errorEmail = document.getElementById("emailErrorMsg");

  if (testEmail == false) {
    errorEmail.textContent = "Email Invalide ";
    return false;
  } else {
    errorEmail.textContent = "";
    return true;
  }
}

// fonction exécutée au chargement de la page
(async function main() {
  let cart = localStorage.getItem("cart");
  const cartParsed = JSON.parse(cart); // cart parser

  let totalPrice = 0;
  let totalQuantity = 0;

  for (cart of cartParsed) {
    const canapes = await getProduct(cart.id);

    // Création article class="cart__items"..
    const article = document.createElement("article");
    const section = document.getElementById("cart__items");
    section.appendChild(article);
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id", cart.id);
    article.setAttribute("data-color", cart.colors);

    // Création div 1 class="cart__item__img" enfant de article
    const divImageItem = document.createElement("div");
    article.appendChild(divImageItem);
    divImageItem.setAttribute("class", "cart__item__img");

    // Création img enfant de div 1
    const imageItem = document.createElement("img");
    divImageItem.appendChild(imageItem);
    imageItem.setAttribute("src", canapes.imageUrl);
    imageItem.setAttribute("alt", canapes.altTxt);

    // Création div2 enfant Article <div class="cart__item__content">
    const divItem = document.createElement("div");
    article.appendChild(divItem);
    divItem.setAttribute("class", "cart__item__content");

    // Création div3 enfant div2 <div class="cart__item__content__description">
    const divItemDescription = document.createElement("div");
    divItem.appendChild(divItemDescription);
    divItemDescription.setAttribute(
      "class",
      "cart__item__content__description"
    );

    // Création h2 enfant div 3 <h2>Nom du produit</h2>
    const titreDivItem = document.createElement("h2");
    divItemDescription.appendChild(titreDivItem);
    titreDivItem.append(canapes.name);

    // Création p de couleur enfant div 3 <p>Vert</p>
    const pCouleurDivItem = document.createElement("p");
    divItemDescription.appendChild(pCouleurDivItem);
    pCouleurDivItem.append(cart.colors);

    // Création p de prix enfant div 3 <p>42,00 €</p>
    const pPrixDivItem = document.createElement("p");
    divItemDescription.appendChild(pPrixDivItem);
    pPrixDivItem.append(canapes.price + " €");

    // Création div4 enfant de div 2 class="cart__item__content__settings">
    const divSettingItem = document.createElement("div");
    divItem.appendChild(divSettingItem);
    divSettingItem.setAttribute("class", "cart__item__content__settings");

    // Création div5 enfant de div4 class="cart__item__content__settings__quantity">
    const divQuantityItem = document.createElement("div");
    divSettingItem.appendChild(divQuantityItem);
    divQuantityItem.setAttribute(
      "class",
      "cart__item__content__settings__quantity"
    );

    // Création p quantité enfant de div 5  <p>Qté : </p>
    const pQuantiteItem = document.createElement("p");
    divQuantityItem.appendChild(pQuantiteItem);
    pQuantiteItem.textContent = "Qté : ";

    // fonction pour gérer la quantité supérieur à 100 et inférieur à 0
    function qty(quantite) {
      if (quantite >= 100) {
        return 100;
      }
    }

    function qtyNegatif(quantite) {
      if (quantite >= 0) {
        return 0;
      }
    }
    // Création input enfant de div 5 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    const inputQuantityItem = document.createElement("input");
    divQuantityItem.appendChild(inputQuantityItem);
    inputQuantityItem.setAttribute("type", "number");
    inputQuantityItem.setAttribute("class", "itemQuantity");
    inputQuantityItem.setAttribute("name", "itemQuantity");
    inputQuantityItem.setAttribute("min", "1");
    qtyNegatif(cart.qty);
    inputQuantityItem.setAttribute("max", "100");
    qty(cart.qty);
    inputQuantityItem.setAttribute("value", cart.qty);
    inputQuantityItem.addEventListener("change", getQtyInput);

    //Création div 6 enfant de div4 class="cart__item__content__settings__delete"
    const deleteItem = document.createElement("div");
    divSettingItem.appendChild(deleteItem);
    deleteItem.setAttribute("class", "cart__item__content__settings__delete");

    // Création p supprimer enfant de div 6 <p class="deleteItem">Supprimer</p>
    const pDeleteItem = document.createElement("p");
    deleteItem.appendChild(pDeleteItem);
    pDeleteItem.setAttribute("class", "deleteItem");
    pDeleteItem.textContent = "Supprimer";
    pDeleteItem.addEventListener("click", focusDeleteProduct);

    // Création du total quantité
    totalQuantity += parseInt(cart.qty);

    // Création total prix
    const totalPrix = document.getElementById("totalPrice");
    const articlePrix = parseInt(canapes.price);
    totalPrice += parseFloat(articlePrix * cart.qty);
    totalPrix.textContent = totalPrice;
  }
  displayTotalQuantity(cartParsed);
  displayTotalPrice(cartParsed);

  // Formulaire de vlidation
  const form = document.getElementsByClassName("cart__order__form")[0];

  const appelPrenom = document.getElementById("firstName");
  const firstName = appelPrenom.addEventListener("change", function (e) {
    validPrenom(e.target);
  });

  const appelNom = document.getElementById("lastName");
  const lastName = appelNom.addEventListener("change", function (e) {
    validNom(e.target);
  });

  const appelAdresse = document.getElementById("address");
  const address = appelAdresse.addEventListener("change", function (e) {
    validAdresse(e.target);
  });

  const appelVille = document.getElementById("city");
  const city = appelVille.addEventListener("change", function (e) {
    validVille(e.target);
  });

  const appelEmail = document.getElementById("email");
  const email = appelEmail.addEventListener("change", function (e) {
    validEmail(e.target);
  });

  // Ecouter la soumission du formulaire
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(validVille(form.city));
    if (
      validPrenom(form.firstName) &&
      validNom(form.lastName) &&
      validAdresse(form.address) &&
      validVille(form.city) &&
      validEmail(form.email)
    ) {
      let tableau = [];
      for (produit of cartParsed) {
        tableau.push(produit.id);
      }
      let contact = {
        contact: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value,
        },
        products: tableau,
      };
      console.log(contact);
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (data) {
          console.log("data", data);
          document.location.href = "confirmation.html?orderId=" + data.orderId;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
})();
