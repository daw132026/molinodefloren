// Reserva en 3 pasos: 1) fechas y habitación · 2) datos · 3) confirmación
// Es una simulación para clase: no hay servidor, la reserva se guarda en localStorage.

const PRECIO_DESAYUNO = 8; // € por persona y noche
const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const reserva = { checkin: "", checkout: "", personas: 2, habitacion: null, desayuno: false };

// ---------- Utilidades de fechas ----------
const aISO = (fecha) => fecha.toISOString().slice(0, 10);
const sumarDias = (iso, dias) => { const f = new Date(iso + "T12:00:00"); f.setDate(f.getDate() + dias); return aISO(f); };
const noches = () => Math.round((new Date(reserva.checkout) - new Date(reserva.checkin)) / 86400000);
const fechaBonita = (iso) => { const [a, m, d] = iso.split("-"); return `${Number(d)} ${MESES_CORTOS[m - 1]} ${a}`; };
const euros = (n) => `${n.toLocaleString("es-ES")} €`;

// Disponibilidad simulada: según las fechas, alguna habitación aparece ocupada
const ocupada = (hab) => (hab.n + Number(reserva.checkin.slice(-2))) % 5 === 0;

// ---------- Elementos ----------
const formFechas = document.getElementById("form-fechas");
const inCheckin = document.getElementById("r-checkin");
const inCheckout = document.getElementById("r-checkout");
const inPersonas = document.getElementById("r-adultos");
const lista = document.getElementById("lista-habitaciones");
const infoBusqueda = document.getElementById("info-busqueda");
const formDatos = document.getElementById("form-datos");
const checkDesayuno = document.getElementById("r-desayuno");

// ---------- Valores iniciales (pueden venir del buscador de la portada) ----------
const params = new URLSearchParams(location.search);
const hoy = aISO(new Date());
reserva.checkin = params.get("checkin") >= hoy ? params.get("checkin") : sumarDias(hoy, 1);
reserva.checkout = params.get("checkout") > reserva.checkin ? params.get("checkout") : sumarDias(reserva.checkin, 2);
reserva.personas = Number(params.get("adultos")) || 2;
const habitacionPedida = Number(params.get("habitacion")) || null;

inCheckin.min = hoy;
inCheckin.value = reserva.checkin;
inCheckout.min = sumarDias(reserva.checkin, 1);
inCheckout.value = reserva.checkout;
inPersonas.value = String(Math.min(4, reserva.personas));

inCheckin.addEventListener("change", () => {
  inCheckout.min = sumarDias(inCheckin.value, 1);
  if (inCheckout.value <= inCheckin.value) inCheckout.value = sumarDias(inCheckin.value, 1);
});

// ---------- Paso 1: lista de habitaciones ----------
function pintarHabitaciones() {
  const n = noches();
  infoBusqueda.textContent = `${fechaBonita(reserva.checkin)} → ${fechaBonita(reserva.checkout)} · ${n} ${n === 1 ? "noche" : "noches"} · ${reserva.personas} ${reserva.personas === 1 ? "persona" : "personas"}`;

  const aptas = HABITACIONES.filter((h) => h.cap >= reserva.personas);
  // La habitación pedida desde "Habitaciones" sale la primera
  aptas.sort((a, b) => (b.n === habitacionPedida) - (a.n === habitacionPedida));

  lista.innerHTML = aptas.map((h) => {
    const libre = !ocupada(h);
    return `
      <article class="opcion-hab${libre ? "" : " no-disponible"}">
        <img src="${h.foto}" alt="Habitación ${h.n} ${h.nombre}" loading="lazy">
        <div class="opcion-cuerpo">
          <p class="eyebrow mb-0">Habitación ${h.n}${h.n === habitacionPedida ? " · Su elección" : ""}</p>
          <h3>${h.nombre}</h3>
          <p class="mb-0 texto-suave">${h.tipo} · ${h.camas} · hasta ${h.cap} personas</p>
          <div class="hab-pie">
            <p class="precio mb-0">${euros(h.precio * n)}<small>${n} ${n === 1 ? "noche" : "noches"} · ${h.precio} € / noche</small></p>
            ${libre
              ? `<button class="btn btn-molino btn-pequeno" type="button" data-elegir="${h.n}">Elegir</button>`
              : `<span class="eyebrow">No disponible</span>`}
          </div>
        </div>
      </article>`;
  }).join("") || `<p class="text-center">No hay habitaciones para ${reserva.personas} personas. Pruebe con menos personas.</p>`;
}

