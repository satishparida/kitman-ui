function addItem(itemId) {
    var mixedButton = document.getElementById('item_add_button_mixed_'+itemId);
    var addButton = document.getElementById('item_add_button_'+itemId);
    var mixedButtonItemCount = document.getElementById('item_count_'+itemId); 

    mixedButtonItemCount.innerHTML = 1;
    addButton.classList.add("hide");
    mixedButton.classList.remove("hide");
    controlHeaderCartCount('add');
    centralCartController('add', itemId)
}

function addItemPlus(itemId) {
    var mixedButtonItemCount = document.getElementById('item_count_'+itemId);
    var itemCount = parseInt(mixedButtonItemCount.innerHTML);
    itemCount = itemCount + 1;
    mixedButtonItemCount.innerHTML = itemCount;
    controlHeaderCartCount('add');
    centralCartController('add', itemId)
}

function removeItemMinus(itemId) {
    var mixedButtonItemCount = document.getElementById('item_count_'+itemId);
    var itemCount = parseInt(mixedButtonItemCount.innerHTML);
    if (itemCount > 1 ) {
        itemCount = itemCount - 1;
        mixedButtonItemCount.innerHTML = itemCount;
    }
    else {
        var mixedButton = document.getElementById('item_add_button_mixed_'+itemId);
        var addButton = document.getElementById('item_add_button_'+itemId);
        mixedButton.classList.add("hide");
        addButton.classList.remove("hide");
        mixedButtonItemCount.innerHTML = '';
    }
    
    controlHeaderCartCount('remove');
    centralCartController('remove', itemId)
}

function controlHeaderCartCount(methode){
    var headerCartCountSpan = document.getElementById('lblCartCount');
    var headerCartCount = parseInt(headerCartCountSpan.innerHTML);
    var centralCartCountSpan = document.getElementById('cart-item-count');

    var emptyCart = document.getElementById('empty-cart');
    var nonEmptyCart = document.getElementById('non-empty-cart');   
    

    if (methode == 'add') {
        if (headerCartCount == 0){
            headerCartCountSpan.innerHTML = 1;
            headerCartCountSpan.classList.remove("hide");
            emptyCart.classList.add("hide");
            nonEmptyCart.classList.remove("hide");
        }
        else {
            headerCartCount = headerCartCount+1;
            headerCartCountSpan.innerHTML = headerCartCount;
        }
    }

    else if (methode == 'remove') {
        if (headerCartCount == 1){
            headerCartCountSpan.innerHTML = 0;
            headerCartCountSpan.classList.add("hide");
            emptyCart.classList.remove("hide");
            nonEmptyCart.classList.add("hide");
        }
        else {
            headerCartCount = headerCartCount-1;
            headerCartCountSpan.innerHTML = headerCartCount;
        }
    }

    centralCartCountSpan.innerHTML = headerCartCountSpan.innerHTML
}

function centralCartController(methode, itemId){

    if (methode == 'add') {
        if (document.getElementById("cartItem_"+itemId) == null) {

            if (document.getElementById('item_cat_'+itemId).innerHTML == 'Veg' ) {
                div_cat =  '<div class="cart-item-isveg"></div>';
            }
            else {
                div_cat =  '<div class="cart-item-isnonveg"></div>';
            }

            var div_name = document.getElementById('item_name_'+itemId).innerHTML;
            var div_cost = document.getElementById('item_cost_'+itemId).innerHTML;

            var cartItems = document.getElementById("cart-items")

            item_div =  '<div class="cart-item" id="cartItem_' + itemId + '">' +
                            '<div class="cart-item-detail" id="cartItemDetail_' + itemId + '">' +
                            div_cat +
                                '<div class="cart-item-name">'+div_name+'</div>' +
                            '</div>' +
                            '<div class="cart-item-quantity">'+
                                '<i class="fa fa-times"></i>' +
                                '<span id="cartItemQuantity_' + itemId + '">1</span>' +
                            '</div>' +
                            '<div class="cart-item-price">' +
                                '<span>₹</span>' +
                                '<span id="cartItemPrice_' + itemId + '">'+div_cost+'</span>' +
                            '</div>'+
                        '</div>';
            cartItems.insertAdjacentHTML('beforeend', item_div);
        }
        else {
            var div_quantity = parseInt(document.getElementById('cartItemQuantity_'+itemId).innerHTML);
            div_quantity = div_quantity +1;
            document.getElementById('cartItemQuantity_'+itemId).innerHTML = div_quantity;
            var price = parseFloat(document.getElementById('item_cost_'+itemId).innerHTML);
            var div_cost = div_quantity * price;
            document.getElementById('cartItemPrice_'+itemId).innerHTML = div_cost;
        }

    }

    else if (methode == 'remove') {
        var div_quantity = parseInt(document.getElementById('cartItemQuantity_'+itemId).innerHTML);
        if (div_quantity > 1) {
            div_quantity = div_quantity -1;
            document.getElementById('cartItemQuantity_'+itemId).innerHTML = div_quantity;
            var price = parseFloat(document.getElementById('item_cost_'+itemId).innerHTML);
            var div_cost = div_quantity * price;
            document.getElementById('cartItemPrice_'+itemId).innerHTML = div_cost;
        }
        else {
            document.getElementById('cartItem_'+itemId).remove();
        }
        
    }

    var allCartItems = document.getElementsByClassName('cart-item');
    var subtotal =0;
    for (i=0; i<allCartItems.length; i++) {
        var item = parseFloat(allCartItems[i].getElementsByClassName('cart-item-price')[0].getElementsByTagName('span')[1].innerText);
        subtotal = subtotal + item;
    }
    document.getElementById('cartSubtotal').innerHTML = "₹ "+subtotal;
}

function cartCheckout() {
    var allCartItems = document.getElementsByClassName('cart-item');

    items =[]
    var totalQuantity = 0;

    // payload.push( {"noofrows": allCartItems.length});
    
    for (i=0; i<allCartItems.length; i++) {
        var item = allCartItems[i];
        var itemId = item.id.split('_')[1].trim();
        var itemName = item.getElementsByClassName('cart-item-detail')[0].getElementsByTagName('div')[1].innerText;
        var vegiterian = item.getElementsByClassName('cart-item-detail')[0].getElementsByTagName('div')[0].className.split('-')[2] == 'isveg';
        var quantity = parseInt(item.getElementsByClassName('cart-item-quantity')[0].getElementsByTagName('span')[0].innerText);
        totalQuantity = totalQuantity + quantity;

        item = {"itemId": itemId, 
                "itemName": itemName, 
                "vegiterian": vegiterian, 
                "quantity": quantity}

        items.push(item);
    }
    var totalCost = parseFloat(document.getElementById('cartSubtotal').innerText.split(' ')[1]);

    payload = { "noofrows": allCartItems.length,
                items,
                "totalQuantity": totalQuantity,
                "totalCost": totalCost,
                "orderPlacedAt": toISOStringLocal(new Date())
            }

    payloadJSON = JSON.stringify(payload)
    console.log(payloadJSON);
}

function toISOStringLocal(d) {
    function z(n){return (n<10?'0':'') + n}
    return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
           z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
           z(d.getMinutes()) + ':' + z(d.getSeconds())
            
  }