// recuperation de l'id
const params = new URLSearchParams(document.location.search);
let id = params.get("id");
// fin **********

// fetch pour recuperer le detaille  du produit et son ID  ****************
fetch(`http://localhost:3000/api/products/${id}`)
    .then(res => {
        return res.json()
    })
    .then(res => {
        console.log(res);
        const {
            imageUrl: _imageUrl,
            price: _price,
            name: _name,
            description: _description,
            colors: _colors,
            altTxt: _altTxt,
            id: _id,
        } = res;
       // affichage sur le site ****
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${_imageUrl}" alt="${_altTxt}" id="productImage">`;

        let name = document.getElementById("title");
        name.innerHTML = _name;


        let price = document.getElementById("price");
        price.innerHTML = _price;

        let description = document.getElementById("description");
        description.innerHTML = _description;

        let color = document.getElementById("colors");
        for (i = 0; i < _colors.length; i++) {
            color.innerHTML += `<option value="${_colors[i]}">${_colors[i]}</option>`;
        };

    })
// fin ******

const addItemToCart = () => {
    // je definie ma clée 
    const CART_KEY = "cart_key"

    // recupartion de la clee dans  LocalStorage si il y a rien dedans sa renvoi un tableau vide 
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || []
    console.log("cart", cart)

    // ajouter ton kanapé dans le tableau cart
    let qty = parseInt(document.getElementById("quantity").value);
    console.log("qty", qty);
    let color = document.getElementById("colors").value;
    console.log("color", color);
    let img = document.getElementById("productImage").src;
    console.log("img" , img );
    
    let title = document.getElementById("title").innerText;
    console.log("title", title);
    let btnPanier =document.getElementById("addToCart").value;
    console.log("btnPanier", btnPanier);
    let altTxt = document.getElementById("productImage").src;
    console.log("altTxt" , altTxt );

    

    if(!color && !qty) {
      alert("veuillez sélectionner une couleur et une quantité")
      return
    }
    if(!color) {
        alert("veuillez sélectionner une couleur")
        return
    }

    if(!qty) {
        alert("veuillez sélectionner une quantité")
        return
    }

   
    
    
    
    const product = {
        id: id,
        color: color,
        qty: qty,
        img: img,
        title: title,
        altTxt: altTxt,
    }
    console.log("product", product);
    
    // voir si dans le localStorage il existe le meme kanape (meme id meme color)
    const found = cart.find(element => element.id === id && element.color === color)
    console.log("found", found)

    if (found) {
        found.qty = found.qty + qty
    }
    else {
        cart.push(product);
    }


    // et au finale on écrit les modifications de la donnée dans le localStorage
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    alert("kanape ajouté au panier")
}

// ajouter un écouteur sur le onClick du bouton "Ajouter au Panier"
let btn = document.getElementById("addToCart");
btn.addEventListener('click', addItemToCart);




















