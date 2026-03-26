
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("click", () => {
        items.forEach(el => el.classList.remove("active"));
        item.classList.add("active");
    });
});


document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(sessionStorage.getItem("cart")) || {};

    const container = document.getElementById("cart-items");
    const countSpan = document.getElementById("count");
    const totalPrice = document.getElementById("total-price");

    const allAddButtons = document.querySelectorAll('button[data-name]');

    // 🟢 أزرار الإضافة
    allAddButtons.forEach(button => {

        const name = button.dataset.name;

        // لو المنتج موجود قبل كده
        if (cart[name]) {
            button.innerHTML = '<i class="fa-solid fa-check"></i> Added';
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
        }

        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);
            const img = button.dataset.img;

            if (cart[name]) {
                cart[name].qty++;
            } else {
                cart[name] = {
                    price: price,
                    img: img,
                    qty: 1
                };

                button.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                button.style.backgroundColor = "#4CAF50";
                button.style.color = "white";
            }

            renderCart();
        });
    });

    // 🟢 عرض السلة
    function renderCart() {
        if (!container) return;

        container.innerHTML = "";

        let total = 0;
        let totalCount = 0;

        for (let item in cart) {
            total += cart[item].price * cart[item].qty;
            totalCount += cart[item].qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="${cart[item].img}" class="cart-img">

                <div class="cart-info">
                    <h4>${item}</h4>
                    <p>${cart[item].price} EGP</p>
                    <span class="remove" onclick="removeItem('${item}')">Remove</span>
                </div>

                <div class="qty-box">
                    <button class="qty-o1" onclick="decrease('${item}')">-</button>
                    <span>${cart[item].qty}</span>
                    <button class="qty-o1" onclick="increase('${item}')">+</button>
                </div>
            `;

            container.appendChild(div);
        }

        if (countSpan) countSpan.textContent = totalCount;
        if (totalPrice) totalPrice.textContent = total;

        // 🟢 حفظ في sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    // 🟢 زيادة
    window.increase = function (item) {
        cart[item].qty++;
        renderCart();
    };

    // 🟢 تقليل
    window.decrease = function (item) {
        if (cart[item].qty > 1) {
            cart[item].qty--;
        } else {
            delete cart[item];
        }
        renderCart();
    };

    // 🟢 حذف
    window.removeItem = function (item) {
        delete cart[item];

        allAddButtons.forEach(btn => {
            if (btn.dataset.name === item) {
                btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to your cart';
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }
        });

        renderCart();
    };

    // 🟢 أول تحميل
    renderCart();
});
document.getElementById("checkout-btn").addEventListener("click", () => {
    window.location.href = "checkout.html";
});