// Seleciona o campo de entrada e a div onde o resultado será exibido
const idInput = document.getElementById('id_fruta');
const frutaResult = document.getElementById('fruta_result');
const inputEnviar = document.getElementById('enviar');

// Função para enviar dados mockados e criar uma nova fruta
async function enviar() {
    const mockData = {
        id: 123,  // ID mockado
        nome: 'Banana',
        cor: 'Amarela',
        peso: 120 // Peso em gramas
    };

    try {
        // Faz uma requisição ao servidor para criar uma nova fruta (POST)
        const response = await fetch('http://localhost:3000/frutas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Envia os dados como JSON
            },
            body: JSON.stringify(mockData) // Converte os dados mockados para JSON
        });

        if (!response.ok) {
            throw new Error('Erro ao criar a fruta');
        }

        const result = await response.json();

        // Exibe o resultado na div frutaResult
        frutaResult.textContent = 'Fruta criada com sucesso: ' + result.nome;
    } catch (error) {
        // Exibe mensagem de erro caso ocorra um problema
        frutaResult.textContent = 'Erro ao criar a fruta: ' + error.message;
    }
}

// Função para buscar dados de uma fruta pelo ID
async function buscarFruta(id) {
    try {
        // Faz uma requisição ao servidor para buscar dados da fruta pelo ID (GET)
        const response = await fetch(`http://localhost:3000/frutas/${id}`);
        if (!response.ok) {
            throw new Error('Fruta não encontrada');
        }
        const fruta = await response.json();

        // Exibe o resultado na div frutaResult
        frutaResult.textContent = `Fruta: ${fruta.nome}, Cor: ${fruta.cor}, Peso: ${fruta.peso}g`;
    } catch (error) {
        // Exibe mensagem de erro caso ocorra um problema
        frutaResult.textContent = 'Erro ao buscar dados: ' + error.message;
    }
}

// Adiciona um ouvinte de evento ao botão enviar para disparar a função enviar
inputEnviar.addEventListener('click', enviar);

// Adiciona um ouvinte de evento ao campo de entrada para buscar uma fruta ao digitar
idInput.addEventListener('input', () => {
    const id = idInput.value;

    if (id) {
        buscarFruta(id);  // Chama a função para buscar a fruta se houver um ID
    } else {
        // Limpa o resultado se o campo de entrada estiver vazio
        frutaResult.textContent = '';
    }
});
