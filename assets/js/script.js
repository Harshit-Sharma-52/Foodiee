'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});



/**
 * food menu filter
 */

const filterBtns = document.querySelectorAll(".filter-btn");
const foodMenuItems = document.querySelectorAll("[data-category]");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const category = this.textContent.toLowerCase();

    foodMenuItems.forEach((item) => {
      if (category === "all") {
        item.style.display = "";
      } else {
        item.style.display = item.dataset.category === category ? "" : "none";
      }
    });
  });
});



/**
 * scroll to section
 */

const scrollBtns = document.querySelectorAll("[data-scroll-to]");

scrollBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetId = this.dataset.scrollTo;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});



/**
 * modal
 */

const modalTriggers = document.querySelectorAll("[data-modal-open]");
const modalCloseBtns = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal-overlay");

function openModal(modalId) {
  modals.forEach((m) => m.classList.remove("active"));
  const modal = document.querySelector(`[data-modal="${modalId}"]`);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeAllModals() {
  modals.forEach((m) => m.classList.remove("active"));
  document.body.style.overflow = "";
}

modalTriggers.forEach((btn) => {
  btn.addEventListener("click", function () {
    openModal(this.dataset.modalOpen);
  });
});

modalCloseBtns.forEach((btn) => {
  btn.addEventListener("click", closeAllModals);
});

modals.forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === this) closeAllModals();
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeAllModals();
});

// food menu "Order Now" buttons open home delivery modal
document.querySelectorAll(".food-menu-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    openModal("home-delivery");
  });
});



/**
 * delivery cart
 */

const cart = {};

function updateCartSummary() {
  const items = Object.values(cart).filter((i) => i.qty > 0);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  document.querySelector("[data-delivery-total-items]").textContent =
    totalItems + " item" + (totalItems !== 1 ? "s" : "");

  const summaryContainer = document.querySelector("[data-delivery-summary-items]");
  summaryContainer.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.style.cssText =
      "display:flex;justify-content:space-between;font-size:14px;padding:4px 0;color:var(--onyx);";
    div.innerHTML =
      "<span>" +
      item.name +
      " x" +
      item.qty +
      '</span><span>₹' +
      item.qty * item.price +
      "</span>";
    summaryContainer.appendChild(div);
  });

  document.querySelector("[data-delivery-total-price]").textContent = "₹" + totalPrice;
}

document.querySelectorAll(".delivery-item").forEach((item) => {
  const name = item.querySelector(".delivery-item-name").textContent;
  const priceText = item.querySelector(".delivery-item-price").textContent;
  const price = parseInt(priceText.replace("₹", ""));
  const qtyEl = item.querySelector("[data-qty-value]");

  cart[name] = { name, price, qty: 0 };

  item.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.dataset.qty === "inc") {
        cart[name].qty++;
      } else if (this.dataset.qty === "dec" && cart[name].qty > 0) {
        cart[name].qty--;
      }
      qtyEl.textContent = cart[name].qty;
      updateCartSummary();
    });
  });
});

updateCartSummary();



/**
 * delivery filter
 */

document.querySelectorAll("[data-delivery-filter]").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("[data-delivery-filter]")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    const filter = this.dataset.deliveryFilter;
    document.querySelectorAll(".delivery-item").forEach((item) => {
      if (filter === "all") {
        item.classList.remove("hidden");
      } else {
        item.classList.toggle(
          "hidden",
          item.dataset.deliveryCategory !== filter
        );
      }
    });
  });
});



/**
 * fetch location
 */

let fetchedLocationLink = "";

document.getElementById("fetch-location").addEventListener("click", function () {
  const btn = this;
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }
  btn.disabled = true;
  btn.textContent = "Fetching...";
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      fetchedLocationLink = `https://www.google.com/maps?q=${lat},${lng}`;
      document.getElementById("delivery-address").value = fetchedLocationLink;
      btn.disabled = false;
      btn.textContent = "✅ Location Fetched";
    },
    function () {
      alert("Could not fetch location. Please allow location access and try again.");
      btn.disabled = false;
      btn.textContent = "📍 Fetch My Location";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
});

/**
 * place order
 */

document.querySelector("[data-place-order]").addEventListener("click", function () {
  const name = document.getElementById("delivery-name").value.trim();
  const phone = document.getElementById("delivery-phone").value.trim();
  const address = document.getElementById("delivery-address").value.trim();

  if (!name || !phone) {
    alert("Please fill in your name and phone number.");
    return;
  }
  if (!fetchedLocationLink) {
    alert("Please fetch your location first.");
    return;
  }

  const items = Object.values(cart).filter((i) => i.qty > 0);
  if (items.length === 0) {
    alert("Please select at least one item to order.");
    return;
  }

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  let msg = "🍽️ *New Home Delivery Order*%0A";
  msg += "─────────────────────%0A%0A";
  items.forEach((i) => {
    msg += `• ${i.name} × ${i.qty} = ₹${i.qty * i.price}%0A`;
  });
  msg += `%0A─────────────────────%0A`;
  msg += `*Total: ₹${total}*%0A%0A`;
  msg += `👤 *Name:* ${name}%0A`;
  msg += `📞 *Phone:* ${phone}%0A`;
  msg += `📍 *Location:* ${fetchedLocationLink}`;
  window.open(`https://wa.me/919760971378?text=${msg}`, "_blank");
  closeAllModals();
  Object.keys(cart).forEach((key) => { cart[key].qty = 0; });
  document.querySelectorAll("[data-qty-value]").forEach((el) => { el.textContent = "0"; });
  document.getElementById("delivery-name").value = "";
  document.getElementById("delivery-phone").value = "";
  document.getElementById("delivery-address").value = "";
  fetchedLocationLink = "";
  document.getElementById("fetch-location").textContent = "📍 Fetch My Location";
  document.getElementById("fetch-location").disabled = false;
  updateCartSummary();
});



/**
 * book a table
 */

document.querySelector(".modal-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const fd = new FormData(this);
  const name = fd.get("name");
  const email = fd.get("email");
  const phone = fd.get("phone");
  const date = fd.get("date");
  const time = fd.get("time");
  const persons = fd.get("persons");
  const message = fd.get("message") || "N/A";

  let msg = "📋 *New Table Booking*%0A";
  msg += "─────────────────────%0A%0A";
  msg += `👤 *Name:* ${name}%0A`;
  msg += `📧 *Email:* ${email}%0A`;
  msg += `📞 *Phone:* ${phone}%0A`;
  msg += `📅 *Date:* ${date}%0A`;
  msg += `⏰ *Time:* ${time}%0A`;
  msg += `👥 *Persons:* ${persons}%0A`;
  msg += `💬 *Requests:* ${message}%0A%0A`;
  msg += `─────────────────────%0A`;
  msg += `✅ Please confirm my booking!`;

  window.open(`https://wa.me/919760971378?text=${msg}`, "_blank");
  closeAllModals();
  this.reset();
});