import './styles/Form.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import data from '/Aplicaciones moviles/20242-AplicacionesMovilesMartes/proyecto-general-horoscopo/api-json/db/signos.json';

function NuevoUsuario({callback}){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const crearUsuario = async (event) => {
      event.preventDefault(); 
  
   /*   if (!username || !password || !tipo) {
        setError('Por favor, completa todos los campos.');
        return;
      }  */

      try {

        if(username === null || password === null ){
                
          alert("El nombre de usuario o la contraseña no pueden estar vacíos o contener solo espacios en blanco");
         
        }else{

          const response = await fetch('http://localhost:4000/v1/credenciales/crear', {
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              username, 
              password,
              tipo             }), // Enviar credenciales
          });
                  /*     */
         
                  const resultado = await respuesta.json();
                  if (respuesta.ok) {
                    console.log('Usuario creado con éxito:', resultado);
                    setError(null); // Limpiar el error
                    navigate('/'); // Redirigir al usuario después de la creación
                  } else {
                    setError('No se pudo crear el usuario. ' + resultado.message);
                  }  


        }
         
      

       

       
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        setError('Error al crear el usuario, intenta de nuevo.');
      }
    };
    
    const validateUser = (event)=>{
        event.preventDefault();

    }
    return (
        <form onSubmit={crearUsuario}>
            <h1 id="txtBienvenida">Crear usuario</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)}/><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)}/><br></br>
            <h4 className="txt">Tipo de usuario</h4>  
            <select onChange={(e) => setTipo(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            </select><br></br>
           
            <input type="submit" value="Crear" id="btnEnviar"/>
        </form>
    )
}

export default NuevoUsuario;