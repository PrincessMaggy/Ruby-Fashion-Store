//  html footer section
function foot(){
    let footerContent= document.querySelector('footer');
    footerContent.innerHTML =`
        <section class="bottom">
                    
        <p><span> Ruby Fashion Store </span>is the world’s leading community for creatives to share, grow, and get hired.</p>
            
        <div id="icons">
            <i class="fas fa-gem"></i>
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-pinterest"></i>
            </div> 
    
            <div class="lists"> 
                <div class="link">
                    <ul>
                    <li><a href="#">For designers</a></li>
                    <li><a href="#"> Go Pro!</a></li>
                    <li><a href="#">Explore design work</a></li>
                    <li><a href="#">Overtime podcast</a></li>
                    <li><a href="#"> Code of conduct</a></li>
                    <li><a href="#">Weekly Warm-Up</a></li>
                    <li><a href="#"> Code of conduct</a></li>
                    </ul>
                    </div>
    
                <div class="link">
                    <ul>
                    <li><a href="#">Company</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Testimonials</a></li>
                    <li><a href="#">FAQs</a></li>
                    <li><a href="#">Terms of service</a></li>
                    <li><a href="#">Privacy policy</a></li>
                    </ul>
                </div>
    
                <div class="link">
                    <ul>
                    <li><a href="#">Directories</a></li>
                    <li><a href="#">Design jobs</a></li>
                    <li><a href="#">Designers for hire</a></li>
                    <li><a href="#">Freelance designers for hire</a></li>
                    <li><a href="#">Tags</a></li>
                    <li><a href="#">Design assets</a></li>
                    <li><a href="#">Shop Creative Market</a></li>
                    </ul>
                </div>
                <div class="link">
                    <ul>
                        <li><a href="#"> Hire designers</a></li>
                        <li><a href="#">Post a freelance project</a></li>
                        <li><a href="#"> Search for designers</a></li>
                        <li><a href="#">Brands</a></li>
                        <li><a href="#">Advertise with us</a></li>
                    </ul>
                    </div>
            
        </div>
    
        </section>
    
    
        <section class="reserved">
        <a class="navbar-brand" href="#">
            <img src="images/logo.png"  alt=""  class="d-inline-block align-text-top"/> 
        </a>
        <p> &copy 2021 Ruby. All rights reserved.</p>
        <p>Designed by Maggy.</p>
        
        </section>`;
    
    }
    foot();
    


    
    
// html  header section
 function head(){
    let headerContent = document.querySelector('header');
    headerContent.innerHTML =` <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
            <!-- <div class="navbar-center"> -->
        <a class="navbar-brand" href="#">
                <img src="images/logo.png"  alt=""  class="d-inline-block align-text-top"/> 
              </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="index.html"> HOME</a>
                </li>
            
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      BRANDS
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">SHOES</a></li>
                    <li><a class="dropdown-item" href="#">BAGS</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"> SUITS
                    </a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">NEW ARRIVALS</a>
                </li>
                
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      MORE
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">LOG IN</a></li>
                    <li><a class="dropdown-item" href="#">SIGN UP</a></li>
                  </ul>
                </li>
    
                <li class="nav-item">
                    <div class="cart-btn">
                        <span class="nav-icon">
                            <a class="nav-link" href="#cart">  <i class="fa fa-cart-plus" aria-hidden="true"></i></a>
                       
                        <div class="cart-items">0</div> </span>
                    </div>
                </li>
                
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search">
                <button  type="submit" id="btn">Search</button>
              </form>
        </div>
    </div>
    </nav>`;
    }
    head();




// html cart section 
 function carts (){
     let CartStructure = document.querySelector('#carts');
     CartStructure.innerHTML= ` <div class="cart-overlay">
     <div class="cart">
         <span class="close-cart"><i class="far fa-window-close"></i></span>
         <h2>Your cart</h2>
         <div class="cart-content"></div>
         <div class="cart-footer">
             <h3>Your total : <span class="cart-total">0</span></h3>
              <a href="checkout.html"><button class="checkout banner-btn">checkout</button></a>
         </div>
     </div>
 </div>`

 }
carts();







    // cart section
(function() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartEl = document.querySelector('.cart');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartContent = document.querySelector('.cart-content');
    const cartItemsCount = document.querySelector('.cart-items');
    const cartTotalPrice = document.querySelector('.cart-total');
    const checkout =document.querySelector('.checkout');
    
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

    function updatCartGlobalData() {
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
            alert("This item has been added to cart.");
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
            checkout.style.display ="none";

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

    
    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);
})();

