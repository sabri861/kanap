console.log("hello")
const CART_KEY = "cart_key"
const items = JSON.parse(localStorage.getItem(CART_KEY))



const cartItem = document.getElementById("cart__items")
function afficherPanier() {
  if (items === null || items.length == 0) {
    cartItem.innerHTML += `<h1>Mon panier est vide</h1>`
  }
  else {
    for (i = 0; i < items.length; i++) {
      let product = items[i]
      console.log("items:", items);
      console.log("items color:", product.color)
      cartItem.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${product.img}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.title}</h2>
            <p>${product.color}</p>
            <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input onchange="addOrRemoveItemfromCart(this.value, '${product.id}', '${product.color}')"  type="number" class="itemQuantity" id="itemQuantity" name="itemQuantity" min="1" max="100" value="${items[i].qty}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" onclick="addOrRemoveItemfromCart(0,'${product.id}', '${product.color}')">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }


  }

}

afficherPanier();




//additioné les prix dans le tableau avc la methode .reduce
const reducer = (accumulator, item) => {
  accumulator.totalPrice += parseInt(item.price) * item.qty
  accumulator.numbersArticle += item.qty

  return accumulator;
};


const result = items.reduce(reducer, { totalPrice: 0, numbersArticle: 0 });
console.log(result);
// le code html du prix totale a affiche
const totalQty = document.getElementById("totalQuantity")
totalQty.innerHTML += `<span id="totalQuantity">${result.numbersArticle}</span>`;
const totalPrice = document.getElementById("totalPrice")
totalPrice.innerHTML += `<span id="totalPrice">${result.totalPrice}</span>`;


const addOrRemoveItemfromCart = (qty, productId, productColor) => {
  console.log("to delete:", productId, productColor, qty);
  let items = JSON.parse(localStorage.getItem(CART_KEY));
  let item = items.find(item => item.id === productId && item.color === productColor);
  if (item.qty) {
    item.qty = parseInt(qty);
    if (item.qty == 0) {
      items = items.filter(item => item.qty !== 0)
    }
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    location.reload();
  }
  else {
    alert("Pas de quantité à supprimer")
  }

}

// btn envoyer le formulaire //

const btnEnvoyerFormulaire = document.querySelector("#order")
//-------------addEnvetListener------//
btnEnvoyerFormulaire.addEventListener("click", (e) => {
  e.preventDefault();
  // recuperation des value du formulaire
  class formulaire {
    constructor(input) {
      this.firstName = document.querySelector("#firstName").value;
      this.lastName = document.querySelector("#lastName").value;
      this.address = document.querySelector("#address").value;
      this.city = document.querySelector("#city").value;
      this.email = document.querySelector("#email").value;
    }
  }

  // Appel de l'instance de la classe Formulaire pour crée l'objet formulaireValues
  const formulaireValues = new formulaire();
  console.log("formulaireValues", formulaireValues);

  // *********************      création gestion validation du formulaire *******
  const textAlert = (value) => {
    return `${value} : Ne pas depasser 20 caractères, minimum 3 caractères\nChiffre et symbole ne sont pas autorisé`;
  }

  const regExfirstNameLastNameCity = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  }

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }

  const regExAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  }



  function firstNameControle() {
    // controle de la validité du prenom
    const firstName = formulaireValues.firstName;
    if (regExfirstNameLastNameCity(firstName)) {
      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      document.querySelector("#firstNameErrorMsg").textContent = "Veuillez indiquer votre prénom";
      // alert (textAlert("PRENOM"));
      return false;
    }
  };

  function lastNameControle() {
    const lastName = formulaireValues.lastName;
    if (regExfirstNameLastNameCity(lastName)) {
      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      document.querySelector("#lastNameErrorMsg").textContent = "Veuillez indiquer votre nom";
      // alert (textAlert("NON"));
      return false;
    };
  }

  function addressControle() {
    const address = formulaireValues.address;
    if (regExAddress(address)) {
      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      document.querySelector("#addressErrorMsg").textContent = "Veuillez indiquer votre address";
      // alert ("L'address n'est pas valide");
      return false;
    };
  }

  function cityControle() {
    const city = formulaireValues.city;
    if (regExfirstNameLastNameCity(city)) {
      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      document.querySelector("#cityErrorMsg").textContent = "Veuillez indiquer votre ville";
      // alert (textAlert("VILLE"));
      return false;
    };
  }

  function emailControle() {
    const email = formulaireValues.email;
    if (regExEmail(email)) {
      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez indiquer une email valide";
      //alert ("L'email n'est pas valide");
      return false;
    };
  }



  // ********* Controle validé formulaire avant envoi dans le localsStorage *******
  if (firstNameControle() && lastNameControle()  && addressControle() && cityControle() && emailControle()) {
    // mettre l'objet "formulaireValues" dans le localStorage
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    // localStorage.setItem("result", JSON.stringify(result));
  } else {
    alert("Veuiller bien remplir le formulaire ");
    return;
  }

  // console.log("firstName", firstName)

  // fin **********************************************


  



  //mettre les value du formulaire et mettre les produits séléctionné dans un objet a envoyer vers le serveur
   const aEnvoyer = {
     contact: {
       firstName: formulaireValues.firstName,
       lastName: formulaireValues.lastName,
       address: formulaireValues.address,
       city: formulaireValues.city,
       email: formulaireValues.email,
     },
     products: items.map((produit)=>produit.id)
   }


   fetch('http://localhost:3000/api/products/order', {
     method: "POST",
     body: JSON.stringify(aEnvoyer),
     headers: { "Content-Type": "application/json" },
   })

   .then((resultat) => {
     console.log (resultat)
     return resultat.json();
   })
   .then((redirection) => {
    localStorage.clear();
     document.location.href="./confirmation.html?id="+ redirection.orderId;
     console.log("redirection", redirection);
   })



   // faire une redirection en JS grace a un autre then

   console.log("aEnvoyer", aEnvoyer);


})

// //-----------------------Metre le contenue du localStorage dans le champs du formulaire------------------////////////
// // prendre la key dans le localStorage et la mettre dans une variable 

// const dataLocalStorage = localStorage.getItem("formulaireValues");


// // convertire la chaine de caractere en objet js//
// const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
// console.log("dataLocalStorageObjet", dataLocalStorageObjet);

// function remplirChampsInputDepuisLocalStorage(input) {
//   document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
// };

// remplirChampsInputDepuisLocalStorage("firstName");
// remplirChampsInputDepuisLocalStorage("lastName");
// remplirChampsInputDepuisLocalStorage("address");
// remplirChampsInputDepuisLocalStorage("city");
// remplirChampsInputDepuisLocalStorage("email");







