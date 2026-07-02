/* ==========================================================
   CareConnect Dashboard
   dashboard.js
   Interactions • UI Logic • Animations
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================
       ELEMENTS
    ========================================================== */

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    const themeToggle = document.getElementById("themeToggle");

    const profileButton = document.getElementById("profileButton");
    const profileDropdown = document.getElementById("profileDropdown");

    const searchInput = document.getElementById("dashboardSearch");

    /* ==========================================================
       SIDEBAR TOGGLE (MOBILE)
    ========================================================== */

    function openSidebar() {
        sidebar.classList.add("active");
        sidebarOverlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    /* ==========================================================
       PROFILE DROPDOWN
    ========================================================== */

    if (profileButton && profileDropdown) {

        profileButton.addEventListener("click", function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
        });

        document.addEventListener("click", function () {
            profileDropdown.classList.remove("active");
        });

    }

    /* ==========================================================
       DARK MODE TOGGLE
    ========================================================== */

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("careconnect-theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("careconnect-theme", "light");
        }
    }

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark = document.body.classList.contains("dark-mode");
            setTheme(!isDark);

        });

    }

    // Load saved theme
    const savedTheme = localStorage.getItem("careconnect-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    /* ==========================================================
       COUNTER ANIMATION (STATS)
    ========================================================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = +counter.getAttribute("data-target");
            const current = +counter.innerText;

            const increment = target / 80;

            if (current < target) {

                counter.innerText = Math.ceil(current + increment);

                setTimeout(updateCounter, 20);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

    /* ==========================================================
       SEARCH FUNCTION (BASIC FILTER UI)
    ========================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const query = this.value.toLowerCase();

            const cards = document.querySelectorAll(".dashboard-card, tr, .notification-item, .reply-card");

            cards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(query)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }

    /* ==========================================================
       CLOSE DROPDOWNS ON ESC
    ========================================================== */

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            profileDropdown?.classList.remove("active");
            closeSidebar();

        }

    });

    /* ==========================================================
       SMOOTH SCROLL (ANCHORS)
    ========================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    /* ==========================================================
       ACTIVE MENU INDICATOR (BASIC)
    ========================================================== */

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

        });

    });

});