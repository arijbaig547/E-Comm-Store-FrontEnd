const allProducts = "https://fakestoreapi.com/products";
const allCategories = "https://fakestoreapi.com/products/categories"

const productContainer = document.querySelector(".product-grid");
const sidebar = document.querySelector(".sidebar")



function displayProducts() {
  fetch(allProducts)
    .then(res => res.json())
    .then(data => {
      data.forEach(product => {
        productContainer.innerHTML += `
        <div class="col-md-4">
          <div class="card">
            <img src="${product.image}" class="card-img-top" style="height: 200px; object-fit: contain; padding: 10px;" />
            <div class="card-body d-flex justify-content-between align-items-start flex-column">
              <div class="w-100 d-flex justify-content-between align-items-center mb-2">
                <div style="max-width: 75%;">
                  <h6 class="card-title mb-1" style="font-size: 0.95rem;">${product.title.slice(0, 40)}...</h6>
                  <p class="text-muted mb-0">$${product.price}</p>
                </div>
                <button onclick="displayIteminCart(this)"class="btn btn-add">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
      });
    });
}

displayProducts();




function searchProduct() {
  let searchBarValue = document.querySelector("#searchBar").value.toLowerCase();
  let products = document.querySelectorAll(".product-grid .col-md-4"); 

  products.forEach(product => {
    let title = product.querySelector("h6").textContent.toLowerCase();
    if (title.includes(searchBarValue)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function openCart() {
  const sideBar = document.querySelector(".cartSideBar");
  sideBar.classList.add("active");
}

function closeCart() {
  const sideBar = document.querySelector(".cartSideBar");
  sideBar.classList.remove("active");
}

 let counter=0;
 let total=[]
 let addedItems = [];  // global


function displayIteminCart(e) {
  const sideBar = document.querySelector(".cartSideBar");
  let card = e.closest(".card");
  let img = card.querySelector("img");
  let title = card.querySelector("h6").textContent;
  let price = card.querySelector("p").textContent;
  let checkoutBtn = document.querySelector("#checkoutBtn");
  let counterText = document.querySelector("#cartCounter");

  checkoutBtn.style.display = "block";

  // Stop duplicate
  if (addedItems.some(item => item.title === title)) {
    alert("Item already added to cart!");
    return;
  }

  // Push full item info
  let itemObj = {
    title: title,
    price: parseFloat(price.replace("$", "")),
    img: img.src
  };

  addedItems.push(itemObj);

  // Show in cart visually
  sideBar.innerHTML += `
    <div id="item" class="d-flex align-items-center gap-2 mb-3 justify-content-center">
      <img src="${itemObj.img}" style="width: 100px; height: 100px; object-fit: contain;">
      <div class="text d-flex flex-column">
        <h6>Title: ${itemObj.title}</h6>
        <p>Price: $${itemObj.price}</p>
        <button onclick="removeItem(this)" id="removebtn">Remove</button>
      </div>
    </div>
  `;

  total.push(itemObj.price);

  let finalPrice = total.reduce((acc, next) => acc + next, 0);
  counter++;
  counterText.innerHTML = counter;
  document.querySelector("#totalPrice").textContent = `$${finalPrice.toFixed(2)}`;

  // ✅ Save in localStorage as backup
  localStorage.setItem("items", JSON.stringify(addedItems));
}


function removeItem(e) {
  const item = e.closest("#item");
  const title = item.querySelector("h6").textContent.replace("Title: ", "");
  const priceText = item.querySelector("p").textContent.replace("Price: $", "");
  const price = parseFloat(priceText);

  item.remove();

  // Remove from addedItems
  const index = addedItems.indexOf(title);
  if (index > -1) {
    addedItems.splice(index, 1);
  }

  // Remove price from total array
  const priceIndex = total.indexOf(price);
  if (priceIndex > -1) {
    total.splice(priceIndex, 1);
  }

  // Update counter
  counter--;
  document.querySelector("#cartCounter").innerText = counter;

  // Hide checkout button if cart is empty
  if (addedItems.length <= 0) {
    document.querySelector("#checkoutBtn").style.display = "none";
  }

  // ✅ Recalculate correct final total
  let finalPrice = total.reduce((acc, next) => acc + next, 0);
  document.querySelector("#totalPrice").textContent = `$${finalPrice.toFixed(2)}`;
  console.log("Updated Total:", finalPrice);
}


function displayByCategory(clickedDiv) {
  let selectedCategory = clickedDiv.querySelector(".category").textContent.trim().toLowerCase();

  fetch(allProducts)
    .then(res => res.json())
    .then(data => {
      let allProductCards = document.querySelectorAll(".product-grid .col-md-4");

      data.forEach((product, index) => {
        let card = allProductCards[index];

        if (selectedCategory === "all" || product.category.toLowerCase() === selectedCategory) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
}




