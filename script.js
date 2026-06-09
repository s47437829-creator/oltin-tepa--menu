

  let cart = [];

// PHONE INPUT: allow only digits and limit to 9 characters
document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;
  phoneInput.addEventListener('input', () => {
    // remove non-digits and limit to 9 characters
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 9);
  });
});

// MENU
function showMenu() {
  document.getElementById("home").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function goHome() {
  document.getElementById("home").style.display = "block";
  document.getElementById("menu").style.display = "none";
}

// CART OPEN / CLOSE
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("overlay").style.display = "block";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("overlay").style.display = "none";
}

// CLICK FOOD (use addItem(name, price) oncards)
function addItem(name, price) {
  let item = cart.find(i => i.name === name);

  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });

  renderCart();
  openCart();
}

// RENDER CART
function renderCart() {
  let box = document.getElementById("cartItems");
  box.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    let sum = item.price * item.qty;
    total += sum;

    box.innerHTML += `
      <div style="margin-bottom:10px;">
        <b>${item.name}</b><br>
        ${item.price} × ${item.qty} = ${sum} so'm<br>

        <button onclick="changeQty(${i},-1)">-</button>
        <button onclick="changeQty(${i},1)">+</button>
        <button onclick="removeItem(${i})">X</button>
      </div>
    `;
  });

  box.innerHTML += `<hr><b>Итого: ${total} so'm</b>`;
}

// QTY
function changeQty(i, val) {
  cart[i].qty += val;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  renderCart();
}

// REMOVE
function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

// SEND TO TELEGRAM
function sendOrder() {

  const phoneEl = document.getElementById("phone");
  const phone = phoneEl ? phoneEl.value.trim() : "";

  if (cart.length === 0) {
    alert("Пусто!");
    return;
  }

  // phone must be exactly 9 digits
  if (!/^\d{9}$/.test(phone)) {
    alert("В телефоне должно быть ровно 9 цифр.");
    return;
  }

  let text = "🛒 НОВЫЙ ЗАКАЗ\n\n";
  let total = 0;

  cart.forEach(item => {
    let sum = item.price * item.qty;
    total += sum;
    text += `${item.name} x${item.qty} = ${sum}\n`;
  });

  text += `\n💰 ИТОГО: ${total}`;
  text += `\n📱 TEL: ${phone}`;

  let token = "YOUR_BOT_TOKEN";
  let chat_id = "YOUR_CHAT_ID";

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text })
  });

  alert("Отправлено!");

  cart = [];
  renderCart();
  closeCart();
}
