// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// TIMELINE: animate events on load
const events = document.querySelectorAll(".timeline-event");
events.forEach((event, index) => {
  setTimeout(() => {
    event.classList.add("visible");
  }, index * 200);
});

// MAIN ACCORDION
const headers = document.querySelectorAll(".event-header");
headers.forEach(header => {
  header.addEventListener("click", () => {
    const eventText = header.closest(".event-text");
    const isOpen = eventText.classList.contains("open");
    document.querySelectorAll(".event-text.open").forEach(el => el.classList.remove("open"));
    if (!isOpen) eventText.classList.add("open");
  });
});

// SUB-TOGGLES
const subHeaders = document.querySelectorAll(".sub-toggle-header");
subHeaders.forEach(header => {
  header.addEventListener("click", (e) => {
    e.stopPropagation();
    header.closest(".sub-toggle").classList.toggle("open");
  });
});

// MODAL WITH GALLERY
const modal       = document.getElementById("imageModal");
const modalImg    = document.getElementById("modalImage");
const modalClose  = document.getElementById("modalClose");
const modalPrev   = document.getElementById("modalPrev");
const modalNext   = document.getElementById("modalNext");
const modalCounter= document.getElementById("modalCounter");

let gallery = [];
let currentIndex = 0;

function openModal(images, startIndex) {
  gallery = images;
  currentIndex = startIndex;
  updateModal();
  modal.style.display = "flex";
}

function updateModal() {
  modalImg.src = gallery[currentIndex];
  modalCounter.textContent = gallery.length > 1
    ? `${currentIndex + 1} / ${gallery.length}`
    : "";
  modalPrev.disabled = currentIndex === 0;
  modalNext.disabled = currentIndex === gallery.length - 1;
}

// Attach click to every sub-book image
document.querySelectorAll(".sub-book img").forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    // Read gallery from data-gallery, fallback to just the src
    let images;
    try {
      images = JSON.parse(img.dataset.gallery || "[]");
    } catch(e) {
      images = [];
    }
    if (!images.length) images = [img.src];
    openModal(images, 0);
  });
});

modalPrev.addEventListener("click", () => {
  if (currentIndex > 0) { currentIndex--; updateModal(); }
});

modalNext.addEventListener("click", () => {
  if (currentIndex < gallery.length - 1) { currentIndex++; updateModal(); }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (modal.style.display !== "flex") return;
  if (e.key === "ArrowLeft")  { if (currentIndex > 0) { currentIndex--; updateModal(); } }
  if (e.key === "ArrowRight") { if (currentIndex < gallery.length - 1) { currentIndex++; updateModal(); } }
  if (e.key === "Escape")     { modal.style.display = "none"; }
});

modalClose.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});