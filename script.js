// =========================
// HAMBURGER MENU
// =========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function toggleMenu() {
  navLinks.classList.toggle("active");
}

hamburger?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});


// =========================
// TIMELINE ANIMATION
// =========================
const timelineEvents = document.querySelectorAll(".timeline-event");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

timelineEvents.forEach(event => observer.observe(event));


// =========================
// MAIN TOGGLES
// =========================
document.querySelectorAll(".event-header").forEach(header => {
  header.addEventListener("click", () => {
    const block = header.closest(".event-text");
    const isOpen = block.classList.contains("open");

    document.querySelectorAll(".event-text.open")
      .forEach(el => el.classList.remove("open"));

    if (!isOpen) block.classList.add("open");
  });
});


// =========================
// SUB TOGGLES
// =========================
document.querySelectorAll(".sub-toggle-header").forEach(header => {
  header.addEventListener("click", (e) => {
    e.stopPropagation();
    header.closest(".sub-toggle").classList.toggle("open");
  });
});


// =========================
// IMAGE MODAL (TIMELINE ONLY)
// =========================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const modalCounter = document.getElementById("modalCounter");

let currentImages = [];
let currentIndex = 0;


// open modal
function openModal(images, index = 0) {
  currentImages = images;
  currentIndex = index;

  updateModal();
  modal.classList.add("active");
}

// update modal view
function updateModal() {
  if (!currentImages.length) return;

  modalImg.src = currentImages[currentIndex];

  if (modalCounter) {
    modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  // optional: disable arrows at ends (or you can wrap instead)
  modalPrev.style.opacity = currentIndex === 0 ? "0.3" : "1";
  modalNext.style.opacity = currentIndex === currentImages.length - 1 ? "0.3" : "1";
}

// close modal
function closeModal() {
  modal.classList.remove("active");
  modalImg.src = "";
  currentImages = [];
  currentIndex = 0;
}


// =========================
// MODAL EVENTS
// =========================

// close
modalClose?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "Escape") closeModal();

  if (e.key === "ArrowRight") {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      updateModal();
    }
  }

  if (e.key === "ArrowLeft") {
    if (currentIndex > 0) {
      currentIndex--;
      updateModal();
    }
  }
});


// =========================
// MODAL ARROW BUTTONS (FIXED)
// =========================
modalNext?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentIndex < currentImages.length - 1) {
    currentIndex++;
    updateModal();
  }
});

modalPrev?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentIndex > 0) {
    currentIndex--;
    updateModal();
  }
});


// =========================
// TIMELINE IMAGE GALLERY (FIXED)
// =========================
document.querySelectorAll(".sub-book-img-container img").forEach(img => {
  img.style.cursor = "pointer";

  img.addEventListener("click", () => {
    const gallery = img.getAttribute("data-gallery");

    if (!gallery) return;

    const images = JSON.parse(gallery);

    // find correct index inside gallery (important fix)
    const clickedSrc = img.getAttribute("src");
    let index = images.indexOf(clickedSrc);
    if (index === -1) index = 0;

    openModal(images, index);
  });
});