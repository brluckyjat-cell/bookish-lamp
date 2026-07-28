
// ===================================
// DEMO CAFE ADMIN PANEL
// PART 5C - FIREBASE ORDER SYSTEM
// ===================================



// Firebase Configuration
// Yaha apne Firebase project ki details dalni hai

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

databaseURL: "YOUR_DATABASE_URL",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

};




// Initialize Firebase

firebase.initializeApp(firebaseConfig);



const db = firebase.database();





const ordersContainer =
document.getElementById("ordersContainer");



let allOrders=[];







// ===============================
// LIVE ORDERS LISTENER
// ===============================


function loadOrders(){


db.ref("orders").on("value", snapshot=>{


allOrders=[];


snapshot.forEach(child=>{


allOrders.push({

key:child.key,

...child.val()

});


});



showOrders();



updateStats();



});



}








// ===============================
// SHOW ORDERS
// ===============================


function showOrders(){


ordersContainer.innerHTML="";



if(allOrders.length===0){


ordersContainer.innerHTML=

`

<div class="empty-box">

No Orders Found

</div>

`;


return;

}







allOrders.reverse().forEach(order=>{


ordersContainer.innerHTML +=


`

<div class="order-card">


<h3>
Order #${order.id || order.key}
</h3>



<p>
👤 Customer:
${order.customer || "Guest"}
</p>



<p>
🪑 Table:
${order.table || "1"}
</p>



<p>
🍽 Items:
${order.items || "No items"}
</p>



<p>
💰 Total:
₹${order.total || 0}
</p>



<p>
Status:
<b>
${order.status || "Pending"}
</b>
</p>





<div class="status-buttons">


<button 
class="pending"

onclick="changeStatus('${order.key}','Pending')">

Pending

</button>



<button 
class="preparing"

onclick="changeStatus('${order.key}','Preparing')">

Preparing

</button>




<button 
class="ready"

onclick="changeStatus('${order.key}','Ready')">

Ready

</button>




<button 
class="completed"

onclick="changeStatus('${order.key}','Completed')">

Completed

</button>



</div>



</div>


`;



});


}









// ===============================
// UPDATE STATUS
// ===============================


function changeStatus(id,status){



db.ref("orders/"+id+"/status")
.set(status);



}








// ===============================
// DASHBOARD STATS
// ===============================


function updateStats(){



let total =
allOrders.length;



let pending =
allOrders.filter(
x=>x.status==="Pending" || !x.status
).length;




let sale =
allOrders.reduce(
(sum,x)=>sum + Number(x.total || 0),
0
);





document.getElementById("totalOrders")
.innerHTML=total;



document.getElementById("pendingOrders")
.innerHTML=pending;



document.getElementById("todaySale")
.innerHTML="₹"+sale;



}







// ===============================
// REFRESH BUTTON
// ===============================


function refreshOrders(){

loadOrders();

}





// START

loadOrders();
