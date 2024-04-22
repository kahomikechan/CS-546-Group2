import { approveProfile } from '../../data/users.js';

document.querySelectorAll(".character-btn").forEach((btn) => {
    btn.addEventListener("click", () => { 
      console.log(btn.dataset.id); 
      approveProfile(btn.dataset.id);
      });
    });