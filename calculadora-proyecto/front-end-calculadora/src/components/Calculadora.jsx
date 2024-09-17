import { useState } from "react";
import '../styles/Calculadora.css';

<<<<<<< HEAD
function VariablesManager() {
    const [variables, setVariables] = useState({
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: ''
    });

    const [selected, setSelected] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false
    });

    const [sortedAsc, setSortedAsc] = useState([]);
    const [sortedDesc, setSortedDesc] = useState([]);
    const [equation, setEquation] = useState('');
    const [equationResult, setEquationResult] = useState(null);

    function handleChangeVariable(e, variableName) {
        const value = e.target.value;
        setVariables(prevVariables => ({
            ...prevVariables,
            [variableName]: value
        }));
    }

    function handleCheckboxChange(e, variableName) {
        const checked = e.target.checked;
        setSelected(prevSelected => ({
            ...prevSelected,
            [variableName]: checked
        }));
    }

    // Enviar las variables seleccionadas al backend para ordenarlas ascendentemente
    function handleSortAsc() {
        const selectedVars = Object.keys(variables).filter(key => selected[key]);
        const values = selectedVars.map(key => variables[key]);

        fetch('http://localhost:3500/v1/calculadora/ordenarAsc', {
=======


function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    function handleSubmit(e){
        //console.log("numerador: " +number2);
        e.preventDefault();
        const operacion = e.target.value;
        //if(operacion == "sumar") {setResultado(("donChimbo"))}
        if(operacion == "sumar") {setResultado(parseInt(number1)+parseInt(number2))}
        if(operacion == "restar") {setResultado(parseInt(number1)-parseInt(number2))}
        if(operacion == "multiplicar") {setResultado(parseInt(number1)*parseInt(number2))}
    
        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
>>>>>>> 93226778afe81732c5ec5b9ef3a215bc2b607f43
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ variables: values })
        })
            .then(response => response.json())
            .then(data => setSortedAsc(data.resultado))
            .catch(error => console.error('Error:', error));
    }

    // Enviar las variables seleccionadas al backend para ordenarlas descendentemente
    function handleSortDesc() {
        const selectedVars = Object.keys(variables).filter(key => selected[key]);
        const values = selectedVars.map(key => variables[key]);

        fetch('http://localhost:3500/v1/calculadora/ordenarDesc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ variables: values })
        })
            .then(response => response.json())
            .then(data => setSortedDesc(data.resultado))
            .catch(error => console.error('Error:', error));
    }

    // Enviar las variables y la ecuación al backend para calcular la ecuación
    function handleCalculateEquation() {
        fetch('http://localhost:3500/v1/calculadora/calcularEcuacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                variables: variables,
                equation: equation
            })
<<<<<<< HEAD
        })
            .then(response => response.json())
            .then(data => setEquationResult(data.resultado))
            .catch(error => console.error('Error:', error));
=======

        
>>>>>>> 93226778afe81732c5ec5b9ef3a215bc2b607f43
    }


    return (
        <div>
            <div>
                <label>a = </label>
                <input
                    type="text"
                    value={variables.a}
                    onChange={(e) => handleChangeVariable(e, 'a')}
                    placeholder="Ingresa valor para a"
                />
                <input
                    type="checkbox"
                    checked={selected.a}
                    onChange={(e) => handleCheckboxChange(e, 'a')}
                />
            </div>
            <div>
                <label>b = </label>
                <input
                    type="text"
                    value={variables.b}
                    onChange={(e) => handleChangeVariable(e, 'b')}
                    placeholder="Ingresa valor para b"
                />
                <input
                    type="checkbox"
                    checked={selected.b}
                    onChange={(e) => handleCheckboxChange(e, 'b')}
                />
            </div>
            <div>
                <label>c = </label>
                <input
                    type="text"
                    value={variables.c}
                    onChange={(e) => handleChangeVariable(e, 'c')}
                    placeholder="Ingresa valor para c"
                />
                <input
                    type="checkbox"
                    checked={selected.c}
                    onChange={(e) => handleCheckboxChange(e, 'c')}
                />
            </div>
            <div>
                <label>d = </label>
                <input
                    type="text"
                    value={variables.d}
                    onChange={(e) => handleChangeVariable(e, 'd')}
                    placeholder="Ingresa valor para d"
                />
                <input
                    type="checkbox"
                    checked={selected.d}
                    onChange={(e) => handleCheckboxChange(e, 'd')}
                />
            </div>
            <div>
                <label>e = </label>
                <input
                    type="text"
                    value={variables.e}
                    onChange={(e) => handleChangeVariable(e, 'e')}
                    placeholder="Ingresa valor para e"
                />
                <input
                    type="checkbox"
                    checked={selected.e}
                    onChange={(e) => handleCheckboxChange(e, 'e')}
                />
            </div>
            <div>
                <label>f = </label>
                <input
                    type="text"
                    value={variables.f}
                    onChange={(e) => handleChangeVariable(e, 'f')}
                    placeholder="Ingresa valor para f"
                />
                <input
                    type="checkbox"
                    checked={selected.f}
                    onChange={(e) => handleCheckboxChange(e, 'f')}
                />
            </div>

            <div>
                <label>Ecuación: </label>
                <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Ingresa una ecuación (ej. 3f + 2e)"
                />
                <button onClick={handleCalculateEquation}>Calcular</button>
            </div>

            {equationResult !== null && (
                <div>
                    <h3>Resultado de la ecuación:</h3>
                    <p>{equationResult}</p>
                </div>
            )}

            <button onClick={handleSortAsc}>Ordenar Ascendente</button>
            <button onClick={handleSortDesc}>Ordenar Descendente</button>

            <div>
                <p>a: {variables.a}</p>
                <p>b: {variables.b}</p>
                <p>c: {variables.c}</p>
                <p>d: {variables.d}</p>
                <p>e: {variables.e}</p>
                <p>f: {variables.f}</p>
            </div>

            <div>
                <h3>Resultado del ordenamiento Ascendente:</h3>
                <p>{sortedAsc.join(', ')}</p>
            </div>

            <div>
                <h3>Resultado del ordenamiento Descendente:</h3>
                <p>{sortedDesc.join(', ')}</p>
            </div>
        </div>
    );
}

export default VariablesManager;
