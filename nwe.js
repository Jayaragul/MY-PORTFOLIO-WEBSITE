// Toggle dark mode
const toggleBtn = document.getElementById("toggleDarkMode");
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Typed effect for name
const typedName = document.getElementById("typed-name");
const fullName = "Jaya Ragul";
let index = 0;

function type() {
  if (index < fullName.length) {
    typedName.textContent += fullName.charAt(index);
    index++;
    setTimeout(type, 150);
  }
}
type();

// Lucide icons
lucide.createIcons();
function animateCountUp() {
  const counters = document.querySelectorAll('.count-up');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        let count = 0;
        const step = Math.ceil(target / 40);

        const update = () => {
          if (count < target) {
            count += step;
            el.textContent = count > target ? target : count;
            requestAnimationFrame(update);
          } else {
            el.textContent = target + (el.dataset.count.includes('%') ? '%' : '');
          }
        };
        update();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCountUp);
lucide.createIcons();