formFechas.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!formFechas.checkValidity() || inCheckout.value <= inCheckin.value) {
    formFechas.classList.add("was-validated");
    return;
  }
  reserva.checkin = inCheckin.value;
  reserva.checkout = inCheckout.value;
  reserva.personas = Number(inPersonas.value);
  pintarHabitaciones();
});

lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-elegir]");
  if (!boton) return;
  reserva.habitacion = HABITACIONES.find((h) => h.n === Number(boton.dataset.elegir));
  pintarResumen(document.getElementById("resumen"));
  irAPaso(2);
});

// ---------- Paso 2: resumen y datos ----------
function total() {
  const n = noches();
  return reserva.habitacion.precio * n + (reserva.desayuno ? PRECIO_DESAYUNO * reserva.personas * n : 0);
}

function pintarResumen(contenedor) {
  const h = reserva.habitacion;
  const n = noches();
  contenedor.innerHTML = `
    <h3>Su reserva</h3>
    <dl>
      <dt>Habitación</dt><dd>${h.n} · ${h.nombre}</dd>
      <dt>Tipo</dt><dd>${h.tipo}</dd>
      <dt>Entrada</dt><dd>${fechaBonita(reserva.checkin)}</dd>
      <dt>Salida</dt><dd>${fechaBonita(reserva.checkout)}</dd>
      <dt>Personas</dt><dd>${reserva.personas}</dd>
      <dt>Alojamiento</dt><dd>${euros(h.precio * n)}</dd>
      ${reserva.desayuno ? `<dt>Desayuno</dt><dd>${euros(PRECIO_DESAYUNO * reserva.personas * n)}</dd>` : ""}
    </dl>
    <div class="total"><span class="eyebrow">Total</span><span class="precio">${euros(total())}</span></div>`;
}

checkDesayuno.addEventListener("change", () => {
  reserva.desayuno = checkDesayuno.checked;
  pintarResumen(document.getElementById("resumen"));
});

document.getElementById("volver-1").addEventListener("click", () => irAPaso(1));

formDatos.addEventListener("submit", (evento) => {
  evento.preventDefault();
  formDatos.classList.add("was-validated");
  if (!formDatos.checkValidity()) return;

  const localizador = "MF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const guardada = {
    localizador,
    ...reserva,
    habitacion: reserva.habitacion.n,
    nombre: `${document.getElementById("r-nombre").value} ${document.getElementById("r-apellidos").value}`,
    email: document.getElementById("r-email").value,
    total: total(),
  };
  try {
    const anteriores = JSON.parse(localStorage.getItem("reservas") || "[]");
    localStorage.setItem("reservas", JSON.stringify([...anteriores, guardada]));
  } catch (e) { /* sin localStorage: la reserva se muestra igualmente */ }

  document.getElementById("localizador").textContent = localizador;
  pintarResumen(document.getElementById("resumen-final"));
  irAPaso(3);
});

// ---------- Navegación entre pasos ----------
function irAPaso(numero) {
  [1, 2, 3].forEach((p) => { document.getElementById(`paso-${p}`).hidden = p !== numero; });
  document.querySelectorAll(".pasos li").forEach((li) => {
    const p = Number(li.dataset.paso);
    li.classList.toggle("activo", p === numero);
    li.classList.toggle("hecho", p < numero);
  });
  document.querySelector(".pasos").scrollIntoView({ behavior: "smooth", block: "center" });
}

pintarHabitaciones();
