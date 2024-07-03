let projects = [];

// Função para adicionar um novo projeto
function addProject() {
    const name = document.getElementById('projectName').value;
    const date = document.getElementById('completionDate').value;
    const content = document.getElementById('projectContent').value;

    // Verifica se todos os campos estão preenchidos
    if (name && date && content) {
        const project = { name, date, content, completed: false };
        projects.push(project); // Adiciona o projeto ao array de projetos
        localStorage.setItem('projects', JSON.stringify(projects)); // Salva os projetos no localStorage
        displayProjects(projects); // Atualiza a exibição dos projetos na tela
        document.getElementById('projectForm').reset(); // Limpa o formulário
    }
    return false; // Impede o envio padrão do formulário
}

// Função para exibir os projetos na tela
function displayProjects(projectList) {
    const projectListDiv = document.getElementById('projectList');
    projectListDiv.innerHTML = ''; // Limpa o conteúdo atual da lista de projetos
    projectList.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = `card ${project.completed ? 'completed' : ''}`; // Adiciona a classe 'completed' se o projeto estiver concluído
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
        projectListDiv.appendChild(card); // Adiciona o cartão do projeto à lista de projetos
    });
}

// Função para editar um projeto existente
function editProject(index) {
    const project = projects[index];
    // Preenche o formulário com os dados do projeto selecionado para edição
    document.getElementById('projectName').value = project.name;
    document.getElementById('completionDate').value = project.date;
    document.getElementById('projectContent').value = project.content;
    // Submete o formulário editado
    document.getElementById('projectForm').onsubmit = function () {
        projects[index] = {
            name: document.getElementById('projectName').value,
            date: document.getElementById('completionDate').value,
            content: document.getElementById('projectContent').value,
            completed: project.completed,
        };
        localStorage.setItem('projects', JSON.stringify(projects)); // Atualiza os projetos no localStorage
        displayProjects(projects); // Atualiza a exibição dos projetos na tela
        document.getElementById('projectForm').reset(); // Limpa o formulário
        document.getElementById('projectForm').onsubmit = addProject; // Restaura a função de submissão padrão
        return false; // Impede o envio padrão do formulário
    };
}

// Função para marcar um projeto como concluído
function completeProject(index) {
    projects[index].completed = true;
    localStorage.setItem('projects', JSON.stringify(projects)); // Atualiza os projetos no localStorage
    displayProjects(projects); // Atualiza a exibição dos projetos na tela
}

// Função para excluir um projeto
function deleteProject(index) {
    projects.splice(index, 1); // Remove o projeto do array de projetos
    localStorage.setItem('projects', JSON.stringify(projects)); // Atualiza os projetos no localStorage
    displayProjects(projects); // Atualiza a exibição dos projetos na tela
}

// Função para buscar projetos pelo nome
function searchProject() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    // Filtra os projetos com base no termo de pesquisa
    const filteredProjects = projects.filter(project => project.name.toLowerCase().includes(searchTerm));
    displayProjects(filteredProjects); // Exibe os projetos filtrados na tela
}

// Função para ordenar os projetos
function sortProjects() {
    const sortValue = document.getElementById('sortSelect').value;
    let sortedProjects = projects;
    // Filtra os projetos com base no valor de ordenação selecionado
    if (sortValue === 'completed') {
        sortedProjects = projects.filter(project => project.completed);
    } else if (sortValue === 'pending') {
        sortedProjects = projects.filter(project => !project.completed);
    }
    displayProjects(sortedProjects); // Exibe os projetos ordenados na tela
}

// Função para realizar logout
function logout() {
    // Exibe um prompt de confirmação antes de redirecionar para a página de despedida
    if (confirm("Você realmente deseja sair?")) {
        window.location.href = "goodbye.html";
    }
}

// Função assíncrona para carregar os projetos do servidor remoto
async function fetchProjects() {
    try {
        const response = await fetch('https://json-to-do-o8nf.vercel.app/projects');
        const data = await response.json();

        // Verifica se há projetos no localStorage
        if (localStorage.getItem('projects')) {
            projects = JSON.parse(localStorage.getItem('projects'));
        } else {
            projects = [];
        }

        // Concatena os projetos do servidor remoto apenas se não houver no localStorage
        if (data.length > 0 && projects.length === 0) {
            projects = data;
            localStorage.setItem('projects', JSON.stringify(projects));
        }

        displayProjects(projects); // Exibe os projetos na tela
    } catch (error) {
        console.error('Erro ao carregar os projetos:', error);
    }
}

// Carrega os projetos ao carregar a página
window.onload = function () {
    fetchProjects();
};
