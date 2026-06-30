const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-site-nav]");
const revealEls = document.querySelectorAll(".reveal");
const partnerModule = document.querySelector("[data-partner-module]");
const atlasObject = document.querySelector("[data-atlas-object]");
const sectionCounter = document.querySelector("[data-section-counter]");
const railMode = document.querySelector("[data-rail-mode]");
const sectionEls = document.querySelectorAll("[data-section]");
const heroLedgerRows = document.querySelectorAll(".partner-ledger .ledger-row");
const atlasLabel = document.querySelector("[data-atlas-label]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}

function closeMenu() {
  if (!nav || !header || !menuButton) return;
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (menuButton && nav && header) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    header.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (sectionCounter) sectionCounter.textContent = entry.target.dataset.section;
        if (railMode) railMode.textContent = entry.target.dataset.sectionName;
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
  );

  sectionEls.forEach((section) => sectionObserver.observe(section));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

heroLedgerRows.forEach((row) => {
  row.addEventListener("click", () => {
    heroLedgerRows.forEach((item) => item.classList.toggle("is-active", item === row));
    if (atlasLabel) atlasLabel.textContent = row.dataset.partner || "Partner ecosystem";
  });
});

if (partnerModule) {
  partnerModule.addEventListener("click", (event) => {
    const row = event.target.closest(".ledger-entry");
    if (!row) return;

    const rows = [...partnerModule.querySelectorAll(".ledger-entry")];
    rows.forEach((item) => {
      const detail = item.nextElementSibling;
      const isSelected = item === row;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-expanded", String(isSelected));
      if (detail) detail.hidden = !isSelected;
    });
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let parallaxFrame = null;

window.addEventListener(
  "scroll",
  () => {
    if (!atlasObject || reduceMotion.matches || parallaxFrame) return;

    parallaxFrame = window.requestAnimationFrame(() => {
      const offset = Math.min(36, window.scrollY * 0.03);
      atlasObject.style.transform = "translate3d(0, " + offset + "px, 0)";
      parallaxFrame = null;
    });
  },
  { passive: true }
);

if (atlasObject && !reduceMotion.matches) {
  atlasObject.addEventListener("pointermove", (event) => {
    const rect = atlasObject.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    atlasObject.style.setProperty("--tilt-x", y + "deg");
    atlasObject.style.setProperty("--tilt-y", x + "deg");
    atlasObject.style.transform = "rotateX(" + y + "deg) rotateY(" + x + "deg)";
  });

  atlasObject.addEventListener("pointerleave", () => {
    atlasObject.style.transform = "";
  });
}
