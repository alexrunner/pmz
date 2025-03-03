document.addEventListener('DOMContentLoaded', function() {
  const data = [
    { nombre: "Beatriz López Diosdado", cargo: "Regidor", area: "Regidor", ext: "110", telefono: "4924914432" },
    { nombre: "David Arturo García Lira", cargo: "Regidor", area: "Regidor", ext: "112", telefono: "492 923 94 21" },
    { nombre: "M. EN E Claudia Anaya Vázquez", cargo: "Regidor", area: "Regidor", ext: "789", telefono: "492 923 94 21" },
    { nombre: "Christian Martínez Rosales", cargo: "Regidor", area: "Regidor", ext: "118", telefono: "492 923 94 21" },
    { nombre: "Carmen Angélica Lira Sandoval", cargo: "Regidor", area: "Regidor", ext: "120", telefono: "492 923 94 21" },
    { nombre: "Lic. Jessica Astrid Jayme Magaña", cargo: "Regidor", area: "Regidor", ext: "303", telefono: "492 923 94 21" },
    { nombre: "Lic. Sandra Verónica Báez Almanza", cargo: "Regidor", area: "Regidor", ext: "404", telefono: "492 923 94 21" },
    { nombre: "L.A.E. Marcela Alatorre Zesat", cargo: "Regidor", area: "Regidor", ext: "505", telefono: "492 923 94 21" },
    { nombre: "L.C. y T.C Juan Carlos González Gándara", cargo: "Regidor", area: "Regidor", ext: "606", telefono: "492 923 94 21" },
    { nombre: "Reginaldo Ávila Arciniaga", cargo: "Regidor", area: "Regidor", ext: "707", telefono: "492 923 94 21" },
    { nombre: "Mtro. Oscar Contreras Vázquez", cargo: "Regidor", area: "Regidor", ext: "808", telefono: "492 923 94 21" },
    { nombre: "Bernardo Ibarra Juárez", cargo: "Regidor", area: "Regidor", ext: "909", telefono: "492 923 94 21" },
    { nombre: "Mtra. Mariana Anaya Mota", cargo: "Regidor", area: "Regidor", ext: "111", telefono: "492 923 94 21" },
    { nombre: "Andrea López de Lara Fuentes", cargo: "Supervisor", area: "Producción", ext: "222", telefono: "555-4568" },
    { nombre: "Ana Rodríguez", cargo: "Diseñador", area: "Diseño", ext: "101", telefono: "555-3456" },
    { nombre: "LIC. MIGUEL ÁNGEL VARELA PINEDO", cargo: "PRESIDENTE MUNICIPAL", area: "PRESIDENTE MUNICIPAL", ext: "202", telefono: "492 923 94 21" },
    { nombre: "Elena Díaz", cargo: "Asistente", area: "Administración", ext: "303", telefono: "555-2345" },
    { nombre: "Pedro Ramírez", cargo: "Abogado", area: "Legal", ext: "404", telefono: "555-6789" },
    { nombre: "Sofía Torres", cargo: "Recursos Humanos", area: "RRHH", ext: "505", telefono: "555-0123" },
    { nombre: "Javier Vargas", cargo: "Ingeniero", area: "Ingeniería", ext: "606", telefono: "555-4567" },
    { nombre: "Isabel Castro", cargo: "Secretaria", area: "Recepción", ext: "707", telefono: "555-8901" },
    { nombre: "Miguel Jiménez", cargo: "Técnico", area: "Soporte", ext: "808", telefono: "555-2346" },
    { nombre: "Carmen Ruiz", cargo: "Coordinador", area: "Logística", ext: "909", telefono: "555-6790" },
    { nombre: "Andrés Moreno", cargo: "Especialista", area: "Calidad", ext: "111", telefono: "555-0124" },
    { nombre: "Alejandro Morales Lechuga", cargo: "Soporte", area: "Soporte", ext: "122", telefono: "4921628129" },
    { nombre: "Ricardo Núñez", cargo: "Analista", area: "Investigación", ext: "333", telefono: "555-8902" }
  ];

  const tableBody = document.getElementById('tableBody');
  const searchInput = document.getElementById('searchInput');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  const pageInfoSpan = document.getElementById('pageInfo');
  const exportButton = document.getElementById('exportButton');

  const itemsPerPage = 7;
  let currentPage = 1;
  let filteredData = [...data];

  function displayData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    tableBody.innerHTML = '';
    pageData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cargo}</td>
        <td>${item.area}</td>
        <td>${item.ext}</td>
        <td>${item.telefono}</td>
      `;
      tableBody.appendChild(row);
    });

    updatePaginationInfo();
  }

  function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    pageInfoSpan.textContent = `Página ${currentPage} de ${totalPages}`;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages || totalPages === 0;
  }

  function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredData = data.filter(item => {
      return (
        item.nombre.toLowerCase().includes(searchTerm) ||
        item.cargo.toLowerCase().includes(searchTerm) ||
        item.area.toLowerCase().includes(searchTerm) ||
        item.ext.toLowerCase().includes(searchTerm) ||
        item.telefono.toLowerCase().includes(searchTerm)
      );
    });
    currentPage = 1;
    displayData();
  }

  function exportToExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(wb, ws, "Directorio");
    XLSX.writeFile(wb, "directoriopmz.xlsx");
  }

  searchInput.addEventListener('input', filterData);

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayData();
    }
  });

  nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayData();
    }
  });

  exportButton.addEventListener('click', exportToExcel);

  displayData();
});