
  


document.addEventListener("DOMContentLoaded", () => {

    let cart = JSON.parse(sessionStorage.getItem("cart")) || {};

    const container = document.getElementById("checkout-items");
    const totalSpan = document.getElementById("checkout-total");

    let total = 0;

    for (let item in cart) {

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${cart[item].img}">

            <div class="cart-info">
                <h4>${item}</h4>
                <p>Price: ${cart[item].price} EGP</p>
                <p>Qty: ${cart[item].qty}</p>
            </div>
        `;

        container.appendChild(div);

        total += cart[item].price * cart[item].qty;
    }

    totalSpan.textContent = total;
});

function submitOrder(e) {
    e.preventDefault();

    alert("✅ Order Confirmed!");

    sessionStorage.removeItem("cart");

    window.location.href = "project.html";
}

div.innerHTML = `
    <img src="${cart[item].img}">

    <div class="cart-info">
        <h4>${item}</h4>
        <p>${cart[item].price} EGP</p>
    </div>

    <div class="item-right">
        <p>Qty: ${cart[item].qty}</p>
        <p>${cart[item].price * cart[item].qty} EGP</p>
    </div>
`;