
// Incorporating paystack into the checkout form   
function payWithPaystack(event){

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


    const calcTotalCartPrice = () => {
        let totalPrice = 0;
        cart.items.length &&
            cart.items.forEach(
                item => (totalPrice += itemTotalPrice(item.price)(item.qty))
            );
        cart.totalPrice = +parseFloat(totalPrice).toFixed(2);

        return cart.totalPrice;
    };



    function getcartData() {
        return JSON.parse(localStorage.getItem('cartData'));
    }



        
    totalPrice =  formatPrice(calcTotalCartPrice());
    totalPrice = parseInt(totalPrice.replace('$', ''));
    var handler = PaystackPop.setup({
      key: 'pk_test_257fd49306d22fc5272e205eaeac418cbcc4876d',
      email: document.getElementById('e-mail').value,
        amount: totalPrice * 100,
         currency: 'NGN',
        
      callback: function(response){
         alert('success. transaction ref is ' + response.reference);
         localStorage.clear();
        
         handlePageSwitch('checkout.html', 'index.html');
      },
      onClose() {
        alert('Your transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  
  };
  document.getElementById('payStack').addEventListener('click', payWithPaystack);