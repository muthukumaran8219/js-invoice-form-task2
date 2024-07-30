// Products array
var products = [
    { name: "Select a product", price: 0, quantity: 0 },
    { name: "Headphones", price: 19, quantity: 40 },
    { name: "Laptop", price: 799, quantity: 40 },
    { name: "Wireless Mouse", price: 24, quantity: 40 },
    { name: "Smartwatch", price: 129, quantity: 40 },
    { name: "Gaming Keyboard", price: 49, quantity: 40 }
];

// Add row function
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
    productSelect.onchange = function() { 
        setPrice(this); 
        validateRows(); 
    };

    products.forEach(function(product) {
        var option = document.createElement("option");
        option.value = product.name;
        option.setAttribute("data-price", product.price);
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    productCell.appendChild(productSelect);
    quantityCell.innerHTML = '<input type="number" class="form-control" name="quantity" placeholder="Enter quantity" onchange="calculateAmount(this.parentElement.parentElement); validateRows();">';
    priceCell.innerHTML = '<input type="number" class="form-control" name="price" readonly>';
    amountCell.innerHTML = '<input type="number" class="form-control" name="totalAmount" readonly>';
    actionCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>';

    validateRows(); // Validate all rows immediately after adding
}

// Validate all rows and manage "Add Row" button state
function validateRows() {
    var rows = document.querySelectorAll('#bill-table tbody tr');
    var isValid = true;
    var lastRow = rows[rows.length - 1];

    if (lastRow) {
        var productSelect = lastRow.querySelector('select[name="productName"]').value;
        var quantityInput = lastRow.querySelector('input[name="quantity"]').value;
        isValid = productSelect && productSelect !== 'Select a product' && quantityInput && quantityInput > 0;
    }

    document.getElementById('add').disabled = !isValid;
}

// Delete row function
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateRowNumbers();
    calculateTotal();
    validateRows(); // Revalidate after deletion
}

// Set price function
function setPrice(selectElement) {
    var price = selectElement.options[selectElement.selectedIndex].getAttribute('data-price');
    var row = selectElement.parentElement.parentElement;
    row.querySelector('input[name="price"]').value = price;
    calculateAmount(row);
}

// Calculate amount function
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

// Calculate total function
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

// Add event listeners function
function addEventListeners() {
    var quantityInputs = document.querySelectorAll('input[name="quantity"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
            validateRows();
        });
    });
}

// Document loaded event
document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
    validateRows(); // Initial validation
});

// Update row numbers function
function updateRowNumbers() {
    var table = document.getElementById("bill-table").getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].textContent = i + 1;
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => {
        el.textContent = '';
    });

    // Validate form inputs
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
    const availabilityChecks = [];
    const errors = [];

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
        
        if (productName && quantity > 0) {
            availabilityChecks.push(
                fetch(`http://localhost:8080/api/product/get/product/${productName}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        isValid = false;
                        quantityError.textContent = data.error.reason || 'Unable to check product availability.';
                    } else if (data.stock < quantity) {
                        isValid = false;
                        quantityError.textContent = `Only ${data.stock} units available.`;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    isValid = false;
                    quantityError.textContent = 'Unable to check product availability.';
                })
            );
        }
    });

    // Wait for all availability checks to complete
    await Promise.all(availabilityChecks);

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

    // Send the POST request
    try {
        const response = await fetch('http://localhost:8080/api/invoice/buy/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error ? data.error.reason : 'Unknown error occurred');
        }

        // Handle successful response
        alert('Order placed successfully!');
        window.location.href = "customerlist.html";
    } catch (error) {
        console.error('Error:', error);

        // Display only the relevant error message
        const formErrorDiv = document.getElementById('formError');
        formErrorDiv.textContent = `Error: ${error.message}`;
        formErrorDiv.style.display = 'block';
    }
}







