import React, { useState } from 'react';
import './App.css';

function App() {
  const [valores, setValores] = useState({ a: '', b: '', c: '', d: '', e: '', f: '' });
  const [seleccionados, setSeleccionados] = useState({ a: false, b: false, c: false, d: false, e: false, f: false });
  const [ordenAscendente, setOrdenAscendente] = useState([]);
  const [ordenDescendente, setOrdenDescendente] = useState([]);
  const [ecuacion, setEcuacion] = useState('');
  const [resultadoEcuacion, setResultadoEcuacion] = useState(null);
  const [error, setError] = useState(null);

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValores(prevValores => ({ ...prevValores, [name]: value }));
  };

  const handleSelectionChange = (e) => {
    const { name, checked } = e.target;
    setSeleccionados(prevSeleccion => ({ ...prevSeleccion, [name]: checked }));
  };

  const handleOrder = async (order) => {
    const numerosArray = Object.keys(valores)
      .filter(key => seleccionados[key])
      .map(key => parseFloat(valores[key]))
      .filter(num => !isNaN(num));

    console.log('Sending data:', { numbers: numerosArray, order, ecuacion }); // Depuración

    try {
      const response = await fetch('http://localhost:3500/v1/calculadora/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numbers: numerosArray, order, ecuacion }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data); // Depuración

      setOrdenAscendente(order === 'asc' ? data.sortedNumbers : []);
      setOrdenDescendente(order === 'desc' ? data.sortedNumbers : []);
      setResultadoEcuacion(data.resultadoEcuacion);
    } catch (error) {
      console.error('Error al ordenar los números:', error);
      setError('Error al ordenar los números. Verifica la consola para más detalles.');
    }
  };

  const handleCalculate = () => {
    handleOrder('asc'); // Llama a `handleOrder` para obtener el resultado y la ecuación al hacer clic en calcular
  };

  return (
    <div className="App">
      <h1>Ordenar Números y Evaluar Ecuaciones</h1>
      <div className="inputs-container">
        {['a', 'b', 'c', 'd', 'e', 'f'].map((label) => (
          <div key={label} className="input-group">
            <label>
              <input
                type="checkbox"
                name={label}
                checked={seleccionados[label]}
                onChange={handleSelectionChange}
              />
              {label.toUpperCase()}:
              <input
                type="number"
                name={label}
                value={valores[label]}
                onChange={handleValueChange}
                placeholder={`Número ${label.toUpperCase()}`}
                disabled={!seleccionados[label]}
              />
            </label>
          </div>
        ))}
      </div>
      <button onClick={() => handleOrder('asc')}>Ordenar Ascendente</button>
      <button onClick={() => handleOrder('desc')}>Ordenar Descendente</button>
      <div>
        <h2>Orden Ascendente</h2>
        <p>{ordenAscendente.length > 0 ? ordenAscendente.join(', ') : 'Sin datos'}</p>
      </div>
      <div>
        <h2>Orden Descendente</h2>
        <p>{ordenDescendente.length > 0 ? ordenDescendente.join(', ') : 'Sin datos'}</p>
      </div>
      <div className="equation-container">
        <label>
          Ingrese una ecuación (ej. 1*a + 3*b):
          <input
            type="text"
            value={ecuacion}
            onChange={(e) => setEcuacion(e.target.value)}
            placeholder="1*a + 3*b"
          />
        </label>
        <button onClick={handleCalculate}>Calcular</button>
        <div>
          <h2>Resultado</h2>
          <p>{resultadoEcuacion !== null ? resultadoEcuacion : 'Ingresa una ecuación y presiona Calcular'}</p>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
