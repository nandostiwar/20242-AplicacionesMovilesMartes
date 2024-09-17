import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora() {
    // Estados para los valores y su estado de habilitación
    const [A, setA] = useState('');
    const [B, setB] = useState('');
    const [C, setC] = useState('');
    const [D, setD] = useState('');
    const [E, setE] = useState('');
    const [F, setF] = useState('');
    const [equation, setEquation] = useState('');
    const [resultado, setResultado] = useState('');
    const [orden, setOrden] = useState(''); // Estado para el orden
    const [activado, setActivado] = useState({
        A: true,
        B: true,
        C: true,
        D: true,
        E: true,
        F: true
    });

    // Función que maneja el envío del formulario para sumar, restar, multiplicar
    function handleSubmit(e) {
        e.preventDefault();

        const operacion = e.target.value;

        // Filtrar valores activos
        const valores = [
            activado.A ? parseInt(A || 0) : null,
            activado.B ? parseInt(B || 0) : null,
            activado.C ? parseInt(C || 0) : null,
            activado.D ? parseInt(D || 0) : null,
            activado.E ? parseInt(E || 0) : null,
            activado.F ? parseInt(F || 0) : null
        ].filter(v => v !== null);

        // Ordenar los valores según el estado `orden`
        if (orden === 'ascendente') {
            valores.sort((a, b) => a - b);
        } else if (orden === 'descendente') {
            valores.sort((a, b) => b - a);
        }

        let resultadoOperacion;
        if (operacion === "sumar") {
            resultadoOperacion = valores.reduce((acc, num) => acc + num, 0);
        } else if (operacion === "restar") {
            resultadoOperacion = valores.reduce((acc, num) => acc - num);
        } else if (operacion === "multiplicar") {
            resultadoOperacion = valores.reduce((acc, num) => acc * num, 1);
        }

        setResultado(resultadoOperacion);

     // Ordenar ascendente
fetch('http://localhost:3500/v1/calculadora/ascendente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numeros: [5, 2, 9, 1, 7] })
})
    .then(res => res.json())
    .then(data => console.log('Orden Ascendente:', data.resultado))
    .catch(error => console.error('Error:', error));

// Ordenar descendente
fetch('http://localhost:3500/v1/calculadora/descendente', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ numeros: [5, 2, 9, 1, 7] })
})
    .then(res => res.json())
    .then(data => console.log('Orden Descendente:', data.resultado))
    .catch(error => console.error('Error:', error));
 

        // Enviar los datos al backend
        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ A, B, C, D, E, F })
        })
            .then(res => res.json())
            .then(responseData => {
                setResultado(responseData.resultado);
            });
    }

    // Función para resolver la ecuación ingresada
    function resolverEcuacion() {
        const ecuacionResuelta = equation
            .replace(/A/g, `(${parseInt(A || 0)})`)
            .replace(/B/g, `(${parseInt(B || 0)})`)
            .replace(/C/g, `(${parseInt(C || 0)})`)
            .replace(/D/g, `(${parseInt(D || 0)})`)
            .replace(/E/g, `(${parseInt(E || 0)})`)
            .replace(/F/g, `(${parseInt(F || 0)})`);

        try {
            const resultadoEcuacion = eval(ecuacionResuelta);
            setResultado(resultadoEcuacion);
        } catch (error) {
            setResultado("Error en la ecuación");
        }
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>

            {/* Botones para ordenar */}
            <button className="btnEnviar" onClick={() => setOrden('ascendente')}>Orden Ascendente</button>
            <button className="btnEnviar" onClick={() => setOrden('descendente')}>Orden Descendente</button>
            <button className="btnEnviar" onClick={() => setOrden('')}>Orden Normal</button>

            <form>
                <div className="input-group">
                    <input type="text" className="number" placeholder="A" value={A} onChange={(e) => setA(e.target.value)} />
                    <button type="button" className="btnEnviar" onClick={() => setActivado({ ...activado, A: !activado.A })}>
                        {activado.A ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
                <div className="input-group">
                    <input type="text" className="number" placeholder="B" value={B} onChange={(e) => setB(e.target.value)} />
                    <button type="button" className="btnEnviar" onClick={() => setActivado({ ...activado, B: !activado.B })}>
                        {activado.B ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
                <div className="input-group">
                    <input type="text" className="number" placeholder="C" value={C} onChange={(e) => setC(e.target.value)} />
                    <button type="button" className="btnEnviar" onClick={() => setActivado({ ...activado, C: !activado.C })}>
                        {activado.C ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
                <div className="input-group">
                    <input type="text" className="number" placeholder="D" value={D} onChange={(e) => setD(e.target.value)} />
                    <button type="button" className="btnEnviar" onClick={() => setActivado({ ...activado, D: !activado.D })}>
                        {activado.D ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
                <div className="input-group">
                    <input type="text" className="number" placeholder="E" value={E} onChange={(e) => setE(e.target.value)} />
                    <button type="button" className="btnEnviar" onClick={() => setActivado({ ...activado, E: !activado.E })}>
                        {activado.E ? 'Desactivar' : 'Activar'}
                    </button>
                </div>
                <div className="input-group">
                    <input type="text" className="number" placeholder="F" value={F} onChange={(e) => setF(e.target.value)} />
                    <button type="button" className="btnEnviar" onClick={() => setActivado({ ...activado, F: !activado.F })}>
                        {activado.F ? 'Desactivar' : 'Activar'}
                    </button>
                </div>

                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit} />
            </form>

            <input
                type="text"
                className="equationInput"
                placeholder="Ingresa la ecuación (ej: 2A + 3B)"
                onChange={(e) => setEquation(e.target.value)}
            />
            <button className="btnEnviar" onClick={resolverEcuacion}>Resolver Ecuación</button>

            <Resultado resultado={"El resultado es " + resultado} />
        </div>
    );
}

export default Calculadora;

