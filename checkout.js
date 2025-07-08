let getDatafromLS = localStorage.getItem("items");
let cartItems = [];

if (getDatafromLS !== null) {
    cartItems = JSON.parse(getDatafromLS);
} else {
    cartItems = []; // fallback if nothing found
}

// 2. Get container and total element
const container = document.getElementById("checkoutItems");
const finalTotal = document.getElementById("finalTotal");

let total = 0;

// 3. Loop through cart items and display each
cartItems.forEach(item => {
    total += item.price;

    container.innerHTML += `
      <div class="checkout-item d-flex align-items-center gap-3">
        <img src="${item.img}" alt="product image" />
        <div>
          <h6 class="mb-1">${item.title}</h6>
          <p class="mb-0 text-muted">$${item.price.toFixed(2)}</p>
        </div>
      </div>
    `;
});

// 4. Show final total
finalTotal.textContent = `$${total.toFixed(2)}`;

function confirmOrder(){
  Swal.fire({
  icon: "success",
  title: "Congratulations",
  text: "Order Placed",
});
}