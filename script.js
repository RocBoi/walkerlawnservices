document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quote-form");
  const successMsg = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      })
        .then((response) => {
          if (response.ok) {
            successMsg.style.display = "block";
            form.reset();
            window.scrollTo({
              top: form.offsetTop,
              behavior: "smooth"
            });
          } else {
            alert("❌ Error sending your request. Please try again or call (770) 896-2847.");
          }
        })
        .catch((error) => {
          console.error("Form submission error:", error);
          alert("⚠️ A network error occurred. Please check your connection and try again.");
        });
    });
  }
});
