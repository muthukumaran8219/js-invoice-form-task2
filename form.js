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
    var rowCount = table.rows.length;
    var row = table.insertRow();
    var slCell = row.insertCell();
    var productCell = row.insertCell();
    var quantityCell = row.insertCell();
    var priceCell = row.insertCell();
    var amountCell = row.insertCell();
    var actionCell = row.insertCell();

    slCell.textContent = rowCount + 1;

    var productSelect = document.createElement("select");
    productSelect.className = "form-control";
    productSelect.name = "productName";
    productSelect.onchange = function() { setPrice(this); };

    products.forEach(function(product) {
        var option = document.createElement("option");
        option.value = product.name;
        option.setAttribute("data-price", product.price);
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    productCell.appendChild(productSelect);
    quantityCell.innerHTML = '<input type="number" class="form-control" name="quantity" placeholder="Enter quantity" onchange="calculateAmount(this.parentElement.parentElement)">';
    priceCell.innerHTML = '<input type="number" class="form-control" name="price" readonly>';
    amountCell.innerHTML = '<input type="number" class="form-control" name="totalAmount" readonly>';
    actionCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateRowNumbers();
    calculateTotal();
}

function setPrice(selectElement) {
    var price = selectElement.options[selectElement.selectedIndex].getAttribute('data-price');
    var row = selectElement.parentElement.parentElement;
    row.querySelector('input[name="price"]').value = price;
    calculateAmount(row);
}

function calculateAmount(row) {
    var quantity = row.querySelector('input[name="quantity"]').value;
    var price = row.querySelector('input[name="price"]').value;
    var totalAmount = row.querySelector('input[name="totalAmount"]');
    if (quantity && price) {
        totalAmount.value = quantity * price;
    } else {
        totalAmount.value = 0;
    }
    calculateTotal();
}

function calculateTotal() {
    var rows = document.querySelectorAll('#bill-table tbody tr');
    var subtotal = 0;
    rows.forEach(row => {
        var amount = row.querySelector('input[name="totalAmount"]').value;
        subtotal += parseFloat(amount) || 0;
    });
    var gst = subtotal * 0.05;
    var discount = subtotal * 0.10;
    var total = subtotal + gst - discount;
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('gst').textContent = gst.toFixed(2);
    document.getElementById('discount').textContent = discount.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function addEventListeners() {
    var quantityInputs = document.querySelectorAll('input[name="quantity"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
});

function updateRowNumbers() {
    var table = document.getElementById("bill-table").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].textContent = i + 1;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    var isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(function(el) {
        el.textContent = '';
    });

    // Validation checks
    const customerName = document.getElementById('customerName').value;
    const purchaseDate = document.getElementById('purchase-date').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;

    if (!customerName) {
        document.getElementById('customerNameError').textContent = 'Customer name is required.';
        isValid = false;
    }

    if (!purchaseDate) {
        document.getElementById('purchaseDateError').textContent = 'Purchase date is required.';
        isValid = false;
    }

    if (!mobileNo) {
        document.getElementById('mobileNoError').textContent = 'Mobile number is required.';
        isValid = false;
    }

    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        isValid = false;
    }

    if (!address) {
        document.getElementById('addressError').textContent = 'Address is required.';
        isValid = false;
    }

    if (!gender) {
        document.getElementById('genderError').textContent = 'Gender is required.';
        isValid = false;
    }

    const productRows = document.querySelectorAll('#bill-table tbody tr');
    productRows.forEach(row => {
        const productName = row.querySelector('select[name="productName"]').value;
        const quantity = row.querySelector('input[name="quantity"]').value;
        const quantityError = row.querySelector('.quantityError');
        const productNameError = row.querySelector('.productNameError');
        if (!productName || productName === 'Select a product') {
            productNameError.textContent = 'Product is required.';
            isValid = false;
        }
        if (!quantity || quantity <= 0) {
            quantityError.textContent = 'Quantity must be greater than zero.';
            isValid = false;
        }
    });

    if (!isValid) return;

    const customerProduct = [];
    productRows.forEach(row => {
        const productName = row.querySelector('select[name="productName"]').value;
        const quantity = row.querySelector('input[name="quantity"]').value;
        const price = row.querySelector('input[name="price"]').value;
        const totalAmount = row.querySelector('input[name="totalAmount"]').value;
        customerProduct.push({ productName, quantity, price, totalAmount });
    });

    // Create the payload

    const payload = {
        
        customerName,
        email,
        mobileNo,
        address,
        gender,
        customerProduct
    };
    console.log(payload);

    // Send the POST request
    fetch('http://localhost:8080/api/invoice/buy/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(`API Error: ${data.error.code} - ${data.error.reason}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Handle successful response, e.g., display a success message
        alert('Order placed successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error, e.g., display an error message
        if (error.message.includes('409 CONFLICT')) {
            alert('Conflict occurred. Please check your data for duplicates or inconsistencies.');
        } else if (error.message.includes('400 BAD_REQUEST')) {
            alert('Invalid data. Please check your inputs.');
        } else {
            alert('An error occurred. Please try again later.');
        }
    });
}