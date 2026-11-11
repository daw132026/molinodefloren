// Formulario de contacto: validación de Bootstrap y mensaje de "enviado" (no hay servidor)
const formContacto = document.getElementById("form-contacto");
const avisoOk = document.getElementById("contacto-ok");

// Si venimos de "Regalar" o "Celebraciones", rellenamos el asunto
const asunto = new URLSearchParams(location.search).get("asunto");
if (asunto) document.getElementById("c-asunto").value = asunto;

formContacto.addEventListener("submit", (evento) => {
  evento.preventDefault();
  formContacto.classList.add("was-validated");
  if (!formContacto.checkValidity()) return;

  avisoOk.hidden = false;
  formContacto.reset();
  formContacto.classList.remove("was-validated");
  avisoOk.scrollIntoView({ behavior: "smooth", block: "center" });
});
