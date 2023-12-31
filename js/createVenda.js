document.getElementById('submitButton').addEventListener('click', createVenda);
function createVenda() {
    const idUser = document.getElementById('idUser').value;
    const idProd = document.getElementById('idProd').value;

    if (!idUser) {
        alert("Por favor, insira um id de usuário!");
        return;
    }

    const venda = { 
        idusuario: idUser, 
        idproduto: idProd,
    };

    fetch('http://localhost/prova_web/backend/venda.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venda)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Não autorizado');
            } else {
                throw new Error('Sem rede ou não conseguiu localizar o recurso');
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            alert('Venda já registrada');
        }else{
            alert("Venda criada");
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}