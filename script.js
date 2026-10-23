const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu');
const links = document.querySelector('#navLinks');
const progress = document.querySelector('#progress');
function closeMenu(restoreFocus = false) {
  links.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
  document.body.classList.remove('menu-open');
  if (restoreFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = !links.classList.contains('open');
  links.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
  document.body.classList.toggle('menu-open', open);
  if (open) links.querySelector('a').focus();
});
links.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (!links.classList.contains('open')) return;
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === 'Tab') {
    const last = links.querySelector('a:last-child');
    const first = links.querySelector('a');
    if (event.shiftKey && document.activeElement === menu) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); menu.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); menu.focus();
    } else if (!event.shiftKey && document.activeElement === menu) {
      event.preventDefault(); first.focus();
    }
  }
});
window.addEventListener('resize', () => { if (innerWidth > 800) closeMenu(); });
function updateProgress() {
  nav.classList.toggle('scrolled', scrollY > 18);
  const maximum = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${maximum > 0 ? scrollY / maximum : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
document.querySelector('#year').textContent = new Date().getFullYear();
