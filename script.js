const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
navLinks.classList.toggle("active");
});

// AJATELG

const timelineBox = document.getElementById('timelineBox');
const timelineContainer = document.getElementById('timelineContainer');
const collapseButton = document.getElementById('collapseButton');
const events = document.querySelectorAll('.timeline-event');

// Expand timeline
timelineBox.addEventListener('click', () => {
  timelineContainer.style.display = 'block';
  timelineContainer.scrollIntoView({ behavior: 'smooth' });
  timelineBox.style.display = 'none';

  // Animate events sequentially
  events.forEach((event, index) => {
    setTimeout(() => {
      event.classList.add('visible');
    }, index * 300);
  });
});

// Collapse timeline
collapseButton.addEventListener('click', () => {
  events.forEach(event => event.classList.remove('visible'));
  timelineBox.style.display = 'block';
  timelineBox.scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    timelineContainer.style.display = 'none';
  }, 600);
});
