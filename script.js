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
