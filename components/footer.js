function loadFooter() {
    const footerHTML = `
        <footer>
            <div style="text-align: center; color: rgb(0, 0, 0); margin: 0.5em 0%;">
                &copy; ${new Date().getFullYear()} Unidad de Información Estadística y Documental - PRODHEG | Desarrollado por
                <a href="https://taquitoo3000.github.io/isael/" style="color: rgb(112, 11, 149);">SECtech</a>
            </div>
        </footer>
    `;
    
    document.getElementById('footer-container').innerHTML = footerHTML;
}

// Ejecutar cuando cargue el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}