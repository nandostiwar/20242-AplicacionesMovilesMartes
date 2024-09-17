import '../styles/Resultado.css';

function Resultado({ resultado }) {
    return (
        <p>{resultado}</p>  // Muestra el resultado pasado como prop
    );
}

export default Resultado;  // Exporta el componente para su uso en otros archivos

