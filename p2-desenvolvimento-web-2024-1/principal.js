if (localStorage.getItem('logado')) {
    let dados = [];

    // Cria o container de filtros
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'filters-container';

    // Container de filtros para desktop
    const divFiltros = document.createElement('div');
    divFiltros.className = 'desktop-filters';

    const btnTodos = document.createElement('button');
    btnTodos.innerText = 'Todos';
    btnTodos.onclick = () => carregarAtletas('todos');

    const btnMasculino = document.createElement('button');
    btnMasculino.innerText = 'Masculino';
    btnMasculino.onclick = () => carregarAtletas('masculino');

    const btnFeminino = document.createElement('button');
    btnFeminino.innerText = 'Feminino';
    btnFeminino.onclick = () => carregarAtletas('feminino');

    divFiltros.appendChild(btnTodos);
    divFiltros.appendChild(btnMasculino);
    divFiltros.appendChild(btnFeminino);

    // Select para mobile
    const selectFiltros = document.createElement('select');
    selectFiltros.className = 'mobile-select';
    selectFiltros.onchange = (event) => carregarAtletas(event.target.value);

    const optionTodos = document.createElement('option');
    optionTodos.value = 'todos';
    optionTodos.text = 'Todos';
    const optionMasculino = document.createElement('option');
    optionMasculino.value = 'masculino';
    optionMasculino.text = 'Masculino';
    const optionFeminino = document.createElement('option');
    optionFeminino.value = 'feminino';
    optionFeminino.text = 'Feminino';

    selectFiltros.appendChild(optionTodos);
    selectFiltros.appendChild(optionMasculino);
    selectFiltros.appendChild(optionFeminino);

    filtersContainer.appendChild(divFiltros);
    filtersContainer.appendChild(selectFiltros);
    document.body.appendChild(filtersContainer);

    const divPesquisa = document.createElement('div');
    divPesquisa.style.textAlign = 'center';
    divPesquisa.style.padding = '20px';

    const inputPesquisa = document.createElement('input');
    inputPesquisa.type = 'text';
    inputPesquisa.placeholder = 'Pesquisar atletas...';
    inputPesquisa.style.width = '100%';
    inputPesquisa.style.maxWidth = '400px';
    inputPesquisa.style.padding = '10px';
    inputPesquisa.style.border = '1px solid #ddd';
    inputPesquisa.style.borderRadius = '4px';

    divPesquisa.appendChild(inputPesquisa);

    document.body.appendChild(divPesquisa);

    const conteudo = document.createElement('div');
    conteudo.id = 'conteudo'; // Adiciona ID ao container de atletas

    document.body.appendChild(conteudo);

    const montaCard = (entrada) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${entrada.id}`;
        });

        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `Foto de ${entrada.nome}`;

        const posicao = document.createElement('p');
        posicao.className = 'posicao';
        posicao.innerHTML = entrada.posicao;

        const nome = document.createElement('p');
        nome.className = 'nome';
        nome.innerHTML = entrada.nome;

        const descricao = document.createElement('p');
        descricao.className = 'descricao';
        descricao.innerHTML = entrada.detalhes ;

        const nascimento = document.createElement('p');
        nascimento.className = 'nascimento';
        nascimento.innerHTML = entrada.nascimento;

        card.appendChild(imagem);
        card.appendChild(posicao);
        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(nascimento);

        return card;
    };

    inputPesquisa.onkeyup = (ev) => {
        const valorPesquisa = ev.target.value.toLowerCase();

        if (valorPesquisa.length > 1) {
            const filtrado = dados.filter((elemento) => {
                const estaNoNome = elemento.nome.toLowerCase().includes(valorPesquisa);
                const estaNaPosicao = elemento.posicao.toLowerCase().includes(valorPesquisa);
                return estaNoNome || estaNaPosicao;
            });

            conteudo.innerHTML = '';

            filtrado.forEach((atleta) => {
                conteudo.appendChild(montaCard(atleta));
            });
        } else if (valorPesquisa.length === 0) {
            conteudo.innerHTML = '';
            dados.forEach((atleta) => {
                conteudo.appendChild(montaCard(atleta));
            });
        }
    };

    const pegaDados = async (caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    };

    const carregarAtletas = async (filtro) => {
        let url;
        if (filtro === 'masculino') {
            url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
        } else if (filtro === 'feminino') {
            url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
        } else {
            url = 'https://botafogo-atletas.mange.li/2024-1/all';
        }

        dados = await pegaDados(url);
        conteudo.innerHTML = '';
        dados.forEach((atleta) => {
            conteudo.appendChild(montaCard(atleta));
        });
    };

    // Carregar atletas padrão (todos)
    carregarAtletas('todos');

} else {
    window.location.href = "index.html";
}
