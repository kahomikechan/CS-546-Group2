document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(reviewForm);

        const jsonObject = {};
        formData.forEach(function (value, key) {
            jsonObject[key] = value;
        });

        // read the ID from the URL
        const url = window.location.href;
        // http://localhost:3000/activity/<id here>/createReview
        const urlParts = url.split('/');
        // ['http:', '', 'localhost:3000', 'activity', '662d81c7df0d9631c64446df', 'createReview']
        const activityId = urlParts[urlParts.length - 2];

        fetch(`/activity/${activityId}/createReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonObject)
        })
            .then(response => {
                // Handle response
                if (response.ok) {
                    // Redirect to /allEvents
                    window.location.href = '/allReviews';
                } else {
                    console.error('Failed to submit review.');
                    window.location.href = '/error';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});


async function updateAllReviews() {
    try {
        const response = await fetch('/allReviews');
        if (response.ok) {
            const allReviewsHTML = await response.text();
            document.getElementById('allReviews').innerHTML = allReviewsHTML;
        } else {
            console.error('Failed to retrieve all reviews.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}