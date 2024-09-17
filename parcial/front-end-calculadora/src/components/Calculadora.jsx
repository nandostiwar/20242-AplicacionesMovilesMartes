import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');
    const [resultado, setResultado] = useState('');
    const [ascendente, setAscendente] = useState('');
    const [descendente, setDescendente] = useState('');
    const [ecuacion, setEcuación] = useState('');
    const [selectedNumbers, setSelectedNumbers] = useState({});

    const handleCheckboxChange = (e, number) => {
        setSelectedNumbers(prevState => ({
            ...prevState,
            [number]: e.target.checked
        }));
    };

    const ordenar = (orden) => {
        const numeros = [
            number1,
            number2,
            number3,
            number4,
            number5,
            number6
        ].filter(n => n !== '' && selectedNumbers[n]); // Filtra los números seleccionados

        if (numeros.length === 0) {
            setAscendente('');
            setDescendente('');
            return;
        }

        const numerosOrdenados = numeros.map(Number);
        let resultadoOrdenado;

        if (orden === 'asc') {
            resultadoOrdenado = [...numerosOrdenados].sort((a, b) => a - b);
            setAscendente(resultadoOrdenado.join(', '));
        } else {
            resultadoOrdenado = [...numerosOrdenados].sort((a, b) => b - a);
            setDescendente(resultadoOrdenado.join(', '));
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;
        if (operacion === "Ascendente") {
            ordenar('asc');
        }
        if (operacion === "Descendente") {
            ordenar('desc');
        }
        // Para otras operaciones, puedes manejar en la lógica existente
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <ul>
                    <li>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, number1)} />
                        <label>A</label>
                        <input type="text" className="number" onChange={(e) => setNumber1(e.target.value)} /><br />
                    </li>
                    <li>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, number2)} />
                        <label>B</label>
                        <input type="text" className="number" onChange={(e) => setNumber2(e.target.value)} /><br />
                    </li>
                    <li>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, number3)} />
                        <label>C</label>
                        <input type="text" className="number" onChange={(e) => setNumber3(e.target.value)} /><br />
                    </li>
                    <li>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, number4)} />
                        <label>D</label>
                        <input type="text" className="number" onChange={(e) => setNumber4(e.target.value)} /><br />
                    </li>
                    <li>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, number5)} />
                        <label>E</label>
                        <input type="text" className="number" onChange={(e) => setNumber5(e.target.value)} /><br />
                    </li>
                    <li>
                        <input type="checkbox" onChange={(e) => handleCheckboxChange(e, number6)} />
                        <label>F</label>
                        <input type="text" className="number" onChange={(e) => setNumber6(e.target.value)} /><br />
                    </li>
                </ul>

                <div>
                    <button type="button" className="btnEnviar" value="Ascendente" onClick={handleSubmit}>
                        Ascendente  
                    </button>
                    <span>               {ascendente}</span>
                </div>

                <div>
                    <button type="button" className="btnEnviar" value="Descendente" onClick={handleSubmit}>
                        Descendente
                    </button>
                    <span>               {descendente}</span>
                </div>
            </form>
            <Resultado resultado={"El resultado es " + resultado} />
        </div>
    );
}

export default Calculadora;