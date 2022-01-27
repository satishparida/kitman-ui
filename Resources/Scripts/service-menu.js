function loadManu(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://c03892e5-e747-4d76-b694-eb77a9dfeb2c.mock.pstmn.io/v1/menu");
    request.send();
    request.onload = () => {
        if(request.status == 200){
            menuJSON = JSON.parse(request.responseText);

            for (i=0; i< menuJSON.length; i++) {

                id = menuJSON[i].itemId;

                if (menuJSON[i].veg) {
                    veg_item_div = '<div class="item-catagory-veg" id="item_cat_' + id + '">Veg</div>';
                }
                else {
                    veg_item_div = '<div class="item-catagory-nonveg" id="item_cat_' + id + '">Non-Veg</div>';
                }

                item_generic_cat_div = '<div class="item-catagory-generic">' + menuJSON[i].type + '</div>';

                description = 'Food can be very transformational, and it can be more than just about a dish.'+ 
                                'Thats what happened to me when I first went to France.'+ 
                                'I fell in love. And if you fall in love, well, then everything is easy.';

                item_div =  '<div class="menu" id="menu_id_' + id + '">' +
                                '<div class="item" id="item_id_' + id + '">' +
                                    '<div class="item-image" id="item_img_id_' + id + '">' +
                                        '<img src="Resources/Images/menu-place-holder.png"/>' +
                                    '</div>' +
                                    '<div class="item-detail">' +
                                        '<h4 class="item-name" id="item_name_' + id + '">' + menuJSON[i].itemName + '</h4>' +
                                        '<div class="item-catagory">' + 
                                            veg_item_div +
                                            item_generic_cat_div +
                                        '</div>' +

                                        '<div class="item-price">' +
                                            '<span>₹</span>' +
                                            '<span id="item_cost_' + id + '">' + menuJSON[i].price + '</span>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="item-action">' +
                                        '<div class="item-add-button " id="item_add_button_' + id + '" onclick="addItem(' + id + ')">' +
                                            '<div class="item-add-button-text-div">' +
                                                'Add' +
                                            '</div>' +
                                        '</div>' +

                                        '<div class="item-add-button-mixed hide" id="item_add_button_mixed_' + id + '">' +
                                            '<div class="item-add-button-mixed-inner">' +
                                                '<div class="item-button-symbol" onclick="removeItemMinus(' + id + ')">' +
                                                    '<i class="fa fa-minus"></i>' +
                                                '</div>' +
                                                '<div class="item-label-item-count">' +
                                                    '<span id="item_count_' + id + '"></span>' +
                                                '</div>' +
                                                '<div class="item-button-symbol" onclick="addItemPlus(' + id + ')">' +
                                                    '<i class="fa fa-plus"></i>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="menu-paragraph">' + description +  '</div>	' +
                            '</div>';
                var menuItems = document.getElementById("menu-items-div");
                menuItems.insertAdjacentHTML('beforeend', item_div);
            }
        }
        else {
            console.log(request.statusText)
        }
    }
}

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

            var cartItems = document.getElementById("cart-items");

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

    
    document.getElementById('orderTime').innerHTML = toISOStringLocal(new Date());
    var successOrder = document.getElementById("successOrder");
    successOrder.style.display = "block";

}

function hideModal() {
    successOrder.style.display = "none";
    window.location.reload();
}

function toISOStringLocal(d) {
    function z(n){return (n<10?'0':'') + n}
    return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
           z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
           z(d.getMinutes()) + ':' + z(d.getSeconds())
            
}

document.addEventListener('DOMContentLoaded', function() {
    var cart = document.getElementById("cart");
    var cartOffSet = cart.offsetTop;
    window.onscroll = function() {
        if (window.pageYOffset > cartOffSet) {
            cart.classList.add("sticky");
        } 
        else {
            cart.classList.remove("sticky");
        }
    };

    var successOrder = document.getElementById("successOrder");
    window.onclick = function(event) {
        if (event.target == successOrder) {
            hideModal();
        }
    }
})