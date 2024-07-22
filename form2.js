function handleSubmit(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const price = document.getElementById('price').value;

    // Create the payload
    const payload = {
        productName,
        productQuantity,
        price
    };
    console.log(payload);

    // Send the POST request
    fetch('http://localhost:8080/api/product/add/product', {
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
        // Reset the form
        document.getElementById('yourFormId').reset();
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
