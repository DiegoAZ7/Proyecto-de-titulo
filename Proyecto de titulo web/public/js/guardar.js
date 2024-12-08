import { auth, db } from './configuracion-firebase.js';
import { collection, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

function validarPassword(password) {
    // Expresión regular para cumplir con norma ISO 27001
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        return false;
    }
    return true;
}

function registrar() {
    const nombre = document.getElementById("nombreUsuario").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const nombreGrupo = document.getElementById("nombreGrupo").value;
    const biografia = document.getElementById("biografia").value;
    const redesSociales = document.getElementById("redesSociales").value.split(",")
        .map(link => link.trim().replace(/\/+$/, ""));
    const imagenes = document.getElementById("imagenes").value.split(",")
        .map(link => link.trim().replace(/\/+$/, ""));

    // aqui se valida que la contraseña cumpla con la funcion validarPassword
    if (!validarPassword(password)) {
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user)
                .then(() => {
                    console.log("Correo de verificación enviado a:", email);
                    alert("Registro exitoso. Se ha enviado un correo de verificación.");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Error al enviar correo de verificación:", error);
                    alert("Hubo un problema al enviar el correo de verificación.");
                });

            // Guardar datos de usuario en Firestore
            const userDocRef = doc(db, "usuarios", user.uid);
            return setDoc(userDocRef, {
                nombre,
                email,
                password,
                nombreGrupo,
                biografia,
                redesSociales,
                imagenes,
                emailVerificado: false
            });
        })
        .catch((error) => {
            alert("Error al registrar: " + error.message);
            console.error("Error en createUserWithEmailAndPassword:", error);
        });
}

document.getElementById("formulario-crear").addEventListener("submit", function(e) {
    e.preventDefault();
    registrar();
});

