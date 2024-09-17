import { useState } from "react";
import '../styles/Calculadora.css';

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
        })
            .then(response => response.json())
            .then(data => setEquationResult(data.resultado))
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className="container">
            <p>CALCULADORA</p>
            <div >
                <label>A = </label>
                <input type="text" value={variables.a} onChange={(e) => handleChangeVariable(e, 'a')} placeholder="Ingresa valor para a" />
                <input type="checkbox" checked={selected.a} onChange={(e) => handleCheckboxChange(e, 'a')} />
            </div>
            <div>
                <label>B = </label>
                <input  type="text" value={variables.b} onChange={(e) => handleChangeVariable(e, 'b')} placeholder="Ingresa valor para b"/>
                <input type="checkbox" checked={selected.b} onChange={(e) => handleCheckboxChange(e, 'b')} />
            </div>
            <div>
                <label>C = </label>
                <input type="text" value={variables.c}onChange={(e) => handleChangeVariable(e, 'c')} placeholder="Ingresa valor para c"/>
                <input type="checkbox"checked={selected.c} onChange={(e) => handleCheckboxChange(e, 'c')}/>
            </div>
            <div>
                <label>D = </label>
                <input type="text" value={variables.d} onChange={(e) => handleChangeVariable(e, 'd')} placeholder="Ingresa valor para d" />
                <input type="checkbox" checked={selected.d}onChange={(e) => handleCheckboxChange(e, 'd')} />
            </div>
            <div>
                <label>E = </label>
                <input type="text" value={variables.e}onChange={(e) => handleChangeVariable(e, 'e')} placeholder="Ingresa valor para e" />
                <input type="checkbox" checked={selected.e} onChange={(e) => handleCheckboxChange(e, 'e')}
                />
            </div>
            <div>
                <label>F = </label>
                <input type="text" value={variables.f} onChange={(e) => handleChangeVariable(e, 'f')} placeholder="Ingresa valor para f" />
                <input type="checkbox" checked={selected.f} onChange={(e) => handleCheckboxChange(e, 'f')} />
            </div>

            <div>
                <label>Ecuación: </label>
                <input  type="text" value={equation} onChange={(e) => setEquation(e.target.value)}placeholder="Ingresa una ecuación"/>
                <button className="btnEnviar" onClick={handleCalculateEquation}>Calcular</button>
            </div>

            {equationResult !== null && (
                <div>
                    <h3>Resultado de la ecuación:</h3>
                    <p>{equationResult}</p>
                </div>
            )}

            <button className="btnEnviar" onClick={handleSortAsc}>Ordenar Ascendente</button>
            <button className="btnEnviar" onClick={handleSortDesc}>Ordenar Descendente</button>

            <div>
                <h3>Resultado de orden Ascendente:</h3>
                <p>{sortedAsc.join(', ')}</p>
            </div>

            <div>
                <h3>Resultado de orden Descendente:</h3>
                <p>{sortedDesc.join(', ')}</p>
            </div>
        </div>
    );
}

export default VariablesManager;
