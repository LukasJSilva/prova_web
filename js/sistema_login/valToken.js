//document.addEventListener("DOMContentLoaded", async function() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        redirecioneLogin();
    }

  async function validaToken() {
    try {
        const response = await fetch('http://localhost/prova_web/backend/login.php', {
            method: 'GET',
            headers: {
                'Authorization':  token
            }
        });

        const jsonResponse = await response.json();
        if (!jsonResponse.status) {  
            window.location.href = 'login.html';  
        } 
        const telasPermitidas = jsonResponse.tela.map(tela => tela.nome);
        const nomePaginaAtual = window.location.pathname.split('/').pop().replace('.html', '');

        const itensMenu = document.querySelectorAll('.w3-bar-item'); //.w3-bar-item class das divs do menu

        itensMenu.forEach(item => {
            const nomeTela = item.dataset.tela; 
            if (telasPermitidas.includes(nomeTela)) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none'; 
            }
        });

        if (!telasPermitidas.includes(nomePaginaAtual)) {
            // alert('Você não tem permissão para acessar esta página!');
            if (telasPermitidas.length > 0) {  
                window.location.href = telasPermitidas[0] + '.html';  
            } else {
                window.location.href = 'login.html';  
            }
        }
        document.body.style.display = 'block';
        if (!response.ok || !jsonResponse.status) {
            redirecioneLogin(jsonResponse.message);
        }
    } catch (error) {
            console.error("Erro ao validar token:", error);
            //redirecioneLogin(error);
    }
  }

    validaToken();

    setInterval(validaToken, 60000);

// });

function redirecioneLogin() {
    // document.getElementById("mensagem").innerText="Token inválido ou expirado!"
    // document.getElementById('id02').style.display='block'
    window.location.href = "login.html";
}