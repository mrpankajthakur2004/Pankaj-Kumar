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
   3D SKILLS TYRE / WHEEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".skills-3d-section");

    const wheel =
        document.querySelector(".skills-3d-grid");

    const cards =
        document.querySelectorAll(".skill-3d");

    if (!section || !wheel || !cards.length) return;


    const totalCards = cards.length;

    /*
       Radius of the wheel
    */

    const radius = 380;


    /*
       Put every card around
       the circular wheel
    */

    cards.forEach((card, index) => {

        const angle =
            (360 / totalCards) * index;

        card.dataset.angle = angle;

        card.style.transform = `
            rotateY(${angle}deg)
            translateZ(${radius}px)
        `;

    });


    function updateWheel() {

        const rect =
            section.getBoundingClientRect();

        const scrollable =
            section.offsetHeight -
            window.innerHeight;


        let progress =
            -rect.top / scrollable;


        progress =
            Math.max(
                0,
                Math.min(1, progress)
            );


        /*
           Complete wheel rotation
        */

        const rotation =
            progress * 360;


        wheel.style.transform = `
            rotateY(${-rotation}deg)
        `;


        /*
           Find card closest to front
        */

        let activeIndex =
            Math.round(
                progress *
                (totalCards - 1)
            );


        activeIndex =
            Math.max(
                0,
                Math.min(
                    totalCards - 1,
                    activeIndex
                )
            );


        cards.forEach(
            (card, index) => {

                card.classList.toggle(
                    "active",
                    index === activeIndex
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateWheel,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateWheel
    );


    updateWheel();

});
