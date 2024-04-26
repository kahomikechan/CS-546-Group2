document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch search results from the server
        const response = await fetch('/search');
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const searchResults = await response.json();

        // Get references to lists
        const activitiesList = document.getElementById('activitiesList');
        const eventsList = document.getElementById('eventsList');
        const reviewsList = document.getElementById('reviewsList');

        // Create list item function
        const createListItem = (item) => {
            const li = document.createElement('li');
            li.textContent = item.name; // Adjust property name as per your data structure
            return li;
        };

        // Display activities
        searchResults.activities.forEach(activity => {
            const li = createListItem(activity);
            activitiesList.appendChild(li);
        });

        // Display events
        searchResults.events.forEach(event => {
            const li = createListItem(event);
            eventsList.appendChild(li);
        });

        // Display reviews
        searchResults.reviews.forEach(review => {
            const li = createListItem(review);
            reviewsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
        // Handle error
    }
});

