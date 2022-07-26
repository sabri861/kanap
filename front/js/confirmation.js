 const params = new URLSearchParams(document.location.href);


 let id
 for (let p of params) {
     id = p[1]
    console.log(p)
 }

 const confirmation = document.getElementById("orderId");
 console.log(`id ${id}`);
 confirmation.innerHTML = id;


