// Subvators Hub. Motion vocabulary and timings are defined in DESIGN.md and styles.css.
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var toArray = function (list) { return Array.prototype.slice.call(list); };
  root.classList.add("js");

  // ---- Header menu (tablet and phone) ----
  var header = document.querySelector("[data-header]");
  var menuButton = document.querySelector("[data-menu-button]");
  var nav = document.querySelector("[data-site-nav]");

  function closeMenu() {
    if (!nav || !menuButton) return;
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", function (event) {
      if (header && !header.contains(event.target)) closeMenu();
    });
  }

  // ---- Rise: split the headline into words ----
  var riseEl = document.querySelector("[data-rise]");
  if (riseEl && !reduceMotion) {
    var fullText = riseEl.textContent.replace(/\s+/g, " ").trim();
    var wordIndex = 0;
    var parts = [];
    toArray(riseEl.childNodes).forEach(function (node) {
      var accent = node.nodeType === 1;
      node.textContent.trim().split(/\s+/).filter(Boolean).forEach(function (word) {
        parts.push('<span class="word"><span' + (accent ? ' class="is-accent"' : "") + ' style="--i:' + (wordIndex++) + '">' + word + "</span></span>");
      });
    });
    riseEl.setAttribute("aria-label", fullText);
    riseEl.innerHTML = parts.join(" ");
  }

  toArray(document.querySelectorAll(".ledger")).forEach(function (ledger) {
    toArray(ledger.children).forEach(function (child, i) { child.style.setProperty("--i", i); });
  });
  toArray(document.querySelectorAll(".tile")).forEach(function (tile, i) {
    tile.style.setProperty("--o", i % 8);
  });

  // ---- Count: the two real figures count up once ----
  function countUp(el) {
    var target = Number(el.dataset.count);
    var suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = performance.now();
    (function frame(now) {
      var progress = Math.min(1, Math.max(0, (now - start) / 800));
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    })(start);
  }

  // ---- Reveal each section once as it arrives ----
  var revealEls = toArray(document.querySelectorAll(".reveal"));
  function reveal(section) {
    section.classList.add("is-visible");
    toArray(section.querySelectorAll("[data-count]")).forEach(countUp);
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("js-motion");
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Pass: hero collage, at most three photos on screen ----
  var EVENTS = "images/events/";
  var YADEN = EVENTS + "Yaden East Africa/WhatsApp Image 2026-06-30 at ";
  var SPILLS = EVENTS + "Spills of Eden/WhatsApp Image 2026-06-30 at ";
  var CARLEDORIAN = EVENTS + "Carledorian/WhatsApp Image 2026-06-29 at ";
  var INTARCH = EVENTS + "Intarch/";

  // To add a partner to the hero, add one entry here: name, label, then three photos (src, alt).
  var heroPartnerImages = [
    { name: "COTRR Africa", label: "Field mobilisation", photos: [
      [SPILLS + "23.43.52.jpeg", "Community resilience field setting connected to health and environment work"],
      [CARLEDORIAN + "12.59.26 (1).jpeg", "Food security and enterprise product evidence"],
      [YADEN + "12.05.04 (1).jpeg", "Community mobilisation and dialogue evidence"]
    ] },
    { name: "YADEN East Africa", label: "Youth civic evidence", photos: [
      [YADEN + "23.41.47.jpeg", "YADEN East Africa community dialogue session"],
      [YADEN + "23.42.09 (2).jpeg", "YADEN East Africa strategic engagement activity"],
      [YADEN + "12.05.04 (1).jpeg", "YADEN East Africa youth mobilisation workshop"]
    ] },
    { name: "Spills of Eden", label: "Wellness enterprise", photos: [
      [SPILLS + "17.24.02.jpeg", "Spills of Eden nature-based wellness activity"],
      [SPILLS + "23.43.52.jpeg", "Spills of Eden restorative space visit"],
      [SPILLS + "23.43.23 (1).jpeg", "Spills of Eden wellness and local knowledge evidence"]
    ] },
    { name: "My Guardian", label: "Protection pathways", photos: [
      [YADEN + "23.42.05 (1).jpeg", "Community protection dialogue evidence"],
      [YADEN + "23.42.08 (2).jpeg", "Strategic protection and civic engagement evidence"],
      [SPILLS + "17.24.00.jpeg", "Community wellbeing environment evidence"]
    ] },
    { name: "Carledorian", label: "Food enterprise", photos: [
      [CARLEDORIAN + "13.02.37.jpeg", "Carledorian food enterprise display"],
      [CARLEDORIAN + "12.59.28.jpeg", "Carledorian local product and value-chain activity"],
      [CARLEDORIAN + "12.59.27 (2).jpeg", "Carledorian product evidence from partner activity"]
    ] },
    { name: "INTARCH", label: "Participatory design", photos: [
      [INTARCH + "workshop-drawing.jpg", "Young people drawing on large sheets of paper on the floor during an INTARCH design workshop"],
      [INTARCH + "workshop-model.jpg", "A group looking at a handmade site model during an INTARCH participatory design session"],
      [INTARCH + "workshop-group.jpg", "Workshop participants arranging sheets of paper on the floor during an INTARCH group exercise"]
    ] }
  ];

  var stage = document.querySelector("[data-hero-stage]");
  var caption = document.querySelector("[data-hero-caption]");
  var pauseButton = document.querySelector("[data-hero-pause]");

  if (stage && caption) {
    var sequence = [];
    heroPartnerImages.forEach(function (partner) {
      partner.photos.forEach(function (photo) {
        sequence.push({ src: photo[0], alt: photo[1], name: partner.name, label: partner.label });
      });
    });

    var HERO_STEP_MS = 4000;
    var mainIndex = 3; // the photo in the main place; matches the markup in index.html
    var paused = false;
    var offscreen = false;
    var timer = null;
    var lastName = sequence[mainIndex].name;
    var itemAt = function (i) { return sequence[((i % sequence.length) + sequence.length) % sequence.length]; };

    function updateCaption() {
      var item = itemAt(mainIndex);
      caption.children[0].textContent = item.label;
      caption.children[1].textContent = item.name;
      if (item.name !== lastName) {
        caption.classList.remove("is-swapping");
        void caption.offsetWidth;
        caption.classList.add("is-swapping");
      }
      lastName = item.name;
    }

    function stepHero() {
      toArray(stage.children).forEach(function (photo) {
        var next = Number(photo.dataset.pos) + 1;
        photo.dataset.pos = next;
        if (next >= 4) window.setTimeout(function () { photo.remove(); }, 1300);
      });
      mainIndex += 1;
      var item = itemAt(mainIndex + 1);
      var el = document.createElement("div");
      var img = new Image();
      el.className = "hero-photo";
      el.dataset.pos = 0;
      img.src = item.src;
      img.alt = item.alt;
      el.appendChild(img);
      stage.appendChild(el);
      void el.offsetWidth;
      el.dataset.pos = 1;
      updateCaption();
      // warm the cache for the photo after this one
      new Image().src = itemAt(mainIndex + 2).src;
    }

    function syncHero() {
      var shouldRun = !paused && !offscreen && !reduceMotion && !document.hidden;
      if (shouldRun && !timer) timer = window.setInterval(stepHero, HERO_STEP_MS);
      if (!shouldRun && timer) { window.clearInterval(timer); timer = null; }
    }

    if (pauseButton) {
      if (reduceMotion) pauseButton.hidden = true;
      pauseButton.addEventListener("click", function () {
        paused = !paused;
        pauseButton.setAttribute("aria-pressed", String(paused));
        pauseButton.textContent = paused ? "Play" : "Pause";
        syncHero();
      });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { offscreen = !entry.isIntersecting; syncHero(); });
      }).observe(stage);
    }
    document.addEventListener("visibilitychange", syncHero);
    syncHero();
  }

  // ---- Partners: one row open at a time ----
  var partners = toArray(document.querySelectorAll("[data-partner-list] .partner"));
  partners.forEach(function (partner) {
    partner.querySelector(".partner-toggle").addEventListener("click", function () {
      var willOpen = !partner.classList.contains("is-open");
      partners.forEach(function (other) {
        var open = other === partner && willOpen;
        other.classList.toggle("is-open", open);
        other.querySelector(".partner-toggle").setAttribute("aria-expanded", String(open));
      });
    });
  });

  // ---- Evidence stories: open a photo in place ----
  var tiles = toArray(document.querySelectorAll("[data-story-mosaic] .tile"));
  var viewer = document.querySelector("[data-story-viewer]");

  if (viewer && tiles.length) {
    var viewerImage = viewer.querySelector("[data-viewer-image]");
    var viewerTitle = viewer.querySelector("[data-viewer-title]");
    var viewerWho = viewer.querySelector("[data-viewer-who]");
    var viewerCount = viewer.querySelector("[data-viewer-count]");
    var current = 0;
    var lastTile = null;

    function openStory(i) {
      current = (i + tiles.length) % tiles.length;
      var tile = tiles[current];
      var img = tile.querySelector("img");
      viewerImage.classList.remove("is-entering");
      viewerImage.src = img.getAttribute("src");
      viewerImage.alt = img.alt;
      void viewerImage.offsetWidth;
      viewerImage.classList.add("is-entering");
      viewerTitle.textContent = tile.querySelector(".tile-caption").textContent;
      viewerWho.textContent = tile.dataset.who || "";
      viewerCount.textContent = (current + 1) + " of " + tiles.length;
      if (viewer.hidden) {
        viewer.hidden = false;
        viewer.querySelector('[data-viewer-step="1"]').focus({ preventScroll: true });
      }
    }

    function closeStory() {
      viewer.hidden = true;
      if (lastTile) lastTile.focus({ preventScroll: true });
    }

    tiles.forEach(function (tile, i) {
      tile.addEventListener("click", function () { lastTile = tile; openStory(i); });
    });
    toArray(viewer.querySelectorAll("[data-viewer-step]")).forEach(function (button) {
      button.addEventListener("click", function () { openStory(current + Number(button.dataset.viewerStep)); });
    });
    viewer.querySelector("[data-viewer-close]").addEventListener("click", closeStory);
    viewer.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeStory();
      else if (event.key === "ArrowRight") openStory(current + 1);
      else if (event.key === "ArrowLeft") openStory(current - 1);
    });
  }
})();
