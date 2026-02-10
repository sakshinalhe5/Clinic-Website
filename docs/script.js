// script.js

// ---------------------- Appointment Form ----------------------
const appointmentForm = document.getElementById("appointmentForm");
const appointmentDetails = document.getElementById("appointmentDetails");

if (appointmentForm) {
  appointmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const appointmentData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      message: document.getElementById("message").value,
    };
    
    try {

       // Send data to backend API
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(appointmentData),
      });


      if (response.ok) {
        appointmentDetails.innerHTML = `
          <p><strong>Name:</strong> ${appointmentData.name}</p>
          <p><strong>Email:</strong> ${appointmentData.email}</p>
          <p><strong>Phone:</strong> ${appointmentData.phone}</p>
          <p><strong>Date:</strong> ${appointmentData.date}</p>
          <p><strong>Time:</strong> ${appointmentData.time}</p>
          <p><strong>Reason:</strong> ${appointmentData.message}</p>
          <p style="color:green;"><b>Appointment booked successfully!</b></p>
        `;

        appointmentForm.reset();
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    }
  });
}


// ---------------------- Reviews Form ----------------------
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

if (reviewForm) {
  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect review data
    const reviewData = {
      name: document.getElementById("reviewerName").value,
      review: document.getElementById("reviewText").value,
    };

    try {
      // Send data to backend API
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const result = await response.json();

        // Show submitted review on page
        reviewsList.innerHTML = `
          <p><strong>${reviewData.name}:</strong> ${reviewData.review}</p>
          <p style="color:green;"><b>${result.message || "Review submitted successfully!"}</b></p>
        `;

        reviewForm.reset();
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    }
  });
}
