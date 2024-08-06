// let dataArray = [];

// // Function to fetch data from the API
// function fetchData() {
//     fetch("http://localhost:8080/api/product/get/All/product")
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Network response was not ok.");
//             }
//         })
//         .then((responseData) => {
//             dataArray = responseData.data || [];
//             populateDropdowns();
//         })
//         .catch((error) => {
//             console.error("There has been a problem with your fetch operation:", error);
//         });
// }

// // Call the fetchData function on page load
// fetchData();

// // Function to add a new row in the table
// function addRow() {
//     const table = document.getElementById("bill-table").getElementsByTagName("tbody")[0];
//     const rowCount = table.rows.length;
//     const row = table.insertRow();

//     row.innerHTML = `
//         <td>${rowCount + 1}</td>
//         <td>
//             <select class="form-control" name="productName" onchange="setPrice(this); calculateAmount(this.parentElement.parentElement); validateRows();">
//                 <option value="" data-price="0">Select a product</option>
//             </select>
//             <span class="error productNameError"></span>
//         </td>
//         <td>
//             <input type="number" class="form-control" name="quantity" placeholder="Enter quantity" onchange="calculateAmount(this.parentElement.parentElement); validateRows();">
//             <span class="error quantityError"></span>
//         </td>
//         <td><input type="number" class="form-control" name="price" readonly></td>
//         <td><input type="number" class="form-control" name="totalAmount" readonly></td>
//         <td>
//             <button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>
//         </td>
//     `;
//     populateDropdown(row.querySelector("select"));
//     validateRows(); // Ensure the "Add Row" button state is updated
// }

// // Function to populate the product dropdown with fetched data
// function populateDropdown(selectElement) {
//     selectElement.innerHTML = '<option value="" data-price="0">Select a product</option>';

//     dataArray.forEach((product) => {
//         if (product.productName) {
//             const option = document.createElement("option");
//             option.value = product.productName;
//             option.setAttribute("data-price", product.price);
//             option.textContent = product.productName;
//             selectElement.appendChild(option);
//         }
//     });
// }

// // Function to populate all dropdowns (useful when data is fetched or updated)
// function populateDropdowns() {
//     document.querySelectorAll("select[name='productName']").forEach(populateDropdown);
// }

// // Function to validate all rows and manage "Add Row" button state
// function validateRows() {
//     const rows = document.querySelectorAll('#bill-table tbody tr');
//     let isValid = true;

//     // Check if all rows are valid
//     rows.forEach((row) => {
//         const productSelect = row.querySelector('select[name="productName"]').value;
//         const quantityInput = row.querySelector('input[name="quantity"]').value;
//         const quantityError = row.querySelector('.quantityError');
//         const productNameError = row.querySelector('.productNameError');

//         // Reset errors
//         quantityError.textContent = '';
//         productNameError.textContent = '';

//         // Validate the row
//         if (!productSelect || productSelect === 'Select a product') {
//             // productNameError.textContent = 'Product is required.';
//             isValid = false;
//         }
//         if (!quantityInput || quantityInput <= 0) {
//             // quantityError.textContent = 'Quantity must be greater than zero.';
//             isValid = false;
//         }
//     });

//     // Check if the last row is valid
//     const lastRow = rows[rows.length - 1];
//     if (lastRow) {
//         const productSelect = lastRow.querySelector('select[name="productName"]').value;
//         const quantityInput = lastRow.querySelector('input[name="quantity"]').value;
//         isValid = productSelect && productSelect !== 'Select a product' && quantityInput && quantityInput > 0;
//     }

//     document.getElementById('add').disabled = !isValid;
// }

// // Function to delete a row
// function deleteRow(button) {
//     const row = button.closest("tr");
//     row.parentNode.removeChild(row);
//     updateRowNumbers();
//     calculateTotals();
//     validateRows(); // Revalidate after deletion
// }

// // Function to set the price based on the selected product
// function setPrice(selectElement) {
//     const selectedOption = selectElement.options[selectElement.selectedIndex];
//     const price = selectedOption.getAttribute("data-price") || 0;
//     const row = selectElement.closest("tr");
//     row.querySelector("input[name='price']").value = price;
//     calculateAmount(row);
// }

