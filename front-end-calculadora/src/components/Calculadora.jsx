import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    const [inputs, setInputs] = useState([
        { value: '', checked: false },
        { value: '', checked: false },
        { value: '', checked: false },
        { value: '', checked: false },
        { value: '', checked: false },
        { value: '', checked: false },
    ]);

    const [ascSortedValues, setAscSortedValues] = useState([]);
    const [descSortedValues, setDescSortedValues] = useState([]);

    const [equation, setEquation] = useState('');
    const [equationResult, setEquationResult] = useState(null);

    function handleInputChange(index, event) {
        const { name, value, type, checked } = event.target;
        const newInputs = [...inputs];
        newInputs[index] = {
            ...newInputs[index],
            [name]: type === 'checkbox' ? checked : value,
        };
        setInputs(newInputs);
    }

    function handleSort(ascendente) {
        let selectedValues = inputs
            .filter(input => input.checked && input.value !== '')
            .map(input => parseFloat(input.value));

        selectedValues.sort((a, b) => (ascendente ? a - b : b - a));

        if (ascendente) {
            setAscSortedValues(selectedValues);
        } else {
            setDescSortedValues(selectedValues);
        }
    }

    function handleEquationSubmit(e) {
        e.preventDefault();
        console.log('Enviando ecuación:', equation);
        console.log('Valores:', ascSortedValues);
    
        fetch('http://localhost:3500/v1/calculadora/equation', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ equation, values: ascSortedValues })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(responseData => {
                setEquationResult(responseData.resultado);
                console.log('Resultado:', responseData.resultado);
            })
            .catch(error => {
                console.error("Error en la ecuación:", error);
                alert("Error en la ecuación");
            });
    }
    
    

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;

        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number1, number2 })
        })
            .then(res => res.json())
            .then(responseData => {
                setResultado(responseData.resultado);
            })
            .catch(error => {
                console.error("Error en la operación:", error);
                alert("Error en la operación");
            });
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                

                {inputs.map((input, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                name="checked"
                                checked={input.checked}
                                onChange={(e) => handleInputChange(index, e)}
                            /> {String.fromCharCode(65 + index)}
                        </label>
                        <input
                            type="text"
                            className="number"
                            name="value"
                            value={input.value}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    </li>
                ))}

                <li>
                    <button type="button" className="btnEnviar" onClick={() => handleSort(true)}>Ascendente</button>
                    <span> {ascSortedValues.join(', ')} </span>
                </li>
                <li>
                    <button type="button" className="btnEnviar" onClick={() => handleSort(false)}>Descendente</button>
                    <span> {descSortedValues.join(', ')} </span>
                </li>

            </form>

            <form onSubmit={handleEquationSubmit}>
                <input
                className="number"
                    type="text"
                    placeholder="Ingresa la ecuación (ej. 4a + 4b)"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                />
                <button className="number" type="submit">Calcular Ecuación</button>
            </form>

            {equationResult !== null && <p>Resultado de la ecuación: {equationResult}</p>}

            <Resultado resultado={"El resultado es " + resultado} />
        </div>
    );
}

export default Calculadora;
