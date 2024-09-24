import { useState, useEffect } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');
    const [historial, setHistorial] = useState([]);

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);

    const [ecuacion, setEcuacion] = useState(''); // Estado para la ecuación
    const [resultado, setResultado] = useState('');

    useEffect(() => {
        fetch('http://localhost:3500/v1/calculadora/historial')
            .then(res => res.json())
            .then(data => setHistorial(data.historial))
            .catch(err => console.error('Error al cargar el historial:', err));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;

        if (operacion === 'calcularEcuacion') {
            // Recolectar todas las variables
            const variables = { A: number1, B: number2, C: number3, D: number4, E: number5, F: number6 };

            fetch('http://localhost:3500/v1/calculadora/calcularEcuacion', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ variables, equation: ecuacion }) // Enviar ecuación y variables
            })
                .then(res => res.json())
                .then(responseData => {
                    setResultado(responseData.resultado); // Mostrar el resultado de la ecuación
                });
        } else {
            // Recolectar solo los números seleccionados para ordenar
            const selectedNumbers = [];
            if (check1) selectedNumbers.push(number1);
            if (check2) selectedNumbers.push(number2);
            if (check3) selectedNumbers.push(number3);
            if (check4) selectedNumbers.push(number4);
            if (check5) selectedNumbers.push(number5);
            if (check6) selectedNumbers.push(number6);

            const endpoint = operacion === "Ascendente" ? "ordenarAsc" : "ordenarDesc";

            fetch(`http://localhost:3500/v1/calculadora/${endpoint}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ variables: selectedNumbers })
            })
                .then(res => res.json())
                .then(responseData => {
                    setResultado(responseData.resultado);
                });
        }
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <label htmlFor="">A</label>
                <input type="text" className="number" onChange={(e) => setNumber1(e.target.value)} />
                <input type="checkbox" onChange={(e) => setCheck1(e.target.checked)} /> <br />
                
                <label htmlFor="">B</label>
                <input type="text" className="number" onChange={(e) => setNumber2(e.target.value)} />
                <input type="checkbox" onChange={(e) => setCheck2(e.target.checked)} /> <br />
                
                <label htmlFor="">C</label>
                <input type="text" className="number" onChange={(e) => setNumber3(e.target.value)} />
                <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} /> <br />
                
                <label htmlFor="">D</label>
                <input type="text" className="number" onChange={(e) => setNumber4(e.target.value)} />
                <input type="checkbox" onChange={(e) => setCheck4(e.target.checked)} /> <br />
                
                <label htmlFor="">E</label>
                <input type="text" className="number" onChange={(e) => setNumber5(e.target.value)} />
                <input type="checkbox" onChange={(e) => setCheck5(e.target.checked)} /> <br />
                
                <label htmlFor="">F</label>
                <input type="text" className="number" onChange={(e) => setNumber6(e.target.value)} />
                <input type="checkbox" onChange={(e) => setCheck6(e.target.checked)} /> <br />
                
                <label htmlFor="">Ecuación</label>
                <input type="text" className="number" onChange={(e) => setEcuacion(e.target.value)} /> <br />
                
                <input type="submit" className="btnEnviar" value="Ascendente" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="Descendiente" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="calcularEcuacion" onClick={handleSubmit} /> {/* Botón para calcular ecuación */}
            </form>
            <Resultado resultado={"El resultado es " + resultado} />
            
            {/* Mostrar el historial */}
            <h2>Historial de operaciones</h2>
            <ul>
                {historial.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}

export default Calculadora;
