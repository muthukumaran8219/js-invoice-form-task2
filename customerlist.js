// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:8080/api/invoice/getAllCustomer')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Fetched data:', data); // Log the data to verify its structure

//             const tableBody = document.querySelector('#invoiceTable tbody');
//             tableBody.innerHTML = ''; // Clear existing rows

//             // Access the nested Data array
//             const customerData = data.data.Data;

//             // Check if customerData is an array and not empty
//             if (Array.isArray(customerData) && customerData.length > 0) {
//                 customerData.forEach(item => {
//                     const row = document.createElement('tr');

//                     // Create cells for each item property
//                     const nameCell = document.createElement('td');
//                     nameCell.textContent = item.customerName || 'N/A';
//                     row.appendChild(nameCell);

//                     const dateCell = document.createElement('td');
//                     dateCell.textContent = item.date || 'N/A';
//                     row.appendChild(dateCell);

//                     const phoneCell = document.createElement('td');
//                     phoneCell.textContent = item.mobileNo || 'N/A';
//                     row.appendChild(phoneCell);

//                     const emailCell = document.createElement('td');
//                     emailCell.textContent = item.email || 'N/A';
//                     row.appendChild(emailCell);

//                     const addressCell = document.createElement('td');
//                     addressCell.textContent = item.address || 'N/A';
//                     row.appendChild(addressCell);

//                     const genderCell = document.createElement('td');
//                     genderCell.textContent = item.gender || 'N/A';
//                     row.appendChild(genderCell);

//                     const actionCell = document.createElement('td');

//                     // Create View button
//                     const viewButton = document.createElement('button');
//                     viewButton.textContent = 'View';
//                     viewButton.className = 'btn btn-primary';
//                     viewButton.onclick = () => {
//                         window.location.href = `invoice.html?email=${item.email}`;
//                     };
//                     actionCell.appendChild(viewButton);

//                 //     // Create Edit button
//                 //     const editButton = document.createElement('button');
//                 //     editButton.textContent = 'Edit';
//                 //     editButton.className = 'btn btn-secondary ml-2';
//                 //     editButton.onclick = () => {
//                 //         // Store the customer data in localStorage
//                 //         localStorage.setItem('editCustomer', JSON.stringify(item));
//                 //         window.location.href = 'form.html';
//                 //     };
//                 //     actionCell.appendChild(editButton);

//                     row.appendChild(actionCell);
//                     tableBody.appendChild(row);
//                 });
//             } else {
//                 // Display a message if no data is available
//                 const row = document.createElement('tr');
//                 const cell = document.createElement('td');
//                 cell.colSpan = 7; // Adjust based on the number of columns
//                 cell.textContent = 'No data available';
//                 row.appendChild(cell);
//                 tableBody.appendChild(row);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             // Optionally display an error message in the table
//             const tableBody = document.querySelector('#invoiceTable tbody');
//             tableBody.innerHTML = '<tr><td colspan="7">Error fetching data</td></tr>'; // Adjust based on the number of columns
//         });
// });









// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch and display customer invoices on page load
//     fetch('http://localhost:8080/api/invoice/getAllCustomer')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Fetched data:', data); // Log the data to verify its structure

//             const tableBody = document.querySelector('#invoiceTable tbody');
//             tableBody.innerHTML = ''; // Clear existing rows

//             // Access the nested Data array
//             const customerData = data.data.Data;

//             // Check if customerData is an array and not empty
//             if (Array.isArray(customerData) && customerData.length > 0) {
//                 customerData.forEach(item => {
//                     const row = document.createElement('tr');

//                     // Create cells for each item property
//                     const nameCell = document.createElement('td');
//                     nameCell.textContent = item.customerName || 'N/A';
//                     row.appendChild(nameCell);

//                     const dateCell = document.createElement('td');
//                     dateCell.textContent = item.date || 'N/A';
//                     row.appendChild(dateCell);

//                     const phoneCell = document.createElement('td');
//                     phoneCell.textContent = item.mobileNo || 'N/A';
//                     row.appendChild(phoneCell);

//                     const emailCell = document.createElement('td');
//                     emailCell.textContent = item.email || 'N/A';
//                     row.appendChild(emailCell);

