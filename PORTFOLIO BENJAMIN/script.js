/* script.js
   Fonctionnalités :
   - Toggle menu burger en mobile
   - Ajout classe body.is-loaded pour effet d'apparition
   - Smooth scroll pour ancres internes
   - Gestion du formulaire : mailto vers ngizulubenjamin@gmail.com
   - Fermeture auto du menu burger sur scroll ou clic extérieur
   - Gestion shiny effect sur mobile
*/

document.addEventListener("DOMContentLoaded", function() {

    /* ------------------------------------------------------------
       1) Apparition fluide du site
    ------------------------------------------------------------ */
    setTimeout(() => {
        document.body.classList.add("is-loaded");
    }, 500);

    /* ------------------------------------------------------------
       2) Burger menu
    ------------------------------------------------------------ */
    const burger = document.getElementById("burger");
    const mainNav = document.getElementById("main-nav");

    function closeMenu() {
        if (mainNav && mainNav.classList.contains("open")) {
            mainNav.classList.remove("open");
        }
        if (burger && burger.classList.contains("active")) {
            burger.classList.remove("active");
        }
    }

    if (burger && mainNav) {
        burger.addEventListener("click", (e) => {
            e.stopPropagation();
            mainNav.classList.toggle("open");
            burger.classList.toggle("active");
        });
    }

    /* ------------------------------------------------------------
       3) Smooth scroll pour ancres internes
    ------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                closeMenu();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ------------------------------------------------------------
       4) Fermeture du menu : scroll + clic extérieur
    ------------------------------------------------------------ */

    // fermeture sur scroll
    window.addEventListener("scroll", () => {
        closeMenu();
    }, { passive: true });

    // fermeture si clic extérieur
    document.addEventListener("click", (e) => {
        if (!mainNav || !burger) return;

        const clickInsideMenu = mainNav.contains(e.target);
        const clickOnBurger = burger.contains(e.target);

        if (!clickInsideMenu && !clickOnBurger) {
            closeMenu();
        }
    });

    // fermeture au redimensionnement
    window.addEventListener("resize", () => {
        closeMenu();
    });

    /* ------------------------------------------------------------
       5) Gestion du formulaire (mailto)
    ------------------------------------------------------------ */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const company = document.getElementById("company").value.trim();
            const message = document.getElementById("message").value.trim();

            const subject = encodeURIComponent("Demande depuis site - " + (company || "Sans entreprise"));

            let body = "Nom: " + name + "\n";
            body += "Email: " + email + "\n";
            if (company) body += "Entreprise: " + company + "\n";
            body += "\nMessage:\n" + message;

            const mailto = "mailto:ngizulubenjamin@gmail.com"
                         + "?subject=" + subject
                         + "&body=" + encodeURIComponent(body);

            window.location.href = mailto;
            contactForm.reset();

            setTimeout(() => {
                alert("Votre client mail devrait s’ouvrir. Si rien ne se passe, envoyez votre message à : ngizulubenjamin@gmail.com");
            }, 450);
        });
    }

    /* ------------------------------------------------------------
       6) Effet "shiny" sur les cards en mobile
    ------------------------------------------------------------ */
    function applyShinyCardsOnMobile() {
        const cards = document.querySelectorAll(".card");
        if (window.matchMedia("(max-width: 768px)").matches) {
            cards.forEach(c => c.classList.add("shiny"));
        } else {
            cards.forEach(c => c.classList.remove("shiny"));
        }
    }

    applyShinyCardsOnMobile();
    window.addEventListener("resize", applyShinyCardsOnMobile);

});