import { hex_sha256 } from "./sha256-min.mjs";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const admincheck = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
        const senhacheck = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
        if (hex_sha256 (username) === admincheck && hex_sha256 (password) === senhacheck) {
            alert('Login bem-sucedido!');
            localStorage.setItem('logado', true);
            window.location.href = 'principal.html'; // Redireciona para a página principal
        } else {
            alert('Nome de usuário ou senha incorretos!');
        }
    });
});
