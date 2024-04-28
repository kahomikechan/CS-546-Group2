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
function applyFilters() {
    var sortByDate = document.getElementById("sortByDate").value;
    var filterByCategory = document.getElementById("filterByCategory").value;

    var allEvents = document.querySelectorAll('.event');

    allEvents.forEach(function(event) {
        var eventDate = event.querySelector('p:nth-of-type(1)').textContent.split(": ")[1];
        var eventType = event.querySelector('p:nth-of-type(3)').textContent.split(": ")[1];

        if (filterByCategory === "" || eventType === filterByCategory) {
            event.style.display = "block";
        } else {
            event.style.display = "none";
        }
    });

    if (sortByDate === "asc") {
        var sortedEvents = Array.from(allEvents).sort(function(a, b) {
            return new Date(a.querySelector('p:nth-of-type(1)').textContent.split(": ")[1]) - new Date(b.querySelector('p:nth-of-type(1)').textContent.split(": ")[1]);
        });
    } else {
        var sortedEvents = Array.from(allEvents).sort(function(a, b) {
            return new Date(b.querySelector('p:nth-of-type(1)').textContent.split(": ")[1]) - new Date(a.querySelector('p:nth-of-type(1)').textContent.split(": ")[1]);
        });
    }

    var eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    sortedEvents.forEach(function(event) {
        eventsList.appendChild(event);
    });
}