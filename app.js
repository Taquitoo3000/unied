// Función para inicializar la funcionalidad del menú
function initMenuFunctionality() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const estadisticasBtn = document.getElementById('estadisticasBtn');
    const estadisticasContainer = document.getElementById('estadisticasContainer');
    const submenu = document.getElementById('estadisticasSubmenu');

    // Toggle menú móvil
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const isActive = menu.classList.contains('active');
            toggle.textContent = isActive ? '✕' : '☰';
            toggle.setAttribute('aria-expanded', isActive);
        });
    }

    // Toggle submenú de estadísticas
    if (estadisticasBtn && submenu) {
        estadisticasBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            submenu.classList.toggle('active');
            estadisticasContainer.classList.toggle('active');
        });
    }

    // Cerrar submenú al hacer clic en enlaces internos
    if (submenu) {
        submenu.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', function () {
                submenu.classList.remove('active');
                estadisticasContainer.classList.remove('active');
            });
        });
    }

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function (e) {
        // Cerrar submenú de estadísticas
        if (estadisticasContainer && !estadisticasContainer.contains(e.target)) {
            submenu.classList.remove('active');
            estadisticasContainer.classList.remove('active');
        }
        
        // Cerrar menú móvil (solo en móvil)
        if (window.innerWidth <= 1200) {
            if (menu && !menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.textContent = '☰';
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (submenu && submenu.classList.contains('active')) {
                submenu.classList.remove('active');
                estadisticasContainer.classList.remove('active');
            }
            
            if (window.innerWidth <= 1200 && menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.textContent = '☰';
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Cerrar menú móvil al cambiar a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1200 && menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.textContent = '☰';
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Función para toggle de zonas (si la necesitas)
function toggleZona(zonaId) {
    const contenido = document.getElementById(zonaId);
    if (!contenido) return;
    
    const flecha = contenido.previousElementSibling?.querySelector('.flecha');

    // Cerrar otras zonas
    document.querySelectorAll('.zona-content').forEach(zona => {
        if (zona.id !== zonaId && zona.classList.contains('active')) {
            zona.classList.remove('active');
            zona.previousElementSibling?.querySelector('.flecha')?.classList.remove('abajo');
        }
    });

    // Toggle zona actual
    contenido.classList.toggle('active');
    flecha?.classList.toggle('abajo');
}

// Marcar página actual en el menú
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.boton_menu[href]');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('current-page');
        }
    });
}

// Ejecutar después de cargar los componentes
setTimeout(highlightCurrentPage, 150);