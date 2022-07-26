
const params = new URLSearchParams(document.location.href);


let id
for (let p of params) {
    id = p[1]
    console.log(p)
}
console.log(id)
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


const addItemToCart = () => {
    // dans la logic de l'écouteur, tu pourras utiliser l'api localStorage.setObj(key, value)
    const CART_KEY = "cart_key"

    // on lit dans le local storage ou on prend une valeur vide par defaut
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || []
    console.log("cart", cart)

    // ajouter ton kanapé dans le tableau cart
    let qty = parseInt(document.getElementById("quantity").value);
    console.log("qty", qty);
    let color = document.getElementById("colors").value;
    console.log("color", color);
    let img = document.getElementById("productImage").src;
    console.log("img" , img );
    let price =document.getElementById("price").innerText;
    console.log("price", price);
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

    if(!btnPanier){
        alert("élément(s) ajouté au panier")
        
    }
    
    
    
    const product = {
        id: id,
        color: color,
        qty: qty,
        img: img,
        price: price,
        title: title,
        altTxt: altTxt,
    }
    console.log("product", product);

    const found = cart.find(element => element.id === id && element.color === color)
    console.log("found", found)

    if (found) {
        found.qty = found.qty + qty
    }
    else {
        cart.push(product);
    }


    // et au finale on écrit les modifications de la donnée dans le localStorage
    //const CART_KEY = product.id
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    console.log("kanape ajouté au panier")
}

// ajouter un écouteur sur le onClick du bouton "Valider Mon Panier"
let btn = document.getElementById("addToCart");
btn.addEventListener('click', addItemToCart);




















