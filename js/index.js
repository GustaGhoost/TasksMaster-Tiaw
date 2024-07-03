let users = JSON.parse(localStorage.getItem('users')) || []; // Carrega os usuários do localStorage ou inicializa um array vazio

function toggleForm() {
    const formTitle = document.getElementById('formTitle'); // Obtém o título do formulário
    const userForm = document.getElementById('userForm'); // Obtém o formulário de usuário
    const toggleLink = document.querySelector('.toggle-link'); // Obtém o link de alternância

    // Verifica se o título do formulário é 'Registro' para alternar entre registro e login
    if (formTitle.textContent === 'Registro') {
        formTitle.textContent = 'Login'; // Altera o título para 'Login'
        document.getElementById('name').style.display = 'none'; // Esconde o campo de nome
        userForm.innerHTML = `
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Senha" required>
            <button type="submit">Login</button>
        `; // Atualiza o formulário para exibir campos de login
        toggleLink.textContent = 'Não tem uma conta? Registre-se'; // Atualiza o texto do link de alternância
    } else {
        formTitle.textContent = 'Registro'; // Altera o título para 'Registro'
        userForm.innerHTML = `
            <input type="text" id="name" placeholder="Nome" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Senha" required>
            <button type="submit">Registrar</button>
        `; // Atualiza o formulário para exibir campos de registro
        toggleLink.textContent = 'Já tem uma conta? Faça login'; // Atualiza o texto do link de alternância
    }
}

function handleSubmit() {
    const formTitle = document.getElementById('formTitle').textContent; // Obtém o texto do título do formulário
    const email = document.getElementById('email').value; // Obtém o valor do campo de email
    const password = document.getElementById('password').value; // Obtém o valor do campo de senha

    // Verifica se o formulário está no modo 'Registro'
    if (formTitle === 'Registro') {
        const name = document.getElementById('name').value; // Obtém o valor do campo de nome
        const phone = document.getElementById('phone').value; // Obtém o valor do campo de telefone
        const user = { name, email, password, phone }; // Cria objeto de usuário com nome, email, senha e telefone
        users.push(user); // Adiciona usuário ao array
        localStorage.setItem('users', JSON.stringify(users)); // Salva usuários no localStorage
        alert('Registro bem-sucedido!'); // Exibe mensagem de registro bem-sucedido
        toggleForm(); // Alterna para o formulário de login
    } else {
        const user = users.find(user => user.email === email && user.password === password); // Procura usuário com email e senha correspondentes
        if (user) {
            window.location.href = 'to-do.html'; // Redireciona para página de tarefas se login for bem-sucedido
        } else {
            alert('Login inválido!'); // Exibe mensagem de login inválido
        }
    }
    return false; // Impede o envio padrão do formulário
}

function adminAccess() {
    const adminCode = prompt('Digite o código de administrador:'); // Solicita código de administrador
    const adminPassword = prompt('Digite a senha de administrador:'); // Solicita senha de administrador
    if (adminCode === 'adm01' && adminPassword === '12345') {
        window.location.href = 'adm.html'; // Redireciona para página de administrador se credenciais forem corretas
    } else {
        alert('Código ou senha de administrador inválidos!'); // Exibe mensagem de credenciais de administrador inválidas
    }
}
