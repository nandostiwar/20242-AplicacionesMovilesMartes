import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";



function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');
    const [textValues, setTextValues] = useState({
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        text5: '',
        text6: ''
    });
    const [checkbox1, setCheckbox1] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);
    const [checkbox3, setCheckbox3] = useState(false);
    const [checkbox4, setCheckbox4] = useState(false);
    const [checkbox5, setCheckbox5] = useState(false);
    const [checkbox6, setCheckbox6] = useState(false);

    function handleSubmit(e){
        //console.log("numerador: " +number2);


        e.preventDefault();
        const operacion = e.target.value;

        const valoresActivos = getValoresActivos();

        console.log("Valores activos: ", valoresActivos);
      
        if(operacion == "sumar") {setResultado(parseInt(number1)+parseInt(number2))}
        if(operacion == "restar") {setResultado(parseInt(number1)-parseInt(number2))}
        if(operacion == "multiplicar") {setResultado(parseInt(number1)*parseInt(number2))}
    
        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({number1, number2,valoresActivos,
                checkbox1,checkbox2,checkbox3,checkbox4,checkbox5,checkbox6 })
        })
            .then(res =>res.json())
            .then(responseData => {
                setResultado(responseData.resultado)
                // setResultado(responseData)
                // console.log(resultado)
            })
         
           
       
            
            const getValoresActivos = () => {
                const valoresActivos = [];
                if (!checkbox1) valoresActivos.push(parseInt(textValues.text1) || 0);
                if (!checkbox2) valoresActivos.push(parseInt(textValues.text2) || 0);
                if (!checkbox3) valoresActivos.push(parseInt(textValues.text3) || 0);
                if (!checkbox4) valoresActivos.push(parseInt(textValues.text4) || 0);
                if (!checkbox5) valoresActivos.push(parseInt(textValues.text5) || 0);
                if (!checkbox6) valoresActivos.push(parseInt(textValues.text6) || 0);
                return valoresActivos;
            }
    }

    const handleMostrarValores = () => {
        const valoresActivos = getValoresActivos();
        alert("Valores activos: " + valoresActivos.join(', ')); // valores en una alerta
    }

     //actualizar valores de cuadros 
     const handleTextChange = (e, field) => {
        setTextValues({
            ...textValues,
            [field]: e.target.value
        });
    };

    
      const handleCheckboxChange = (e) => {
        setCheckboxValue(e.target.checked);
    };

    const handleCheckbox1Change = (e) => {
        setCheckbox1(e.target.checked);
    };

    const handleCheckbox2Change = (e) => {
        setCheckbox2(e.target.checked);
    };

    const handleCheckbox3Change = (e) => {
        setCheckbox3(e.target.checked);
    };

    const handleCheckbox4Change = (e) => {
        setCheckbox4(e.target.checked);
    };

    const handleCheckbox5Change = (e) => {
        setCheckbox5(e.target.checked);
    };

    const handleCheckbox6Change = (e) => {
        setCheckbox6(e.target.checked);
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                
                <input type="text" className="number" onChange={(e)=>{setNumber1(e.target.value)}}/><br />
                <input type="text" className="number" onChange={(e)=>{setNumber2(e.target.value)}}/><br />
                
              

                <input type="text" className="textCheckbox" placeholder="Numero 1" disabled={checkbox1} 
                value={textValues.text1} onChange={(e) => handleTextChange(e, 'text1')} /><br />
                <label>
                    <input type="checkbox" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)} />
                    Desactivar opción
                </label><br /><br />

                <input type="text" className="textCheckbox" 
                    placeholder="numero 2" disabled={checkbox2}
                /><br />
                <label>
                <input type="checkbox" checked={checkbox2} onChange={handleCheckbox2Change} />
                Desactivar opción
                </label><br /><br />

                <input type="text" className="textCheckbox" placeholder="numero 3" disabled={checkbox3}
                /><br />
                <label>
                <input type="checkbox" checked={checkbox3} onChange={handleCheckbox3Change} />
                    Desactivar opción
                </label><br /><br />

                <input type="text" className="textCheckbox" placeholder="numero 4" disabled={checkbox4}
                /><br />
                <label>
                <input type="checkbox" checked={checkbox4} onChange={handleCheckbox4Change} />
                Desactivar opción
                </label><br /><br />

                <input type="text" className="textCheckbox" placeholder="numero 5" disabled={checkbox5}
                /><br />
                <label>
                <input type="checkbox" checked={checkbox5} onChange={handleCheckbox5Change} />
                Desactivar opción
                </label><br /><br />

                <input type="text" className="textCheckbox" placeholder="numero 6" disabled={checkbox6}
                /><br />
                <label>
                <input type="checkbox" checked={checkbox6} onChange={handleCheckbox6Change} />
                Desactivar opción
                </label><br /><br />

               

            <input type="submit" className="btnEnviar" value="Mostrar" onClick={handleMostrarValores}/>

                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit}/>
            </form>
            <Resultado resultado={"El resultado es "+ resultado}/>
        </div>
    )
}

export default Calculadora