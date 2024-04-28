// eventValidation.js

document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');

    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const formData = new FormData(this);

        // Convert FormData to JSON object
        const jsonObject = {};
        formData.forEach(function(value, key){
            jsonObject[key] = value;
        });

        // Convert JSON object to string
        const jsonString = JSON.stringify(jsonObject);

        // Make AJAX request
        fetch('/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonString
        })
        .then(response => {
            // Handle response
            if (response.ok) {
                // Redirect to /allEvents
                window.location.href = '/allEvents';
            } else {
                console.error('Failed to submit event.');
                window.location.href = '/error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    });
});
