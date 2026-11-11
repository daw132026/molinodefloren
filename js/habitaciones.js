// Filtro de habitaciones por tipo (Todas / Dobles / Familiares / Abuhardillada)
const filtros = document.querySelectorAll(".filtro");
const columnas = document.querySelectorAll(".hab-col");

filtros.forEach((boton) => {
  boton.addEventListener("click", () => {
    const tipo = boton.dataset.filtro;

    filtros.forEach((b) => {
      b.classList.toggle("active", b === boton);
      b.setAttribute("aria-pressed", b === boton);
    });

    columnas.forEach((col) => {
      col.classList.toggle("hab-oculta", tipo !== "todas" && col.dataset.cat !== tipo);
    });
  });
});
