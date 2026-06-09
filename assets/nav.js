document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");

    let isActive = false;

    if (href === "/providers/" && (path === "/providers/" || path.startsWith("/provider/"))) {
      isActive = true;
    }

    if (href === "/countries/" && (path === "/countries/" || path.startsWith("/country/"))) {
      isActive = true;
    }

    if (href === "/casino/stake/" && path.startsWith("/casino/")) {
      isActive = true;
    }

    if (href === "/map/" && path.startsWith("/map/")) {
      isActive = true;
    }

    if (href === "/help-us/" && path.startsWith("/help-us/")) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});
