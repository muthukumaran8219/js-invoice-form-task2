var products = [
    { name: "Select a product", price: 0, quantity: 0 },
    { name: "Headphones", price: 19, quantity: 40 },
    { name: "Laptop", price: 799, quantity: 40 },
    { name: "Wireless Mouse", price: 24, quantity: 40 },
    { name: "Smartwatch", price: 129, quantity: 40 },
    { name: "Gaming Keyboard", price: 49, quantity: 40 }
];

function addRow() {
    var table = document.getElementById("bill-table").getElementsByTagName('tbody')[0];
    var row = table.insertRow();

    var productCell = row.insertCell();
    var quantityCell = row.insertCell();
    var priceCell = row.insertCell();
    var amountCell = row.insertCell();
    var actionCell = row.insertCell();

    var productSelect = document.createElement("select");
    productSelect.className = "form-control";
    productSelect.name = "product[]";
    productSelect.onchange = function() { setPrice(this); };

    products.forEach(function(product) {
        var option = document.createElement("option");
        option.value = product.name;
        option.setAttribute("data-price", product.price);
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    productCell.appendChild(productSelect);
    quantityCell.innerHTML = '<input type="number" class="form-control" name="quantity[]" placeholder="Enter quantity" required>';
    priceCell.innerHTML = '<input type="number" class="form-control" name="price[]" readonly>';
    amountCell.innerHTML = '<input type="number" class="form-control" name="amount[]" readonly>';
    actionCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>';

    addEventListeners();
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    calculateTotal();
}

function setPrice(selectElement) {
    var price = selectElement.options[selectElement.selectedIndex].getAttribute('data-price');
    var row = selectElement.parentElement.parentElement;
    row.querySelector('input[name="price[]"]').value = price;
    calculateAmount(row);
}

function calculateAmount(row) {
    var quantity = row.querySelector('input[name="quantity[]"]').value;
    var price = row.querySelector('input[name="price[]"]').value;
    var amount = row.querySelector('input[name="amount[]"]');
    if (quantity && price) {
        amount.value = quantity * price;
    } else {
        amount.value = 0;
    }
    calculateTotal();
}

function calculateTotal() {
    var rows = document.querySelectorAll('#bill-table tbody tr');
    var subtotal = 0;
    rows.forEach(row => {
        var amount = row.querySelector('input[name="amount[]"]').value;
        subtotal += parseFloat(amount) || 0;
    });
    var gst = subtotal * 0.05;
    var discount = subtotal * 0.10;
    var total = subtotal + gst - discount;
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('gst').textContent = gst.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
    console.log(total)
}

function addEventListeners() {
    var quantityInputs = document.querySelectorAll('input[name="quantity[]"]');
    var priceInputs = document.querySelectorAll('input[name="price[]"]');

    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
        });
    });

    priceInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
        });
    });
}

function handleSubmit(event) {
    event.preventDefault();
    var formData = {
        id: Date.now().toString(),
        customerName: document.getElementById('customer-name').value,
        purchaseDate: document.getElementById('purchase-date').value,
        phoneNumber: document.getElementById('phone-number').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        gender: document.getElementById('gender').value,
        items: []
    };

    var rows = document.querySelectorAll('#bill-table tbody tr');
    rows.forEach(row => {
        var item = {
            product: row.querySelector('select[name="product[]"]').value,
            quantity: row.querySelector('input[name="quantity[]"]').value,
            price: row.querySelector('input[name="price[]"]').value,
            amount: row.querySelector('input[name="amount[]"]').value
        };
        formData.items.push(item);
    });

    var formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
    formDataArray.push(formData);
    localStorage.setItem('formDataArray', JSON.stringify(formDataArray));

    window.location.href = 'table.html';
}