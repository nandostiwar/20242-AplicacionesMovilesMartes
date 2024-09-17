// controllers/calculadoraControllers.js

// Función para ordenar números
exports.ordenar = (req, res) => {
    const { numbers, order, ecuacion } = req.body;
  
    // Validar los números y el orden
    if (!Array.isArray(numbers) || numbers.some(isNaN) || (order !== 'asc' && order !== 'desc')) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
  
    // Ordenar los números
    const sortedNumbers = [...numbers].sort((a, b) => {
      return order === 'asc' ? a - b : b - a;
    });
  
    // Evaluar la ecuación si está proporcionada
    let resultadoEcuacion = null;
    if (ecuacion) {
      try {
        const cleanedExpression = ecuacion
          .replace(/([a-f])/g, (_, varName) => `(${parseFloat(valores[varName]) || 0})`)
          .replace(/([+\-*/])/g, ' $1 ');
  
        resultadoEcuacion = Function('"use strict"; return (' + cleanedExpression + ')')();
      } catch (error) {
        resultadoEcuacion = 'Error en la ecuación';
      }
    }
  
    res.json({ sortedNumbers, resultadoEcuacion });
  };
  
  // Funciones para operaciones aritméticas
  exports.sumar = (req, res) => {
    // Implementa la lógica para sumar
  };
  
  exports.restar = (req, res) => {
    // Implementa la lógica para restar
  };
  
  exports.multiplicar = (req, res) => {
    // Implementa la lógica para multiplicar
  };
  