document.addEventListener('DOMContentLoaded', () => {
    const searchResults = JSON.stringify(searchResults);

    const activitiesList = document.getElementById('activitiesList');
    const eventsList = document.getElementById('eventsList');
    const reviewsList = document.getElementById('reviewsList');

    // create list
    const createListItem = (item) => {
        const li = document.createElement('li');
        li.textContent = item.name; // ?
        return li;
    };

    // display activities
    searchResults.activities.forEach(activity => {
        const li = createListItem(activity);
        activitiesList.appendChild(li);
    });

    // display events
    searchResults.events.forEach(event => {
        const li = createListItem(event);
        eventsList.appendChild(li);
    });

    // display rveiews
    searchResults.reviews.forEach(review => {
        const li = createListItem(review);
        reviewsList.appendChild(li);
    });
});
