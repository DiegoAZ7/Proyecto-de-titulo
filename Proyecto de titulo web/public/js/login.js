import { ManageAccount } from './manageAccount.js';
const manageAccount = new ManageAccount();

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formulario-login").addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const user = await manageAccount.authenticate(email, password);

            if (user) {
                localStorage.setItem('userUID', user.uid);
                localStorage.setItem('nombreUsuario', user.nombre);
                console.log("Usuario autenticado y datos guardados en localStorage:", user);

                alert(`Bienvenido, ${user.nombre}!`);
                window.location.href = "user.html";
            } else {
                console.warn("Usuario no autenticado. Revisa tus credenciales o verifica tu correo.");
            }
        } catch (error) {
            console.error("Error en el proceso de login:", error.message);
            alert("Hubo un problema al iniciar sesión. Intenta nuevamente.");
        }
    });
});





