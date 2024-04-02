
var user = []
displayuser()
var products = []
getProducts()
var orders = []
console.log("orders", orders, length);
totalorders()
var coupo = []
displayCoupon()
// ADMIN-INFO--------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var adminInfo = localStorage.getItem("admin-Info");

  if (adminInfo) {
    var adminData = JSON.parse(adminInfo);

    var adminNameElement = document.getElementById("adminName");
    if (adminNameElement) {
      adminNameElement.textContent = adminData.fullName.toUpperCase();
      adminNameElement.style.fontWeight = "bold";
    }
  }
});

// LOG-OUT------------------------------------------------------------------------------------------
function logout() {
  localStorage.clear();
  window.location.reload()
}
// COUPON-COUNT-------------------------------------------------------------------------------------
function displayCoupon() {
  fetch("http://localhost:5001/admin/getALLcoupon")

    .then(response => response.json())
    .then(data => {

      coupo = data.coupons;
      console.log(coupo);
      displaycouponCount()
    })
    .catch(error => {
      console.error("the error is:", error);
    });
}
function displaycouponCount() {
  console.log("Coupon count:", coupo.length);
  document.querySelector('.total-coupons').textContent = coupo.length;
}
//  USERS-COUNT -------------------------------------------------------------------------------------
function displayuser() {
  fetch("http://localhost:5001/user/listusers")
    .then(response => response.json())
    .then(data => {
      user = data.data
      console.log("deiiiii", data.data);
      displayUserCount()
    })
    .catch(error => {
      console.error("the error is:", error);
    });
}
function displayUserCount() {
  console.log("User count:", user.length);
  document.querySelector('.total-users').textContent = user.length;
}
// PRODUCTS-COUNT-------------------------------------------------------------------------------------
function getProducts() {
  fetch('http://localhost:5001/product/productsAll')
    .then(response => response.json())
    .then(data => {
      products = data.data;
      console.log("products", data.data);
      getProductCount();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function getProductCount() {
  const productCount = products.length;
  console.log("Number of products:", productCount);
  document.querySelector('.total-products').textContent = products.length;
}
// ORDERS-COUNT-------------------------------------------------------------------------------------
function totalorders() {
  fetch("http://localhost:5001/user/show-orders")
    .then(response => response.json())
    .then(data => {
      orders = data;
      console.log(orders);
      updateTotalOrders();
    })
    .catch(error => {
      console.error("the error is:", error);
    });
}
// COUNT & progress-bar (DYNAMIC BAR)----------------------------------------------------------------
function updateTotalOrders() {
  const totalOrdersElement = document.querySelector('.total-orders');
  const progressBar = document.querySelector('.progress-bar');

  if (totalOrdersElement && progressBar) {
    const totalOrdersCount = orders.length;
    totalOrdersElement.textContent = totalOrdersCount;

    const progressBarWidth = (totalOrdersCount / 30) * 100;
    progressBar.style.width = progressBarWidth + '%';
    progressBar.setAttribute('aria-valuenow', progressBarWidth);
  }
}
