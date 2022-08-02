// Apelle de l'API
fetch('http://localhost:3000/api/products')
// .then et une convertion en format JSON qui retourne mes produit dans un tableau
.then((resultat) => {
    console.log (resultat)
    return resultat.json();
  })
  // for ajoute l'affichage dans le tableau 1 par 1
.then((produits)=>{
    console.log (produits)
    const items = document.getElementById('items')
    for (let i = 0; i <produits.length; i++) {
        const produit = produits[i];
  
        items.innerHTML += `<a href="./product.html?id=${produit._id}">
        <article>
          <img src="${produit.imageUrl}" alt="${produit.altTxt}">
          <h3 class="productName">${produit.name}</h3>
          <p class="productDescription">${produit.description}</p>
        </article>
      </a>
        `;
      }
})