// // Function to calculate the amount for each row
// function calculateAmount(row) {
//     const quantity = row.querySelector("input[name='quantity']").value;
//     const price = row.querySelector("input[name='price']").value;
//     const totalAmount = quantity * price;
//     row.querySelector("input[name='totalAmount']").value = totalAmount.toFixed(2);
//     calculateTotals();
// }

// // Function to calculate subtotal, GST, discount, and total
// function calculateTotals() {
//     let subtotal = 0;
//     document.querySelectorAll("input[name='totalAmount']").forEach((input) => {
//         subtotal += parseFloat(input.value) || 0;
//     });

//     const gst = subtotal * 0.05;
//     const discount = subtotal * 0.10;
//     const total = subtotal + gst - discount;

//     document.getElementById("subtotal").textContent = subtotal.toFixed(2);
//     document.getElementById("gst").textContent = gst.toFixed(2);
//     document.getElementById("discount").textContent = discount.toFixed(2);
//     document.getElementById("total").textContent = total.toFixed(2);
// }

// // Function to update row numbers after a row is deleted
// function updateRowNumbers() {
//     document.querySelectorAll("#bill-table tbody tr").forEach((row, index) => {
//         row.cells[0].textContent = index + 1;
//     });
// }

// // Add event listeners function
// function addEventListeners() {
//     document.querySelectorAll('input[name="quantity"]').forEach(input => {
//         input.addEventListener('input', function() {
//             calculateAmount(this.parentElement.parentElement);
//             validateRows();
//         });
//     });

//     document.querySelectorAll('select[name="productName"]').forEach(select => {
//         select.addEventListener('change', function() {
//             setPrice(this);
//             calculateAmount(this.parentElement.parentElement);
//             validateRows();
//         });
//     });
// }

// // Document loaded event
// document.addEventListener('DOMContentLoaded', function() {
//     addEventListeners();
//     validateRows(); // Initial validation
// });

// // Form submission handling
// async function handleSubmit(event) {
//     event.preventDefault();
//     let isValid = true;

//     // Clear previous errors
//     document.querySelectorAll('.error').forEach(el => {
//         el.textContent = '';
//     });

//     // Validate form inputs
//     const customerName = document.getElementById('customerName').value;
//     const purchaseDate = document.getElementById('purchase-date').value;
//     const mobileNo = document.getElementById('mobileNo').value;
//     const email = document.getElementById('email').value;
//     const address = document.getElementById('address').value;
//     const gender = document.getElementById('gender').value;

//     if (!customerName) {
//         document.getElementById('customerNameError').textContent = 'Customer name is required.' ;
//         isValid = false;
//     }

//     if (!purchaseDate) {
//         document.getElementById('purchaseDateError').textContent = 'Purchase date is required.';
//         isValid = false;
//     }

//     if (!mobileNo) {
//         document.getElementById('mobileNoError').textContent = 'Mobile number is required.';
//         isValid = false;
//     }

//     if (!email) {
//         document.getElementById('emailError').textContent = 'Email is required.';
//         isValid = false;
//     }

//     if (!address) {
//         document.getElementById('addressError').textContent = 'Address is required.';
//         isValid = false;
//     }

//     if (!gender) {
//         document.getElementById('genderError').textContent = 'Gender is required.';
//         isValid = false;
//     }

//     const productRows = document.querySelectorAll('#bill-table tbody tr');
//     const availabilityChecks = [];
//     const errors = [];

//     productRows.forEach(row => {
//         const productName = row.querySelector('select[name="productName"]').value;
//         const quantity = row.querySelector('input[name="quantity"]').value;
//         const quantityError = row.querySelector('.quantityError');
//         const productNameError = row.querySelector('.productNameError');
        
//         if (!productName || productName === 'Select a product') {
//             productNameError.textContent = 'Product is required.';
//             isValid = false;
//         }
//         if (!quantity || quantity <= 0) {
//             quantityError.textContent = 'Quantity must be greater than zero.';
//             isValid = false;
//         }
        
