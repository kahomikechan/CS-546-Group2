document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('eventSearchForm');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        const searchParams = new URLSearchParams();
        formData.forEach(function(value, key){
            searchParams.append(key, value);
        });

         window.location.href = `/allEvents/search?${searchParams.toString()}`;
        
});
});