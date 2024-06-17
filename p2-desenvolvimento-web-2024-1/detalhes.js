document.addEventListener('DOMContentLoaded', async () => {
    const detalhesContainer = document.getElementById('detalhesContainer');

    const urlParams = new URLSearchParams(window.location.search);
    const atletaId = parseInt(urlParams.get('id'), 10);

    if (!atletaId) {
        detalhesContainer.innerHTML = '<p>Erro!!!</p>';
        return;
    }

    if (atletaId === 0 || atletaId > 60) {
        detalhesContainer.innerHTML = '<p>Erro!!!</p>';
        return;
    }

    const pegaDados = async (caminho) => {
        const resposta = await fetch(caminho);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados');
        }
        const dados = await resposta.json();
        return dados;
    };

    try {
        const atleta = await pegaDados(`https://botafogo-atletas.mange.li/2024-1/${atletaId}`);

        if (!atleta || Object.keys(atleta).length === 0) {
            throw new Error('Atleta não encontrado.');
        }

        const card = document.createElement('div');
        card.className = 'card';

        const imgContainer = document.createElement('div');
        imgContainer.style.gridArea = 'a1';
        imgContainer.style.display = 'flex';
        imgContainer.style.alignItems = 'center';
        imgContainer.style.justifyContent = 'center';

        const imagem = document.createElement('img');
        imagem.src = atleta.imagem;
        imagem.alt = `Foto de ${atleta.nome}`;
        imgContainer.appendChild(imagem);

        const posicao = document.createElement('p');
        posicao.className = 'posicao';
        posicao.innerHTML = atleta.posicao;

        const nome = document.createElement('p');
        nome.className = 'nome';
        nome.innerHTML = atleta.nome;

        const descricao = document.createElement('p');
        descricao.className = 'descricao';
        descricao.innerHTML = atleta.detalhes;

        const nascimento = document.createElement('p');
        nascimento.className = 'nascimento';
        nascimento.innerHTML = atleta.nascimento;

        card.appendChild(imgContainer);
        card.appendChild(posicao);
        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(nascimento);

        detalhesContainer.appendChild(card);
    } catch (error) {
        alert('Nenhuma informação encontrada para o atleta especificado.');
        detalhesContainer.innerHTML = `<p>Erro ao carregar detalhes do atleta: ${error.message}</p>`;
    }
});
