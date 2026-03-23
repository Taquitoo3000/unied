function cargarPlot(archivo, idContenedor) {
    fetch(archivo)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById(idContenedor);
            container.innerHTML = html;
            container.querySelectorAll('script').forEach(old => {
                const script = document.createElement('script');
                script.textContent = old.textContent;
                document.body.appendChild(script);
            });
        })
        .catch(err => console.error(`Error cargando ${archivo}:`, err));
}

function loadplot() {
    cargarPlot('components/municipios_promedio.html',    'plot-municipios');
    cargarPlot('components/prediccion_quejas_v3.html',  'plot-prediccion');
    // Para agregar más en el futuro, solo añades una línea:
    // cargarPlot('components/otra_grafica.html', 'plot-otro');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadplot);
} else {
    loadplot();
}