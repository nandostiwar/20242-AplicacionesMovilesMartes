import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');
    const [checks, setChecks] = useState([false, false, false, false, false, false]);
    const [resultado, setResultado] = useState('');
    const [ascendente, setAscendente] = useState('');
    const [descendente, setDescendente] = useState('');
    const [ecuacion, setEcuacion] = useState(''); 
    const [resultadoEcuacion, setResultadoEcuacion] = useState(''); 

    const variables = ['a', 'b', 'c', 'd', 'e', 'f'];

    function handleCheckChange(index) {
        const newChecks = [...checks];
        newChecks[index] = !newChecks[index];
        setChecks(newChecks);
    }

    const handleAscendente = () => {
        const selectedNumbers = [number1, number2, number3, number4, number5, number6]
            .filter((_, index) => checks[index])
            .map(Number);

        fetch('http://localhost:3500/v1/calculadora/ordenarDescendente', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers: selectedNumbers })
        })
            .then(res => res.json())
            .then(data => setAscendente(data.resultado.join(', ')));
    };

    const handleDescendente = () => {
        const selectedNumbers = [number1, number2, number3, number4, number5, number6]
            .filter((_, index) => checks[index])
            .map(Number);

        fetch('http://localhost:3500/v1/calculadora/ordenarAscendente', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers: selectedNumbers })
        })
            .then(res => res.json())
            .then(data => setDescendente(data.resultado.join(', ')));
    };

    const handleEcuacion = () => {
        const selectedNumbers = [number1, number2, number3, number4, number5, number6]
            .map((value, index) => ({ value, index }))
            .filter((_, index) => checks[index])
            .map((item) => `${item.value}${variables[item.index]}`);

        fetch('http://localhost:3500/v1/calculadora/crearEcuacion', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers: selectedNumbers })
        })
            .then(res => res.json())
            .then(data => setEcuacion(data.ecuacion));
    };

    const handleSuma = () => {
        const selectedNumbers = [number1, number2, number3, number4, number5, number6]
            .filter((_, index) => checks[index])
            .map(Number);

        fetch('http://localhost:3500/v1/calculadora/sumar', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers: selectedNumbers })
        })
            .then(res => res.json())
            .then(data => setResultado(data.resultado));
    };

    const handleResta = () => {
        const selectedNumbers = [number1, number2, number3, number4, number5, number6]
            .filter((_, index) => checks[index])
            .map(Number);

        fetch('http://localhost:3500/v1/calculadora/restar', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers: selectedNumbers })
        })
            .then(res => res.json())
            .then(data => setResultado(data.resultado));
    };

    const handleMultiplicacion = () => {
        const selectedNumbers = [number1, number2, number3, number4, number5, number6]
            .filter((_, index) => checks[index])
            .map(Number);

        fetch('http://localhost:3500/v1/calculadora/multiplicar', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ numbers: selectedNumbers })
        })
            .then(res => res.json())
            .then(data => setResultado(data.resultado));
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                {[number1, number2, number3, number4, number5, number6].map((num, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            checked={checks[index]}
                            onChange={() => handleCheckChange(index)}
                        />
                        <input
                            type="text"
                            className="number"
                            value={num}
                            onChange={(e) => {
                                const setters = [setNumber1, setNumber2, setNumber3, setNumber4, setNumber5, setNumber6];
                                setters[index](e.target.value);
                            }}
                        />
                    </div>
                ))}

                <div>
                    <button type="button" className="btnEnviar" onClick={handleAscendente}>Ascendente</button>
                    <input type="text" className="number" readOnly value={ascendente} />
                </div>

                <div>
                    <button type="button" className="btnEnviar" onClick={handleDescendente}>Descendente</button>
                    <input type="text" className="number" readOnly value={descendente} />
                </div>

                <div>
                    <button type="button" className="btnEnviar" onClick={handleEcuacion}>Ecuación</button>
                    <input type="text" className="number" readOnly value={ecuacion} />
                </div>

                <div>
                    <button type="button" className="btnOperacion" onClick={handleSuma}>Suma</button>
                    <button type="button" className="btnOperacion" onClick={handleResta}>Resta</button>
                    <button type="button" className="btnOperacion" onClick={handleMultiplicacion}>Multiplicación</button>
                    <input type="text" className="number" readOnly value={resultado} />
                </div>
            </form>
            <Resultado resultado={`El resultado de la ecuación es ${resultadoEcuacion}`} />
        </div>
    );
}

export default Calculadora;