//                     const addressCell = document.createElement('td');
//                     addressCell.textContent = item.address || 'N/A';
//                     row.appendChild(addressCell);

//                     const genderCell = document.createElement('td');
//                     genderCell.textContent = item.gender || 'N/A';
//                     row.appendChild(genderCell);

//                     const actionCell = document.createElement('td');

//                     // Create View button
//                     const viewButton = document.createElement('button');
//                     viewButton.textContent = 'View';
//                     viewButton.className = 'btn btn-info';
//                     viewButton.onclick = () => {
//                         window.location.href = `customerview.html?email=${item.email}`;
//                     };
//                     actionCell.appendChild(viewButton);

//                     // // Create Edit button
//                     // const editButton = document.createElement('button');
//                     // editButton.textContent = 'Edit';
//                     // editButton.className = 'btn btn-secondary ml-2';
//                     // editButton.onclick = () => {
//                     //     // Store the customer data in localStorage
//                     //     localStorage.setItem('editCustomer', JSON.stringify(item));
//                     //     window.location.href = 'form.html';
//                     // };
//                     // actionCell.appendChild(editButton);

//                     row.appendChild(actionCell);
//                     tableBody.appendChild(row);
//                 });
//             } else {
//                 // Display a message if no data is available
//                 const row = document.createElement('tr');
//                 const cell = document.createElement('td');
//                 cell.colSpan = 7; // Adjust based on the number of columns
//                 cell.textContent = 'No data available';
//                 row.appendChild(cell);
//                 tableBody.appendChild(row);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             // Optionally display an error message in the table
//             const tableBody = document.querySelector('#invoiceTable tbody');
//             tableBody.innerHTML = '<tr><td colspan="7">Error fetching data</td></tr>'; // Adjust based on the number of columns
//         });

//     // Add event listener to the button
//     document.getElementById('showProductsBtn').addEventListener('click', () => {
//         fetch('http://localhost:8080/api/invoice/getAllCustomerAndBuyedProduct')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Fetched product data:', data); // Log the data to verify its structure

//                 const tableBody = document.querySelector('#invoiceTable tbody');
//                 tableBody.innerHTML = ''; // Clear existing rows

//                 // Access the nested Data array
//                 const customerProductData = data.data.Data;

//                 // Check if customerProductData is an array and not empty
//                 if (Array.isArray(customerProductData) && customerProductData.length > 0) {
//                     customerProductData.forEach(item => {
//                         const row = document.createElement('tr');

//                         // Create cells for each item property
//                         const nameCell = document.createElement('td');
//                         nameCell.textContent = item.customerName || 'N/A';
//                         row.appendChild(nameCell);

//                         const dateCell = document.createElement('td');
//                         dateCell.textContent = item.purchaseDate || 'N/A';
//                         row.appendChild(dateCell);

//                         const phoneCell = document.createElement('td');
//                         phoneCell.textContent = item.mobileNo || 'N/A';
//                         row.appendChild(phoneCell);

//                         const emailCell = document.createElement('td');
//                         emailCell.textContent = item.email || 'N/A';
//                         row.appendChild(emailCell);

//                         const addressCell = document.createElement('td');
//                         addressCell.textContent = item.address || 'N/A';
//                         row.appendChild(addressCell);

//                         const genderCell = document.createElement('td');
//                         genderCell.textContent = item.gender || 'N/A';
//                         row.appendChild(genderCell);

//                         const actionCell = document.createElement('td');

//                         // Create View button
//                         const viewButton = document.createElement('button');
//                         viewButton.textContent = 'View';
//                         viewButton.className = 'btn btn-primary';
//                         viewButton.onclick = () => {
//                             window.location.href = `customerview.html?email=${item.email}`;
//                         };
//                         actionCell.appendChild(viewButton);

//                         row.appendChild(actionCell);
//                         tableBody.appendChild(row);
//                     });
//                 } else {
//                     // Display a message if no data is available
//                     const row = document.createElement('tr');
//                     const cell = document.createElement('td');
//                     cell.colSpan = 7; // Adjust based on the number of columns
//                     cell.textContent = 'No data available';
//                     row.appendChild(cell);
//                     tableBody.appendChild(row);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching product data:', error);
//                 // Optionally display an error message in the table
//                 const tableBody = document.querySelector('#invoiceTable tbody');
//                 tableBody.innerHTML = '<tr><td colspan="7">Error fetching product data</td></tr>'; // Adjust based on the number of columns
//             });
//     });
// });














