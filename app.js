const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  // Cambiar el ícono del botón toggle
  toggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
});

function toggleZona(zonaId) {
  const contenido = document.getElementById(zonaId);
  const flecha = contenido.previousElementSibling.querySelector('.flecha');

  // Cerrar otras zonas
  document.querySelectorAll('.zona-content').forEach(zona => {
    if (zona.id !== zonaId && zona.classList.contains('active')) {
      zona.classList.remove('active');
      zona.previousElementSibling.querySelector('.flecha').classList.remove('abajo');
    }
  });

  // Toggle zona actual
  contenido.classList.toggle('active');
  flecha.classList.toggle('abajo');
}

document.addEventListener('DOMContentLoaded', function () {
  const estadisticasBtn = document.getElementById('estadisticasBtn');
  const estadisticasContainer = document.getElementById('estadisticasContainer');
  const submenu = document.getElementById('estadisticasSubmenu');

  // Alternar submenú al hacer clic en "Estadísticas"
  if (estadisticasBtn) {
    estadisticasBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // Evita que el clic se propague
      e.preventDefault(); // Previene la navegación si es necesario

      // Alternar clases activas
      submenu.classList.toggle('active');
      estadisticasContainer.classList.toggle('active');
    });
  }

  // Cerrar submenú al hacer clic en cualquier enlace dentro de él
  if (submenu) {
    submenu.querySelectorAll('a').forEach(enlace => {
      enlace.addEventListener('click', function () {
        submenu.classList.remove('active');
        estadisticasContainer.classList.remove('active');
      });
    });
  }

  // Cerrar menús al hacer clic en cualquier parte fuera
  document.addEventListener('click', function (e) {
    // Cerrar submenú de estadísticas
    if (estadisticasContainer && !estadisticasContainer.contains(e.target)) {
      submenu.classList.remove('active');
      estadisticasContainer.classList.remove('active');
    }
    
    // Cerrar menú móvil si se hace clic fuera (solo en móvil)
    if (window.innerWidth <= 1200) {
      if (menu && !menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.textContent = '☰';
      }
    }
  });

  // Cerrar submenú con la tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (submenu && submenu.classList.contains('active')) {
        submenu.classList.remove('active');
        estadisticasContainer.classList.remove('active');
      }
      
      // También cerrar menú móvil si está abierto
      if (window.innerWidth <= 1200 && menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.textContent = '☰';
      }
    }
  });

  // Cerrar menú móvil al cambiar a desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1200 && menu && menu.classList.contains('active')) {
      menu.classList.remove('active');
      toggle.textContent = '☰';
    }
  });
});
