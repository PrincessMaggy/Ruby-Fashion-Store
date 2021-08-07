(function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartEl = document.querySelector('.cart');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartContent = document.querySelector('.cart-content');
    const cartItemsCount = document.querySelector('.cart-items');
    const cartTotalPrice = document.querySelector('.cart-total');
    const clearCartBtn = document.querySelector('.clear-cart');
    const avaialableProducts = [];
    const cartData = getcartData();
    let cart = cartData || { items: [], totalPrice: 0 };

    const formatPrice = (price, currency = '$') => {
        let formattedPrice = price;

        switch (currency) {
            case '$':
                formattedPrice = `${currency}${price}`;
                break;
        }

        return formattedPrice;
    };

    const itemTotalPrice = price => qty => +parseFloat(price * qty).toFixed(2);

    const showCart = () => {
        cartOverlay.classList.add('transparentBcg');
        cartEl.classList.add('showCart');
    };

    const hideCart = () => {
        cartOverlay.classList.remove('transparentBcg');
        cartEl.classList.remove('showCart');
    };

    const createNode = (type, classes, content) => {
        const elem = document.createElement(type);
        elem.classList.add(classes);
        elem.innerHTML = content;

        return elem;
    };

    const createCartItemContent = item => formatter => {
        return `<img src="${item.image_url}" alt="${item.title}" />
            <div>
                <h4>${item.title}</h4>
                <h5>${formatter(item.price)}</h5>
                <span class="remove-item" data-id="${item.id}">remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                <p class="item-amount" data-id="${item.id}">${item.qty}</p>
                <i class="fas fa-chevron-down" data-id="${item.id}"></i>
            </div>`;
    };

    const itemExists = itemId =>
        cart.items.findIndex(item => item.id && item.id === itemId);

    const updateCartItemQty = item => {
        document.querySelectorAll('.item-amount').forEach(amount => {
            if (+amount.dataset.id === item.id) {
                amount.textContent = item.qty;
            }
        });
    };

    const calcTotalCartPrice = () => {
        let totalPrice = 0;
        cart.items.length &&
            cart.items.forEach(
                item => (totalPrice += itemTotalPrice(item.price)(item.qty))
            );
        cart.totalPrice = +parseFloat(totalPrice).toFixed(2);

        return cart.totalPrice;
    };

    const renderCartItemLayout = product => formatter => {
        const itemContent = createCartItemContent(product)(formatter);
        const itemNode = createNode('div', 'cart-item', itemContent);

        cartContent.appendChild(itemNode);
        clearCartBtn.removeAttribute('disabled');

        // attach event to remove button
        itemNode
            .querySelector('.remove-item')
            .addEventListener('click', removeItemFromCart);
        // attach event to add item's qty button
        itemNode
            .querySelector('.fa-chevron-up')
            .addEventListener('click', addItemQty);
        // attach event to remove item's qty button
        itemNode
            .querySelector('.fa-chevron-down')
            .addEventListener('click', removeItemQty);
    };

    const renderCartItemsLayout = () => {
        cartContent.innerHTML = '';

        cart.items &&
            cart.items.forEach(product => {
                renderCartItemLayout(product)(formatPrice);
            });
    };

    const updatCartGlobalData = () => {
        // update cart items icon
        cartItemsCount.textContent = cart.items.length;
        // re-calculcate total cart price
        cartTotalPrice.textContent = formatPrice(calcTotalCartPrice());
        // update local storage
        setcartData(cart);
    };

    const addItemTocart = itemId => {
        const product = avaialableProducts.filter(
            prod => prod.id === itemId
        )[0];
        const currentItemIndex = itemExists(itemId);

        if (currentItemIndex > -1) {
            const updatedCart = [...cart.items];
            updatedCart[currentItemIndex] = {
                ...updatedCart[currentItemIndex],
                qty: updatedCart[currentItemIndex].qty + 1,
            };

            cart.items = updatedCart;
            // update individual item in cart's quantity
            updateCartItemQty(updatedCart[currentItemIndex]);
        } else {
            cart.items.push(product);
            renderCartItemLayout(product)(formatPrice);
        }

        updatCartGlobalData();
    };

    const removeItemFromCart = function(event) {
        const itemId = +this.dataset.id;

        removeItem(itemId);
    };

    const removeItem = itemId => {
        const updatedCart = [...cart.items];

        cart.items = updatedCart.filter(item => item.id !== itemId);

        if (cart.items.length === 0) {
            clearCartBtn.setAttribute('disabled', true);
        }

        renderCartItemsLayout();
        updatCartGlobalData();
    };

    const addItemQty = function(event) {
        const itemId = +this.dataset.id;

        addItemTocart(itemId);
    };

    const removeItemQty = function(event) {
        const itemId = +this.dataset.id;
        const currentItemIndex = itemExists(itemId);
        const updatedCart = [...cart.items];

        updatedCart[currentItemIndex] = {
            ...updatedCart[currentItemIndex],
            qty: updatedCart[currentItemIndex].qty - 1,
        };

        cart.items = updatedCart;

        // update individual item in cart's quantity
        updateCartItemQty(updatedCart[currentItemIndex]);

        // remove item from cart if no qty remains
        if (updatedCart[currentItemIndex].qty <= 0) {
            removeItem(itemId);
        } else {
            updatCartGlobalData();
        }
    };

    const clearCart = () => {
        cart = { items: [], totalPrice: 0 };

        renderCartItemsLayout();
        updatCartGlobalData();
    };

    const loadProductsFromJson = async () => {
        try {
            const result = await fetch('products.json');
            const products = await result.json();

            return products;
        } catch (err) {
            console.log(err);
        }
    };

    const productGridLayout = product => formatter => {
        return `<article class="product">
            <div class="img-container">
                <img
                    src="${product.image_url}"
                    alt="${product.title}"
                    class="product-img"
                />
                <button class="bag-btn" data-id="${product.id}">
                    <i
                        class="fa fa-shopping-cart"
                        aria-hidden="true"
                    ></i>
                    add to cart
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>${formatter(product.price)}</h4>
        </article>`;
    };

    const addToCartBtnHandler = () => {
        document.querySelectorAll('.bag-btn').forEach(btn =>
            btn.addEventListener('click', function(event) {
                const ItemId = +btn.dataset.id;
                addItemTocart(ItemId);
            })
        );
    };

    const createProductsGrids = loadProductsfunc => async formatter => {
        const productsContainer = document.getElementById('products-container');
        const products = await loadProductsfunc();
        let _html = '';

        products.items.forEach(product => {
            avaialableProducts.push({ ...product, qty: 1 });
            _html += productGridLayout(product)(formatter);
        });

        productsContainer.innerHTML = _html;

        // attach button to click event
        addToCartBtnHandler();
    };

    function getcartData() {
        return JSON.parse(localStorage.getItem('cartData'));
    }

    const setcartData = data => {
        localStorage.setItem('cartData', JSON.stringify(data));
    };

    // Display products from json file
    createProductsGrids(loadProductsFromJson)(formatPrice);
    // init cart items if exists
    renderCartItemsLayout();
    updatCartGlobalData();

    clearCartBtn.addEventListener('click', function() {
        this.setAttribute('disabled', true);
        clearCart();

        setTimeout(() => {
            hideCart();
        }, 500);
    });
    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);
})();