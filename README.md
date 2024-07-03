# Gerenciador de Tarefas - TasksMaster

## Visão Geral

TasksMaster é um aplicativo web simples para gerenciamento de projetos. Ele permite aos usuários adicionar, editar, concluir e excluir projetos de uma lista, além de buscar por nomes específicos e ordenar por status.

## Funcionalidades

- **Adicionar Projeto:** Permite adicionar novos projetos à lista.
- **Editar Projeto:** Permite editar projetos existentes.
- **Concluir Projeto:** Marca um projeto como concluído.
- **Excluir Projeto:** Remove um projeto da lista.
- **Pesquisar e Ordenar:** Busca projetos por nome e ordena por status.
- **Logout:** Função para sair da aplicação.

## Instalação

Para executar o projeto localmente:

1. Clone o repositório: `git clone https://github.com/seu-usuario/tasks-master.git`
2. Navegue até o diretório do projeto: `cd tasks-master`
3. Abra `index.html` em seu navegador.

## Responsividade

O projeto é responsivo e adapta-se a dispositivos móveis usando media queries no CSS.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript

## Exemplo de Uso

```html
<!-- Exemplo de código HTML para adicionar um projeto -->
<form id="projectForm" onsubmit="return addProject()">
    <input type="text" id="projectName" placeholder="Nome do Projeto" required>
    <input type="date" id="completionDate" required>
    <textarea id="projectContent" placeholder="Conteúdo do Projeto" rows="4" required></textarea>
    <button type="submit">Adicionar</button>
</form>
# TasksMaster-Tiaw
