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
    var headerCartCount = parseInt(headerCartCountSpan.innerHTML)

    if (methode == 'add') {
        if (headerCartCount == 0){
            headerCartCountSpan.innerHTML = 1;
            headerCartCountSpan.classList.remove("hide");
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
        }
        else {
            headerCartCount = headerCartCount-1;
            headerCartCountSpan.innerHTML = headerCartCount;
        }
    }
}