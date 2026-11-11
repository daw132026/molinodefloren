// Ruedas de molino (logo, ornamentos, footer): giran despacio de forma continua
// y aceleran con el scroll (0,4º por píxel). data-giro cambia sentido/velocidad.
const ruedas = [...document.querySelectorAll(".rueda-giro")].map((el) => ({
  el,
  factor: Number(el.dataset.giro || 1),
}));
const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

function girarRuedas(tiempo) {
  const base = sinMovimiento.matches ? 0 : tiempo * 0.012; // ~12º por segundo
  const angulo = base + window.scrollY * 0.4;
  for (const { el, factor } of ruedas) {
    el.style.transform = `rotate(${angulo * factor}deg)`;
  }
  requestAnimationFrame(girarRuedas);
}
if (ruedas.length) requestAnimationFrame(girarRuedas);

// Campos de fecha del buscador: muestran "30 / Octubre" como en el diseño
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Pinta "30 / Octubre"; el CSS muestra "30 / Oct" cuando el campo es estrecho
function pintarFecha(etiqueta, valor) {
  if (!valor) { etiqueta.textContent = "—"; return; }
  const [, mes, dia] = valor.split("-");
  const nombre = MESES[Number(mes) - 1];
  etiqueta.replaceChildren(
    `${dia} / `,
    Object.assign(document.createElement("span"), { className: "mes-largo", textContent: nombre }),
    Object.assign(document.createElement("span"), { className: "mes-corto", textContent: nombre.slice(0, 3) }),
  );
}

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

document.querySelectorAll(".campo-fecha input[type=date]").forEach((input) => {
  const etiqueta = document.querySelector(`.valor[data-para="${input.id}"]`);
  const pintar = () => pintarFecha(etiqueta, input.value);
  input.addEventListener("change", pintar);
  input.addEventListener("click", () => { try { input.showPicker(); } catch (e) { /* navegador sin showPicker */ } });
  pintar();
});

// El check-out nunca puede ser anterior al check-in
if (checkin && checkout) {
  // Nunca proponemos fechas pasadas: si la del HTML ya pasó, usamos mañana y pasado mañana
  const hoy = new Date().toISOString().slice(0, 10);
  checkin.min = hoy;
  if (checkin.value < hoy) {
    const dia = (n) => { const f = new Date(); f.setDate(f.getDate() + n); return f.toISOString().slice(0, 10); };
    checkin.value = dia(1);
    checkout.value = dia(3);
    checkin.dispatchEvent(new Event("change"));
    checkout.dispatchEvent(new Event("change"));
  }

  const sincronizar = () => {
    checkout.min = checkin.value;
    if (checkout.value < checkin.value) {
      checkout.value = checkin.value;
      checkout.dispatchEvent(new Event("change"));
    }
  };
  checkin.addEventListener("change", sincronizar);
  sincronizar();
}

// Altura del hero: la justa para que el buscador se vea ENTERO al abrir la web,
// sin pasarse de los límites --hero-min / --hero-max que marca el CSS en cada tamaño.
const hero = document.querySelector(".hero");
const buscador = document.querySelector(".buscador");
const tarjetaBuscador = document.querySelector(".buscador-card");
let anchoAnterior = 0;

function ajustarHero(forzar = false) {
  if (!hero || !buscador || !tarjetaBuscador) return;
  // En móvil la barra del navegador cambia la altura al hacer scroll: solo recalculamos si cambia el ancho
  if (!forzar && window.innerWidth === anchoAnterior) return;
  anchoAnterior = window.innerWidth;

  hero.style.height = "";
  const estilos = getComputedStyle(hero);
  const minimo = parseFloat(estilos.getPropertyValue("--hero-min")) || 400;
  const maximo = parseFloat(estilos.getPropertyValue("--hero-max")) || 820;
  const solape = -parseFloat(getComputedStyle(buscador).marginTop) || 0;
  const inicioHero = hero.getBoundingClientRect().top + window.scrollY;
  const margen = 20; // aire bajo la tarjeta
  const libre = window.innerHeight - inicioHero - (tarjetaBuscador.offsetHeight - solape) - margen;

  hero.style.height = `${Math.round(Math.min(maximo, Math.max(minimo, libre)))}px`;
}

ajustarHero(true);
window.addEventListener("resize", () => ajustarHero());
document.fonts?.ready.then(() => ajustarHero(true));
