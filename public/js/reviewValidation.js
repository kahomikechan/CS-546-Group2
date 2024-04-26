document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(reviewForm);

            const reviewData = {};
            formData.forEach((value, key) => {
                reviewData[key] = value;
            });

            try {
                const response = await fetch('/createReview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reviewData)
                });

                if (response.ok) {
                    // Redirect to allReviews page if review is successfully created
                    window.location.href = '/allReviews';
                } else {
                    console.error('Failed to submit review.');
                    // Handle error condition if necessary
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error condition if necessary
            }
        });
    } else {
        console.error('Review form element not found.');
        // Handle error condition if necessary
    }
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