document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch customer data from the first API
    function fetchCustomerData() {
        return fetch('http://localhost:8080/api/invoice/getAllCustomer')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched customer data:', data); // Log the data to verify its structure
                return data.data.Data; // Return the customer data array
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
                throw error; // Rethrow the error for further handling
            });
    }

    // Function to fetch customer and product data from the second API
    function fetchCustomerProductData() {
        return fetch('http://localhost:8080/api/invoice/getAllCustomerAndBuyedProduct')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched customer product data:', data); // Log the data to verify its structure
                return data.data.Data; // Return the customer product data array
            })
            .catch(error => {
                console.error('Error fetching customer product data:', error);
                throw error; // Rethrow the error for further handling
            });
    }

    // Function to populate the modal with customer data
    function populateModalWithData(customers) {
        const modalBody = document.querySelector('#modalBody');
        modalBody.innerHTML = ''; // Clear existing content

        customers.forEach(customer => {
            const row = document.createElement('div');
            row.classList.add('row');
            row.innerHTML = `
                <div class="col-md-6 mb-3">
                    <strong>Name:</strong> ${customer.customerName || 'N/A'}
                </div>
                <div class="col-md-6 mb-3">
                    <strong>Email:</strong> ${customer.email || 'N/A'}
                </div>
                <div class="col-md-6 mb-3">
                    <strong>Phone:</strong> ${customer.mobileNo || 'N/A'}
                </div>
                <div class="col-md-6 mb-3">
                    <strong>Address:</strong> ${customer.address || 'N/A'}
                </div>
                <div class="col-md-6 mb-3">
                    <strong>Gender:</strong> ${customer.gender || 'N/A'}
                </div>
                <div class="col-md-6 mb-3">
                    <strong>Purchase Date:</strong> ${customer.date || 'N/A'}
                </div>
                <div class="col-md-12 mb-3">
                    <button class="btn btn-info view-details-btn" data-customer-email="${customer.email}">View Details</button>
                </div>
            `;
            modalBody.appendChild(row);
        });

        // Add event listeners to View Details buttons
        const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const customerEmail = button.getAttribute('data-customer-email');
                window.location.href = `customerview.html?email=${encodeURIComponent(customerEmail)}`;
            });
        });
    }

    // Function to populate the table with customer data
    function populateCustomerTable(customers) {
        const tableBody = document.querySelector('#customerTable tbody');
        tableBody.innerHTML = ''; // Clear existing content

        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.customerName || 'N/A'}</td>
                <td>${customer.email || 'N/A'}</td>
                <td>${customer.mobileNo || 'N/A'}</td>
                <td>${customer.address || 'N/A'}</td>
                <td>${customer.date || 'N/A'}</td>
                <td>${customer.gender || 'N/A'}</td>
                <td><button class="btn btn-info view-details-btn" data-customer-email="${customer.email}">View Details</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to View Details buttons
        const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const customerEmail = button.getAttribute('data-customer-email');
                window.location.href = `customerview.html?email=${encodeURIComponent(customerEmail)}`;
            });
        });
    }

    // Function to handle button click and fetch data from both APIs
    document.getElementById('showProductsBtn').addEventListener('click', () => {
        // Fetch customer data from the first API
        fetchCustomerData()
            .then(customers => {
                // Populate the table with customer data
                populateCustomerTable(customers);

                // Populate modal with customer data
                populateModalWithData(customers);

                // Fetch customer and product data from the second API (if needed)
                fetchCustomerProductData()
                    .then(customerProductData => {
                        console.log('Fetched customer and product data:', customerProductData);
                        // Optionally handle the customerProductData as needed
                    })
                    .catch(error => {
                        console.error('Error fetching customer and product data:', error);
                        // Handle error fetching customer and product data
                    });
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
                // Handle error fetching customer data
            });
    });
});
