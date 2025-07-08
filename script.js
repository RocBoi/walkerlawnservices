document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quote-form");
  const successMsg = document.getElementById("form-success");
  const submitBtn = form.querySelector("button[type='submit']");

  // Optional: Create loading spinner
  const spinner = document.createElement("span");
  spinner.classList.add("spinner");
  spinner.style.marginLeft = "10px";
  spinner.style.display = "none";
  spinner.innerHTML = "⏳";

  submitBtn.parentNode.insertBefore(spinner, submitBtn.nextSibling);

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Optional: reCAPTCHA check (if added)
      const recaptcha = form.querySelector("[name='g-recaptcha-response']");
      if (recaptcha && recaptcha.value.trim() === "") {
        alert("Please complete the CAPTCHA.");
        return;
      }

      const data = new FormData(form);
      spinner.style.display = "inline-block";
      submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      })
        .then((response) => {
          spinner.style.display = "none";
          submitBtn.disabled = false;

          if (response.ok) {
            successMsg.style.display = "block";
            form.reset();
            window.scrollTo({
              top: form.offsetTop,
              behavior: "smooth"
            });

            // Auto-hide after 6 seconds
            setTimeout(() => {
              successMsg.style.display = "none";
            }, 6000);
          } else {
            alert("❌ Error sending request. Please call (770) 896-2847.");
          }
        })
        .catch((error) => {
          spinner.style.display = "none";
          submitBtn.disabled = false;
          console.error("Form error:", error);
          alert("⚠️ Network issue. Please try again later.");
        });
    });
  }
});
