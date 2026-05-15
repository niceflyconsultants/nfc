// ===============================
// NICE FLY CONSULTANTS
// MAIN JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // MOBILE MENU
  // ===============================

  const hamburger =
    document.getElementById("hamburger");

  const navLinks =
    document.getElementById("navLinks");

  if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

      navLinks.classList.toggle("active");

      hamburger.classList.toggle("active");

      document.body.classList.toggle("menu-open");

    });

  }

  // ===============================
  // SMOOTH SCROLL
  // ===============================

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", function (e) {

        const targetId =
          this.getAttribute("href");

        if (targetId === "#") return;

        const target =
          document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const offset = 80;

        const topPosition =
          target.offsetTop - offset;

        window.scrollTo({
          top: topPosition,
          behavior: "smooth"
        });

        // CLOSE MOBILE MENU
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");

      });

    });

  // ===============================
  // NAVBAR SCROLL EFFECT
  // ===============================

  const navbar =
    document.querySelector(".navbar");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

      navbar.style.background =
        "rgba(7,11,20,0.85)";

      navbar.style.backdropFilter =
        "blur(20px)";

    } else {

      navbar.style.background =
        "rgba(7,11,20,0.6)";

    }

  });

  // ===============================
  // PARALLAX ORBS
  // ===============================

  const orbs =
    document.querySelectorAll(".orb");

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    orbs.forEach((orb, index) => {

      const speed =
        (index + 1) * 0.03;

      orb.style.transform =
        `translateY(${scrollY * speed}px)`;

    });

  });

});

// ===============================
// READ MORE TOGGLE
// ===============================

const readMoreButtons =
document.querySelectorAll(".read-more-btn");

readMoreButtons.forEach(button => {

  button.addEventListener("click", () => {

    const moreText =
      button.previousElementSibling;

    moreText.classList.toggle("active");

    if (
      moreText.classList.contains("active")
    ) {

      button.textContent = "Read Less";

    } else {

      button.textContent = "Read More";

    }

  });

});

// ===============================
// STAT COUNTER ANIMATION
// ===============================

const counters =
document.querySelectorAll(".counter");

const counterObserver =
new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const counter =
    entry.target;

    const target =
    +counter.dataset.target;

    let current = 0;

    const increment =
    target / 120;

    const updateCounter = () => {

      current += increment;

      if (current < target) {

        counter.innerText =
        Math.ceil(current) + "+";

        requestAnimationFrame(updateCounter);

      } else {

        counter.innerText =
        target + "+";

      }

    };

    updateCounter();

    counterObserver.unobserve(counter);

  });

}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});