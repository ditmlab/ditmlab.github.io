(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const openBtn = document.querySelector("[data-nav-open]");
  const closeBtn = document.querySelector("[data-nav-close]");
  const backdrop = document.querySelector("[data-nav-backdrop]");
  const drawer = document.querySelector("[data-nav-drawer]");
  const hashLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

  // People modal
  const personModal = document.querySelector("[data-person-modal]");
  const personModalBackdrop = document.querySelector("[data-person-modal-backdrop]");
  const personModalClose = document.querySelector("[data-person-modal-close]");
  const personModalName = document.querySelector("[data-person-modal-name]");
  const personModalRole = document.querySelector("[data-person-modal-role]");
  const personModalTags = document.querySelector("[data-person-modal-tags]");
  const personModalPhoto = document.querySelector("[data-person-modal-photo]");
  const personModalAchievements = document.querySelector("[data-person-modal-achievements]");
  const personModalEmpty = document.querySelector("[data-person-modal-empty]");

  // PI modal
  const piModal = document.querySelector("[data-pi-modal]");
  const piModalBackdrop = document.querySelector("[data-pi-modal-backdrop]");
  const piModalClose = document.querySelector("[data-pi-modal-close]");
  const piModalName = document.querySelector("[data-pi-modal-name]");
  const piModalTitle = document.querySelector("[data-pi-modal-title]");
  const piModalTags = document.querySelector("[data-pi-modal-tags]");
  const piModalPhoto = document.querySelector("[data-pi-modal-photo]");
  const piModalEmail = document.querySelector("[data-pi-modal-email]");
  const piModalWebsite = document.querySelector("[data-pi-modal-website]");
  const piModalOffice = document.querySelector("[data-pi-modal-office]");
  const piModalCareerSection = document.querySelector("[data-pi-modal-career-section]");
  const piModalCareer = document.querySelector("[data-pi-modal-career]");

  // Gallery modal
  const galleryModal = document.querySelector("[data-gallery-modal]");
  const galleryModalBackdrop = document.querySelector("[data-gallery-modal-backdrop]");
  const galleryModalClose = document.querySelector("[data-gallery-modal-close]");
  const galleryModalImg = document.querySelector("[data-gallery-modal-img]");
  const galleryModalTitle = document.querySelector("[data-gallery-modal-title]");
  const galleryModalDate = document.querySelector("[data-gallery-modal-date]");
  const galleryModalCaption = document.querySelector("[data-gallery-modal-caption]");
  const galleryPrev = document.querySelector("[data-gallery-prev]");
  const galleryNext = document.querySelector("[data-gallery-next]");
  const galleryOpenOriginal = document.querySelector("[data-gallery-open-original]");

  let galleryIndex = 0;

  let lastFocusEl = null;

  const setPersonModalOpen = (open) => {
    if (!personModal || !personModalBackdrop) return;
    personModal.hidden = !open;
    personModalBackdrop.hidden = !open;
    personModal.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("modal-open", open);

    if (open) {
      lastFocusEl = document.activeElement;
      personModalClose?.focus();
    } else {
      if (lastFocusEl && typeof lastFocusEl.focus === "function") lastFocusEl.focus();
      lastFocusEl = null;
    }
  };

  const closePersonModal = () => setPersonModalOpen(false);

  const setPiModalOpen = (open) => {
    if (!piModal || !piModalBackdrop) return;
    piModal.hidden = !open;
    piModalBackdrop.hidden = !open;
    piModal.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("modal-open", open);
    if (open) {
      lastFocusEl = document.activeElement;
      piModalClose?.focus();
    } else {
      if (lastFocusEl && typeof lastFocusEl.focus === "function") lastFocusEl.focus();
      lastFocusEl = null;
    }
  };

  const closePiModal = () => setPiModalOpen(false);

  const renderPiModal = (pi) => {
    if (!piModal) return;
    const name = pi?.name_ko || "교수";
    const title = pi?.title || "";
    const photo = pi?.photo || "/assets/img/avatar-placeholder.svg";
    const tags = (pi?.interests ? String(pi.interests).split(",").map((s) => s.trim()).filter(Boolean) : []);

    if (piModalName) piModalName.textContent = pi?.name_en ? `${name} (${pi.name_en})` : name;
    if (piModalTitle) piModalTitle.textContent = title;
    if (piModalPhoto) piModalPhoto.setAttribute("src", photo);
    if (piModalTags) piModalTags.innerHTML = tags.map((t) => `<span class="tag">${t}</span>`).join("");

    if (piModalEmail) {
      const email = pi?.email ? String(pi.email) : "";
      piModalEmail.textContent = email || "-";
      piModalEmail.setAttribute("href", email ? `mailto:${email}` : "#");
    }

    if (piModalWebsite) {
      const website = pi?.website ? String(pi.website) : "";
      piModalWebsite.textContent = website ? website.replace(/^https?:\/\//, "") : "-";
      piModalWebsite.setAttribute("href", website || "#");
    }

    if (piModalOffice) {
      const office = pi?.office ? String(pi.office) : "";
      const studentLab = pi?.student_lab ? String(pi.student_lab) : "";
      piModalOffice.textContent = [office, studentLab].filter(Boolean).join(" / ") || "-";
    }

    const career = pi?.career ? String(pi.career) : "";
    if (piModalCareerSection && piModalCareer) {
      piModalCareer.innerHTML = "";
      if (!career) {
        piModalCareerSection.hidden = true;
      } else {
        piModalCareerSection.hidden = false;
        career.split(" / ").map((s) => s.trim()).filter(Boolean).forEach((item) => {
          const li = document.createElement("li");
          li.className = "pi-career-item";
          li.textContent = item;
          piModalCareer.appendChild(li);
        });
      }
    }
  };

  const setGalleryModalOpen = (open) => {
    if (!galleryModal || !galleryModalBackdrop) return;
    galleryModal.hidden = !open;
    galleryModalBackdrop.hidden = !open;
    galleryModal.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("modal-open", open);
    if (open) {
      lastFocusEl = document.activeElement;
      galleryModalClose?.focus();
    } else {
      if (lastFocusEl && typeof lastFocusEl.focus === "function") lastFocusEl.focus();
      lastFocusEl = null;
    }
  };

  const closeGalleryModal = () => setGalleryModalOpen(false);

  const renderGalleryModal = (idx) => {
    const list = window.__ditmGallery;
    if (!Array.isArray(list) || list.length === 0) return;
    galleryIndex = ((idx % list.length) + list.length) % list.length;
    const item = list[galleryIndex] || {};
    const title = item.title || "사진";
    const date = item.date || "";
    const caption = item.caption || "";
    const image = item.image || "";

    if (galleryModalImg) galleryModalImg.src = image;
    if (galleryModalTitle) galleryModalTitle.textContent = title;
    if (galleryModalDate) galleryModalDate.textContent = date;
    if (galleryModalCaption) galleryModalCaption.textContent = caption;
    if (galleryOpenOriginal) galleryOpenOriginal.href = image || "#";
  };

  const renderPersonModal = (person) => {
    if (!personModal) return;

    const name = person?.name_ko || "구성원";
    const role = person?.role || "";
    const photo = person?.photo || "/assets/img/avatar-placeholder.svg";
    const tags = Array.isArray(person?.tags) ? person.tags : [];
    const achievements = Array.isArray(person?.achievements) ? person.achievements : [];

    if (personModalName) personModalName.textContent = name;
    if (personModalRole) personModalRole.textContent = role;
    if (personModalPhoto) personModalPhoto.setAttribute("src", photo);

    if (personModalTags) {
      personModalTags.innerHTML = tags.map((t) => `<span class="tag">${String(t)}</span>`).join("");
    }

    if (personModalAchievements && personModalEmpty) {
      personModalAchievements.innerHTML = "";

      if (achievements.length === 0) {
        personModalEmpty.hidden = false;
        return;
      }

      personModalEmpty.hidden = true;

      const sorted = [...achievements].sort((a, b) => {
        const ay = Number(a?.year) || 0;
        const by = Number(b?.year) || 0;
        return by - ay;
      });

      const normalizeIndexLabel = (s) => String(s || "").trim().toUpperCase();
      const getIndexes = (a) => {
        if (!a) return [];
        if (Array.isArray(a.indexes)) return a.indexes.map(normalizeIndexLabel).filter(Boolean);
        const flags = [];
        if (a.kci) flags.push("KCI");
        if (a.ssci) flags.push("SSCI");
        if (a.ft50) flags.push("FT50");
        if (a.utd24) flags.push("UTD24");
        return flags;
      };

      sorted.forEach((a) => {
        const year = a?.year ? String(a.year) : "";
        const type = a?.type ? String(a.type) : "";
        const title = a?.title ? String(a.title) : "";
        const note = a?.note ? String(a.note) : "";
        const url = a?.url ? String(a.url) : "";
        const journal = a?.journal ? String(a.journal) : (a?.venue ? String(a.venue) : "");
        const indexes = getIndexes(a);

        const li = document.createElement("li");
        li.className = "ach-item";

        const meta = document.createElement("div");
        meta.className = "ach-meta";
        if (year) {
          const y = document.createElement("span");
          y.className = "ach-year";
          y.textContent = year;
          meta.appendChild(y);
        }
        if (type) {
          const t = document.createElement("span");
          t.className = "ach-type";
          t.textContent = type;
          meta.appendChild(t);
        }
        if (meta.childNodes.length) li.appendChild(meta);

        const h = document.createElement("div");
        h.className = "ach-title";
        if (url) {
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "inline-link";
          link.textContent = title || "성과";
          h.appendChild(link);
        } else {
          h.textContent = title || "성과";
        }
        li.appendChild(h);

        if (journal || (indexes && indexes.length)) {
          const v = document.createElement("div");
          v.className = "ach-venue";
          const bits = [];
          if (journal) bits.push(journal);
          if (indexes && indexes.length) {
            const chips = indexes.map((x) => `<span class="ach-index">${x}</span>`).join("");
            bits.push(`<span class="ach-indexes">${chips}</span>`);
          }
          v.innerHTML = bits.join(" ");
          li.appendChild(v);
        }

        if (note) {
          const n = document.createElement("div");
          n.className = "ach-note";
          n.textContent = note;
          li.appendChild(n);
        }

        personModalAchievements.appendChild(li);
      });
    }
  };

  const findPersonById = (id) => {
    if (!id) return null;
    const data = window.__ditmMembers;
    if (!data) return null;

    const buckets = [
      ...(Array.isArray(data?.current?.visiting) ? data.current.visiting : []),
      ...(Array.isArray(data?.current?.phd) ? data.current.phd : []),
      ...(Array.isArray(data?.current?.ms) ? data.current.ms : []),
      ...(Array.isArray(data?.alumni) ? data.alumni : []),
    ];
    return buckets.find((p) => p && String(p.id) === String(id)) || null;
  };

  const setNavOpen = (open) => {
    body.classList.toggle("nav-open", open);
    if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
    if (drawer) drawer.setAttribute("aria-hidden", String(!open));
  };

  // Best-effort: discourage image saving (cannot fully prevent screenshots).
  document.addEventListener("contextmenu", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-no-save]")) e.preventDefault();
  });

  document.addEventListener("dragstart", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-no-save]")) e.preventDefault();
  });

  const closeNav = () => setNavOpen(false);

  openBtn?.addEventListener("click", () => setNavOpen(!body.classList.contains("nav-open")));
  closeBtn?.addEventListener("click", closeNav);
  backdrop?.addEventListener("click", closeNav);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // Close modal first if open, otherwise close nav.
      if (galleryModal && !galleryModal.hidden) closeGalleryModal();
      else if (piModal && !piModal.hidden) closePiModal();
      else if (personModal && !personModal.hidden) closePersonModal();
      else closeNav();
    }

    if (galleryModal && !galleryModal.hidden) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        renderGalleryModal(galleryIndex - 1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        renderGalleryModal(galleryIndex + 1);
        return;
      }
    }
  });

  // Close drawer after clicking a link
  document.querySelectorAll(".drawer a").forEach((a) => {
    a.addEventListener("click", () => closeNav());
  });

  // People modal event wiring (delegated)
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // Gallery open
    const galleryEl = target.closest(".js-gallery-open");
    if (galleryEl) {
      e.preventDefault();
      const idx = Number(galleryEl.getAttribute("data-gallery-index") || "0");
      renderGalleryModal(idx);
      setGalleryModalOpen(true);
      return;
    }

    // PI modal open
    if (target.closest(".js-pi-more")) {
      const pi = window.__ditmPi || {};
      renderPiModal(pi);
      setPiModalOpen(true);
      return;
    }

    const openEl = target.closest(".js-person-more");
    if (openEl) {
      const id = openEl.getAttribute("data-person-id") || "";
      if (id) {
        const person = findPersonById(id) || {};
        renderPersonModal(person);
        setPersonModalOpen(true);
      } else {
        // Back-compat: older markup embedded the full JSON on the button.
        const raw = openEl.getAttribute("data-person") || "{}";
        try {
          const person = JSON.parse(raw);
          renderPersonModal(person);
          setPersonModalOpen(true);
        } catch {
          renderPersonModal({});
          setPersonModalOpen(true);
        }
      }
      return;
    }

    if (target.closest("[data-person-modal-close]")) {
      closePersonModal();
      return;
    }

    if (target.closest("[data-pi-modal-close]")) {
      closePiModal();
      return;
    }

    if (target.closest("[data-gallery-modal-close]")) {
      closeGalleryModal();
      return;
    }

    if (target.matches("[data-person-modal-backdrop]")) {
      closePersonModal();
      return;
    }

    if (target.matches("[data-pi-modal-backdrop]")) {
      closePiModal();
      return;
    }

    if (target.matches("[data-gallery-modal-backdrop]")) {
      closeGalleryModal();
      return;
    }
  });

  galleryPrev?.addEventListener("click", () => {
    renderGalleryModal(galleryIndex - 1);
  });

  galleryNext?.addEventListener("click", () => {
    renderGalleryModal(galleryIndex + 1);
  });

  // Header shadow after scroll
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight current page in nav (multi-page)
  const pathParts = window.location.pathname.toLowerCase().split("/").filter(Boolean);
  const lastPart = pathParts.length ? pathParts[pathParts.length - 1] : "";
  // For "pretty" permalinks (ending with /), lastPart will be a directory name.
  // Only default to index.html for the site root.
  const currentPath = lastPart || "index.html";
  const pageLinks = Array.from(document.querySelectorAll(".nav a, .drawer a"));
  pageLinks.forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
    const normalized = href.split("?")[0].split("#")[0].split("/").pop()?.toLowerCase();
    if (normalized && normalized === currentPath) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  // Improve anchor scroll offset for browsers without scroll-padding support
  hashLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      // Let the browser do its thing if it supports scroll-margin/scroll-padding well.
      // This is a safe fallback: prevent default and compute offset.
      e.preventDefault();
      const headerH = header?.offsetHeight ?? 72;
      const y = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", href);
    });
  });

  // Publications: toggle whether featured papers appear in the "All" list.
  const pubAll = document.querySelector(".pub-all");
  const pubToggle = document.querySelector("[data-pub-include-featured]");
  if (pubAll && pubToggle instanceof HTMLInputElement) {
    const storageKey = "ditm_pub_include_featured";
    const stored = window.localStorage?.getItem(storageKey);
    const initial = stored == null ? true : stored === "1";

    const apply = (includeFeatured) => {
      pubAll.setAttribute("data-include-featured", includeFeatured ? "true" : "false");
      pubToggle.checked = includeFeatured;
      try {
        window.localStorage?.setItem(storageKey, includeFeatured ? "1" : "0");
      } catch {
        // ignore
      }
    };

    apply(initial);
    pubToggle.addEventListener("change", () => apply(pubToggle.checked));
  }
})();
