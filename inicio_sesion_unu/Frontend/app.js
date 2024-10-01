const baseUrl = 'http://localhost:3000'; // URL del backend
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const btnForgotPassword = document.getElementById('btnForgotPassword');
const formContainer = document.getElementById('formContainer');
const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');
const menu = document.getElementById('menu');
const authForm = document.getElementById('authForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const submitButton = document.getElementById('submitButton');
const uwuScreen = document.getElementById('uwuScreen');
const welcomeMessage = document.getElementById('welcomeMessage');
const btnBack = document.getElementById('btnBack');
const btnBackToMenuFromForgot = document.getElementById('btnBackToMenuFromForgot');
const nameInput = document.getElementById('name');
const btnBackToMenuFromWelcome = document.createElement('button'); // Crear el botón para regresar al menú

btnBackToMenuFromWelcome.textContent = "Volver al menú";
uwuScreen.appendChild(btnBackToMenuFromWelcome); // Agregar el botón a la pantalla de bienvenida

let isLogin = true;

// Mostrar el formulario de login o registro
btnLogin.addEventListener('click', () => {
    isLogin = true;
    nameInput.style.display = 'none';
    showForm('Ingresar');
});

btnRegister.addEventListener('click', () => {
    isLogin = false;
    nameInput.style.display = 'block';
    showForm('Registrar');
});

btnForgotPassword.addEventListener('click', () => {
    menu.style.display = 'none';
    forgotPasswordContainer.style.display = 'block';
});

function showForm(action) {
    menu.style.display = 'none';
    formContainer.style.display = 'block';
    submitButton.textContent = action;
}

// Manejar el envío del formulario de login/registro
authForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = isLogin ? '' : document.getElementById('name').value;

    if (isLogin) {
        login(email, password);
    } else {
        register(name, email, password);
    }
});

// Manejar el formulario de cambiar contraseña
forgotPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    try {
        const response = await fetch(`${baseUrl}/change-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: newPassword })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Contraseña cambiada exitosamente'); // Mensaje de éxito
            forgotPasswordContainer.style.display = 'none';
            menu.style.display = 'block';
        } else {
            alert(result.message); // Mostrar mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error cambiando la contraseña.');
    }
});

async function login(email, password) {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            showUwu(result.name); // Mostrar pantalla de bienvenida con el nombre del usuario
        } else {
            alert(result.message); // Mostrar mensaje de error si la contraseña o usuario son incorrectos
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar iniciar sesión.');
    }
}

async function register(name, email, password) {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Usuario registrado exitosamente');
            showForm('Ingresar');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function showUwu(name) {
    formContainer.style.display = 'none';
    uwuScreen.style.display = 'block';
    welcomeMessage.textContent = `Bienvenido, ${name}`; // Mostrar el nombre del usuario

    // Manejar el evento del botón "Volver al menú"
    btnBackToMenuFromWelcome.addEventListener('click', () => {
        uwuScreen.style.display = 'none';
        menu.style.display = 'block';
    });
}

// Funciones para volver al menú principal
btnBack.addEventListener('click', () => {
    formContainer.style.display = 'none';
    menu.style.display = 'block';
});

btnBackToMenuFromForgot.addEventListener('click', () => {
    forgotPasswordContainer.style.display = 'none';
    menu.style.display = 'block';
});
