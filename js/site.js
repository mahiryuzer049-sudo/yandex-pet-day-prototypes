(() => {
  const closeMenu = (header, toggle) => {
    header.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
    document.body.classList.remove("menu-open");
  };

  document.querySelectorAll("[data-header]").forEach((header) => {
    const toggle = header.querySelector("[data-nav-toggle]");
    const panel = header.querySelector("[data-nav-panel]");

    if (toggle && panel) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const next = !expanded;
        header.classList.toggle("is-open", next);
        toggle.setAttribute("aria-expanded", String(next));
        document.body.classList.toggle("menu-open", next);
      });

      panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => closeMenu(header, toggle));
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
          closeMenu(header, toggle);
        }
      });

      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeMenu(header, toggle);
        }
      });
    }
  });

  const onScroll = () => {
    document.querySelectorAll("[data-header]").forEach((header) => {
      header.classList.toggle("is-scrolled", window.scrollY > 18);
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-register-form]").forEach((form) => {
    const success = form.parentElement.querySelector("[data-form-success]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      form.reset();

      if (success) {
        success.hidden = false;
      }
    });
  });
})();
