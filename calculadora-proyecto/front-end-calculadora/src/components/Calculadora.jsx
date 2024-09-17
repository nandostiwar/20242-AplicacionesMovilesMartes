import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";



function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [number3, setNumber3] = useState('');
    const [number4, setNumber4] = useState('');
    const [number5, setNumber5] = useState('');
    const [number6, setNumber6] = useState('');
    const [ecuacion, setEcuacion] = useState('');
    const [checkboxes, setCheckboxes] = useState([false, false, false, false, false, false]);
    const [resultado, setResultado] = useState('');
    const [historial, setHistorial] = useState('');

    function handleCheckboxChange(index) {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    }

    function handleHistorial() {
        fetch('http://localhost:3500/v1/calculadora/historial')
            .then(res => res.json())
            .then(data => {
                setHistorial(JSON.stringify(data, null, 2));
            });
    }

function handleSubmit(e) {
    e.preventDefault();
    const operacion = e.target.value;

    const valores = {
        A: number1,
        B: number2,
        C: number3,
        D: number4,
        E: number5,
        F: number6
    };


    

        const numbers = [number1, number2, number3, number4, number5, number6];
        // Filtrar los números seleccionados con los checkboxes
        const selectedNumbers = numbers
            .map((num, index) => checkboxes[index] ? parseInt(num) : null)
            .filter(num => num !== null);

        let url = '';
        if (operacion === "Ecuacion") {
            url = 'http://localhost:3500/v1/calculadora/ecuacion';
        } else if (operacion === "Ascendente") {
            url = 'http://localhost:3500/v1/calculadora/ascendente';
        } else if (operacion === "Descendiente") {
            url = 'http://localhost:3500/v1/calculadora/descendente';
        }

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ecuacion, valores })
        })
            .then(res => res.json())
            .then(responseData => {
                setResultado(responseData.resultado);
            });

            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ numbers: selectedNumbers })
            })
                .then(res => res.json())
                .then(responseData => {
                    setResultado(responseData.resultado);
                });
    }




    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <label htmlFor="">A</label>
                <input type="text" className="number" onChange={(e)=>{setNumber1(e.target.value)}}/>
                <input type="checkbox" onChange={() => handleCheckboxChange(0)} /> <br />

                <label htmlFor="">B</label>
                <input type="text" className="number" onChange={(e)=>{setNumber2(e.target.value)}}/>
                <input type="checkbox" onChange={() => handleCheckboxChange(1)} /> <br />

                <label htmlFor="">C</label>
                <input type="text" className="number" onChange={(e)=>{setNumber3(e.target.value)}}/>
                <input type="checkbox" onChange={() => handleCheckboxChange(2)} /> <br />

                <label htmlFor="">D</label>
                <input type="text" className="number" onChange={(e)=>{setNumber4(e.target.value)}}/>
                <input type="checkbox" onChange={() => handleCheckboxChange(3)} /> <br />

                <label htmlFor="">E</label>
                <input type="text" className="number" onChange={(e)=>{setNumber5(e.target.value)}}/>
                <input type="checkbox" onChange={() => handleCheckboxChange(4)} /> <br />

                <label htmlFor="">F</label>
                <input type="text" className="number" onChange={(e)=>{setNumber6(e.target.value)}}/>
                <input type="checkbox" onChange={() => handleCheckboxChange(5)} /> <br />
                
                <input type="submit" className="btnEnviar" value="Ascendente" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="Descendiente" onClick={handleSubmit}/> <br/>

                <label>Ecuación</label>
                <input type="text" className="number" onChange={(e) => setEcuacion(e.target.value)} />
                <input type="submit" className="btnEnviar" value="Ecuacion" onClick={handleSubmit} />
                
                <button type="button" onClick={handleHistorial}>Mostrar Historial</button>

            </form>
            <Resultado resultado={"El resultado es "+ resultado}/>

            <pre>{historial}</pre> {/* Mostrar historial en formato JSON */}
        </div>
    )
}

export default Calculadora