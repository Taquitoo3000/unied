function loadHeader() {
    const headerHTML = `
        <header>
            <button class="menu-toggle" id="menu-toggle">☰</button>
            <nav class="menu" id="menu">
                <a href="index.html" class="boton_menu">Inicio</a>
                <div class="submenu-container" id="estadisticasContainer">
                    <a href="#" class="boton_menu has-submenu" id="estadisticasBtn">Estadísticas</a>
                    <div class="submenu" id="estadisticasSubmenu">
                        <a href="https://taquitoo3000.pythonanywhere.com/">General</a>
                        <a href="subs.html">Subprocuradurías</a>
                        <a href="censo_trabajo.html">Desglose</a>
                        <a href="http://172.17.3.34:8501">SUNIED</a>
                    </div>
                </div>
                <a href="reporte.html" class="boton_menu">Reporte</a>
                <a href="miembros.html" class="boton_menu">Miembros</a>
            </nav>
        </header>
    `;
    
    document.getElementById('header-container').innerHTML = headerHTML;
    initMenuFunctionality();
}

// Ejecutar cuando cargue el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}