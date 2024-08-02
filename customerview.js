document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const customerEmail = urlParams.get('email');

    if (customerEmail) {
        fetch(`http://localhost:8080/api/invoice/getCustomer/${customerEmail}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data); 

                const customerData = data.data.Data.customer;
                const invoiceData = data.data.Data;

                document.getElementById('customerName').textContent = customerData.customerName;
                document.getElementById('date').textContent = customerData.date;
                document.getElementById('mobileNo').textContent = customerData.mobileNo;
                document.getElementById('email').textContent = customerData.email;
                document.getElementById('address').textContent = customerData.address;
                document.getElementById('gender').textContent = customerData.gender;

                const itemsList = document.getElementById('items-list');
                itemsList.innerHTML = '';
                if (Array.isArray(customerData.customerProducts) && customerData.customerProducts.length > 0) {
                    customerData.customerProducts.forEach(item => {
                        const itemElement = document.createElement('p');
                        itemElement.textContent = `${item.productName} - $${item.price} (Qty: ${item.quantity})`;
                        itemsList.appendChild(itemElement);
                    });
                } else {
                    itemsList.textContent = 'No items available';
                }

                document.getElementById('subtotal').textContent = invoiceData.totalprouctsAmount.toFixed(2);
                document.getElementById('gst').textContent = invoiceData.gstAmount.toFixed(2);
                document.getElementById('discount').textContent = invoiceData.discountAmount.toFixed(2);
                document.getElementById('total').textContent = invoiceData.grandTotalAmount.toFixed(2);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('invoice-details').textContent = 'Error fetching data';
            });
    } else {
        document.getElementById('invoice-details').textContent = 'No customer email provided';
    }
});













// // Products array
// var products = [
//     { name: "Select a product", price: 0, quantity: 0 },
//     { name: "Headphones", price: 19, quantity: 40 },
//     { name: "Laptop", price: 799, quantity: 40 },
//     { name: "Wireless Mouse", price: 24, quantity: 40 },
//     { name: "Smartwatch", price: 129, quantity: 40 },
//     { name: "Gaming Keyboard", price: 49, quantity: 40 }
// ];

// // Add row function
// function addRow() {
//     var table = document.getElementById("bill-table").getElementsByTagName('tbody')[0];
//     var rowCount = table.rows.length;
//     var row = table.insertRow();
//     var slCell = row.insertCell();
//     var productCell = row.insertCell();
//     var quantityCell = row.insertCell();
//     var priceCell = row.insertCell();
//     var amountCell = row.insertCell();
//     var actionCell = row.insertCell();

//     slCell.textContent = rowCount + 1;

//     var productSelect = document.createElement("select");
//     productSelect.className = "form-control";
//     productSelect.name = "productName";
//     productSelect.onchange = function() { 
//         setPrice(this); 
//         validateRows(); 
//     };

//     products.forEach(function(product) {
//         var option = document.createElement("option");
//         option.value = product.name;
//         option.setAttribute("data-price", product.price);
//         option.textContent = product.name;
//         productSelect.appendChild(option);
//     });

//     productCell.appendChild(productSelect);
//     quantityCell.innerHTML = '<input type="number" class="form-control" name="quantity" placeholder="Enter quantity" onchange="calculateAmount(this.parentElement.parentElement); validateRows();">';
//     priceCell.innerHTML = '<input type="number" class="form-control" name="price" readonly>';
//     amountCell.innerHTML = '<input type="number" class="form-control" name="totalAmount" readonly>';
//     actionCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>';

//     validateRows(); // Validate all rows immediately after adding
// }

// // Validate all rows and manage "Add Row" button state
// function validateRows() {
//     var rows = document.querySelectorAll('#bill-table tbody tr');
//     var isValid = true;
//     var lastRow = rows[rows.length - 1];

//     if (lastRow) {
//         var productSelect = lastRow.querySelector('select[name="productName"]').value;
//         var quantityInput = lastRow.querySelector('input[name="quantity"]').value;
//         isValid = productSelect && productSelect !== 'Select a product' && quantityInput && quantityInput > 0;
//     }

//     document.getElementById('add').disabled = !isValid;
// }

// // Delete row function
// function deleteRow(button) {
//     var row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
//     updateRowNumbers();
//     calculateTotal();
//     validateRows(); // Revalidate after deletion
// }

// // Set price function
// function setPrice(selectElement) {
//     var price = selectElement.options[selectElement.selectedIndex].getAttribute('data-price');
//     var row = selectElement.parentElement.parentElement;
//     row.querySelector('input[name="price"]').value = price;
//     calculateAmount(row);
// }

// // Calculate amount function
// function calculateAmount(row) {
//     var quantity = row.querySelector('input[name="quantity"]').value;
//     var price = row.querySelector('input[name="price"]').value;
//     var totalAmount = row.querySelector('input[name="totalAmount"]');
//     if (quantity && price) {
//         totalAmount.value = quantity * price;
//     } else {
//         totalAmount.value = 0;
//     }
//     calculateTotal();
// }

// // Calculate total function
// function calculateTotal() {
//     var rows = document.querySelectorAll('#bill-table tbody tr');
//     var subtotal = 0;
//     rows.forEach(row => {
//         var amount = row.querySelector('input[name="totalAmount"]').value;
//         subtotal += parseFloat(amount) || 0;
//     });
//     var gst = subtotal * 0.05;
//     var discount = subtotal * 0.10;
//     var total = subtotal + gst - discount;
//     document.getElementById('subtotal').textContent = subtotal.toFixed(2);
//     document.getElementById('gst').textContent = gst.toFixed(2);
//     document.getElementById('discount').textContent = discount.toFixed(2);
//     document.getElementById('total').textContent = total.toFixed(2);
// }

// // Add event listeners function
// function addEventListeners() {
//     var quantityInputs = document.querySelectorAll('input[name="quantity"]');
//     quantityInputs.forEach(input => {
//         input.addEventListener('input', function() {
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

// // Update row numbers function
// function updateRowNumbers() {
//     var table = document.getElementById("bill-table").getElementsByTagName('tbody')[0];
//     for (var i = 0; i < table.rows.length; i++) {
//         table.rows[i].cells[0].textContent = i + 1;
//     }
// }
// async function handleSubmit(event) {
//     event.preventDefault();

//     if (validateForm()) {
//         try {
//             const formData = new FormData(document.getElementById("billing-form"));
//             const data = Object.fromEntries(formData.entries());

//             const response = await fetch('/api/invoice/buy/product', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             const responseData = await response.json();

//             if (!response.ok) {
//                 displayApiErrors(responseData.error.errorList);
//                 return;
//             }

//             alert("Form submitted successfully!");
//             window.location.href = "customerlist.html"; // Redirect on success

//         } catch (error) {
//             console.error("Error submitting form:", error);
//             document.getElementById("formError").style.display = "block";
//             document.getElementById("formError").textContent = "An error occurred while submitting the form. Please try again.";
//         }
//     } else {
//         document.getElementById("formError").style.display = "block";
//         document.getElementById("formError").textContent = "Please correct the errors and try again.";
//     }


// // Function to display API errors
// function displayApiErrors(errors) {
//     document.querySelectorAll('.error').forEach(el => {
//         el.textContent = '';
//     });

//     errors.forEach(error => {
//         if (error.includes("email")) {
//             document.getElementById("emailError").textContent = error;
//         } else if (error.includes("phone number")) {
//             document.getElementById("mobileNoError").textContent = error;
//         } else if (error.includes("purchase date")) {
//             document.getElementById("purchaseDateError").textContent = error;
//         }
//     });

//     document.getElementById("formError").style.display = "block";
//     document.getElementById("formError").textContent = "Please correct the errors highlighted below.";
// }

// // Function to validate the form
// function validateForm() {
//     let isValid = true;

//     const customerName = document.getElementById("customerName").value.trim();
//     const phoneNumber = document.getElementById("mobileNo").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const gender = document.getElementById("gender").value;
//     const purchaseDate = document.getElementById("purchase-date").value;

//     const nameError = document.getElementById("customerNameError");
//     const phoneError = document.getElementById("mobileNoError");
//     const emailError = document.getElementById("emailError");
//     const addressError = document.getElementById("addressError");
//     const genderError = document.getElementById("genderError");
//     const purchaseDateError = document.getElementById("purchaseDateError");

//     nameError.textContent = "";
//     phoneError.textContent = "";
//     emailError.textContent = "";
//     addressError.textContent = "";
//     genderError.textContent = "";
//     purchaseDateError.textContent = "";

//     if (customerName.length < 3 || !/^[a-zA-Z\s]+$/.test(customerName)) {
//         nameError.textContent = "Please enter a valid name (at least 3 characters, alphabets only).";
//         isValid = false;
//     }

//     if (!/^\d{10}$/.test(phoneNumber)) {
//         phoneError.textContent = "Please enter a valid 10-digit phone number.";
//         isValid = false;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         emailError.textContent = "Please enter a valid email address.";
//         isValid = false;
//     }

//     if (address.length < 5) {
//         addressError.textContent = "Please enter a valid address (at least 5 characters).";
//         isValid = false;
//     }

//     if (!gender) {
//         genderError.textContent = "Please select a gender.";
//         isValid = false;
//     }

//     if (!purchaseDate) {
//         purchaseDateError.textContent = "Purchase date is required.";
//         isValid = false;
//     }

//     return isValid;
// }


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



// // Send the POST request
// try {
//     const response = await fetch('http://localhost:8080/api/invoice/buy/product', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     });

//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.error ? data.error.reason : 'Unknown error occurred');
//     }

//     // Handle successful response
//     // alert('Order placed successfully!');
//     // window.location.href = "customerlist.html";
// } catch (error) {
//     console.error('Error:', error);

//     // Display only the relevant error message
//     const formErrorDiv = document.getElementById('formError');
//     formErrorDiv.textContent = `Error: ${error.message}`;
//     formErrorDiv.style.display = 'block';
// }
// }



//     // // Send the POST request
//     // try {
//     //     const response = await fetch('http://localhost:8080/api/invoice/buy/product', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(payload)
//     //     });

//     //     const data = await response.json();

//     //     if (!response.ok) {
//     //         throw new Error(data.error ? data.error.reason : 'Unknown error occurred');
//     //     }

//     //     // Handle successful response
//     //     alert('Order placed successfully!');
//     //     window.location.href = "customerlist.html";
//     // } catch (error) {
//     //     console.error('Error:', error);

//     //     // Display only the relevant error message
//     //     const formErrorDiv = document.getElementById('formError');
//     //     formErrorDiv.textContent = `Error: ${error.message}`;
//     //     formErrorDiv.style.display = 'block';
//     // }