//         if (productName && quantity > 0) {
//             availabilityChecks.push(
//                 fetch(`http://localhost:8080/api/product/get/product/${productName}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.error) {
//                         isValid = false;
//                         quantityError.textContent = data.error.reason || 'Unable to check product availability.';
//                     } else if (data.stock < quantity) {
//                         isValid = false;
//                         quantityError.textContent = `Only ${data.stock} units available.`;
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     isValid = false;
//                     quantityError.textContent = 'Unable to check product availability.';
//                 })
//             );
//         }
//     });

//     // Wait for all availability checks to complete
//     await Promise.all(availabilityChecks);

//     if (!isValid) return;

//     const customerProduct = [];
//     productRows.forEach(row => {
//         const productName = row.querySelector('select[name="productName"]').value;
//         const quantity = row.querySelector('input[name="quantity"]').value;
//         const price = row.querySelector('input[name="price"]').value;
//         const totalAmount = row.querySelector('input[name="totalAmount"]').value;
//         customerProduct.push({ productName, quantity, price, totalAmount });
//     });

//     // Create the payload
//     const payload = {
//         customerName,
//         email,
//         mobileNo,
//         address,
//         gender,
//         customerProduct
//     };

//     // Send the POST request
//     try {
//         const response = await fetch('http://localhost:8080/api/invoice/buy/product', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(payload)
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.error ? data.error.reason : 'Unknown error occurred');
//         }

//         // Handle successful response
//         alert('Order placed successfully!');
//         window.location.href = "customerlist.html";
//     } catch (error) {
//         console.error('Error:', error);

//         // Display only the relevant error message
//         const formErrorDiv = document.getElementById('formError');
//         formErrorDiv.textContent = `Error: ${error.message}`;
//         formErrorDiv.style.display = 'block';
//     }
// }

// // Add event listener for form submission
// document.getElementById('invoice-form').addEventListener('submit', handleSubmit);
















let dataArray = [];

function fetchData() {
    fetch("http://localhost:8080/api/product/get/All/product")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .then((responseData) => {
            dataArray = responseData.data || [];
            populateDropdowns();
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
        });
}

fetchData();

function addRow() {
    const table = document.getElementById("bill-table").getElementsByTagName("tbody")[0];
    const rowCount = table.rows.length;
    const row = table.insertRow();

    row.innerHTML = `
        <td>${rowCount + 1}</td>
        <td>
            <select class="form-control" name="productName" onchange="setPrice(this); calculateAmount(this.parentElement.parentElement); validateRows();">
                <option value="" data-price="0">Select a product</option>
            </select>
            <span class="error productNameError"></span>
        </td>
        <td>
            <input type="number" class="form-control" name="quantity" placeholder="Enter quantity" onchange="calculateAmount(this.parentElement.parentElement); validateRows();">
            <span class="error quantityError"></span>
        </td>
        <td><input type="number" class="form-control" name="price" readonly></td>
        <td><input type="number" class="form-control" name="totalAmount" readonly></td>
        <td>
            <button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>
        </td>
    `;
    populateDropdown(row.querySelector("select"));
    validateRows();
}

function populateDropdown(selectElement) {
    selectElement.innerHTML = '<option value="" data-price="0">Select a product</option>';

    dataArray.forEach((product) => {
        if (product.productName) {
            const option = document.createElement("option");
            option.value = product.productName;
            option.setAttribute("data-price", product.price);
            option.textContent = product.productName;
            selectElement.appendChild(option);
        }
    });
}

function populateDropdowns() {
    document.querySelectorAll("select[name='productName']").forEach(populateDropdown);
}

function validateRows() {
    const rows = document.querySelectorAll('#bill-table tbody tr');
    let isValid = true;

    rows.forEach((row) => {
        const productSelect = row.querySelector('select[name="productName"]').value;
        const quantityInput = row.querySelector('input[name="quantity"]').value;
        const quantityError = row.querySelector('.quantityError');
        const productNameError = row.querySelector('.productNameError');

        quantityError.textContent = '';
        productNameError.textContent = '';

        if (!productSelect || productSelect === 'Select a product') {
            isValid = false;
        }
        if (!quantityInput || quantityInput <= 0) {
            isValid = false;
        }
    });

    const lastRow = rows[rows.length - 1];
    if (lastRow) {
        const productSelect = lastRow.querySelector('select[name="productName"]').value;
        const quantityInput = lastRow.querySelector('input[name="quantity"]').value;
        isValid = productSelect && productSelect !== 'Select a product' && quantityInput && quantityInput > 0;
    }

    document.getElementById('add').disabled = !isValid;
}

