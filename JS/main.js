var productContainer = [];
var index;
var nameValidation = false;
var priceValidation = false;
var categoryValidation = false;
var descValidation = false;

if (localStorage.getItem('ourProduct') != null) {
    productContainer = JSON.parse(localStorage.getItem('ourProduct'));
    displayProducts();
}

var inputProductName = document.getElementById("productName");
var inputProductPrice = document.getElementById("productPrice");
var inputProductCategory = document.getElementById("productCategory");
var inputProductDesc = document.getElementById("productDesc");

function addProduct() {
    if (buttonEnable()) {
        var productName = inputProductName.value;
        var productPrice = inputProductPrice.value;
        var productCategory = inputProductCategory.value;
        var productDesc = inputProductDesc.value;

        newProduct = {
            name: productName,
            price: productPrice,
            cat: productCategory,
            desc: productDesc
        }
        productContainer.push(newProduct);
        clearForm();
        displayProducts();
        localStorage.setItem('ourProduct', JSON.stringify(productContainer));
    }

    buttonDisable()
}

function clearForm() {
    inputProductName.value = "";
    inputProductPrice.value = "";
    inputProductCategory.value = "";
    inputProductDesc.value = "";

}

function displayProducts() {
    cartoona = ``;

    for (i = 0; i < productContainer.length; i++) {
        cartoona += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].cat}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick='update(${i})' class="my-3 btn btn-outline-warning">Update</button></td>
        <td><button onclick='deleteProduct(${i})' class="my-3 btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    displayProducts();
    localStorage.setItem('ourProduct', JSON.stringify(productContainer));
}

function productSearch(query) {
    cartoona = ``;
    for (i = 0; i < productContainer.length; i++) {
        if ((productContainer[i].name.toLowerCase()).includes(query.toLowerCase()) == true) {
            cartoona += `<tr>
            <td>${i + 1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].cat}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick='update(${i})' class="my-3 btn btn-outline-warning">Update</button></td>
            <td><button onclick='deleteProduct(${i})' class="my-3 btn btn-outline-danger">Delete</button></td>
            </tr>`;
        }
        document.getElementById("tableBody").innerHTML = cartoona;
    }
}

function update(updateIndex) {
    index = updateIndex;
    inputProductName.value = productContainer[updateIndex].name;
    inputProductPrice.value = productContainer[updateIndex].price;
    inputProductCategory.value = productContainer[updateIndex].cat;
    inputProductDesc.value = productContainer[updateIndex].desc;
    document.getElementById('mainButton').innerHTML = "Update Product";
    productNameValidation();
    productPriceValidation();
    productCategoryValidation();
    productDescValidation();
}
function updateProduct() {
    var productName = inputProductName.value;
    var productPrice = inputProductPrice.value;
    var productCategory = inputProductCategory.value;
    var productDesc = inputProductDesc.value;

    updatedProduct = {
        name: productName,
        price: productPrice,
        cat: productCategory,
        desc: productDesc
    }
    productContainer.splice(index, 1, updatedProduct);
    clearForm();
    displayProducts();
    localStorage.setItem('ourProduct', JSON.stringify(productContainer));
    document.getElementById('mainButton').innerHTML = "Add Product";
    buttonDisable();
}


function buttonBehav() {
    if (document.getElementById('mainButton').innerHTML == "Add Product") {
        addProduct();
    }
    else {
        updateProduct();
    }
}

function productNameValidation() {
    var regex = /^[A-Z][a-z]{3,6}$/;
    if (regex.test(inputProductName.value)) {
        document.getElementById('productNameAlert').innerHTML = ``;
        nameValidation = true;
        buttonEnable();
    }
    else {
        document.getElementById('productNameAlert').innerHTML = `<div class="alert alert-danger" role="alert">
        Prtoduct name should start with uppercase letter and length should be 4-7 letters
    </div>`;
        nameValidation = false;
    }
}
function productPriceValidation() {
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if (regex.test(inputProductPrice.value)) {
        document.getElementById('productPriceAlert').innerHTML = ``;
        priceValidation = true;
        buttonEnable();
    }
    else {
        document.getElementById('productPriceAlert').innerHTML = `<div class="alert alert-danger" role="alert">
        Price should be in range 1000-10000
    </div>`;
        priceValidation = false;
    }
}

function productCategoryValidation() {
    var regex = /^(mobile|tv|laptop)$/;
    if (regex.test(inputProductCategory.value.toLowerCase())) {
        document.getElementById('productCategoryAlert').innerHTML = ``;
        categoryValidation = true;
        buttonEnable();
    }
    else {
        document.getElementById('productCategoryAlert').innerHTML = `<div class="alert alert-danger" role="alert">
        (mobile - tv - laptop)
    </div>`;
        categoryValidation = false
    }
}
function productDescValidation (){
    var regex = /([a-z]{2,15}\s){30}[a-z]{2,15}/gm;
    if(regex.test(inputProductDesc.value.toLowerCase())){
        document.getElementById('productDescAlert').innerHTML=``;
        descValidation = true;
        buttonEnable();
    }
    else{
        document.getElementById('productDescAlert').innerHTML = `<div class="alert alert-danger" role="alert">
        Product Description should consists of 30 word
    </div>`;
    descValidation = false;
    }
}

function buttonEnable() {
    if (nameValidation && priceValidation && categoryValidation && descValidation) {
        document.getElementById('mainButton').disabled = false;
        return true;
    }
    else {
        return false;
    }
}

function buttonDisable()
{
    document.getElementById('mainButton').disabled = true;
}