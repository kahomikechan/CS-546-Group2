// import { approveProfile } from "../../data/users";

// document.querySelectorAll(".character-btn").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     console.log(btn.dataset.id);
//     approveProfile(btn.dataset.id);
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".character-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const userId = btn.dataset.id;

      try {
        const response = await fetch("/admin/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Approval successful:", result.user);
          btn.textContent = "Approved"; // Update the button text
          btn.disabled = true; // Disable the button to prevent multiple clicks
        } else {
          const errorData = await response.json();
          console.error("Error approving user:", errorData.error);
        }
      } catch (error) {
        console.error("Network or server error:", error);
      }
    });
  });
});
