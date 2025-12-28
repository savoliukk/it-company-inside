(function () {
  // ===== Year in footer =====
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== Active nav link =====
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".site-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("is-active");
  });

  // ===== Mobile nav toggle =====
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu on link click (mobile UX)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ===== Accordion (generic) =====
  // Markup requirement:
  // .accordion[data-accordion] .accordion__item > button.accordion__button + .accordion__panel[hidden]
  function initAccordion(root) {
    const items = root.querySelectorAll(".accordion__item");

    items.forEach((item) => {
      const btn = item.querySelector(".accordion__button");
      const panel = item.querySelector(".accordion__panel");
      if (!btn || !panel) return;

      // Safety defaults
      btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded") || "false");
      panel.hidden = panel.hidden !== false;

      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        const next = !expanded;

        // Optional behavior: only one open at a time (accordion style)
        items.forEach((it) => {
          const b = it.querySelector(".accordion__button");
          const p = it.querySelector(".accordion__panel");
          if (!b || !p) return;

          const isCurrent = it === item;
          b.setAttribute("aria-expanded", String(isCurrent ? next : false));
          p.hidden = !(isCurrent ? next : false);
        });
      });
    });
  }

  document.querySelectorAll("[data-accordion]").forEach((acc) => initAccordion(acc));

  // ===== To top button =====
  const toTop = document.querySelector(".to-top");
  if (toTop) {
    const onScroll = () => {
      if (window.scrollY > 500) toTop.classList.add("is-visible");
      else toTop.classList.remove("is-visible");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
