let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("Total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let submit =document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let serachMood = "title";
let mood = "create";
let tmp; 


// Get Total :
function getTotal(){
    if(price.value !=""){
        let result =(+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.color = "#7FBF9A";
     } else {
        total.innerHTML = "";
        total.style.color = "";
}
};

// Creat Product:
let dataPro;
if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else{
 dataPro = [];
}

submit.onclick=function(){
    let newPro ={
     title: title.value.toLowerCase() ,  
     price: price.value,
     Taxes: taxes.value,
     ADS: ads.value,
    discount:discount.value,
    count:count.value,
    category:category.value.toLowerCase(),
    Total:total.innerHTML
    };


     if(mood === "create"){
         if(newPro.count > 1){
for(let i =0; i< newPro.count; i++){
    dataPro.push(newPro)
}
} else{
    dataPro.push(newPro);
}
     }else{
        dataPro[tmp] =newPro;
        mood ="create";
        submit.innerHTML ="Create";
        count.style.display ="block";
     }
    
    //Save LocalStorig 
    localStorage.setItem("product" ,JSON.stringify(dataPro));
     clraeData()
     showData()
};

// Clear
function clraeData(){
    title.value ="";
    price.value ="";
    taxes.value ="";
    ads.value ="";
    discount.value ="";
    total.innerHTML ="";
    count.value ="";
    category.value ="";

}

// Read:
function showData(){
    getTotal()
    let table ="";
    for(let i =0 ; i<dataPro.length;i++){
   table += `
  <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].descount}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].Total}</td>
                <td>${dataPro[i].category}</td>
                <td>
                    <button onclick="updateData(${i})" id="update">Update</button>
                </td>
                <td>
                    <button onclick="deleteData(${i})" id="delete">Delete</button>
                </td>
            </tr> 
            `;
    }



    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document. getElementById("deleteAll") ;

    if(dataPro.length>0){
     btnDelete.innerHTML="Delete All";
    
    }else{
    btnDelete.innerHTML ="";
    }

}

// Delete:
function deleteData(i){
   dataPro.splice(i,1)

   localStorage.setItem("product",JSON.stringify(dataPro));
    showData();
}
function deleteAll(){
  localStorage.clear()  
  dataPro.splice(0);
  showData();
}
// Update:
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display ="none";
    category.value = dataPro[i].category;
    submit.innerHTML ="Updata";
    mood ="Updata"
    tmp=i;
    scroll({
        top:0,
        behavior :"smooth"
    })

}
// Search:

function getSearchMood(id){

    let search = document.getElementById("search");

    if(id === "searchTitle"){
        serachMood = "title";
        search.setAttribute("placeholder", "Search By Title");
    }

    if(id === "searchCategory"){
        serachMood = "category";
        search.setAttribute("placeholder", "Search By Category");
    }

    search.focus();
    search.value ="";
    showData()
}

function searchData(value){

    let table = "";

    if(serachMood == "title"){

        for(let i = 0; i < dataPro.length; i++){

            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){

                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].Total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                            <button onclick="updateData(${i})">Update</button>
                        </td>
                        <td>
                            <button onclick="deleteData(${i})">Delete</button>
                        </td>
                    </tr>
                `;
            }
        }

    } else {

        for(let i = 0; i < dataPro.length; i++){

            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){

                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].Total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                            <button onclick="updateData(${i})">Update</button>
                        </td>
                        <td>
                            <button onclick="deleteData(${i})">Delete</button>
                        </td>
                    </tr>
                `;
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}
















showData();
























