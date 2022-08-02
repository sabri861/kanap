 const params = new URLSearchParams(document.location.search);
 let id = params.get("orderId");

 
 const confirmation = document.getElementById("orderId");
 console.log(`id ${id}`);
 confirmation.innerHTML = id;


