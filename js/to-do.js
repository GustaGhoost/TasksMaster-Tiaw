// Array que armazena os projetos
let projects = [];

// Função para adicionar um novo projeto
function addProject() {
    // Obtém os valores dos campos do formulário
    const name = document.getElementById('projectName').value;
    const date = document.getElementById('completionDate').value;
    const content = document.getElementById('projectContent').value;

    // Verifica se todos os campos estão preenchidos
    if (name && date && content) {
        // Cria um objeto projeto com os dados inseridos
        const project = { name, date, content, completed: false };
        // Adiciona o projeto ao array
        projects.push(project);
        // Armazena os projetos no localStorage
        localStorage.setItem('projects', JSON.stringify(projects));
        // Exibe os projetos na tela
        displayProjects(projects);
        // Limpa o formulário após adicionar o projeto
        document.getElementById('projectForm').reset();
    }
    return false; // Evita o envio padrão do formulário
}

// Função para exibir os projetos na interface
function displayProjects(projectList) {
    const projectListDiv = document.getElementById('projectList');
    projectListDiv.innerHTML = ''; // Limpa o conteúdo anterior

    // Itera sobre a lista de projetos e cria cards para cada um
    projectList.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = `card ${project.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>Data de Inclusão: ${project.date}</p>
            <p>${project.content}</p>
            <div class="actions">
                <button onclick="editProject(${index})">Editar</button>
                <button onclick="completeProject(${index})">Concluir</button>
                <button onclick="deleteProject(${index})">Excluir</button>
            </div>
        `;
        projectListDiv.appendChild(card); // Adiciona o card à lista de projetos
    });
}

// Função para editar um projeto
function editProject(index) {
    const project = projects[index];
    // Preenche o formulário com os dados do projeto selecionado
    document.getElementById('projectName').value = project.name;
    document.getElementById('completionDate').value = project.date;
    document.getElementById('projectContent').value = project.content;

    // Atualiza a função do formulário para salvar as alterações
    document.getElementById('projectForm').onsubmit = function () {
        projects[index] = {
            name: document.getElementById('projectName').value,
            date: document.getElementById('completionDate').value,
            content: document.getElementById('projectContent').value,
            completed: project.completed,
        };
        // Atualiza os projetos no localStorage e exibe na tela
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects(projects);
        document.getElementById('projectForm').reset(); // Limpa o formulário
        document.getElementById('projectForm').onsubmit = addProject; // Restaura a função de adicionar projeto
        return false; // Evita o envio padrão do formulário
    };
}

// Função para marcar um projeto como concluído
function completeProject(index) {
    projects[index].completed = true; // Define o status do projeto como concluído
    localStorage.setItem('projects', JSON.stringify(projects)); // Atualiza os projetos no localStorage
    displayProjects(projects); // Exibe os projetos atualizados na tela
}

// Função para excluir um projeto
function deleteProject(index) {
    projects.splice(index, 1); // Remove o projeto do array
    localStorage.setItem('projects', JSON.stringify(projects)); // Atualiza os projetos no localStorage
    displayProjects(projects); // Exibe os projetos atualizados na tela
}

// Função para buscar projetos pelo nome
function searchProject() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase(); // Obtém o termo de busca
    const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm)); // Filtra os projetos pelo nome
    displayProjects(filteredProjects); // Exibe os projetos filtrados na tela
}

// Função para ordenar os projetos
function sortProjects() {
    const sortValue = document.getElementById('sortSelect').value; // Obtém o critério de ordenação
    let sortedProjects = projects; // Inicializa com todos os projetos

    // Filtra os projetos com base no critério de ordenação selecionado
    if (sortValue === 'completed') {
        sortedProjects = projects.filter(project => project.completed); // Projetos concluídos
    } else if (sortValue === 'pending') {
        sortedProjects = projects.filter(project => !project.completed); // Projetos pendentes
    }

    displayProjects(sortedProjects); // Exibe os projetos ordenados na tela
}

// Função para sair da aplicação
function logout() {
    if (confirm("Você realmente deseja sair?")) {
        window.location.href = "goodbye.html"; // Redireciona para a página de despedida
    }
}

// Função assíncrona para buscar projetos do servidor remoto
async function fetchProjects() {
    try {
        const response = await fetch('https://json-taks.vercel.app/projects'); // Requisição GET para obter os projetos
        const data = await response.json(); // Converte a resposta para JSON

        // Verifica se há projetos salvos no localStorage
        if (localStorage.getItem('projects')) {
            projects = JSON.parse(localStorage.getItem('projects')); // Recupera os projetos do localStorage
        } else {
            projects = []; // Inicializa o array de projetos se não houver no localStorage
        }

        // Concatena os projetos do servidor remoto apenas se não houver no localStorage
        if (data.length > 0 && projects.length === 0) {
            projects = data; // Atribui os projetos do servidor à variável local
            localStorage.setItem('projects', JSON.stringify(projects)); // Armazena os projetos no localStorage
        }

        displayProjects(projects); // Exibe os projetos na tela
    } catch (error) {
        console.error('Erro ao carregar os projetos:', error); // Exibe o erro no console, se houver
    }
}

// Evento disparado quando a janela é carregada
window.onload = function () {
    fetchProjects(); // Carrega os projetos ao carregar a página
};
