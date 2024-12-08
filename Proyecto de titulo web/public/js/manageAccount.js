import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { auth } from './configuracion-firebase.js';

export class ManageAccount {
    authenticate(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (!user.emailVerified) {
                    alert("Por favor verifica tu correo antes de iniciar sesión.");
                    return null;
                }

                return {
                    uid: user.uid,
                    nombre: user.displayName || "Usuario"
                };
            })
            .catch((error) => {
                console.error('Error al autenticar usuario:', error);
                alert('Credenciales incorrectas o problema al autenticar.');
                return null;
            });
    }
}
