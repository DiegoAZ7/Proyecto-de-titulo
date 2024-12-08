document.addEventListener("DOMContentLoaded", () => {
    const botonCerrarSesion = document.getElementById("cerrarSesion");

    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener("click", () => {
            // Eliminar el nombre de usuario del localStorage
            localStorage.removeItem('nombreUsuario');
            window.location.href = "login.html";
        });
    }
});