function deleteRow(button) {
    const row = button.closest("tr");
    row.parentNode.removeChild(row);
    updateRowNumbers();
    calculateTotals();
    validateRows(); 
}

function setPrice(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const price = selectedOption.getAttribute("data-price") || 0;
    const row = selectElement.closest("tr");
    row.querySelector("input[name='price']").value = price;
    calculateAmount(row);
}

function calculateAmount(row) {
    const quantity = row.querySelector("input[name='quantity']").value;
    const price = row.querySelector("input[name='price']").value;
    const totalAmount = quantity * price;
    row.querySelector("input[name='totalAmount']").value = totalAmount.toFixed(2);
    calculateTotals();
}

function calculateTotals() {
    let subtotal = 0;
    document.querySelectorAll("input[name='totalAmount']").forEach((input) => {
        subtotal += parseFloat(input.value) || 0;
    });

    const gst = subtotal * 0.05;
    const discount = subtotal * 0.10;
    const total = subtotal + gst - discount;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("gst").textContent = gst.toFixed(2);
    document.getElementById("discount").textContent = discount.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

function updateRowNumbers() {
    document.querySelectorAll("#bill-table tbody tr").forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

function addEventListeners() {
    document.querySelectorAll('input[name="quantity"]').forEach(input => {
        input.addEventListener('input', function() {
            calculateAmount(this.parentElement.parentElement);
            validateRows();
        });
    });

    document.querySelectorAll('select[name="productName"]').forEach(select => {
        select.addEventListener('change', function() {
            setPrice(this);
            calculateAmount(this.parentElement.parentElement);
            validateRows();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addEventListeners();
    validateRows(); 
});

async function handleSubmit(event) {
    event.preventDefault();
    let isValid = true;

    document.querySelectorAll('.error').forEach(el => {
        el.textContent = '';
    });

    const customerName = document.getElementById('customerName').value;
    const purchaseDate = document.getElementById('purchase-date').value;
    const mobileNo = document.getElementById('mobileNo').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;

    if (!customerName || !/^[a-zA-Z\s]+$/.test(customerName)) {
        document.getElementById('customerNameError').textContent = 'Customer name is required.';
        isValid = false;
    }

    // if (!purchaseDate) {
    //     document.getElementById('purchaseDateError').textContent = 'Purchase date is required.';
    //     isValid = false;
    // }

    if (!mobileNo || !/^\d+$/.test(mobileNo)) {
        document.getElementById('mobileNoError').textContent = 'Mobile number is required.';
        isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Email is required invalid email format.l';
        isValid = false;
    }

    if (!address || address.length < 1 || address.length > 10) {
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

    const payload = {
        customerName,
        email,
        mobileNo,
        address,
        gender,
        customerProduct
    };

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
            throw new Error(data.error ? data.error.errorList: 'Unknown error occurred');
        }

        alert('Order placed successfully!');
        window.location.href = "customerlist.html";
    } catch (error) {
        console.error('Error:', error);

        const formErrorDiv = document.getElementById('formError');
        formErrorDiv.textContent = `Error: ${error.message}`;
        formErrorDiv.style.display = 'block';
        
        if (error.message.includes('name is invalid')) {
            document.getElementById('customerNameError').textContent = 'Name length should be between 3 and 10 character';
        }
        if (error.message.includes('User phone number is invalid')) {
            document.getElementById('mobileNoError').textContent = ' Please enter a valid phone number.(10 numbers)';
        }
        if (error.message.includes('User email is invalid')) {
            document.getElementById('emailError').textContent = ' Please enter a valid email';
        }
    }
}

document.getElementById('invoice-form').addEventListener('submit', handleSubmit);
