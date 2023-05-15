// we can use this pagination in react js project also...
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");
let itemsPerPage = 3;
let currentPage = 1;

let apiUrl = "https://dummyjson.com/products";
let productData = [];

// API IMPLEMENTATION
async function getProductData() {
  const data = await fetch(apiUrl);
  const res = await data.json();
  productData = res.products;
}

// PRINT MOVIES DATA HERE
async function appendProducts() {
  await getProductData();
  console.log(productData);

  const pages = [];
  for (let i = 0; i <= Math.ceil(productData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstPage, indexOfLastPage);

  document.getElementById("movie").innerHTML = currentItems
    .map(
      (products) =>
        `
    <div class="card">
    <div class="card-title">
    <div class="card-body">
    <img src="${products.images[0]}"></br>
    <h6>Title: ${products.title}</h6>
    <p>Category: ${products.category}</p>
    <h6>Brand: ${products.brand}</h6>
    <h6 class="descp">Description: ${products.description.slice(0, 38)}</h6>
    <p class="rating">${products.rating} <span class="fa-solid fa-star"></span></p>
    <p class="price" id="discount">Price: $${products.price} <del class="del-price">${products.price + 100}</del> ${products.discountPercentage}% OFF</p>
    </div>
    </div>
    </div>
    
    `
    )
    .join("");
}

appendProducts();

function prev() {
  if (currentPage > 1) {
    currentPage--;
    nextBtn.disabled = false;
  }
  if (currentPage <= 1) {
    prevBtn.disabled = true;
  }

  appendProducts();
}

function next() {
  if (currentPage < 10) {
    currentPage++;
    prevBtn.disabled = false;
  }
  if (currentPage >= 10) {
    nextBtn.disabled = true;
  }

  appendProducts();
}

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
