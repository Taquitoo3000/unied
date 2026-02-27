function loadplot() {
    fetch('components/municipios_promedio.html')
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById('plot-municipios');
            container.innerHTML = html;

            // re-ejecutar scripts para que Plotly arranque
            container.querySelectorAll('script').forEach(old => {
                const script = document.createElement('script');
                script.textContent = old.textContent;
                document.body.appendChild(script);
            });

            initMenuFunctionality();
        })
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadplot);
} else {
    loadplot();
}