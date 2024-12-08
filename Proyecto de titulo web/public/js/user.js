import { db } from './configuracion-firebase.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async () => {
    const userUID = localStorage.getItem('userUID');
    console.log('UID del usuario desde localStorage:', userUID);

    if (userUID) {
        try {
            const userDocRef = doc(db, "usuarios", userUID);
            console.log("Consultando Firestore para el UID:", userUID);

            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                console.log("Datos del usuario obtenidos de Firestore:", userData);

                // Mostrar imágenes en el contenedor principal
                const imagenesContainer = document.getElementById("imagenesContainer");
                if (imagenesContainer && userData.imagenes && userData.imagenes.length > 0) {
                    userData.imagenes.forEach((link) => {
                        const img = document.createElement("img");
                        img.src = link.trim();
                        img.alt = "Imagen del usuario";
                        img.style.maxWidth = "200px";
                        img.style.margin = "10px";
                        imagenesContainer.appendChild(img);
                    });
                }
                const imagenesNav = document.getElementById("imagenesNav");
                if (imagenesNav && userData.imagenes && userData.imagenes.length > 0) {
                    userData.imagenes.forEach((link) => {
                        const img = document.createElement("img");
                        img.src = link.trim();
                        img.alt = "Imagen del usuario";
                        img.style.maxWidth = "190px";
                        img.style.margin = "10px auto";
                        img.style.borderRadius = "10px";
                        img.style.display = "block";
                        imagenesNav.appendChild(img);
                    });
                }


                // Mostrar otras propiedades del usuario
                const bienvenidaElemento = document.getElementById("nombreUsuario");
                if (bienvenidaElemento) {
                    bienvenidaElemento.textContent = `${userData.nombre || "Usuario"}`;
                }

                const emailElemento = document.getElementById("emailUsuario");
                if (emailElemento) {
                    emailElemento.textContent = `${userData.email}`;
                }
                const nombreGrupoElemento = document.getElementById("nombreGrupo");
                if (emailElemento) {
                    nombreGrupoElemento.textContent = `${userData.nombreGrupo}`;
                }
                const biografiaElemento = document.getElementById("biografiaUsuario");
                if (biografiaElemento) {
                    biografiaElemento.textContent = `${userData.biografia}`;
                }

                const redesSocialesContainer = document.getElementById("redesSocialesContainer");
                if (userData.redesSociales) {
                    userData.redesSociales.forEach((link) => {
                        const anchor = document.createElement("a");
                        anchor.href = link.trim();
                        anchor.target = "_blank";
                        anchor.innerText = link;
                        redesSocialesContainer.appendChild(anchor);
                        redesSocialesContainer.appendChild(document.createElement("br"));
                    });
                }

                // Mostrar el nombre de usuario en el navbar
                const nombreUsuarioNav = document.getElementById("nombreUsuarioNav");
                if (nombreUsuarioNav && userData.nombre) {
                    nombreUsuarioNav.textContent = userData.nombre;
                }
            } else {
                console.error("El documento del usuario no existe en Firestore.");
                alert("No se encontraron datos para este usuario. Redirigiendo al inicio de sesión.");
                window.location.href = "login.html";
            }
        } catch (error) {
            console.error("Error al intentar leer los datos de Firestore:", error.message);
            alert("Hubo un problema al obtener los datos del usuario. Redirigiendo al inicio de sesión.");
            window.location.href = "login.html";
        }
    } else {
        console.error('No se encontró el UID en localStorage. Redirigiendo al inicio de sesión.');
        window.location.href = "login.html";
    }
});
