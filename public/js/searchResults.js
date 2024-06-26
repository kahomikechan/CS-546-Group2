document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const formData = new FormData(this);

        const searchParams = new URLSearchParams();
        formData.forEach(function(value, key){
            searchParams.append(key, value);
        });

         window.location.href = `/allActivities/search?${searchParams.toString()}`;
       //  window.location.href = `/allEvents/search?${searchParams.toString()}`;
        
});
});



