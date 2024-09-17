// api/controllers/calculatorController.js

exports.ordenarAsc = (req, res) => {
    const { variables } = req.body;
    const sortedAsc = variables.map(Number).sort((a, b) => a - b);
    res.json({ resultado: sortedAsc });
};

exports.ordenarDesc = (req, res) => {
    const { variables } = req.body;
    const sortedDesc = variables.map(Number).sort((a, b) => b - a);
    res.json({ resultado: sortedDesc });
};

exports.calcularEcuacion = (req, res) => {
    const { variables, equation } = req.body;

    // Reemplazar variables en la ecuación
    let ecuacionReemplazada = equation;
    for (const [key, value] of Object.entries(variables)) {
        ecuacionReemplazada = ecuacionReemplazada.replace(new RegExp(key, 'g'), value);
    }

    try {
        // Evaluar la ecuación
        const resultado = eval(ecuacionReemplazada);
        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ error: 'Error al evaluar la ecuación' });
    }
};
