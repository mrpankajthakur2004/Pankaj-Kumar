document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
        });

        document.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
            });
        });
    }

});
/* =========================================
   PREMIUM SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


});


/* =========================================
   3D SKILLS SCROLL ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const section =
    document.querySelector(".skills-3d-section");

  const cards =
    document.querySelectorAll(".skill-3d");


  if (!section || !cards.length) return;


  let currentIndex = -1;


  function updateSkillsAnimation() {

    const rect =
      section.getBoundingClientRect();


    const sectionHeight =
      section.offsetHeight;


    const viewportHeight =
      window.innerHeight;


    /*
      Calculate scroll progress.

      0 = section starts
      1 = section finishes
    */

    const scrollable =
      sectionHeight - viewportHeight;


    let progress =
      -rect.top / scrollable;


    progress =
      Math.max(
        0,
        Math.min(1, progress)
      );


    /*
      One card gets activated
      after every scroll step.
    */

    const index =
      Math.floor(
        progress * cards.length
      );


    const safeIndex =
      Math.min(
        cards.length - 1,
        Math.max(0, index)
      );


    cards.forEach((card, i) => {

      card.classList.remove("active");

      /*
        Cards before current card
        rotate backward in 3D.
      */

      if (i < safeIndex) {

        card.style.transform = `
          translateZ(-40px)
          rotateX(70deg)
          rotateY(-18deg)
          scale(.88)
        `;

      }


      /*
        Current card becomes active.
      */

      else if (i === safeIndex) {

        card.style.transform = `
          translateZ(90px)
          rotateX(0deg)
          rotateY(0deg)
          scale(1.06)
        `;

        card.classList.add("active");

      }


      /*
        Cards waiting for their turn.
      */

      else {

        card.style.transform = `
          translateZ(0)
          rotateX(0deg)
          rotateY(0deg)
          scale(1)
        `;

      }

    });


    currentIndex = safeIndex;

  }


  /*
    Run animation on scroll
  */

  window.addEventListener(
    "scroll",
    updateSkillsAnimation,
    { passive: true }
  );


  /*
    Initial state
  */

  updateSkillsAnimation();

});
