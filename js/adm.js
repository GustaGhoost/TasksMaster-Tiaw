let users = []; // Array para armazenar os clientes

// Função assíncrona para buscar clientes da API JSON
async function fetchClients() {
    try {
        const response = await fetch('https://json-user.vercel.app/clients'); // Substitua pela URL da sua API JSON de clientes
        const data = await response.json(); // Converter resposta para JSON
        users = data; // Armazenar clientes na variável users

        // Carregar clientes do localStorage se existirem
        if (localStorage.getItem('users')) {
            const localStorageUsers = JSON.parse(localStorage.getItem('users'));
            // Mesclar clientes da API com os do localStorage, evitando duplicatas
            users = mergeClients(users, localStorageUsers);
        }

        displayClients(users); // Exibir clientes na interface
    } catch (error) {
        console.error('Erro ao carregar os clientes:', error);
    }
}

// Função para mesclar clientes da API com os do localStorage
function mergeClients(apiClients, localStorageClients) {
    // Converter array de localStorage para um objeto com chaves únicas (emails)
    const localStorageMap = localStorageClients.reduce((acc, client) => {
        acc[client.email] = client;
        return acc;
    }, {});

    // Filtrar clientes da API que não estão no localStorage
    const mergedClients = apiClients.filter(client => !localStorageMap[client.email]);

    // Concatenar com os clientes do localStorage
    return mergedClients.concat(localStorageClients);
}

// Função para adicionar novo cliente
function addClient() {
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const password = document.getElementById('clientPassword').value;

    // Verificar se todos os campos foram preenchidos
    if (name && email && phone && password) {
        const client = { name, email, phone, password };
        users.push(client); // Adicionar cliente ao array
        localStorage.setItem('users', JSON.stringify(users)); // Atualizar localStorage com os novos clientes
        displayClients(users); // Atualizar interface com a lista de clientes
        document.getElementById('clientForm').reset(); // Limpar formulário após adição
    }
    return false; // Evitar submissão do formulário
}

// Função para exibir clientes na tabela
function displayClients(clientList) {
    const tbody = document.getElementById('clientTableBody');
    tbody.innerHTML = ''; // Limpar conteúdo atual da tabela
    clientList.forEach((client, index) => {
        // Criar linha para cada cliente na tabela
        const row = `
            <tr>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>
                    <button onclick="editClient(${index})">Editar</button>
                    <button onclick="deleteClient(${index})">Excluir</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row; // Adicionar linha à tabela
    });
}

// Função para editar cliente existente
function editClient(index) {
    const client = users[index]; // Obter cliente pelo índice
    // Preencher formulário com dados do cliente selecionado
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientEmail').value = client.email;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientPassword').value = client.password;

    // Definir ação do formulário para atualizar cliente editado
    document.getElementById('clientForm').onsubmit = function () {
        users[index] = {
            name: document.getElementById('clientName').value,
            email: document.getElementById('clientEmail').value,
            phone: document.getElementById('clientPhone').value,
            password: document.getElementById('clientPassword').value
        };
        localStorage.setItem('users', JSON.stringify(users)); // Atualizar localStorage
        displayClients(users); // Atualizar interface com a lista de clientes
        document.getElementById('clientForm').reset(); // Limpar formulário após edição
        document.getElementById('clientForm').onsubmit = addClient; // Restaurar ação padrão do formulário
        return false; // Evitar submissão do formulário
    };
}

// Função para excluir cliente pelo índice
function deleteClient(index) {
    users.splice(index, 1); // Remover cliente do array
    localStorage.setItem('users', JSON.stringify(users)); // Atualizar localStorage
    displayClients(users); // Atualizar interface com a lista de clientes
}

// Função para filtrar clientes por nome
function searchClient() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    // Filtrar clientes cujo nome contenha o termo de busca
    const filteredClients = users.filter(client => client.name.toLowerCase().includes(searchTerm));
    displayClients(filteredClients); // Exibir clientes filtrados na interface
}

// Função para logout com confirmação
function logout() {
    if (confirm("Deseja acessar as tarefas de Administrador?")) {
        window.location.href = "task.html"; // Redirecionar para página de tarefas
    }
}

// Carregar clientes ao carregar a página
window.onload = function () {
    fetchClients();
};
