// eventValidation.js

document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('createEvent');

    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const formData = new FormData(this);


        const jsonObject = {};
        formData.forEach(function(value, key){
            jsonObject[key] = value;
        });

        console.log(jsonObject);

        //ajax req   
        fetch('/createEvent', {
            method: 'POST',
            body: formData
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
