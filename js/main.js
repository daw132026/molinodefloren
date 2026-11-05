// La rueda del logo gira según el scroll (0,4º por píxel)
const rueda = document.querySelector(".navbar-brand .rueda");
let pendiente = false;
window.addEventListener("scroll", () => {
  if (pendiente) return;
  pendiente = true;
  requestAnimationFrame(() => {
    rueda.style.transform = `rotate(${window.scrollY * 0.4}deg)`;
    pendiente = false;
  });
}, { passive: true });
