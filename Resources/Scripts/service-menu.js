function addItem(itemId) {
    var mixedButton = document.getElementById('item_add_button_mixed_'+itemId);
    var addButton = document.getElementById('item_add_button_'+itemId);
    var mixedButtonItemCount = document.getElementById('item_count_'+itemId); 

    mixedButtonItemCount.innerHTML = 1;
    addButton.classList.add("hide");
    mixedButton.classList.remove("hide");
    controlHeaderCartCount('add');
}

function addItemPlus(itemId) {
    var mixedButtonItemCount = document.getElementById('item_count_'+itemId);
    var itemCount = parseInt(mixedButtonItemCount.innerHTML);
    itemCount = itemCount + 1;
    mixedButtonItemCount.innerHTML = itemCount;
    controlHeaderCartCount('add');
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
        if (headerCartCount == 0){
            emptyCart.classList.add("hide");
            centralCartCountSpan.innerHTML = headerCartCountSpan.innerHTML;
            if (document.getElementById('item_cat_'+itemId).innerHTML == 'Veg' ) {
                div_cat =  '<div class="cart-item-isveg"></div>';
            }
            else {
                div_cat =  '<div class="cart-item-isnonveg"></div>';
            }
            cartItems.innerHTML =+ '<div class="cart-item" id="cartItem_' + itemId + '">' +
                                        '<div class="cart-item-detail" id="cartItemDetail_' + itemId + '">' +
                                        div_cat +
                                            '<div class="cart-item-name">French Fries</div>' +
                                        '</div>' +
                                        '<div class="cart-item-quantity">'+
                                            '<i class="fa fa-times"></i>' +
                                            '<span>1</span>' +
                                        '</div>' +
                                        '<div class="cart-item-price">' +
                                            '<span>₹</span>' +
                                            '<span>100</span>' +
                                        '</div>'+
                                    '</div>';


            nonEmptyCart.classList.remove("hide");
        }
    }
}