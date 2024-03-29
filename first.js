
var productname = document.getElementById("productname");
var productprice = document.getElementById("productprice");
var productcategory = document.getElementById("productcategory");
var productdescription = document.getElementById("productdescription");
var addbtn = document.getElementById("mybtn");
var currentindex = 0;

addbtn.addEventListener("click", function () {
  if (addbtn.innerHTML == "add") {
    addproduct();
  }
  else {
    saveupdate();
  }
})

//check if is data in local storage or not

var productcontainer;
if (localStorage.getItem("mydata") == null) {
  productcontainer = [];

}
else {
  productcontainer = JSON.parse(localStorage.getItem("mydata"));
  display();

}


//add new product
function addproduct() {
  var products = {
    name: productname.value,
    price: productprice.value,
    category: productcategory.value,
    description: productdescription.value
  }
  productcontainer.push(products);
  display();

  localStorage.setItem("mydata", JSON.stringify(productcontainer));
  clearform();

}


//display data
function display() {
  var content = "";
  for (var i = 0; i < productcontainer.length; i++) {
    content += ` <tr>
          <td>`+ productcontainer[i].name + `</td>
          <td>`+ productcontainer[i].price + `</td>
          <td>`+ productcontainer[i].category + `</td>
          <td>`+ productcontainer[i].description + `</td>
          <td><button onclick="deleteproduct(`+ i + `)" class="btn btn-danger" >delete</button></td>
          <td><button onclick="updateproduct(`+ i + `)" class="btn btn-success" >update</button></td>

        </tr>`
  }
  document.getElementById("mybody").innerHTML = content;
}


// clear form
function clearform() {
  productname.value = "";
  productprice.value = "";
  productcategory.value = "";
  productdescription.value = "";
}



//search in products
function searchproduct(term) {
  var cartonaa = "";
  var cartonaa2 = "";

  for (var i = 0; i < productcontainer.length; i++) {

    if (productcontainer[i].name.includes(term) == true) {
      cartonaa += ` <tr>
      <td>`+ productcontainer[i].name + `</td>
      <td>`+ productcontainer[i].price + `</td>
      <td>`+ productcontainer[i].category + `</td>
      <td>`+ productcontainer[i].description + `</td>
      <td><button onclick="deleteproduct(`+ i + `)" class="btn btn-danger" >delete</button></td>
      <td><button onclick="updateproduct(`+ i + `)" class="btn btn-success" >update</button></td>
    </tr>`

      cartonaa2 += productcontainer[i].name.replace(term, `<span style="color:red">` + term + `</span>`);

    }
    document.getElementById("view").innerHTML = cartonaa2;
    document.getElementById("mybody").innerHTML = cartonaa;

  }

}


// delete product
function deleteproduct(index) {

  productcontainer.splice(index, 1);
  localStorage.setItem("mydata", JSON.stringify(productcontainer));
  display();

}


//update product
function updateproduct(index) {
  currentindex = index;
  productname.value = productcontainer[index].name;
  productprice.value = productcontainer[index].price;
  productcategory.value = productcontainer[index].category;
  productdescription.value = productcontainer[index].description;

  addbtn.innerHTML = "update"


}
function saveupdate() {

  var products = {
    name: productname.value,
    price: productprice.value,
    category: productcategory.value,
    description: productdescription.value
  }
  productcontainer[currentindex] = products;
  display();
  localStorage.setItem("mydata", JSON.stringify(productcontainer));
  clearform();
  addbtn.innerHTML = "add"


}


// validation using regular expression
var nameregrexp = /[a-zA-Z]/;
var priceregex = /[0-9]/;
function testregex(inputname, regexname) {
  if (regexname.test(inputname.value) == false) {
    inputname.classList.remove("is-valid");
    inputname.classList.add("is-invalid");
  }
  else {
    inputname.classList.remove("is-invalid");
    inputname.classList.add("is-valid");
  }
}

productname.addEventListener("keyup", function () {
  testregex(productname, nameregrexp)
});
productcategory.addEventListener("keyup", function () {
  testregex(productcategory, nameregrexp)
});

productprice.addEventListener("keyup", function () {
  testregex(productprice, priceregex)
});


