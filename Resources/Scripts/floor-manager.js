function confirmOrder(orderid){
    var declineButton = document.getElementById('declineOrderId_'+orderid);
    var confirmButton = document.getElementById('acceptOrderId_'+orderid);
    var preparedButton = document.getElementById('preparedOrderId_'+orderid);
    var orderStatusSpan = document.getElementById('orderStatus_'+orderid);

    orderStatusSpan.innerHTML = 'Preparing';
    declineButton.classList.add("hide"); 
    confirmButton.classList.add("hide");
    preparedButton.classList.remove("hide");

}

function preparedOrder(orderid){
    var preparedButton = document.getElementById('preparedOrderId_'+orderid);
    var closeButton = document.getElementById('closeOrderId_'+orderid);
    var orderStatusSpan = document.getElementById('orderStatus_'+orderid);

    orderStatusSpan.innerHTML = 'Ready for Pickup'; 
    preparedButton.classList.add("hide");
    closeButton.classList.remove("hide");
}

function closeOrder(orderid){
    var orderCard = document.getElementById('orderCard_'+orderid);
    orderCard.classList.add("hide");
}

function declineOrder(orderid){
    var orderCard = document.getElementById('orderCard_'+orderid);
    orderCard.classList.add("hide");
}
