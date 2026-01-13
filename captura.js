// JavaScript mejorado con funcionalidades adicionales
function agregarCampo(campoId) {
    const contenedor = document.getElementById(campoId);
    const selects = contenedor.querySelectorAll('select');
    const nuevoSelect = selects[0].cloneNode(true);

    // Limpiar selecciones del nuevo campo
    Array.from(nuevoSelect.options).forEach(option => {
        option.selected = false;
    });

    contenedor.appendChild(nuevoSelect);
    actualizarContador(campoId);
}

function quitarCampo(campoId) {
    const contenedor = document.getElementById(campoId);
    const selects = contenedor.querySelectorAll('select');

    if (selects.length > 1) {
        contenedor.removeChild(selects[selects.length - 1]);
        actualizarContador(campoId);
    } else {
        showAlert('error', 'Debe haber al menos un campo ' + campoId.replace('contenedor_', ''));
    }
}

function actualizarContador(campoId) {
    const contenedor = document.getElementById(campoId);
    const count = contenedor.querySelectorAll('select').length;
    const counterElement = document.getElementById(campoId.replace('contenedor_', '') + 'Counter');

    if (counterElement) {
        counterElement.textContent = count;
    }
}

function showAlert(type, message) {
    const alertDiv = document.getElementById('alert' + (type === 'success' ? 'Success' : 'Error'));

    if (message) {
        alertDiv.innerHTML = (type === 'success' ? '✓ ' : '✗ ') + message;
    }

    alertDiv.style.display = 'block';

    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

// Generar resumen del formulario
function generateSummary() {
    const form = document.getElementById('capturaForm');
    const expediente = form.expediente.value;
    const fechaInicio = form.fecha_inicio.value;
    const hechosSeleccionados = Array.from(form.querySelectorAll('[name="hechos[]"]'))
        .flatMap(select => Array.from(selectedOptions(select)).map(opt => opt.text));

    const autoridadSeleccionada = Array.from(form.querySelectorAll('[name="autoridad[]"]'))
        .flatMap(select => Array.from(selectedOptions(select)).map(opt => opt.text));

    const summaryHTML = `
                <div class="summary-item">
                    <span>Expediente:</span>
                    <strong>${expediente || 'No ingresado'}</strong>
                </div>
                <div class="summary-item">
                    <span>Fecha de Inicio:</span>
                    <strong>${fechaInicio || 'No ingresada'}</strong>
                </div>
                <div class="summary-item">
                    <span>Hechos Violatorios:</span>
                    <strong>${hechosSeleccionados.length} seleccionados</strong>
                </div>
                <div class="summary-item">
                    <span>Autoridades:</span>
                    <strong>${autoridadSeleccionada.length} seleccionadas</strong>
                </div>
            `;

    document.getElementById('summaryContent').innerHTML = summaryHTML;
    document.getElementById('summarySection').style.display = 'block';
}

function selectedOptions(selectElement) {
    return Array.from(selectElement.options).filter(option => option.selected);
}

// Manejar envío del formulario
document.getElementById('capturaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validación básica
    const expediente = document.getElementById('expediente').value;
    if (!expediente.match(/^\d{4}\/\d{3}-[A-Z]$/)) {
        showAlert('error', 'Formato de expediente inválido. Use: AAAA/###-Letra');
        return;
    }

    // Aquí iría la lógica para enviar a Formspree o Google Forms
    // Por ahora solo mostramos simulación
    showAlert('success', 'Expediente registrado exitosamente. Los datos serán procesados.');
    generateSummary();

    // Limpiar formulario después de 3 segundos
    setTimeout(() => {
        this.reset();
        document.getElementById('summarySection').style.display = 'none';
        // Resetear contadores
        document.querySelectorAll('.multi-select-container').forEach(container => {
            const selects = container.querySelectorAll('select');
            if (selects.length > 1) {
                for (let i = 1; i < selects.length; i++) {
                    container.removeChild(selects[i]);
                }
            }
        });
        actualizarContador('contenedor_hechos');
        actualizarContador('contenedor_autoridad');
    }, 3000);
});

// Inicializar contadores
document.addEventListener('DOMContentLoaded', function () {
    actualizarContador('contenedor_hechos');
    actualizarContador('contenedor_autoridad');

    // Establecer fecha mínima para fecha de conclusión
    const fechaInicio = document.getElementById('fecha_inicio');
    const fechaConclusion = document.getElementById('fecha_conclusion');

    fechaInicio.addEventListener('change', function () {
        fechaConclusion.min = this.value;
    });
});