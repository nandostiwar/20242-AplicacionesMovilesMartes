// Funciones para habilitar/deshabilitar inputs
document.getElementById('toggleA').addEventListener('click', function() {
    toggleInput('inputA', this);
});

document.getElementById('toggleB').addEventListener('click', function() {
    toggleInput('inputB', this);
});

document.getElementById('toggleC').addEventListener('click', function() {
    toggleInput('inputC', this);
});

document.getElementById('toggleD').addEventListener('click', function() {
    toggleInput('inputD', this);
});

document.getElementById('toggleE').addEventListener('click', function() {
    toggleInput('inputE', this);
});

document.getElementById('toggleF').addEventListener('click', function() {
    toggleInput('inputF', this);
});

// Función para habilitar/deshabilitar inputs y cambiar el color del botón
function toggleInput(inputId, button) {
    const input = document.getElementById(inputId);
    input.disabled = !input.disabled;

    if (input.disabled) {
        button.classList.remove('unlocked');
        button.classList.add('locked');
        button.textContent = 'Bloquear'; // Texto del botón cuando está bloqueado
    } else {
        button.classList.remove('locked');
        button.classList.add('unlocked');
        button.textContent = 'Desbloquear'; // Texto del botón cuando está desbloqueado
    }
}

// Obtener el valor del input solo si está bloqueado, o devolver null si está desbloqueado
function getLockedValue(inputId) {
    const input = document.getElementById(inputId);
    if (input.disabled) {
        const value = parseInt(input.value);
        return isNaN(value) ? 0 : value;
    }
    return null; // Si está desbloqueado, no se toma en cuenta
}

// Obtener el valor para mostrar solo si el campo está bloqueado
function getLockedDisplayValue(inputId) {
    const input = document.getElementById(inputId);
    if (input.disabled) {
        const value = parseInt(input.value);
        return isNaN(value) ? 0 : value;
    }
    return null; // Si está desbloqueado, no se muestra
}

// Función para calcular el resultado solo con los inputs bloqueados
function calcularEcuacion() {
    const inputs = ['A', 'B', 'C', 'D', 'E', 'F'];
    const valores = [];
    const ecuacion = [];

    inputs.forEach(input => {
        const inputId = `input${input}`;
        const value = getLockedValue(inputId);
        if (value !== null) {
            valores.push(value);
            ecuacion.push(input); // Agregar la letra de la variable a la ecuación
        }
    });

    // Sumar solo los valores bloqueados (ignorar los null)
    const resultado = valores.reduce((acc, val) => acc + val, 0);
    // Construir la cadena de la ecuación
    const ecuacionString = ecuacion.join(' + ');

    // Actualizar el resultado y la ecuación en pantalla
    document.getElementById('resultadoEcuacion').textContent = `${ecuacionString} = ${resultado}`;
    return resultado; // Asegúrate de que devuelva el resultado
}

// Función para mostrar los números ascendentes (solo bloqueados)
function ascendente() {
    const valores = [
        getLockedDisplayValue('inputA'),
        getLockedDisplayValue('inputB'),
        getLockedDisplayValue('inputC'),
        getLockedDisplayValue('inputD'),
        getLockedDisplayValue('inputE'),
        getLockedDisplayValue('inputF')
    ];

    // Filtramos los null y luego ordenamos los valores
    const valoresParaMostrar = valores.filter(val => val !== null).sort((a, b) => a - b);
    document.getElementById('ascendenteOutput').textContent = valoresParaMostrar.join(', ');
}

// Función para mostrar los números descendentes (solo bloqueados)
function descendente() {
    const valores = [
        getLockedDisplayValue('inputA'),
        getLockedDisplayValue('inputB'),
        getLockedDisplayValue('inputC'),
        getLockedDisplayValue('inputD'),
        getLockedDisplayValue('inputE'),
        getLockedDisplayValue('inputF')
    ];

    // Filtramos los null y luego ordenamos los valores en orden descendente
    const valoresParaMostrar = valores.filter(val => val !== null).sort((a, b) => b - a);
    document.getElementById('descendenteOutput').textContent = valoresParaMostrar.join(', ');
}

// Función para guardar el resultado en localStorage
function guardarResultado() {
    const resultado = calcularEcuacion();
    let resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    resultados.push(resultado !== null ? resultado : 0); // Maneja el valor null
    localStorage.setItem('resultados', JSON.stringify(resultados));
    alert('Resultado guardado');
}

// Función para mostrar los resultados guardados
function mostrarResultados() {
    let resultados = JSON.parse(localStorage.getItem('resultados')) || [];
    const listaResultados = document.getElementById('resultadosGuardados');
    listaResultados.innerHTML = ''; // Limpiar la lista antes de mostrar los resultados

    resultados.forEach((resultado, index) => {
        const li = document.createElement('li');
        li.textContent = `Resultado ${index + 1}: ${resultado}`;
        listaResultados.appendChild(li);
    });
}
