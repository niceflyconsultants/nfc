// ===============================
// NICE FLY CONSULTANTS
// MAIN JAVASCRIPT
// ===============================

class NiceFlyApp {

  constructor() {

    this.header =
    document.getElementById("header");

    this.footer =
    document.getElementById("footer");

    this.init();

  }

  // ===============================
  // INIT
  // ===============================

  async init() {

    await this.loadComponents();

    this.initializeNavbar();

    this.initializeSmoothScroll();

    this.initializeNavbarScroll();

    this.initializeParallax();
    this.initializeScrollMarquee();

    this.initializeReadMore();

    this.initializeCounters();

    this.initializeFAQ();

    this.initializeActiveNav();

    this.initializeRevealAnimations();

  }

  // ===============================
  // LOAD COMPONENTS
  // ===============================

  async loadComponents() {

    try {

      // LOAD HEADER
      if (this.header) {

        const response =
        await fetch("header.html");

        this.header.innerHTML =
        await response.text();

      }

      // LOAD FOOTER
      if (this.footer) {

        const response =
        await fetch("footer.html");

        this.footer.innerHTML =
        await response.text();

      }

    } catch (error) {

      console.error(
        "Component loading failed:",
        error
      );

    }

  }

  // ===============================
  // NAVBAR
  // ===============================

  initializeNavbar() {

    const hamburger =
    document.getElementById("hamburger");

    const navLinks =
    document.getElementById("navLinks");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {

      navLinks.classList.toggle("active");

      hamburger.classList.toggle("active");

      document.body.classList.toggle(
        "menu-open"
      );

    });

    // CLOSE MENU ON LINK CLICK

    navLinks
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove(
          "active"
        );

        hamburger.classList.remove(
          "active"
        );

        document.body.classList.remove(
          "menu-open"
        );

      });

    });

  }

  // ===============================
  // ACTIVE NAVIGATION
  // ===============================

  initializeActiveNav() {

    const currentPage =
    window.location.pathname
    .split("/")
    .pop();

    const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );

    navLinks.forEach(link => {

      const href =
      link.getAttribute("href");

      if (href === currentPage) {

        link.classList.add("active");

      }

    });

  }

  // ===============================
  // SMOOTH SCROLL
  // ===============================

  initializeSmoothScroll() {

    document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener(
        "click",
        e => {

          const targetId =
          anchor.getAttribute("href");

          if (targetId === "#")
          return;

          const target =
          document.querySelector(
            targetId
          );

          if (!target) return;

          e.preventDefault();

          const offset = 80;

          const topPosition =
          target.offsetTop - offset;

          window.scrollTo({

            top: topPosition,

            behavior:"smooth"

          });

        }

      );

    });

  }

  // ===============================
  // NAVBAR SCROLL EFFECT
  // ===============================

  initializeNavbarScroll() {

    const navbar =
    document.querySelector(".navbar");

    if (!navbar) return;

    const handleScroll = () => {

      if (window.scrollY > 50) {

        navbar.style.background =
        "rgba(7,11,20,0.88)";

        navbar.style.backdropFilter =
        "blur(22px)";

        navbar.style.borderBottom =
        "1px solid rgba(255,255,255,0.08)";

      } else {

        navbar.style.background =
        "rgba(7,11,20,0.65)";

      }

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

  }

  // ===============================
  // PARALLAX ORBS
  // ===============================

  initializeParallax() {

    const orbs =
    document.querySelectorAll(".orb");

    if (!orbs.length) return;

    let ticking = false;

    window.addEventListener("scroll", () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          const scrollY =
          window.scrollY;

          orbs.forEach((orb, index) => {

            const speed =
            (index + 1) * 0.03;

            orb.style.transform =
            `translateY(${scrollY * speed}px)`;

          });

          ticking = false;

        });

        ticking = true;

      }

    });

  }

  // ===============================
  // READ MORE TOGGLE
  // ===============================

  initializeReadMore() {

    const buttons =
    document.querySelectorAll(
      ".read-more-btn"
    );

    buttons.forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const moreText =
          button.previousElementSibling;

          moreText.classList.toggle(
            "active"
          );

          button.textContent =
          moreText.classList.contains(
            "active"
          )
          ? "Read Less"
          : "Read More";

        }

      );

    });

  }

  // ===============================
  // COUNTER ANIMATION
  // ===============================

  initializeCounters() {

    const counters =
    document.querySelectorAll(
      ".counter"
    );

    if (!counters.length) return;

    const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
          return;

          const counter =
          entry.target;

          const target =
          +counter.dataset.target;

          let current = 0;

          const increment =
          target / 120;

          const updateCounter =
          () => {

            current += increment;

            if (current < target) {

              counter.innerText =
              Math.ceil(current) + "+";

              requestAnimationFrame(
                updateCounter
              );

            } else {

              counter.innerText =
              target + "+";

            }

          };

          updateCounter();

          observer.unobserve(counter);

        });

      },

      {
        threshold:0.5
      }

    );

    counters.forEach(counter => {
      observer.observe(counter);
    });

  }

  // ===============================
  // FAQ ACCORDION
  // ===============================

  initializeFAQ() {

    const faqItems =
    document.querySelectorAll(
      ".faq-item"
    );

    faqItems.forEach(item => {

      const question =
      item.querySelector(
        ".faq-question"
      );

      question.addEventListener(
        "click",
        () => {

          const isActive =
          item.classList.contains(
            "active"
          );

          faqItems.forEach(faq => {

            faq.classList.remove(
              "active"
            );

          });

          if (!isActive) {

            item.classList.add(
              "active"
            );

          }

        }

      );

    });

  }

  // ===============================
  // REVEAL ANIMATION
  // ===============================

  initializeRevealAnimations() {

    const elements =
    document.querySelectorAll(

      ".destination-card,\
      .partner-card,\
      .service-panel,\
      .faq-item,\
      .contact-item,\
      .team-card"

    );

    if (!elements.length) return;

    const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "show-element"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold:0.15
      }

    );

    elements.forEach(element => {

      element.classList.add(
        "hidden-element"
      );

      observer.observe(element);

    });

  }
  

// ===============================
// SCROLL MARQUEE EFFECT
// ===============================

initializeScrollMarquee() {

  const trackLeft =
  document.getElementById("trackLeft");

  const trackRight =
  document.getElementById("trackRight");

  if (!trackLeft || !trackRight)
  return;

  let lastScroll =
  window.scrollY;

  let leftPosition = -50;

  let rightPosition = -50;

  window.addEventListener("scroll", () => {

    const currentScroll =
    window.scrollY;

    const direction =
    currentScroll > lastScroll
    ? 1
    : -1;

    leftPosition += direction * 0.1;

    rightPosition -= direction * 0.1;

    trackLeft.style.transform =
    `translateX(calc(${leftPosition}%))`;

    trackRight.style.transform =
    `translateX(calc(${rightPosition}%))`;

    lastScroll = currentScroll;

  });

}

}


// ===============================
// INITIALIZE APP
// ===============================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    new NiceFlyApp();

  }
);

