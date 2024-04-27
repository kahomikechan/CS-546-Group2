document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const formData = new FormData(this);

        // Convert FormData to URLSearchParams
        const searchParams = new URLSearchParams();
        formData.forEach(function(value, key){
            searchParams.append(key, value);
        });

        // Log the search parameters to ensure they're correctly formatted
        console.log(searchParams.toString());

        // Make AJAX request
        fetch(`/allActivities/search?${searchParams.toString()}`, {
            method: 'GET', // GET request
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Handle response
            if (response.ok) {
                window.location.href = '/allActivities/search';
            } else {
                console.error('Failed to search activities.');
                window.location.href = '/error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    });
});



