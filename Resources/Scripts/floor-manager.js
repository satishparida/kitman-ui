function confirmOrder(orderid){
    var declineButton = document.getElementById('declineOrderId_'+orderid);
    var confirmButton = document.getElementById('acceptOrderId_'+orderid);
    var orderActionDiv = document.getElementById('orderActionDiv_'+orderid);
    var orderStatusSpan = document.getElementById('orderStatus_'+orderid);

    orderActionDiv.removeChild(declineButton)
    orderActionDiv.removeChild(confirmButton)
    orderStatusSpan.innerHTML = 'Preparing';

    setTimeout(function() {
        orderActionDiv.innerHTML = '<button id="preparedOrderId_' + orderid + '" onclick="preparedOrder(' + orderid + ')">Prepared</button>';  
    }, 200);
}

function preparedOrder(orderid){
    var preparedButton = document.getElementById('preparedOrderId_'+orderid);
    var orderActionDiv = document.getElementById('orderActionDiv_'+orderid);
    var orderStatusSpan = document.getElementById('orderStatus_'+orderid);

    orderActionDiv.removeChild(preparedButton)
    orderStatusSpan.innerHTML = 'Ready for Pickup'; 

    setTimeout(function() {
        orderActionDiv.innerHTML = '<button id="closeOrderId_' + orderid + '" onclick="closeOrder(' + orderid + ')">Close</button>'; 
    }, 200);
}

function closeOrder(orderid){
    var orderCard = document.getElementById('orderCard_'+orderid);
    orderCard.classList.add("hide");
}
